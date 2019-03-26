QUnit.module( "no tiles no offMap no blocking tiles no blockers" );
QUnit.test("no tiles no offMap no blocking tiles no blockers", function( assert ) {
	//arrange
	var blockers = [];
	var blockingTiles = [];
	var offMapTiles = [];
	var gridCalculator = GridCalculator();
	var tiles = [];
	var expectedTileBlocked = false;

	//act
	var pathBlocked = gridCalculator.tileBlocked(tiles, null, blockers, blockingTiles, offMapTiles);
	
	//assert
	assert.equal(expectedTileBlocked, pathBlocked, "path not blocked" );
});

QUnit.module( "blockers" );
QUnit.test("1 tiles no blockers", function( assert ) {
	//arrange
	var blockers = [];
	var blockingTiles = [];
	var offMapTiles = [];
	var gridCalculator = GridCalculator();
	var tiles = [
		{ x: 0, y: 0}
	];
	var expectedTileBlocked = false;

	//act
	var pathBlocked = gridCalculator.tileBlocked(tiles, null, blockers, blockingTiles, offMapTiles);
	
	//assert
	assert.equal(expectedTileBlocked, pathBlocked, "path not blocked" );
});

QUnit.test("1 tiles 1 blockers", function( assert ) {
	//arrange
	var blockers = [
		{ x: 0, y: 0}
	];
	var blockingTiles = [];
	var offMapTiles = [];
	var gridCalculator = GridCalculator();
	var tiles = [
		{ x: 0, y: 1 }
	];
	var expectedTileBlocked = false;

	//act
	var pathBlocked = gridCalculator.tileBlocked(tiles, null, blockers, blockingTiles, offMapTiles);
	
	//assert
	assert.equal(expectedTileBlocked, pathBlocked, "path not blocked" );
});

QUnit.test("1 tiles 1 blockers", function( assert ) {
	//arrange
	var blockers = [
		{ x: 0, y: 0}
	];
	var blockingTiles = [];
	var offMapTiles = [];
	var gridCalculator = GridCalculator();
	var tiles = [
		{ x: 0, y: 0 }
	];
	var expectedTileBlocked = true;

	//act
	var pathBlocked = gridCalculator.tileBlocked(tiles, null, blockers, blockingTiles, offMapTiles);
	
	//assert
	assert.equal(expectedTileBlocked, pathBlocked, "path blocked" );
});

QUnit.module( "off map tiles" );
QUnit.test("1 tiles no off map tiles", function( assert ) {
	//arrange
	var blockers = [];
	var blockingTiles = [];
	var offMapTiles = [];
	var gridCalculator = GridCalculator();
	var tiles = [
		{ x: 0, y: 0}
	];
	var expectedTileBlocked = false;

	//act
	var pathBlocked = gridCalculator.tileBlocked(tiles, null, blockers, blockingTiles, offMapTiles);
	
	//assert
	assert.equal(expectedTileBlocked, pathBlocked, "path not blocked" );
});

QUnit.test("1 tiles 1 off map tiles", function( assert ) {
	//arrange
	var blockers = [];
	var blockingTiles = [];
	var offMapTiles = [
		{ x: 0, y: 0}
	];
	var gridCalculator = GridCalculator();
	var tiles = [
		{ x: 0, y: 1 }
	];
	var expectedTileBlocked = false;

	//act
	var pathBlocked = gridCalculator.tileBlocked(tiles, null, blockers, blockingTiles, offMapTiles);
	
	//assert
	assert.equal(expectedTileBlocked, pathBlocked, "path not blocked" );
});

QUnit.test("1 tiles 1 off map tiles", function( assert ) {
	//arrange
	var blockers = [];
	var blockingTiles = [];
	var offMapTiles = [
		{ x: 0, y: 0}
	];
	var gridCalculator = GridCalculator();
	var tiles = [
		{ x: 0, y: 0 }
	];
	var expectedTileBlocked = true;

	//act
	var pathBlocked = gridCalculator.tileBlocked(tiles, null, blockers, blockingTiles, offMapTiles);
	
	//assert
	assert.equal(expectedTileBlocked, pathBlocked, "path blocked" );
});

QUnit.module( "blocking tiles" );
QUnit.test("1 tiles no blocking tiles", function( assert ) {
	//arrange
	var blockers = [];
	var blockingTiles = [];
	var offMapTiles = [];
	var gridCalculator = GridCalculator();
	var tiles = [
		{ x: 0, y: 0}
	];
	var expectedTileBlocked = false;

	//act
	var pathBlocked = gridCalculator.tileBlocked(tiles, null, blockers, blockingTiles, offMapTiles);
	
	//assert
	assert.equal(expectedTileBlocked, pathBlocked, "path not blocked" );
});

QUnit.test("1 tiles 1 blocking tiles", function( assert ) {
	//arrange
	var blockers = [];
	var blockingTiles = [
		{ x: 0, y: 0}
	];
	var offMapTiles = [];
	var gridCalculator = GridCalculator();
	var tiles = [
		{ x: 0, y: 1 }
	];
	var expectedTileBlocked = false;

	//act
	var pathBlocked = gridCalculator.tileBlocked(tiles, null, blockers, blockingTiles, offMapTiles);
	
	//assert
	assert.equal(expectedTileBlocked, pathBlocked, "path not blocked" );
});

QUnit.test("1 tiles 1 blocking tiles", function( assert ) {
	//arrange
	var blockers = [];
	var blockingTiles = [
		{ x: 0, y: 0}
	];
	var offMapTiles = [];
	var gridCalculator = GridCalculator();
	var tiles = [
		{ x: 0, y: 0 }
	];
	var expectedTileBlocked = true;

	//act
	var pathBlocked = gridCalculator.tileBlocked(tiles, null, blockers, blockingTiles, offMapTiles);
	
	//assert
	assert.equal(expectedTileBlocked, pathBlocked, "path blocked" );
});

QUnit.module( "spire" );
QUnit.test("spire removes blocking tiles", function( assert ) {
	//arrange
	var blockers = [];
	var blockingTiles = [
		{ x: 1, y: 0 }
	];
	var offMapTiles = [];
	var gridCalculator = GridCalculator();
	var tiles = [
		{ x: 0, y: 0 },
		{ x: 1, y: 0 }
	];
	var spireTile = { x: 2, y: 0 };
	var expectedTileBlocked = false;

	//act
	var pathBlocked = gridCalculator.tileBlocked(tiles, spireTile, blockers, blockingTiles, offMapTiles);
	
	//assert
	assert.equal(expectedTileBlocked, pathBlocked, "path blocked" );
});

QUnit.test("spire removes blocking tiles", function( assert ) {
	//arrange
	var blockers = [];
	var blockingTiles = [
		{ x: 1, y: 0}
	];
	var offMapTiles = [];
	var gridCalculator = GridCalculator();
	var tiles = [
		{ x: 1, y: 0 },
		{ x: 2, y: 0 },
	];
	var spireTile = { x: 0, y: 0 };
	var expectedTileBlocked = false;

	//act
	var pathBlocked = gridCalculator.tileBlocked(tiles, spireTile, blockers, blockingTiles, offMapTiles);
	
	//assert
	assert.equal(expectedTileBlocked, pathBlocked, "path blocked" );
});

QUnit.test("spire removes blocking tiles", function( assert ) {
	//arrange
	var blockers = [];
	var blockingTiles = [
		{ x: 0, y: 1}
	];
	var offMapTiles = [];
	var gridCalculator = GridCalculator();
	var tiles = [
		{ x: 0, y: 1 },
		{ x: 0, y: 2 },
	];
	var spireTile = { x: 0, y: 0 };
	var expectedTileBlocked = false;

	//act
	var pathBlocked = gridCalculator.tileBlocked(tiles, spireTile, blockers, blockingTiles, offMapTiles);
	
	//assert
	assert.equal(expectedTileBlocked, pathBlocked, "path blocked" );
});

QUnit.test("spire removes blocking tiles", function( assert ) {
	//arrange
	var blockers = [];
	var blockingTiles = [
		{ x: 0, y: 2}
	];
	var offMapTiles = [];
	var gridCalculator = GridCalculator();
	var tiles = [
		{ x: 0, y: 1 },
		{ x: 0, y: 2 },
	];
	var spireTile = { x: 0, y: 3 };
	var expectedTileBlocked = false;

	//act
	var pathBlocked = gridCalculator.tileBlocked(tiles, spireTile, blockers, blockingTiles, offMapTiles);
	
	//assert
	assert.equal(expectedTileBlocked, pathBlocked, "path blocked" );
});