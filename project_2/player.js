export class Player {
    constructor(game, x, y, vx, vy){
        this.game = game
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy

    }
    update(){
        this.x += this.vx
        this.y += this.vy
    }
    draw(){
        this.game.ctx.fillStyle = 'blue'
        this.game.ctx.fillRect(this.x,this.y,50,20)

    }
    resize(){

    }
}