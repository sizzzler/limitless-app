var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
let frames = 0;


var newGame = new Image();
newGame.src = "img/newGame.png";

var state = {
	current: 0,
	getReady: 0,
	game: 1,
	over: 2
}

canvas.addEventListener("click", function (event) {
	switch (state.current) {
		case state.getReady:
			state.current = state.game;
			break;
		case state.game:
			hero.move();
			break;
		case state.over:
			state.current = state.getReady;
			break;
	}

})

var background = {
	gX: 0,
	gY: 0,
	w: 275,
	h: 226,
	x: 0,
	y: canvas.height - 226,
	draw: function () {
		context.drawImage(newGame, this.gX, this.gY, this.w, this.h, this.x, this.y, this.w, this.h);
		context.drawImage(newGame, this.gX, this.gY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
	}
}
var foreground = {
	gX: 276,
	gY: 0,
	w: 224,
	h: 112,
	x: 0,
	y: canvas.height - 112,
	draw: function () {
		context.drawImage(newGame, this.gX, this.gY, this.w, this.h, this.x, this.y, this.w, this.h);
		context.drawImage(newGame, this.gX, this.gY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
	}
}
var hero = {
	animation: [
		{
			gX: 276,
			gY: 112
		},
		{
			gX: 276,
			gY: 139
		},
		{
			gX: 276,
			gY: 164
		},
		{
			gX: 276,
			gY: 139
		}
	],
	x: 50,
	y: 150,
	w: 34,
	h: 26,
	gravity: 0.25,
	jump: 4.6,
	speed: 0,
	rotation: 0,
	frame: 0,
	draw: function () {
		let hero = this.animation[this.frame];
		context.drawImage(newGame, hero.gX, hero.gY, this.w, this.h, this.x, this.y, this.w, this.h);

		context.save();
		context.translate(this.x, this.y);
		context.rotate(this.rotation);
		context.drawImage(newGame, hero.gX, hero.gY, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);

		context.restore();
	},

	move: function () {
		this.speed = -this.jump;

	},
	update: function () {
		if (state.current == state.getReady) {

		} else {
			this.speed += this.gravity;
			this.y += this.speed;
		}
	}

}


var getReady = {
	gX: 0,
	gY: 228,
	w: 173,
	h: 152,
	x: canvas.width - 173 / 2,
	y: 80,
	draw: function () {
		if (state.current == state.getReady)
			context.drawImage(newGame, this.gX, this.gY, this.w, this.h, this.x, this.y, this.w, this.h);

	}
}
var gameOver = {
	gX: 175,
	gY: 228,
	w: 225,
	h: 152,
	x: canvas.width - 173 / 2,
	y: 80,
	draw: function ()
	if(state.current == state.over)
		context.drawImage(newGame, this.gX, this.gY, this.w, this.h, this.x, this.y, this.w, this.h);
}
}

function draw() {
	context.fillStyle = "#70c5ce";
	context.fillRect(0, 0, canvas.width, canvas.height);
	background.draw();
	foreground.draw();
	hero.draw();
	getReady();
	gameOver();
}

function art() {


}

function loop() {
	update();
	draw();
	frames++;
	requestAnimationFrame(loop);
}
loop();




context.drawImage(game, gX, gY, gWidth, gHeight, dX, dY, dWidth, dHeight);
var name = {
	gX: 300,
	gY: 200,
	w: 57,
	h: 22,
	X: 3,
	y: 3,
	draw: function () {
		context.drawImage(game, this.gX, this.gY, this.w, this.h, this.x, this.y, this.w, this.h);
	}
}
