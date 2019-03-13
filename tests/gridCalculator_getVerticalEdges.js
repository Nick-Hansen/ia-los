QUnit.module( "no movement" );
QUnit.test("(0, 0) > (0, 0) no verticle edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.module( "vertical lines" );
QUnit.test("(0, 0) > (0, 4) no verticle edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 0;
	var endY = 4;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.test("(0, 4) > (0, 0) no verticle edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 4;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.module( "direction down & right" );
QUnit.test("(0, 0) > (1, 4) no verticle edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 1;
	var endY = 4;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.test("(0, 0) > (2, 4) no verticle edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 2;
	var endY = 4;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.test("(0, 0) > (2, 1) verticle edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 2;
	var endY = 1;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [
		[
			{ x: 1, y: 0 },
			{ x: 1, y: 1 }
		]
	];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "verticle edges" );
});

QUnit.test("(0, 0) > (4, 1) verticle edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 4;
	var endY = 1;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [
		[
			{ x: 1, y: 0 },
			{ x: 1, y: 1 }
		],
		[
			{ x: 2, y: 0 },
			{ x: 2, y: 1 }
		],
		[
			{ x: 3, y: 0 },
			{ x: 3, y: 1 }
		],
	];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "verticle edges" );
});

QUnit.test("(0, 0) > (4, 3) verticle edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 0;
	var endX = 4;
	var endY = 3;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [
		[
			{ x: 1, y: 0 },
			{ x: 1, y: 1 }
		],
		[
			{ x: 2, y: 1 },
			{ x: 2, y: 2 }
		],
		[
			{ x: 3, y: 2 },
			{ x: 3, y: 3 }
		],
	];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "verticle edges" );
});

QUnit.module( "direction down & left" );
QUnit.test("(1, 0) > (0, 4) no verticle edges", function( assert ) {
	//arrange
	var startX = 1;
	var startY = 0;
	var endX = 0;
	var endY = 4;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.test("(2, 0) > (0, 4) no verticle edges", function( assert ) {
		//arrange
		var startX = 2;
		var startY = 0;
		var endX = 0;
		var endY = 4;
		var gridCalculator = GridCalculator();
		var expectedVerticalEdges = [];
	
		//act
		var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
		
		//assert
		assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.test("(2, 0) > (0, 1) verticle edges", function( assert ) {
	//arrange
	var startX = 2;
	var startY = 0;
	var endX = 0;
	var endY = 1;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [
		[
			{ x: 1, y: 0 },
			{ x: 1, y: 1 }
		]
	];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.test("(4, 0) > (0, 1) verticle edges", function( assert ) {
	//arrange
	var startX = 4;
	var startY = 0;
	var endX = 0;
	var endY = 1;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [
		[
			{ x: 3, y: 0 },
			{ x: 3, y: 1 }
		],
		[
			{ x: 2, y: 0 },
			{ x: 2, y: 1 }
		],
		[
			{ x: 1, y: 0 },
			{ x: 1, y: 1 }
		]
	];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.test("(4, 0) > (0, 3) verticle edges", function( assert ) {
	//arrange
	var startX = 4;
	var startY = 0;
	var endX = 0;
	var endY = 3;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [
		[
			{ x: 3, y: 0 },
			{ x: 3, y: 1 }
		],
		[
			{ x: 2, y: 1 },
			{ x: 2, y: 2 }
		],
		[
			{ x: 1, y: 2 },
			{ x: 1, y: 3 }
		]
	];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.module( "direction up & left" );
QUnit.test("(1, 4) > (0, 0) no verticle edges", function( assert ) {
	//arrange
	var startX = 1;
	var startY = 4;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.test("(2, 4) > (0, 0) no verticle edges", function( assert ) {
	//arrange
	var startX = 2;
	var startY = 4;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.test("(2, 1) > (0, 0) verticle edges", function( assert ) {
	//arrange
	var startX = 2;
	var startY = 1;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [
		[
			{ x: 1, y: 0 },
			{ x: 1, y: 1 }
		]
	];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.test("(4, 1) > (0, 0) verticle edges", function( assert ) {
	//arrange
	var startX = 4;
	var startY = 1;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [
		[
			{ x: 3, y: 0 },
			{ x: 3, y: 1 }
		],
		[	
			{ x: 2, y: 0 },
			{ x: 2, y: 1 }
		],
		[	
			{ x: 1, y: 0 },
			{ x: 1, y: 1 }
		]
	];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.test("(4, 3) > (0, 0) verticle edges", function( assert ) {
	//arrange
	var startX = 4;
	var startY = 3;
	var endX = 0;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [
		[
			{ x: 3, y: 2 },
			{ x: 3, y: 3 }
		],
		[	
			{ x: 2, y: 1 },
			{ x: 2, y: 2 }
		],
		[	
			{ x: 1, y: 0 },
			{ x: 1, y: 1 }
		]
	];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.module( "direction up & right" );
QUnit.test("(0, 4) > (1, 0) no verticle edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 4;
	var endX = 1;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.test("(0, 4) > (2, 0) no verticle edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 4;
	var endX = 2;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.test("(0, 1) > (2, 0) verticle edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 1;
	var endX = 2;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [
		[
			{ x: 1, y: 0 },
			{ x: 1, y: 1 }
		]
	];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.test("(0, 1) > (4, 0) verticle edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 1;
	var endX = 4;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [
		[
			{ x: 1, y: 0 },
			{ x: 1, y: 1 }
		],
		[	
			{ x: 2, y: 0 },
			{ x: 2, y: 1 }
		],
		[	
			{ x: 3, y: 0 },
			{ x: 3, y: 1 }
		]
	];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});

QUnit.test("(0, 3) > (4, 0) verticle edges", function( assert ) {
	//arrange
	var startX = 0;
	var startY = 3;
	var endX = 4;
	var endY = 0;
	var gridCalculator = GridCalculator();
	var expectedVerticalEdges = [
		[
			{ x: 1, y: 2 },
			{ x: 1, y: 3 }
		],
		[	
			{ x: 2, y: 1 },
			{ x: 2, y: 2 }
		],
		[	
			{ x: 3, y: 0 },
			{ x: 3, y: 1 }
		]
	];

	//act
	var verticalEdges = gridCalculator.getVerticalEdges(startX, startY, endX, endY);
	
	//assert
	assert.deepEqual(expectedVerticalEdges, verticalEdges, "no verticle edges" );
});