import {MakeSprite} from "./Sprite.js";
import {Globals} from "./globals.js";
const ExplosionBase = MakeSprite("/sprites/explosion.png");
export class Explosion extends ExplosionBase{
    constructor(pos, speed) {
        super(
            pos,
            600,
            120,
            5,
            {
                minX: -Globals.EXPLOSION_SIZE,
                maxX: Globals.GAME_WIDTH + Globals.EXPLOSION_SIZE,
                minY: -Globals.EXPLOSION_SIZE,
                maxY: Globals.GAME_HEIGHT + Globals.EXPLOSION_SIZE
            }
        );
        this.speed = speed;
        this.fps = 10;
    }
}