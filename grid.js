
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
var attackerLOSTiles = [];
var defenderLOSTiles = [];
var mutualLOSTiles = [];

var map_images = ['Mos_Eisley_Back_Alleys',
'Tarkin_Initiative_Labs',
'Uscru_Entertainment_District',
'30th_Floor_Plaza',
'Anchorhead_Cantina',
'Bespin_Tibanna_Facility',
'Chopper_Base_Atollon',
'Climate_Research_Camp'];
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

	canvas.width = canvas_width;
	canvas.height = canvas_height;

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

function drawBoard(callback){
	var gridDisplay = $('input[name=gridDisplay]:checked' ).val();
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas_width, canvas_height);
	context.clearRect(horizontal_padding, vertical_padding, grid_width, grid_height);
	if (gridDisplay == 'grid') {
		drawGrid();
		drawLOSTiles();
		drawAttacker();
		drawDefender();
		blockers.forEach(drawBlocker);
		if (callback) { callback(); }
	} else if (gridDisplay == 'map') {
		drawMap(function () {
			drawLOSTiles();
			drawAttacker();
			drawDefender();
			blockers.forEach(drawBlocker);
			if (callback) { callback(); }
		})
	} else if (gridDisplay == 'both') {
		drawMap(function () {
			drawGrid();
			drawLOSTiles();
			drawAttacker();
			drawDefender();
			blockers.forEach(drawBlocker);
			if (callback) { callback(); }
		})
	}
}

function rotate_counter_clockwise() {
	rotate -= 90 * Math.PI / 180.0;
	//drawBoard(function () {
	//	calculateLoSFromAttackerToDefender();
	//	drawLinesOfSight();
	//})
}

function rotate_clockwise() {
	rotate += 90 * Math.PI / 180.0;
	//drawBoard(function () {
	//	calculateLoSFromAttackerToDefender();
	//	drawLinesOfSight();
	//});
}

//function drawImage(rotation){
//	context.setTransform(1, 0, 0, 1, 0, 0); // sets scale and origin
//	context.rotate(rotation);
//	//context.drawImage(image, -image.width / 2, -image.height / 2);
//	context.drawImage(image, padding, padding, image.height, image.width, padding, padding, grid_width, grid_height);
//} 
//function drawImage(degrees){
//  context.save();
//  context.translate(canvas_width / 2, canvas_height / 2);
//  context.rotate(degrees * Math.PI / 180.0);
//  context.translate(-canvas_width / 2, -canvas_height / 2);
//  context.drawImage(image, 0, 0, canvas_width, canvas_height);
//  context.restore();
//}

function drawMap(callback) {
	if (map_image_name == map_name) {
		//context.save();
		//context.translate(canvas.width/2,canvas.height/2);
		//context.rotate(90 * Math.PI / 180);
		//context.drawImage(image,-image.width/2,-image.width/2);
		//context.drawImage(image,-image.width/2,-image.width/2, image.width, image.height);
		//context.drawImage(image,0, 0, image.height, image.width, -image.width/2,-image.width/2, grid_height, grid_width);
		//context.restore();
		context.drawImage(map_image, 0, 0, map_image.width, map_image.height, horizontal_padding, vertical_padding, grid_width, grid_height);
		if (callback) { callback(); }
	} else {
		map_image_name = undefined;
		map_image = new Image();
		map_image.onload = function() {
			map_image_name = map_name;
			context.drawImage(map_image, 0, 0, map_image.width, map_image.height, horizontal_padding, vertical_padding, grid_width, grid_height);
			if (callback) { callback(); }
		};
		map_image.src = './images/' + map_name + '.jpg';
	}
}

function drawGrid(){
	context.beginPath();
	context.strokeStyle = "black";
	for (var x = 0; x <= grid_width; x += boxWidth) {
		context.moveTo(0.5 + (x + horizontal_padding), vertical_padding);
		context.lineTo(0.5 + x + horizontal_padding, (grid_height + vertical_padding));
	}
	for (var y = 0; y <= grid_height; y += boxWidth) {
		context.moveTo(horizontal_padding, 0.5 + y + vertical_padding);
		context.lineTo(grid_width + horizontal_padding, 0.5 + y + vertical_padding);
	}
	context.lineWidth = 1;
	context.stroke();

	offMapTiles.forEach(drawOffMapTile);
	walls.forEach(drawWall);
	blockingTiles.forEach(drawBlockingTile);
	blockingEdges.forEach(drawBlockingEdge);
	//blockingIntersections.forEach(drawBlockingIntersection);
	//blockingIntersections.forEach(drawVerboseBlockingIntersection);
}

function drawLOSTiles() {
	attackerLOSTiles.forEach(drawAttackerLOSTile);
	defenderLOSTiles.forEach(drawDefenderLOSTile);
	mutualLOSTiles.forEach(drawMutualLOSTile)
	//console.log('Attacker LOS Tiles');
	//attackerLOSTiles.forEach(function (tile) {
	//	console.log(JSON.stringify(tile));
	//})
	//console.log('Defender LOS Tiles');
	//defenderLOSTiles.forEach(function (tile) {
	//	console.log(JSON.stringify(tile));
	//})
	//console.log('Mutual LOS Tiles');
	//mutualLOSTiles.forEach(function (tile) {
	//	console.log(JSON.stringify(tile));
	//})
}

function getTile(clientX, clientY, event) {
	var rect = canvas.getBoundingClientRect();
	x = Math.floor((clientX - rect.left - horizontal_padding) / boxWidth);
	y = Math.floor((clientY - rect.top - vertical_padding) / boxWidth);
	return { x : x, y: y };
}

function selectTile(clientX, clientY, target) {
	var rect = canvas.getBoundingClientRect();
	var xCoord = clientX - rect.left;
	var yCoord = clientY - rect.top;
	//check for click in padding
	if (xCoord < horizontal_padding || xCoord > (horizontal_padding + grid_width) ||
		yCoord < vertical_padding || yCoord > (vertical_padding + grid_height)) {
		return false;
	}
	//convert to coordinates
	xCoord = Math.floor((clientX - rect.left - horizontal_padding) / boxWidth);
	yCoord = Math.floor((clientY - rect.top - vertical_padding) / boxWidth);
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

function drawOffMapTile(tile) {
	var xCoord = (tile.x * boxWidth) + horizontal_padding;
	var yCoord = (tile.y * boxWidth) + vertical_padding;
	context.fillStyle = 'rgba(0, 0, 0)';
	context.fillRect(xCoord, yCoord, boxWidth, boxWidth);
}

function drawBlockingTile(tile) {
	var xCoord = (tile.x * boxWidth) + horizontal_padding;
	var yCoord = (tile.y * boxWidth) + vertical_padding;
	context.fillStyle = 'rgba(200, 0, 0, 0.5)';
	context.fillRect(xCoord, yCoord, boxWidth, boxWidth);
}

function drawAttackerLOSTile(tile) {
	var xCoord = (tile.x * boxWidth) + horizontal_padding;
	var yCoord = (tile.y * boxWidth) + vertical_padding;
	context.fillStyle = 'rgba(255, 255, 0, 0.5)';
	context.fillRect(xCoord, yCoord, boxWidth, boxWidth);
}

function drawDefenderLOSTile(tile) {
	var xCoord = (tile.x * boxWidth) + horizontal_padding;
	var yCoord = (tile.y * boxWidth) + vertical_padding;
	context.fillStyle = 'rgba(0, 191, 255, 0.5)';
	context.fillRect(xCoord, yCoord, boxWidth, boxWidth);
}

function drawMutualLOSTile(tile) {
	var xCoord = (tile.x * boxWidth) + horizontal_padding;
	var yCoord = (tile.y * boxWidth) + vertical_padding;
	context.fillStyle = 'rgba(0, 255, 0, 0.5)';
	context.fillRect(xCoord, yCoord, boxWidth, boxWidth);
}

function drawWall(wall) {
	context.beginPath();
	context.strokeStyle = "black";
	var startX = (wall[0].x * boxWidth) + horizontal_padding;
	var startY = (wall[0].y * boxWidth) + vertical_padding;
	var endX = (wall[1].x * boxWidth) + horizontal_padding;
	var endY = (wall[1].y * boxWidth) + vertical_padding;
	context.moveTo(1 + startX, 1 + startY);
	context.lineTo(1 + endX, 1 + endY);
	context.moveTo(-1 + startX, -1 + startY);
	context.lineTo(-1 + endX, -1 + endY);
	context.lineWidth = 2;
	context.stroke();
}

function drawEdge(edge) {
	context.beginPath();
	context.strokeStyle = "yellow";
	var startX = (edge[0].x * boxWidth) + horizontal_padding;
	var startY = (edge[0].y * boxWidth) + vertical_padding;
	var endX = (edge[1].x * boxWidth) + horizontal_padding;
	var endY = (edge[1].y * boxWidth) + vertical_padding;
	context.moveTo(1 + startX, 1 + startY);
	context.lineTo(1 + endX, 1 + endY);
	context.moveTo(-1 + startX, -1 + startY);
	context.lineTo(-1 + endX, -1 + endY);
	context.lineWidth = 2;
	context.stroke();
}

function drawBlockingEdge(edge) {
	context.beginPath();
	context.strokeStyle = "red";
	var startX = (edge[0].x * boxWidth) + horizontal_padding;
	var startY = (edge[0].y * boxWidth) + vertical_padding;
	var endX = (edge[1].x * boxWidth) + horizontal_padding;
	var endY = (edge[1].y * boxWidth) + vertical_padding;
	context.moveTo(1 + startX, 1 + startY);
	context.lineTo(1 + endX, 1 + endY);
	context.moveTo(-1 + startX, -1 + startY);
	context.lineTo(-1 + endX, -1 + endY);
	context.lineWidth = 2;
	context.stroke();
}

function drawBlockingIntersection(intersection) {
	context.beginPath();
	context.strokeStyle = "red";
	var xCoord = (intersection.x * boxWidth) + horizontal_padding;
	var yCoord = (intersection.y * boxWidth) + vertical_padding;
	context.arc(xCoord, yCoord, boxWidth / 10, 0, 2 * Math.PI);
	context.fillStyle = 'rgba(200, 0, 0)';
	context.fill();
	context.stroke();
}

function drawVerboseBlockingIntersection(intersection) {
	context.beginPath();
	context.strokeStyle = "red";
	var xCoord = (intersection.x * boxWidth) + horizontal_padding;
	var yCoord = (intersection.y * boxWidth) + vertical_padding;
	context.arc(xCoord, yCoord, boxWidth / 10, 0, 2 * Math.PI);
	context.fillStyle = 'rgba(200, 0, 0)';
	context.fill();
	context.lineWidth = 1;
	context.stroke();
	intersection.connections.forEach(function(connection) {
		drawBlockingEdge([ { x: intersection.x, y: intersection.y }, connection ]);
	})	
}

function drawIntersection(intersection) {
	context.beginPath();
	context.strokeStyle = "green";
	var xCoord = (intersection.x * boxWidth) + horizontal_padding;
	var yCoord = (intersection.y * boxWidth) + vertical_padding;
	context.arc(xCoord, yCoord, boxWidth / 10, 0, 2 * Math.PI);
	context.fillStyle = 'green';
	context.fill();
	context.stroke();
}

function drawAttacker() {
	if (attackingTile.x != -1 && attackingTile.y != -1) {
		context.beginPath();
		context.strokeStyle = "black";
		context.lineWidth = 1;
		var x = (attackingTile.x * boxWidth) + horizontal_padding + (0.5 * boxWidth);
		var y = (attackingTile.y * boxWidth) + vertical_padding + (0.5 * boxWidth);
		context.arc(x, y, (0.5 * boxWidth), 0, 2 * Math.PI);
		context.fillStyle = 'white';
		context.fill();
		context.stroke();
		drawAttackerIcon();
	}
}

function drawDefender() {
	if (defendingTile.x != -1 && defendingTile.y != -1) {
		context.beginPath();
		context.strokeStyle = "black";
		context.lineWidth = 1;
		var x = (defendingTile.x * boxWidth) + horizontal_padding + (0.5 * boxWidth);
		var y = (defendingTile.y * boxWidth) + vertical_padding + (0.5 * boxWidth);
		context.arc(x, y, (0.5 * boxWidth), 0, 2 * Math.PI);
		context.fillStyle = 'white';
		context.fill();
		context.stroke();
		drawDefenderIcon();
	}
}

function drawBlocker(blocker) {
	if (blocker.x != -1 && blocker.y != -1) {
		context.beginPath();
		context.strokeStyle = "black";
		context.lineWidth = 1;
		var x = (blocker.x * boxWidth) + horizontal_padding + (0.5 * boxWidth);
		var y = (blocker.y * boxWidth) + vertical_padding + (0.5 * boxWidth);
		context.arc(x, y, (0.5 * boxWidth), 0, 2 * Math.PI);
		context.fillStyle = 'white';
		context.fill();
		context.stroke();
		drawBlockerIcon(blocker.x, blocker.y);
	}
}

function drawAttackerIcon () {
	context.drawImage(attacker_image, 0, 0, attacker_image.width, attacker_image.height, 
		(attackingTile.x * boxWidth) + horizontal_padding + (0.1 * boxWidth),
		(attackingTile.y * boxWidth) + vertical_padding + (0.15 * boxWidth), 
		(0.7 * boxWidth), (0.7 * boxWidth));
}

function drawDefenderIcon() {
	context.drawImage(defender_image, 0, 0, defender_image.width, defender_image.height, 
		(defendingTile.x * boxWidth) + horizontal_padding,
		(defendingTile.y * boxWidth) + vertical_padding, 
		boxWidth, boxWidth);
}

function drawBlockerIcon (x, y) {
	context.drawImage(blocker_image, 0, 0, blocker_image.width, blocker_image.height, 
		(x * boxWidth) + horizontal_padding + (0.15 * boxWidth),
		(y * boxWidth) + vertical_padding + (0.2 * boxWidth), 
		(0.7 * boxWidth), (0.7 * boxWidth));
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

function drawLineOfSight(attackingCorner, defendingCorner) {
	context.beginPath();
	context.strokeStyle = "red";
	context.lineWidth = 1;
	var startX = (attackingCorner.x * boxWidth) + horizontal_padding;
	var startY = (attackingCorner.y * boxWidth) + vertical_padding;
	var endX = (defendingCorner.x * boxWidth) + horizontal_padding;
	var endY = (defendingCorner.y * boxWidth) + vertical_padding;
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	context.stroke();
}

function drawLinesOfSight() {
	if ((attackingTile.x != -1 && attackingTile.y != -1 &&
		 defendingTile.x != -1 && defendingTile.y != -1) == false) {
		return;
	}
	var selectedLoS = $('#linesOfSight option:selected').val();
	if (selectedLoS == 'none') { return; }
	var los = linesOfSight[selectedLoS];
	drawLineOfSight(los.attackingCorner, los.defendingCorner1);
	drawLineOfSight(los.attackingCorner, los.defendingCorner2);
}

function updateLinesOfSightDropdown(options) {
	options.forEach(function (option) {
		if (option.enabled == true) {
			$('#linesOfSight option[value="' + option.value + '"]').removeAttr('disabled');
		} else {
			$('#linesOfSight option[value="' + option.value + '"]').attr('disabled','disabled')
		}
	});
	var firstVisibleOption = options.find(function(option) {
		return option.enabled == true;
	});

	if (firstVisibleOption == undefined) {
		$('#linesOfSight').val('none');
	} else {
		$('#linesOfSight').val(firstVisibleOption.value);
	}
}

function calculateLoSTiles(highlightAttackerLoS, highlightDefenderLoS, fromTileX, fromTileY, toTileX, toTileY, width, height, callback) {
	attackerLOSTiles = [];
	defenderLOSTiles = [];
	mutualLOSTiles = [];

	if (highlightAttackerLoS) {
		calculateAttackerLoSTiles(fromTileX, fromTileY, toTileX, toTileY, width, height, function () {
			if (highlightDefenderLoS) {
				calculateDefenderLoSTiles(fromTileX, fromTileY, toTileX, toTileY, width, height, function () {
					calculateMutualLoSTiles(callback);
				});
			} else {
				if (callback) { callback(); }
			}
		})
	} else if (highlightDefenderLoS) {
		calculateDefenderLoSTiles(fromTileX, fromTileY, toTileX, toTileY, width, height, callback);
	} else {
		if (callback) { callback(); }
	}
}

function calculateAttackerLoSTiles(fromTileX, fromTileY, toTileX, toTileY, width, height, callback) {
	//check to see attacking tile present
	if (fromTileX != -1 && fromTileY != -1) {
		for (var w = 0; w < width; w++) {
			for (var h = 0; h < height; h++) {
				var attckerHasLoSToTile = calculateLoSFromTileToTile(fromTileX, fromTileY, w, h);
				if (attckerHasLoSToTile == true) {
					attackerLOSTiles.push({ "x": w, "y": h });
				}
			}
		}
	}

	if (callback) { callback(); }
}

function calculateDefenderLoSTiles (fromTileX, fromTileY, toTileX, toTileY, width, height, callback) {
	if (toTileX != -1 && toTileY != -1) {
		for (var w = 0; w < width; w++) {
			for (var h = 0; h < height; h++) {
				var attckerHasLoSToTile = calculateLoSFromTileToTile(w, h, toTileX, toTileY);
				if (attckerHasLoSToTile == true) {
					defenderLOSTiles.push({ "x": w, "y": h });
				}
			}
		}
	}

	if (callback) { callback(); }
}

function calculateMutualLoSTiles (callback) {
	mutualLOSTiles = attackerLOSTiles.filter(function (attackerLoSTile) {
		var defenderTileIndex = defenderLOSTiles.findIndex(function (defenderLoSTile) {
			return defenderLoSTile.x == attackerLoSTile.x && defenderLoSTile.y == attackerLoSTile.y;
		});
		return defenderTileIndex > -1;
	});

	attackerLOSTiles = attackerLOSTiles.filter(function (attackerLoSTile) {
		var mutualTileIndex = mutualLOSTiles.findIndex(function (mutualLoSTile) {
			return mutualLoSTile.x == attackerLoSTile.x && mutualLoSTile.y == attackerLoSTile.y;
		});
		return mutualTileIndex == -1;
	});

	defenderLOSTiles = defenderLOSTiles.filter(function (defenderLoSTile) {
		var mutualTileIndex = mutualLOSTiles.findIndex(function (mutualLoSTile) {
			return mutualLoSTile.x == defenderLoSTile.x && mutualLoSTile.y == defenderLoSTile.y;
		});
		return mutualTileIndex == -1;
	});

	if (callback) { callback(); }
}

function calculateLoSFromTileToTile(fromTileX, fromTileY, toTileX, toTileY) {
	if (fromTileX == toTileX && fromTileY == toTileY) { return true; }
	var offMapTileIndex = offMapTiles.findIndex(function(off_map_tile) {
		return (off_map_tile.x == toTileX && off_map_tile.y == toTileY) ||
			(off_map_tile.x == fromTileX && off_map_tile.y == fromTileY);
	})
	if (offMapTileIndex > -1) { return false; }

	var from_tl = { x: fromTileX, y: fromTileY };
	var from_tr = { x: fromTileX + 1, y: fromTileY };
	var from_bl = { x: fromTileX, y: fromTileY + 1 };
	var from_br = { x: fromTileX + 1, y: fromTileY + 1 };
	var to_tl = { x: toTileX, y: toTileY };
	var to_tr = { x: toTileX + 1, y: toTileY };
	var to_bl = { x: toTileX, y: toTileY + 1 };
	var to_br = { x: toTileX + 1, y: toTileY + 1 };

	var tl_to_tl = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_tl, to_tl);
	var tl_to_tr = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_tl, to_tr);
	var tl_to_br = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_tl, to_br);
	var tl_to_bl = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_tl, to_bl);
	var tl_to_tl_tr_overlaps = pathsOverlap(from_tl, to_tl, to_tr);
	var tl_to_tr_br_overlaps = pathsOverlap(from_tl, to_tr, to_br);
	var tl_to_bl_br_overlaps = pathsOverlap(from_tl, to_bl, to_br);
	var tl_to_tl_bl_overlaps = pathsOverlap(from_tl, to_tl, to_bl);
	if ((tl_to_tl && tl_to_tr && !tl_to_tl_tr_overlaps) ||
		(tl_to_tr && tl_to_br && !tl_to_tr_br_overlaps) ||
		(tl_to_bl && tl_to_br && !tl_to_bl_br_overlaps) ||
		(tl_to_tl && tl_to_bl && !tl_to_tl_bl_overlaps)) {
		//console.log('TL Los from tile {' + fromTileX + ', ' + fromTileY + '} to tile {' + toTileX + ', ' + toTileY + '}');
		return true;
	}

	var tr_to_tl = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_tr, to_tl);
	var tr_to_tr = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_tr, to_tr);
	var tr_to_br = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_tr, to_br);
	var tr_to_bl = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_tr, to_bl);
	var tr_to_tl_tr_overlaps = pathsOverlap(from_tr, to_tl, to_tr);
	var tr_to_tr_br_overlaps = pathsOverlap(from_tr, to_tr, to_br);
	var tr_to_bl_br_overlaps = pathsOverlap(from_tr, to_bl, to_br);
	var tr_to_tl_bl_overlaps = pathsOverlap(from_tr, to_tl, to_bl);
	if ((tr_to_tl && tr_to_tr && !tr_to_tl_tr_overlaps) ||
		(tr_to_tr && tr_to_br && !tr_to_tr_br_overlaps) ||
		(tr_to_bl && tr_to_br && !tr_to_bl_br_overlaps) ||
		(tr_to_tl && tr_to_bl && !tr_to_tl_bl_overlaps)) {
		//console.log('TR Los from tile {' + fromTileX + ', ' + fromTileY + '} to tile {' + toTileX + ', ' + toTileY + '}');
		return true;
	}

	var bl_to_tl = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_bl, to_tl);
	var bl_to_tr = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_bl, to_tr);
	var bl_to_br = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_bl, to_br);
	var bl_to_bl = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_bl, to_bl);
	var bl_to_tl_tr_overlaps = pathsOverlap(from_bl, to_tl, to_tr);
	var bl_to_tr_br_overlaps = pathsOverlap(from_bl, to_tr, to_br);
	var bl_to_bl_br_overlaps = pathsOverlap(from_bl, to_bl, to_br);
	var bl_to_tl_bl_overlaps = pathsOverlap(from_bl, to_tl, to_bl);
	if ((bl_to_tl && bl_to_tr && !bl_to_tl_tr_overlaps) ||
		(bl_to_tr && bl_to_br && !bl_to_tr_br_overlaps) ||
		(bl_to_bl && bl_to_br && !bl_to_bl_br_overlaps) ||
		(bl_to_tl && bl_to_bl && !bl_to_tl_bl_overlaps)) {
		//console.log('BL Los from tile {' + fromTileX + ', ' + fromTileY + '} to tile {' + toTileX + ', ' + toTileY + '}');
		return true;
	}

	var br_to_tl = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_br, to_tl);
	var br_to_tr = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_br, to_tr);
	var br_to_br = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_br, to_br);
	var br_to_bl = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_br, to_bl);
	var br_to_tl_tr_overlaps = pathsOverlap(from_br, to_tl, to_tr);
	var br_to_tr_br_overlaps = pathsOverlap(from_br, to_tr, to_br);
	var br_to_bl_br_overlaps = pathsOverlap(from_br, to_bl, to_br);
	var br_to_tl_bl_overlaps = pathsOverlap(from_br, to_tl, to_bl);
	if ((br_to_tl && br_to_tr && !br_to_tl_tr_overlaps) ||
	(br_to_tr && br_to_br && !br_to_tr_br_overlaps) ||
	(br_to_bl && br_to_br && !br_to_bl_br_overlaps) ||
	(br_to_tl && br_to_bl && !br_to_tl_bl_overlaps)) {
		//console.log('BR Los from tile {' + fromTileX + ', ' + fromTileY + '} to tile {' + toTileX + ', ' + toTileY + '}');
		return true;
	}

	console.log('NO Los from tile {' + fromTileX + ', ' + fromTileY + '} to tile {' + toTileX + ', ' + toTileY + '}');
	return false;
}

function calculateLoSFromAttackerToDefender(fromTileX, fromTileY, toTileX, toTileY) {
	if ((fromTileX != -1 && fromTileY != -1 &&
		 toTileX != -1 && toTileY != -1) == false) {
		return;
	}
	var attacker_tl = { x: fromTileX, y: fromTileY };
	var attacker_tr = { x: fromTileX + 1, y: fromTileY };
	var attacker_bl = { x: fromTileX, y: fromTileY + 1 };
	var attacker_br = { x: fromTileX + 1, y: fromTileY + 1 };
	var defender_tl = { x: toTileX, y: toTileY };
	var defender_tr = { x: toTileX + 1, y: toTileY };
	var defender_bl = { x: toTileX, y: toTileY + 1 };
	var defender_br = { x: toTileX + 1, y: toTileY + 1 };
	
	var tl_to_tl_tr_overlaps = pathsOverlap(attacker_tl, defender_tl, defender_tr);
	var tl_to_tr_br_overlaps = pathsOverlap(attacker_tl, defender_tr, defender_br);
	var tl_to_bl_br_overlaps = pathsOverlap(attacker_tl, defender_bl, defender_br);
	var tl_to_tl_bl_overlaps = pathsOverlap(attacker_tl, defender_tl, defender_bl);
	var tr_to_tl_tr_overlaps = pathsOverlap(attacker_tr, defender_tl, defender_tr);
	var tr_to_tr_br_overlaps = pathsOverlap(attacker_tr, defender_tr, defender_br);
	var tr_to_bl_br_overlaps = pathsOverlap(attacker_tr, defender_bl, defender_br);
	var tr_to_tl_bl_overlaps = pathsOverlap(attacker_tr, defender_tl, defender_bl);
	var bl_to_tl_tr_overlaps = pathsOverlap(attacker_bl, defender_tl, defender_tr);
	var bl_to_tr_br_overlaps = pathsOverlap(attacker_bl, defender_tr, defender_br);
	var bl_to_bl_br_overlaps = pathsOverlap(attacker_bl, defender_bl, defender_br);
	var bl_to_tl_bl_overlaps = pathsOverlap(attacker_bl, defender_tl, defender_bl);
	var br_to_tl_tr_overlaps = pathsOverlap(attacker_br, defender_tl, defender_tr);
	var br_to_tr_br_overlaps = pathsOverlap(attacker_br, defender_tr, defender_br);
	var br_to_bl_br_overlaps = pathsOverlap(attacker_br, defender_bl, defender_br);
	var br_to_tl_bl_overlaps = pathsOverlap(attacker_br, defender_tl, defender_bl);

	var tl_to_tl = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_tl, defender_tl);
	var tl_to_tr = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_tl, defender_tr);
	var tl_to_br = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_tl, defender_br);
	var tl_to_bl = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_tl, defender_bl);

	var tr_to_tl = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_tr, defender_tl);
	var tr_to_tr = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_tr, defender_tr);
	var tr_to_br = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_tr, defender_br);
	var tr_to_bl = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_tr, defender_bl);

	var bl_to_tl = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_bl, defender_tl);
	var bl_to_tr = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_bl, defender_tr);
	var bl_to_br = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_bl, defender_br);
	var bl_to_bl = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_bl, defender_bl);

	var br_to_tl = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_br, defender_tl);
	var br_to_tr = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_br, defender_tr);
	var br_to_br = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_br, defender_br);
	var br_to_bl = getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_br, defender_bl);
	
	updateLinesOfSight([
		{ key: 'tl_to_tl_tr', attacker: { x: attacker_tl.x, y: attacker_tl.y }, defender1: { x: defender_tl.x, y: defender_tl.y }, defender2: { x: defender_tr.x, y: defender_tr.y }, enabled: (tl_to_tl && tl_to_tr && !tl_to_tl_tr_overlaps) },
		{ key: 'tl_to_tr_br', attacker: { x: attacker_tl.x, y: attacker_tl.y }, defender1: { x: defender_tr.x, y: defender_tr.y }, defender2: { x: defender_br.x, y: defender_br.y }, enabled: (tl_to_tr && tl_to_br && !tl_to_tr_br_overlaps) },
		{ key: 'tl_to_bl_br', attacker: { x: attacker_tl.x, y: attacker_tl.y }, defender1: { x: defender_bl.x, y: defender_bl.y }, defender2: { x: defender_br.x, y: defender_br.y }, enabled: (tl_to_bl && tl_to_br && !tl_to_bl_br_overlaps) },
		{ key: 'tl_to_tl_bl', attacker: { x: attacker_tl.x, y: attacker_tl.y }, defender1: { x: defender_tl.x, y: defender_tl.y }, defender2: { x: defender_bl.x, y: defender_bl.y }, enabled: (tl_to_tl && tl_to_bl && !tl_to_tl_bl_overlaps) },
		{ key: 'tr_to_tl_tr', attacker: { x: attacker_tr.x, y: attacker_tr.y }, defender1: { x: defender_tl.x, y: defender_tl.y }, defender2: { x: defender_tr.x, y: defender_tr.y }, enabled: (tr_to_tl && tr_to_tr && !tr_to_tl_tr_overlaps) },
		{ key: 'tr_to_tr_br', attacker: { x: attacker_tr.x, y: attacker_tr.y }, defender1: { x: defender_tr.x, y: defender_tr.y }, defender2: { x: defender_br.x, y: defender_br.y }, enabled: (tr_to_tr && tr_to_br && !tr_to_tr_br_overlaps) },
		{ key: 'tr_to_bl_br', attacker: { x: attacker_tr.x, y: attacker_tr.y }, defender1: { x: defender_bl.x, y: defender_bl.y }, defender2: { x: defender_br.x, y: defender_br.y }, enabled: (tr_to_bl && tr_to_br && !tr_to_bl_br_overlaps) },
		{ key: 'tr_to_tl_bl', attacker: { x: attacker_tr.x, y: attacker_tr.y }, defender1: { x: defender_tl.x, y: defender_tl.y }, defender2: { x: defender_bl.x, y: defender_bl.y }, enabled: (tr_to_tl && tr_to_bl && !tr_to_tl_bl_overlaps) },
		{ key: 'bl_to_tl_tr', attacker: { x: attacker_bl.x, y: attacker_bl.y }, defender1: { x: defender_tl.x, y: defender_tl.y }, defender2: { x: defender_tr.x, y: defender_tr.y }, enabled: (bl_to_tl && bl_to_tr && !bl_to_tl_tr_overlaps) },
		{ key: 'bl_to_tr_br', attacker: { x: attacker_bl.x, y: attacker_bl.y }, defender1: { x: defender_tr.x, y: defender_tr.y }, defender2: { x: defender_br.x, y: defender_br.y }, enabled: (bl_to_tr && bl_to_br && !bl_to_tr_br_overlaps) },
		{ key: 'bl_to_bl_br', attacker: { x: attacker_bl.x, y: attacker_bl.y }, defender1: { x: defender_bl.x, y: defender_bl.y }, defender2: { x: defender_br.x, y: defender_br.y }, enabled: (bl_to_bl && bl_to_br && !bl_to_bl_br_overlaps) },
		{ key: 'bl_to_tl_bl', attacker: { x: attacker_bl.x, y: attacker_bl.y }, defender1: { x: defender_tl.x, y: defender_tl.y }, defender2: { x: defender_bl.x, y: defender_bl.y }, enabled: (bl_to_tl && bl_to_bl && !bl_to_tl_bl_overlaps) },
		{ key: 'br_to_tl_tr', attacker: { x: attacker_br.x, y: attacker_br.y }, defender1: { x: defender_tl.x, y: defender_tl.y }, defender2: { x: defender_tr.x, y: defender_tr.y }, enabled: (br_to_tl && br_to_tr && !br_to_tl_tr_overlaps) },
		{ key: 'br_to_tr_br', attacker: { x: attacker_br.x, y: attacker_br.y }, defender1: { x: defender_tr.x, y: defender_tr.y }, defender2: { x: defender_br.x, y: defender_br.y }, enabled: (br_to_tr && br_to_br && !br_to_tr_br_overlaps) },
		{ key: 'br_to_bl_br', attacker: { x: attacker_br.x, y: attacker_br.y }, defender1: { x: defender_bl.x, y: defender_bl.y }, defender2: { x: defender_br.x, y: defender_br.y }, enabled: (br_to_bl && br_to_br && !br_to_bl_br_overlaps) },
		{ key: 'br_to_tl_bl', attacker: { x: attacker_br.x, y: attacker_br.y }, defender1: { x: defender_tl.x, y: defender_tl.y }, defender2: { x: defender_bl.x, y: defender_bl.y }, enabled: (br_to_tl && br_to_bl && !br_to_tl_bl_overlaps) }
	]);	

	updateLinesOfSightDropdown([
		{ value: 'tl_to_tl_tr', enabled: (tl_to_tl && tl_to_tr && !tl_to_tl_tr_overlaps) },
		{ value: 'tl_to_tr_br', enabled: (tl_to_tr && tl_to_br && !tl_to_tr_br_overlaps) },
		{ value: 'tl_to_bl_br', enabled: (tl_to_bl && tl_to_br && !tl_to_bl_br_overlaps) },
		{ value: 'tl_to_tl_bl', enabled: (tl_to_tl && tl_to_bl && !tl_to_tl_bl_overlaps) },
		{ value: 'tr_to_tl_tr', enabled: (tr_to_tl && tr_to_tr && !tr_to_tl_tr_overlaps) },
		{ value: 'tr_to_tr_br', enabled: (tr_to_tr && tr_to_br && !tr_to_tr_br_overlaps) },
		{ value: 'tr_to_bl_br', enabled: (tr_to_bl && tr_to_br && !tr_to_bl_br_overlaps) },
		{ value: 'tr_to_tl_bl', enabled: (tr_to_tl && tr_to_bl && !tr_to_tl_bl_overlaps) },
		{ value: 'bl_to_tl_tr', enabled: (bl_to_tl && bl_to_tr && !bl_to_tl_tr_overlaps) },
		{ value: 'bl_to_tr_br', enabled: (bl_to_tr && bl_to_br && !bl_to_tr_br_overlaps) },
		{ value: 'bl_to_bl_br', enabled: (bl_to_bl && bl_to_br && !bl_to_bl_br_overlaps) },
		{ value: 'bl_to_tl_bl', enabled: (bl_to_tl && bl_to_bl && !bl_to_tl_bl_overlaps) },
		{ value: 'br_to_tl_tr', enabled: (br_to_tl && br_to_tr && !br_to_tl_tr_overlaps) },
		{ value: 'br_to_tr_br', enabled: (br_to_tr && br_to_br && !br_to_tr_br_overlaps) },
		{ value: 'br_to_bl_br', enabled: (br_to_bl && br_to_br && !br_to_bl_br_overlaps) },
		{ value: 'br_to_tl_bl', enabled: (br_to_tl && br_to_bl && !br_to_tl_bl_overlaps) }
	]);
}

function pathsOverlap(attackingCorner, defendingCorner1, defendingCorner2) {
	var path1_deltaX = defendingCorner1.x - attackingCorner.x;
	var path1_deltaY = defendingCorner1.y - attackingCorner.y;

	var path2_deltaX = defendingCorner2.x - attackingCorner.x;
	var path2_deltaY = defendingCorner2.y - attackingCorner.y;

	if (path1_deltaY == 0 && path2_deltaY == 0) {
		var path1_xDirection = path1_deltaX < 0 ? -1 : 1;
		var path2_xDirection = path2_deltaX < 0 ? -1 : 1;

		return (path1_xDirection == path2_xDirection);
	}
	//vertical lines
	else if (path1_deltaX == 0 && path2_deltaX == 0) {
		var path1_yDirection = path1_deltaY < 0 ? -1 : 1;
		var path2_yDirection = path2_deltaY < 0 ? -1 : 1;

		return (path1_yDirection == path2_yDirection);
	}

	return false;
}

function getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attackingCorner, defendingCorner) {
	var pathBlocked = false;

	var verticalEdges = getVerticalEdges(attackingCorner.x, attackingCorner.y, defendingCorner.x, defendingCorner.y);
	pathBlocked = edgeBlocked(verticalEdges);
	if (pathBlocked) { return false; }

	var horizontalEdges = getHorizontalEdges(attackingCorner.x, attackingCorner.y, defendingCorner.x, defendingCorner.y);
	pathBlocked = edgeBlocked(horizontalEdges);
	if (pathBlocked) { return false; }

	var intersections = getIntersections(attackingCorner.x, attackingCorner.y, defendingCorner.x, defendingCorner.y);
	pathBlocked = intersectionBlocked(intersections, 
		fromTileX, fromTileY, toTileX, toTileY,
		attackingCorner.x, attackingCorner.y, defendingCorner.x, defendingCorner.y);
	if (pathBlocked) { return false; }

	var tiles = getTiles(verticalEdges, horizontalEdges, intersections,
		fromTileX, fromTileY, toTileX, toTileY,
		attackingCorner.x, attackingCorner.y, defendingCorner.x, defendingCorner.y);
	pathBlocked = tileBlocked(tiles);
	if (pathBlocked) { return false; }

	pathBlocked = adjacentTilesBlocked(fromTileX, fromTileY, toTileX, toTileY, attackingCorner.x, attackingCorner.y, defendingCorner.x, defendingCorner.y);
	if (pathBlocked) { return false; }	

	return true;
}

function getVerticalEdges(startX, startY, endX, endY) {
	var deltaX = endX - startX;
	var deltaY = endY - startY;
	var xDirection = deltaX < 0 ? -1 : 1;
	if (deltaX < 0) { deltaX = deltaX * -1; }
	var currentX = startX;
	var step = 0
	var verticalEdges = [];
	if (deltaX == 0) {
		return verticalEdges;
	}
	do {
		currentX += xDirection;
		step++;
		var y = deltaY / deltaX * step + startY;
		if (y % 1 != 0) {
			var yTop = Math.floor(y);
			var yBottom = Math.ceil(y);
			verticalEdges.push([
				{ x: currentX, y: yTop },
				{ x: currentX, y: yBottom }
			]);
		}
	}
	while (currentX != endX);
	return verticalEdges;
}

function getHorizontalEdges(startX, startY, endX, endY) {
	var deltaX = endX - startX;
	var deltaY = endY - startY;
	var yDirection = deltaY < 0 ? -1 : 1;
	if (deltaY < 0) { deltaY = deltaY * -1; }
	var currentY = startY;
	var step = 0
	var horizontalEdges = [];
	if (deltaY == 0) {
		return horizontalEdges;
	}
	do {
		currentY += yDirection;
		step++;
		var x = deltaX / deltaY * step + startX;
		if (x % 1 != 0) {
			var xStart = Math.floor(x);
			var xEnd = Math.ceil(x);
			horizontalEdges.push([
				{ x: xStart, y: currentY },
				{ x: xEnd, y: currentY }
			]);
		}
	}
	while (currentY != endY);
	return horizontalEdges;
}

function getIntersections(startX, startY, endX, endY) {
	var deltaX = endX - startX;
	var deltaY = endY - startY;
	var intersections = [];
	var step = 0
	var xDirection = deltaX < 0 ? -1 : 1;
	var yDirection = deltaY < 0 ? -1 : 1;
	var currentX = startX;
	var currentY = startY;
	if (deltaX == 0) {
		while (currentY != endY) {
			intersections.push({ x: currentX, y: currentY });
			currentY += yDirection;
		}
		var intersectionIndex = intersections.findIndex(function(intersection) {
			return intersection.x == startX && intersection.y == startY;
		})
		if (intersectionIndex < 0) { intersections.push({ x: startX, y: startY }); }
		intersectionIndex = intersections.findIndex(function(intersection) {
			return intersection.x == endX && intersection.y == endY;
		})
		if (intersectionIndex < 0) { intersections.push({ x: endX, y: endY }); }
		return intersections;
	}
	if (deltaY == 0) {
		while (currentX != endX) {
			intersections.push({ x: currentX, y: currentY });
			currentX += xDirection;
		}
		var intersectionIndex = intersections.findIndex(function(intersection) {
			return intersection.x == startX && intersection.y == startY;
		})
		if (intersectionIndex < 0) { intersections.push({ x: startX, y: startY }); }
		intersectionIndex = intersections.findIndex(function(intersection) {
			return intersection.x == endX && intersection.y == endY;
		})
		if (intersectionIndex < 0) { intersections.push({ x: endX, y: endY }); }
		return intersections;	
	}
	if (deltaX < 0) { deltaX = deltaX * -1; }
	do {
		currentX += xDirection;
		step++;
		var y = deltaY / deltaX * step + startY;
		if (y % 1 == 0) {
			intersections.push({ x: currentX, y: y });
		}
	}
	while (currentX != endX);
	var intersectionIndex = intersections.findIndex(function(intersection) {
		return intersection.x == startX && intersection.y == startY;
	})
	if (intersectionIndex < 0) { intersections.push({ x: startX, y: startY }); }
	intersectionIndex = intersections.findIndex(function(intersection) {
		return intersection.x == endX && intersection.y == endY;
	})
	if (intersectionIndex < 0) { intersections.push({ x: endX, y: endY }); }
	return intersections;
}

function getTiles(verticalEdges, horizontalEdges, intersections, 
	fromTileX, fromTileY, toTileX, toTileY, 
	startX, startY, endX, endY) {
	var tiles = [];
	var newTile = {};
	var tileIndex = -1;
	var isAttacker = false;
	var isDefender = false;
	verticalEdges.forEach(function (edge) {
		newTile = { x: edge[0].x - 1, y: edge[0].y };
		isAttacker = newTile.x == fromTileX && newTile.y == fromTileY;
		isDefender = newTile.x == toTileX && newTile.y == toTileY;
		tileIndex = tiles.findIndex(function(tile) {
			return tile.x == newTile.x && tile.y == newTile.y;
		});
		if (tileIndex < 0 && !isAttacker && !isDefender) { tiles.push(newTile); }
		newTile = { x: edge[0].x, y: edge[0].y };
		isAttacker = newTile.x == fromTileX && newTile.y == fromTileY;
		isDefender = newTile.x == toTileX && newTile.y == toTileY;
		tileIndex = tiles.findIndex(function(tile) {
			return tile.x == newTile.x && tile.y == newTile.y;
		});
		if (tileIndex < 0 && !isAttacker && !isDefender) { tiles.push(newTile); }
	});
	horizontalEdges.forEach(function(edge) {
		newTile = { x: edge[0].x, y: edge[0].y - 1 };
		isAttacker = newTile.x == fromTileX && newTile.y == fromTileY;
		isDefender = newTile.x == toTileX && newTile.y == toTileY;
		tileIndex = tiles.findIndex(function(tile) {
			return tile.x == newTile.x && tile.y == newTile.y;
		});
		if (tileIndex < 0 && !isAttacker && !isDefender) { tiles.push(newTile); }
		newTile = { x: edge[0].x, y: edge[0].y };
		isAttacker = newTile.x == fromTileX && newTile.y == fromTileY;
		isDefender = newTile.x == toTileX && newTile.y == toTileY;
		tileIndex = tiles.findIndex(function(tile) {
			return tile.x == newTile.x && tile.y == newTile.y;
		});
		if (tileIndex < 0 && !isAttacker && !isDefender) { tiles.push(newTile); }
	})
	//if line is on a 45 degre angle, add tiles between on each 45
	var deltaX = endX - startX;
	var deltaY = endY - startY;
	var fortyFiveDegreeAngle = Math.abs(deltaX) > 0 && Math.abs(deltaX) == Math.abs(deltaY);
	if (fortyFiveDegreeAngle) {
		var attacker_tl = startX == fromTileX && startY == fromTileY;
		var attacker_tr = startX == fromTileX + 1 && startY == fromTileY;
		var attacker_br = startX == fromTileX + 1 && startY == fromTileY + 1;
		var attacker_bl = startX == fromTileX && startY == fromTileY + 1;
		var defender_tl = endX == toTileX && endY == toTileY;
		var defender_tr = endX == toTileX + 1 && endY == toTileY;
		var defender_br = endX == toTileX + 1 && endY == toTileY + 1;
		var defender_bl = endX == toTileX && endY == toTileY + 1;

		var currentX = startX;
		var currentY = startY;
		var pathLength = Math.abs(deltaX);
		var xDirection = deltaX < 0 ? -1 : 1;
		var yDirection = deltaY < 0 ? -1 : 1;
		var step = 0

		//attacker above and left of defender
		if (deltaX > 0 && deltaY > 0) {
			xModifer = 0;
			yModifer = 0;
			for (var step = 0; step <= pathLength; step ++) {
				if (step == pathLength) { 
					currentX += xDirection;
					currentY += yDirection;
					continue; 
				}
				else if (attacker_tl && step == 0) { 
					currentX += xDirection;
					currentY += yDirection;
					continue; 
				}
				else if (defender_br && step == pathLength - 1) {
					currentX += xDirection;
					currentY += yDirection;
					continue; 
				}
				var newTile = { x: currentX + xModifer, y: currentY + yModifer };
				tileIndex = tiles.findIndex(function(tile) {
					return tile.x == newTile.x && tile.y == newTile.y;
				});
				if (tileIndex < 0) { tiles.push(newTile); }
				currentX += xDirection;
				currentY += yDirection;
			}
		}
		//attacker above and right of defender
		else if (deltaX < 0 && deltaY > 0) {
			xModifer = 0;
			yModifer = -1;
			for (var step = 0; step <= pathLength; step ++) {
				if (step == 0) { 
					currentX += xDirection;
					currentY += yDirection;
					continue; 
				}
				else if (attacker_tr && step == 1) { 
					currentX += xDirection;
					currentY += yDirection;
					continue; 
				}
				else if (defender_bl && step == pathLength) {
					currentX += xDirection;
					currentY += yDirection;
					continue; 
				}
				var newTile = { x: currentX + xModifer, y: currentY + yModifer };
				tileIndex = tiles.findIndex(function(tile) {
					return tile.x == newTile.x && tile.y == newTile.y;
				});
				if (tileIndex < 0) { tiles.push(newTile); }
				currentX += xDirection;
				currentY += yDirection;
			}
		}
		//attacker below and left of defender
		else if (deltaX > 0 && deltaY < 0) {
			xModifer = 0;
			yModifer = -1;
			for (var step = 0; step <= pathLength; step ++) {
				if (step == pathLength) { 
					currentX += xDirection;
					currentY += yDirection;
					continue; 
				}
				else if (attacker_bl && step == 0) { 
					currentX += xDirection;
					currentY += yDirection;
					continue; 
				}
				else if (defender_tr && step == pathLength - 1) {
					currentX += xDirection;
					currentY += yDirection;
					continue; 
				}
				var newTile = { x: currentX + xModifer, y: currentY + yModifer };
				tileIndex = tiles.findIndex(function(tile) {
					return tile.x == newTile.x && tile.y == newTile.y;
				});
				if (tileIndex < 0) { tiles.push(newTile); }
				currentX += xDirection;
				currentY += yDirection;
			}
		}
		//attacker below and right of defender
		else if (deltaX < 0 && deltaY < 0) {
			xModifer = 0;
			yModifer = 0;
			for (var step = 0; step <= pathLength; step ++) {
				if (step == 0) { 
					currentX += xDirection;
					currentY += yDirection;
					continue; 
				}
				else if (attacker_br && step == 1) { 
					currentX += xDirection;
					currentY += yDirection;
					continue; 
				}
				else if (defender_tl && step == pathLength) {
					currentX += xDirection;
					currentY += yDirection;
					continue; 
				}
				var newTile = { x: currentX + xModifer, y: currentY + yModifer };
				tileIndex = tiles.findIndex(function(tile) {
					return tile.x == newTile.x && tile.y == newTile.y;
				});
				if (tileIndex < 0) { tiles.push(newTile); }
				currentX += xDirection;
				currentY += yDirection;
			}
		}
		return tiles;
	}
	return tiles;
}

function edgeBlocked(pathEdges) {
	var pathBlocked = false;

	pathEdges.forEach(function(pathEdge) {
		if (pathBlocked) { return; }
		var edgeIndex = blockingEdges.findIndex(function(blocking_edge) {
			return blocking_edge[0].x == pathEdge[0].x && blocking_edge[0].y == pathEdge[0].y &&
				blocking_edge[1].x == pathEdge[1].x && blocking_edge[1].y == pathEdge[1].y;
		});
		pathBlocked = edgeIndex > -1;
	});
	
	if (pathBlocked) { return true; }

	pathEdges.forEach(function(pathEdge) {
		if (pathBlocked) { return; }
		var edgeIndex = walls.findIndex(function(wall) {
			return wall[0].x == pathEdge[0].x && wall[0].y == pathEdge[0].y &&
				wall[1].x == pathEdge[1].x && wall[1].y == pathEdge[1].y;
		});
		pathBlocked = edgeIndex > -1;
	});

	return pathBlocked;
}

function tileBlocked(pathTiles) {
	var pathBlocked = false;

	pathTiles.forEach(function(pathTile) {
		if (pathBlocked) { return; }
		var tileIndex = blockers.findIndex(function(blocker) {
			return blocker.x == pathTile.x && blocker.y == pathTile.y;
		})
		pathBlocked = tileIndex > -1;
	})
	
	if (pathBlocked) { return true; }

	pathTiles.forEach(function(pathTile) {
		if (pathBlocked) { return; }
		var tileIndex = blockingTiles.findIndex(function(blocking_tile) {
			return blocking_tile.x == pathTile.x && blocking_tile.y == pathTile.y;
		})
		pathBlocked = tileIndex > -1;
	})
	
	if (pathBlocked) { return true; }

	pathTiles.forEach(function(pathTile) {
		if (pathBlocked) { return; }
		var tileIndex = offMapTiles.findIndex(function(off_map_tile) {
			return off_map_tile.x == pathTile.x && off_map_tile.y == pathTile.y;
		})
		pathBlocked = tileIndex > -1;
	})

	return pathBlocked;
}

function intersectionBlocked(pathIntersections, fromTileX, fromTileY, toTileX, toTileY, startX, startY, endX, endY) {
	var intersections = [];

	pathIntersections.forEach(function(pIntersection) {
		var blockingIntersection = blockingIntersections.find(function(bIntersection) {
			return bIntersection.x == pIntersection.x && bIntersection.y == pIntersection.y;
		});
		if (blockingIntersection) { intersections.push(blockingIntersection); }
	});
	//no blocking intersections aligned with path intersections
	if (intersections.length == 0) { return false; }

	var pathBlocked = false;
	intersections.forEach(function(intersection) {
		if (pathBlocked) { return; }
		pathBlocked = intersectionBlocksPath(intersection, fromTileX, fromTileY, toTileX, toTileY, startX, startY, endX, endY);
	});
	return pathBlocked;
}

function intersectionBlocksPath(blockingIntersection, fromTileX, fromTileY, toTileX, toTileY, startX, startY, endX, endY) {
	var deltaX = endX - startX;
	var deltaY = endY - startY;
	var attackingTileLeftOfIntersection = fromTileX < blockingIntersection.x;
	var attackingTileRightOfIntersection = !attackingTileLeftOfIntersection;
	var attackingTileAbovefIntersection = fromTileY < blockingIntersection.y;
	var attackingTileBelowIntersection = !attackingTileAbovefIntersection;
	var defendingTileLeftOfIntersection = toTileX < blockingIntersection.x;
	var defendingTileRightOfIntersection = !defendingTileLeftOfIntersection;
	var defendingTileAboveIntersection = toTileY < blockingIntersection.y;
	var defendingTileBelowIntersection = !defendingTileAboveIntersection;

	var topConnection = blockingIntersection.connections.findIndex(function(connection) {
		return connection.x == blockingIntersection.x && connection.y == blockingIntersection.y - 1;
	}) > -1;
	var rightConnection = blockingIntersection.connections.findIndex(function(connection) {
		return connection.x == blockingIntersection.x + 1 && connection.y == blockingIntersection.y;
	}) > -1;
	var leftConnection = blockingIntersection.connections.findIndex(function(connection) {
		return connection.x == blockingIntersection.x - 1 && connection.y == blockingIntersection.y;
	}) > -1;
	var bottomConnection = blockingIntersection.connections.findIndex(function(connection) {
		return connection.x == blockingIntersection.x && connection.y == blockingIntersection.y + 1;
	}) > -1;

	var pathBlocked = false;

	//attack across intersection
	if (blockingIntersection.x == startX && blockingIntersection.y == startY &&
		blockingIntersection.x == endX && blockingIntersection.y == endY) {
		if (attackingTileLeftOfIntersection && attackingTileAbovefIntersection) {
			if (defendingTileRightOfIntersection && defendingTileAboveIntersection) {
				pathBlocked = (topConnection && leftConnection) ||
					(topConnection && rightConnection) ||
					(topConnection && bottomConnection);
			} else if (defendingTileRightOfIntersection && defendingTileBelowIntersection) {
				pathBlocked = (topConnection && leftConnection) ||
					(topConnection && bottomConnection) ||
					(bottomConnection && rightConnection) ||
					(leftConnection && rightConnection);
			} else if (defendingTileLeftOfIntersection && defendingTileBelowIntersection) {
				pathBlocked = (topConnection && leftConnection) ||
					(leftConnection && bottomConnection) ||
					(leftConnection && rightConnection);
			}
		} else if (attackingTileRightOfIntersection && attackingTileAbovefIntersection) {
			if (defendingTileLeftOfIntersection && defendingTileAboveIntersection) {
				pathBlocked = (topConnection && leftConnection) ||
					(topConnection && rightConnection) ||
					(topConnection && bottomConnection);
			} else if (defendingTileRightOfIntersection && defendingTileBelowIntersection) {
				pathBlocked = (topConnection && rightConnection) ||
					(bottomConnection && rightConnection) ||
					(leftConnection && rightConnection);
			} else if (defendingTileLeftOfIntersection && defendingTileBelowIntersection) {
				pathBlocked = (topConnection && rightConnection) ||
					(leftConnection && bottomConnection) ||
					(topConnection && bottomConnection) ||
					(leftConnection && rightConnection);
			}
		} else if (attackingTileRightOfIntersection && attackingTileBelowIntersection) {
			if (defendingTileLeftOfIntersection && defendingTileAboveIntersection) {
				pathBlocked = (leftConnection && topConnection) ||
					(bottomConnection && rightConnection) ||
					(topConnection && bottomConnection) ||
					(leftConnection && rightConnection);
			} else if (defendingTileRightOfIntersection && defendingTileAboveIntersection) {
				pathBlocked = (bottomConnection && rightConnection) ||
					(topConnection && rightConnection) ||
					(leftConnection && rightConnection);
			} else if (defendingTileLeftOfIntersection && defendingTileBelowIntersection) {
				pathBlocked = (leftConnection && bottomConnection) ||
					(topConnection && bottomConnection) ||
					(bottomConnection && rightConnection);
			}
		} else if (attackingTileLeftOfIntersection && attackingTileBelowIntersection) {
			if (defendingTileLeftOfIntersection && defendingTileAboveIntersection) {
				pathBlocked = (leftConnection && topConnection) ||
					(leftConnection && rightConnection) ||
					(leftConnection && bottomConnection);
			} else if (defendingTileRightOfIntersection && defendingTileAboveIntersection) {
				pathBlocked = (leftConnection && bottomConnection) ||
					(topConnection && rightConnection) ||
					(leftConnection && rightConnection) ||
					(topConnection && bottomConnection);
			} else if (defendingTileRightOfIntersection && defendingTileBelowIntersection) {
				pathBlocked = (leftConnection && bottomConnection) ||
					(bottomConnection && rightConnection) ||
					(topConnection && bottomConnection);
			}
		}
	}
	//lines which end on intersections
	else if (blockingIntersection.x == endX && blockingIntersection.y == endY) {
		if (defendingTileLeftOfIntersection && defendingTileAboveIntersection) {
			//attack from top left
			if (deltaX > 0 && deltaY > 0) { return false; }
			//attack from top right
			else if (deltaX < 0 && deltaY > 0) {
				pathBlocked = (leftConnection && topConnection) ||
					(topConnection && rightConnection) ||
					(topConnection && bottomConnection);
			}
			//attack from bot right
			else if (deltaX < 0 && deltaY < 0) {
				pathBlocked = (leftConnection && topConnection) ||
					(bottomConnection && rightConnection) ||
					(topConnection && bottomConnection) ||
					(leftConnection && rightConnection);
			}
			//attack from bot left
			else if (deltaX > 0 && deltaY < 0) {
				pathBlocked = (leftConnection && topConnection) ||
					(leftConnection && bottomConnection) ||
					(leftConnection && rightConnection);
			}
			//attack from left
			else if (deltaX > 0) { return false; }
			//attack from right
			else if (deltaX < 0) {
				pathBlocked = (leftConnection && topConnection) ||
					(topConnection && bottomConnection);
			}
			//attack from top
			else if (deltaY > 0) { return false; }
			//attack from bot
			else if (deltaY < 0) {
				pathBlocked = (leftConnection && topConnection) ||
					(leftConnection && rightConnection);
			}
		} else if (defendingTileRightOfIntersection && defendingTileAboveIntersection) {
			//attack from top left
			if (deltaX > 0 && deltaY > 0) {
				pathBlocked = (leftConnection && topConnection) ||
					(topConnection && rightConnection) ||
					(topConnection && bottomConnection);
			}
			//attack from top right
			else if (deltaX < 0 && deltaY > 0) { return false; }
			//attack from bot right
			else if (deltaX < 0 && deltaY < 0) {
				pathBlocked = (topConnection && rightConnection) ||
					(bottomConnection && rightConnection) ||
					(leftConnection && rightConnection);
			}
			//attack from bot left
			else if (deltaX > 0 && deltaY < 0) {
				pathBlocked = (topConnection && rightConnection) ||
					(leftConnection && bottomConnection) ||
					(topConnection && bottomConnection) ||
					(leftConnection && rightConnection);
			}
			//attack from left
			else if (deltaX > 0) { 
				pathBlocked = (topConnection && rightConnection) ||
					(topConnection && bottomConnection);
			}
			//attack from right
			else if (deltaX < 0) { return false; }
			//attack from top
			else if (deltaY > 0) { return false; }
			//attack from bot
			else if (deltaY < 0) {
				pathBlocked = (topConnection && rightConnection) ||
					(leftConnection && rightConnection);
			}
		} else if (defendingTileRightOfIntersection && defendingTileBelowIntersection) {
			//attack from top left
			if (deltaX > 0 && deltaY > 0) {
				pathBlocked = (leftConnection && topConnection) ||
					(bottomConnection && rightConnection) ||
					(leftConnection && rightConnection) ||
					(topConnection && bottomConnection);
			}
			//attack from top right
			else if (deltaX < 0 && deltaY > 0) {
				pathBlocked = (topConnection && rightConnection) ||
					(bottomConnection && rightConnection) ||
					(leftConnection && rightConnection);
			}
			//attack from bot right
			else if (deltaX < 0 && deltaY < 0) { return false; }
			//attack from bot left
			else if (deltaX > 0 && deltaY < 0) {
				pathBlocked = (leftConnection && bottomConnection) ||
					(bottomConnection && rightConnection) ||
					(topConnection && bottomConnection);
			}
			//attack from left
			else if (deltaX > 0) { 
				pathBlocked = (bottomConnection && rightConnection) ||
					(topConnection && bottomConnection);
			}
			//attack from right
			else if (deltaX < 0) { return false; }
			//attack from top
			else if (deltaY > 0) {
				pathBlocked = (bottomConnection && rightConnection) ||
					(leftConnection && rightConnection);
			}
			//attack from bot
			else if (deltaY < 0) { return false; }
		} else if (defendingTileLeftOfIntersection && defendingTileBelowIntersection) {
			//attack from top left
			if (deltaX > 0 && deltaY > 0) {
				pathBlocked = (leftConnection && topConnection) ||
					(leftConnection && bottomConnection) ||
					(leftConnection && rightConnection);
			}
			//attack from top right
			else if (deltaX < 0 && deltaY > 0) {
				pathBlocked = (leftConnection && bottomConnection) ||
					(topConnection && rightConnection) ||
					(leftConnection && rightConnection) ||
					(topConnection && bottomConnection);
			}
			//attack from bot right
			else if (deltaX < 0 && deltaY < 0) {
				pathBlocked = (leftConnection && bottomConnection) ||
					(bottomConnection && rightConnection) ||
					(topConnection && bottomConnection);
			}
			//attack from bot left
			else if (deltaX > 0 && deltaY < 0) { return false; }
			//attack from left
			else if (deltaX > 0) { return false; }
			//attack from right
			else if (deltaX < 0) {
				pathBlocked = (leftConnection && bottomConnection) ||
					(topConnection && bottomConnection);
			}
			//attack from top
			else if (deltaY > 0) {
				pathBlocked = (leftConnection && bottomConnection) ||
					(leftConnection && rightConnection);
			}
			//attack from bot
			else if (deltaY < 0) { return false; }
		}
	}
	//lines which start on intersections
	else if (blockingIntersection.x == startX && blockingIntersection.y == startY) {
		if (attackingTileLeftOfIntersection && attackingTileAbovefIntersection) {
			//attacking down and right
			if (deltaX > 0 && deltaY > 0) {
				pathBlocked = (topConnection && leftConnection) ||
					(bottomConnection && rightConnection) ||
					(topConnection && bottomConnection) ||
					(leftConnection && rightConnection);
			}
			//attacking down and left
			else if (deltaX < 0 && deltaY > 0) {
				pathBlocked = (leftConnection && bottomConnection) ||
					(leftConnection && topConnection) ||
					(leftConnection && rightConnection);
			}
			//attacking up and left
			else if (deltaX < 0 && deltaY < 0) { return false; }
			//attacking up and right
			else if (deltaX > 0 && deltaY < 0) {
				pathBlocked = (leftConnection && topConnection) ||
					(topConnection && rightConnection) ||
					(topConnection && bottomConnection);
			}
			//attacking right
			else if (deltaX > 0) {
				pathBlocked = (leftConnection && topConnection) ||
					(topConnection && bottomConnection);
			}
			//attacking left
			else if (deltaX < 0) { return false; }
			//attacking down
			else if (deltaY > 0) {
				pathBlocked = (leftConnection && topConnection) ||
					(leftConnection && rightConnection);}
			//attacking up
			else if (deltaY < 0) { return false; }
		}
		else if (attackingTileRightOfIntersection && attackingTileAbovefIntersection) {
			//attacking down and right
			if (deltaX > 0 && deltaY > 0) {
				pathBlocked = (topConnection && rightConnection) ||
					(bottomConnection && rightConnection) ||
					(leftConnection && rightConnection);
			}
			//attacking down and left
			else if (deltaX < 0 && deltaY > 0) {
				pathBlocked = (leftConnection && bottomConnection) ||
					(topConnection && rightConnection) ||
					(topConnection && bottomConnection) ||
					(leftConnection && rightConnection);
			}
			//attacking up and left
			else if (deltaX < 0 && deltaY < 0) {
				pathBlocked = (topConnection && rightConnection) ||
					(leftConnection && topConnection) ||
					(topConnection && bottomConnection);
			}
			//attacking up and right
			else if (deltaX > 0 && deltaY < 0) { return false; }
			//attacking right
			else if (deltaX > 0) { return false; }
			//attacking left
			else if (deltaX < 0) {
				pathBlocked = (topConnection && rightConnection) ||
					(topConnection && bottomConnection);
			}
			//attacking down
			else if (deltaY > 0) {
				pathBlocked = (topConnection && rightConnection) ||
					(leftConnection && rightConnection);
			}
			//attacking up
			else if (deltaY < 0) { return false; }
		}
		else if (attackingTileRightOfIntersection && attackingTileBelowIntersection) {
			//attacking down and right
			if (deltaX > 0 && deltaY > 0) { return false; }
			//attacking down and left
			else if (deltaX < 0 && deltaY > 0) {
				pathBlocked = (leftConnection && bottomConnection) ||
					(bottomConnection && rightConnection) ||
					(topConnection && bottomConnection);
			}
			//attacking up and left
			else if (deltaX < 0 && deltaY < 0) {
				pathBlocked = (leftConnection && topConnection) ||
					(bottomConnection && rightConnection) ||
					(topConnection && bottomConnection) ||
					(leftConnection && rightConnection);
			}
			//attacking up and right
			else if (deltaX > 0 && deltaY < 0) {
				pathBlocked = (bottomConnection && rightConnection) ||
					(topConnection && rightConnection) ||
					(leftConnection && rightConnection);
			}
			//attacking right
			else if (deltaX > 0) { return false; }
			//attacking left
			else if (deltaX < 0) {
				pathBlocked = (bottomConnection && rightConnection) ||
					(topConnection && bottomConnection);
			}
			//attacking down
			else if (deltaY > 0) { return false; }
			//attacking up
			else if (deltaY < 0) {
				pathBlocked = (bottomConnection && rightConnection) ||
					(leftConnection && rightConnection);
			}
		}
		else if (attackingTileLeftOfIntersection && attackingTileBelowIntersection) {
			//attacking down and right
			if (deltaX > 0 && deltaY > 0) {
				pathBlocked = (leftConnection && bottomConnection) ||
					(bottomConnection && rightConnection) ||
					(topConnection && bottomConnection);
			}
			//attacking down and left
			else if (deltaX < 0 && deltaY > 0) { return false; }
			//attacking up and left
			else if (deltaX < 0 && deltaY < 0) {
				pathBlocked = (leftConnection && bottomConnection) ||
					(leftConnection && topConnection) ||
					(leftConnection && rightConnection);
			}
			//attacking up and right
			else if (deltaX > 0 && deltaY < 0) {
				pathBlocked = (leftConnection && bottomConnection) ||
					(topConnection && rightConnection) ||
					(topConnection && bottomConnection) ||
					(leftConnection && rightConnection);
			}
			//attacking right
			else if (deltaX > 0) {
				pathBlocked = (leftConnection && bottomConnection) ||
					(topConnection && bottomConnection);
			}
			//attacking left
			else if (deltaX < 0) { return false; }
			//attacking down
			else if (deltaY > 0) { return false; }
			//attacking up
			else if (deltaY < 0) {
				pathBlocked = (leftConnection && bottomConnection) ||
					(leftConnection && rightConnection);
			}
		}
	}
	//diagonal lines though intersections
	else {
		//attack from top left
		if (deltaX > 0 && deltaY > 0) {
			pathBlocked = (leftConnection && topConnection) ||
				(bottomConnection && rightConnection) ||
				(topConnection && bottomConnection) ||
				(leftConnection && rightConnection);
		}
		//attack from top right
		else if (deltaX < 0 && deltaY > 0) {
			pathBlocked = (leftConnection && bottomConnection) ||
				(topConnection && rightConnection) ||
				(topConnection && bottomConnection) ||
				(leftConnection && rightConnection);
		}
		//attack from bot right
		else if (deltaX < 0 && deltaY < 0) {
			pathBlocked = (leftConnection && topConnection) ||
				(bottomConnection && rightConnection) ||
				(topConnection && bottomConnection) ||
				(leftConnection && rightConnection);
		}
		//attack from bot left
		else if (deltaX > 0 && deltaY < 0) {
			pathBlocked = (leftConnection && bottomConnection) ||
				(topConnection && rightConnection) ||
				(topConnection && bottomConnection) ||
				(leftConnection && rightConnection);
		}
		//attack from left
		else if (deltaX > 0) {
			pathBlocked = (topConnection && bottomConnection);
		}
		//attack from right
		else if (deltaX < 0) {
			pathBlocked = (topConnection && bottomConnection);
		}
		//attack from top
		else if (deltaY > 0) {
			pathBlocked = (leftConnection && rightConnection);
		}
		//attack from bot
		else if (deltaY < 0) {
			pathBlocked = (leftConnection && rightConnection);
		}
	}

	return pathBlocked;
}

function adjacentTilesBlocked(fromTileX, fromTileY, toTileX, toTileY, startX, startY, endX, endY) {
	//pass vertical lines passing vertical intersections
	var deltaX = endX - startX;
	//pass horizontal lines passing horizontal intersections
	var deltaY = endY - startY;
	//only calculate for vertical or horizontal lines.  All other lines are taken care of by edge tiles.
	if (!((deltaX == 0 && deltaY != 0) || (deltaY == 0 && deltaX != 0))) { return false; }

	var attacker_tl = startX == fromTileX && startY == fromTileY;
	var attacker_tr = startX == fromTileX + 1 && startY == fromTileY;
	var attacker_br = startX == fromTileX + 1 && startY == fromTileY + 1;
	var attacker_bl = startX == fromTileX && startY == fromTileY + 1;
	var defender_tl = endX == toTileX && endY == toTileY;
	var defender_tr = endX == toTileX + 1 && endY == toTileY;
	var defender_br = endX == toTileX + 1 && endY == toTileY + 1;
	var defender_bl = endX == toTileX && endY == toTileY + 1;

	var currentX = startX;
	var currentY = startY;
	var pathLength = 0;
	var xDirection = deltaX < 0 ? -1 : 1;
	var yDirection = deltaY < 0 ? -1 : 1;

	var pathBlocked = false;
	//horizontal lines
	if (deltaY == 0) {
		pathLength = Math.abs(deltaX);
		//attacking left to right
		if (xDirection > 0) {
			for (var step = 0; step < pathLength; step ++) {
				if (pathBlocked) { return true; }
				if (step == 0 && (attacker_tl || attacker_bl)) {
					currentX += xDirection;
					currentY = startY;
					continue;
				}
				else if (step == pathLength - 1 && (defender_tr || defender_br)) {
					currentX += xDirection;
					currentY = startY;
					continue;
				}
				pathBlocked = verticallyAdjacentTilesBlocked({ x: currentX, y: currentY});
				currentX += xDirection;
				currentY = startY;
			}
		}
		//attacking right to left
		else if (xDirection < 0) {
			for (var step = 0; step <= pathLength; step ++) {
				if (pathBlocked) { return true; }
				if (step == 0) {
					currentX += xDirection;
					currentY = startY;
					continue;
				}
				if (step == 1 && (attacker_tr || attacker_br)) {
					currentX += xDirection;
					currentY = startY;
					continue;
				}
				else if (step == pathLength && (defender_tl || defender_bl)) {
					currentX += xDirection;
					currentY = startY;
					continue;
				}
				pathBlocked = verticallyAdjacentTilesBlocked({ x: currentX, y: currentY});
				currentX += xDirection;
				currentY = startY;
			}
		}
	} 
	//vertical lines
	else if (deltaX == 0) {
		pathLength = Math.abs(deltaY);
		//attacking down
		if (yDirection > 0) {
			for (var step = 0; step < pathLength; step ++) {
				if (pathBlocked) { return true; }
				if (step == 0 && (attacker_tl || attacker_tr)) {
					currentX = startX;
					currentY += yDirection;
					continue;
				}
				else if (step == pathLength - 1 && (defender_bl || defender_br)) {
					currentX = startX;
					currentY += yDirection;
					continue;
				}
				pathBlocked = horizontallyAdjacentTilesBlocked({ x: currentX, y: currentY});
				currentX = startX;
				currentY += yDirection;
			}
		}
		//attacking up
		else if (yDirection < 0) {
			for (var step = 0; step <= pathLength; step ++) {
				if (pathBlocked) { return true; }
				if (step == 0) {
					currentX = startX;
					currentY += yDirection;
					continue;
				}
				if (step == 1 && (attacker_bl || attacker_br)) {
					currentX = startX;
					currentY += yDirection;
					continue;
				}
				else if (step == pathLength && (defender_tl || defender_tr)) {
					currentX = startX;
					currentY += yDirection;
					continue;
				}
				pathBlocked = horizontallyAdjacentTilesBlocked({ x: currentX, y: currentY});
				currentX = startX;
				currentY += yDirection;
			}
		}
	}
	return pathBlocked;
}

function verticallyAdjacentTilesBlocked(tile) {
	var tileIndex = offMapTiles.findIndex(function(offMapTile) {
		return offMapTile.x == tile.x && offMapTile.y == tile.y;
	});
	if (tileIndex < 0) {
		tileIndex = blockingTiles.findIndex(function(blockingTile) {
			return blockingTile.x == tile.x && blockingTile.y == tile.y;
		});
	}
	if (tileIndex < 0) {
		tileIndex = blockers.findIndex(function(blocker) {
			return blocker.x == tile.x && blocker.y == tile.y;
		});
	}
	if (tileIndex < 0) { return false; }
	else if (tile.y == 0) { return true; }
	var adjacentTileIndex = offMapTiles.findIndex(function(offMapTile) {
		return offMapTile.x == tile.x && offMapTile.y == tile.y - 1;
	});
	if (adjacentTileIndex < 0) {
		adjacentTileIndex = blockingTiles.findIndex(function(blockingTile) {
			return blockingTile.x == tile.x && blockingTile.y == tile.y - 1;
		});
	}
	if (adjacentTileIndex < 0) {
		adjacentTileIndex = blockers.findIndex(function(blocker) {
			return blocker.x == tile.x && blocker.y == tile.y - 1;
		});
	}
	return adjacentTileIndex != -1;
}

function horizontallyAdjacentTilesBlocked(tile) {
	var tileIndex = offMapTiles.findIndex(function(offMapTile) {
		return offMapTile.x == tile.x && offMapTile.y == tile.y;
	});
	if (tileIndex < 0) {
		tileIndex = blockingTiles.findIndex(function(blockingTile) {
			return blockingTile.x == tile.x && blockingTile.y == tile.y;
		});
	}
	if (tileIndex < 0) {
		tileIndex = blockers.findIndex(function(blocker) {
			return blocker.x == tile.x && blocker.y == tile.y;
		});
	}
	if (tileIndex < 0) { return false; }
	else if (tile.x == 0) { return true; }
	var adjacentTileIndex = offMapTiles.findIndex(function(offMapTile) {
		return offMapTile.x == tile.x - 1 && offMapTile.y == tile.y;
	});
	if (adjacentTileIndex < 0) {
		adjacentTileIndex = blockingTiles.findIndex(function(blockingTile) {
			return blockingTile.x == tile.x - 1 && blockingTile.y == tile.y;
		});
	}
	if (adjacentTileIndex < 0) {
		adjacentTileIndex = blockers.findIndex(function(blocker) {
			return blocker.x == tile.x - 1 && blocker.y == tile.y;
		});
	}
	return adjacentTileIndex != -1;
}

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
		var highlightAttackerLoS = $('#highlightAttackerLoS').is(":checked");
		var highlightDefenderLoS = $('#highlightDefenderLoS').is(":checked");
		calculateLoSTiles(highlightAttackerLoS, highlightDefenderLoS, attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y, map_width, map_height, function () {
			drawBoard(function () {
				calculateLoSFromAttackerToDefender(attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y);
				drawLinesOfSight();
			});
		});
	}
}


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

$(document).on('click', '#rotate_counter_clockwise', function () {
	rotate_counter_clockwise();
});

$(document).on('click', '#rotate_clockwise', function () {
	rotate_clockwise();
});
	
$(document).on('map_loaded', '#map_load', function(event, mapName) {
	loadMap(mapName);
})