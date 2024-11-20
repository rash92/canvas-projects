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
        this.collisionX
        this.collisionY
        this.collisionR = this.scaledWidth * 0.5
        this.markedForDeletion = false
        

    }
    update(){
        this.x -= this.game.speed
        this.y += this.vy
        this.collisionX = this.x + this.scaledWidth * 0.5
        this.collisionY = this.y + this.scaledHeight * 0.5
        if (!this.game.gameOver){
            if (this.y <=0 || this.y >= this.game.height - this.scaledHeight ) this.vy *= -1

        }else{
            this.vy += 0.2
        }
        if (this.isOffscreen()){
            this.markedForDeletion = true
            this.game.obstacles = this.game.obstacles.filter(obstacle => !obstacle.markedForDeletion)

            if (!this.game.gameOver){
                this.game.score++
            }

            if (this.game.obstacles.length <=0){
                this.game.gameOver = true
            }
        }
        if (this.game.checkCollision(this, this.game.player)){
            this.game.gameOver = true
            this.game.player.collided = true
            this.game.player.stopCharge()
        }
    }
    draw(){
        // this.game.ctx.fillRect(this.x,this.y,this.scaledWidth, this.scaledHeight)
        this.game.ctx.drawImage(this.image, this.spritex, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.scaledWidth, this.scaledHeight)
        this.game.ctx.beginPath()
        this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionR, 0, Math.PI*2)
        this.game.ctx.stroke()
    }
    resize(){
        this.scaledWidth = this.spriteWidth * this.game.ratio
        this.scaledHeight = this.spriteHeight * this.game.ratio
    }
    isOffscreen(){
        return this.x < -this.scaledWidth || this.y > this.game.height
    }
}