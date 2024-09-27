import {Globals} from "./globals.js";
const scoreDisplay = document.querySelector(".score");
const ammoDisplay = document.querySelector(".ammo");
const livesDisplay = document.querySelector(".lives");
const levelDisplay = document.querySelector(".level");
export function incScore(points){
    Globals.stats.score += points;
    scoreDisplay.innerText = Globals.stats.score;
}
export function adjustAmmo(amount){
    Globals.stats.ammo += amount;
    ammoDisplay.innerText = Globals.stats.ammo;
}
export function decLives(){
    Globals.stats.lives -= 1;
    livesDisplay.innerText = Globals.stats.lives;
}
export function incLevel(){
    Globals.stats.level += 1;
    levelDisplay.innerText = Globals.stats.level;
}
export function reset(){
    Globals.stats.level = 1;
    Globals.stats.ammo = 50;
    Globals.stats.lives = 5;
    Globals.stats.score = 0;
    scoreDisplay.innerText = Globals.stats.score;
    ammoDisplay.innerText = Globals.stats.ammo;
    livesDisplay.innerText = Globals.stats.lives;
    levelDisplay.innerText = Globals.stats.level;
}