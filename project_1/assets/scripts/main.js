import { Player } from "./player.js";
import { Background } from "./background.js";
import { Obstacle } from "./obstacle.js";
import { AudioControl } from "./audio.js";

class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.bottomMargin;
    this.baseHeight = 720;
    this.ratio = this.height / this.baseHeight;
    this.gravity;
    this.speed;
    this.minSpeed;
    this.maxSpeed;
    this.background = new Background(this);
    this.player = new Player(this);
    this.sound = new AudioControl();
    this.obstacles = [];
    this.numObstacles = 15;
    this.score;
    this.timer;
    this.gameOver = false;
    this.message1;
    this.message2;
    this.smallFont;
    this.largeFont;
    this.eventTimer = 0;
    this.eventInterval = 500;
    this.eventUpdate = false;
    this.touchStartX;
    this.swipeMin = 50;

    this.resize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", (e) => {
      this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
    });

    // mouse controls
    this.canvas.addEventListener("mousedown", (e) => {
      this.player.flap();
    });

    // keyboard controls
    this.canvas.addEventListener("keydown", (e) => {
      if (e.key === " ") this.player.flap();
      if (e.key.toLowerCase() === "r")
        this.resize(window.innerWidth, window.innerHeight);
      if (e.key === "Shift" || e.key.toLowerCase() === "c")
        this.player.startCharge();
    });

    // touch controls
    this.canvas.addEventListener("touchstart", (e) => {
      this.touchStartX = e.changedTouches[0].pageX;
    });
    this.canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
    });
    this.canvas.addEventListener("touchend", (e) => {
      if (e.changedTouches[0].pageX - this.touchStartX > this.swipeMin) {
        this.player.startCharge();
      } else {
        this.player.flap();
      }
    });
  }

  render(deltaTime) {
    this.timer += deltaTime && !this.gameOver ? deltaTime : 0;
    this.handlePeriodicEvents(deltaTime);
    this.background.update();
    this.background.draw();

    this.drawStatusText();
    this.player.update();
    this.player.draw();

    this.obstacles.forEach((obstacle) => {
      obstacle.update();
      obstacle.draw();
    });
  }
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.bottomMargin = Math.floor(50 * this.ratio);
    this.ratio = this.height / this.baseHeight;
    this.gravity = 0.15 * this.ratio;
    this.speed = 5 * this.ratio;
    this.minSpeed = this.speed;
    this.maxSpeed = this.speed * 5;
    this.gameOver = false;
    this.score = 0;
    this.timer = 0;

    this.player.resize();
    this.background.resize();
    this.createObstacles();
    this.obstacles.forEach((obstacle) => {
      obstacle.resize();
    });

    this.smallFont = Math.ceil(25 * this.ratio);
    this.largeFont = Math.ceil(50 * this.ratio);
    this.ctx.fillStyle = "blue";
    this.ctx.font = this.smallFont + "px doto";
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "white";
  }
  createObstacles() {
    this.obstacles = [];
    const firstX = 1000 * this.ratio;
    const obstacleSpacing = this.eventInterval * this.ratio;
    for (let i = 0; i < this.numObstacles; i++) {
      this.obstacles.push(new Obstacle(this, firstX + i * obstacleSpacing));
    }
  }
  drawStatusText() {
    this.ctx.save();
    this.ctx.textAlign = "left";
    this.ctx.font = this.smallFont + "px doto";
    this.ctx.fillText("Time: " + this.formatTimer(), 10, 30);
    this.ctx.textAlign = "right";
    this.ctx.fillText("Score: " + this.score, this.width - 50, 30);
    if (this.gameOver) {
      this.ctx.textAlign = "center";
      this.ctx.font = this.largeFont + "px doto";
      this.ctx.fillText(
        this.message1,
        this.width * 0.5,
        this.height * 0.5 - this.largeFont,
        this.width
      );
      this.ctx.font = this.smallFont + "px doto";
      this.ctx.fillText(
        this.message2,
        this.width * 0.5,
        this.height * 0.5 - this.smallFont,
        this.width
      );
      this.ctx.fillText(
        "Press 'R' to try again!",
        this.width * 0.5,
        this.height * 0.5,
        this.width
      );
    }
    if (this.player.energy <= this.player.minEnergy) this.ctx.fillStyle = "red";
    else if (this.player.energy >= this.player.maxEnergy)
      this.ctx.fillStyle = "blue";
    else this.ctx.fillStyle = "green";
    for (let i = 0; i < this.player.energy; i++) {
      this.ctx.fillRect(
        10,
        this.height - 10 - 1.5 * i * this.player.energyBarSize,
        this.player.energyBarSize * 5,
        this.player.energyBarSize
      );
    }
    this.ctx.restore();
  }
  formatTimer() {
    return (this.timer * 0.001).toFixed(2);
  }
  handlePeriodicEvents(deltaTime) {
    if (this.eventTimer < this.eventInterval) {
      this.eventTimer += deltaTime;
      this.eventUpdate = false;
    } else {
      this.eventTimer = this.eventTimer % this.eventInterval;
      this.eventUpdate = true;
    }
  }
  checkCollision(a, b) {
    const dx = a.collisionX - b.collisionX;
    const dy = a.collisionY - b.collisionY;
    const distance = Math.hypot(dx, dy);
    const sumOfRadii = a.collisionR + b.collisionR;
    return distance <= sumOfRadii;
  }
  triggerGameOver() {
    if (!this.gameOver) {
      this.gameOver = true;
      if (this.obstacles.length <= 0) {
        this.message1 = "You win!";
        this.message2 =
          "Can you get faster than: " + this.formatTimer() + " seconds?";
        this.sound.win();
      } else {
        this.message1 = "Getting Rusty?";
        this.message2 =
          "Can you get past more than " + this.score + " enemies?";
        this.sound.lose();
      }
    }
  }
}

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 720;
  canvas.height = 720;

  const game = new Game(canvas, ctx);
  game.render();

  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.render(deltaTime);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});
