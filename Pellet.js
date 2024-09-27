import {Movable} from "./Movable.js";
import {Globals} from "./globals.js";
import {Explosion} from "./Explosion.js";
import {adjustAmmo, incScore} from "./stats.js";

export class Pellet extends Movable{
    constructor(pos) {
        super(pos, Globals.PELLET_SIZE, Globals.PELLET_SIZE, {minX: 0, maxX: Globals.GAME_WIDTH, minY: -Globals.PELLET_SIZE, maxY: Globals.GAME_HEIGHT});
        this.speed.y = -30;
        adjustAmmo(-1);
    }
    render(ctx){
        ctx.fillStyle = "#ff2525";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, Globals.PELLET_SIZE, 0, Math.PI * 2);
        ctx.fill();
    }
    update(t){
        super.update(t);
        Globals.UFOs.forEach(ufo=>{
            if(this.isColliding(ufo) && !ufo.willDestroy){
                Globals.Pellets = Globals.Pellets.filter(pellet => pellet !== this);
                const explosion = new Explosion({x:ufo.pos.x + (Globals.UFO_WIDTH / 2) - (Globals.EXPLOSION_SIZE / 2),y:ufo.pos.y + (Globals.UFO_HEIGHT / 2) - (Globals.EXPLOSION_SIZE / 2)}, ufo.speed);
                Globals.Explosions.push(explosion);
                ufo.destroy();
                explosion.destroy();
                incScore(Math.floor(Globals.POINTS_PER_UFO * Globals.stats.level * 0.8));
                delete this;
            }
        });
    }
}