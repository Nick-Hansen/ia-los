QUnit.module( "no movement" );
QUnit.test("(0, 0) > (0, 0) no horizontal edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.module( "horizontal lines" );
QUnit.test("(0, 0) > (4, 0) no horizontal edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 4;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.test("(4, 0) > (0, 0) no horizontal edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 4;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.module( "direction down & right" );
QUnit.test("(0, 0) > (3, 1) no horizontal edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 3;
	var endY = 1;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.test("(0, 0) > (2, 2) no horizontal edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 2;
	var endY = 2;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.test("(0, 0) > (1, 2) horizontal edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 1;
	var endY = 2;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [
		[
			{ x: 0, y: 1 },
			{ x: 1, y: 1 }
		]
	];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "horizontal edges" );
});

QUnit.test("(0, 0) > (1, 4) horizontal edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 1;
	var endY = 4;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [
		[
			{ x: 0, y: 1 },
			{ x: 1, y: 1 }
		],
		[
			{ x: 0, y: 2 },
			{ x: 1, y: 2 }
		],
		[
			{ x: 0, y: 3 },
			{ x: 1, y: 3 }
		],
	];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "horizontal edges" );
});

QUnit.test("(0, 0) > (3, 4) horizontal edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 3;
	var endY = 4;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [
		[
			{ x: 0, y: 1 },
			{ x: 1, y: 1 }
		],
		[
			{ x: 1, y: 2 },
			{ x: 2, y: 2 }
		],
		[
			{ x: 2, y: 3 },
			{ x: 3, y: 3 }
		],
	];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "horizontal edges" );
});

QUnit.module( "direction down & left" );
QUnit.test("(3, 0) > (0, 1) no horizontal edges", function( assert ) {
	//arrange
	var startX = 3;
	var startY = 0;
	var endX = 0;
	var endY = 1;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.test("(3, 0) > (1, 2) no horizontal edges", function( assert ) {
		//arrange
		var startX = 3;
		var startY = 0;
		var endX = 1;
		var endY = 2;
		var gridCalculator = GridCalculator();
		var expectedHorizontalEdges = [];
	
		//act
		var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
		
		//assert
		assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.test("(3, 0) > (2, 2) horizontal edges", function( assert ) {
	//arrange
	var startX = 3;
	var startY = 0;
	var endX = 2;
	var endY = 2;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [
		[
			{ x: 2, y: 1 },
			{ x: 3, y: 1 }
		]
	];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.test("(3, 0) > (2, 4) horizontal edges", function( assert ) {
	//arrange
	var startX = 3;
	var startY = 0;
	var endX = 2;
	var endY = 4;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [
		[
			{ x: 2, y: 1 },
			{ x: 3, y: 1 }
		],
		[
			{ x: 2, y: 2 },
			{ x: 3, y: 2 }
		],
		[
			{ x: 2, y: 3 },
			{ x: 3, y: 3 }
		]
	];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.test("(3, 0) > (0, 4) horizontal edges", function( assert ) {
	//arrange
	var startX = 3;
	var startY = 0;
	var endX = 0;
	var endY = 4;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [
		[
			{ x: 2, y: 1 },
			{ x: 3, y: 1 }
		],
		[
			{ x: 1, y: 2 },
			{ x: 2, y: 2 }
		],
		[
			{ x: 0, y: 3 },
			{ x: 1, y: 3 }
		]
	];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.module( "direction up & left" );
QUnit.test("(3, 4) > (0, 3) no horizontal edges", function( assert ) {
	//arrange
	var startX = 3;
	var startY = 4;
	var endX = 0;
	var endY = 3;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.test("(3, 4) > (1, 2) no horizontal edges", function( assert ) {
	//arrange
	var startX = 3;
	var startY = 4;
	var endX = 1;
	var endY = 2;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.test("(3, 4) > (2, 2) horizontal edges", function( assert ) {
	//arrange
	var startX = 3;
	var startY = 4;
	var endX = 2;
	var endY = 2;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [
		[
			{ x: 2, y: 3 },
			{ x: 3, y: 3 }
		]
	];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.test("(3, 4) > (2, 0) horizontal edges", function( assert ) {
	//arrange
	var startX = 3;
	var startY = 4;
	var endX = 2;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [
		[
			{ x: 2, y: 3 },
			{ x: 3, y: 3 }
		],
		[	
			{ x: 2, y: 2 },
			{ x: 3, y: 2 }
		],
		[	
			{ x: 2, y: 1 },
			{ x: 3, y: 1 }
		]
	];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.test("(3, 4) > (0, 0) horizontal edges", function( assert ) {
	//arrange
	var startX = 3;
	var startY = 4;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [
		[
			{ x: 2, y: 3 },
			{ x: 3, y: 3 }
		],
		[	
			{ x: 1, y: 2 },
			{ x: 2, y: 2 }
		],
		[	
			{ x: 0, y: 1 },
			{ x: 1, y: 1 }
		]
	];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.module( "direction up & right" );
QUnit.test("(0, 4) > (3, 3) no horizontal edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 4;
	var endX = 3;
	var endY = 3;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.test("(0, 4) > (2, 2) no horizontal edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 4;
	var endX = 2;
	var endY = 2;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.test("(0, 4) > (1, 2) horizontal edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 4;
	var endX = 1;
	var endY = 2;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [
		[
			{ x: 0, y: 3 },
			{ x: 1, y: 3 }
		]
	];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.test("(0, 4) > (1, 0) horizontal edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 4;
	var endX = 1;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [
		[
			{ x: 0, y: 3 },
			{ x: 1, y: 3 }
		],
		[	
			{ x: 0, y: 2 },
			{ x: 1, y: 2 }
		],
		[	
			{ x: 0, y: 1 },
			{ x: 1, y: 1 }
		]
	];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});

QUnit.test("(0, 4) > (3, 0) horizontal edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 4;
	var endX = 3;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedHorizontalEdges = [
		[
			{ x: 0, y: 3 },
			{ x: 1, y: 3 }
		],
		[	
			{ x: 1, y: 2 },
			{ x: 2, y: 2 }
		],
		[	
			{ x: 2, y: 1 },
			{ x: 3, y: 1 }
		]
	];

	//act
	var horizontalEdges = gridCalculator.getHorizontalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedHorizontalEdges, horizontalEdges, "no horizontal edges" );
});