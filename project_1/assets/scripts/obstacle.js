export class Obstacle {
    constructor(game, x){
        this.game = game
        this.image = document.getElementById('obstacles')
        this.spriteWidth = 120
        this.spriteHeight = 120
        this.scaledWidth = this.spriteWidth * this.game.ratio
        this.scaledHeight = this.spriteHeight * this.game.ratio
        this.spritex = Math.floor(Math.random()*4)*this.spriteWidth
        this.x = x
        this.y = this.game.height * 0.5 - this.scaledHeight
        this.vx
        this.vy = (Math.random() - 0.5) * 3
        this.markedForDeletion = false

    }
    update(){
        this.x -= this.game.speed
        this.y += this.vy
        if (this.y <=0 || this.y >= this.game.height - this.scaledHeight ) this.vy *= -1
        if (this.isOffscreen()){
            this.markedForDeletion = true
            this.game.obstacles = this.game.obstacles.filter(obstacle => !obstacle.markedForDeletion)
            this.game.score++


            if (this.game.obstacles.length <=0){
                console.log("game over! all enemies defeated!")
                this.game.gameOver = true
            }
        }
    }
    draw(){
        this.game.ctx.drawImage(this.image, this.spritex, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.scaledWidth, this.scaledHeight)
    }
    resize(){
        this.scaledWidth = this.spriteWidth * this.game.ratio
        this.scaledHeight = this.spriteHeight * this.game.ratio
    }
    isOffscreen(){
        return this.x<0
    }
}