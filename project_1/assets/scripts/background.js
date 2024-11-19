export class Background {
    constructor(game){
        this.game = game
        this.image= document.getElementById('background')
        this.width = 2400
        this.height = this.game.baseHeight
        this.scaledWidth
        this.scaledHeight
        this.x
    }
    update(){
        this.x -= this.game.speed
        if (this.x <= -this.scaledWidth) this.x = 0
    }
    draw(){
        const numImages = Math.ceil(this.game.canvas.width / this.scaledWidth) + 1
        for (let imageCopy = 0; imageCopy < numImages; imageCopy++){
            this.game.ctx.drawImage(this.image, this.x + imageCopy * this.scaledWidth, 0, this.scaledWidth, this.scaledHeight)
        }
    }
    resize(){
        this.x = 0
        this.scaledHeight = this.height * this.game.ratio
        this.scaledWidth = this.width * this.game.ratio

    }
}