// canvas box
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
let frames = 0;

// link image layout
var layout = new Image();
layout.src = "img/newGame.png";

// GAME condition
var condition = {
	live: 0,
	getReady: 0,
	game: 1,
	gameOver: 2
}
// clicking through the different conditions
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
			var clickX = evt.clientX - rect.left;
			var clickY = evt.clientY - rect.top;
	}
});
// background
var bg = {
	draw: function () {
		context.drawImage(layout, this.w, this.h, this.x + this.w, this.y, this.w, this.h, this.sX, this.sY);
	}
}
// other ground
var og = {
	sX: 276,
	sY: 0,
	w: 224,
	h: 112,
	x: 0,
	y: canvas.height - 112,
	dx: 2,
	//both floors together for complete ground
	draw: function () {
		context.drawImage(layout, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);

		context.drawImage(layout, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
	},

	update: function () {
		if (condition.live == condition.game || condition.live == condition.getReady || condition.live == condition.gameOver) {
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
		context.drawImage(layout, ironman.sX, ironman.sY, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);

		context.restore();
	},

	flap: function () {
		this.speed = -this.jump;
	},

	update: function () {


		if (condition.live == condition.getReady) {
			this.y = 150; // reset pos after game over

		} else {
			this.speed += this.gravity;
			this.y += this.speed;

			if (this.y + this.h / 2 >= canvas.height - og.h) {
				this.y = canvas.height - og.h - this.h / 2;
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

// building
var building = {
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
	maxyPos: -150,
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
				y: this.maxyPos * (Math.random() + 1)
			});
		}
		for (var i = 0; i < this.position.length; i++) {
			var placement = this.position[i];

			var bottomPipeYPos = placement.y + this.h + this.gap;

			// collision detection
			// top building
			if (ironman.x + ironman.radius > placement.x && ironman.x - ironman.radius < placement.x + this.w && ironman.y + ironman.radius > placement.y && ironman.y - ironman.radius < placement.y + this.h) {
				condition.live = condition.gameOver;

			}
			// bottom building
			if (ironman.x + ironman.radius > placement.x && ironman.x - ironman.radius < placement.x + this.w && ironman.y + ironman.radius > bottomPipeYPos && ironman.y - ironman.radius < bottomPipeYPos + this.h) {
				condition.live = condition.gameOver;

			}

			// move to the left
			placement.x -= this.dx;

			// delete obstacles that go past canavs box
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
var score = {
	best: parseInt(localStorage.getItem("best")) || 0,
	value: 0,

	draw: function () {
		context.fillStyle = "lime";
		context.strokeStyle = "lime";
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
// DRAW
function draw() {
	context.fillStyle = "#000";
	context.fillRect(0, 0, canvas.width, canvas.height);
	bg.draw();
	building.draw();
	og.draw();
	ironman.draw();
	getReady.draw();
	gameOver.draw();
	score.draw();
}
// update
function update() {
	ironman.update();
	og.update();
	building.update();
}
// loop
function loop() {
	update();
	draw();
	frames++;
	requestAnimationFrame(loop);
}
loop();
