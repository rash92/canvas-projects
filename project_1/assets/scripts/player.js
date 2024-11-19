export class Player {
    constructor(game){
        this.game = game;
        this.image= document.getElementById('player')
        this.x = 50;
        this.y;
        this.spriteWidth = 200
        this.spriteHeight = 200
        this.scaledWidth = 100;
        this.scaledHeight = 100;
        this.vx = 0
        this.vy
        this.ax = 0
        this.ay
        this.flapSpeed
    }
    draw(){
        this.game.ctx.drawImage(this.image, 0,0,this.spriteWidth, this.spriteHeight, this.x, this.y, this.scaledWidth, this.scaledHeight)
    }
    update(){
        this.x += this.vx
        this.y += this.vy
        if (!this.isGrounded()) this.vy += this.ay
        if (this.isGrounded()){
            this.y = this.game.height - this.scaledHeight
            
        }
    }
    resize(){
        this.scaledWidth = this.spriteWidth * this.game.ratio
        this.scaledHeight = this.spriteHeight * this.game.ratio
        this.y = (this.game.height - this.scaledHeight) * 0.5
        this.vy = -5* this.game.ratio
        this.ay = this.game.gravity
        this.flapSpeed = -5*this.game.ratio
    }
    flap(){
        if(!this.isTouchingTop()){
            this.vy = this.flapSpeed
        }
    }
    isGrounded (){ 
        return this.y >= this.game.height - this.scaledHeight
    }
    isTouchingTop(){
        return this.y <= 0
    }
}