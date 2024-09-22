import {Sprite} from "./Sprite.js";
import {CONSTS} from "./consts.js";

export class UFO extends Sprite {
    constructor(pos, speed) {
        super(pos, "/sprites/ufo.png", 1600, 54, 10, {minX: -160, maxX: CONSTS.GAME_WIDTH + 160, minY: 0, maxY: CONSTS.GAME_HEIGHT});
        this.speed.x = speed;
        this.fps = speed * 0.9;
    }
}