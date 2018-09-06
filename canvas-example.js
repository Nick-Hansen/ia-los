var canvas = {};
var ctx = {};

function drawBoard() {
  //ctx.fillStyle = 'rgb(200, 0, 0)';
  //ctx.fillRect(10, 10, 50, 50);
  //ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  //ctx.fillRect(30, 30, 50, 50);
  
  //draws a large black square 100 pixels on each side
  ctx.fillRect(25, 25, 100, 100);
  //erases a 60x60 pixel square from the center
  ctx.clearRect(45, 45, 60, 60);
  //creates a rectangular outline 50x50 pixels within the cleared square
  ctx.strokeRect(50, 50, 50, 50);

}

$(function () {
	canvas = document.getElementById('canvas');
	if (!canvas.getContext) { return; }
	ctx = canvas.getContext("2d");
	drawBoard();
})
