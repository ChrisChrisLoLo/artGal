var canvas = document.getElementById('canvasHTML');
var ctx = canvas.getContext('2d');
var mousePressed = false;
var prevPos = {x:0,y:0};
var pos = {x:0,y:0};

canvas.addEventListener("mousedown", function (e) {
	pos = getMousePos(e);
	prevPos = getMousePos(e);
	mousePressed=true;
	draw(e);
}, false);
canvas.addEventListener("mousemove", function (e) {
	draw(e);
}, false);
canvas.addEventListener("mouseup", function (e) {
	mousePressed=false
}, false);
canvas.addEventListener("mouseout", function (e) {
	mousePressed=false
}, false);
ctx.fillStyle = 'white';
	ctx.fillRect(0,0,canvas.width, canvas.height);

function getMousePos(e) {
	//POT BUG: there could be offsets with the canvas and it's line due to the canvas,s postition
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}

function draw(e){
	if (mousePressed){
		prevPos = pos;
		pos = getMousePos(e);
		//console.log(pos)
		ctx.beginPath();
		ctx.moveTo(prevPos.x,prevPos.y);
		ctx.lineTo(pos.x,pos.y);
		ctx.stroke();
	}
}

function submit(){
	var dataURL = canvas.toDataURL();
	console.log(dataURL);
}

function clearCanv() {
	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,canvas.width, canvas.height);
}

function embedImageURL(){
	var dataURL = canvas.toDataURL();
	document.getElementById("imageURL").value = dataURL;
	return false;
}