import {SpriteBase} from "./Sprite.js";
import {Globals} from "./globals.js";
export class Explosion extends new SpriteBase(
    "/sprites/explosion.png",
    600,
    120,
    5,
    {
        minX: -Globals.EXPLOSION_SIZE,
        maxX: Globals.GAME_WIDTH + Globals.EXPLOSION_SIZE,
        minY: -Globals.EXPLOSION_SIZE,
        maxY: Globals.GAME_HEIGHT + Globals.EXPLOSION_SIZE
    }){
    constructor(pos, speed) {
        super(
            pos
        );
        this.speed = speed;
        this.fps = 10;
    }
    destroy(){
        setTimeout(()=>{
            Globals.Explosions = Globals.Explosions.filter(ex => ex !== this);
            delete this;
        }, Globals.EXPLOSION_DESTROY_TIME);
    }
}