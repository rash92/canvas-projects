export class Snake {
    constructor(game, x, y, vx, vy, color, name) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = this.game.cellSize;
        this.height = this.game.cellSize;
        this.color = color;
        this.moving = true;
        this.score = 0
        this.length = 2
        this.segments = []
        this.readyToTurn = true
        this.name = name

    }
    update() {
        this.readyToTurn = true
        // check collision
        if (this.game.checkCollision(this, this.game.food)) {
            this.game.food.reset()
            this.score++
            this.length++
        }
        // stop moving when hitting walls, alternatively can change to dying
        if (this.x <= 0 && this.vx < 0 || this.y <= this.game.topMargin && this.vy < 0 || this.x >= this.game.columns - 1 && this.vx > 0 || this.y >= this.game.rows - 1 && this.vy > 0) {
            this.moving = false
        }
        if (this.moving) {
            this.x += this.vx;
            this.y += this.vy;
            this.segments.unshift({ x: this.x, y: this.y })
            if (this.segments.length > this.length){
                this.segments.pop()
            }
        }
        if (this.score >= this.game.winningScore){
            this.game.triggerGameOver()
        }
    }
    draw() {
        this.segments.forEach((segment, i) => {
            this.game.ctx.fillStyle = i === 0? 'lightgreen' : this.color;
            this.game.ctx.fillRect(
                segment.x * this.game.cellSize,
                segment.y * this.game.cellSize,
                this.width,
                this.height
            );
        })

    }
    turnUp() {
        if (this.vy !== 0 || !this.readyToTurn) return
        this.vx = 0;
        this.vy = -1;
        this.moving = true
        this.readyToTurn = false
    }
    turnDown() {
        if (this.vy !== 0 || !this.readyToTurn) return
        this.vx = 0;
        this.vy = 1;
        this.moving = true
        this.readyToTurn = false


    }
    turnLeft() {
        if (this.vx !== 0 || !this.readyToTurn) return
        this.vx = -1;
        this.vy = 0;
        this.moving = true
        this.readyToTurn = false


    }
    turnRight() {
        if (this.vx !== 0 || !this.readyToTurn) return
        this.vx = 1;
        this.vy = 0;
        this.moving = true
        this.readyToTurn = false


    }
}


export class Keyboard1 extends Snake {
    constructor(game, x, y, vx, vy, color, name) {
        super(game, x, y, vx, vy, color, name);

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
    constructor(game, x, y, vx, vy, color, name) {
        super(game, x, y, vx, vy, color, name);

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
    constructor(game, x, y, vx, vy, color, name) {
        super(game, x, y, vx, vy, color, name);
        this.turnTimer = 0
        this.turnInterval = Math.floor(Math.random() * 5)

    }
    update() {
        super.update()
        if (this.turnTimer < this.turnInterval) {
            this.turnTimer += 1
        } else {
            this.turnTimer = 0
            this.turnRandom()
        }

    }
    turnRandom() {
        if (this.vy === 0) {
            Math.random() < 0.5 ? this.turnUp() : this.turnDown()
        } else if (this.vx === 0) {
            Math.random() < 0.5 ? this.turnLeft() : this.turnRight()
        }
    }
}