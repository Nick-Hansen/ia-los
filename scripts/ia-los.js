var canvasWrapper = CanvasWrapper();
var gridCalculator = GridCalculator();

//display variables
var boxWidth = 30;
var rotate = 0;
// Padding
var horizontal_padding = 0;
var vertical_padding = 0;
//horizontal space taken by canvas (includes padding)
var canvas_width = 0;
//vertical space taken by canvas (includes padding)
var canvas_height = 0;
//space taken by grid (does not include padding)
var grid_width = 0;
var grid_height = 0;

//map items
var map_name = '';
var map_width = 0;
var map_height = 0;
var offMapTiles = [];
var walls = [];
var blockingTiles = [];
var blockingEdges = [];
var blockingIntersections = [];
var spireTiles = [];
//items added to map
var attackingTile = { x: -1, y: -1};
var defendingTile = { x: -1, y: -1};
var blockers = [];
var linesOfSight = {};
var attackerLOSTiles = [];
var defenderLOSTiles = [];
var mutualLOSTiles = [];

var ia_los_maps = {};
var map_images = ['Mos_Eisley_Back_Alleys',
'Tarkin_Initiative_Labs',
'Uscru_Entertainment_District',
'30th_Floor_Plaza',
'Anchorhead_Cantina',
'Bespin_Tibanna_Facility',
'Chopper_Base_Atollon',
'Climate_Research_Camp',
'Corellian_Underground',
'Core_A_New_Threat',
'Core_Aftermath',
'Core_Under_Siege',
'Core_Imperial_Hospitality',
'Core_Fly_Solo',
'Core_Incoming',
'Core_Drawn_In',
'Core_Chain_Of_Command',
'Core_The_Source',
'Core_Captured',
'Core_Last_Stand',
'Core_Desperate_Hour',
'Core_A_Simple_Task',
'Core_Brushfire',
'Core_Friends_Of_Old',
'Core_Generous_Donations',
'Core_High_Moon',
'Core_Homecoming',
'Core_Indebted',
'Core_Loose_Cannon',
'Core_Luxury_Cruise',
'Core_Sorry_About_The_Mess',
'Core_Target_Of_Opportunity',
'Core_Temptation',
'Core_The_Spice_Job',
'Core_Vipers_Den',
'Coruscant_Back_Alleys',
'Coruscant_Landfill',
'Coruscant_Senate_Office',
'Development_Facility',
'Lothal_Wastes'];
var map_image_available = false;

function clearMap(callback) {
	attackingTile = { x: -1, y: -1};
	defendingTile = { x: -1, y: -1};
	attackerLOSTiles = [];
	defenderLOSTiles = [];
	mutualLOSTiles = [];
	blockers = [];
	linesOfSight = {};
	if (callback) { callback(); }
}

function loadMap(mapName) {
	clearMap();
	rotate = 0;

	var map = ia_los_maps[mapName];

	map_name = map.name;
	map_width = map.width;
	map_height = map.height;
	grid_width = map_width * boxWidth;
	grid_height = map_height * boxWidth;
	var max_width_height = map_width > map_height ? map_width : map_height;
	horizontal_padding = (map_height > map_width ? (map_height - map_width) / 2 : 0) * boxWidth;
	vertical_padding = (map_width > map_height ? (map_width - map_height) / 2 : 0) * boxWidth;
	canvas_width = max_width_height * boxWidth;
	canvas_height = max_width_height * boxWidth;

	offMapTiles = map.offMapTiles;
	walls = map.walls;
	blockingTiles = map.blockingTiles;
	blockingEdges = map.blockingEdges;
	blockingIntersections = map.blockingIntersections;
	spireTiles = map.spireTiles;

	canvasWrapper.setDimensions(canvas_width, canvas_height);

	map_image_available = map_images.indexOf(mapName) > -1;
	if (map_image_available == true) {
		$('input[name="gridDisplay"][value="map"]').attr('disabled', false);
		$('input[name="gridDisplay"][value="both"]').attr('disabled', false);
	} else {
		$('input[name="gridDisplay"][value="grid"]').prop("checked", true);
		$('input[name="gridDisplay"][value="map"]').attr('disabled', true);
		$('input[name="gridDisplay"][value="both"]').attr('disabled', true);
	}

	drawBoard();
}

function getMap(mapName) {
	//$.getJSON('maps/' + mapName + '.json')
	$.getJSON('https://nick-hansen.github.io/ia-los/maps/' + mapName + '.json')
	.done(function( data ) {
		ia_los_maps[mapName] = data;
		loadMap(mapName);
	})
	.fail(function( jqxhr, textStatus, error ) {
		var err = textStatus + ", " + error;
		console.log( "Request Failed: " + err );
	});
}

function rotate_counter_clockwise(callback) {
	rotate = rotate == 0 ? 1.5 : (rotate - .5) % 2;

	var previous_map_width = map_width;
	map_width = map_height;
	map_height = previous_map_width;
	grid_width = map_width * boxWidth;
	grid_height = map_height * boxWidth;
	var max_width_height = map_width > map_height ? map_width : map_height;
	horizontal_padding = (map_height > map_width ? (map_height - map_width) / 2 : 0) * boxWidth;
	vertical_padding = (map_width > map_height ? (map_width - map_height) / 2 : 0) * boxWidth;
	canvas_width = max_width_height * boxWidth;
	canvas_height = max_width_height * boxWidth;

	attackingTile = gridCalculator.rotateTileCounterClockwise(attackingTile.x, attackingTile.y, previous_map_width);
	defendingTile = gridCalculator.rotateTileCounterClockwise(defendingTile.x, defendingTile.y, previous_map_width);
	blockers = gridCalculator.rotateTilesCounterClockwise(blockers, previous_map_width);
	offMapTiles = gridCalculator.rotateTilesCounterClockwise(offMapTiles, previous_map_width);
	walls = gridCalculator.rotateEdgesCounterClockwise(walls, previous_map_width);
	blockingTiles = gridCalculator.rotateTilesCounterClockwise(blockingTiles, previous_map_width);
	blockingEdges = gridCalculator.rotateEdgesCounterClockwise(blockingEdges, previous_map_width);
	blockingIntersections = gridCalculator.rotateIntersectionsCounterClockwise(blockingIntersections, previous_map_width);
	spireTiles = gridCalculator.rotateTilesCounterClockwise(spireTiles, previous_map_width);

	canvasWrapper.setDimensions(canvas_width, canvas_height);

	if (callback) { callback(); }
}

function rotate_clockwise(callback) {
	rotate = (rotate + .5) % 2;
	
	var previous_map_height = map_height;
	map_height = map_width;
	map_width = previous_map_height;
	grid_width = map_width * boxWidth;
	grid_height = map_height * boxWidth;
	var max_width_height = map_width > map_height ? map_width : map_height;
	horizontal_padding = (map_height > map_width ? (map_height - map_width) / 2 : 0) * boxWidth;
	vertical_padding = (map_width > map_height ? (map_width - map_height) / 2 : 0) * boxWidth;
	canvas_width = max_width_height * boxWidth;
	canvas_height = max_width_height * boxWidth;

	attackingTile = gridCalculator.rotateTileClockwise(attackingTile.x, attackingTile.y, previous_map_height);
	defendingTile = gridCalculator.rotateTileClockwise(defendingTile.x, defendingTile.y, previous_map_height);
	blockers = gridCalculator.rotateTilesClockwise(blockers, previous_map_height);
	offMapTiles = gridCalculator.rotateTilesClockwise(offMapTiles, previous_map_height);
	walls = gridCalculator.rotateEdgesClockwise(walls, previous_map_height);
	blockingTiles = gridCalculator.rotateTilesClockwise(blockingTiles, previous_map_height);
	blockingEdges = gridCalculator.rotateEdgesClockwise(blockingEdges, previous_map_height);
	blockingIntersections = gridCalculator.rotateIntersectionsClockwise(blockingIntersections, previous_map_height);
	spireTiles = gridCalculator.rotateTilesClockwise(spireTiles, previous_map_height);

	canvasWrapper.setDimensions(canvas_width, canvas_height);

	if (callback) { callback(); }
}


function updateTile(xCoord, yCoord, target) {
	//check for click in padding
	if (xCoord < horizontal_padding || xCoord > (horizontal_padding + grid_width) ||
		yCoord < vertical_padding || yCoord > (vertical_padding + grid_height)) {
		return false;
	}
	//convert to coordinates
	xCoord = Math.floor((xCoord - horizontal_padding) / boxWidth);
	yCoord = Math.floor((yCoord - vertical_padding) / boxWidth);
	//check for offMap tile click
	var offMapTile = offMapTiles.find(function(tile) {
		return tile.x == xCoord && tile.y == yCoord;
	});
	if (offMapTile) {
		return false;
	}
	//set selected tile
	if (target == 'attacker') {
		attackingTile = { x: xCoord, y: yCoord };
	} else if (target == 'defender') {
		defendingTile = { x: xCoord, y: yCoord };
	} else if (target == 'attacker_defender') {
		attackingTile = { x: xCoord, y: yCoord };
		defendingTile = { x: xCoord, y: yCoord };
	} else {
		var blockerIndex = blockers.findIndex(function(tile) {
			return tile.x == xCoord && tile.y == yCoord;
		});
		if (blockerIndex == -1) {
			blockers.push({ x: xCoord, y: yCoord });
		} else {
			blockers.splice(blockerIndex, 1);
		}
	}
	return true;
}

function updateLinesOfSight(losPaths) {
	linesOfSight = {};
	var enabledLoSPaths = losPaths.filter(function(path) {
		return path.enabled == true;
	});
	enabledLoSPaths.forEach(function(los) {
		linesOfSight[los.key] = {
			attackingCorner: los.attacker,
			defendingCorner1: los.defender1,
			defendingCorner2: los.defender2
		};
	});
}

function updateLinesOfSightDropdown(options) {
	$('#linesOfSight option').attr('disabled','disabled')
	options.forEach(function (option) {
		if (option.enabled == true) {
			$('#linesOfSight option[value="' + option.key + '"]').removeAttr('disabled');
		}
	});
	var firstVisibleOption = options.find(function(option) {
		return option.enabled == true;
	});

	if (firstVisibleOption == undefined) {
		$('#linesOfSight').val('none');
	} else {
		$('#linesOfSight').val(firstVisibleOption.key);
	}
}

function drawBoard(callback){
	var gridDisplay = $('input[name=gridDisplay]:checked' ).val();
	canvasWrapper.prepareBoard(canvas_width, canvas_height, grid_width, grid_height, horizontal_padding, vertical_padding);
	if (gridDisplay == 'grid') {
		drawGrid();
		drawLOSTiles();
		drawFigures();
		if (callback) { callback(); }
	} else if (gridDisplay == 'map') {
		drawMap(function () {
			drawLOSTiles();
			drawFigures();
			if (callback) { callback(); }
		})
	} else if (gridDisplay == 'both') {
		drawMap(function () {
			drawGrid();
			drawLOSTiles();
			drawFigures();
			if (callback) { callback(); }
		})
	}
}

function drawMap(callback) {
	if (map_image_name == map_name) {
		canvasWrapper.drawMap(map_image, rotate, grid_width, grid_height, horizontal_padding, vertical_padding);
		if (callback) { callback(); }
	} else {
		map_image_name = undefined;
		map_image = new Image();
		map_image.onload = function() {
			map_image_name = map_name;
			canvasWrapper.drawMap(map_image, rotate, grid_width, grid_height, horizontal_padding, vertical_padding);
			if (callback) { callback(); }
		};
		map_image.src = './images/' + map_name + '.jpg';
	}
}

function drawGrid(){
	canvasWrapper.drawGrid(grid_width, grid_height, boxWidth, horizontal_padding, vertical_padding);
	canvasWrapper.drawOffMapTiles(offMapTiles, boxWidth, horizontal_padding, vertical_padding);
	canvasWrapper.drawWalls(walls, boxWidth, horizontal_padding, vertical_padding);
	canvasWrapper.drawBlockingTiles(blockingTiles, boxWidth, horizontal_padding, vertical_padding);
	canvasWrapper.drawBlockingEdges(blockingEdges, boxWidth, horizontal_padding, vertical_padding);
	canvasWrapper.drawSpireTiles(spireTiles, boxWidth, horizontal_padding, vertical_padding);
	//canvasWrapper.drawBlockingIntersections(blockingIntersections, false, boxWidth, horizontal_padding, vertical_padding);
	//canvasWrapper.drawBlockingIntersections(blockingIntersections, true, boxWidth, horizontal_padding, vertical_padding);
}

function drawLOSTiles() {
	canvasWrapper.drawAttackerLOSTiles(attackerLOSTiles, boxWidth, horizontal_padding, vertical_padding);
	canvasWrapper.drawDefenderLOSTiles(defenderLOSTiles, boxWidth, horizontal_padding, vertical_padding);
	canvasWrapper.drawMutualLOSTiles(mutualLOSTiles, boxWidth, horizontal_padding, vertical_padding);
}

function drawFigures() {
	if (attackingTile.x == defendingTile.x && attackingTile.y == defendingTile.y) {
		drawAttackerDefender();
	} else {
		drawAttacker();
		drawDefender();
	}
	drawBlockers();
}

function drawAttacker() {
	if (attackingTile.x != -1 && attackingTile.y != -1) {
		canvasWrapper.drawAttacker(attackingTile.x, attackingTile.y, boxWidth, horizontal_padding, vertical_padding)
	}
}

function drawDefender() {
	if (defendingTile.x != -1 && defendingTile.y != -1) {
		canvasWrapper.drawDefender(defendingTile.x, defendingTile.y, boxWidth, horizontal_padding, vertical_padding)
	}
}

function drawAttackerDefender() {
	if (attackingTile.x != -1 && attackingTile.y != -1 && defendingTile.x != -1 && defendingTile.y != -1) {
		canvasWrapper.drawAttackerDefender(defendingTile.x, defendingTile.y, boxWidth, horizontal_padding, vertical_padding)
	}
}

function drawBlockers() {
	canvasWrapper.drawBlockers(blockers, boxWidth, horizontal_padding, vertical_padding);
}

function drawLineOfSight(attackingCorner, defendingCorner) {
	canvasWrapper.drawLineOfSight(attackingCorner, defendingCorner, boxWidth, horizontal_padding, vertical_padding);
}

function drawLinesOfSight() {
	if (attackingTile.x == -1 || attackingTile.y == -1 ||
		defendingTile.x == -1 || defendingTile.y == -1 ||
		(attackingTile.x == defendingTile.x && attackingTile.y == defendingTile.y)) {
		return;
	}
	var selectedLoS = $('#linesOfSight option:selected').val();
	if (selectedLoS == 'none') { return; }
	var los = linesOfSight[selectedLoS];
	drawLineOfSight(los.attackingCorner, los.defendingCorner1);
	drawLineOfSight(los.attackingCorner, los.defendingCorner2);
}

function calculateLoSTiles(highlightAttackerLoS, highlightDefenderLoS, fromTileX, fromTileY, toTileX, toTileY, width, height, callback) {
	gridCalculator.init({
		offMapTiles: offMapTiles,
        walls: walls,
        blockingTiles: blockingTiles,
        blockingEdges: blockingEdges,
        blockingIntersections: blockingIntersections,
        spireTiles: spireTiles,
        attackingTile: attackingTile,
        defendingTile: defendingTile,
        blockers: blockers
	});

	if (highlightAttackerLoS) {
		attackerLOSTiles = gridCalculator.calculateAttackerLoSTiles(fromTileX, fromTileY, width, height)
	}
	if (highlightDefenderLoS) {
		defenderLOSTiles = gridCalculator.calculateDefenderLoSTiles(toTileX, toTileY, width, height)
	}
	if (highlightAttackerLoS && highlightDefenderLoS) {
		var LOSTiles = gridCalculator.calculateMutualLoSTiles(attackerLOSTiles, defenderLOSTiles);
		attackerLOSTiles = LOSTiles.attackerLOSTiles;
		defenderLOSTiles = LOSTiles.defenderLOSTiles;
		mutualLOSTiles = LOSTiles.mutualLOSTiles;
	}
	if (callback) { callback(); }
}

function calculateLoSFromAttackerToDefender(fromTileX, fromTileY, toTileX, toTileY, callback) {
	if (attackingTile.x != defendingTile.x && attackingTile.y != defendingTile.y) {
		gridCalculator.init({
			offMapTiles: offMapTiles,
			walls: walls,
			blockingTiles: blockingTiles,
			blockingEdges: blockingEdges,
			blockingIntersections: blockingIntersections,
			spireTiles: spireTiles,
			attackingTile: attackingTile,
			defendingTile: defendingTile,
			blockers: blockers
		});
		gridCalculator.calculateLoSFromAttackerToDefender(fromTileX, fromTileY, toTileX, toTileY, 
			function(losPaths) {
				updateLinesOfSight(losPaths);
				updateLinesOfSightDropdown(losPaths);
				if (callback) { callback(); }
			}
		);
	} else {
		var losPaths = [];
		updateLinesOfSight(losPaths);
		updateLinesOfSightDropdown(losPaths);
		if (callback) { callback(); }
	}
}

$(function () {
	//init canvas and grid
	canvasWrapper.init();

	map_name = $('#selected_map option:selected').val();
	//init grid
	if (ia_los_maps[map_name]) {
		loadMap(map_name);
	} else {
		getMap(map_name);
	}
})

$(document).on('boardClick', function(event) {
	var xCoord = event.detail.xCoord;
	var yCoord = event.detail.yCoord;
	var target = $('input[name=target]:checked' ).val();
	var boardUpdated = updateTile(xCoord, yCoord, target);
	if (boardUpdated) {
		var highlightAttackerLoS = $('#highlightAttackerLoS').is(":checked");
		var highlightDefenderLoS = $('#highlightDefenderLoS').is(":checked");
		calculateLoSTiles(highlightAttackerLoS, highlightDefenderLoS, attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y, map_width, map_height, function () {
			drawBoard(function () {
				calculateLoSFromAttackerToDefender(attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
					function() {
						drawLinesOfSight();
					}
				);
			});
		});
	}
});

$(document).on('change', 'input[type=radio][name=target]', function(event) {
	var target = $(event.target).val();
	if (target == 'attacker_defender') {
		$('#highlightAttackerLoS').prop('checked', true);
		$('#highlightDefenderLoS').prop('checked', true);
	}
})

$(document).on('change', 'input[type=radio][name=gridDisplay]', function() {
	drawBoard(function () {
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

$(document).on('click', '#clearMap', function () {
	clearMap(function () {
		drawBoard();
	});
});

$(document).on('click', '.rotate-map-counter-clockwise', function () {
	rotate_counter_clockwise(function() {
		var highlightAttackerLoS = $('#highlightAttackerLoS').is(":checked");
		var highlightDefenderLoS = $('#highlightDefenderLoS').is(":checked");
		calculateLoSTiles(highlightAttackerLoS, highlightDefenderLoS, attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y, map_width, map_height, function () {
			drawBoard(function () {
				calculateLoSFromAttackerToDefender(attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
					function() {
						drawLinesOfSight();
					}
				);
			});
		});
	});
});

$(document).on('click', '.rotate-map-clockwise', function () {
	rotate_clockwise(function() {
		var highlightAttackerLoS = $('#highlightAttackerLoS').is(":checked");
		var highlightDefenderLoS = $('#highlightDefenderLoS').is(":checked");
		calculateLoSTiles(highlightAttackerLoS, highlightDefenderLoS, attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y, map_width, map_height, function () {
			drawBoard(function () {
				calculateLoSFromAttackerToDefender(attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
					function() {
						drawLinesOfSight();
					}
				);
			});
		});
	});
});
	
$(document).on('map_loaded', '#map_load', function(event, mapName) {
	loadMap(mapName);
})