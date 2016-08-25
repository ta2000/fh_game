"use strict";

class Bullet extends Sprite {
    constructor(url, x, y, w, h, speed) {
        super(url, x, y, w, h);
        this.speed = speed;
    }
    
    update(modifier) {
        this.x += this.speed * modifier;
    }
    
    draw(ctx) {
        Sprite.prototype.draw.call(this, ctx);
    }
}
