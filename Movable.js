import {CONSTS} from "./consts.js";
export class Movable{
    speed = {x: 0, y: 0};
    pos = {x: 0, y: 0};
    width;
    height;
    constructor(startPos, width, height){
        this.pos.x = startPos.x;
        this.pos.y = startPos.y;
        this.width = width;
        this.height = height;
    }
    update(t){
        this.pos = {
            x: this.pos.x += (this.speed.x * t / 40),
            y: this.pos.y += (this.speed.y * t / 40)
        }
        if(this.pos.x < 0) this.pos.x = 0;
        else if(this.pos.x > CONSTS.GAME_WIDTH - this.width) this.pos.x = CONSTS.GAME_WIDTH - this.width;
    }
}