export class AudioControl {
    constructor(){
        this.chargeSound = document.getElementById("charge")
        this.flap1 = document.getElementById("flap1")
        this.flap2 = document.getElementById("flap2")
        this.flap3 = document.getElementById("flap3")
        this.flap4 = document.getElementById("flap4")
        this.flap5 = document.getElementById("flap5")
        this.flaps = [this.flap1,this.flap2,this.flap3,this.flap4,this.flap5]
        this.loseSound = document.getElementById("lose")
        this.winSound = document.getElementById("win")
    }
    play(sound){
        sound.currentTime = 0
        sound.play()
    }
    charge(){
        this.play(this.chargeSound)
    }
    flap(){
        this.play(this.flaps[Math.floor(Math.random()*4)])
    }
    lose(){
        this.play(this.loseSound)
    }
    win(){
        this.play(this.winSound)
    }
}