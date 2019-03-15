QUnit.module( "paths do not overlap" );
QUnit.test("test", function( assert ) {
	//arrange
	var attackingPoint = { x: 0, y: 0 };
	var defendingPoint1 = { x: 0, y: 1 };
	var defendingPoint2 = { x: 1, y: 1 };
	var gridCalculator = GridCalculator();
	var expectedPathOverlaps = false;

	//act
	var pathOverlaps = gridCalculator.pathsOverlap(attackingPoint, defendingPoint1, defendingPoint2);
	
	//assert
	assert.equal(expectedPathOverlaps, pathOverlaps, "paths do not overlap" );
});

QUnit.module( "overlapping paths" );
QUnit.test("horizontal right", function( assert ) {
	//arrange
	var attackingPoint = { x: 0, y: 0 };
	var defendingPoint1 = { x: 1, y: 0 };
	var defendingPoint2 = { x: 2, y: 0 };
	var gridCalculator = GridCalculator();
	var expectedPathOverlaps = true;

	//act
	var pathOverlaps = gridCalculator.pathsOverlap(attackingPoint, defendingPoint1, defendingPoint2);
	
	//assert
	assert.equal(expectedPathOverlaps, pathOverlaps, "paths do not overlap" );
});

QUnit.test("horizontal left", function( assert ) {
	//arrange
	var attackingPoint = { x: 2, y: 0 };
	var defendingPoint1 = { x: 0, y: 0 };
	var defendingPoint2 = { x: 1, y: 0 };
	var gridCalculator = GridCalculator();
	var expectedPathOverlaps = true;

	//act
	var pathOverlaps = gridCalculator.pathsOverlap(attackingPoint, defendingPoint1, defendingPoint2);
	
	//assert
	assert.equal(expectedPathOverlaps, pathOverlaps, "paths do not overlap" );
});

QUnit.test("vertical down", function( assert ) {
	//arrange
	var attackingPoint = { x: 0, y: 0 };
	var defendingPoint1 = { x: 0, y: 1 };
	var defendingPoint2 = { x: 0, y: 2 };
	var gridCalculator = GridCalculator();
	var expectedPathOverlaps = true;

	//act
	var pathOverlaps = gridCalculator.pathsOverlap(attackingPoint, defendingPoint1, defendingPoint2);
	
	//assert
	assert.equal(expectedPathOverlaps, pathOverlaps, "paths do not overlap" );
});

QUnit.test("vertical up", function( assert ) {
	//arrange
	var attackingPoint = { x: 0, y: 2 };
	var defendingPoint1 = { x: 0, y: 0 };
	var defendingPoint2 = { x: 0, y: 1 };
	var gridCalculator = GridCalculator();
	var expectedPathOverlaps = true;

	//act
	var pathOverlaps = gridCalculator.pathsOverlap(attackingPoint, defendingPoint1, defendingPoint2);
	
	//assert
	assert.equal(expectedPathOverlaps, pathOverlaps, "paths do not overlap" );
});