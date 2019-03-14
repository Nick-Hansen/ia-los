var GridCalculator = function() {
    'user strict';
    
    //private variables
    var offMapTiles = [];
    var walls = [];
    var blockingTiles = [];
    var blockingEdges = [];
    var blockingIntersections = [];
    var spireTiles = [];
    var attackingTile = { x: -1, y: -1};
    var defendingTile = { x: -1, y: -1};
    var blockers = [];

    //private functions
    
    //public accessor
    var GridCalculator = {};

    //public functions
    GridCalculator.init = function (options) {
        offMapTiles = options.offMapTiles;
        walls = options.walls;
        blockingTiles = options.blockingTiles;
        blockingEdges = options.blockingEdges;
        blockingIntersections = options.blockingIntersections;
        spireTiles = options.spireTiles;
        attackingTile = options.attackingTile;
        defendingTile = options.defendingTile;
        blockers = options.blockers;
    };

    GridCalculator.calculateAttackerLoSTiles = function(fromTileX, fromTileY, width, height) {
        var attackerLOSTiles = [];
        //check to see attacking tile present
        if (fromTileX != -1 && fromTileY != -1) {
            for (var w = 0; w < width; w++) {
                for (var h = 0; h < height; h++) {
                    var attckerHasLoSToTile = GridCalculator.calculateLoSFromTileToTile(fromTileX, fromTileY, w, h);
                    if (attckerHasLoSToTile == true) {
                        attackerLOSTiles.push({ "x": w, "y": h });
                    }
                }
            }
        }
        return attackerLOSTiles;
    }

    GridCalculator.calculateDefenderLoSTiles = function(toTileX, toTileY, width, height) {
        var defenderLOSTiles = [];
        if (toTileX != -1 && toTileY != -1) {
            for (var w = 0; w < width; w++) {
                for (var h = 0; h < height; h++) {
                    var attckerHasLoSToTile = GridCalculator.calculateLoSFromTileToTile(w, h, toTileX, toTileY);
                    if (attckerHasLoSToTile == true) {
                        defenderLOSTiles.push({ "x": w, "y": h });
                    }
                }
            }
        }
        return defenderLOSTiles;
    }

    GridCalculator.calculateLoSFromTileToTile = function(fromTileX, fromTileY, toTileX, toTileY) {
        if (fromTileX == toTileX && fromTileY == toTileY) { return true; }
        var offMapTileIndex = offMapTiles.findIndex(function(off_map_tile) {
            return (off_map_tile.x == toTileX && off_map_tile.y == toTileY) ||
                (off_map_tile.x == fromTileX && off_map_tile.y == fromTileY);
        })
        if (offMapTileIndex > -1) { return false; }
    
        var from_tl = { x: fromTileX, y: fromTileY };
        var from_tr = { x: fromTileX + 1, y: fromTileY };
        var from_bl = { x: fromTileX, y: fromTileY + 1 };
        var from_br = { x: fromTileX + 1, y: fromTileY + 1 };
        var to_tl = { x: toTileX, y: toTileY };
        var to_tr = { x: toTileX + 1, y: toTileY };
        var to_bl = { x: toTileX, y: toTileY + 1 };
        var to_br = { x: toTileX + 1, y: toTileY + 1 };
        var to_top = { x: toTileX + 0.5, y: toTileY };
        var to_right = { x: toTileX + 1, y: toTileY + 0.5 };
        var to_bottom = { x: toTileX + 0.5, y: toTileY + 1 };
        var to_left = { x: toTileX, y: toTileY + 0.5 };
    
        var tl_to_tl = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_tl, to_tl);
        var tl_to_tr = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_tl, to_tr);
        var tl_to_br = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_tl, to_br);
        var tl_to_bl = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_tl, to_bl);
        var tl_to_top = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, from_tl, to_top);
        var tl_to_right = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, from_tl, to_right);
        var tl_to_bottom = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, from_tl, to_bottom);
        var tl_to_left = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, from_tl, to_left);
        var tl_to_tl_tr_overlaps = GridCalculator.pathsOverlap(from_tl, to_tl, to_tr);
        var tl_to_tr_br_overlaps = GridCalculator.pathsOverlap(from_tl, to_tr, to_br);
        var tl_to_bl_br_overlaps = GridCalculator.pathsOverlap(from_tl, to_bl, to_br);
        var tl_to_tl_bl_overlaps = GridCalculator.pathsOverlap(from_tl, to_tl, to_bl);
        if ((tl_to_tl && tl_to_tr && tl_to_top && !tl_to_tl_tr_overlaps) ||
            (tl_to_tr && tl_to_br && tl_to_right && !tl_to_tr_br_overlaps) ||
            (tl_to_bl && tl_to_br && tl_to_bottom && !tl_to_bl_br_overlaps) ||
            (tl_to_tl && tl_to_bl && tl_to_left && !tl_to_tl_bl_overlaps)) {
            return true;
        }
    
        var tr_to_tl = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_tr, to_tl);
        var tr_to_tr = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_tr, to_tr);
        var tr_to_br = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_tr, to_br);
        var tr_to_bl = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_tr, to_bl);
        var tr_to_top = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, from_tr, to_top);
        var tr_to_right = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, from_tr, to_right);
        var tr_to_bottom = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, from_tr, to_bottom);
        var tr_to_left = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, from_tr, to_left);
        var tr_to_tl_tr_overlaps = GridCalculator.pathsOverlap(from_tr, to_tl, to_tr);
        var tr_to_tr_br_overlaps = GridCalculator.pathsOverlap(from_tr, to_tr, to_br);
        var tr_to_bl_br_overlaps = GridCalculator.pathsOverlap(from_tr, to_bl, to_br);
        var tr_to_tl_bl_overlaps = GridCalculator.pathsOverlap(from_tr, to_tl, to_bl);
        if ((tr_to_tl && tr_to_tr && tr_to_top && !tr_to_tl_tr_overlaps) ||
            (tr_to_tr && tr_to_br && tr_to_right && !tr_to_tr_br_overlaps) ||
            (tr_to_bl && tr_to_br && tr_to_bottom && !tr_to_bl_br_overlaps) ||
            (tr_to_tl && tr_to_bl && tr_to_left && !tr_to_tl_bl_overlaps)) {
            return true;
        }
    
        var bl_to_tl = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_bl, to_tl);
        var bl_to_tr = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_bl, to_tr);
        var bl_to_br = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_bl, to_br);
        var bl_to_bl = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_bl, to_bl);
        var bl_to_top = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, from_bl, to_top);
        var bl_to_right = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, from_bl, to_right);
        var bl_to_bottom = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, from_bl, to_bottom);
        var bl_to_left = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, from_bl, to_left);
        var bl_to_tl_tr_overlaps = GridCalculator.pathsOverlap(from_bl, to_tl, to_tr);
        var bl_to_tr_br_overlaps = GridCalculator.pathsOverlap(from_bl, to_tr, to_br);
        var bl_to_bl_br_overlaps = GridCalculator.pathsOverlap(from_bl, to_bl, to_br);
        var bl_to_tl_bl_overlaps = GridCalculator.pathsOverlap(from_bl, to_tl, to_bl);
        if ((bl_to_tl && bl_to_tr && bl_to_top && !bl_to_tl_tr_overlaps) ||
            (bl_to_tr && bl_to_br && bl_to_right && !bl_to_tr_br_overlaps) ||
            (bl_to_bl && bl_to_br && bl_to_bottom && !bl_to_bl_br_overlaps) ||
            (bl_to_tl && bl_to_bl && bl_to_left && !bl_to_tl_bl_overlaps)) {
            return true;
        }
    
        var br_to_tl = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_br, to_tl);
        var br_to_tr = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_br, to_tr);
        var br_to_br = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_br, to_br);
        var br_to_bl = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, from_br, to_bl);
        var br_to_top = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, from_br, to_top);
        var br_to_right = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, from_br, to_right);
        var br_to_bottom = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, from_br, to_bottom);
        var br_to_left = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, from_br, to_left);
        var br_to_tl_tr_overlaps = GridCalculator.pathsOverlap(from_br, to_tl, to_tr);
        var br_to_tr_br_overlaps = GridCalculator.pathsOverlap(from_br, to_tr, to_br);
        var br_to_bl_br_overlaps = GridCalculator.pathsOverlap(from_br, to_bl, to_br);
        var br_to_tl_bl_overlaps = GridCalculator.pathsOverlap(from_br, to_tl, to_bl);
        if ((br_to_tl && br_to_tr && br_to_top &&!br_to_tl_tr_overlaps) ||
            (br_to_tr && br_to_br && br_to_right && !br_to_tr_br_overlaps) ||
            (br_to_bl && br_to_br && br_to_bottom && !br_to_bl_br_overlaps) ||
            (br_to_tl && br_to_bl && br_to_left && !br_to_tl_bl_overlaps)) {
            return true;
        }
    
        return false;
    }

    GridCalculator.calculateLoSFromAttackerToDefender = function(fromTileX, fromTileY, toTileX, toTileY, callback) {
        if ((fromTileX != -1 && fromTileY != -1 &&
            toTileX != -1 && toTileY != -1) == false) {
           return;
       }
       var attacker_tl = { x: fromTileX, y: fromTileY };
       var attacker_tr = { x: fromTileX + 1, y: fromTileY };
       var attacker_bl = { x: fromTileX, y: fromTileY + 1 };
       var attacker_br = { x: fromTileX + 1, y: fromTileY + 1 };
       var defender_tl = { x: toTileX, y: toTileY };
       var defender_tr = { x: toTileX + 1, y: toTileY };
       var defender_bl = { x: toTileX, y: toTileY + 1 };
       var defender_br = { x: toTileX + 1, y: toTileY + 1 };
       var defender_top = { x: toTileX + 0.5, y: toTileY };
       var defender_right = { x: toTileX + 1, y: toTileY + 0.5 };
       var defender_bottom = { x: toTileX + 0.5, y: toTileY + 1 };
       var defender_left = { x: toTileX, y: toTileY + 0.5 };
       
       var tl_to_tl_tr_overlaps = GridCalculator.pathsOverlap(attacker_tl, defender_tl, defender_tr);
       var tl_to_tr_br_overlaps = GridCalculator.pathsOverlap(attacker_tl, defender_tr, defender_br);
       var tl_to_bl_br_overlaps = GridCalculator.pathsOverlap(attacker_tl, defender_bl, defender_br);
       var tl_to_tl_bl_overlaps = GridCalculator.pathsOverlap(attacker_tl, defender_tl, defender_bl);
       var tr_to_tl_tr_overlaps = GridCalculator.pathsOverlap(attacker_tr, defender_tl, defender_tr);
       var tr_to_tr_br_overlaps = GridCalculator.pathsOverlap(attacker_tr, defender_tr, defender_br);
       var tr_to_bl_br_overlaps = GridCalculator.pathsOverlap(attacker_tr, defender_bl, defender_br);
       var tr_to_tl_bl_overlaps = GridCalculator.pathsOverlap(attacker_tr, defender_tl, defender_bl);
       var bl_to_tl_tr_overlaps = GridCalculator.pathsOverlap(attacker_bl, defender_tl, defender_tr);
       var bl_to_tr_br_overlaps = GridCalculator.pathsOverlap(attacker_bl, defender_tr, defender_br);
       var bl_to_bl_br_overlaps = GridCalculator.pathsOverlap(attacker_bl, defender_bl, defender_br);
       var bl_to_tl_bl_overlaps = GridCalculator.pathsOverlap(attacker_bl, defender_tl, defender_bl);
       var br_to_tl_tr_overlaps = GridCalculator.pathsOverlap(attacker_br, defender_tl, defender_tr);
       var br_to_tr_br_overlaps = GridCalculator.pathsOverlap(attacker_br, defender_tr, defender_br);
       var br_to_bl_br_overlaps = GridCalculator.pathsOverlap(attacker_br, defender_bl, defender_br);
       var br_to_tl_bl_overlaps = GridCalculator.pathsOverlap(attacker_br, defender_tl, defender_bl);
   
       var tl_to_tl = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_tl, defender_tl);
       var tl_to_tr = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_tl, defender_tr);
       var tl_to_br = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_tl, defender_br);
       var tl_to_bl = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_tl, defender_bl);
       var tl_to_top = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, attacker_tl, defender_top);
       var tl_to_right = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, attacker_tl, defender_right);
       var tl_to_bottom = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, attacker_tl, defender_bottom);
       var tl_to_left = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, attacker_tl, defender_left);
       var tl_to_tl_tr_enabled = tl_to_tl && tl_to_tr && tl_to_top && !tl_to_tl_tr_overlaps;
       var tl_to_tr_br_enabled = tl_to_tr && tl_to_br && tl_to_right && !tl_to_tr_br_overlaps;
       var tl_to_bl_br_enabled = tl_to_bl && tl_to_br && tl_to_bottom && !tl_to_bl_br_overlaps;
       var tl_to_tl_bl_enabled = tl_to_tl && tl_to_bl && tl_to_left && !tl_to_tl_bl_overlaps;
   
       var tr_to_tl = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_tr, defender_tl);
       var tr_to_tr = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_tr, defender_tr);
       var tr_to_br = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_tr, defender_br);
       var tr_to_bl = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_tr, defender_bl);
       var tr_to_top = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, attacker_tr, defender_top);
       var tr_to_right = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, attacker_tr, defender_right);
       var tr_to_bottom = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, attacker_tr, defender_bottom);
       var tr_to_left = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, attacker_tr, defender_left);
       var tr_to_tl_tr_enabled = tr_to_tl && tr_to_tr && tr_to_top && !tr_to_tl_tr_overlaps;
       var tr_to_tr_br_enabled = tr_to_tr && tr_to_br && tr_to_right && !tr_to_tr_br_overlaps;
       var tr_to_bl_br_enabled = tr_to_bl && tr_to_br && tr_to_bottom && !tr_to_bl_br_overlaps;
       var tr_to_tl_bl_enabled = tr_to_tl && tr_to_bl && tr_to_left && !tr_to_tl_bl_overlaps;
   
       var bl_to_tl = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_bl, defender_tl);
       var bl_to_tr = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_bl, defender_tr);
       var bl_to_br = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_bl, defender_br);
       var bl_to_bl = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_bl, defender_bl);
       var bl_to_top = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, attacker_bl, defender_top);
       var bl_to_right = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, attacker_bl, defender_right);
       var bl_to_bottom = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, attacker_bl, defender_bottom);
       var bl_to_left = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, attacker_bl, defender_left);
       var bl_to_tl_tr_enabled = bl_to_tl && bl_to_tr && bl_to_top && !bl_to_tl_tr_overlaps;
       var bl_to_tr_br_enabled = bl_to_tr && bl_to_br && bl_to_right && !bl_to_tr_br_overlaps;
       var bl_to_bl_br_enabled = bl_to_bl && bl_to_br && bl_to_bottom && !bl_to_bl_br_overlaps;
       var bl_to_tl_bl_enabled = bl_to_tl && bl_to_bl && bl_to_left && !bl_to_tl_bl_overlaps;
   
       var br_to_tl = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_br, defender_tl);
       var br_to_tr = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_br, defender_tr);
       var br_to_br = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_br, defender_br);
       var br_to_bl = GridCalculator.getLosFromCornerToCorner(fromTileX, fromTileY, toTileX, toTileY, attacker_br, defender_bl);
       var br_to_top = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, attacker_br, defender_top);
       var br_to_right = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, attacker_br, defender_right);
       var br_to_bottom = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, attacker_br, defender_bottom);
       var br_to_left = GridCalculator.getLosFromPointToPoint(fromTileX, fromTileY, toTileX, toTileY, attacker_br, defender_left);
       var br_to_tl_tr_enabled = br_to_tl && br_to_tr && br_to_top && !br_to_tl_tr_overlaps;
       var br_to_tr_br_enabled = br_to_tr && br_to_br && br_to_right && !br_to_tr_br_overlaps;
       var br_to_bl_br_enabled = br_to_bl && br_to_br && br_to_bottom && !br_to_bl_br_overlaps;
       var br_to_tl_bl_enabled = br_to_tl && br_to_bl && br_to_left && !br_to_tl_bl_overlaps;
   
       var losPaths = [
           { key: 'tl_to_tl_tr', attacker: { x: attacker_tl.x, y: attacker_tl.y }, defender1: { x: defender_tl.x, y: defender_tl.y }, defender2: { x: defender_tr.x, y: defender_tr.y }, enabled: tl_to_tl_tr_enabled },
           { key: 'tl_to_tr_br', attacker: { x: attacker_tl.x, y: attacker_tl.y }, defender1: { x: defender_tr.x, y: defender_tr.y }, defender2: { x: defender_br.x, y: defender_br.y }, enabled: tl_to_tr_br_enabled },
           { key: 'tl_to_bl_br', attacker: { x: attacker_tl.x, y: attacker_tl.y }, defender1: { x: defender_bl.x, y: defender_bl.y }, defender2: { x: defender_br.x, y: defender_br.y }, enabled: tl_to_bl_br_enabled },
           { key: 'tl_to_tl_bl', attacker: { x: attacker_tl.x, y: attacker_tl.y }, defender1: { x: defender_tl.x, y: defender_tl.y }, defender2: { x: defender_bl.x, y: defender_bl.y }, enabled: tl_to_tl_bl_enabled },
           { key: 'tr_to_tl_tr', attacker: { x: attacker_tr.x, y: attacker_tr.y }, defender1: { x: defender_tl.x, y: defender_tl.y }, defender2: { x: defender_tr.x, y: defender_tr.y }, enabled: tr_to_tl_tr_enabled },
           { key: 'tr_to_tr_br', attacker: { x: attacker_tr.x, y: attacker_tr.y }, defender1: { x: defender_tr.x, y: defender_tr.y }, defender2: { x: defender_br.x, y: defender_br.y }, enabled: tr_to_tr_br_enabled },
           { key: 'tr_to_bl_br', attacker: { x: attacker_tr.x, y: attacker_tr.y }, defender1: { x: defender_bl.x, y: defender_bl.y }, defender2: { x: defender_br.x, y: defender_br.y }, enabled: tr_to_bl_br_enabled },
           { key: 'tr_to_tl_bl', attacker: { x: attacker_tr.x, y: attacker_tr.y }, defender1: { x: defender_tl.x, y: defender_tl.y }, defender2: { x: defender_bl.x, y: defender_bl.y }, enabled: tr_to_tl_bl_enabled },
           { key: 'bl_to_tl_tr', attacker: { x: attacker_bl.x, y: attacker_bl.y }, defender1: { x: defender_tl.x, y: defender_tl.y }, defender2: { x: defender_tr.x, y: defender_tr.y }, enabled: bl_to_tl_tr_enabled },
           { key: 'bl_to_tr_br', attacker: { x: attacker_bl.x, y: attacker_bl.y }, defender1: { x: defender_tr.x, y: defender_tr.y }, defender2: { x: defender_br.x, y: defender_br.y }, enabled: bl_to_tr_br_enabled },
           { key: 'bl_to_bl_br', attacker: { x: attacker_bl.x, y: attacker_bl.y }, defender1: { x: defender_bl.x, y: defender_bl.y }, defender2: { x: defender_br.x, y: defender_br.y }, enabled: bl_to_bl_br_enabled },
           { key: 'bl_to_tl_bl', attacker: { x: attacker_bl.x, y: attacker_bl.y }, defender1: { x: defender_tl.x, y: defender_tl.y }, defender2: { x: defender_bl.x, y: defender_bl.y }, enabled: bl_to_tl_bl_enabled },
           { key: 'br_to_tl_tr', attacker: { x: attacker_br.x, y: attacker_br.y }, defender1: { x: defender_tl.x, y: defender_tl.y }, defender2: { x: defender_tr.x, y: defender_tr.y }, enabled: br_to_tl_tr_enabled },
           { key: 'br_to_tr_br', attacker: { x: attacker_br.x, y: attacker_br.y }, defender1: { x: defender_tr.x, y: defender_tr.y }, defender2: { x: defender_br.x, y: defender_br.y }, enabled: br_to_tr_br_enabled },
           { key: 'br_to_bl_br', attacker: { x: attacker_br.x, y: attacker_br.y }, defender1: { x: defender_bl.x, y: defender_bl.y }, defender2: { x: defender_br.x, y: defender_br.y }, enabled: br_to_bl_br_enabled },
           { key: 'br_to_tl_bl', attacker: { x: attacker_br.x, y: attacker_br.y }, defender1: { x: defender_tl.x, y: defender_tl.y }, defender2: { x: defender_bl.x, y: defender_bl.y }, enabled: br_to_tl_bl_enabled }
       ];
   
       if (callback) { callback(losPaths); }
    }

    GridCalculator.pathsOverlap = function(attackingCorner, defendingCorner1, defendingCorner2) {
        var path1_deltaX = defendingCorner1.x - attackingCorner.x;
        var path1_deltaY = defendingCorner1.y - attackingCorner.y;

        var path2_deltaX = defendingCorner2.x - attackingCorner.x;
        var path2_deltaY = defendingCorner2.y - attackingCorner.y;

        if (path1_deltaY == 0 && path2_deltaY == 0) {
            var path1_xDirection = path1_deltaX < 0 ? -1 : 1;
            var path2_xDirection = path2_deltaX < 0 ? -1 : 1;

            return (path1_xDirection == path2_xDirection);
        }
        //vertical lines
        else if (path1_deltaX == 0 && path2_deltaX == 0) {
            var path1_yDirection = path1_deltaY < 0 ? -1 : 1;
            var path2_yDirection = path2_deltaY < 0 ? -1 : 1;

            return (path1_yDirection == path2_yDirection);
        }

        return false;
    }

    GridCalculator.getLosFromCornerToCorner = function(fromTileX, fromTileY, toTileX, toTileY, attackingCorner, defendingCorner) {
        var pathBlocked = false;

        var verticalEdges = GridCalculator.getVerticalEdges(attackingCorner.x, attackingCorner.y, defendingCorner.x, defendingCorner.y);
        pathBlocked = GridCalculator.edgeBlocked(verticalEdges);
        if (pathBlocked) { return false; }

        var horizontalEdges = GridCalculator.getHorizontalEdges(attackingCorner.x, attackingCorner.y, defendingCorner.x, defendingCorner.y);
        pathBlocked = GridCalculator.edgeBlocked(horizontalEdges);
        if (pathBlocked) { return false; }

        var intersections = GridCalculator.getIntersections(attackingCorner.x, attackingCorner.y, defendingCorner.x, defendingCorner.y);
        pathBlocked = GridCalculator.intersectionBlocked(intersections, 
            fromTileX, fromTileY, toTileX, toTileY,
            attackingCorner.x, attackingCorner.y, defendingCorner.x, defendingCorner.y);
        if (pathBlocked) { return false; }

        var tiles = GridCalculator.getTiles(verticalEdges, horizontalEdges,
            fromTileX, fromTileY, toTileX, toTileY,
            attackingCorner.x, attackingCorner.y, defendingCorner.x, defendingCorner.y);
        var targetSpire = spireTiles.find(function(spire_Tile) {
            return (spire_Tile.x == toTileX && spire_Tile.y == toTileY) ||
            (spire_Tile.x == fromTileX && spire_Tile.y == fromTileY);
        });
        pathBlocked = GridCalculator.tileBlocked(tiles, targetSpire);
        if (pathBlocked) { return false; }

        pathBlocked = GridCalculator.adjacentTilesBlocked(fromTileX, fromTileY, toTileX, toTileY, attackingCorner.x, attackingCorner.y, defendingCorner.x, defendingCorner.y);
        if (pathBlocked) { return false; }	

        return true;
    }

    GridCalculator.getLosFromPointToPoint = function(fromTileX, fromTileY, toTileX, toTileY, fromPoint, toPoint) {
        var pathBlocked = false;

        var verticalEdges = GridCalculator.getVerticalEdges(fromPoint.x, fromPoint.y, toPoint.x, toPoint.y);
        //remove ending edge
        var finalEdgeIndex = verticalEdges.findIndex(function(edge) {
            return edge[0].y == Math.floor(toPoint.y) && edge[0].x == toPoint.x
                && edge[1].y == Math.ceil(toPoint.y) && edge[1].x == toPoint.x;
        });
        if (finalEdgeIndex > -1) {
            verticalEdges.splice(finalEdgeIndex, 1);
        }
        pathBlocked = GridCalculator.edgeBlocked(verticalEdges);
        if (pathBlocked) { return false; }

        var horizontalEdges = GridCalculator.getHorizontalEdges(fromPoint.x, fromPoint.y, 
            toPoint.x, toPoint.y);
        //remove ending edge
        finalEdgeIndex = horizontalEdges.findIndex(function(edge) {
            return edge[0].x == Math.floor(toPoint.x) && edge[0].y == toPoint.y
                && edge[1].x == Math.ceil(toPoint.x) && edge[1].y == toPoint.y;
        });
        if (finalEdgeIndex > -1) {
            horizontalEdges.splice(finalEdgeIndex, 1);
        }
        pathBlocked = GridCalculator.edgeBlocked(horizontalEdges);
        if (pathBlocked) { return false; }

        return true;
    }

    GridCalculator.getVerticalEdges = function(startX, startY, endX, endY) {
        var deltaX = endX - startX;
        var deltaY = endY - startY;
        var xDirection = deltaX < 0 ? -1 : 1;
        deltaX = Math.abs(deltaX);
        var currentX = startX;
        var step = 0
        var verticalEdges = [];
        if (deltaX == 0) {
            return verticalEdges;
        }
        do {
            currentX += xDirection;
            step++;
            var y = deltaY / deltaX * step + startY;
            if (y % 1 != 0) {
                var yTop = Math.floor(y);
                var yBottom = Math.ceil(y);
                verticalEdges.push([
                    { x: currentX, y: yTop },
                    { x: currentX, y: yBottom }
                ]);
            }
        }
        while (step < Math.floor(deltaX));
        return verticalEdges;
    }

    GridCalculator.getHorizontalEdges = function(startX, startY, endX, endY) {
        var deltaX = endX - startX;
        var deltaY = endY - startY;
        var yDirection = deltaY < 0 ? -1 : 1;
        deltaY = Math.abs(deltaY);
        var currentY = startY;
        var step = 0
        var horizontalEdges = [];
        if (deltaY == 0) {
            return horizontalEdges;
        }
        do {
            currentY += yDirection;
            step++;
            var x = deltaX / deltaY * step + startX;
            if (x % 1 != 0) {
                var xStart = Math.floor(x);
                var xEnd = Math.ceil(x);
                horizontalEdges.push([
                    { x: xStart, y: currentY },
                    { x: xEnd, y: currentY }
                ]);
            }
        }
        while (step < Math.floor(deltaY));
        return horizontalEdges;
    }

    GridCalculator.getIntersections = function(startX, startY, endX, endY) {
        var deltaX = endX - startX;
        var deltaY = endY - startY;
        var intersections = [];
        var step = 0
        var xDirection = deltaX < 0 ? -1 : 1;
        var yDirection = deltaY < 0 ? -1 : 1;
        var currentX = startX;
        var currentY = startY;
        if (deltaX == 0) {
            while (currentY != endY) {
                intersections.push({ x: currentX, y: currentY });
                currentY += yDirection;
            }
            var intersectionIndex = intersections.findIndex(function(intersection) {
                return intersection.x == startX && intersection.y == startY;
            })
            if (intersectionIndex < 0) { intersections.push({ x: startX, y: startY }); }
            intersectionIndex = intersections.findIndex(function(intersection) {
                return intersection.x == endX && intersection.y == endY;
            })
            if (intersectionIndex < 0) { intersections.push({ x: endX, y: endY }); }
            return intersections;
        }
        if (deltaY == 0) {
            while (currentX != endX) {
                intersections.push({ x: currentX, y: currentY });
                currentX += xDirection;
            }
            var intersectionIndex = intersections.findIndex(function(intersection) {
                return intersection.x == startX && intersection.y == startY;
            })
            if (intersectionIndex < 0) { intersections.push({ x: startX, y: startY }); }
            intersectionIndex = intersections.findIndex(function(intersection) {
                return intersection.x == endX && intersection.y == endY;
            })
            if (intersectionIndex < 0) { intersections.push({ x: endX, y: endY }); }
            return intersections;	
        }
        deltaX = Math.abs(deltaX);
        do {
            currentX += xDirection;
            step++;
            var y = deltaY / deltaX * step + startY;
            if (y % 1 == 0) {
                intersections.push({ x: currentX, y: y });
            }
        }
        while (step < Math.floor(deltaX));
        var intersectionIndex = intersections.findIndex(function(intersection) {
            return intersection.x == startX && intersection.y == startY;
        })
        if (intersectionIndex < 0) { intersections.push({ x: startX, y: startY }); }
        intersectionIndex = intersections.findIndex(function(intersection) {
            return intersection.x == endX && intersection.y == endY;
        })
        if (intersectionIndex < 0) { intersections.push({ x: endX, y: endY }); }
        return intersections;
    }

    GridCalculator.getTiles = function(verticalEdges, horizontalEdges, 
        fromTileX, fromTileY, toTileX, toTileY, 
        startX, startY, endX, endY) {
        var tiles = [];
        var newTile = {};
        var tileIndex = -1;
        var isAttacker = false;
        var isDefender = false;
        verticalEdges.forEach(function (edge) {
            newTile = { x: edge[0].x - 1, y: edge[0].y };
            isAttacker = newTile.x == fromTileX && newTile.y == fromTileY;
            isDefender = newTile.x == toTileX && newTile.y == toTileY;
            tileIndex = tiles.findIndex(function(tile) {
                return tile.x == newTile.x && tile.y == newTile.y;
            });
            if (tileIndex < 0 && !isAttacker && !isDefender) { tiles.push(newTile); }
            newTile = { x: edge[0].x, y: edge[0].y };
            isAttacker = newTile.x == fromTileX && newTile.y == fromTileY;
            isDefender = newTile.x == toTileX && newTile.y == toTileY;
            tileIndex = tiles.findIndex(function(tile) {
                return tile.x == newTile.x && tile.y == newTile.y;
            });
            if (tileIndex < 0 && !isAttacker && !isDefender) { tiles.push(newTile); }
        });
        horizontalEdges.forEach(function(edge) {
            newTile = { x: edge[0].x, y: edge[0].y - 1 };
            isAttacker = newTile.x == fromTileX && newTile.y == fromTileY;
            isDefender = newTile.x == toTileX && newTile.y == toTileY;
            tileIndex = tiles.findIndex(function(tile) {
                return tile.x == newTile.x && tile.y == newTile.y;
            });
            if (tileIndex < 0 && !isAttacker && !isDefender) { tiles.push(newTile); }
            newTile = { x: edge[0].x, y: edge[0].y };
            isAttacker = newTile.x == fromTileX && newTile.y == fromTileY;
            isDefender = newTile.x == toTileX && newTile.y == toTileY;
            tileIndex = tiles.findIndex(function(tile) {
                return tile.x == newTile.x && tile.y == newTile.y;
            });
            if (tileIndex < 0 && !isAttacker && !isDefender) { tiles.push(newTile); }
        })
        //if line is on a 45 degre angle, add tiles between on each 45
        var deltaX = endX - startX;
        var deltaY = endY - startY;
        var fortyFiveDegreeAngle = Math.abs(deltaX) > 0 && Math.abs(deltaX) == Math.abs(deltaY);
        if (fortyFiveDegreeAngle) {
            var attacker_tl = startX == fromTileX && startY == fromTileY;
            var attacker_tr = startX == fromTileX + 1 && startY == fromTileY;
            var attacker_br = startX == fromTileX + 1 && startY == fromTileY + 1;
            var attacker_bl = startX == fromTileX && startY == fromTileY + 1;
            var defender_tl = endX == toTileX && endY == toTileY;
            var defender_tr = endX == toTileX + 1 && endY == toTileY;
            var defender_br = endX == toTileX + 1 && endY == toTileY + 1;
            var defender_bl = endX == toTileX && endY == toTileY + 1;

            var currentX = startX;
            var currentY = startY;
            var pathLength = Math.abs(deltaX);
            var xDirection = deltaX < 0 ? -1 : 1;
            var yDirection = deltaY < 0 ? -1 : 1;
            var step = 0

            //attacker above and left of defender
            if (deltaX > 0 && deltaY > 0) {
                xModifer = 0;
                yModifer = 0;
                for (var step = 0; step <= pathLength; step ++) {
                    if (step == pathLength) { 
                        currentX += xDirection;
                        currentY += yDirection;
                        continue; 
                    }
                    else if (attacker_tl && step == 0) { 
                        currentX += xDirection;
                        currentY += yDirection;
                        continue; 
                    }
                    else if (defender_br && step == pathLength - 1) {
                        currentX += xDirection;
                        currentY += yDirection;
                        continue; 
                    }
                    var newTile = { x: currentX + xModifer, y: currentY + yModifer };
                    tileIndex = tiles.findIndex(function(tile) {
                        return tile.x == newTile.x && tile.y == newTile.y;
                    });
                    if (tileIndex < 0) { tiles.push(newTile); }
                    currentX += xDirection;
                    currentY += yDirection;
                }
            }
            //attacker above and right of defender
            else if (deltaX < 0 && deltaY > 0) {
                xModifer = 0;
                yModifer = -1;
                for (var step = 0; step <= pathLength; step ++) {
                    if (step == 0) { 
                        currentX += xDirection;
                        currentY += yDirection;
                        continue; 
                    }
                    else if (attacker_tr && step == 1) { 
                        currentX += xDirection;
                        currentY += yDirection;
                        continue; 
                    }
                    else if (defender_bl && step == pathLength) {
                        currentX += xDirection;
                        currentY += yDirection;
                        continue; 
                    }
                    var newTile = { x: currentX + xModifer, y: currentY + yModifer };
                    tileIndex = tiles.findIndex(function(tile) {
                        return tile.x == newTile.x && tile.y == newTile.y;
                    });
                    if (tileIndex < 0) { tiles.push(newTile); }
                    currentX += xDirection;
                    currentY += yDirection;
                }
            }
            //attacker below and left of defender
            else if (deltaX > 0 && deltaY < 0) {
                xModifer = 0;
                yModifer = -1;
                for (var step = 0; step <= pathLength; step ++) {
                    if (step == pathLength) { 
                        currentX += xDirection;
                        currentY += yDirection;
                        continue; 
                    }
                    else if (attacker_bl && step == 0) { 
                        currentX += xDirection;
                        currentY += yDirection;
                        continue; 
                    }
                    else if (defender_tr && step == pathLength - 1) {
                        currentX += xDirection;
                        currentY += yDirection;
                        continue; 
                    }
                    var newTile = { x: currentX + xModifer, y: currentY + yModifer };
                    tileIndex = tiles.findIndex(function(tile) {
                        return tile.x == newTile.x && tile.y == newTile.y;
                    });
                    if (tileIndex < 0) { tiles.push(newTile); }
                    currentX += xDirection;
                    currentY += yDirection;
                }
            }
            //attacker below and right of defender
            else if (deltaX < 0 && deltaY < 0) {
                xModifer = 0;
                yModifer = 0;
                for (var step = 0; step <= pathLength; step ++) {
                    if (step == 0) { 
                        currentX += xDirection;
                        currentY += yDirection;
                        continue; 
                    }
                    else if (attacker_br && step == 1) { 
                        currentX += xDirection;
                        currentY += yDirection;
                        continue; 
                    }
                    else if (defender_tl && step == pathLength) {
                        currentX += xDirection;
                        currentY += yDirection;
                        continue; 
                    }
                    var newTile = { x: currentX + xModifer, y: currentY + yModifer };
                    tileIndex = tiles.findIndex(function(tile) {
                        return tile.x == newTile.x && tile.y == newTile.y;
                    });
                    if (tileIndex < 0) { tiles.push(newTile); }
                    currentX += xDirection;
                    currentY += yDirection;
                }
            }
            return tiles;
        }
        return tiles;
    }

    GridCalculator.edgeBlocked = function(pathEdges) {
        var pathBlocked = false;

        pathEdges.forEach(function(pathEdge) {
            if (pathBlocked) { return; }
            var edgeIndex = blockingEdges.findIndex(function(blocking_edge) {
                return blocking_edge[0].x == pathEdge[0].x && blocking_edge[0].y == pathEdge[0].y &&
                    blocking_edge[1].x == pathEdge[1].x && blocking_edge[1].y == pathEdge[1].y;
            });
            pathBlocked = edgeIndex > -1;
        });
        
        if (pathBlocked) { return true; }

        pathEdges.forEach(function(pathEdge) {
            if (pathBlocked) { return; }
            var edgeIndex = walls.findIndex(function(wall) {
                return wall[0].x == pathEdge[0].x && wall[0].y == pathEdge[0].y &&
                    wall[1].x == pathEdge[1].x && wall[1].y == pathEdge[1].y;
            });
            pathBlocked = edgeIndex > -1;
        });

        return pathBlocked;
    }

    GridCalculator.tileBlocked = function(pathTiles, spireTile) {
        var pathBlocked = false;

        pathTiles.forEach(function(pathTile) {
            if (pathBlocked) { return; }
            var tileIndex = blockers.findIndex(function(blocker) {
                return blocker.x == pathTile.x && blocker.y == pathTile.y;
            })
            pathBlocked = tileIndex > -1;
        })
        
        if (pathBlocked) { return true; }

        var blocking_Tiles = blockingTiles.filter(function (blocking_Tile) { return true; });
        if (spireTile) {
            blocking_Tiles = blockingTiles.filter(function(blocking_Tile) {
                return !((blocking_Tile.x == spireTile.x && blocking_Tile.y == spireTile.y -1) ||
                (blocking_Tile.x == spireTile.x && blocking_Tile.y == spireTile.y +1) ||
                (blocking_Tile.y == spireTile.y && blocking_Tile.x == spireTile.x -1) ||
                (blocking_Tile.y == spireTile.y && blocking_Tile.x == spireTile.x +1));
            });
        }

        pathTiles.forEach(function(pathTile) {
            if (pathBlocked) { return; }
            var tileIndex = blocking_Tiles.findIndex(function(blocking_tile) {
                return blocking_tile.x == pathTile.x && blocking_tile.y == pathTile.y;
            })
            pathBlocked = tileIndex > -1;
        })
        
        if (pathBlocked) { return true; }

        pathTiles.forEach(function(pathTile) {
            if (pathBlocked) { return; }
            var tileIndex = offMapTiles.findIndex(function(off_map_tile) {
                return off_map_tile.x == pathTile.x && off_map_tile.y == pathTile.y;
            })
            pathBlocked = tileIndex > -1;
        })

        return pathBlocked;
    }

    GridCalculator.intersectionBlocked = function(pathIntersections, fromTileX, fromTileY, toTileX, toTileY, startX, startY, endX, endY) {
        var intersections = [];

        pathIntersections.forEach(function(pIntersection) {
            var blockingIntersection = blockingIntersections.find(function(bIntersection) {
                return bIntersection.x == pIntersection.x && bIntersection.y == pIntersection.y;
            });
            if (blockingIntersection) { intersections.push(blockingIntersection); }
        });
        //no blocking intersections aligned with path intersections
        if (intersections.length == 0) { return false; }

        var pathBlocked = false;
        intersections.forEach(function(intersection) {
            if (pathBlocked) { return; }
            pathBlocked = GridCalculator.intersectionBlocksPath(intersection, fromTileX, fromTileY, toTileX, toTileY, startX, startY, endX, endY);
        });
        return pathBlocked;
    }

    GridCalculator.intersectionBlocksPath = function(blockingIntersection, fromTileX, fromTileY, toTileX, toTileY, startX, startY, endX, endY) {
        var deltaX = endX - startX;
        var deltaY = endY - startY;
        var attackingTileLeftOfIntersection = fromTileX < blockingIntersection.x;
        var attackingTileRightOfIntersection = !attackingTileLeftOfIntersection;
        var attackingTileAbovefIntersection = fromTileY < blockingIntersection.y;
        var attackingTileBelowIntersection = !attackingTileAbovefIntersection;
        var defendingTileLeftOfIntersection = toTileX < blockingIntersection.x;
        var defendingTileRightOfIntersection = !defendingTileLeftOfIntersection;
        var defendingTileAboveIntersection = toTileY < blockingIntersection.y;
        var defendingTileBelowIntersection = !defendingTileAboveIntersection;

        var topConnection = blockingIntersection.connections.findIndex(function(connection) {
            return connection.x == blockingIntersection.x && connection.y == blockingIntersection.y - 1;
        }) > -1;
        var rightConnection = blockingIntersection.connections.findIndex(function(connection) {
            return connection.x == blockingIntersection.x + 1 && connection.y == blockingIntersection.y;
        }) > -1;
        var leftConnection = blockingIntersection.connections.findIndex(function(connection) {
            return connection.x == blockingIntersection.x - 1 && connection.y == blockingIntersection.y;
        }) > -1;
        var bottomConnection = blockingIntersection.connections.findIndex(function(connection) {
            return connection.x == blockingIntersection.x && connection.y == blockingIntersection.y + 1;
        }) > -1;

        var pathBlocked = false;

        //attack across intersection
        if (blockingIntersection.x == startX && blockingIntersection.y == startY &&
            blockingIntersection.x == endX && blockingIntersection.y == endY) {
            if (attackingTileLeftOfIntersection && attackingTileAbovefIntersection) {
                if (defendingTileRightOfIntersection && defendingTileAboveIntersection) {
                    pathBlocked = (topConnection && leftConnection) ||
                        (topConnection && rightConnection) ||
                        (topConnection && bottomConnection);
                } else if (defendingTileRightOfIntersection && defendingTileBelowIntersection) {
                    pathBlocked = (topConnection && leftConnection) ||
                        (topConnection && bottomConnection) ||
                        (bottomConnection && rightConnection) ||
                        (leftConnection && rightConnection);
                } else if (defendingTileLeftOfIntersection && defendingTileBelowIntersection) {
                    pathBlocked = (topConnection && leftConnection) ||
                        (leftConnection && bottomConnection) ||
                        (leftConnection && rightConnection);
                }
            } else if (attackingTileRightOfIntersection && attackingTileAbovefIntersection) {
                if (defendingTileLeftOfIntersection && defendingTileAboveIntersection) {
                    pathBlocked = (topConnection && leftConnection) ||
                        (topConnection && rightConnection) ||
                        (topConnection && bottomConnection);
                } else if (defendingTileRightOfIntersection && defendingTileBelowIntersection) {
                    pathBlocked = (topConnection && rightConnection) ||
                        (bottomConnection && rightConnection) ||
                        (leftConnection && rightConnection);
                } else if (defendingTileLeftOfIntersection && defendingTileBelowIntersection) {
                    pathBlocked = (topConnection && rightConnection) ||
                        (leftConnection && bottomConnection) ||
                        (topConnection && bottomConnection) ||
                        (leftConnection && rightConnection);
                }
            } else if (attackingTileRightOfIntersection && attackingTileBelowIntersection) {
                if (defendingTileLeftOfIntersection && defendingTileAboveIntersection) {
                    pathBlocked = (leftConnection && topConnection) ||
                        (bottomConnection && rightConnection) ||
                        (topConnection && bottomConnection) ||
                        (leftConnection && rightConnection);
                } else if (defendingTileRightOfIntersection && defendingTileAboveIntersection) {
                    pathBlocked = (bottomConnection && rightConnection) ||
                        (topConnection && rightConnection) ||
                        (leftConnection && rightConnection);
                } else if (defendingTileLeftOfIntersection && defendingTileBelowIntersection) {
                    pathBlocked = (leftConnection && bottomConnection) ||
                        (topConnection && bottomConnection) ||
                        (bottomConnection && rightConnection);
                }
            } else if (attackingTileLeftOfIntersection && attackingTileBelowIntersection) {
                if (defendingTileLeftOfIntersection && defendingTileAboveIntersection) {
                    pathBlocked = (leftConnection && topConnection) ||
                        (leftConnection && rightConnection) ||
                        (leftConnection && bottomConnection);
                } else if (defendingTileRightOfIntersection && defendingTileAboveIntersection) {
                    pathBlocked = (leftConnection && bottomConnection) ||
                        (topConnection && rightConnection) ||
                        (leftConnection && rightConnection) ||
                        (topConnection && bottomConnection);
                } else if (defendingTileRightOfIntersection && defendingTileBelowIntersection) {
                    pathBlocked = (leftConnection && bottomConnection) ||
                        (bottomConnection && rightConnection) ||
                        (topConnection && bottomConnection);
                }
            }
        }
        //lines which end on intersections
        else if (blockingIntersection.x == endX && blockingIntersection.y == endY) {
            if (defendingTileLeftOfIntersection && defendingTileAboveIntersection) {
                //attack from top left
                if (deltaX > 0 && deltaY > 0) { return false; }
                //attack from top right
                else if (deltaX < 0 && deltaY > 0) {
                    pathBlocked = (leftConnection && topConnection) ||
                        (topConnection && rightConnection) ||
                        (topConnection && bottomConnection);
                }
                //attack from bot right
                else if (deltaX < 0 && deltaY < 0) {
                    pathBlocked = (leftConnection && topConnection) ||
                        (bottomConnection && rightConnection) ||
                        (topConnection && bottomConnection) ||
                        (leftConnection && rightConnection);
                }
                //attack from bot left
                else if (deltaX > 0 && deltaY < 0) {
                    pathBlocked = (leftConnection && topConnection) ||
                        (leftConnection && bottomConnection) ||
                        (leftConnection && rightConnection);
                }
                //attack from left
                else if (deltaX > 0) { return false; }
                //attack from right
                else if (deltaX < 0) {
                    pathBlocked = (leftConnection && topConnection) ||
                        (topConnection && bottomConnection) ||
                        (topConnection && rightConnection);
                }
                //attack from top
                else if (deltaY > 0) { return false; }
                //attack from bot
                else if (deltaY < 0) {
                    pathBlocked = (leftConnection && topConnection) ||
                        (leftConnection && rightConnection) ||
                        (leftConnection && bottomConnection);
                }
            } else if (defendingTileRightOfIntersection && defendingTileAboveIntersection) {
                //attack from top left
                if (deltaX > 0 && deltaY > 0) {
                    pathBlocked = (leftConnection && topConnection) ||
                        (topConnection && rightConnection) ||
                        (topConnection && bottomConnection);
                }
                //attack from top right
                else if (deltaX < 0 && deltaY > 0) { return false; }
                //attack from bot right
                else if (deltaX < 0 && deltaY < 0) {
                    pathBlocked = (topConnection && rightConnection) ||
                        (bottomConnection && rightConnection) ||
                        (leftConnection && rightConnection);
                }
                //attack from bot left
                else if (deltaX > 0 && deltaY < 0) {
                    pathBlocked = (topConnection && rightConnection) ||
                        (leftConnection && bottomConnection) ||
                        (topConnection && bottomConnection) ||
                        (leftConnection && rightConnection);
                }
                //attack from left
                else if (deltaX > 0) { 
                    pathBlocked = (topConnection && rightConnection) ||
                        (topConnection && bottomConnection);
                }
                //attack from right
                else if (deltaX < 0) { return false; }
                //attack from top
                else if (deltaY > 0) { return false; }
                //attack from bot
                else if (deltaY < 0) {
                    pathBlocked = (topConnection && rightConnection) ||
                        (leftConnection && rightConnection) ||
                        (rightConnection && bottomConnection);
                }
            } else if (defendingTileRightOfIntersection && defendingTileBelowIntersection) {
                //attack from top left
                if (deltaX > 0 && deltaY > 0) {
                    pathBlocked = (leftConnection && topConnection) ||
                        (bottomConnection && rightConnection) ||
                        (leftConnection && rightConnection) ||
                        (topConnection && bottomConnection);
                }
                //attack from top right
                else if (deltaX < 0 && deltaY > 0) {
                    pathBlocked = (topConnection && rightConnection) ||
                        (bottomConnection && rightConnection) ||
                        (leftConnection && rightConnection);
                }
                //attack from bot right
                else if (deltaX < 0 && deltaY < 0) { return false; }
                //attack from bot left
                else if (deltaX > 0 && deltaY < 0) {
                    pathBlocked = (leftConnection && bottomConnection) ||
                        (bottomConnection && rightConnection) ||
                        (topConnection && bottomConnection);
                }
                //attack from left
                else if (deltaX > 0) { 
                    pathBlocked = (bottomConnection && rightConnection) ||
                        (topConnection && bottomConnection) ||
                        (leftConnection && bottomConnection);
                }
                //attack from right
                else if (deltaX < 0) { return false; }
                //attack from top
                else if (deltaY > 0) {
                    pathBlocked = (bottomConnection && rightConnection) ||
                        (leftConnection && rightConnection) ||
                        (topConnection && rightConnection);
                }
                //attack from bot
                else if (deltaY < 0) { return false; }
            } else if (defendingTileLeftOfIntersection && defendingTileBelowIntersection) {
                //attack from top left
                if (deltaX > 0 && deltaY > 0) {
                    pathBlocked = (leftConnection && topConnection) ||
                        (leftConnection && bottomConnection) ||
                        (leftConnection && rightConnection);
                }
                //attack from top right
                else if (deltaX < 0 && deltaY > 0) {
                    pathBlocked = (leftConnection && bottomConnection) ||
                        (topConnection && rightConnection) ||
                        (leftConnection && rightConnection) ||
                        (topConnection && bottomConnection);
                }
                //attack from bot right
                else if (deltaX < 0 && deltaY < 0) {
                    pathBlocked = (leftConnection && bottomConnection) ||
                        (bottomConnection && rightConnection) ||
                        (topConnection && bottomConnection);
                }
                //attack from bot left
                else if (deltaX > 0 && deltaY < 0) { return false; }
                //attack from left
                else if (deltaX > 0) { return false; }
                //attack from right
                else if (deltaX < 0) {
                    pathBlocked = (leftConnection && bottomConnection) ||
                        (topConnection && bottomConnection) ||
                        (bottomConnection && rightConnection);
                }
                //attack from top
                else if (deltaY > 0) {
                    pathBlocked = (leftConnection && bottomConnection) ||
                        (leftConnection && rightConnection) ||
                        (leftConnection && topConnection);
                }
                //attack from bot
                else if (deltaY < 0) { return false; }
            }
        }
        //lines which start on intersections
        else if (blockingIntersection.x == startX && blockingIntersection.y == startY) {
            if (attackingTileLeftOfIntersection && attackingTileAbovefIntersection) {
                //attacking down and right
                if (deltaX > 0 && deltaY > 0) {
                    pathBlocked = (topConnection && leftConnection) ||
                        (bottomConnection && rightConnection) ||
                        (topConnection && bottomConnection) ||
                        (leftConnection && rightConnection);
                }
                //attacking down and left
                else if (deltaX < 0 && deltaY > 0) {
                    pathBlocked = (leftConnection && bottomConnection) ||
                        (leftConnection && topConnection) ||
                        (leftConnection && rightConnection);
                }
                //attacking up and left
                else if (deltaX < 0 && deltaY < 0) { return false; }
                //attacking up and right
                else if (deltaX > 0 && deltaY < 0) {
                    pathBlocked = (leftConnection && topConnection) ||
                        (topConnection && rightConnection) ||
                        (topConnection && bottomConnection);
                }
                //attacking right
                else if (deltaX > 0) {
                    pathBlocked = (leftConnection && topConnection) ||
                        (topConnection && bottomConnection);
                }
                //attacking left
                else if (deltaX < 0) { return false; }
                //attacking down
                else if (deltaY > 0) {
                    pathBlocked = (leftConnection && topConnection) ||
                        (leftConnection && rightConnection);}
                //attacking up
                else if (deltaY < 0) { return false; }
            }
            else if (attackingTileRightOfIntersection && attackingTileAbovefIntersection) {
                //attacking down and right
                if (deltaX > 0 && deltaY > 0) {
                    pathBlocked = (topConnection && rightConnection) ||
                        (bottomConnection && rightConnection) ||
                        (leftConnection && rightConnection);
                }
                //attacking down and left
                else if (deltaX < 0 && deltaY > 0) {
                    pathBlocked = (leftConnection && bottomConnection) ||
                        (topConnection && rightConnection) ||
                        (topConnection && bottomConnection) ||
                        (leftConnection && rightConnection);
                }
                //attacking up and left
                else if (deltaX < 0 && deltaY < 0) {
                    pathBlocked = (topConnection && rightConnection) ||
                        (leftConnection && topConnection) ||
                        (topConnection && bottomConnection);
                }
                //attacking up and right
                else if (deltaX > 0 && deltaY < 0) { return false; }
                //attacking right
                else if (deltaX > 0) { return false; }
                //attacking left
                else if (deltaX < 0) {
                    pathBlocked = (topConnection && rightConnection) ||
                        (topConnection && bottomConnection);
                }
                //attacking down
                else if (deltaY > 0) {
                    pathBlocked = (topConnection && rightConnection) ||
                        (leftConnection && rightConnection);
                }
                //attacking up
                else if (deltaY < 0) { return false; }
            }
            else if (attackingTileRightOfIntersection && attackingTileBelowIntersection) {
                //attacking down and right
                if (deltaX > 0 && deltaY > 0) { return false; }
                //attacking down and left
                else if (deltaX < 0 && deltaY > 0) {
                    pathBlocked = (leftConnection && bottomConnection) ||
                        (bottomConnection && rightConnection) ||
                        (topConnection && bottomConnection);
                }
                //attacking up and left
                else if (deltaX < 0 && deltaY < 0) {
                    pathBlocked = (leftConnection && topConnection) ||
                        (bottomConnection && rightConnection) ||
                        (topConnection && bottomConnection) ||
                        (leftConnection && rightConnection);
                }
                //attacking up and right
                else if (deltaX > 0 && deltaY < 0) {
                    pathBlocked = (bottomConnection && rightConnection) ||
                        (topConnection && rightConnection) ||
                        (leftConnection && rightConnection);
                }
                //attacking right
                else if (deltaX > 0) { return false; }
                //attacking left
                else if (deltaX < 0) {
                    pathBlocked = (bottomConnection && rightConnection) ||
                        (topConnection && bottomConnection);
                }
                //attacking down
                else if (deltaY > 0) { return false; }
                //attacking up
                else if (deltaY < 0) {
                    pathBlocked = (bottomConnection && rightConnection) ||
                        (leftConnection && rightConnection);
                }
            }
            else if (attackingTileLeftOfIntersection && attackingTileBelowIntersection) {
                //attacking down and right
                if (deltaX > 0 && deltaY > 0) {
                    pathBlocked = (leftConnection && bottomConnection) ||
                        (bottomConnection && rightConnection) ||
                        (topConnection && bottomConnection);
                }
                //attacking down and left
                else if (deltaX < 0 && deltaY > 0) { return false; }
                //attacking up and left
                else if (deltaX < 0 && deltaY < 0) {
                    pathBlocked = (leftConnection && bottomConnection) ||
                        (leftConnection && topConnection) ||
                        (leftConnection && rightConnection);
                }
                //attacking up and right
                else if (deltaX > 0 && deltaY < 0) {
                    pathBlocked = (leftConnection && bottomConnection) ||
                        (topConnection && rightConnection) ||
                        (topConnection && bottomConnection) ||
                        (leftConnection && rightConnection);
                }
                //attacking right
                else if (deltaX > 0) {
                    pathBlocked = (leftConnection && bottomConnection) ||
                        (topConnection && bottomConnection);
                }
                //attacking left
                else if (deltaX < 0) { return false; }
                //attacking down
                else if (deltaY > 0) { return false; }
                //attacking up
                else if (deltaY < 0) {
                    pathBlocked = (leftConnection && bottomConnection) ||
                        (leftConnection && rightConnection);
                }
            }
        }
        //diagonal lines though intersections
        else {
            //attack from top left
            if (deltaX > 0 && deltaY > 0) {
                pathBlocked = (leftConnection && topConnection) ||
                    (bottomConnection && rightConnection) ||
                    (topConnection && bottomConnection) ||
                    (leftConnection && rightConnection);
            }
            //attack from top right
            else if (deltaX < 0 && deltaY > 0) {
                pathBlocked = (leftConnection && bottomConnection) ||
                    (topConnection && rightConnection) ||
                    (topConnection && bottomConnection) ||
                    (leftConnection && rightConnection);
            }
            //attack from bot right
            else if (deltaX < 0 && deltaY < 0) {
                pathBlocked = (leftConnection && topConnection) ||
                    (bottomConnection && rightConnection) ||
                    (topConnection && bottomConnection) ||
                    (leftConnection && rightConnection);
            }
            //attack from bot left
            else if (deltaX > 0 && deltaY < 0) {
                pathBlocked = (leftConnection && bottomConnection) ||
                    (topConnection && rightConnection) ||
                    (topConnection && bottomConnection) ||
                    (leftConnection && rightConnection);
            }
            //attack from left
            else if (deltaX > 0) {
                pathBlocked = (topConnection && bottomConnection);
            }
            //attack from right
            else if (deltaX < 0) {
                pathBlocked = (topConnection && bottomConnection) ||
                (topConnection && rightConnection) ||
                (bottomConnection && rightConnection);
            }
            //attack from top
            else if (deltaY > 0) {
                pathBlocked = (leftConnection && rightConnection);
            }
            //attack from bot
            else if (deltaY < 0) {
                pathBlocked = (leftConnection && rightConnection);
            }
        }

        return pathBlocked;
    }

    GridCalculator.adjacentTilesBlocked = function(fromTileX, fromTileY, toTileX, toTileY, startX, startY, endX, endY) {
        //pass vertical lines passing vertical intersections
        var deltaX = endX - startX;
        //pass horizontal lines passing horizontal intersections
        var deltaY = endY - startY;
        //only calculate for vertical or horizontal lines.  All other lines are taken care of by edge tiles.
        if (!((deltaX == 0 && deltaY != 0) || (deltaY == 0 && deltaX != 0))) { return false; }

        var attacker_tl = startX == fromTileX && startY == fromTileY;
        var attacker_tr = startX == fromTileX + 1 && startY == fromTileY;
        var attacker_br = startX == fromTileX + 1 && startY == fromTileY + 1;
        var attacker_bl = startX == fromTileX && startY == fromTileY + 1;
        var defender_tl = endX == toTileX && endY == toTileY;
        var defender_tr = endX == toTileX + 1 && endY == toTileY;
        var defender_br = endX == toTileX + 1 && endY == toTileY + 1;
        var defender_bl = endX == toTileX && endY == toTileY + 1;

        var currentX = startX;
        var currentY = startY;
        var pathLength = 0;
        var xDirection = deltaX < 0 ? -1 : 1;
        var yDirection = deltaY < 0 ? -1 : 1;

        var pathBlocked = false;
        //horizontal lines
        if (deltaY == 0) {
            pathLength = Math.abs(deltaX);
            //attacking left to right
            if (xDirection > 0) {
                for (var step = 0; step < pathLength; step ++) {
                    if (pathBlocked) { return true; }
                    if (step == 0 && (attacker_tl || attacker_bl)) {
                        currentX += xDirection;
                        currentY = startY;
                        continue;
                    }
                    else if (step == pathLength - 1 && (defender_tr || defender_br)) {
                        currentX += xDirection;
                        currentY = startY;
                        continue;
                    }
                    pathBlocked = GridCalculator.verticallyAdjacentTilesBlocked({ x: currentX, y: currentY});
                    currentX += xDirection;
                    currentY = startY;
                }
            }
            //attacking right to left
            else if (xDirection < 0) {
                for (var step = 0; step <= pathLength; step ++) {
                    if (pathBlocked) { return true; }
                    if (step == 0) {
                        currentX += xDirection;
                        currentY = startY;
                        continue;
                    }
                    if (step == 1 && (attacker_tr || attacker_br)) {
                        currentX += xDirection;
                        currentY = startY;
                        continue;
                    }
                    else if (step == pathLength && (defender_tl || defender_bl)) {
                        currentX += xDirection;
                        currentY = startY;
                        continue;
                    }
                    pathBlocked = GridCalculator.verticallyAdjacentTilesBlocked({ x: currentX, y: currentY});
                    currentX += xDirection;
                    currentY = startY;
                }
            }
        } 
        //vertical lines
        else if (deltaX == 0) {
            pathLength = Math.abs(deltaY);
            //attacking down
            if (yDirection > 0) {
                for (var step = 0; step < pathLength; step ++) {
                    if (pathBlocked) { return true; }
                    if (step == 0 && (attacker_tl || attacker_tr)) {
                        currentX = startX;
                        currentY += yDirection;
                        continue;
                    }
                    else if (step == pathLength - 1 && (defender_bl || defender_br)) {
                        currentX = startX;
                        currentY += yDirection;
                        continue;
                    }
                    pathBlocked = GridCalculator.horizontallyAdjacentTilesBlocked({ x: currentX, y: currentY});
                    currentX = startX;
                    currentY += yDirection;
                }
            }
            //attacking up
            else if (yDirection < 0) {
                for (var step = 0; step <= pathLength; step ++) {
                    if (pathBlocked) { return true; }
                    if (step == 0) {
                        currentX = startX;
                        currentY += yDirection;
                        continue;
                    }
                    if (step == 1 && (attacker_bl || attacker_br)) {
                        currentX = startX;
                        currentY += yDirection;
                        continue;
                    }
                    else if (step == pathLength && (defender_tl || defender_tr)) {
                        currentX = startX;
                        currentY += yDirection;
                        continue;
                    }
                    pathBlocked = GridCalculator.horizontallyAdjacentTilesBlocked({ x: currentX, y: currentY});
                    currentX = startX;
                    currentY += yDirection;
                }
            }
        }
        return pathBlocked;
    }

    GridCalculator.verticallyAdjacentTilesBlocked = function(tile) {
        var tileIndex = offMapTiles.findIndex(function(offMapTile) {
            return offMapTile.x == tile.x && offMapTile.y == tile.y;
        });
        if (tileIndex < 0) {
            tileIndex = blockingTiles.findIndex(function(blockingTile) {
                return blockingTile.x == tile.x && blockingTile.y == tile.y;
            });
        }
        if (tileIndex < 0) {
            tileIndex = blockers.findIndex(function(blocker) {
                return blocker.x == tile.x && blocker.y == tile.y;
            });
        }
        if (tileIndex < 0) { return false; }
        else if (tile.y == 0) { return true; }
        var adjacentTileIndex = offMapTiles.findIndex(function(offMapTile) {
            return offMapTile.x == tile.x && offMapTile.y == tile.y - 1;
        });
        if (adjacentTileIndex < 0) {
            adjacentTileIndex = blockingTiles.findIndex(function(blockingTile) {
                return blockingTile.x == tile.x && blockingTile.y == tile.y - 1;
            });
        }
        if (adjacentTileIndex < 0) {
            adjacentTileIndex = blockers.findIndex(function(blocker) {
                return blocker.x == tile.x && blocker.y == tile.y - 1;
            });
        }
        return adjacentTileIndex != -1;
    }

    GridCalculator.horizontallyAdjacentTilesBlocked = function(tile) {
        var tileIndex = offMapTiles.findIndex(function(offMapTile) {
            return offMapTile.x == tile.x && offMapTile.y == tile.y;
        });
        if (tileIndex < 0) {
            tileIndex = blockingTiles.findIndex(function(blockingTile) {
                return blockingTile.x == tile.x && blockingTile.y == tile.y;
            });
        }
        if (tileIndex < 0) {
            tileIndex = blockers.findIndex(function(blocker) {
                return blocker.x == tile.x && blocker.y == tile.y;
            });
        }
        if (tileIndex < 0) { return false; }
        else if (tile.x == 0) { return true; }
        var adjacentTileIndex = offMapTiles.findIndex(function(offMapTile) {
            return offMapTile.x == tile.x - 1 && offMapTile.y == tile.y;
        });
        if (adjacentTileIndex < 0) {
            adjacentTileIndex = blockingTiles.findIndex(function(blockingTile) {
                return blockingTile.x == tile.x - 1 && blockingTile.y == tile.y;
            });
        }
        if (adjacentTileIndex < 0) {
            adjacentTileIndex = blockers.findIndex(function(blocker) {
                return blocker.x == tile.x - 1 && blocker.y == tile.y;
            });
        }
        return adjacentTileIndex != -1;
    }

    GridCalculator.calculateMutualLoSTiles = function(attackerLoS, defenderLoS) {
        var mutualLOSTiles = attackerLoS.filter(function (attackerLoSTile) {
            var defenderTileIndex = defenderLoS.findIndex(function (defenderLoSTile) {
                return defenderLoSTile.x == attackerLoSTile.x && defenderLoSTile.y == attackerLoSTile.y;
            });
            return defenderTileIndex > -1;
        });
    
        var attackerOnlyLOSTiles = attackerLoS.filter(function (attackerLoSTile) {
            var mutualTileIndex = mutualLOSTiles.findIndex(function (mutualLoSTile) {
                return mutualLoSTile.x == attackerLoSTile.x && mutualLoSTile.y == attackerLoSTile.y;
            });
            return mutualTileIndex == -1;
        });
    
        var defenderOnlyLOSTiles = defenderLoS.filter(function (defenderLoSTile) {
            var mutualTileIndex = mutualLOSTiles.findIndex(function (mutualLoSTile) {
                return mutualLoSTile.x == defenderLoSTile.x && mutualLoSTile.y == defenderLoSTile.y;
            });
            return mutualTileIndex == -1;
        });
    
        return {
            attackerLOSTiles: attackerOnlyLOSTiles,
            defenderLOSTiles: defenderOnlyLOSTiles,
            mutualLOSTiles: mutualLOSTiles
        };
    }

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