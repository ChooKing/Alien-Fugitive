import {Movable} from "./Movable.js";
import {Globals} from "./globals.js";
import {Explosion} from "./Explosion.js";

export class Pellet extends Movable{
    constructor(pos) {
        super(pos, Globals.PELLET_SIZE, Globals.PELLET_SIZE, {minX: 0, maxX: Globals.GAME_WIDTH, minY: -Globals.PELLET_SIZE, maxY: Globals.GAME_HEIGHT});
        this.speed.y = -30;
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
            if(
                ((ufo.pos.x <= this.pos.x) && (ufo.pos.x + ufo.width >= this.pos.x)) &&
                ((ufo.pos.y <= this.pos.y) && (ufo.pos.y + ufo.height >= this.pos.y))
            ){
                Globals.Pellets = Globals.Pellets.filter(pellet => pellet !== this);
                const explosion = new Explosion({x:ufo.pos.x + (Globals.UFO_WIDTH / 2) - (Globals.EXPLOSION_SIZE / 2),y:ufo.pos.y + (Globals.UFO_HEIGHT / 2) - (Globals.EXPLOSION_SIZE / 2)}, ufo.speed);
                Globals.Explosions.push(explosion);
                delete this;
            }
        });
    }
}