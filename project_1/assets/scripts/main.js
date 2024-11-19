import {Player} from "./player.js"
import {Background} from "./background.js"
import {Obstacle} from "./obstacle.js"

class Game {
    constructor(canvas, context){
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 720
        this.ratio = this.height/ this.baseHeight
        this.gravity
        this.speed
        this.background = new Background(this)
        this.player = new Player(this)
        this.obstacles = []
        this.numObstacles = 3
        this.score
        this.timer
        this.gameOver = false

        this.resize(window.innerWidth, window.innerHeight)

        window.addEventListener('resize', (e)=>{
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight )
        })

        // mouse controls
        this.canvas.addEventListener('mousedown', e => {
            this.player.flap()
        })
        // keyboard controls
        this.canvas.addEventListener('keydown', e=>{
            if (e.key === ' ') this.player.flap()
        })
        // touch controls
        this.canvas.addEventListener('touchstart', e=>{
            this.player.flap()
        })
    }

    render(deltaTime){
        this.timer += deltaTime && !this.gameOver?deltaTime:0
        this.background.update()
        this.background.draw()
        
        this.drawStatusText()
        this.player.update()
        this.player.draw()
        
        this.obstacles.forEach(obstacle =>{
            obstacle.update()
            obstacle.draw()
        })
        
    }
    resize(width, height){
        this.canvas.width = width
        this.canvas.height = height
        this.ctx.fillStyle = "blue"
        this.ctx.font = "30px doto"
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.ratio = this.height/ this.baseHeight
        this.gravity = 0.15 * this.ratio
        this.speed = 5 * this.ratio
        this.player.resize()
        this.background.resize()
        this.createObstacles()
        this.obstacles.forEach(obstacle => {
            obstacle.resize()
        })
        this.score = 0
        this.timer = 0

    }
    createObstacles(){
        this.obstacles = []
        const firstX = 1000*this.ratio
        const obstacleSpacing = 1500*this.ratio
        for (let i=0; i<this.numObstacles; i++){
            this.obstacles.push(new Obstacle(this, firstX+i*obstacleSpacing))
        }
    }
    drawStatusText(){
        this.ctx.save()
        this.ctx.fillText('Time: ' + this.formatTimer(), 10, 30)
        this.ctx.textAlign = 'right'
        this.ctx.fillText('Score: ' + this.score, this.width - 50, 30)
        if (this.gameOver){
            this.textAlign = 'center'
            this.ctx.fillText('Game Over!', this.width*.5, this.height*.5)
        }
        this.ctx.restore()
    }
    formatTimer(){
        return (this.timer*0.001).toFixed(2)
    }

}

window.addEventListener('load', ()=>{
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 720;

    const game = new Game(canvas, ctx);
    game.render();

    let lastTime = 0
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0,0,canvas.width, canvas.height)
        game.render(deltaTime);
        requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
})