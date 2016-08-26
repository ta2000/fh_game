"use strict";

class Sprite {
    constructor(url, x, y, w, h) {
        this.img = new Image();
        this.img.src = url;
        this.imageLoaded = true;
        this.img.onload = function() {
            this.imageLoaded = true;
            
            // Set width/height to image width/height if undefined
            /*if (this.w == undefined) {
                this.w = this.img.width;
            }
            if (this.h == undefined) {
                this.h = this.img.height;
            }*/
        }
        this.angle = 0;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    
    draw(ctx) {
        if (this.imageLoaded == false ||
            this.w == undefined ||
            this.h == undefined) {
                return;
        }
        
        ctx.save();
        ctx.translate(this.x + this.w/2, this.y + this.h/2);
        ctx.rotate(this.angle);
        ctx.drawImage(this.img, -this.w/2, -this.h/2, this.w, this.h);
        ctx.restore();
    }
    
    drawTile(ctx, tilesPerRow, padding, tileWidth, tileHeight, x, y, tileNum) {
        var row = Math.floor((tileNum-1) / tilesPerRow);
        var column = (tileNum-1) % tilesPerRow;
        ctx.drawImage(
            this.img,
            column * tileHeight + column * padding,
            row * tileWidth + row * padding,
            tileWidth,
            tileHeight,
            x,
            y,
            tileWidth,
            tileHeight
        );
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
