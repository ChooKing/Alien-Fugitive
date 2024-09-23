import {Movable} from "./Movable.js";
export function MakeSprite(src){
    return class SpriteBase extends Movable{
        frame = 0;
        fps = 0;
        static img = null;
        image = {
            src: "",
            width: 0,
            height: 0,
            frameCount: 0,
            frameWidth: 0,
        }
        lastFrameAdvance = 0;

        constructor(pos, width, height, frameCount, range) {
            super(pos, width / frameCount, height, range);
            this.image.width = width;
            this.image.height = height;
            this.image.frameCount = frameCount;
            this.image.frameWidth = width / frameCount;
            if(!SpriteBase.img){
                SpriteBase.img = new Image();
                SpriteBase.img.src = src;
            }
        }
        nextFrame(dir){
            this.frame += dir;
            if (this.frame > this.image.frameCount - 1) this.frame = 0;
            else if(this.frame < 0) this.frame = this.image.frameCount - 1;
        }
        render(ctx) {
            ctx.drawImage(
                SpriteBase.img,
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