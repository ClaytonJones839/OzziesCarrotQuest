const CONSTANTS = {
  GRAVITY:  0.4,
  RUN_SPEED:  8,
  TERMINAL_VEL:  12,
  DOG_WIDTH:  80,
  DOG_HEIGHT:  60
};

export default class Dog {

  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width / 4;
    this.y = 440;
    this.vel = 0;
  }

  jump() {
    this.vel = -1 * CONSTANTS.RUN_SPEED;
  }

  moveDog() {
    if ( this.y > 440) {
      this.y = 440
    }
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
    const dogImage = new Image();
    dogImage.src ="./assets/images/pinpng.com-running-png-482783.png"
    ctx.drawImage(dogImage, this.x, this.y, 80, 60)
    // ctx.fillStyle = "orange";
    // ctx.fillRect(this.x, this.y, CONSTANTS.DOG_WIDTH, CONSTANTS.DOG_HEIGHT);
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
