import {Sprite} from "./Sprite.js";
export class Alien extends Sprite {
    constructor() {
        super({x: 800 - 56, y: 650}, "/sprites/alien.png", 672, 200, 6);
    }
    walk(dir) {
        this.speed.x += dir * 2;
        this.fps = this.speed.x * 3;
    }
    stand(){
        this.frame = 0;
        this.fps = 0;
        this.speed = {x: 0, y: 0};
    }
    update(t){
        super.update(t);
    }
}
