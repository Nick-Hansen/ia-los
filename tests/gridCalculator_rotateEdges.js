QUnit.module( "rotate edge counterclockwise" );
QUnit.test("edge (1, 0) > (1, 1), previousMapWidth 2", function( assert ) {
	//arrange
	var edge = [  
		{  
			"x":1,
			"y":0
		},
		{  
			"x":1,
			"y":1
		}
	]
	var previousMapWidth = 2;
	var gridCalculator = GridCalculator();

	//act
	edge = gridCalculator.rotateEdgeCounterClockwise(edge, previousMapWidth);
	
	//assert
	assert.equal(edge[0].x, 0, "edge[0].x rotated" );
	assert.equal(edge[0].y, 1, "edge[0].y rotated" );
	assert.equal(edge[1].x, 1, "edge[1].x rotated" );
	assert.equal(edge[1].y, 1, "edge[1].y rotated" );
});

QUnit.test("edge (1, 1) > (2, 1), previousMapWidth 2", function( assert ) {
	//arrange
	var edge = [  
		{  
			"x":1,
			"y":1
		},
		{  
			"x":2,
			"y":1
		}
	]
	var previousMapWidth = 2;
	var gridCalculator = GridCalculator();

	//act
	edge = gridCalculator.rotateEdgeCounterClockwise(edge, previousMapWidth);
	
	//assert
	assert.equal(edge[0].x, 1, "edge[0].x rotated" );
	assert.equal(edge[0].y, 0, "edge[0].y rotated" );
	assert.equal(edge[1].x, 1, "edge[1].x rotated" );
	assert.equal(edge[1].y, 1, "edge[1].y rotated" );
});

QUnit.test("edge (1, 1) > (1, 2), previousMapWidth 2", function( assert ) {
	//arrange
	var edge = [  
		{  
			"x":1,
			"y":1
		},
		{  
			"x":1,
			"y":2
		}
	]
	var previousMapWidth = 2;
	var gridCalculator = GridCalculator();

	//act
	edge = gridCalculator.rotateEdgeCounterClockwise(edge, previousMapWidth);
	
	//assert
	assert.equal(edge[0].x, 1, "edge[0].x rotated" );
	assert.equal(edge[0].y, 1, "edge[0].y rotated" );
	assert.equal(edge[1].x, 2, "edge[1].x rotated" );
	assert.equal(edge[1].y, 1, "edge[1].y rotated" );
});

QUnit.test("edge (0, 1) > (1, 1), previousMapWidth 2", function( assert ) {
	//arrange
	var edge = [  
		{  
			"x":0,
			"y":1
		},
		{  
			"x":1,
			"y":1
		}
	]
	var previousMapWidth = 2;
	var gridCalculator = GridCalculator();

	//act
	edge = gridCalculator.rotateEdgeCounterClockwise(edge, previousMapWidth);
	
	//assert
	assert.equal(edge[0].x, 1, "edge[0].x rotated" );
	assert.equal(edge[0].y, 1, "edge[0].y rotated" );
	assert.equal(edge[1].x, 1, "edge[1].x rotated" );
	assert.equal(edge[1].y, 2, "edge[1].y rotated" );
});

QUnit.test("edge (1, 1) > (2, 1), previousMapWidth 3", function( assert ) {
	//arrange
	var edge = [  
		{  
			"x":1,
			"y":1
		},
		{  
			"x":2,
			"y":1
		}
	]
	var previousMapWidth = 3;
	var gridCalculator = GridCalculator();

	//act
	edge = gridCalculator.rotateEdgeCounterClockwise(edge, previousMapWidth);
	
	//assert
	assert.equal(edge[0].x, 1, "edge[0].x rotated" );
	assert.equal(edge[0].y, 1, "edge[0].y rotated" );
	assert.equal(edge[1].x, 1, "edge[1].x rotated" );
	assert.equal(edge[1].y, 2, "edge[1].y rotated" );
});

QUnit.test("edge (2, 1) > (2, 2), previousMapWidth 3", function( assert ) {
	//arrange
	var edge = [  
		{  
			"x":2,
			"y":1
		},
		{  
			"x":2,
			"y":2
		}
	]
	var previousMapWidth = 3;
	var gridCalculator = GridCalculator();

	//act
	edge = gridCalculator.rotateEdgeCounterClockwise(edge, previousMapWidth);
	
	//assert
	assert.equal(edge[0].x, 1, "edge[0].x rotated" );
	assert.equal(edge[0].y, 1, "edge[0].y rotated" );
	assert.equal(edge[1].x, 2, "edge[1].x rotated" );
	assert.equal(edge[1].y, 1, "edge[1].y rotated" );
});

QUnit.test("edge (1, 2) > (2, 2), previousMapWidth 3", function( assert ) {
	//arrange
	var edge = [  
		{  
			"x":1,
			"y":2
		},
		{  
			"x":2,
			"y":2
		}
	]
	var previousMapWidth = 3;
	var gridCalculator = GridCalculator();

	//act
	edge = gridCalculator.rotateEdgeCounterClockwise(edge, previousMapWidth);
	
	//assert
	assert.equal(edge[0].x, 2, "edge[0].x rotated" );
	assert.equal(edge[0].y, 1, "edge[0].y rotated" );
	assert.equal(edge[1].x, 2, "edge[1].x rotated" );
	assert.equal(edge[1].y, 2, "edge[1].y rotated" );
});

QUnit.test("edge (1, 1) > (1, 2), previousMapWidth 3", function( assert ) {
	//arrange
	var edge = [  
		{  
			"x":1,
			"y":1
		},
		{  
			"x":1,
			"y":2
		}
	]
	var previousMapWidth = 3;
	var gridCalculator = GridCalculator();

	//act
	edge = gridCalculator.rotateEdgeCounterClockwise(edge, previousMapWidth);
	
	//assert
	assert.equal(edge[0].x, 1, "edge[0].x rotated" );
	assert.equal(edge[0].y, 2, "edge[0].y rotated" );
	assert.equal(edge[1].x, 2, "edge[1].x rotated" );
	assert.equal(edge[1].y, 2, "edge[1].y rotated" );
});

QUnit.module( "rotate edge clockwise" );
QUnit.test("edge (1, 0) > (1, 1), previousMapHeight 2", function( assert ) {
	//arrange
	var edge = [  
		{  
			"x":1,
			"y":0
		},
		{  
			"x":1,
			"y":1
		}
	]
	var previousMapHeight = 2;
	var gridCalculator = GridCalculator();

	//act
	edge = gridCalculator.rotateEdgeClockwise(edge, previousMapHeight);
	
	//assert
	assert.equal(edge[0].x, 1, "edge[0].x rotated" );
	assert.equal(edge[0].y, 1, "edge[0].y rotated" );
	assert.equal(edge[1].x, 2, "edge[1].x rotated" );
	assert.equal(edge[1].y, 1, "edge[1].y rotated" );
});

QUnit.test("edge (1, 1) > (2, 1), previousMapHeight 2", function( assert ) {
	//arrange
	var edge = [  
		{  
			"x":1,
			"y":1
		},
		{  
			"x":1,
			"y":2
		}
	]
	var previousMapHeight = 2;
	var gridCalculator = GridCalculator();

	//act
	edge = gridCalculator.rotateEdgeClockwise(edge, previousMapHeight);
	
	//assert
	assert.equal(edge[0].x, 0, "edge[0].x rotated" );
	assert.equal(edge[0].y, 1, "edge[0].y rotated" );
	assert.equal(edge[1].x, 1, "edge[1].x rotated" );
	assert.equal(edge[1].y, 1, "edge[1].y rotated" );
});

QUnit.test("edge (1, 1) > (1, 2), previousMapHeight 2", function( assert ) {
	//arrange
	var edge = [  
		{  
			"x":1,
			"y":1
		},
		{  
			"x":1,
			"y":2
		}
	]
	var previousMapHeight = 2;
	var gridCalculator = GridCalculator();

	//act
	edge = gridCalculator.rotateEdgeClockwise(edge, previousMapHeight);
	
	//assert
	assert.equal(edge[0].x, 0, "edge[0].x rotated" );
	assert.equal(edge[0].y, 1, "edge[0].y rotated" );
	assert.equal(edge[1].x, 1, "edge[1].x rotated" );
	assert.equal(edge[1].y, 1, "edge[1].y rotated" );
});

QUnit.test("edge (0, 1) > (1, 1), previousMapHeight 2", function( assert ) {
	//arrange
	var edge = [  
		{  
			"x":0,
			"y":1
		},
		{  
			"x":1,
			"y":1
		}
	]
	var previousMapHeight = 2;
	var gridCalculator = GridCalculator();

	//act
	edge = gridCalculator.rotateEdgeClockwise(edge, previousMapHeight);
	
	//assert
	assert.equal(edge[0].x, 1, "edge[0].x rotated" );
	assert.equal(edge[0].y, 0, "edge[0].y rotated" );
	assert.equal(edge[1].x, 1, "edge[1].x rotated" );
	assert.equal(edge[1].y, 1, "edge[1].y rotated" );
});

QUnit.test("edge (1, 1) > (2, 1), previousMapHeight 3", function( assert ) {
	//arrange
	var edge = [  
		{  
			"x":1,
			"y":1
		},
		{  
			"x":2,
			"y":1
		}
	]
	var previousMapHeight = 3;
	var gridCalculator = GridCalculator();

	//act
	edge = gridCalculator.rotateEdgeClockwise(edge, previousMapHeight);
	
	//assert
	assert.equal(edge[0].x, 2, "edge[0].x rotated" );
	assert.equal(edge[0].y, 1, "edge[0].y rotated" );
	assert.equal(edge[1].x, 2, "edge[1].x rotated" );
	assert.equal(edge[1].y, 2, "edge[1].y rotated" );
});

QUnit.test("edge (2, 1) > (2, 2), previousMapHeight 3", function( assert ) {
	//arrange
	var edge = [  
		{  
			"x":2,
			"y":1
		},
		{  
			"x":2,
			"y":2
		}
	]
	var previousMapHeight = 3;
	var gridCalculator = GridCalculator();

	//act
	edge = gridCalculator.rotateEdgeClockwise(edge, previousMapHeight);
	
	//assert
	assert.equal(edge[0].x, 1, "edge[0].x rotated" );
	assert.equal(edge[0].y, 2, "edge[0].y rotated" );
	assert.equal(edge[1].x, 2, "edge[1].x rotated" );
	assert.equal(edge[1].y, 2, "edge[1].y rotated" );
});

QUnit.test("edge (1, 2) > (2, 2), previousMapHeight 3", function( assert ) {
	//arrange
	var edge = [  
		{  
			"x":1,
			"y":2
		},
		{  
			"x":2,
			"y":2
		}
	]
	var previousMapHeight = 3;
	var gridCalculator = GridCalculator();

	//act
	edge = gridCalculator.rotateEdgeClockwise(edge, previousMapHeight);
	
	//assert
	assert.equal(edge[0].x, 1, "edge[0].x rotated" );
	assert.equal(edge[0].y, 1, "edge[0].y rotated" );
	assert.equal(edge[1].x, 1, "edge[1].x rotated" );
	assert.equal(edge[1].y, 2, "edge[1].y rotated" );
});

QUnit.test("edge (1, 1) > (1, 2), previousMapHeight 3", function( assert ) {
	//arrange
	var edge = [  
		{  
			"x":1,
			"y":1
		},
		{  
			"x":1,
			"y":2
		}
	]
	var previousMapHeight = 3;
	var gridCalculator = GridCalculator();

	//act
	edge = gridCalculator.rotateEdgeClockwise(edge, previousMapHeight);
	
	//assert
	assert.equal(edge[0].x, 1, "edge[0].x rotated" );
	assert.equal(edge[0].y, 1, "edge[0].y rotated" );
	assert.equal(edge[1].x, 2, "edge[1].x rotated" );
	assert.equal(edge[1].y, 1, "edge[1].y rotated" );
});