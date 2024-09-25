import {Globals} from "./globals.js";
const scoreDisplay = document.querySelector(".score");
const ammoDisplay = document.querySelector(".ammo");
export function incScore(points){
    Globals.stats.score += points;
    scoreDisplay.innerText = Globals.stats.score;
}
export function adjustAmmo(amount){
    Globals.stats.ammo += amount;
    ammoDisplay.innerText = Globals.stats.ammo;
}