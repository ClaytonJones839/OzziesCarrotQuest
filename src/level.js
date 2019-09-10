const CONSTANTS = {
    FENCE_SPEED: 2,
    GAP_HEIGHT: 450,
    FENCE_WIDTH: 50,
    EDGE_BUFFER: 50,
    FENCE_SPACING: 220,
    WARM_UP_SECONDS: 1
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
            // topFence: {
            //     left: x,
            //     right: CONSTANTS.FENCE_WIDTH + x,
            //     top: 0,
            //     bottom: gapTop
            // },
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
        ctx.fillStyle = "skyblue";
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
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
            // fence.topFence.left -= CONSTANTS.FENCE_SPEED;
            // fence.topFence.right -= CONSTANTS.FENCE_SPEED;
            fence.bottomFence.left -= CONSTANTS.FENCE_SPEED;
            fence.bottomFence.right -= CONSTANTS.FENCE_SPEED;
        });

        //if a fence has left the screen add a new one to the end
        if (this.fences[0].bottomFence.right <= 0) {
            this.fences.shift();
            const newX = this.fences[1].bottomFence.left + CONSTANTS.FENCE_SPACING;
            this.fences.push(this.randomFence(newX));
        }
    }

    drawFences(ctx) {
        this.eachFence(function (fence) {
            ctx.fillStyle = "green";

            // draw top fence
            // ctx.fillRect(
            //     fence.topFence.left,
            //     fence.topFence.top,
            //     CONSTANTS.FENCE_WIDTH,
            //     fence.topFence.bottom - fence.topFence.top
            // );
            // draw bottom fence
            ctx.fillRect(
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
    //This method shall return true if the dog passed in is currently
    //colliding with any fence.
    collidesWith(dog) {
        //this function returns true if the the rectangles overlap
        const _overlap = (rect1, rect2) => {
            //check that they don't overlap in the x axis
            if (rect1.left > rect2.right || rect1.right < rect2.left) {
                return false;
            }
            //check that they don't overlap in the y axis
            if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {
                return false;
            }
            return true;
        };
        let collision = false;
        this.eachFence((fence) => {
            if (
                //check if the dog is overlapping (colliding) with either fence
                // _overlap(fence.topFence, dog) ||
                _overlap(fence.bottomFence, dog)
            ) { collision = true; }
        });
        return collision;
    }
}
