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
    this.level.animate(this.ctx, this.score);
    this.dog.animate(this.ctx);
    if (this.gameOver()) {
        if (this.score === 0) {
          alert(`Oh no! You didn't get any carrots!`);
        } else {
          alert(`Great Job! You collected ${this.score} carrots!`);
        }
      this.restart();
    }

    this.level.passedCarrot(this.dog.bounds(), () => {
      this.score += 1;
      console.log(this.score);
    });

    this.drawScore();

    if (this.running) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  drawScore() {
    const loc = { x: this.dimensions.width / 1.75, y: this.dimensions.height / 8 }
    this.ctx.font = "25pt Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Carrots Collected: ${this.score}`, loc.x, loc.y);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.strokeText(`Carrots Collected: ${this.score}`, loc.x, loc.y);
  }
}
