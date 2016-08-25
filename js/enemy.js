"use strict";

class Enemy extends Sprite {
    constructor(url, x, y, w, h, speed, target) {
        super(url, x, y, w, h);
        this.gravity = 2;
        this.velX = 0;
        this.velY = 0;
        this.friction = 0.95;
        this.speed = speed;
        this.target = target;
    }
    
    update(modifier) {        
        this.x += this.velX * modifier;
        this.y += this.velY * modifier;
        
        this.velX *= this.friction;
        
        if (this.y >= 300) {
            this.onground = true;
            this.velY = 0;
            this.y = 300;
        } else {
            this.onground = false;
            this.velY += this.gravity;
        }
        
        if (this.target.x < this.x) {
            this.velX -= this.speed;
        } else {
            this.velX += this.speed;
        }
    }
    
    draw(ctx) {
        Sprite.prototype.draw.call(this, ctx);
    }
}
