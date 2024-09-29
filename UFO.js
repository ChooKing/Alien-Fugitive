import {SpriteBase} from "./Sprite.js";
import {Globals} from "./globals.js";
import {Spore} from "./Spore.js";

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
    willDestroy = false;
    canShoot = true;
    constructor(pos, speed) {
        super(pos);
        this.speed.x = speed;
        this.fps = speed * 0.9;
    }
    destroy(){
        this.willDestroy = true;
        Globals.sounds.explode.play();
        setTimeout(()=>{
            Globals.UFOs = Globals.UFOs.filter(ufo => ufo !== this);
            this.remove();
        }, Globals.UFO_DESTROY_TIME);
    }
    update(t) {
        super.update(t);
        if(Math.random() * 1000 < 2){
            if(this.canShoot){
                this.shoot();
                this.canShoot = false;
                setTimeout(()=>{this.canShoot = true}, 600);
            }
        }
    }
    shoot(){
        const spore = new Spore({x: this.pos.x + UFO.image.frameWidth / 2 - Spore.image.frameWidth / 2, y: this.pos.y + Spore.image.height});
        let sporeSpeed = this.speed.x;
        if(sporeSpeed < -500) sporeSpeed = -500;
        else if(sporeSpeed > 500) sporeSpeed = 500;
        spore.speed.x = sporeSpeed;
        Globals.Spores.push(spore);
    }
}