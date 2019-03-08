var GridCalculator = function() {
    'user strict';
    
    //private variables
    var xyz = 1;

    //private functions
    
    //public accessor
    var GridCalculator = {};

    //public functions
    GridCalculator.init = function (options) {
        //clear state and set variables
    };

    GridCalculator.rotateTilesCounterClockwise = function(tiles, previousMapWidth) {
        var translatedTiles = [];
        tiles.forEach(function(tile) {
            var translatedTile = GridCalculator.rotateTileCounterClockwise(tile.x, tile.y, previousMapWidth);
            translatedTiles.push(translatedTile);
        });
        return translatedTiles;
    };
    
    GridCalculator.rotateTileCounterClockwise = function(tileX, tileY, previousMapWidth) {
        if (tileX == -1 || tileY == -1) {
            return { x: tileX, y: tileY };
        }
        else{
            var previousTileY = tileY;
            var newTileY = (previousMapWidth - 1) - tileX;
            return {
                x: previousTileY,
                y: newTileY
            };
        }
    };

    GridCalculator.rotateTilesClockwise = function(tiles, previousMapHeight) {
        var translatedTiles = [];
        tiles.forEach(function(tile) {
            var translatedTile = GridCalculator.rotateTileClockwise(tile.x, tile.y, previousMapHeight);
            translatedTiles.push(translatedTile);
        });
        return translatedTiles;
    };
    
    GridCalculator.rotateTileClockwise = function(tileX, tileY, previousMapHeight) {
        if (tileX == -1 || tileY == -1) {
            return { x: tileX, y: tileY };
        }
        else{
            var previousTileX = tileX;
            newTileX = (previousMapHeight - 1) - tileY;
            
            return {
                x: newTileX,
                y: previousTileX
            };
        }
    };

    GridCalculator.rotateEdgesCounterClockwise = function(edges, previousMapWidth) {
        var translatedEdges = [];
        edges.forEach(function(edge) {
            var translatedEdge = GridCalculator.rotateEdgeCounterClockwise(edge, previousMapWidth);
            translatedEdges.push(translatedEdge);
        });
        return translatedEdges;
    };

    GridCalculator.rotateEdgeCounterClockwise = function(edge, previousMapWidth) {
        var previousEdgeY = -1;
        var translatedEdge = [{ x:-1, y:-1 }, { x:-1, y:-1 }];
		if (edge[0].y != edge[1].y) {
			previousEdgeY = edge[0].y;
			translatedEdge[0].y = previousMapWidth - edge[0].x;
			translatedEdge[0].x = previousEdgeY;

			previousEdgeY = edge[1].y;
			translatedEdge[1].y = previousMapWidth - edge[1].x;
			translatedEdge[1].x = previousEdgeY;
		} else {
			//edges always run top to bottom, so we flip our 2 points
			previousEdgeY = edge[0].y;
			edge_0_y = previousMapWidth - edge[0].x;
			edge_0_x = previousEdgeY;

			previousEdgeY = edge[1].y;
			edge_1_y = previousMapWidth - edge[1].x;
			edge_1_x = previousEdgeY;

			translatedEdge[0].y = edge_1_y;
			translatedEdge[0].x = edge_1_x;
			translatedEdge[1].y = edge_0_y;
			translatedEdge[1].x = edge_0_x;
        }
        return translatedEdge
    };

    GridCalculator.rotateEdgesClockwise = function(edges, previousMapHeight) {
        var translatedEdges = [];
        edges.forEach(function(edge) {
            var translatedEdge = GridCalculator.rotateEdgeClockwise(edge, previousMapHeight);
            translatedEdges.push(translatedEdge);
        });
        return translatedEdges;
    };

    GridCalculator.rotateEdgeClockwise = function(edge, previousMapHeight) {
        var previousEdgeX = -1;
        var translatedEdge = [{ x:-1, y:-1 }, { x:-1, y:-1 }];
        if (edge[0].y == edge[1].y) {
			previousEdgeX = edge[0].x;
			translatedEdge[0].x = previousMapHeight - edge[0].y;
			translatedEdge[0].y = previousEdgeX;

			previousEdgeX = edge[1].x;
			translatedEdge[1].x = previousMapHeight - edge[1].y;
			translatedEdge[1].y = previousEdgeX;
		} else {
			//since edges always run left to right, we must flip our points
			previousEdgeX = edge[0].x;
			edge_0_x = previousMapHeight - edge[0].y;
			edge_0_y = previousEdgeX;

			previousEdgeX = edge[1].x;
			edge_1_x = previousMapHeight - edge[1].y;
			edge_1_y = previousEdgeX;

			translatedEdge[0].x = edge_1_x;
			translatedEdge[0].y = edge_1_y;
			translatedEdge[1].x = edge_0_x;
			translatedEdge[1].y = edge_0_y;
        }
        return translatedEdge
    };

    GridCalculator.rotateIntersectionsCounterClockwise = function(intersections, previousMapWidth) {
        var translatedIntersections = [];
        intersections.forEach(function(intersection) {
            var translatedIntersection = GridCalculator.rotateIntersectionCounterClockwise(intersection, previousMapWidth);
            translatedIntersections.push(translatedIntersection);
        });
        return translatedIntersections;
    };

    GridCalculator.rotateIntersectionCounterClockwise = function(intersection, previousMapWidth) {
        var translatedIntersection = GridCalculator.rotatePointCounterClockwise(intersection, previousMapWidth);
        
        var translatedConnections = []
        intersection.connections.forEach(function (connection) {
            var translatedConnection = GridCalculator.rotatePointCounterClockwise(connection, previousMapWidth);
            translatedConnections.push(translatedConnection);
        });

        return {
            x: translatedIntersection.x,
            y: translatedIntersection.y,
            connections: translatedConnections
        }
    };
    
    GridCalculator.rotatePointCounterClockwise = function(point, previousMapWidth) {
        var previousPointY = point.y;
        var pointY = previousMapWidth - point.x;
        var pointX = previousPointY;
        return { x: pointX, y: pointY }
    }

    GridCalculator.rotateIntersectionsClockwise = function(intersections, previousMapHeight) {
        var translatedIntersections = [];
        intersections.forEach(function(intersection) {
            var translatedIntersection = GridCalculator.rotateIntersectionClockwise(intersection, previousMapHeight);
            translatedIntersections.push(translatedIntersection);
        });
        return translatedIntersections;
    };

    GridCalculator.rotateIntersectionClockwise = function(intersection, previousMapHeight) {
        var translatedIntersection = GridCalculator.rotatePointClockwise(intersection, previousMapHeight);
        
        var translatedConnections = []
        intersection.connections.forEach(function (connection) {
            var translatedConnection = GridCalculator.rotatePointClockwise(connection, previousMapHeight);
            translatedConnections.push(translatedConnection);
        });

        return {
            x: translatedIntersection.x,
            y: translatedIntersection.y,
            connections: translatedConnections
        }
    };
    
    GridCalculator.rotatePointClockwise = function(point, previousMapHeight) {
        var previousPointX = point.x;
        var pointX = previousMapHeight - point.y;
        var pointY = previousPointX;
            
        return { x: pointX, y: pointY }
    }

    //return public APIs
    return GridCalculator;
};