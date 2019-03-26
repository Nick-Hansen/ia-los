QUnit.module( "2 The part of a wall that partially extends into a space does not block line of sight" );
QUnit.test("2.1 los from attacking corner to defending corners", function( assert ) {
	//arrange
	var blockers = [];
	var offMapTiles = [];
	var blockingTiles = [];
	var blockingEdges = [];
	var spireTiles = [];
	var walls = [
		[
			{ x: 2, y: 0 },
			{ x: 2, y: 1 }
		]
	];
	var blockingIntersections = [
		{
            x: 2, y: 0,
            connections:[
                {
                    x: 1, y: 0
                },
                {
                    x: 3, y: 0
                },
                {
                    x: 2, y: 1
                }
            ]
        }
	];
	var gridCalculator = GridCalculator();
	var attackingTile = { x: 1, y: 0 };
	var defendingTile = { x: 3, y: 0 };
	var attackingCorner = { x: 1, y: 0 };
	var defendingCorner1 = { x: 3, y: 0 };
	var defendingCorner2 = { x: 3, y: 1 };
	var expectedLoS1 = true;
	var expectedLoS2 = true;

	//act
	var losResult1 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner1,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);
	var losResult2 = gridCalculator.calculateLoSFromTileToTile(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls, 
		blockingIntersections, spireTiles);
	
	//assert
	assert.equal(expectedLoS1, losResult1, "path not blocked" );
	assert.equal(expectedLoS2, losResult2, "path not blocked" );
});

QUnit.test("2.2 los from attacker to defender", function( assert ) {
	//arrange
	var blockers = [];
	var offMapTiles = [];
	var blockingTiles = [];
	var blockingEdges = [];
	var spireTiles = [];
	var walls = [
		[
			{ x: 2, y: 0 },
			{ x: 2, y: 1 }
		]
	];
	var blockingIntersections = [
		{
            x: 2,
            y: 0,
            connections:[
                {
                    x:1,
                    y:0
                },
                {
                    x:3,
                    y:0
                },
                {
                    x:2,
                    y:1
                }
            ]
        }
	];
	var gridCalculator = GridCalculator();
	var attackingTile = { x: 1, y: 0 };
	var defendingTile = { x: 3, y: 0 };
	var expectedLoS = true;

	//act
	var losResult = gridCalculator.calculateLoSFromTileToTile(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls, 
		blockingIntersections, spireTiles);
	
	//assert
	assert.equal(expectedLoS, losResult, "path not blocked" );
});

QUnit.module( "3 Line of sight can sometimes be traced to a figure (2) who cannot trace it back (3)." );
QUnit.test("3.1 los from attacker to defender, not back", function( assert ) {
	//arrange
	var blockers = [];
	var offMapTiles = [];
	var blockingTiles = [];
	var blockingEdges = [];
	var spireTiles = [];
	var walls = [
		[
			{ x: 2, y: 0 },
			{ x: 2, y: 1 }
		]
	];
	var blockingIntersections = [
		{
            x: 2,
            y: 0,
            connections:[
                {
                    x:1,
                    y:0
                },
                {
                    x:3,
                    y:0
                },
                {
                    x:2,
                    y:1
                }
            ]
        }
	];
	var gridCalculator = GridCalculator();
	var attackingTile = { x: 1, y: 0 };
	var defendingTile = { x: 3, y: 0 };
	var expectedLoS1 = true;
	var expectedLoS2 = false;

	//act
	var losResult1 = gridCalculator.calculateLoSFromTileToTile(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls, 
		blockingIntersections, spireTiles);
	var losResult2 = gridCalculator.calculateLoSFromTileToTile(
		defendingTile.x, defendingTile.y, attackingTile.x, attackingTile.y,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls, 
		blockingIntersections, spireTiles);
	
	//assert
	assert.equal(expectedLoS1, losResult1, "path not blocked" );
	assert.equal(expectedLoS2, losResult2, "path blocked" );
});

QUnit.module( "4 The lines cannot overlap (4)." );
QUnit.test("from defender to attacker", function( assert ) {
	//arrange
	var attackingPoint = { x: 3, y: 1 };
	var defendingPoint1 = { x: 1, y: 1 };
	var defendingPoint2 = { x: 2, y: 1 };
	var gridCalculator = GridCalculator();
	var expectedPathOverlaps = true;

	//act
	var pathOverlaps = gridCalculator.pathsOverlap(attackingPoint, defendingPoint1, defendingPoint2);
	
	//assert
	assert.equal(expectedPathOverlaps, pathOverlaps, "paths overlap" );
});

QUnit.module( "5,6 Line of sight can be traced through the target (5). Figures onopposite sides of the end of a wall have line of sight to each other (6)" );
QUnit.test("5.1 los through tile", function( assert ) {
	//arrange
	var blockers = [];
	var offMapTiles = [];
	var blockingTiles = [];
	var blockingEdges = [];
	var spireTiles = [];
	var walls = [
		[
			{ x: 2, y: 0 },
			{ x: 2, y: 1 }
		]
	];
	var blockingIntersections = [
		{
            x: 2,
            y: 0,
            connections:[
                {
                    x:1,
                    y:0
                },
                {
                    x:3,
                    y:0
                },
                {
                    x:2,
                    y:1
                }
            ]
        }
	];
	var gridCalculator = GridCalculator();
	var attackingTile = { x: 1, y: 0 };
	var defendingTile = { x: 2, y: 0 };
	var attackingCorner = { x: 2, y: 1 };
	var defendingCorner1 = { x: 3, y: 0 };
	var defendingCorner2 = { x: 3, y: 1 };
	var expectedLoS1 = true;
	var expectedLoS2 = true;
	var expectedLoS3 = true;

	//act
	var losResult1 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner1,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);
	var losResult2 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner2,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);
	var losResult3 = gridCalculator.calculateLoSFromTileToTile(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls, 
		blockingIntersections, spireTiles);
	
	//assert
	assert.equal(expectedLoS1, losResult1, "path not blocked" );
	assert.equal(expectedLoS2, losResult2, "path not blocked" );
	assert.equal(expectedLoS3, losResult3, "los possible" );
});

QUnit.test("5.2 los through tile", function( assert ) {
	//arrange
	var blockers = [];
	var offMapTiles = [];
	var blockingTiles = [];
	var blockingEdges = [];
	var spireTiles = [];
	var walls = [
		[
			{ x: 2, y: 0 },
			{ x: 2, y: 1 }
		]
	];
	var blockingIntersections = [
		{
            x: 2,
            y: 0,
            connections:[
                {
                    x:1,
                    y:0
                },
                {
                    x:3,
                    y:0
                },
                {
                    x:2,
                    y:1
                }
            ]
        }
	];
	var gridCalculator = GridCalculator();
	var attackingTile = { x: 2, y: 0 };
	var defendingTile = { x: 1, y: 0 };
	var attackingCorner = { x: 2, y: 1 };
	var defendingCorner1 = { x: 1, y: 0 };
	var defendingCorner2 = { x: 1, y: 1 };
	var expectedLoS1 = true;
	var expectedLoS2 = true;
	var expectedLoS3 = true;

	//act
	var losResult1 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner1,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);
	var losResult2 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner2,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);
	var losResult3 = gridCalculator.calculateLoSFromTileToTile(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls, 
		blockingIntersections, spireTiles);
	
	//assert
	assert.equal(expectedLoS1, losResult1, "path not blocked" );
	assert.equal(expectedLoS2, losResult2, "path not blocked" );
	assert.equal(expectedLoS3, losResult3, "los possible" );
});

QUnit.module( "7 A figure can trace line of sight through itself and through its target (7)." );
QUnit.test("7 los through tile, between blockers", function( assert ) {
	//arrange
	var attackingTile = { x: 0, y: 0 };
	var defendingTile = { x: 5, y: 1 };
	var blockers = [
		{ x: 3, y: 0 },
		{ x: 1, y: 1 },
	];
	var offMapTiles = [];
	var blockingTiles = [];
	var blockingEdges = [];
	var spireTiles = [];
	var walls = [];
	var blockingIntersections = [];

	var gridCalculator = GridCalculator();
	var attackingCorner = { x: 0, y: 0 };
	var defendingCorner1 = { x: 5, y: 2 };
	var defendingCorner2 = { x: 6, y: 2 };
	var expectedLoS1 = true;
	var expectedLoS2 = true;
	var expectedLoS3 = true;

	//act
	var losResult1 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner1,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);
	var losResult2 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner2,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);
	var losResult3 = gridCalculator.calculateLoSFromTileToTile(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);
	
	//assert
	assert.equal(expectedLoS1, losResult1, "path not blocked" );
	assert.equal(expectedLoS2, losResult2, "path not blocked" );
	assert.equal(expectedLoS3, losResult3, "los possible" );
});

QUnit.module( "8 Line of sight can be traced parallel along a wall (8), blocked space (9), or door (not pictured)." );
QUnit.test("8.1 los parallel to offmap tile", function( assert ) {
	//arrange
	var attackingTile = { x: 0, y: 1 };
	var defendingTile = { x: 3, y: 1 };
	var offMapTiles = [
		{ x: 0, y: 0 },
		{ x: 1, y: 0 },
	];
	var blockers = [];
	var blockingTiles = [];
	var blockingEdges = [];
	var spireTiles = [];
	var walls = [];
	var blockingIntersections = [];

	var gridCalculator = GridCalculator();
	var attackingCorner = { x: 1, y: 1 };
	var defendingCorner1 = { x: 3, y: 1 };
	var expectedLoS1 = true;

	//act
	var losResult1 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner1,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);
	
	//assert
	assert.equal(expectedLoS1, losResult1, "path not blocked" );
});

QUnit.test("8.2 los parallel to blocking tile", function( assert ) {
	//arrange
	var attackingTile = { x: 0, y: 1 };
	var defendingTile = { x: 3, y: 1 };
	var blockers = [];
	var blockingTiles = [
		{ x: 2, y: 0 },
		{ x: 3, y: 0 },
	];
	var offMapTiles = [];
	var blockingTiles = [];
	var blockingEdges = [];
	var spireTiles = [];
	var walls = [];
	var blockingIntersections = [];

	var gridCalculator = GridCalculator();
	var attackingCorner = { x: 1, y: 1 };
	var defendingCorner1 = { x: 3, y: 1 };
	var expectedLoS1 = true;

	//act
	var losResult1 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner1,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);
	
	//assert
	assert.equal(expectedLoS1, losResult1, "path not blocked" );
});

QUnit.test("8.3 los parallel to walls", function( assert ) {
	//arrange
	var attackingTile = { x: 0, y: 1 };
	var defendingTile = { x: 3, y: 1 };
	var blockers = [];
	var offMapTiles = [];
	var blockingTiles = [];
	var blockingEdges = [];
	var spireTiles = [];
	var walls = [
		[{ x: 0, y:1 }, { x: 1, y: 1 }],
		[{ x: 1, y: 1 }, { x: 2, y: 1 }],
		[{ x: 2, y: 0 }, { x: 2, y: 1 }],
	];
	var blockingIntersections = [
		{
            x: 1,
            y: 1,
            "connections":[
                { x: 0, y: 1 },
                { x: 2, y: 1 }
            ]
		},
		{
            x: 2,
            y: 1,
            "connections":[
                { x: 1, y: 1 },
                { x: 2, y: 0 }
            ]
        },
	];

	var gridCalculator = GridCalculator();
	var attackingCorner = { x: 1, y: 1 };
	var defendingCorner1 = { x: 3, y: 1 };
	var expectedLoS1 = true;

	//act
	var losResult1 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner1,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);
	
	//assert
	assert.equal(expectedLoS1, losResult1, "path not blocked" );
});

QUnit.module( "10, 11 Line of sight can be traced along the corner of a wall (10) or blocked space (11) as long as the line does not enter the blocked space or cross through an edge completely covered by a wall." );
QUnit.test("10.1 trace los along the corner of a wall", function( assert ) {
	//arrange
	var attackingTile = { x: 1, y: 3 };
	var defendingTile = { x: 0, y: 0 };
	var blockers = [];
	var offMapTiles = [];
	var blockingTiles = [];
	var blockingEdges = [];
	var spireTiles = [];
	var walls = [
		[{ x: 1, y: 2 }, { x: 1, y: 3 }]
	];
	var blockingIntersections = [
		{
            x: 1,
            y: 3,
            "connections":[
                { x: 1, y: 2 },
                { x: 0, y: 3 },
                { x: 1, y: 4 }
            ]
		}
	];

	var gridCalculator = GridCalculator();
	var attackingCorner = { x: 2, y: 3 };
	var defendingCorner1 = { x: 0, y: 1 };
	var defendingCorner2 = { x: 1, y: 1 };
	var expectedLoS1 = true;
	var expectedLoS2 = true;
	var expectedLoS3 = true;

	//act
	var losResult1 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner1,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);
	var losResult2 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner2,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);
	var losResult3 = gridCalculator.calculateLoSFromTileToTile(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);

	//assert
	assert.equal(expectedLoS1, losResult1, "path not blocked" );
	assert.equal(expectedLoS2, losResult2, "path not blocked" );
	assert.equal(expectedLoS3, losResult3, "los possible" );
});

QUnit.test("11.1 trace los along a blocked space", function( assert ) {
	//arrange
	var attackingTile = { x: 0, y: 3 };
	var defendingTile = { x: 1, y: 0 };
	var offMapTiles = [{ x: 1, y: 2 }]
	var blockers = [];
	var blockingTiles = [];
	var blockingEdges = [];
	var spireTiles = [];
	var walls = [];
	var blockingIntersections = [];

	var gridCalculator = GridCalculator();
	var attackingCorner = { x: 0, y: 3 };
	var defendingCorner1 = { x: 1, y: 1 };
	var defendingCorner2 = { x: 1, y: 2 };
	var expectedLoS1 = true;
	var expectedLoS2 = true;
	var expectedLoS3 = true;

	//act
	var losResult1 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner1,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);
	var losResult2 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner2,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);
	var losResult3 = gridCalculator.calculateLoSFromTileToTile(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);

	//assert
	assert.equal(expectedLoS1, losResult1, "path not blocked" );
	assert.equal(expectedLoS2, losResult2, "path not blocked" );
	assert.equal(expectedLoS3, losResult3, "los possible" );
});

QUnit.module( "12, 13, 14, 15 Line of sight cannot be traced through doors (12), walls (13), non-target figures (14), or blocking terrain (15)." );
QUnit.test("13.1 Line of sight cannot be traced through walls (13)", function( assert ) {
	//arrange
	var attackingTile = { x: 1, y: 0 };
	var defendingTile = { x: 3, y: 3 };
	var blockers = [];
	var offMapTiles = [];
	var blockingTiles = [];
	var blockingEdges = [];
	var spireTiles = [];
	var walls = [
		[{ x: 2, y: 3 }, { x: 3, y: 3 }]
	];
	var blockingIntersections = [];

	var gridCalculator = GridCalculator();
	var attackingCorner = { x: 2, y: 1 };
	var defendingCorner = { x: 3, y: 4 };
	var expectedLoS = false;

	//act
	var losResult1 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);

	//assert
	assert.equal(expectedLoS, losResult1, "path blocked" );
});

QUnit.test("13.2 Line of sight cannot be traced through wall intersections (13)", function( assert ) {
	//arrange
	var attackingTile = { x: 1, y: 0 };
	var defendingTile = { x: 0, y: 3 };
	var blockers = [];
	var offMapTiles = [];
	var blockingTiles = [];
	var blockingEdges = [];
	var spireTiles = [];
	var walls = [
		[{ x: 0, y: 2 }, { x: 1, y: 2 }],
		[{ x: 1, y: 2 }, { x: 2, y: 2 }]
	];
	var blockingIntersections = [
		{
            x: 1,
            y: 2,
            "connections":[
                { x: 0, y: 2 },
                { x: 2, y: 2 }
            ]
		}
	];

	var gridCalculator = GridCalculator();
	var attackingCorner = { x: 2, y: 1 };
	var defendingCorner = { x: 0, y: 3 };
	var expectedLoS = false;

	//act
	var losResult1 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);

	//assert
	assert.equal(expectedLoS, losResult1, "path blocked" );
});

QUnit.test("14 Line of sight cannot be traced through non-target figures (14)", function( assert ) {
	//arrange
	var attackingTile = { x: 1, y: 0 };
	var defendingTile = { x: 4, y: 2 };
	var blockers = [
		{ x: 3, y: 2 }
	]
	var offMapTiles = [];
	var blockingTiles = [];
	var blockingEdges = [];
	var spireTiles = [];
	var walls = [];
	var blockingIntersections = [];

	var gridCalculator = GridCalculator();
	var attackingCorner = { x: 2, y: 1 };
	var defendingCorner = { x: 4, y: 3 };
	var expectedLoS = false;

	//act
	var losResult1 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);

	//assert
	assert.equal(expectedLoS, losResult1, "path blocked" );
});

QUnit.test("15.1 Line of sight cannot be traced through blocking terrain (15)", function( assert ) {
	//arrange
	var attackingTile = { x: 1, y: 0 };
	var defendingTile = { x: 4, y: 1 };
	var blockers = [];
	var offMapTiles = [];
	var blockingTiles = [];
	var blockingEdges = [
		[
			{ x: 4, y: 1 },
			{ x: 4, y: 2 }
		]
	];
	var spireTiles = [];
	var walls = [];
	var blockingIntersections = [];

	var gridCalculator = GridCalculator();
	var attackingCorner = { x: 2, y: 1 };
	var defendingCorner = { x: 5, y: 2 };
	var expectedLoS = false;

	//act
	var losResult1 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);

	//assert
	assert.equal(expectedLoS, losResult1, "path blocked" );
});

QUnit.test("15.2 Line of sight cannot be traced through blocking terrain (15)", function( assert ) {
	//arrange
	var attackingTile = { x: 1, y: 0 };
	var defendingTile = { x: 4, y: 1 };
	var blockers = [];
	var offMapTiles = [];
	var blockingTiles = [
		{ x: 3, y: 1 }
	];
	var blockingEdges = [];
	var spireTiles = [];
	var walls = [];
	var blockingIntersections = [];

	var gridCalculator = GridCalculator();
	var attackingCorner = { x: 2, y: 1 };
	var defendingCorner = { x: 5, y: 2 };
	var expectedLoS = false;

	//act
	var losResult1 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);

	//assert
	assert.equal(expectedLoS, losResult1, "path blocked" );
});

QUnit.module( "16 Line of sight cannot be traced through the diagonal intersection of any walls or blocking terrain (16)." );
QUnit.test("16 Line of sight cannot be traced through the diagonal intersection", function( assert ) {
	//arrange
	var attackingTile = { x: 1, y: 1 };
	var defendingTile = { x: 0, y: 0 };
	var blockers = [];
	var blockingTiles = [
		{ x: 1, y: 0 }
	];
	var offMapTiles = [];
	var blockingEdges = [];
	var spireTiles = [];
	var walls = [
		[
			{ x: 0, y: 1 },
			{ x: 1, y: 1 }
		],
		[
			{ x: 1, y: 1 },
			{ x: 1, y: 2 }
		]
	];
	var blockingIntersections = [
		{
            x: 1, y: 1,
            connections:[
                {
                    x: 1, y: 0
                },
                {
                    x: 0, y: 1
                },
                {
                    x: 2, y: 1
                },
                {
                    x: 1, y: 2
                }
            ]
        }
	];

	var gridCalculator = GridCalculator();
	var attackingCorner = { x: 1, y: 1 };
	var defendingCorner = { x: 1, y: 1 };
	var expectedLoS = false;

	//act
	var losResult1 = gridCalculator.getLosFromCornerToCorner(
		attackingTile.x, attackingTile.y, defendingTile.x, defendingTile.y,
		attackingCorner, defendingCorner,
		blockers, blockingTiles, offMapTiles, blockingEdges, walls,
		blockingIntersections, spireTiles);

	//assert
	assert.equal(expectedLoS, losResult1, "path blocked" );
});