/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dog.js":
/*!********************!*\
  !*** ./src/dog.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Dog; });\nconst CONSTANTS = {\n  GRAVITY:  0.4,\n  RUN_SPEED:  8,\n  TERMINAL_VEL:  12,\n  DOG_WIDTH:  110,\n  DOG_HEIGHT:  60\n};\n\nclass Dog {\n\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n    this.x = this.dimensions.width / 4;\n    this.y = 420;\n    this.vel = 0;\n  }\n\n  jump() {\n    this.vel = -1 * CONSTANTS.RUN_SPEED;\n  }\n\n  moveDog() {\n    if ( this.y > 405) {\n      this.y = 405\n    }\n    this.y += this.vel;\n    this.vel += CONSTANTS.GRAVITY;\n    if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {\n      if (this.vel > 0) {\n        this.vel = CONSTANTS.TERMINAL_VEL;\n      } else {\n        this.vel = CONSTANTS.TERMINAL_VEL * -1;\n      }\n    }\n  }\n\n  animate(ctx) {\n    this.moveDog();\n    this.drawDog(ctx);\n  }\n\n  drawDog(ctx){\n\n    if (this.y < 405 && this.y >= 150) {\n      const dogImage = new Image();\n      dogImage.src = \"./assets/images/Ozzie-pix2.png\"\n      ctx.drawImage(dogImage, this.x, this.y, 120, 90)\n    } else if ( this.y < 150 ){\n      const dogImage = new Image();\n      dogImage.src = \"./assets/images/Ozzie-pix3.png\"\n      ctx.drawImage(dogImage, this.x, this.y, 120, 90)\n    } else {\n      const dogImage = new Image();\n      dogImage.src = \"./assets/images/Ozzie-pix1.png\"\n      ctx.drawImage(dogImage, this.x, this.y, 120, 90)\n    }\n\n  }\n\n  bounds() {\n    return {\n      left: this.x,\n      right: this.x + CONSTANTS.DOG_WIDTH,\n      top: this.y,\n      bottom: this.y + CONSTANTS.DOG_HEIGHT\n    };\n  }\n\n  outOfBounds() {\n    const aboveTheTop = this.y < 0;\n    return aboveTheTop \n  }\n}\n\n\n//# sourceURL=webpack:///./src/dog.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DogRunner; });\n/* harmony import */ var _dog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dog */ \"./src/dog.js\");\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n\n\n\nclass DogRunner {\n  constructor(canvas) {\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = { width: canvas.width, height: canvas.height };\n    this.registerEvents();\n    this.restart();\n  }\n\n  play() {\n    this.running = true;\n    this.animate();\n  }\n\n  restart() {\n    this.running = false;\n    this.score = 0;\n    this.dog = new _dog__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions);\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n\n    this.animate();\n  }\n\n  registerEvents() {\n    this.boundClickHandler = this.click.bind(this);\n    this.ctx.canvas.addEventListener(\"mousedown\", this.boundClickHandler);\n  }\n\n  click(e) {\n    if (!this.running) {\n      this.play();\n    }\n    this.dog.jump();\n  }\n\n  gameOver() {\n    return (\n      this.level.collidesWith(this.dog.bounds()) || this.dog.outOfBounds(this.height)\n    );\n  }\n\n  animate() {\n    this.level.animate(this.ctx);\n    this.dog.animate(this.ctx);\n    if (this.gameOver()) {\n        if (this.score === 0) {\n          alert(`Oh no! You didn't get any carrots!`);\n        } else {\n          alert(`Great Job! You collected ${this.score} carrots!`);\n        }\n      this.restart();\n    }\n\n    this.level.passedCarrot(this.dog.bounds(), () => {\n      this.score += 1;\n      console.log(this.score);\n    });\n\n    this.drawScore();\n\n    if (this.running) {\n      requestAnimationFrame(this.animate.bind(this));\n    }\n  }\n\n  drawScore() {\n    const loc = { x: this.dimensions.width / 1.75, y: this.dimensions.height / 8 }\n    this.ctx.font = \"25pt Arial\";\n    this.ctx.fillStyle = \"black\";\n    this.ctx.fillText(`Carrots Collected: ${this.score}`, loc.x, loc.y);\n    this.ctx.strokeStyle = \"black\";\n    this.ctx.lineWidth = 2;\n    this.ctx.strokeText(`Carrots Collected: ${this.score}`, loc.x, loc.y);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst canvas = document.getElementById('dog-game');\nnew _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\nconst CONSTANTS = {\n    FENCE_SPEED: 2,\n    CARROT_SPEED: 2,\n    GAP_HEIGHT: 250,\n    FENCE_WIDTH: 40,\n    CARROT_WIDTH: 40,\n    CARROT_HEIGHT: 40,\n    EDGE_BUFFER: 5,\n    FENCE_SPACING: 400,\n    WARM_UP_SECONDS: 2,\n    CARROT_SPACING: 400,\n};\n\nclass Level {\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n\n        const firstFenceDistance =\n            this.dimensions.width +\n            (CONSTANTS.WARM_UP_SECONDS * 60 * CONSTANTS.FENCE_SPEED);\n\n        this.fences = [\n            this.randomFence(firstFenceDistance),\n            this.randomFence(firstFenceDistance + CONSTANTS.FENCE_SPACING),\n            this.randomFence(firstFenceDistance + (CONSTANTS.FENCE_SPACING * 2)),\n        ];\n\n        const firstCarrotDistance =\n            this.dimensions.width +\n            (CONSTANTS.WARM_UP_SECONDS * 2 * CONSTANTS.FENCE_SPEED);\n\n        this.carrots = [\n            this.randomCarrot(firstCarrotDistance),\n            this.randomCarrot(firstCarrotDistance + CONSTANTS.CARROT_SPACING),\n            this.randomCarrot(firstCarrotDistance + (CONSTANTS.CARROT_SPACING * 2)),\n        ];\n    }\n\n    randomFence(x) {\n        const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.GAP_HEIGHT;\n        const gapTop = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;\n        const fence = {\n            bottomFence: {\n                left: x,\n                right: CONSTANTS.FENCE_WIDTH + x,\n                top: gapTop + CONSTANTS.GAP_HEIGHT,\n                bottom: this.dimensions.height\n            },\n            passed: false\n        };\n        return fence\n    }\n\n    randomCarrot(x) {\n        const carrot = {\n            bottomCarrot: {\n                left: x,\n                right: CONSTANTS.CARROT_WIDTH + x,\n                top: 455,\n                bottom: this.dimensions.height\n            },\n            passed: false\n        };\n        return carrot\n    }\n\n    animate(ctx) {\n        this.drawBackground(ctx);\n        this.moveFences();\n        this.drawFences(ctx);\n        this.moveCarrots();\n        this.drawCarrots(ctx);\n    }\n\n    drawBackground(ctx) {\n        const image = new Image();\n        image.src = \"https://www.123freevectors.com/wp-content/uploads/freevector/grass-sky-free-vector.jpg\"\n        ctx.drawImage(image, 0, 0, 1000, 500)\n    }\n\n    passedFence(dog, callback) {\n        this.eachFence((fence) => {\n            if (fence.bottomFence.right < dog.left) {\n                if (!fence.passed) {\n                    fence.passed = true;\n                    callback();\n                }\n            }\n        });\n    }\n\n    passedCarrot(dog, callback) {\n        this.eachCarrot((carrot) => {\n            if (carrot.bottomCarrot.left > dog.left && \n                carrot.bottomCarrot.right < dog.right && \n                dog.top > 400) {\n                if (!carrot.passed) {\n                    carrot.passed = true;\n                    carrot.bottomCarrot.top = 500;\n                    callback()\n                }\n            }\n        });\n    }\n\n    moveFences() {\n        this.eachFence(function (fence) {\n            fence.bottomFence.left -= CONSTANTS.FENCE_SPEED;\n            fence.bottomFence.right -= CONSTANTS.FENCE_SPEED;\n        });\n\n        if (this.fences[0].bottomFence.right <= 0) {\n            this.fences.shift();\n            const newX = this.fences[1].bottomFence.left + CONSTANTS.FENCE_SPACING;\n            this.fences.push(this.randomFence(newX));\n        }\n    }\n\n    moveCarrots() {\n        this.eachCarrot(function (carrot) {\n            carrot.bottomCarrot.left -= CONSTANTS.FENCE_SPEED;\n            carrot.bottomCarrot.right -= CONSTANTS.FENCE_SPEED;\n        });\n\n        if (this.carrots[0].bottomCarrot.right <= 0) {\n            this.carrots.shift();\n            const newX = this.carrots[1].bottomCarrot.left + CONSTANTS.CARROT_SPACING;\n            this.carrots.push(this.randomCarrot(newX));\n        }\n    }\n\n    drawFences(ctx) {\n        this.eachFence(function (fence) {\n            const fenceImage = new Image();\n            fenceImage.src = \"http://getdrawings.com/vectors/wood-grain-pattern-vector-23.jpg\"\n\n            ctx.drawImage(\n                fenceImage,\n                fence.bottomFence.left,\n                fence.bottomFence.top,\n                CONSTANTS.FENCE_WIDTH,\n                fence.bottomFence.bottom - fence.bottomFence.top\n            );\n        });\n    }\n\n    drawCarrots(ctx) {\n        this.eachCarrot(function (carrot) {\n            const carrotImage = new Image();\n            carrotImage.src = \"./assets/images/carrot.png\"\n\n            ctx.drawImage(\n                carrotImage,\n                carrot.bottomCarrot.left,\n                carrot.bottomCarrot.top,\n                CONSTANTS.CARROT_WIDTH,\n                CONSTANTS.CARROT_HEIGHT,\n            );\n        });\n    }\n\n    eachFence(callback) {\n        this.fences.forEach(callback.bind(this));\n    }\n\n    eachCarrot(callback) {\n        this.carrots.forEach(callback.bind(this));\n    }\n\n    collidesWith(dog) {\n        const _overlap = (rect1, rect2) => {\n            if (rect1.left > rect2.right || rect1.right < rect2.left) {\n                return false;\n            }\n            if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {\n                return false;\n            }\n            return true;\n        };\n        let collision = false;\n        this.eachFence((fence) => {\n            if (\n                _overlap(fence.bottomFence, dog)\n            ) { collision = true; }\n        });\n        return collision;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ })

/******/ });