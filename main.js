import {CONSTS} from "./consts.js";
import {Alien} from "./alien.js";
import {UFO} from "./UFO.js";
const canvas = document.querySelector("#app");
canvas.width = CONSTS.GAME_WIDTH;
canvas.height = CONSTS.GAME_HEIGHT;
const ctx = canvas.getContext("2d");
const alien = new Alien();
const testUFO = new UFO({x: 0, y: 300}, 5);
let UFOs = [];
let lastUpdate = 0;
let UFOInterval = 0;
function addUFO(){
    const y = Math.floor(Math.random() * CONSTS.SKY_SIZE);
    const dir = Math.random() > 0.5 ? -1 : 1;
    const ufo = new UFO({x: dir > 0 ? -160 : CONSTS.GAME_WIDTH + 160, y}, dir * 3);
    UFOs.push(ufo);
    UFOInterval = 0;
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
    UFOs.forEach(ufo =>{
        ufo.update(timeDelta);
        if((ufo.pos.x <= -160 && ufo.speed.x < 0) ||(ufo.pos.x >= CONSTS.GAME_WIDTH && ufo.speed.x > 0)){
            toRemove.push(ufo);
        }
        else ufo.render(ctx);
    });
    UFOs = UFOs.filter(ufo => !toRemove.includes(ufo));
    requestAnimationFrame(gameLoop);
}
gameLoop(0);
document.addEventListener("keydown", function(e) {
    if(e.key === "ArrowLeft"){
        //alien.speed.x = -5;
        alien.walk(-1);
    }
    else if(e.key === "ArrowRight"){
        //alien.speed.x = 5;
        alien.walk(1);
    }
    else if(e.key === " "){
        //alien.shoot();
    }
});
document.addEventListener("keyup", function(e) {
    if(e.key === "ArrowLeft" || e.key === "ArrowRight"){
        alien.stand();
    }
})
