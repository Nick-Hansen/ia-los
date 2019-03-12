
QUnit.module( "rotate point counterclockwise" );
QUnit.test("point 1, 1, previousMapWidth 2", function( assert ) {
	//arrange
	var point = { x: 1, y: 1 };
	var previousMapWidth = 2;
	var gridCalculator = GridCalculator();

	//act
	point = gridCalculator.rotatePointCounterClockwise(point, previousMapWidth);
	
	//assert
	assert.equal(point.x, 1, "point.x unchanged" );
	assert.equal(point.y, 1, "point.y unchanged" );
});

QUnit.test("point 1, 1, previousMapWidth 3", function( assert ) {
	//arrange
	var point = { x: 1, y: 1 };
	var previousMapWidth = 3;
	var gridCalculator = GridCalculator();

	//act
	point = gridCalculator.rotatePointCounterClockwise(point, previousMapWidth);
	
	//assert
	assert.equal(point.x, 1, "point.x rotated" );
	assert.equal(point.y, 2, "point.y rotated" );
});

QUnit.test("point 2, 1, previousMapWidth 3", function( assert ) {
	//arrange
	var point = { x: 2, y: 1 };
	var previousMapWidth = 3;
	var gridCalculator = GridCalculator();

	//act
	point = gridCalculator.rotatePointCounterClockwise(point, previousMapWidth);
	
	//assert
	assert.equal(point.x, 1, "point.x rotated" );
	assert.equal(point.y, 1, "point.y rotated" );
});

QUnit.test("point 2, 2, previousMapWidth 3", function( assert ) {
	//arrange
	var point = { x: 2, y: 2 };
	var previousMapWidth = 3;
	var gridCalculator = GridCalculator();

	//act
	point = gridCalculator.rotatePointCounterClockwise(point, previousMapWidth);
	
	//assert
	assert.equal(point.x, 2, "point.x rotated" );
	assert.equal(point.y, 1, "point.y rotated" );
});

QUnit.test("point 1, 2, previousMapWidth 3", function( assert ) {
	//arrange
	var point = { x: 1, y: 2 };
	var previousMapWidth = 3;
	var gridCalculator = GridCalculator();

	//act
	point = gridCalculator.rotatePointCounterClockwise(point, previousMapWidth);
	
	//assert
	assert.equal(point.x, 2, "point.x rotated" );
	assert.equal(point.y, 2, "point.y rotated" );
});

QUnit.test("point 3, 2, previousMapWidth 4", function( assert ) {
	//arrange
	var point = { x: 3, y: 2 };
	var previousMapWidth = 4;
	var gridCalculator = GridCalculator();

	//act
	point = gridCalculator.rotatePointCounterClockwise(point, previousMapWidth);
	
	//assert
	assert.equal(point.x, 2, "point.x rotated" );
	assert.equal(point.y, 1, "point.y rotated" );
});

QUnit.module( "rotate point clockwise" );
QUnit.test("point 1, 1, previousMapHeight 2", function( assert ) {
	//arrange
	var point = { x: 1, y: 1 };
	var previousMapHeight = 2;
	var gridCalculator = GridCalculator();

	//act
	point = gridCalculator.rotatePointClockwise(point, previousMapHeight);
	
	//assert
	assert.equal(point.x, 1, "point.x unchanged" );
	assert.equal(point.y, 1, "point.y unchanged" );
});
QUnit.test("point 1, 1, previousMapHeight 3", function( assert ) {
	//arrange
	var point = { x: 1, y: 1 };
	var previousMapHeight = 3;
	var gridCalculator = GridCalculator();

	//act
	point = gridCalculator.rotatePointClockwise(point, previousMapHeight);
	
	//assert
	assert.equal(point.x, 2, "point.x rotated" );
	assert.equal(point.y, 1, "point.y rotated" );
});

QUnit.test("point 2, 1, previousMapHeight 3", function( assert ) {
	//arrange
	var point = { x: 2, y: 1 };
	var previousMapHeight = 3;
	var gridCalculator = GridCalculator();

	//act
	point = gridCalculator.rotatePointClockwise(point, previousMapHeight);
	
	//assert
	assert.equal(point.x, 2, "point.x rotated" );
	assert.equal(point.y, 2, "point.y rotated" );
});

QUnit.test("point 2, 2, previousMapHeight 3", function( assert ) {
	//arrange
	var point = { x: 2, y: 2 };
	var previousMapHeight = 3;
	var gridCalculator = GridCalculator();

	//act
	point = gridCalculator.rotatePointClockwise(point, previousMapHeight);
	
	//assert
	assert.equal(point.x, 1, "point.x rotated" );
	assert.equal(point.y, 2, "point.y rotated" );
});

QUnit.test("point 1, 2, previousMapHeight 3", function( assert ) {
	//arrange
	var point = { x: 1, y: 2 };
	var previousMapHeight = 3;
	var gridCalculator = GridCalculator();

	//act
	point = gridCalculator.rotatePointClockwise(point, previousMapHeight);
	
	//assert
	assert.equal(point.x, 1, "point.x rotated" );
	assert.equal(point.y, 1, "point.y rotated" );
});

QUnit.test("point 3, 2, previousMapHeight 4", function( assert ) {
	//arrange
	var point = { x: 3, y: 2 };
	var previousMapHeight = 4;
	var gridCalculator = GridCalculator();

	//act
	point = gridCalculator.rotatePointClockwise(point, previousMapHeight);
	
	//assert
	assert.equal(point.x, 2, "point.x rotated" );
	assert.equal(point.y, 3, "point.y rotated" );
});