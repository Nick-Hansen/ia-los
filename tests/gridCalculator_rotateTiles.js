QUnit.module( "rotate tile counterclockwise" );
QUnit.test("tile -1, -1, previousMapWidth 2", function( assert ) {
	//arrange
	var tile = { x: -1, y: -1 };
	var previousMapWidth = 2;
	var gridCalculator = GridCalculator();

	//act
	tile = gridCalculator.rotateTileCounterClockwise(tile.x, tile.y, previousMapWidth);
	
	//assert
	assert.equal(tile.x, -1, "tile.x unchanged" );
	assert.equal(tile.y, -1, "tile.y unchanged" );
});

QUnit.test("tile 0, 0, previousMapWidth 2", function( assert ) {
	//arrange
	var tile = { x: 0, y: 0 };
	var previousMapWidth = 2;
	var gridCalculator = GridCalculator();

	//act
	tile = gridCalculator.rotateTileCounterClockwise(tile.x, tile.y, previousMapWidth);
	
	//assert
	assert.equal(tile.x, 0, "tile.x rotated" );
	assert.equal(tile.y, 1, "tile.y rotated" );
});

QUnit.test("tile 1, 0, previousMapWidth 2", function( assert ) {
	//arrange
	var tile = { x: 1, y: 0 };
	var previousMapWidth = 2;
	var gridCalculator = GridCalculator();

	//act
	tile = gridCalculator.rotateTileCounterClockwise(tile.x, tile.y, previousMapWidth);
	
	//assert
	assert.equal(tile.x, 0, "tile.x rotated" );
	assert.equal(tile.y, 0, "tile.y rotated" );
});

QUnit.test("tile 0, 1, previousMapWidth 2", function( assert ) {
	//arrange
	var tile = { x: 0, y: 1 };
	var previousMapWidth = 2;
	var gridCalculator = GridCalculator();

	//act
	tile = gridCalculator.rotateTileCounterClockwise(tile.x, tile.y, previousMapWidth);
	
	//assert
	assert.equal(tile.x, 1, "tile.x rotated" );
	assert.equal(tile.y, 1, "tile.y rotated" );
});

QUnit.test("tile 1, 1, previousMapWidth 5", function( assert ) {
	//arrange
	var tile = { x: 1, y: 1 };
	var previousMapWidth = 5;
	var gridCalculator = GridCalculator();

	//act
	tile = gridCalculator.rotateTileCounterClockwise(tile.x, tile.y, previousMapWidth);
	
	//assert
	assert.equal(tile.x, 1, "tile.x rotated" );
	assert.equal(tile.y, 3, "tile.y rotated" );
});

QUnit.test("tile 3, 2, previousMapWidth 5", function( assert ) {
	//arrange
	var tile = { x: 3, y: 2 };
	var previousMapWidth = 5;
	var gridCalculator = GridCalculator();

	//act
	tile = gridCalculator.rotateTileCounterClockwise(tile.x, tile.y, previousMapWidth);
	
	//assert
	assert.equal(tile.x, 2, "tile.x rotated" );
	assert.equal(tile.y, 1, "tile.y rotated" );
});

QUnit.module( "rotate tile clockwise" );
QUnit.test("tile -1, -1, previousMapHeight 2", function( assert ) {
	//arrange
	var tile = { x: -1, y: -1 };
	var previousMapHeight = 2;
	var gridCalculator = GridCalculator();

	//act
	tile = gridCalculator.rotateTileClockwise(tile.x, tile.y, previousMapHeight);
	
	//assert
	assert.equal(tile.x, -1, "tile.x unchanged" );
	assert.equal(tile.y, -1, "tile.y unchanged" );
});

QUnit.test("tile 0, 0, previousMapHeight 2", function( assert ) {
	//arrange
	var tile = { x: 0, y: 0 };
	var previousMapHeight = 2;
	var gridCalculator = GridCalculator();

	//act
	tile = gridCalculator.rotateTileClockwise(tile.x, tile.y, previousMapHeight);
	
	//assert
	assert.equal(tile.x, 1, "tile.x rotated" );
	assert.equal(tile.y, 0, "tile.y rotated" );
});

QUnit.test("tile 1, 0, previousMapHeight 2", function( assert ) {
	//arrange
	var tile = { x: 1, y: 0 };
	var previousMapHeight = 2;
	var gridCalculator = GridCalculator();

	//act
	tile = gridCalculator.rotateTileClockwise(tile.x, tile.y, previousMapHeight);
	
	//assert
	assert.equal(tile.x, 1, "tile.x rotated" );
	assert.equal(tile.y, 1, "tile.y rotated" );
});

QUnit.test("tile 0, 1, previousMapHeight 2", function( assert ) {
	//arrange
	var tile = { x: 0, y: 1 };
	var previousMapHeight = 2;
	var gridCalculator = GridCalculator();

	//act
	tile = gridCalculator.rotateTileClockwise(tile.x, tile.y, previousMapHeight);
	
	//assert
	assert.equal(tile.x, 0, "tile.x rotated" );
	assert.equal(tile.y, 0, "tile.y rotated" );
});

QUnit.test("tile 1, 1, previousMapHeight 2", function( assert ) {
	//arrange
	var tile = { x: 1, y: 1 };
	var previousMapHeight = 2;
	var gridCalculator = GridCalculator();

	//act
	tile = gridCalculator.rotateTileClockwise(tile.x, tile.y, previousMapHeight);
	
	//assert
	assert.equal(tile.x, 0, "tile.x rotated" );
	assert.equal(tile.y, 1, "tile.y rotated" );
});

QUnit.test("tile 1, 1, previousMapHeight 4", function( assert ) {
	//arrange
	var tile = { x: 1, y: 1 };
	var previousMapHeight = 4;
	var gridCalculator = GridCalculator();

	//act
	tile = gridCalculator.rotateTileClockwise(tile.x, tile.y, previousMapHeight);
	
	//assert
	assert.equal(tile.x, 2, "tile.x rotated" );
	assert.equal(tile.y, 1, "tile.y rotated" );
});

QUnit.test("tile 3, 2, previousMapHeight 4", function( assert ) {
	//arrange
	var tile = { x: 3, y: 2 };
	var previousMapHeight = 4;
	var gridCalculator = GridCalculator();

	//act
	tile = gridCalculator.rotateTileClockwise(tile.x, tile.y, previousMapHeight);
	
	//assert
	assert.equal(tile.x, 1, "tile.x rotated" );
	assert.equal(tile.y, 3, "tile.y rotated" );
});