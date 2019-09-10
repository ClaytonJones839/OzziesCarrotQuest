import Dog from "./dog";
import Level from "./level";

export default class DogRunner {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.registerEvents();
    this.restart();
  }

  play() {
    this.running = true;
    this.animate();
  }

  restart() {
    this.running = false;
    this.score = 0;
    this.dog = new Dog(this.dimensions);
    this.level = new Level(this.dimensions);

    this.animate();
  }

  registerEvents() {
    this.boundClickHandler = this.click.bind(this);
    this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
  }

  click(e) {
    if (!this.running) {
      this.play();
    }
    this.dog.jump();
  }

  gameOver() {
    return (
      this.level.collidesWith(this.dog.bounds()) || this.dog.outOfBounds(this.height)
    );
  }

  animate() {
    this.level.animate(this.ctx);
    this.dog.animate(this.ctx);
    if (this.gameOver()) {
      alert(this.score);
      this.restart();
    }

    //we see if they have scored a point by passing a fence
    this.level.passedFence(this.dog.bounds(), () => {
      this.score += 1;
      console.log(this.score);
    });

    //and draw the score
    this.drawScore();

    //if the game is NOT running, we do not animate the next frame
    if (this.running) {
      //This calls this function again, after around 1/60th of a second
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  drawScore() {
    //loc will be the location 
    const loc = { x: this.dimensions.width / 2, y: this.dimensions.height / 4 }
    this.ctx.font = "bold 50pt serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.score, loc.x, loc.y);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.strokeText(this.score, loc.x, loc.y);
  }
}
