import {Movable} from "./Movable.js";
export function SpriteBase(src, width, height, frameCount, range){
    return class staticThis extends Movable{
        frame = 0;
        fps = 0;
        lastFrameAdvance = 0;

        static image;
        static range;
        static{
            this.image = {
                width: width,
                height: height,
                frameCount: frameCount,
                frameWidth: width / frameCount,
                img: new Image()
            }
            this.image.img.src = src;
            this.range = range;
        }
        constructor(pos) {
            super(pos, staticThis.image.frameWidth, staticThis.image.height, range);
        }
        nextFrame(dir){
            this.frame += dir;
            if (this.frame > staticThis.image.frameCount - 1) this.frame = 0;
            else if(this.frame < 0) this.frame = staticThis.image.frameCount - 1;
        }
        render(ctx) {
            ctx.drawImage(
                staticThis.image.img,
                this.frame * staticThis.image.frameWidth,
                0,
                staticThis.image.frameWidth,
                staticThis.image.height,
                Math.round(this.pos.x),
                Math.round(this.pos.y),
                staticThis.image.frameWidth,
                staticThis.image.height
            );
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
}