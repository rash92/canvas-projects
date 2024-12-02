export class Food {
    constructor(game){
        this.game = game
        this.image = document.getElementById("mushroom_sprite")
        this.spriteWidth = 200
        this.spriteHeight = 400
        this.frameX = 0
        this.maxFrame = 8
        this.imageSpider = document.getElementById("spider_food")
        this.x
        this.y

        this.reset()
    }
    reset(){
        this.x = Math.floor(Math.random() * this.game.columns)
        this.y = Math.floor(Math.random() * (this.game.rows - 2) + 2)
        this.frameX = 0
    }
    draw(){
        if (this.game.debug){
            this.game.ctx.fillStyle = 'white'
            this.game.ctx.fillRect(this.x * this.game.cellSize, this.y * this.game.cellSize, this.game.cellSize, this.game.cellSize)
        }
        this.game.checkName("George")
        ?this.game.ctx.drawImage(this.imageSpider, this.x * this.game.cellSize, this.y * this.game.cellSize, this.game.cellSize, this.game.cellSize)
        :this.game.ctx.drawImage(this.image, this.frameX * this.spriteWidth,0,this.spriteWidth,this.spriteHeight, this.x * this.game.cellSize, (this.y - 1) * this.game.cellSize, this.game.cellSize, this.game.cellSize* 2)

    }
    update(){
        if (this.frameX < this.maxFrame) this.frameX++
    }
}