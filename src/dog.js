const CONSTANTS = {
  GRAVITY:  0.4,
  RUN_SPEED:  8,
  TERMINAL_VEL:  12,
  DOG_WIDTH:  40,
  DOG_HEIGHT:  30
};

export default class Dog {

  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width / 3;
    this.y = this.dimensions.height / 2;
    this.vel = 0;
  }

  jump() {
    this.vel = -1 * CONSTANTS.RUN_SPEED;
  }

  moveDog() {
    this.y += this.vel;
    this.vel += CONSTANTS.GRAVITY;
    if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {
      if (this.vel > 0) {
        this.vel = CONSTANTS.TERMINAL_VEL;
      } else {
        this.vel = CONSTANTS.TERMINAL_VEL * -1;
      }
    }
  }

  animate(ctx) {
    this.moveDog();
    this.drawDog(ctx);
  }

  drawDog(ctx){
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, CONSTANTS.DOG_WIDTH, CONSTANTS.DOG_HEIGHT);
  }

  bounds() {
    return {
      left: this.x,
      right: this.x + CONSTANTS.DOG_WIDTH,
      top: this.y,
      bottom: this.y + CONSTANTS.DOG_HEIGHT
    };
  }

  outOfBounds() {
    const aboveTheTop = this.y < 0;
    return aboveTheTop 
  }
}
