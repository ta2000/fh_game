"use strict";

class Sprite {
    constructor(url, x, y, w, h) {
        this.img = new Image();
        this.img.src = url;
        this.angle = 0;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.w/2, this.y + this.h/2);
        ctx.rotate(this.angle);
        ctx.drawImage(this.img, -this.w/2, -this.h/2, this.w, this.h);
        ctx.restore();
    }
    
    distance(obj) {
        var xDist = (this.x + this.w/2) - (obj.x + obj.w/2);
        var yDist = (this.y + this.h/2) - (obj.y + obj.h/2);
        var dist = Math.sqrt((xDist * xDist) + (yDist * yDist));
        return dist;
    }
    
    collision(obj) {
        if (this.x < obj.x + obj.w &&
            this.x + this.w > obj.x &&
            this.y < obj.y + obj.h &&
            this.y + this.h > obj.y) {
                return true;
        }
        return false;
    }
}
