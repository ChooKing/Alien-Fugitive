import {Globals} from "./globals.js";
import {SpriteBase} from "./Sprite.js";
import {Pellet} from "./Pellet.js";
export class Alien extends new SpriteBase(
    "/sprites/alien.png",
    672,
    200,
    6,
    {
        minX: 0,
        maxX: Globals.GAME_WIDTH,
        minY: 0,
        maxY: Globals.GAME_HEIGHT
    }) {
    constructor() {
        super({x: 800 - 56, y: 650});
    }
    walk(dir) {
        this.speed.x += dir * 2.5;
        this.fps = this.speed.x * 3;
    }
    stand(){
        this.frame = 0;
        this.fps = 0;
        this.speed = {x: 0, y: 0};
    }
    shoot(){
        if(Globals.stats.ammo > 0){
            const pellet = new Pellet({x: this.pos.x + (this.width / 2), y: this.pos.y + 42});
            Globals.Pellets.push(pellet);
        }
    }
    update(t){
        super.update(t);
    }
}
