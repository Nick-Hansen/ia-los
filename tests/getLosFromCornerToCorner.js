
var map_name = '';
var map_width = 0;
var map_height = 0;
var boxWidth = 30;
// Padding
var horizontal_padding = 0;
var vertical_padding = 0;
//space taken by grid (does not include padding)
var grid_width = 0;
var grid_height = 0;
//horizontal space taken by canvas (includes padding)
var canvas_width = 0;
//vertical space taken by canvas (includes padding)
var canvas_height = 0;

var attackingTile = { x: -1, y: -1};
var defendingTile = { x: -1, y: -1};
var blockers = [];
var linesOfSight = {};

var offMapTiles = [];
var walls = [];
var blockingTiles = [];
var blockingEdges = [];
var blockingIntersections = [];

QUnit.test( "hello test", function( assert ) {
	assert.ok( 1 == "1", "Passed!" );
});