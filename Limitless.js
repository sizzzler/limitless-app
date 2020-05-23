<<<<<<< HEAD
// SELECT CVS
var canvas = document.getElementById("game");
=======



// SELECT Canvas
var canvas = document.getElementById("game");

>>>>>>> limitlesss/master
var context = canvas.getContext("2d");

// GAME VARs
let frames = 0;
var DEGREE = Math.PI / 180;

// LOAD SPRITE IMAGE
var layout = new Image();
layout.src = "img/newGame.png";

// GAME condition
var condition = {
	live: 0,
	getReady: 0,
	game: 1,
	gameOver: 2
}

// START BUTTON COORD


// CONTROL THE GAME
canvas.addEventListener("click", function (evt) {
	switch (condition.live) {
		case condition.getReady:
			condition.live = condition.game;
			break;
		case condition.game:
		 if (ironman.y - ironman.radius <= 0) return;
			ironman.flap()
			break;
		case condition.gameOver:
<<<<<<< HEAD
			//var rect = cvs.getBoundingClientRect();
=======
			var rect = canvas.getBoundingClientRect();
>>>>>>> limitlesss/master
			var clickX = evt.clientX - rect.left;
			var clickY = evt.clientY - rect.top;
	}
});
<<<<<<< HEAD


// BACKGROUND
var bg = {
=======
canvas.addEventListener("click", function(evt){
					 if (Event.key === " d "){ 	switch (condition.live) {
		case condition.getReady:
			condition.live = condition.game;
			break;
		case condition.game:
			if (ironman.y - ironman.radius <= 0) return;
			ironman.flap()
			break;
		case condition.gameOver:
			var rect = canvas.getBoundingClientRect();
			var clickX = evt.clientX - rect.left;
			var clickY = evt.clientY - rect.top;
}
					 }
});

// BACKGROUND
var bg = {
	sX: 0,
	sY: 0,
	w: 75,
	h: 0,
	x: 0,
	//y : canvas.height - 380,

>>>>>>> limitlesss/master
	draw: function () {
		context.drawImage(layout, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);

		context.drawImage(layout, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
	}

}

// FOREGROUND
var fg = {
	sX: 276,
	sY: 0,
	w: 224,
	h: 112,
	x: 0,
	y: canvas.height - 112,

	dx: 2,

	draw: function () {
		context.drawImage(layout, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);

		context.drawImage(layout, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
	},

	update: function () {
		if (condition.live == condition.game) {
			this.x = (this.x - this.dx) % (this.w / 2);
		}
	}
}

// ironman
var ironman = {
	animation: [
		{
			sX: 275,
			sY: 180
		}
    ],
	x: 50,
	y: 150,
	w: 56,
	h: 26,

	radius: 8,

	frame: 0,

	gravity: 0.25,
	jump: 4,
	speed: 0,

	draw: function () {
		var ironman = this.animation[this.frame];

		context.save();
		context.translate(this.x, this.y);
		context.rotate(this.rotation);
		context.drawImage(layout, ironman.sX, ironman.sY, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);

		context.restore();
	},

	flap: function () {
		this.speed = -this.jump;
	},

	update: function () {


		if (condition.live == condition.getReady) {
			this.y = 150; // RESET POSITION OF IRON MAN AFTER GAME OVER
			//this.rotation = 0 * DEGREE;
		} else {
			this.speed += this.gravity;
			this.y += this.speed;

			if (this.y + this.h / 2 >= canvas.height - fg.h) {
				this.y = canvas.height - fg.h - this.h / 2;
				if (condition.live == condition.game) {
					condition.live = condition.gameOver;

				}
			}

		}
	},
	speedReset: function () {
		this.speed = 0;
	}
}


// GET READY MESSAGE
var getReady = {
	sX: 0,
	sY: 228,
	w: 173,
	h: 152,
	x: canvas.width / 2 - 173 / 2,
	y: 80,

	draw: function () {
		if (condition.live == condition.getReady) {
			context.drawImage(layout, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
		}
	}

}

// GAME OVER MESSAGE
var gameOver = {
	sX: 175,
	sY: 228,
	w: 225,
	h: 202,
	x: canvas.width / 2 - 225 / 2,
	y: 90,

	draw: function () {
		if (condition.live == condition.gameOver) {
			context.drawImage(layout, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
		}
	}

}

// PIPES
var pipes = {
	position: [],

	top: {
		sX: 553,
		sY: 0
	},
	bottom: {
		sX: 502,
		sY: 0
	},

	w: 53,
	h: 400,
	gap: 85,
	maxYPos: -150,
	dx: 2,

	draw: function () {
		for (let i = 0; i < this.position.length; i++) {
			var placement = this.position[i];

			var topYPos = placement.y;
			var bottomYPos = placement.y + this.h + this.gap;

			// top pipe
			context.drawImage(layout, this.top.sX, this.top.sY, this.w, this.h, placement.x, topYPos, this.w, this.h);

			// bottom pipe
			context.drawImage(layout, this.bottom.sX, this.bottom.sY, this.w, this.h, placement.x, bottomYPos, this.w, this.h);
		}
	},

	update: function () {
		if (condition.live !== condition.game) return;

		if (frames % 100 == 0) {
			this.position.push({
				x: canvas.width,
				y: this.maxYPos * (Math.random() + 1)
			});
		}
		for (var i = 0; i < this.position.length; i++) {
			var placement = this.position[i];

			var bottomPipeYPos = placement.y + this.h + this.gap;

			// COLLISION DETECTION
			// TOP PIPE
			if (ironman.x + ironman.radius > placement.x && ironman.x - ironman.radius < placement.x + this.w && ironman.y + ironman.radius > placement.y && ironman.y - ironman.radius < placement.y + this.h) {
				condition.live = condition.gameOver;

			}
			// BOTTOM PIPE
			if (ironman.x + ironman.radius > placement.x && ironman.x - ironman.radius < placement.x + this.w && ironman.y + ironman.radius > bottomPipeYPos && ironman.y - ironman.radius < bottomPipeYPos + this.h) {
				condition.live = condition.gameOver;

			}

			// MOVE THE PIPES TO THE LEFT
			placement.x -= this.dx;

			// if the pipes go beyond canvas, we delete them from the array
			if (placement.x + this.w <= 0) {
				this.position.shift();
				score.value += 1;

				score.best = Math.max(score.value, score.best);
				localStorage.setItem("best", score.best);
			}
		}
	},

	reset: function () {
		this.position = [];
	}

}

// SCORE
var score = {
	best: parseInt(localStorage.getItem("best")) || 0,
	value: 0,

	draw: function () {
<<<<<<< HEAD
		context.fillStyle = "lime";
		context.strokeStyle = "lime";
=======
		context.fillStyle = "#FFF";
		context.strokeStyle = "white";
>>>>>>> limitlesss/master

		if (condition.live == condition.game) {
			context.lineWidth = 2;
			context.font = "35px Times New Roman";
			context.fillText(this.value, canvas.width / 2, 50);
			context.strokeText(this.value, canvas.width / 2, 50);

		} else if (condition.live == condition.gameOver) {
			// SCORE VALUE
			context.font = "25px Times New Roman";
			context.fillText(this.value, 225, 186);
			context.strokeText(this.value, 225, 186);
			// BEST SCORE
			context.fillText(this.best, 225, 228);
			context.strokeText(this.best, 225, 228);
		}
	},

	reset: function () {
		this.value = 0;
	}
}
var pauseButton = {
	x: 120,
	y: 263,
	w: 83,
	h: 29,
	 draw : function(){
			context.drawImage(layout, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);

	}
}

// DRAW
function draw() {
	context.fillStyle = "#000";
	context.fillRect(0, 0, canvas.width, canvas.height);

	bg.draw();
	pipes.draw();
	fg.draw();
	ironman.draw();
	getReady.draw();
	gameOver.draw();
	score.draw();
}
//pauseButton.draw();^
// UPDATE
function update() {
	ironman.update();
	fg.update();
	pipes.update();
}
//pauseButton.update();
// LOOP
function loop() {
	update();
	draw();
	frames++;

	requestAnimationFrame(loop);
}
loop();


