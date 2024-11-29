import { AiSnake, Keyboard1, Keyboard2 } from "./snake.js";
import { Food } from "./food.js";
import { Ui } from "./ui.js";
import { Background } from "./background.js";

class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
        this.width;
        this.height;
        this.cellSize = 50;
        this.columns;
        this.rows;
        this.topMargin = 3

        this.eventTimer = 0;
        this.eventInterval = 200;
        this.eventUpdate = false;

        this.gameOver = true
        this.winningScore = 3

        this.player1
        this.player2
        this.player3
        this.player4
        this.food
        this.background
        this.gameObjects
        this.gameUi = new Ui(this)

        window.addEventListener("resize", (e) => {
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
        });
        this.resize(window.innerWidth, window.innerHeight);
    }
    resize(width, height) {
        this.canvas.width = width - (width % this.cellSize);
        this.canvas.height = height - (height % this.cellSize);
        this.ctx.font = '30px Impact'
        this.ctx.textBaseline = 'top'
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.columns = Math.floor(this.width / this.cellSize);
        this.rows = Math.floor(this.height / this.cellSize);
        this.background = new Background(this)

 
        // this.snake.resize()
    }
    start(){
        if (!this.gameOver){
            this.triggerGameOver()
            return
        }
        this.gameUi.gameplayUi()
        this.gameOver = false
        this.player1 = new Keyboard1(this, 0, this.topMargin, 0, 1, 'red', 'plinko');
        this.player2 = new Keyboard2(this,  this.columns - 1,this.rows - 1, 0, -1, 'blue', 'horse')
        this.player3 = new AiSnake(this, 0, this.rows - 1, 1, 0, 'yellow', 'eeby')
        this.player4 = new AiSnake(this,  this.columns - 1,this.topMargin, -1, 0, 'cyan', 'deeby')
        this.food = new Food(this)
        this.gameObjects = [this.player1, this.player2, this.player3, this.player4, this.food]
        this.ctx.clearRect(0,0,this.width, this.height)
    }
    triggerGameOver(){
        this.gameOver = true
        this.gameUi.gameOverUi()
    }
    handlePeriodicEvents(deltaTime) {
        if (this.eventTimer < this.eventInterval) {
            this.eventTimer += deltaTime;
            this.eventUpdate = false;
        } else {
            this.eventTimer = 0;
            this.eventUpdate = true;
        }
    }
    
    drawGrid() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                this.ctx.strokeRect(
                    x * this.cellSize,
                    y * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );
            }
        }
    }
    checkCollision(a,b){
        return a.x === b.x && a.y === b.y
    }
    render(deltaTime) {
        this.handlePeriodicEvents(deltaTime);
        if (this.eventUpdate && !this.gameOver) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.background.draw()
            this.drawGrid();

            this.gameObjects.forEach((object)=>{
                object.draw()
                object.update()
            })
            this.gameUi.update()
        }

    }
}

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const game = new Game(canvas, ctx);
    game.render();

    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        game.render(deltaTime);
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
});
