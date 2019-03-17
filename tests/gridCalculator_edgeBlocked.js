QUnit.module( "path not blocked" );
QUnit.test("no edges no walls or blocking edges", function( assert ) {
	//arrange
	var walls = [];
	var blockingEdges = [];
	var gridCalculator = GridCalculator();
	gridCalculator.init({
		offMapTiles: [],
		walls: walls,
		blockingTiles: [],
		blockingEdges: blockingEdges,
		blockingIntersections: [],
		spireTiles: [],
		attackingTile: { x: -1, y: -1 },
		defendingTile: { x: -1, y: -1 },
		blockers: []
	});
	var edges = [];
	var expectedPathBlocked = false;

	//act
	var pathBlocked = gridCalculator.edgeBlocked(edges);
	
	//assert
	assert.equal(expectedPathBlocked, pathBlocked, "path not blocked" );
});

QUnit.test("1 vertical edge no walls or blocking edges", function( assert ) {
	//arrange
	var walls = [];
	var blockingEdges = [];
	var gridCalculator = GridCalculator();
	gridCalculator.init({
		offMapTiles: [],
		walls: walls,
		blockingTiles: [],
		blockingEdges: blockingEdges,
		blockingIntersections: [],
		spireTiles: [],
		attackingTile: { x: -1, y: -1 },
		defendingTile: { x: -1, y: -1 },
		blockers: []
	});
	var edges = [
		[{ x: 1, y: 0 }, { x: 1, y: 1 }]
	];
	var expectedPathBlocked = false;

	//act
	var pathBlocked = gridCalculator.edgeBlocked(edges);
	
	//assert
	assert.equal(expectedPathBlocked, pathBlocked, "path not blocked" );
});

QUnit.test("1 vertical edge 1 wall", function( assert ) {
	//arrange
	var walls = [
		[{ x: 2, y: 0 }, { x: 2, y: 1 }]
	];
	var blockingEdges = [];
	var gridCalculator = GridCalculator();
	gridCalculator.init({
		offMapTiles: [],
		walls: walls,
		blockingTiles: [],
		blockingEdges: blockingEdges,
		blockingIntersections: [],
		spireTiles: [],
		attackingTile: { x: -1, y: -1 },
		defendingTile: { x: -1, y: -1 },
		blockers: []
	});
	var edges = [
		[{ x: 1, y: 0 }, { x: 1, y: 1 }]
	];
	var expectedPathBlocked = false;

	//act
	var pathBlocked = gridCalculator.edgeBlocked(edges);
	
	//assert
	assert.equal(expectedPathBlocked, pathBlocked, "path not blocked" );
});


QUnit.test("1 vertcal edge 1 blocking edge", function( assert ) {
	//arrange
	var walls = [];
	var blockingEdges = [
		[{ x: 2, y: 0 }, { x: 2, y: 1 }]
	];
	var gridCalculator = GridCalculator();
	gridCalculator.init({
		offMapTiles: [],
		walls: walls,
		blockingTiles: [],
		blockingEdges: blockingEdges,
		blockingIntersections: [],
		spireTiles: [],
		attackingTile: { x: -1, y: -1 },
		defendingTile: { x: -1, y: -1 },
		blockers: []
	});
	var edges = [
		[{ x: 1, y: 0 }, { x: 1, y: 1 }]
	];
	var expectedPathBlocked = false;

	//act
	var pathBlocked = gridCalculator.edgeBlocked(edges);
	
	//assert
	assert.equal(expectedPathBlocked, pathBlocked, "path not blocked" );
});

QUnit.module( "path blocked" );
QUnit.test("1 vertical edge 1 wall", function( assert ) {
	//arrange
	var walls = [
		[{ x: 1, y: 0 }, { x: 1, y: 1 }]
	];
	var blockingEdges = [];
	var gridCalculator = GridCalculator();
	gridCalculator.init({
		offMapTiles: [],
		walls: walls,
		blockingTiles: [],
		blockingEdges: blockingEdges,
		blockingIntersections: [],
		spireTiles: [],
		attackingTile: { x: -1, y: -1 },
		defendingTile: { x: -1, y: -1 },
		blockers: []
	});
	var edges = [
		[{ x: 1, y: 0 }, { x: 1, y: 1 }]
	];
	var expectedPathBlocked = true;

	//act
	var pathBlocked = gridCalculator.edgeBlocked(edges);
	
	//assert
	assert.equal(expectedPathBlocked, pathBlocked, "path not blocked" );
});

QUnit.test("1 horizontal edge 1 wall", function( assert ) {
	//arrange
	var walls = [
		[{ x: 0, y: 1 }, { x: 1, y: 1 }]
	];
	var blockingEdges = [];
	var gridCalculator = GridCalculator();
	gridCalculator.init({
		offMapTiles: [],
		walls: walls,
		blockingTiles: [],
		blockingEdges: blockingEdges,
		blockingIntersections: [],
		spireTiles: [],
		attackingTile: { x: -1, y: -1 },
		defendingTile: { x: -1, y: -1 },
		blockers: []
	});
	var edges = [
		[{ x: 0, y: 1 }, { x: 1, y: 1 }]
	];
	var expectedPathBlocked = true;

	//act
	var pathBlocked = gridCalculator.edgeBlocked(edges);
	
	//assert
	assert.equal(expectedPathBlocked, pathBlocked, "path not blocked" );
});

QUnit.test("1 vertical edge 1 blocking edge", function( assert ) {
	//arrange
	var walls = [];
	var blockingEdges = [
		[{ x: 1, y: 0 }, { x: 1, y: 1 }]
	];
	var gridCalculator = GridCalculator();
	gridCalculator.init({
		offMapTiles: [],
		walls: walls,
		blockingTiles: [],
		blockingEdges: blockingEdges,
		blockingIntersections: [],
		spireTiles: [],
		attackingTile: { x: -1, y: -1 },
		defendingTile: { x: -1, y: -1 },
		blockers: []
	});
	var edges = [
		[{ x: 1, y: 0 }, { x: 1, y: 1 }]
	];
	var expectedPathBlocked = true;

	//act
	var pathBlocked = gridCalculator.edgeBlocked(edges);
	
	//assert
	assert.equal(expectedPathBlocked, pathBlocked, "path not blocked" );
});

QUnit.test("1 horizontal edge 1 blocking edge", function( assert ) {
	//arrange
	var walls = [];
	var blockingEdges = [
		[{ x: 0, y: 1 }, { x: 1, y: 1 }]
	];
	var gridCalculator = GridCalculator();
	gridCalculator.init({
		offMapTiles: [],
		walls: walls,
		blockingTiles: [],
		blockingEdges: blockingEdges,
		blockingIntersections: [],
		spireTiles: [],
		attackingTile: { x: -1, y: -1 },
		defendingTile: { x: -1, y: -1 },
		blockers: []
	});
	var edges = [
		[{ x: 0, y: 1 }, { x: 1, y: 1 }]
	];
	var expectedPathBlocked = true;

	//act
	var pathBlocked = gridCalculator.edgeBlocked(edges);
	
	//assert
	assert.equal(expectedPathBlocked, pathBlocked, "path not blocked" );
});