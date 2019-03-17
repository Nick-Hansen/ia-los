var CanvasWrapper = function() {
    'user strict';
    
    //private variables
    var canvas = {};
    var context = {};
    var attackerImage = new Image();
    var defenderImage = new Image();
    var attackerDefenderImage = new Image();
    var blockerImage = new Image();

    //private functions
    function boardClick(event) {
        if (!canvas.getContext) { return; }
        var rect = canvas.getBoundingClientRect();
        var clientX = event.clientX;
        var clientY = event.clientY;
        var xCoordinate = clientX - rect.left;
        var yCoordinate = clientY - rect.top;
        var event = new CustomEvent('boardClick', { detail: { xCoord: xCoordinate, yCoord: yCoordinate } });
        document.dispatchEvent(event)
    }

    //public accessor
    var CanvasWrapper = {};

    //public functions
    CanvasWrapper.init = function (options) {
        //clear state and set variables
        canvas = document.getElementById('canvas');
        context = canvas.getContext("2d");
        canvas.addEventListener('click', boardClick, false);

        var mapImage = new Image();
        var mapImageName = undefined;
        attackerImage.src = './images/attacker.png';
        defenderImage.src = './images/defender.png';
        attackerDefenderImage.src = './images/attacker_defender.png'
        blockerImage.src = './images/blocker.png';
    };

    CanvasWrapper.setDimensions = function(width, height) {
        canvas.width = width;
        canvas.height = height;
    };

    CanvasWrapper.prepareBoard = function(canvasWidth, canvasHeight, gridWidth, gridHeight, horizontalPadding, verticalPadding) {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        context.clearRect(horizontalPadding, verticalPadding, gridWidth, gridHeight);
    };

    CanvasWrapper.drawMap = function(mapImage, rotate, gridWidth, gridHeight, horizontalPadding, verticalPadding) {
        context.save();
		context.translate(canvas.width/2,canvas.height/2);
		context.rotate(rotate * Math.PI);
		var gWidth = (rotate == 0 || rotate == 1) ? gridWidth : gridHeight;
		var gHeight = (rotate == 0 || rotate == 1) ? gridHeight : gridWidth;
		var hPadding = (rotate == 0 || rotate == 1) ? horizontalPadding : verticalPadding;
		var vPadding = (rotate == 0 || rotate == 1) ? verticalPadding : horizontalPadding;
		context.drawImage(mapImage, 0, 0, mapImage.width, mapImage.height,  (-canvas.width/2 + hPadding), (-canvas.height/2 + vPadding), gWidth, gHeight);
		context.restore();
    };

    CanvasWrapper.drawGrid = function(gridWidth, gridHeight, boxWidth, horizontalPadding, verticalPadding) {
        context.beginPath();
        context.strokeStyle = "black";
        for (var x = 0; x <= gridWidth; x += boxWidth) {
            context.moveTo(0.5 + (x + horizontalPadding), verticalPadding);
            context.lineTo(0.5 + x + horizontalPadding, (gridHeight + verticalPadding));
        }
        for (var y = 0; y <= gridHeight; y += boxWidth) {
            context.moveTo(horizontalPadding, 0.5 + y + verticalPadding);
            context.lineTo(gridWidth + horizontalPadding, 0.5 + y + verticalPadding);
        }
        context.lineWidth = 1;
        context.stroke();
    };

    CanvasWrapper.drawOffMapTiles = function(offmapTiles, boxWidth, horizontalPadding, verticalPadding) {
        offMapTiles.forEach((tile) => CanvasWrapper.drawOffMapTile(tile.x, tile.y, boxWidth, horizontalPadding, verticalPadding));
    };

    CanvasWrapper.drawOffMapTile = function(tileX, tileY, boxWidth, horizontalPadding, verticalPadding) {
        var xCoord = (tileX * boxWidth) + horizontalPadding;
        var yCoord = (tileY * boxWidth) + verticalPadding;
        context.fillStyle = 'rgba(0, 0, 0)';
        context.fillRect(xCoord, yCoord, boxWidth, boxWidth);
    };

    CanvasWrapper.drawWalls = function(walls, boxWidth, horizontalPadding, verticalPadding) {
        walls.forEach((wall) => CanvasWrapper.drawWall(wall, boxWidth, horizontalPadding, verticalPadding));
    };

    CanvasWrapper.drawWall = function(wall, boxWidth, horizontalPadding, verticalPadding) {
        context.beginPath();
        context.strokeStyle = "black";
        var startX = (wall[0].x * boxWidth) + horizontalPadding;
        var startY = (wall[0].y * boxWidth) + verticalPadding;
        var endX = (wall[1].x * boxWidth) + horizontalPadding;
        var endY = (wall[1].y * boxWidth) + verticalPadding;
        context.moveTo(1 + startX, 1 + startY);
        context.lineTo(1 + endX, 1 + endY);
        context.moveTo(-1 + startX, -1 + startY);
        context.lineTo(-1 + endX, -1 + endY);
        context.lineWidth = 2;
        context.stroke();
    };

    CanvasWrapper.drawBlockingTiles = function(blockingTiles, boxWidth, horizontalPadding, verticalPadding) {
        blockingTiles.forEach((blockingTile) => CanvasWrapper.drawBlockingTile(blockingTile.x, blockingTile.y, boxWidth, horizontalPadding, verticalPadding));
    };

    CanvasWrapper.drawBlockingTile = function(tileX, tileY, boxWidth, horizontalPadding, verticalPadding) {
        var xCoord = (tileX * boxWidth) + horizontalPadding;
        var yCoord = (tileY * boxWidth) + verticalPadding;
        context.fillStyle = 'rgba(200, 0, 0, 0.5)';
        context.fillRect(xCoord, yCoord, boxWidth, boxWidth);
    };

    CanvasWrapper.drawBlockingEdges = function(blockingEdges, boxWidth, horizontalPadding, verticalPadding) {
        blockingEdges.forEach((blockingEdge) => CanvasWrapper.drawBlockingEdge(blockingEdge, boxWidth, horizontalPadding, verticalPadding));
    };
    
    CanvasWrapper.drawBlockingEdge = function(blockingEdge, boxWidth, horizontalPadding, verticalPadding) {
        context.beginPath();
        context.strokeStyle = "red";
        var startX = (blockingEdge[0].x * boxWidth) + horizontalPadding;
        var startY = (blockingEdge[0].y * boxWidth) + verticalPadding;
        var endX = (blockingEdge[1].x * boxWidth) + horizontalPadding;
        var endY = (blockingEdge[1].y * boxWidth) + verticalPadding;
        context.moveTo(1 + startX, 1 + startY);
        context.lineTo(1 + endX, 1 + endY);
        context.moveTo(-1 + startX, -1 + startY);
        context.lineTo(-1 + endX, -1 + endY);
        context.lineWidth = 2;
        context.stroke();
    };

    CanvasWrapper.drawSpireTiles = function(spireTiles, boxWidth, horizontalPadding, verticalPadding) {
        spireTiles.forEach((spireTile) => CanvasWrapper.drawSpireTile(spireTile.x, spireTile.y, boxWidth, horizontalPadding, verticalPadding));
    };

    CanvasWrapper.drawSpireTile = function(tileX, tileY, boxWidth, horizontalPadding, verticalPadding) {
        var xCoord = (tileX * boxWidth) + horizontalPadding;
        var yCoord = (tileY * boxWidth) + verticalPadding;
        context.fillStyle = 'rgba(300, 300, 300, 0.5)';
        context.fillRect(xCoord, yCoord, boxWidth, boxWidth);
    };
    
    CanvasWrapper.drawBlockingIntersections = function(blockingIntersections, drawConnections, boxWidth, horizontalPadding, verticalPadding) {
        blockingIntersections.forEach((blockingIntersection) => CanvasWrapper.drawBlockingIntersection(blockingIntersection, drawConnections, boxWidth, horizontalPadding, verticalPadding));
    };

    CanvasWrapper.drawBlockingIntersection = function(blockingIntersection, drawConnections, boxWidth, horizontalPadding, verticalPadding) {
        context.beginPath();
        context.strokeStyle = "red";
        var xCoord = (blockingIntersection.x * boxWidth) + horizontalPadding;
        var yCoord = (blockingIntersection.y * boxWidth) + verticalPadding;
        context.arc(xCoord, yCoord, boxWidth / 10, 0, 2 * Math.PI);
        context.fillStyle = 'rgba(200, 0, 0)';
        context.fill();
        context.stroke();
        if (drawConnections) {
            blockingIntersection.connections.forEach((connection) =>
                CanvasWrapper.drawBlockingEdge([{ x: blockingIntersection.x, y: blockingIntersection.y },
                    { x: connection.x, y: connection.y }], boxWidth, horizontalPadding, verticalPadding)
            );
        }
    };

    CanvasWrapper.drawAttackerLOSTiles = function(attackerLOSTiles, boxWidth, horizontalPadding, verticalPadding) {
        attackerLOSTiles.forEach((attackerLOSTile) => CanvasWrapper.drawAttackerLOSTile(attackerLOSTile.x, attackerLOSTile.y, boxWidth, horizontalPadding, verticalPadding));
    };
    
    CanvasWrapper.drawAttackerLOSTile = function(tileX, tileY, boxWidth, horizontalPadding, verticalPadding) {
        var xCoord = (tileX * boxWidth) + horizontalPadding;
        var yCoord = (tileY * boxWidth) + verticalPadding;
        context.fillStyle = 'rgba(255, 255, 0, 0.5)';
        context.fillRect(xCoord, yCoord, boxWidth, boxWidth);
    };

    CanvasWrapper.drawDefenderLOSTiles = function(defenderLOSTiles, boxWidth, horizontalPadding, verticalPadding) {
        defenderLOSTiles.forEach((defenderLOSTile) => CanvasWrapper.drawDefenderLOSTile(defenderLOSTile.x, defenderLOSTile.y, boxWidth, horizontalPadding, verticalPadding));
    };

    CanvasWrapper.drawDefenderLOSTile = function(tileX, tileY, boxWidth, horizontalPadding, verticalPadding) {
        var xCoord = (tileX * boxWidth) + horizontalPadding;
        var yCoord = (tileY * boxWidth) + verticalPadding;
        context.fillStyle = 'rgba(0, 191, 255, 0.5)';
        context.fillRect(xCoord, yCoord, boxWidth, boxWidth);
    };

    CanvasWrapper.drawMutualLOSTiles = function(mutualLOSTiles, boxWidth, horizontalPadding, verticalPadding) {
        mutualLOSTiles.forEach((mutualLOSTiles) => CanvasWrapper.drawMutualLOSTile(mutualLOSTiles.x, mutualLOSTiles.y, boxWidth, horizontalPadding, verticalPadding));
    };

    CanvasWrapper.drawMutualLOSTile = function(tileX, tileY, boxWidth, horizontalPadding, verticalPadding) {
        var xCoord = (tileX * boxWidth) + horizontalPadding;
        var yCoord = (tileY * boxWidth) + verticalPadding;
        context.fillStyle = 'rgba(0, 255, 0, 0.5)';
        context.fillRect(xCoord, yCoord, boxWidth, boxWidth);
    };

    CanvasWrapper.drawAttacker = function(tileX, tileY, boxWidth, horizontalPadding, verticalPadding) {
        context.beginPath();
		context.strokeStyle = "black";
		context.lineWidth = 1;
		var x = (tileX * boxWidth) + horizontalPadding + (0.5 * boxWidth);
		var y = (tileY * boxWidth) + verticalPadding + (0.5 * boxWidth);
		context.arc(x, y, (0.5 * boxWidth), 0, 2 * Math.PI);
		context.fillStyle = 'white';
		context.fill();
		context.stroke();
		CanvasWrapper.drawAttackerIcon(tileX, tileY, boxWidth, horizontalPadding, verticalPadding);
    };

    CanvasWrapper.drawAttackerIcon = function(tileX, tileY, boxWidth, horizontalPadding, verticalPadding) {
        context.drawImage(attackerImage, 0, 0, attackerImage.width, attackerImage.height, 
            (tileX * boxWidth) + horizontalPadding + (0.1 * boxWidth),
            (tileY * boxWidth) + verticalPadding + (0.15 * boxWidth), 
            (0.7 * boxWidth), (0.7 * boxWidth));
    };

    CanvasWrapper.drawDefender = function(tileX, tileY, boxWidth, horizontalPadding, verticalPadding) {
        context.beginPath();
		context.strokeStyle = "black";
		context.lineWidth = 1;
		var x = (tileX * boxWidth) + horizontalPadding + (0.5 * boxWidth);
		var y = (tileY * boxWidth) + verticalPadding + (0.5 * boxWidth);
		context.arc(x, y, (0.5 * boxWidth), 0, 2 * Math.PI);
		context.fillStyle = 'white';
		context.fill();
		context.stroke();
		CanvasWrapper.drawDefenderIcon(tileX, tileY, boxWidth, horizontalPadding, verticalPadding);
    };

    CanvasWrapper.drawDefenderIcon = function(tileX, tileY, boxWidth, horizontalPadding, verticalPadding) {
        context.drawImage(defenderImage, 0, 0, defenderImage.width, defenderImage.height, 
            (tileX * boxWidth) + horizontalPadding,
            (tileY * boxWidth) + verticalPadding, 
            boxWidth, boxWidth);
    };

    CanvasWrapper.drawAttackerDefender = function(tileX, tileY, boxWidth, horizontalPadding, verticalPadding) {
        context.beginPath();
		context.strokeStyle = "black";
		context.lineWidth = 1;
		var x = (tileX * boxWidth) + horizontalPadding + (0.5 * boxWidth);
		var y = (tileY * boxWidth) + verticalPadding + (0.5 * boxWidth);
		context.arc(x, y, (0.5 * boxWidth), 0, 2 * Math.PI);
		context.fillStyle = 'white';
		context.fill();
		context.stroke();
		CanvasWrapper.drawAttackerDefenderIcon(tileX, tileY, boxWidth, horizontalPadding, verticalPadding);
    };

    CanvasWrapper.drawAttackerDefenderIcon = function(tileX, tileY, boxWidth, horizontalPadding, verticalPadding) {
        context.drawImage(attackerDefenderImage, 0, 0, attackerDefenderImage.width, attackerDefenderImage.height, 
            (tileX * boxWidth) + horizontalPadding,
            (tileY * boxWidth) + verticalPadding, 
            boxWidth, boxWidth);
    };

    CanvasWrapper.drawBlockers = function(blockers, boxWidth, horizontalPadding, verticalPadding) {
        blockers.forEach((blocker) => CanvasWrapper.drawBlocker(blocker.x, blocker.y, boxWidth, horizontalPadding, verticalPadding));
    };

    CanvasWrapper.drawBlocker = function(tileX, tileY, boxWidth, horizontalPadding, verticalPadding) {
        if (tileX != -1 && tileY != -1) {
            context.beginPath();
            context.strokeStyle = "black";
            context.lineWidth = 1;
            var x = (tileX * boxWidth) + horizontalPadding + (0.5 * boxWidth);
            var y = (tileY * boxWidth) + verticalPadding + (0.5 * boxWidth);
            context.arc(x, y, (0.5 * boxWidth), 0, 2 * Math.PI);
            context.fillStyle = 'white';
            context.fill();
            context.stroke();
            CanvasWrapper.drawBlockerIcon(tileX, tileY, boxWidth, horizontalPadding, verticalPadding);
        }
    };

    CanvasWrapper.drawBlockerIcon = function(tileX, tileY, boxWidth, horizontalPadding, verticalPadding) {
        context.drawImage(blockerImage, 0, 0, blockerImage.width, blockerImage.height, 
            (tileX * boxWidth) + horizontalPadding + (0.15 * boxWidth),
            (tileY * boxWidth) + verticalPadding + (0.2 * boxWidth), 
            (0.7 * boxWidth), (0.7 * boxWidth));
    }
    
    CanvasWrapper.drawLineOfSight = function(attackingCorner, defendingCorner, boxWidth, horizontalPadding, verticalPadding) {
        context.beginPath();
        context.strokeStyle = "red";
        context.lineWidth = 1;
        var startX = (attackingCorner.x * boxWidth) + horizontalPadding;
        var startY = (attackingCorner.y * boxWidth) + verticalPadding;
        var endX = (defendingCorner.x * boxWidth) + horizontalPadding;
        var endY = (defendingCorner.y * boxWidth) + verticalPadding;
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
    }

    //return public APIs
    return CanvasWrapper;
};