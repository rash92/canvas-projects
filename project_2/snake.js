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
        this.length = 3 // need to start with at least 3 to draw properly
        this.segments = []
        for (let i = 0; i < this.length; i++) {
            this.x += this.vx
            this.y += this.vy
            this.segments.unshift({ x: this.x, y: this.y, frameX: 5, frameY: 0 })
        }
        this.readyToTurn = true
        this.name = name
        this.image = document.getElementById('snake_corgi')
        this.spriteWidth = 200
        this.spriteHeight = 200

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
            this.segments.unshift({ x: this.x, y: this.y, frameX: 2, frameY: 3 })
            if (this.segments.length > this.length) {
                this.segments.pop()
            }
        }
        if (this.score >= this.game.winningScore) {
            this.game.triggerGameOver()
        }
    }
    draw() {
        this.segments.forEach((segment, i) => {

            if (this.game.debug) {
                this.game.ctx.fillStyle = i === 0 ? 'lightgreen' : this.color;
                this.game.ctx.fillRect(
                    segment.x * this.game.cellSize,
                    segment.y * this.game.cellSize,
                    this.width,
                    this.height
                );
            }
            this.setSpriteFrame(i)
            this.game.ctx.drawImage(this.image, segment.frameX * this.spriteWidth, segment.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, segment.x * this.game.cellSize, segment.y * this.game.cellSize, this.width, this.height)

        })


    }
    turnUp() {
        if (this.vy !== 0 || this.y <= this.game.topMargin || !this.readyToTurn) return
        this.vx = 0;
        this.vy = -1;
        this.moving = true
        this.readyToTurn = false
    }
    turnDown() {
        if (this.vy !== 0 || this.y >= this.game.rows - 1 || !this.readyToTurn) return
        this.vx = 0;
        this.vy = 1;
        this.moving = true
        this.readyToTurn = false


    }
    turnLeft() {
        if (this.vx !== 0 || this.x <= 0 || !this.readyToTurn) return
        this.vx = -1;
        this.vy = 0;
        this.moving = true
        this.readyToTurn = false


    }
    turnRight() {
        if (this.vx !== 0 || this.x >= this.game.columns - 1 || !this.readyToTurn) return
        this.vx = 1;
        this.vy = 0;
        this.moving = true
        this.readyToTurn = false


    }
    setSpriteFrame(index) {
        const segment = this.segments[index]
        const prevSegment = this.segments[index - 1]
        const nextSegment = this.segments[index + 1]


        if (index === 0) { //head segment
            if (segment.y < nextSegment.y) { // facing up
                segment.frameX = 1
                segment.frameY = 2
            } else if (segment.y > nextSegment.y) {// facing down 
                segment.frameX = 0
                segment.frameY = 4
            } else if (segment.x < nextSegment.x) { // facing left
                segment.frameX = 0
                segment.frameY = 0
            } else if (segment.x > nextSegment.x) { // facing right
                segment.frameX = 2
                segment.frameY = 1
            } else { //shouldn't be possible
                console.log("you have segments overlapping head for some reason")
            }

            // tail segment
        } else if (index === this.segments.length - 1) {
            if (prevSegment.y < segment.y) {// up
                segment.frameX = 1
                segment.frameY = 4
            } else if (prevSegment.y > segment.y) { // down
                segment.frameX = 0
                segment.frameY = 2
            } else if (prevSegment.x < segment.x) { // left
                segment.frameX = 2
                segment.frameY = 0
            } else if (prevSegment.x > segment.x) { //right
                segment.frameX = 0
                segment.frameY = 1
            } else { // shouldn't happen
                console.log("you have segments overlapping tail for some reason")
            }
            // body segment
        } else {
            if (nextSegment.x < segment.x && prevSegment.x > segment.x) { // horizontal right
                segment.frameX = 5
                segment.frameY = 3
            } else if (prevSegment.x < segment.x && nextSegment.x > segment.x) { // horizontal left
                segment.frameX = 5
                segment.frameY = 2
            } else if (prevSegment.y < segment.y && nextSegment.y > segment.y) { // vertical up
                segment.frameX = 1
                segment.frameY = 3
            } else if (nextSegment.y < segment.y && prevSegment.y > segment.y) { // vertical down
                segment.frameX = 0
                segment.frameY = 3
                //bending middle counter clockwise
            } else if (prevSegment.x < segment.x && nextSegment.y > segment.y) { // up left
                segment.frameX = 4
                segment.frameY = 0
            } else if (prevSegment.y > segment.y && nextSegment.x > segment.x) { // left down
                segment.frameX = 3
                segment.frameY = 0
            } else if (prevSegment.x > segment.x && nextSegment.y < segment.y) { // down right
                segment.frameX = 3
                segment.frameY = 1
            } else if (prevSegment.y < segment.y && nextSegment.x < segment.x) { // right up
                segment.frameX = 4
                segment.frameY = 1
                //bending middle cloclwise
            } else if (nextSegment.x < segment.x && prevSegment.y > segment.y) { // right down
                segment.frameX = 3
                segment.frameY = 2
            } else if (nextSegment.y < segment.y && prevSegment.x < segment.x) { // down left
                segment.frameX = 3
                segment.frameY = 3
            } else if (nextSegment.x > segment.x && prevSegment.y < segment.y) { // left up
                segment.frameX = 2
                segment.frameY = 3
            } else if (nextSegment.y > segment.y && prevSegment.x > segment.x) { // up right
                segment.frameX = 2
                segment.frameY = 2
            } else {
                console.log("shouldn't be possible to get here")
                segment.frameX = 6
                segment.frameY = 0
            }

        }
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
        this.turnInterval

    }
    update() {
        super.update()
        if (this.turnTimer < this.turnInterval) {
            this.turnTimer += 1
        } else {
            this.turnTimer = 0
            this.turnRandom()
            this.turnInterval = Math.floor(Math.random() * 5)
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