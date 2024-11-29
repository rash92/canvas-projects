export class Snake {
    constructor(game, x, y, vx, vy, color) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = this.game.cellSize;
        this.height = this.game.cellSize;
        this.color = color;
        this.moving = true;
    }
    update() {
        // stop moving when hitting walls, alternatively can change to dying
        if (this.x <= 0 && this.vx < 0 || this.y <= 0 && this.vy < 0 || this.x >= this.game.columns - 1 && this.vx > 0 || this.y >= this.game.rows - 1 && this.vy > 0) {
            this.moving = false
        }
        if (this.moving) {
            this.x += this.vx;
            this.y += this.vy;
        }
    }
    draw() {
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillRect(
            this.x * this.game.cellSize,
            this.y * this.game.cellSize,
            this.width,
            this.height
        );
    }
    turnUp() {
        this.vx = 0;
        this.vy = -1;
        this.moving = true
    }
    turnDown() {
        this.vx = 0;
        this.vy = 1;
        this.moving = true

    }
    turnLeft() {
        this.vx = -1;
        this.vy = 0;
        this.moving = true

    }
    turnRight() {
        this.vx = 1;
        this.vy = 0;
        this.moving = true

    }
}


export class Keyboard1 extends Snake {
    constructor(game, x, y, vx, vy, color) {
        super(game, x, y, vx, vy, color);

        window.addEventListener("keydown", (e) => {
            switch (e.key.toLowerCase()) {
                case "w":
                    this.turnUp();
                    break;
                case "s":
                    this.turnDown();
                    break;
                case "a":
                    this.turnLeft();
                    break;
                case "d":
                    this.turnRight();
            }
        });
    }
}

export class Keyboard2 extends Snake {
    constructor(game, x, y, vx, vy, color) {
        super(game, x, y, vx, vy, color);

        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowUp":
                    this.turnUp();
                    break;
                case "ArrowDown":
                    this.turnDown();
                    break;
                case "ArrowLeft":
                    this.turnLeft();
                    break;
                case "ArrowRight":
                    this.turnRight();
            }
        });
    }
}

export class AiSnake extends Snake {
    constructor(game, x, y, vx, vy, color) {
        super(game, x, y, vx, vy, color);
        this.turnTimer = 0
        this.turnInterval = Math.floor(Math.random()*5)
        
    }
    update(){
        super.update()
        if (this.turnTimer < this.turnInterval){
            this.turnTimer += 1
        } else {
            this.turnTimer = 0
            this.turnRandom()
        }

    }
    turnRandom(){
        if (this.vy === 0){
            Math.random() < 0.5 ? this.turnUp() : this.turnDown()
        }else if (this.vx === 0){
            Math.random() < 0.5 ? this.turnLeft() : this.turnRight()
        }
    }
}