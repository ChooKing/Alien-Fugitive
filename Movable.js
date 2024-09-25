export class Movable{
    speed = {x: 0, y: 0};
    pos = {x: 0, y: 0};
    width;
    height;
    range;
    constructor(startPos, width, height, range){
        this.pos.x = startPos.x;
        this.pos.y = startPos.y;
        this.width = width;
        this.height = height;
        this.range = range;
    }
    update(t){
        this.pos = {
            x: this.pos.x += (this.speed.x * t / 20),
            y: this.pos.y += (this.speed.y * t / 20)
        }
        if(this.pos.x < this.range.minX) this.pos.x = this.range.minX;
        else if(this.pos.x > this.range.maxX - this.width) this.pos.x = this.range.maxX - this.width;
    }
    isColliding(other){
        return (
            (
                (other.pos.x <= this.pos.x) &&
                (other.pos.x + other.width >= this.pos.x)
            ) &&
            (
                (other.pos.y <= this.pos.y) &&
                (other.pos.y + other.height >= this.pos.y)
            )
        );
    }
}