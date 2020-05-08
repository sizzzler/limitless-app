var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

function art() {
	context.fillStyle = "blue";
	canvas.fillRect(0, 0, canvas.width, context.height);

}
var game = new Image();
game.src = "/Users/ramsesherrera/Downloads/newGame.png";
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
function draw(){
	name.draw();
}
function loop(){
	draw();
	requestAnimationFrame(loop);
}
loop();
var hero = {
	animation: [
		{gX: 276, gY : 112},
        {gX: 276, gY : 139},
		{gX: 276, gY : 164},
        {gX: 276, gY : 139}
	],
	x : 50,
    y : 150,
    w : 34,
    h : 26,

    radius : 12,

    frame : 0,

    gravity : 0.25,
    jump : 4.6,
    speed : 0,
    rotation : 0,
}


