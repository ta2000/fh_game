"use strict";

class Game {
    constructor() {
        this.canvas;
        this.ctx;
        this.then;
        this.background;
        this.tileSets = [];
        this.player;
        this.enemies = [];
        this.tiles;
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
        
        this.tileSets.push(new Sprite("sprites/platformer_tileset.png", 0, 0, 376, 104));
        
        this.background = new Sprite("sprites/background.png", 0, 0);
        
        // Add player
        this.player = new Player("sprites/mario.png", 40, 40, 64, 96, 3);
        
        // Add enemies
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
        var tiles = [];
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var json = xhttp.responseText;
                var level = JSON.parse(json);
                var levelData = level.layers[0];
                
                // Copy data from array
                for (var i=0; i<levelData.data.length; i++) {
                    tiles.push(levelData.data[i]);
                }
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
        
        this.tiles = tiles;
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
        
        // Draw background image
        this.background.draw(this.ctx);
        
        
        // Draw Player
        this.player.draw(this.ctx);
        
        this.tileSets[0].drawTile(this.ctx, 11, 32, 32, this.player.x, this.player.y, 30);
        // Draw all enemies
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

























