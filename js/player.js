"use strict";

class Player extends Sprite {
    constructor(url, x, y, w, h, speed) {
        super(url, x, y, w, h);
        this.bullets = [];
        this.cooldown = 20;
        this.gravity = 2;
        this.velX = 0;
        this.velY = 0;
        this.friction = 0.95;
        this.jumpHeight = 60;
        this.onground = false;
        this.speed = speed;
    }
    
    update(keys, world, modifier, enemies) {
        this.x += this.velX * modifier;
        this.y += this.velY * modifier;
        
        // Friction
        this.velX *= this.friction;
        
        // Gravity
        if (this.y >= 300) {
            this.onground = true;
            this.velY = 0;
            this.y = 300;
        } else {
            this.onground = false;
            this.velY += this.gravity;
        }
        
        // Enemy collisions
        for (var i=0; i<enemies.length; i++) {
            if (this.collision(enemies[i])) {
                if (this.y < enemies[i].y) {
                    enemies.splice(i, 1);
                    this.velY = -this.jumpHeight/2;
                    break;
                } else {
                    alert("Game over");
                    location.reload();
                }
            }
        }
        
        // D Key
        if (68 in keys) {
            this.velX += this.speed;
        }
        // A Key
        if (65 in keys) {
            this.velX -= this.speed;
        }
        // Spacebar
        if (32 in keys && this.onground) {
            this.velY -= this.jumpHeight;
        }
        // E Key
        if (69 in keys && this.cooldown <= 0) {
            this.shoot();
            this.cooldown = 20;
        }

        // Wrap around screen horizontally
        if (this.x + this.w < 0) {
            this.x = world.width;
        }
        else if (this.x > world.width) {
            this.x = -this.w;
        }
        
        // Wrap around screen vertically
        if (this.y + this.h < 0) {
            this.y = world.height;
        }
        else if (this.y > world.height) {
            this.y = 0;
        }
        
        // Update bullets
        if (this.cooldown > 0) {
            this.cooldown--;
        }
        for (var i=0; i<this.bullets.length; i++) {
            this.bullets[i].update(modifier);
            
            // Remove bullets outside world
            if (this.bullets[i].x > world.width ||
                this.bullets[i].x < 0 ||
                this.bullets[i].y > world.height ||
                this.bullets[i].y < 0) {
                    this.bullets.splice(i--, 1);
                    continue;
            }
            
            // Collisions with enemies
            for (var j=0; j<enemies.length; j++) {
                if ( this.bullets[i].collision(enemies[j]) ) {
                    this.bullets.splice(i--, 1);
                    enemies.splice(j, 1);
                    break;
                }
            }
        }
    }
    
    draw(ctx) {
        Sprite.prototype.draw.call(this, ctx);
        
        // Draw bullets
        for (var i=0; i<this.bullets.length; i++) {
            this.bullets[i].draw(ctx);
        }
    }
    
    shoot() {
        this.bullets.push(new Bullet("sprites/bullet.png", this.x, this.y, 32, 32, 75));
    }
}










