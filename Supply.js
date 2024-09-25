import {SpriteBase} from "./Sprite.js";
import {Globals} from "./globals.js";

export class Supply extends new SpriteBase(
    "/sprites/supply.png",
    500,
    62,
    10,
    {
        minX: -50,
        maxX: Globals.GAME_WIDTH + 50,
        minY: 0,
        maxY: Globals.GAME_HEIGHT
    }) {
    willDestroy = false;
    constructor(pos) {
        super(pos);
        this.speed.x = 0;
        this.speed.y = 5;
        this.fps = 5;
    }
    destroy(){
        this.willDestroy = true;
        Globals.Supplies = Globals.Supplies.filter(s => s !== this);
        delete this;
    }
}