import {Movable} from "./Movable.js";
import {Globals} from "./globals.js";

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
                delete this;
            }
        });
    }
}