import {SpriteBase} from "./Sprite.js";
import {Globals} from "./globals.js";
export class UFO extends new SpriteBase(
    "/sprites/ufo.png",
    1600,
    54,
    10,
    {
        minX: -160,
        maxX: Globals.GAME_WIDTH + 160,
        minY: 0,
        maxY: Globals.GAME_HEIGHT
    }) {
    constructor(pos, speed) {
        super(pos);
        this.speed.x = speed;
        this.fps = speed * 0.9;
    }
}