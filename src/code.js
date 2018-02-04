const IMAGE_PATH = 'data/maps/';
const CHARACTER_PATH = 'data/characters/';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
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

function createDefaultUnit() {
	return {
		x: 0,
		y: 0,
		clicked: false
	}
}



var mapAssets = [];
var characterAssets = [];

var heroPickerDropDown = document.getElementsByClassName("hero-picker");

for (var i = 0; i < heroPickerDropDown.length; ++i) {
	var dropdown = heroPickerDropDown[i];
	characterList.forEach(hero => {
		var el = document.createElement("option");
		el.textContent = hero;
		el.value = hero;
		dropdown.appendChild(el);
	});
}

// testing variable
var mapValue = 0;

function draw() {
	// var img = new Image();
	// img.onload = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(mapAssets[mapValue].img, 0, 0, canvas.width, canvas.height);

		
		drawpeon();
		handleMouseInteraction();
	// };
	// img.src = 'data/maps/Z0018.png';
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
	ctx.drawImage(characterAssets[mapValue].img, peon.x * 100, peon.y * 100, rectSize, rectSize);
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
	mapValue = mapValue >= 4? 0 : mapValue + 1;
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

function init() {

	prepareMapData();
	prepareCharacterData();
	draw();
}

function createImageUrl(path, imageName, extension) {
	return path + imageName + extension;
}

function prepareMapData() {
	prepareAssets(IMAGE_PATH, mapList, mapAssets);
}

function prepareCharacterData() {
	prepareAssets(CHARACTER_PATH, characterList, characterAssets);
}

function prepareAssets(assetPath, assetName, assetsList) {
	for (var i =0; i < assetName.length; ++i) {
		var img = new Image();
		img.src = createImageUrl(assetPath, assetName[i], '.png');
		assetsList.push({
			name: assetName[i],
			img: img
		});
	}
}