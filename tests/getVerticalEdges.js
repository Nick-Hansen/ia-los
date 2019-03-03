
var map_width = 0;
var map_height = 0;

var attackingTile = { x: -1, y: -1};
var defendingTile = { x: -1, y: -1};
var blockers = [];
var linesOfSight = {};

var offMapTiles = [];
var walls = [];
var blockingTiles = [];
var blockingEdges = [];
var blockingIntersections = [];

QUnit.test("basics", function( assert ) {
	//arrange

	//act
	//assert
	assert.ok( 1 == "1", "Passed!" );
});