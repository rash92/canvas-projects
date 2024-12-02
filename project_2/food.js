export class Food {
    constructor(game){
        this.game = game
        this.image1 = document.getElementById("magic_berry1")
        this.image2 = document.getElementById("spider_food")
        this.x
        this.y
        this.reset()
    }
    reset(){
        this.x = Math.floor(Math.random() * this.game.columns)
        this.y = Math.floor(Math.random() * (this.game.rows - 2) + 2)
    }
    draw(){
        if (this.game.debug){
            this.game.ctx.fillStyle = 'white'
            this.game.ctx.fillRect(this.x * this.game.cellSize, this.y * this.game.cellSize, this.game.cellSize, this.game.cellSize)
        }
        this.game.ctx.drawImage(this.game.checkName("George")?this.image2:this.image1, this.x * this.game.cellSize, this.y * this.game.cellSize, this.game.cellSize, this.game.cellSize)
    }
    update(){

    }
}