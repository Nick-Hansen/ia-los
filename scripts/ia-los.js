//variables
var canvas;
var grid;

//on page load
$(function () {
    //create canvas
    //create grid
});


var map_name = '';
var map_width = 0;
var map_height = 0;
var boxWidth = 30;
// Padding
var horizontal_padding = 0;
var vertical_padding = 0;
//space taken by grid (does not include padding)
var grid_width = 0;
var grid_height = 0;
//horizontal space taken by canvas (includes padding)
var canvas_width = 0;
//vertical space taken by canvas (includes padding)
var canvas_height = 0;

var canvas = {};
var context = {};
var map_image = new Image();
var map_image_name = undefined;
var attacker_image = new Image();
var defender_image = new Image();
var blocker_image = new Image();
var rotate = 0 * Math.PI / 180.0;
var attackingTile = { x: -1, y: -1};
var defendingTile = { x: -1, y: -1};
var blockers = [];
var linesOfSight = {};
var ia_los_maps = {};

var offMapTiles = [];
var walls = [];
var blockingTiles = [];
var blockingEdges = [];
var blockingIntersections = [];

var map_images = ['Mos_Eisley_Back_Alleys',
'Tarkin_Initiative_Labs',
'Uscru_Entertainment_District'];
var map_image_available = false;

function loadMap(mapName) {}

function getMap(mapName) {}

function drawBoard(callback){}

function rotate_counter_clockwise() {}

function rotate_clockwise() {}

function drawMap(callback) {}

function drawGrid(){}

function selectTile(clientX, clientY, target) {}

function drawOffMapTile(tile) {}

function drawBlockingTile(tile) {}

function drawWall(wall) {}

function drawEdge(edge) {}

function drawBlockingEdge(edge) {}

function drawBlockingIntersection(intersection) {}

function drawVerboseBlockingIntersection(intersection) {}

function drawAttacker() {}

function drawDefender() {}

function drawBlocker(blocker) {}

function drawAttackerIcon () {}

function drawDefenderIcon() {}

function drawBlockerIcon (x, y) {}

function updateLinesOfSight(losPaths) {}

function drawLineOfSight(attackingCorner, defendingCorner) {}

function drawLinesOfSight() {}

function updateLinesOfSightDropdown(options) {}

function calculateLoS() {}

function pathsOverlap(attackingCorner, defendingCorner1, defendingCorner2) {}

function getLosFromCornerToCorner(attackingCorner, defendingCorner) {}

function getVerticalEdges(startX, startY, endX, endY) {}

function getHorizontalEdges(startX, startY, endX, endY) {}

function getIntersections(startX, startY, endX, endY) {}

function getTiles(verticalEdges, horizontalEdges, intersections, startX, startY, endX, endY) {}

function edgeBlocked(pathEdges) {}

function tileBlocked(pathTiles) {}

function intersectionBlocked(pathIntersections, startX, startY, endX, endY) {}

function intersectionBlocksPath(blockingIntersection, startX, startY, endX, endY) {}

function adjacentTilesBlocked(startX, startY, endX, endY) {}

function verticallyAdjacentTilesBlocked(tile) {}

function horizontallyAdjacentTilesBlocked(tile) {}

$(function () {
	canvas = document.getElementById('canvas');
	if (!canvas.getContext) { return; }
	canvas.addEventListener('click', boardClick, false);
	context = canvas.getContext("2d");
	
	attacker_image.src = './images/attacker.png';
	defender_image.src = './images/defender.png';
	blocker_image.src = './images/blocker.png';

	map_name = $('#selected_map option:selected').val();
	if (ia_los_maps[map_name]) {
		loadMap(map_name);
	} else {
		getMap(map_name);
	}
})

function boardClick(event) {
	if (!canvas.getContext) { return; }
	var target = $('input[name=target]:checked' ).val();
	var boardUpdated = selectTile(event.clientX, event.clientY, target);
	if (boardUpdated) {
		drawBoard(function () {
			calculateLoS();
			drawLinesOfSight();
		});
	}
}


$(document).on('change', 'input[type=radio][name=gridDisplay]', function() {
	drawBoard(function () {
		calculateLoS();
		drawLinesOfSight();
	});
})

$(document).on('change', '#linesOfSight', function() {
	drawBoard(function () {
		drawLinesOfSight();
	});
});

$(document).on('change', '#selected_map', function() {
	map_name = $('#selected_map option:selected').val();
	if (ia_los_maps[map_name]) {
		loadMap(map_name);
	} else {
		getMap(map_name);
	}
});

$(document).on('click', '#rotate_counter_clockwise', function () {
	rotate_counter_clockwise();
});

$(document).on('click', '#rotate_clockwise', function () {
	rotate_clockwise();
});
	
$(document).on('map_loaded', '#map_load', function(event, mapName) {
	loadMap(mapName);
})