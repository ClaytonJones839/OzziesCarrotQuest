!function(t){var e={};function s(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(i,o,function(e){return t[e]}.bind(null,o));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);const i={GRAVITY:.4,RUN_SPEED:8,TERMINAL_VEL:12,DOG_WIDTH:80,DOG_HEIGHT:60};class o{constructor(t){this.dimensions=t,this.x=this.dimensions.width/4,this.y=420,this.vel=0}jump(){this.vel=-1*i.RUN_SPEED}moveDog(){this.y>405&&(this.y=405),this.y+=this.vel,this.vel+=i.GRAVITY,Math.abs(this.vel)>i.TERMINAL_VEL&&(this.vel>0?this.vel=i.TERMINAL_VEL:this.vel=-1*i.TERMINAL_VEL)}animate(t){this.moveDog(),this.drawDog(t)}drawDog(t){if(this.y<405&&this.y>=150){const e=new Image;e.src="./assets/images/Ozzie-pix2.png",t.drawImage(e,this.x,this.y,120,90)}else if(this.y<150){const e=new Image;e.src="./assets/images/Ozzie-pix3.png",t.drawImage(e,this.x,this.y,120,90)}else{const e=new Image;e.src="./assets/images/Ozzie-pix1.png",t.drawImage(e,this.x,this.y,120,90)}}bounds(){return{left:this.x,right:this.x+i.DOG_WIDTH,top:this.y,bottom:this.y+i.DOG_HEIGHT}}outOfBounds(){return this.y<0}}const r={FENCE_SPEED:2,CARROT_SPEED:2,GAP_HEIGHT:250,FENCE_WIDTH:40,CARROT_WIDTH:40,CARROT_HEIGHT:40,EDGE_BUFFER:5,FENCE_SPACING:400,WARM_UP_SECONDS:2,CARROT_SPACING:300};class n{constructor(t){this.dimensions=t;const e=this.dimensions.width+60*r.WARM_UP_SECONDS*r.FENCE_SPEED;this.fences=[this.randomFence(e),this.randomFence(e+r.FENCE_SPACING),this.randomFence(e+2*r.FENCE_SPACING)];const s=this.dimensions.width+30*r.WARM_UP_SECONDS*r.FENCE_SPEED;this.carrots=[this.randomCarrot(s),this.randomCarrot(s+r.CARROT_SPACING),this.randomCarrot(s+2*r.CARROT_SPACING)]}randomFence(t){const e=this.dimensions.height-2*r.EDGE_BUFFER-r.GAP_HEIGHT,s=Math.random()*e+r.EDGE_BUFFER;return{bottomFence:{left:t,right:r.FENCE_WIDTH+t,top:s+r.GAP_HEIGHT,bottom:this.dimensions.height},passed:!1}}randomCarrot(t){return{bottomCarrot:{left:t,right:r.CARROT_WIDTH+t,top:455,bottom:this.dimensions.height},passed:!1}}animate(t){this.drawBackground(t),this.moveFences(),this.drawFences(t),this.moveCarrots(),this.drawCarrots(t)}drawBackground(t){const e=new Image;e.src="https://www.123freevectors.com/wp-content/uploads/freevector/grass-sky-free-vector.jpg",t.drawImage(e,0,0,1e3,500)}passedFence(t,e){this.eachFence(s=>{s.bottomFence.right<t.left&&(s.passed||(s.passed=!0,e()))})}passedCarrot(t,e){this.eachCarrot(s=>{s.bottomCarrot.left>t.left&&s.bottomCarrot.right<t.right&&t.top>400&&(s.passed||(s.passed=!0,e()))})}moveFences(){if(this.eachFence((function(t){t.bottomFence.left-=r.FENCE_SPEED,t.bottomFence.right-=r.FENCE_SPEED})),this.fences[0].bottomFence.right<=0){this.fences.shift();const t=this.fences[1].bottomFence.left+r.FENCE_SPACING;this.fences.push(this.randomFence(t))}}moveCarrots(){if(this.eachCarrot((function(t){t.bottomCarrot.left-=r.FENCE_SPEED,t.bottomCarrot.right-=r.FENCE_SPEED})),this.carrots[0].bottomCarrot.right<=0){this.carrots.shift();const t=this.carrots[1].bottomCarrot.left+r.CARROT_SPACING;this.carrots.push(this.randomCarrot(t))}}drawFences(t){this.eachFence((function(e){const s=new Image;s.src="http://getdrawings.com/vectors/wood-grain-pattern-vector-23.jpg",t.drawImage(s,e.bottomFence.left,e.bottomFence.top,r.FENCE_WIDTH,e.bottomFence.bottom-e.bottomFence.top)}))}drawCarrots(t){this.eachCarrot((function(e){const s=new Image;s.src="./assets/images/carrot.png",t.drawImage(s,e.bottomCarrot.left,e.bottomCarrot.top,r.CARROT_WIDTH,r.CARROT_HEIGHT)}))}eachFence(t){this.fences.forEach(t.bind(this))}eachCarrot(t){this.carrots.forEach(t.bind(this))}collidesWith(t){let e=!1;return this.eachFence(s=>{((t,e)=>!(t.left>e.right||t.right<e.left)&&!(t.top>e.bottom||t.bottom<e.top))(s.bottomFence,t)&&(e=!0)}),e}}new class{constructor(t){this.ctx=t.getContext("2d"),this.dimensions={width:t.width,height:t.height},this.registerEvents(),this.restart()}play(){this.running=!0,this.animate()}restart(){this.running=!1,this.score=0,this.dog=new o(this.dimensions),this.level=new n(this.dimensions),this.animate()}registerEvents(){this.boundClickHandler=this.click.bind(this),this.ctx.canvas.addEventListener("mousedown",this.boundClickHandler)}click(t){this.running||this.play(),this.dog.jump()}gameOver(){return this.level.collidesWith(this.dog.bounds())||this.dog.outOfBounds(this.height)}animate(){this.level.animate(this.ctx),this.dog.animate(this.ctx),this.gameOver()&&(0===this.score?alert("Oh no! You didn't get any carrots!"):alert(`Great Job! You collected ${this.score} carrots!`),this.restart()),this.level.passedCarrot(this.dog.bounds(),()=>{this.score+=1,console.log(this.score)}),this.drawScore(),this.running&&requestAnimationFrame(this.animate.bind(this))}drawScore(){const t={x:this.dimensions.width/1.75,y:this.dimensions.height/8};this.ctx.font="25pt serif",this.ctx.fillStyle="black",this.ctx.fillText(`Carrots Collected: ${this.score}`,t.x,t.y),this.ctx.strokeStyle="black",this.ctx.lineWidth=2,this.ctx.strokeText(`Carrots Collected: ${this.score}`,t.x,t.y)}}(document.getElementById("dog-game"))}]);