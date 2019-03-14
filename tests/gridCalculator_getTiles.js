QUnit.module( "vertical edges" );
QUnit.test("1 vertical edge between tiles", function( assert ) {
	//arrange
	var verticalEdges = [
		[
			{ x: 1, y: 0 },
			{ x: 1, y: 1 }
		]
	];
	var horizontalEdges = [];
	var fromTileX = 0;
	var fromTileY = 0; 
	var toTileX  = 1;
	var toTileY = 0;
	var startX = 0;
	var startY = 0;
	var endX = 2;
	var endY = 1;
	var gridCalculator = GridCalculator();
	var expectedTiles = [];

	//act
	var tiles = gridCalculator.getTiles(verticalEdges, horizontalEdges,
		fromTileX, fromTileY, toTileX, toTileY, startX, startY,
		endX, endY);
	
	//assert
	assert.deepEqual(expectedTiles, tiles, "no tiles" );
});

QUnit.test("2 vertical edges and 1 tile", function( assert ) {
	//arrange
	var verticalEdges = [
		[
			{ x: 1, y: 0 },
			{ x: 1, y: 1 }
		],
		[
			{ x: 2, y: 0 },
			{ x: 2, y: 1 }
		]
	];
	var horizontalEdges = [];
	var fromTileX = 0;
	var fromTileY = 0; 
	var toTileX  = 2;
	var toTileY = 0;
	var startX = 0;
	var startY = 0;
	var endX = 3;
	var endY = 1;
	var gridCalculator = GridCalculator();
	var expectedTiles = [
		{ x: 1, y: 0 }
	];

	//act
	var tiles = gridCalculator.getTiles(verticalEdges, horizontalEdges,
		fromTileX, fromTileY, toTileX, toTileY, startX, startY,
		endX, endY);
	
	//assert
	assert.deepEqual(expectedTiles, tiles, "1 tile" );
});

QUnit.test("many vertical edges and many tiles", function( assert ) {
	//arrange
	var verticalEdges = [
		[
			{ x: 1, y: 3 },
			{ x: 1, y: 4 }
		],
		[
			{ x: 2, y: 2 },
			{ x: 2, y: 3 }
		],
		[
			{ x: 3, y: 1 },
			{ x: 3, y: 2 }
		]
	];
	var horizontalEdges = [];
	var fromTileX = 0;
	var fromTileY = 4; 
	var toTileX  = 4;
	var toTileY = 0;
	var startX = 0;
	var startY = 4;
	var endX = 4;
	var endY = 1;
	var gridCalculator = GridCalculator();
	var expectedTiles = [
		{ x: 0, y: 3 },
		{ x: 1, y: 3 },
		{ x: 1, y: 2 },
		{ x: 2, y: 2 },
		{ x: 2, y: 1 },
		{ x: 3, y: 1 }
	];

	//act
	var tiles = gridCalculator.getTiles(verticalEdges, horizontalEdges,
		fromTileX, fromTileY, toTileX, toTileY, startX, startY,
		endX, endY);
	
	//assert
	assert.deepEqual(expectedTiles, tiles, "many tiles" );
});

QUnit.module( "horizontal edges" );
QUnit.test("1 horizontal edge between tiles", function( assert ) {
	//arrange
	var verticalEdges = [];
	var horizontalEdges = [
		[
			{ x: 0, y: 1 },
			{ x: 1, y: 1 }
		]
	];
	var fromTileX = 0;
	var fromTileY = 0; 
	var toTileX  = 0;
	var toTileY = 1;
	var startX = 0;
	var startY = 0;
	var endX = 1;
	var endY = 2;
	var gridCalculator = GridCalculator();
	var expectedTiles = [];

	//act
	var tiles = gridCalculator.getTiles(verticalEdges, horizontalEdges,
		fromTileX, fromTileY, toTileX, toTileY, startX, startY,
		endX, endY);
	
	//assert
	assert.deepEqual(expectedTiles, tiles, "no tiles" );
});

QUnit.test("2 horizontal edges and 1 tile", function( assert ) {
	//arrange
	var verticalEdges = [];
	var horizontalEdges = [
		[
			{ x: 0, y: 1 },
			{ x: 1, y: 1 }
		],
		[
			{ x: 0, y: 2 },
			{ x: 1, y: 2 }
		]
	];
	var fromTileX = 0;
	var fromTileY = 0; 
	var toTileX  = 0;
	var toTileY = 2;
	var startX = 0;
	var startY = 0;
	var endX = 1;
	var endY = 3;
	var gridCalculator = GridCalculator();
	var expectedTiles = [
		{ x: 0, y: 1 }
	];

	//act
	var tiles = gridCalculator.getTiles(verticalEdges, horizontalEdges,
		fromTileX, fromTileY, toTileX, toTileY, startX, startY,
		endX, endY);
	
	//assert
	assert.deepEqual(expectedTiles, tiles, "1 tile" );
});

QUnit.test("many horizontal edges and many tiles", function( assert ) {
	//arrange
	var verticalEdges = [];
	var horizontalEdges = [
		[
			{ x: 0, y: 1 },
			{ x: 1, y: 1 }
		],
		[
			{ x: 0, y: 2 },
			{ x: 2, y: 2 }
		],
		[
			{ x: 2, y: 3 },
			{ x: 3, y: 3 }
		],
		[
			{ x: 3, y: 4 },
			{ x: 4, y: 4 }
		]
	];
	var fromTileX = 0;
	var fromTileY = 0; 
	var toTileX  = 4;
	var toTileY = 4;
	var startX = 0;
	var startY = 1;
	var endX = 4;
	var endY = 5;
	var gridCalculator = GridCalculator();
	var expectedTiles = [
		{ x: 0, y: 1 },
		{ x: 0, y: 2 },
		{ x: 2, y: 2 },
		{ x: 2, y: 3 },
		{ x: 3, y: 3 },
		{ x: 3, y: 4 },
		{ x: 1, y: 2 },
	];

	//act
	var tiles = gridCalculator.getTiles(verticalEdges, horizontalEdges,
		fromTileX, fromTileY, toTileX, toTileY, startX, startY,
		endX, endY);
	
	//assert
	assert.deepEqual(expectedTiles, tiles, "many tile" );
});

QUnit.module( "45 degrees" );
QUnit.test("down and right 0 tiles", function( assert ) {
	//arrange
	var verticalEdges = [];
	var horizontalEdges = [];
	var fromTileX = 0;
	var fromTileY = 0; 
	var toTileX  = 1;
	var toTileY = 1;
	var startX = 0;
	var startY = 0;
	var endX = 2;
	var endY = 2;
	var gridCalculator = GridCalculator();
	var expectedTiles = [];

	//act
	var tiles = gridCalculator.getTiles(verticalEdges, horizontalEdges,
		fromTileX, fromTileY, toTileX, toTileY, startX, startY,
		endX, endY);
	
	//assert
	assert.deepEqual(expectedTiles, tiles, "many tile" );
});

QUnit.test("down and right many tiles", function( assert ) {
	//arrange
	var verticalEdges = [];
	var horizontalEdges = [];
	var fromTileX = 0;
	var fromTileY = 0; 
	var toTileX  = 4;
	var toTileY = 4;
	var startX = 0;
	var startY = 0;
	var endX = 5;
	var endY = 5;
	var gridCalculator = GridCalculator();
	var expectedTiles = [
		{ x: 1, y: 1 },
		{ x: 2, y: 2 },
		{ x: 3, y: 3 }
	];

	//act
	var tiles = gridCalculator.getTiles(verticalEdges, horizontalEdges,
		fromTileX, fromTileY, toTileX, toTileY, startX, startY,
		endX, endY);
	
	//assert
	assert.deepEqual(expectedTiles, tiles, "many tile" );
});

QUnit.test("down and left 0 tiles", function( assert ) {
	//arrange
	var verticalEdges = [];
	var horizontalEdges = [];
	var fromTileX = 1;
	var fromTileY = 0; 
	var toTileX  = 0;
	var toTileY = 1;
	var startX = 2;
	var startY = 0;
	var endX = 0;
	var endY = 2;
	var gridCalculator = GridCalculator();
	var expectedTiles = [];

	//act
	var tiles = gridCalculator.getTiles(verticalEdges, horizontalEdges,
		fromTileX, fromTileY, toTileX, toTileY, startX, startY,
		endX, endY);
	
	//assert
	assert.deepEqual(expectedTiles, tiles, "many tile" );
});

QUnit.test("down and left many tiles", function( assert ) {
	//arrange
	var verticalEdges = [];
	var horizontalEdges = [];
	var fromTileX = 4;
	var fromTileY = 0; 
	var toTileX  = 0;
	var toTileY = 4;
	var startX = 5;
	var startY = 0;
	var endX = 0;
	var endY = 5;
	var gridCalculator = GridCalculator();
	var expectedTiles = [
		{ x: 3, y: 1 },
		{ x: 2, y: 2 },
		{ x: 1, y: 3 }
	];

	//act
	var tiles = gridCalculator.getTiles(verticalEdges, horizontalEdges,
		fromTileX, fromTileY, toTileX, toTileY, startX, startY,
		endX, endY);
	
	//assert
	assert.deepEqual(expectedTiles, tiles, "many tile" );
});

QUnit.test("up and left 0 tiles", function( assert ) {
	//arrange
	var verticalEdges = [];
	var horizontalEdges = [];
	var fromTileX = 1;
	var fromTileY = 1; 
	var toTileX  = 0;
	var toTileY = 0;
	var startX = 2;
	var startY = 2;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedTiles = [];

	//act
	var tiles = gridCalculator.getTiles(verticalEdges, horizontalEdges,
		fromTileX, fromTileY, toTileX, toTileY, startX, startY,
		endX, endY);
	
	//assert
	assert.deepEqual(expectedTiles, tiles, "many tile" );
});

QUnit.test("up and left many tiles", function( assert ) {
	//arrange
	var verticalEdges = [];
	var horizontalEdges = [];
	var fromTileX = 4;
	var fromTileY = 4; 
	var toTileX  = 0;
	var toTileY = 0;
	var startX = 5;
	var startY = 5;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedTiles = [
		{ x: 3, y: 3 },
		{ x: 2, y: 2 },
		{ x: 1, y: 1 }
	];

	//act
	var tiles = gridCalculator.getTiles(verticalEdges, horizontalEdges,
		fromTileX, fromTileY, toTileX, toTileY, startX, startY,
		endX, endY);
	
	//assert
	assert.deepEqual(expectedTiles, tiles, "many tile" );
});


QUnit.test("up and right 0 tiles", function( assert ) {
	//arrange
	var verticalEdges = [];
	var horizontalEdges = [];
	var fromTileX = 0;
	var fromTileY = 1; 
	var toTileX  = 1;
	var toTileY = 0;
	var startX = 2;
	var startY = 1;
	var endX = 0;
	var endY = 2;
	var gridCalculator = GridCalculator();
	var expectedTiles = [];

	//act
	var tiles = gridCalculator.getTiles(verticalEdges, horizontalEdges,
		fromTileX, fromTileY, toTileX, toTileY, startX, startY,
		endX, endY);
	
	//assert
	assert.deepEqual(expectedTiles, tiles, "many tile" );
});

QUnit.test("up and right many tiles", function( assert ) {
	//arrange
	var verticalEdges = [];
	var horizontalEdges = [];
	var fromTileX = 0;
	var fromTileY = 4; 
	var toTileX  = 4;
	var toTileY = 0;
	var startX = 0;
	var startY = 5;
	var endX = 5;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedTiles = [
		{ x: 1, y: 3 },
		{ x: 2, y: 2 },
		{ x: 3, y: 1 }
	];

	//act
	var tiles = gridCalculator.getTiles(verticalEdges, horizontalEdges,
		fromTileX, fromTileY, toTileX, toTileY, startX, startY,
		endX, endY);
	
	//assert
	assert.deepEqual(expectedTiles, tiles, "many tile" );
});