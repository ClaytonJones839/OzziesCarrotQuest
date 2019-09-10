const CONSTANTS = {
    FENCE_SPEED: 2,
    GAP_HEIGHT: 250,
    FENCE_WIDTH: 40,
    EDGE_BUFFER: 5,
    FENCE_SPACING: 400,
    WARM_UP_SECONDS: 2
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

    animate(ctx) {
        this.drawBackground(ctx);
        this.moveFences();
        this.drawFences(ctx);
    }

    drawBackground(ctx) {
        const image = new Image();
        image.src = "https://www.123freevectors.com/wp-content/uploads/freevector/grass-sky-free-vector.jpg"
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

    drawFences(ctx) {
        this.eachFence(function (fence) {
            const fenceImage = new Image();
            fenceImage.src = "http://getdrawings.com/vectors/wood-grain-pattern-vector-23.jpg"

            ctx.drawImage(
                fenceImage,
                fence.bottomFence.left,
                fence.bottomFence.top,
                CONSTANTS.FENCE_WIDTH,
                fence.bottomFence.bottom - fence.bottomFence.top
            );
        });
    }

    eachFence(callback) {
        this.fences.forEach(callback.bind(this));
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
