export class Player {
    constructor(game){
        this.game = game;
        this.x = 50;
        this.y;
        this.spriteWidth = 200
        this.spriteHeight = 200
        this.width = 100;
        this.height = 100;
        this.vx = 0
        this.vy
        this.ax = 0
        this.ay
        this.flapSpeed
    }
    draw(){
        this.game.ctx.fillRect(this.x,this.y,this.width,this.height)
    }
    update(){
        // function so that it rechecks whenever called rather than saving value at start of update function
        this.x += this.vx
        this.y += this.vy
        if (!this.isGrounded()) this.vy += this.ay
        if (this.isGrounded()){
            this.y = this.game.height - this.height
            
        }
    }
    resize(){
        this.width = this.spriteWidth * this.game.ratio
        this.height = this.spriteHeight * this.game.ratio
        this.y = (this.game.height - this.height) * 0.5
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
        return this.y >= this.game.height - this.height
    }
    isTouchingTop(){
        return this.y <= 0
    }
}