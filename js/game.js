"use strict";

class Game {
    constructor() {
        this.canvas;
        this.ctx;
        this.then;
        this.player;
        this.enemies = [];
        this.camera = {
            x: 0,
            y: 0
        };
        this.world = {
            width: 4000,
            height:2000
        };
        this.keys = {};
    }
    
    start() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        window.onkeydown = this.keyDown.bind(this);
        window.onkeyup = this.keyUp.bind(this);
        
        this.then = Date.now();
        
        this.player = new Player("sprites/mario.png", 40, 40, 64, 96, 3);
        
        for (var i=0; i<20; i++) {
            this.enemies.push(new Enemy("sprites/koopa.png", 600, 40, 100, 100, Math.random()*2+0.5, this.player));
        }

        this.main();
    }
    
    keyDown(key) {
        this.keys[key.keyCode] = true;
    }
    
    keyUp(key) {
        delete this.keys[key.keyCode];
    }
    
    loadLevel(url) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4) {
                var json = xhttp.responseText;
                var level = JSON.parse(json);
                console.log(level);
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
    }
    
    main() {
        var now = Date.now();
        var delta = now - this.then;
        var modifier = delta/100;
        
        this.update(modifier);
        this.draw();
       
        this.then = now;
        window.requestAnimationFrame(this.main.bind(this));
    }
    
    update(modifier) {
        this.player.update(this.keys, this.world, modifier, this.enemies);
        
        for (var i=0; i<this.enemies.length; i++) {
            this.enemies[i].update(modifier);
        }
    }
    
    draw() {
        this.ctx.setTransform(1,0,0,1,0,0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Camera follow player
        this.camera.x = (-this.player.x + this.canvas.width/2);
        this.camera.y = (-this.player.y + this.canvas.height/2);
        // Clamp to world boundary
        this.camera.x = this.clamp(this.camera.x, 0, this.world.width - this.canvas.width);
        this.camera.y = this.clamp(this.camera.y, 0, this.world.height - this.canvas.height);
        // Translate to camera
        this.ctx.translate(this.camera.x, this.camera.y);
        
        var tileSize = 256;
        var counter = 0;
        for (var i=0; i<this.world.width; i+=tileSize) {
            for (var j=0; j<this.world.height; j+=tileSize) {
                if (counter % 2 == 0) {
                    this.ctx.fillStyle = "black";
                } else {
                    this.ctx.fillStyle = "gray";
                }
                
                this.ctx.fillRect(i, j, tileSize, tileSize);
                
                counter++;
            }
            counter++;
        }
        
        this.player.draw(this.ctx);
        
        for (var i=0; i<this.enemies.length; i++) {
            this.enemies[i].draw(this.ctx);
        }
    }
    
    clamp(num, min, max) {
        if (num > min) return min;
        else if (num < -max) return -max;
        return num;
    }
}

























