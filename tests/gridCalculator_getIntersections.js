QUnit.module( "no movement" );
QUnit.test("(0, 0) > (0, 0) starting intersection", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 0, y: 0 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});

QUnit.module( "direction up" );
QUnit.test("(0, 1) > (0, 0) intersections", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 1;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 0, y: 1 },
		{ x: 0, y: 0 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});

QUnit.test("(0, 4) > (0, 0) intersections", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 4;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 0, y: 4 },
		{ x: 0, y: 3 },
		{ x: 0, y: 2 },
		{ x: 0, y: 1 },
		{ x: 0, y: 0 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});

QUnit.module( "direction down" );
QUnit.test("(0, 0) > (0, 1) intersections", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 0;
	var endY = 1;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 0, y: 0 },
		{ x: 0, y: 1 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});

QUnit.test("(0, 0) > (0, 4) intersections", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 0;
	var endY = 4;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 0, y: 0 },
		{ x: 0, y: 1 },
		{ x: 0, y: 2 },
		{ x: 0, y: 3 },
		{ x: 0, y: 4 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});

QUnit.module( "direction right" );
QUnit.test("(0, 0) > (1, 0) intersections", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 1;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 0, y: 0 },
		{ x: 1, y: 0 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});

QUnit.test("(0, 0) > (4, 0) intersections", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 4;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 0, y: 0 },
		{ x: 1, y: 0 },
		{ x: 2, y: 0 },
		{ x: 3, y: 0 },
		{ x: 4, y: 0 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});

QUnit.module( "direction left" );
QUnit.test("(1, 0) > (0, 0) intersections", function( assert ) {
	//arrange
	var startX = 1;
	var startY = 0;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 1, y: 0 },
		{ x: 0, y: 0 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});

QUnit.test("(4, 0) > (0, 0) intersections", function( assert ) {
	//arrange
	var startX = 4;
	var startY = 0;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 4, y: 0 },
		{ x: 3, y: 0 },
		{ x: 2, y: 0 },
		{ x: 1, y: 0 },
		{ x: 0, y: 0 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});

QUnit.module( "direction down & right" );
QUnit.test("(0, 0) > (1, 1) intersections", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 1;
	var endY = 1;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 1, y: 1 },
		{ x: 0, y: 0 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});
QUnit.test("(0, 0) > (2, 4) intersections", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 2;
	var endY = 4;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 1, y: 2 },
		{ x: 2, y: 4 },
		{ x: 0, y: 0 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});

QUnit.module( "direction down & left" );
QUnit.test("(1, 0) > (0, 1) intersections", function( assert ) {
	//arrange
	var startX = 1;
	var startY = 0;
	var endX = 0;
	var endY = 1;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 0, y: 1 },
		{ x: 1, y: 0 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});

QUnit.test("(2, 0) > (0, 4) intersections", function( assert ) {
	//arrange
	var startX = 2;
	var startY = 0;
	var endX = 0;
	var endY = 4;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 1, y: 2 },
		{ x: 0, y: 4 },
		{ x: 2, y: 0 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});

QUnit.module( "direction up & left" );
QUnit.test("(1, 1) > (0, 0) intersections", function( assert ) {
	//arrange
	var startX = 1;
	var startY = 1;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 0, y: 0 },
		{ x: 1, y: 1 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});
QUnit.test("(2, 4) > (0, 0) intersections", function( assert ) {
	//arrange
	var startX = 2;
	var startY = 4;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 1, y: 2 },
		{ x: 0, y: 0 },
		{ x: 2, y: 4 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});

QUnit.module( "direction up & right" );
QUnit.test("(0, 1) > (1, 0) intersections", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 1;
	var endX = 1;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 1, y: 0 },
		{ x: 0, y: 1 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});

QUnit.test("(0, 4) > (2, 0) intersections", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 4;
	var endX = 2;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedIntersections = [
		{ x: 1, y: 2 },
		{ x: 2, y: 0 },
		{ x: 0, y: 4 }
	];

	//act
	var intersections = gridCalculator.getIntersections(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedIntersections, intersections, "no horizontal edges" );
});