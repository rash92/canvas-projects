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
        this.numObstacles = 10
        this.score = 0

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

    render(){
        this.background.update()
        this.background.draw()
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
        this.ctx.fillStyle = "red"
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.ratio = this.height/ this.baseHeight
        this.gravity = 0.15 * this.ratio
        this.speed = 3 * this.ratio
        this.player.resize()
        this.background.resize()
        this.createObstacles()
        console.log("obstacles are: ", this.obstacles)
        this.obstacles.forEach(obstacle => {
            obstacle.resize()
        })

    }
    createObstacles(){
        this.obstacles = []
        const firstX = 1000*this.ratio
        const obstacleSpacing = 1500*this.ratio
        console.log("creating obstacles...")
        for (let i=0; i<this.numObstacles; i++){
            console.log("obstacle will have x value: ", firstX + i*obstacleSpacing)
            this.obstacles.push(new Obstacle(this, firstX+i*obstacleSpacing))
        }
    }

}

window.addEventListener('load', ()=>{
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 720;

    const game = new Game(canvas, ctx);
    game.render();

    function animate(){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        game.render();
        requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
})