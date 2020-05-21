


// SELECT CVS
var cvs = document.getElementById("game");

var ctx = cvs.getContext("2d");

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
var startBtn = {
	x: 120,
	y: 263,
	w: 83,
	h: 29
}

// CONTROL THE GAME
cvs.addEventListener("click", function (evt) {
	switch (condition.live) {
		case condition.getReady:
			condition.live = condition.game;
			break;
		case condition.game:
			if (ironman.y - ironman.radius <= 0) return;
			ironman.flap()
			break;
		case condition.gameOver:
			var rect = cvs.getBoundingClientRect();
			var clickX = evt.clientX - rect.left;
			var clickY = evt.clientY - rect.top;
	}
});
cvs.addEventListener("click", function(evt){
					 if (Event.key === " d "){ 	switch (condition.live) {
		case condition.getReady:
			condition.live = condition.game;
			break;
		case condition.game:
			if (ironman.y - ironman.radius <= 0) return;
			ironman.flap()
			break;
		case condition.gameOver:
			var rect = cvs.getBoundingClientRect();
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
	//y : cvs.height - 380,

	draw: function () {
		ctx.drawImage(layout, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);

		ctx.drawImage(layout, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
	}

}

// FOREGROUND
var fg = {
	sX: 276,
	sY: 0,
	w: 224,
	h: 112,
	x: 0,
	y: cvs.height - 112,

	dx: 2,

	draw: function () {
		ctx.drawImage(layout, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);

		ctx.drawImage(layout, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
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
		},
		{
			sX: 275,
			sY: 180
		},
		{
			sX: 0,
			sY: 0
		},
		{
			sX: 0,
			sY: 0
		}
    ],
	x: 50,
	y: 150,
	w: 56,
	h: 26,

	radius: 12,

	frame: 0,

	gravity: 0.25,
	jump: 4,
	speed: 0,
	//rotation : 0,

	draw: function () {
		var ironman = this.animation[this.frame];

		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation);
		ctx.drawImage(layout, ironman.sX, ironman.sY, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);

		ctx.restore();
	},

	flap: function () {
		this.speed = -this.jump;
	},

	update: function () {


		if (condition.live == condition.getReady) {
			this.y = 150; // RESET POSITION OF IRON MAN AFTER GAME OVER
			this.rotation = 0 * DEGREE;
		} else {
			this.speed += this.gravity;
			this.y += this.speed;

			if (this.y + this.h / 2 >= cvs.height - fg.h) {
				this.y = cvs.height - fg.h - this.h / 2;
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
	x: cvs.width / 2 - 173 / 2,
	y: 80,

	draw: function () {
		if (condition.live == condition.getReady) {
			ctx.drawImage(layout, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
		}
	}

}

// GAME OVER MESSAGE
var gameOver = {
	sX: 175,
	sY: 228,
	w: 225,
	h: 202,
	x: cvs.width / 2 - 225 / 2,
	y: 90,

	draw: function () {
		if (condition.live == condition.gameOver) {
			ctx.drawImage(layout, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
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
			ctx.drawImage(layout, this.top.sX, this.top.sY, this.w, this.h, placement.x, topYPos, this.w, this.h);

			// bottom pipe
			ctx.drawImage(layout, this.bottom.sX, this.bottom.sY, this.w, this.h, placement.x, bottomYPos, this.w, this.h);
		}
	},

	update: function () {
		if (condition.live !== condition.game) return;

		if (frames % 100 == 0) {
			this.position.push({
				x: cvs.width,
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
		ctx.fillStyle = "#FFF";
		ctx.strokeStyle = "white";

		if (condition.live == condition.game) {
			ctx.lineWidth = 2;
			ctx.font = "35px Times New Roman";
			ctx.fillText(this.value, cvs.width / 2, 50);
			ctx.strokeText(this.value, cvs.width / 2, 50);

		} else if (condition.live == condition.gameOver) {
			// SCORE VALUE
			ctx.font = "25px Times New Roman";
			ctx.fillText(this.value, 225, 186);
			ctx.strokeText(this.value, 225, 186);
			// BEST SCORE
			ctx.fillText(this.best, 225, 228);
			ctx.strokeText(this.best, 225, 228);
		}
	},

	reset: function () {
		this.value = 0;
	}
}

// DRAW
function draw() {
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, cvs.width, cvs.height);

	bg.draw();
	pipes.draw();
	fg.draw();
	ironman.draw();
	getReady.draw();
	gameOver.draw();
	score.draw();
}

// UPDATE
function update() {
	ironman.update();
	fg.update();
	pipes.update();
}

// LOOP
function loop() {
	update();
	draw();
	frames++;

	requestAnimationFrame(loop);
}
loop();
