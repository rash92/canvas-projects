

class Game {
    constructor(canvas, context){
        this.canvas = canvas
        this.ctx = context
        this.width = this.canvas.width
        this.height = this.canvas.height

        window.addEventListener('resize', e => {
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight)

        })

    }
    resize(width, height){
        this.canvas.width = Math.floor(width)
        this.canvas.height = Math.floor(height)
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.render()
    }
    render(){
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(100,100,100,150)
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