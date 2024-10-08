import {getXRatio, Globals} from "./globals.js";
import {Alien} from "./alien.js";
import {UFO} from "./UFO.js";
import {Supply} from "./Supply.js";
import {adjustAmmo, decLives, incLevel, reset} from "./stats.js";
const canvas = document.querySelector("#app");
canvas.width = Globals.GAME_WIDTH;
canvas.height = Globals.GAME_HEIGHT;
const ctx = canvas.getContext("2d");
const intro = document.querySelector(".intro");
const help = document.querySelector(".help");
const stats = document.querySelector(".stats");
const gameOver = document.querySelector(".game-over");
const btnPlay = document.querySelector("#btn-play");

btnPlay.addEventListener("click", (e)=>{
    Globals.sounds.supply.play();
    intro.classList.add("hidden");
    stats.classList.remove("hidden");
    startGame();
});
const btnAgain = document.querySelector("#btn-again");
btnAgain.addEventListener("click", function(){
    gameOver.classList.add("hidden");
    startGame(true);
});
const btnHelp = document.querySelector("#btn-help");
btnHelp.addEventListener("click", ()=>{
    intro.classList.add("hidden");
    help.classList.remove("hidden");
});
const btnHelpOK = document.querySelector("#help-ok");
btnHelpOK.addEventListener("click", ()=>{
    intro.classList.remove("hidden");
    help.classList.add("hidden");
});
const alien = new Alien();
let lastUpdate = 0;
let lastLevel = 0;
let UFOInterval = 0;
function addUFO(){
    Globals.UFO_COUNT += 1;
    const y = Math.floor(Math.random() * Globals.SKY_SIZE);
    const dir = Math.random() > 0.5 ? -1 : 1;
    const ufo = new UFO({x: dir > 0 ? -160 : Globals.GAME_WIDTH + 160, y}, dir * 0.8 * Globals.stats.level);
    Globals.UFOs.push(ufo);
    UFOInterval = 0;
    if(Globals.UFO_COUNT >= Globals.UFOs_PER_SUPPLY){
        Globals.UFO_COUNT = 0;
        const supply = new Supply({x: Math.floor(Math.random() * (Globals.GAME_WIDTH - alien.width)) + alien.width, y: -Supply.image.height});
        Globals.Supplies.push(supply);
    }
}
function gameLoop(t){
    if(lastLevel !== 0){
        if(t - lastLevel > 20000){
            incLevel();
            lastLevel = t;
        }
    }
    else lastLevel = t;
    const timeDelta = lastUpdate === 0 ? 0 : t - lastUpdate;
    UFOInterval += timeDelta;
    if(UFOInterval > 2000 - (100 * Globals.stats.level)) addUFO();
    lastUpdate = t;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    alien.update(timeDelta);
    alien.render(ctx);
    const toRemove = [];
    Globals.UFOs.forEach(ufo =>{
        ufo.update(timeDelta);
        if((ufo.pos.x <= -160 && ufo.speed.x < 0) ||(ufo.pos.x >= Globals.GAME_WIDTH && ufo.speed.x > 0)){
            toRemove.push(ufo);
        }
        else ufo.render(ctx);
    });
    if(toRemove.length > 0) Globals.UFOs = Globals.UFOs.filter(ufo => !toRemove.includes(ufo));
    toRemove.length = 0;
    Globals.Pellets.forEach(pellet =>{
        pellet.update(timeDelta);
        if(pellet.pos.y <= -Globals.PELLET_SIZE){
            toRemove.push(pellet);
        }
        else pellet.render(ctx);
    });
    if(toRemove.length > 0) Globals.Pellets = Globals.Pellets.filter(pellet => !toRemove.includes(pellet));
    Globals.Explosions.forEach(explosion=>{
        explosion.update(timeDelta);
        explosion.render(ctx);
    });
    Globals.Supplies.forEach(supply=>{
        supply.update(timeDelta);
        supply.render(ctx);
        if(supply.isColliding(alien)){
            adjustAmmo(50);
            supply.destroy();
        }
    });
    Globals.Spores.forEach(spore=>{
        if(!spore.willDestroy){
            spore.update(timeDelta);
            spore.render(ctx);
            if(spore.isColliding(alien)){
                spore.destroy();
                decLives();
                alien.isHurt = true;
                Globals.sounds.die.play();
                setTimeout(()=>{
                    alien.isHurt = false;
                }, 400);
            }
        }
    });
    if(Globals.stats.lives < 1){
        gameOver.classList.remove("hidden");
    }
    else requestAnimationFrame(gameLoop);
}
function startGame(again = false){
    if(again){
        reset();
        Globals.UFOs.forEach(ufo =>{
            ufo.remove();
        });
        Globals.Supplies.forEach(supply =>{
            supply.remove();
        });
        Globals.Explosions.forEach(explosion =>{
            explosion.remove();
        });
        Globals.Spores.forEach(spore=>{
            spore.remove();
        });
        Globals.Pellets.forEach(pellet=>{
            pellet.remove();
        });
        Globals.UFOs.length = 0;
        Globals.Supplies.length = 0;
        Globals.Explosions.length = 0;
        Globals.Spores.length = 0;
        Globals.Pellets.length = 0;
        Globals.UFO_COUNT = 0;
        alien.pos.x = 800 - 56;
        lastUpdate = 0;
    }
    gameLoop(0);
}

document.addEventListener("keydown", (e)=> {
    if(e.key === "ArrowLeft"){
        alien.walkDir = -1;
    }
    else if(e.key === "ArrowRight"){
        alien.walkDir = 1;
    }
    else if(e.key === "ArrowUp"){
        alien.isShooting = true;
    }
});
document.addEventListener("keyup", function(e) {
    if(e.key === "ArrowLeft" || e.key === "ArrowRight"){
        alien.stand();
        Globals.mouseX = null;
    }
    else if(e.key === "ArrowUp"){
        alien.isShooting = false;
        alien.lastShot = 0;
    }
});
window.addEventListener("resize", e =>{
    Globals.xRatio = getXRatio();
});
const main = document.querySelector("main");
canvas.addEventListener("click", e=>{
    e.preventDefault();
    if(e.target === canvas) alien.shoot();
});
canvas.addEventListener("mousemove", e=>{
    e.preventDefault();
    Globals.mouseX = e.offsetX;
});

canvas.addEventListener("touchmove", e=>{
    e.preventDefault();
    Globals.mouseX = e.touches[0].clientX;
});
