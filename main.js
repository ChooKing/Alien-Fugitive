import {Globals} from "./globals.js";
import {Alien} from "./alien.js";
import {UFO} from "./UFO.js";
import {Supply} from "./Supply.js";
import {adjustAmmo, decLives} from "./stats.js";
const canvas = document.querySelector("#app");
canvas.width = Globals.GAME_WIDTH;
canvas.height = Globals.GAME_HEIGHT;
const ctx = canvas.getContext("2d");
const intro = document.querySelector(".intro");
const stats = document.querySelector(".stats");
const btnPlay = document.querySelector("#btn-play");
btnPlay.addEventListener("click", function(){
    intro.classList.add("hidden");
    stats.classList.remove("hidden");
});
const alien = new Alien();
let lastUpdate = 0;
let UFOInterval = 0;
function addUFO(){
    Globals.UFO_COUNT += 1;
    const y = Math.floor(Math.random() * Globals.SKY_SIZE);
    const dir = Math.random() > 0.5 ? -1 : 1;
    const ufo = new UFO({x: dir > 0 ? -160 : Globals.GAME_WIDTH + 160, y}, dir * 3);
    Globals.UFOs.push(ufo);
    UFOInterval = 0;
    if(Globals.UFO_COUNT >= Globals.UFOs_PER_SUPPLY){
        Globals.UFO_COUNT = 0;
        const supply = new Supply({x: Math.floor(Math.random() * Globals.GAME_WIDTH - (alien.width * 2)) + alien.width, y: -Supply.image.height});
        Globals.Supplies.push(supply);
    }
}
function gameLoop(t){
    const timeDelta = lastUpdate === 0 ? 0 : t - lastUpdate;
    UFOInterval += timeDelta;
    if(UFOInterval > 5000) addUFO();
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

            }
        }
    });
    if(Globals.stats.lives < 1){
        console.log("Game Over");
    }
    else requestAnimationFrame(gameLoop);
}
gameLoop(0);
document.addEventListener("keydown", function(e) {
    if(e.key === "ArrowLeft"){
        alien.walk(-1);
    }
    else if(e.key === "ArrowRight"){
        alien.walk(1);
    }
    else if(e.key === " "){
        alien.shoot();
    }
});
document.addEventListener("keyup", function(e) {
    if(e.key === "ArrowLeft" || e.key === "ArrowRight"){
        alien.stand();
    }
})
