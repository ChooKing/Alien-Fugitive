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
    walkDir = 0;
    lastShot = 0;
    isShooting = false;
    isHurt = false;
    constructor() {
        super({x: 800 - 56, y: 650});
    }
    walk(dir) {
        if(this.speed.x === 0){
            this.speed.x = 10 * dir;
        }
        else this.speed.x += dir * 1.01;
        this.fps = this.speed.x * 3;
    }
    stand(){
        this.frame = 0;
        this.fps = 0;
        this.speed = {x: 0, y: 0};
        this.walkDir = 0;
    }
    shoot(){
        if(Globals.stats.ammo > 0){
            const pellet = new Pellet({x: this.pos.x + (this.width / 2), y: this.pos.y + 42});
            Globals.Pellets.push(pellet);
            Globals.sounds.shoot.play();
        }
    }
    render(ctx) {
        if(!this.isHurt || (Math.random()*1000 > 850)){
            super.render(ctx);
        }
    }

    update(t){
        //x: this.pos.x += (this.speed.x * t / 20)
        // if(
        //     Globals.mouseX && (
        //         (Globals.mouseX/Globals.xRatio > )||()
        //     )
        // ){
        //
        // }
        super.update(t);
        if(this.walkDir !== 0){
            this.walk(this.walkDir);
        }
        else if(Globals.mouseX){
            if((this.pos.x + this.width / 2) - 15 > Globals.mouseX / Globals.xRatio){
                this.walk(-1);
            }
            else if((this.pos.x + this.width / 2) + 15 < Globals.mouseX / Globals.xRatio){
                this.walk(1);
            }
            else{
                this.stand();
            }
        }
        if(this.isShooting){
            if(this.lastShot === 0){
                this.shoot();
            }
            else if(this.lastShot > 50){
                this.shoot();
                this.lastShot = 0;
            }
           this.lastShot += t;
        }
    }
}
