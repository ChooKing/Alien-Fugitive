export const alien = {
    container: document.getElementById("alien-viewport"),
    sprite: document.getElementById("alien"),
    offsetX: 0,
    pos: 50,
    speed: 0.8,
    walk(dir){
        this.offsetX += dir * 16.6666;
        if(this.offsetX < -83.3333) this.offsetX = 0;
        else if(this.offsetX > 0) this.offsetX = -83.3333;
        this.sprite.style.setProperty("--offset-x",`${this.offsetX}%`);
        this.pos += dir * this.speed;
        this.container.style.left = `${this.pos}%`;
    }
}
