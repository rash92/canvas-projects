export class Player {
    constructor(game){
        this.game = game;
        this.image= document.getElementById('player')
        this.spriteY = {"idle": 0, "up": 1, "down": 2, "charge": 3}
        this.state
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
        this.collisionX
        this.collisionY
        this.collisionR
        this.collided = false
        this.flapSpeed
        this.energy = 30
        this.maxEnergy = this.energy * 2
        this.minEnergy = 15
        this.energyBarSize
        this.charging = false
    }
    draw(){
        this.game.ctx.drawImage(this.image, 0,this.spriteY[this.state]*this.spriteHeight,this.spriteWidth, this.spriteHeight, this.x, this.y, this.scaledWidth, this.scaledHeight)
        this.game.ctx.beginPath()
        this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionR, 0, Math.PI*2)
        this.game.ctx.stroke()
    }
    update(){
        this.handleEnergy()
        // x position doesn't actually ever change
        // this.x += this.vx 
        this.y += this.vy
        
        this.collisionY = this.y + this.scaledHeight*0.5
        if (!this.isGrounded() && !this.charging) this.vy += this.ay
        else this.vy = 0
        if (this.isGrounded()){
            this.y = this.game.height - this.scaledHeight
            
        }
        if (this.vy > 0 ) this.state = "down"
        if (this.isGrounded() && !this.charging) this.state = "idle"
        if (this.charging) this.state = "charge"
    }
    resize(){
        this.scaledWidth = this.spriteWidth * this.game.ratio
        this.scaledHeight = this.spriteHeight * this.game.ratio
        this.y = (this.game.height - this.scaledHeight) * 0.5
        this.vy = -5* this.game.ratio
        this.ay = this.game.gravity
        this.flapSpeed = -5*this.game.ratio
        this.collisionR= this.scaledWidth * 0.2
        //x value here because it doesn't change apart from when resizing so no need to do unnecessary calculations every frame
        this.collisionX = this.x + this.scaledWidth*0.5 + this.collisionR
        this.collided = false
        this.energy = this.maxEnergy
        this.energyBarSize = 5 * this.game.ratio
        this.state = "idle"
        this.charging = false
    }
    flap(){
        if(!this.isTouchingTop()){
            this.vy = this.flapSpeed
            this.state = "up"
        }
        this.stopCharge()
    }
    isGrounded (){ 
        return this.y >= this.game.height - this.scaledHeight
    }
    isTouchingTop(){
        return this.y <= 0
    }
    handleEnergy(){
        if (this.game.eventUpdate){
            if (this.energy < this.maxEnergy){
                this.energy += 0.5
            }
            
            if (this.charging){
                this.energy -= 3
                if (this.energy <= 0){
                    this.energy = 0
                    this.stopCharge()
                }
                
            }
        }
        
    }
    startCharge(){
        this.charging = true
        this.game.speed = this.game.maxSpeed
        
    }
    stopCharge(){
        this.charging = false
        this.game.speed = this.game.minSpeed
        
    }
}