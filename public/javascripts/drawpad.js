//TODO: Drawing on canvas does not work if canvas is resized. Try fixing it with onresize()?

"use strict";
var canvas = document.getElementById('canvasHTML');
var ctx = canvas.getContext('2d');
var mousePressed = false;
var oldImageData;
var prevPos = {x:0,y:0};
var pos = {x:0,y:0};
var brush = {
	size:2,
	colour:"#000000",
}

canvas.addEventListener("mousedown", function(e){
	pos = getMousePos(e);
	prevPos = getMousePos(e);
	mousePressed=true;
	draw(e);
}, false);
canvas.addEventListener("mousemove", function(e){
	// undrawCursor(e);
	// drawCursor(e);
	draw(e);
}, false);
canvas.addEventListener("mouseup", function(e){
	mousePressed=false
}, false);
//TODO, have mousePressed = false if mouse is out and mouse is not down
canvas.addEventListener("mouseout", function(e){
	mousePressed=false
},false);
canvas.addEventListener("mouseover", function(e){
	prevPos = pos;
	pos = getMousePos(e);
},false)
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
	"use strict";
	prevPos = pos;
	pos = getMousePos(e);
	if (mousePressed){
		//Draws a line for the last mouse position to the current mouse postion
		//and fills in a circle at the new position. The circle is to smooth out lines
		ctx.lineWidth = brush.size;
		ctx.beginPath();
		ctx.moveTo(prevPos.x,prevPos.y);
		ctx.lineTo(pos.x,pos.y);
		ctx.stroke();
		////ctx.lineWidth=0;
		//Move cursor out of the area the circle will be drawn so the circle
		//wont draw incorrectly		
		ctx.moveTo(prevPos.x,prevPos.y);
		ctx.arc(pos.x,pos.y,brush.size/2,0,2*Math.PI);
		ctx.fillStyle = brush.colour;
		ctx.fill();
	}
}

// function drawCursor(e){
// 	oldImageData = ctx.getImageData(pos.x-brush.size,pos.y-brush.size,brush.size*2,brush.size*2);
// 	ctx.lineWidth = 1;
// 	ctx.beginPath();
// 	ctx.arc(pos.x,pos.y,brush.size/2,0,2*Math.PI);
// 	ctx.stroke();
// }

// function undrawCursor(e){
// 	ctx.
// }
//NOTE: Currently there is redundency in terms of assigning the value to both the brush property
// as will as the ctx attributes. Currently there is no need for the brush variables whatsoever
// as the ctx attributes can just be changed directly, this may change however, therefore both methods
// are used. Once this script is finalized, one method or the other should be removed. 

function changeBrushColour(newColour){
	brush.colour = newColour;
	ctx.strokeStyle = newColour;
	ctx.fillStyle = newColour;
}

function changeBrushSize(newSize){
	brush.size = newSize;
	ctx.lineWidth = newSize;
	document.getElementById("sizeRange").value = newSize;
	document.getElementById("sizeInput").value = newSize;
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

// document.getElementById("colourInput1").addEventListener("onclick", function(event){
// 	event.preventDefault();
// 	console.log(document.getElementById("colourInput1").value);
// 	changeBrushColour(document.getElementById("colourInput1").value);
// });