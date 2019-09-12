const CONSTANTS = {
    FENCE_SPEED: 2,
    CARROT_SPEED: 2,
    GAP_HEIGHT: 250,
    FENCE_WIDTH: 40,
    CARROT_WIDTH: 40,
    CARROT_HEIGHT: 40,
    EDGE_BUFFER: 200,
    FENCE_SPACING: 400,
    WARM_UP_SECONDS: 2,
    CARROT_SPACING: 400,
};

export default class Level {
    constructor(dimensions) {
        this.dimensions = dimensions;

        const firstFenceDistance =
            this.dimensions.width +
            (CONSTANTS.WARM_UP_SECONDS * 60 * CONSTANTS.FENCE_SPEED);

        this.fences = [
            this.randomFence(firstFenceDistance),
            this.randomFence(firstFenceDistance + CONSTANTS.FENCE_SPACING),
            this.randomFence(firstFenceDistance + (CONSTANTS.FENCE_SPACING * 2)),
        ];

        const firstCarrotDistance =
            this.dimensions.width +
            (CONSTANTS.WARM_UP_SECONDS * 2 * CONSTANTS.FENCE_SPEED);

        this.carrots = [
            this.randomCarrot(firstCarrotDistance),
            this.randomCarrot(firstCarrotDistance + CONSTANTS.CARROT_SPACING),
            this.randomCarrot(firstCarrotDistance + (CONSTANTS.CARROT_SPACING * 2)),
        ];
    }

    randomFence(x) {
        const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.GAP_HEIGHT;
        const gapTop = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;
        const fence = {
            bottomFence: {
                left: x,
                right: CONSTANTS.FENCE_WIDTH + x,
                top: gapTop + CONSTANTS.GAP_HEIGHT,
                bottom: this.dimensions.height
            },
            passed: false
        };
        return fence
    }

    randomCarrot(x) {
        const carrot = {
            bottomCarrot: {
                left: x,
                right: CONSTANTS.CARROT_WIDTH + x,
                top: 455,
                bottom: this.dimensions.height
            },
            passed: false
        };
        return carrot
    }

    animate(ctx, score) {
        this.drawBackground(ctx, score);
        this.moveFences();
        this.drawFences(ctx, score);
        this.moveCarrots();
        this.drawCarrots(ctx);
    }

    drawBackground(ctx, score) {
        const image = new Image();
        if (score < 5 ) {
            image.src = "https://www.123freevectors.com/wp-content/uploads/freevector/grass-sky-free-vector.jpg"
            // image.src = "./assets/images/Ozzie4.jpeg"
        } else if (score >= 5 && score < 10) {
            image.src = "http://clipart-library.com/newimages/city-clip-art-5.png"
        } else {
            image.src = "https://static.vecteezy.com/system/resources/previews/000/122/923/original/jungle-landscape-with-liana-hanging-vector.jpg"
        }


        
        ctx.drawImage(image, 0, 0, 1000, 500)
    }

    passedFence(dog, callback) {
        this.eachFence((fence) => {
            if (fence.bottomFence.right < dog.left) {
                if (!fence.passed) {
                    fence.passed = true;
                    callback();
                }
            }
        });
    }

    passedCarrot(dog, callback) {
        this.eachCarrot((carrot) => {
            if (carrot.bottomCarrot.left > dog.left && 
                carrot.bottomCarrot.right < dog.right && 
                dog.top > 400) {
                if (!carrot.passed) {
                    carrot.passed = true;
                    carrot.bottomCarrot.top = 500;
                    callback()
                }
            }
        });
    }

    moveFences() {
        this.eachFence(function (fence) {
            fence.bottomFence.left -= CONSTANTS.FENCE_SPEED;
            fence.bottomFence.right -= CONSTANTS.FENCE_SPEED;
        });

        if (this.fences[0].bottomFence.right <= 0) {
            this.fences.shift();
            const newX = this.fences[1].bottomFence.left + CONSTANTS.FENCE_SPACING;
            this.fences.push(this.randomFence(newX));
        }
    }

    moveCarrots() {
        this.eachCarrot(function (carrot) {
            carrot.bottomCarrot.left -= CONSTANTS.FENCE_SPEED;
            carrot.bottomCarrot.right -= CONSTANTS.FENCE_SPEED;
        });

        if (this.carrots[0].bottomCarrot.right <= 0) {
            this.carrots.shift();
            const newX = this.carrots[1].bottomCarrot.left + CONSTANTS.CARROT_SPACING;
            this.carrots.push(this.randomCarrot(newX));
        }
    }

    drawFences(ctx, score) {
        this.eachFence(function (fence) {
            const fenceImage = new Image();

            if (score < 5) {
                fenceImage.src = "./assets/images/wood.png"
            } else if (score >= 5 && score < 10) {
                fenceImage.src = "./assets/images/chain.png"
            } else {
                fenceImage.src = "./assets/images/snake.png"
            }

            ctx.drawImage(
                fenceImage,
                fence.bottomFence.left,
                fence.bottomFence.top,
                CONSTANTS.FENCE_WIDTH,
                fence.bottomFence.bottom - fence.bottomFence.top
            );
        });
    }

    drawCarrots(ctx) {
        this.eachCarrot(function (carrot) {
            const carrotImage = new Image();
            carrotImage.src = "./assets/images/carrot.png"

            ctx.drawImage(
                carrotImage,
                carrot.bottomCarrot.left,
                carrot.bottomCarrot.top,
                CONSTANTS.CARROT_WIDTH,
                CONSTANTS.CARROT_HEIGHT,
            );
        });
    }

    eachFence(callback) {
        this.fences.forEach(callback.bind(this));
    }

    eachCarrot(callback) {
        this.carrots.forEach(callback.bind(this));
    }

    collidesWith(dog) {
        const _overlap = (rect1, rect2) => {
            if (rect1.left > rect2.right || rect1.right < rect2.left) {
                return false;
            }
            if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {
                return false;
            }
            return true;
        };
        let collision = false;
        this.eachFence((fence) => {
            if (
                _overlap(fence.bottomFence, dog)
            ) { collision = true; }
        });
        return collision;
    }
}
