import {SpriteBase} from "./Sprite.js";
import {Globals} from "./globals.js";

export class Spore extends new SpriteBase(
    "/sprites/spore.png",
    500,
    45,
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
        Globals.Spores = Globals.Spores.filter(s => s !== this);
        this.remove();
    }
    update(t) {
        super.update(t);
        if(this.pos.y > Globals.GAME_HEIGHT){
            this.destroy();
        }
    }
}