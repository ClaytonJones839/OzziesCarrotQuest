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
    //if this were a more realistic dog simulation, we would be adding to the velocity
    //instead of just assigning it outright
    //to make the experience more fun and 'bouncy' we just set it directly
    this.vel = -1 * CONSTANTS.RUN_SPEED;
  }

  moveDog() {
    //for each frame, the dog should move by it's current velocity
    //velocity is 'pixels per frame', so each frame it should update position by vel
    this.y += this.vel;
    //the acceleration of gravity is in pixels per second per second
    //so each second, it changes the velocity by whatever the gravity constant is
    this.vel += CONSTANTS.GRAVITY;
    //we set a 'terminal velocity', a maximum speed the dog can travel
    //this keeps the game from becoming too wild because the dog is moving too fast to control
    if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {
      //if the terminal velocity is exceeded, we set it to the terminal velicty
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
    ctx.fillStyle = "yellow";
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
    const belowTheBottom = this.y + CONSTANTS.DOG_HEIGHT > this.dimensions.height;
    return aboveTheTop || belowTheBottom;
  }
}