var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var canvasBoundingRect = canvas.getBoundingClientRect();
var rectSize = 100;

var mouse = {
	x: 0,
	y: 0,
	mouseDown: false
};

var peon = {
	x: 2,
	y: 1,
	clicked: false
};

var heroes = [];
var villains = [];

var unit = {

}

function createDefaultUnit() {
	return {
		x: 0,
		y: 0,
		clicked: false
	}
}

var heroPickerDropDown = document.getElementsByClassName("hero-picker");

for (var i = 0; i < heroPickerDropDown.length; ++i) {
	var dropdown = heroPickerDropDown[i];
	heroList.forEach(hero => {
		var el = document.createElement("option");
		el.textContent = hero;
		el.value = hero;
		dropdown.appendChild(el);
	});
}

function draw() {
	var img = new Image();
	img.onload = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		
		drawpeon();
		handleMouseInteraction();
	};
	img.src = 'data/maps/Z0018.png';
	requestAnimationFrame(draw);

}

function drawGrid() {
	for (var i = 0; i < canvas.width/100; ++i) {
		for (var j = 0; j < canvas.height/100; ++j) {
			ctx.strokeStyle = 'black';
			ctx.strokeRect(i * 100, j * 100, rectSize, rectSize);
		}
	}	
}

function drawpeon() {
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 4;
	ctx.strokeRect(peon.x * 100, peon.y * 100, rectSize, rectSize);
	ctx.lineWidth = 1;
}


function handleMouseInteraction() {
	var offset = 1;
	if (typeof mouse.y != 'undefined' && typeof mouse.x != 'undefined') {
		if (mouse.mouseDown) {
			ctx.strokeStyle = 'orange';
		} else {
			ctx.strokeStyle = 'blue';
		}
		ctx.strokeRect(mouse.x * 100 + offset, mouse.y * 100 + offset, rectSize - 2* offset, rectSize - 2*offset);
	}
}


function mouseMoveHandler(e) {
	var mousePosX = e.clientX - canvasBoundingRect.left;
	var mousePosY = e.clientY - canvasBoundingRect.top;

	if ((mousePosX > 0 && mousePosX < canvas.width) &&
		(mousePosY > 0 && mousePosY < canvas.height)) 
	{
		mouse.y = mousePosY / 100 | 0;
		mouse.x = mousePosX / 100 | 0;

	}

}

function mouseDownHandler(e) {
	mouse.mouseDown = true;

	if (mouse.y === peon.y && mouse.x === peon.x) {
		peon.clicked = true;
	}
}

function mouseUpHandler(e) {
	mouse.mouseDown = false;
	if (peon.clicked)
	{
		peon.clicked = false;
		peon.x = mouse.x;
		peon.y = mouse.y;
	}
}

document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);

draw();