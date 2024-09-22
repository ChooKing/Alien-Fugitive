import {Movable} from "./Movable.js";

export class Sprite extends Movable {
    frame = 0;
    fps = 0;
    //isAnimating = false;
    image = {
        img: null,
        src: "",
        width: 0,
        height: 0,
        frameCount: 0,
        frameWidth: 0,
        loaded: false
    }
    lastFrameAdvance = 0;

    constructor(pos, src, width, height, frameCount, range) {
        super(pos, width / frameCount, height, range);
        this.image.src = src;
        this.image.width = width;
        this.image.height = height;
        this.image.frameCount = frameCount;
        this.image.frameWidth = width / frameCount;
        this.image.img = new Image();
        this.image.img.src = src;
        this.image.img.addEventListener("load", () => {
            this.image.loaded = true;
        });
    }
    nextFrame(dir){
        this.frame += dir;
        if (this.frame > this.image.frameCount - 1) this.frame = 0;
        else if(this.frame < 0) this.frame = this.image.frameCount - 1;
    }
    render(ctx) {
        if(this.image.loaded){
            ctx.drawImage(
                this.image.img,
                this.frame * this.image.frameWidth,
                0,
                this.image.frameWidth,
                this.image.height,
                Math.round(this.pos.x),
                Math.round(this.pos.y),
                this.image.frameWidth,
                this.image.height
            );
        }

    }
    update(t){
        super.update(t);
        if(this.fps !== 0){
            if(this.lastFrameAdvance === 0){
                this.nextFrame(this.fps > 1 ? 1 : -1);
            }
            else if(this.lastFrameAdvance > Math.abs(1000 / this.fps)){
                this.nextFrame(this.fps > 1 ? 1 : -1);
                this.lastFrameAdvance = 0;
            }
            this.lastFrameAdvance += t;
        }
    }
}