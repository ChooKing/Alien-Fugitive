import {CONSTS} from "./consts.js";
import {Alien} from "./alien.js";
const canvas = document.querySelector("#app");
canvas.width = CONSTS.GAME_WIDTH;
canvas.height = CONSTS.GAME_HEIGHT;
const ctx = canvas.getContext("2d");
const alien = new Alien();
let lastUpdate = 0;
function gameLoop(t){
    const timeDelta = lastUpdate === 0 ? 0 : t - lastUpdate;
    lastUpdate = t;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    alien.update(timeDelta);
    alien.render(ctx);
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
