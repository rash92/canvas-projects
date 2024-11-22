import { Player } from "./player.js"

class Game {
    constructor(canvas, context){
        this.canvas = canvas
        this.ctx = context
        this.width
        this.height
        this.snake = new Player(this,0,0, 1, 1)
        this.cellSize = 50
        this.columns
        this.rows

        window.addEventListener('resize', e => {
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight)

        })
        this.resize(window.innerWidth,window.innerHeight)
    }
    resize(width, height){
        this.canvas.width = width - width%this.cellSize
        this.canvas.height = height - height%this.cellSize
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.columns = this.width/this.cellSize
        this.rows = this.height/this.cellSize
        this.render()
    }
    render(){
        this.drawGrid()
        this.snake.update()
        this.snake.draw()
    }
    drawGrid(){
        console.log("trying to draw grid")
        for (let y = 0; y < this.rows; y++){
            for (let x = 0; x < this.columns; x++){
                this.ctx.strokeRect(x*this.cellSize,y*this.cellSize,this.cellSize,this.cellSize)
            }
        }
    }
}

window.addEventListener('load', ()=>{
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const game = new Game(canvas, ctx)
    game.render()

    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        game.render()
        requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
})