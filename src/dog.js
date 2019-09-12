const CONSTANTS = {
  GRAVITY:  0.35,
  RUN_SPEED:  8,
  TERMINAL_VEL:  12,
  DOG_WIDTH:  110,
  DOG_HEIGHT:  50
};

export default class Dog {

  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width / 4;
    this.y = 420;
    this.vel = 0;
  }

  jump() {
    this.vel = -1 * CONSTANTS.RUN_SPEED;
  }

  moveDog() {
    if ( this.y > 405) {
      this.y = 405
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

    if (this.y < 405 && this.y >= 150) {
      const dogImage = new Image();
      dogImage.src = "./assets/images/Ozzie-pix2.png"
      ctx.drawImage(dogImage, this.x, this.y, 120, 90)
    } else if ( this.y < 150 ){
      const dogImage = new Image();
      dogImage.src = "./assets/images/Ozzie-pix3.png"
      ctx.drawImage(dogImage, this.x, this.y, 120, 90)
    } else {
      const dogImage = new Image();
      dogImage.src = "./assets/images/Ozzie-pix1.png"
      ctx.drawImage(dogImage, this.x, this.y, 120, 90)
    }

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
