import {Sprite} from "./Sprite.js";
import {Globals} from "./globals.js";

export class UFO extends Sprite {
    constructor(pos, speed) {
        super(pos, "/sprites/ufo.png", 1600, 54, 10, {minX: -160, maxX: Globals.GAME_WIDTH + 160, minY: 0, maxY: Globals.GAME_HEIGHT});
        this.speed.x = speed;
        this.fps = speed * 0.9;
    }
}