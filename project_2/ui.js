export class Ui {
    constructor(game){
        this.game = game
        //display score
        this.scoreBoard1 = document.getElementById("scoreBoard1")
        this.scoreBoard2 = document.getElementById("scoreBoard2")
        this.scoreBoard3 = document.getElementById("scoreBoard3")
        this.scoreBoard4 = document.getElementById("scoreBoard4")
        // game menu
        this.gameMenu = document.getElementById("gameMenu")
        // game over
        this.gameOverScreen = document.getElementById("gameOverScreen")

        // buttons
        this.startButton = document.getElementById('startButton')
        this.startButton.addEventListener('click', ()=>{
            this.game.start()
        })
        // controls
        this.player1controls = document.getElementById("player1controls")
        this.player2controls = document.getElementById("player2controls")
        this.player3controls = document.getElementById("player3controls")
        this.player4controls = document.getElementById("player4controls")

        // names
        this.player1name = document.getElementById("player1name")
        this.player2name = document.getElementById("player2name")
        this.player3name = document.getElementById("player3name")
        this.player4name = document.getElementById("player4name")
    }
    update(){
        this.scoreBoard1.innerText = this.game.player1.name + ': ' + this.game.player1.score
        this.scoreBoard2.innerText = this.game.player2.name + ': ' + this.game.player2.score
        this.scoreBoard3.innerText = this.game.player3.name + ': ' + this.game.player3.score
        this.scoreBoard4.innerText = this.game.player4.name + ': ' + this.game.player4.score


    }
    gameplayUi(){
        this.gameMenu.style.display = 'none'
        this.startButton.innerText = 'Restart'
        this.gameOverScreen.style.display = 'none'
    }
    gameOverUi(){
        this.gameMenu.style.display = 'block'
        this.startButton.innerText = 'Start'
        this.gameOverScreen.style.display = 'block'
    }
}