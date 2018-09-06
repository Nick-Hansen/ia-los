
var mapName = 'Tarkin_Initiative_Labs';

var tarkin_initiative_labs_map = {
	name: mapName,
	title: 'Tarkin Initiative Labs',
	width: 17,
	height: 18,
	walls: [
		[ { x: 4, y: 1 }, { x: 4, y: 2 } ],
		[ { x: 13, y: 1 }, { x: 13, y: 2 } ],
		[ { x: 4, y: 4 }, { x: 4, y: 5 } ],
		[ { x: 4, y: 5 }, { x: 4, y: 6 } ],
		[ { x: 4, y: 6 }, { x: 4, y: 7 } ],
		[ { x: 6, y: 5 }, { x: 7, y: 5 } ],
		[ { x: 6, y: 12 }, { x: 6, y: 13 } ],
		[ { x: 6, y: 13 }, { x: 6, y: 14 } ],
		[ { x: 12, y: 13 }, { x: 12, y: 14 } ],
	],
	blockingTiles: [
		{ x: 3, y: 1 },
		{ x: 16, y: 2 },
		{ x: 1, y: 3 },
		{ x: 6, y: 3 },
		{ x: 16, y: 4 },
		{ x: 9, y: 8 },
	],
	blockingEdges: [],
	blockingIntersections: [
		{ x: 4, y: 1, connections: [
			{ x: 4, y: 0 },
			{ x: 5, y: 1 },
			{ x: 4, y: 2 },
			{ x: 3, y: 1 }
		]},
		{ x: 13, y: 1, connections: [
			{ x: 13, y: 0 },
			{ x: 13, y: 2 },
			{ x: 12, y: 1 }
		]},
		{ x: 17, y: 2, connections: [
			{ x: 17, y: 1 },
			{ x: 18, y: 2 },
			{ x: 17, y: 3 },
			{ x: 16, y: 2 }
		]},
		{ x: 17, y: 3, connections: [
			{ x: 17, y: 2 },
			{ x: 18, y: 3 },
			{ x: 17, y: 4 },
			{ x: 16, y: 3 }
		]},
		{ x: 7, y: 4, connections: [
			{ x: 7, y: 3 },
			{ x: 8, y: 4 },
			{ x: 7, y: 5 },
			{ x: 6, y: 4 }
		]},
		{ x: 17, y: 4, connections: [
			{ x: 17, y: 3 },
			{ x: 18, y: 4 },
			{ x: 17, y: 5 },
			{ x: 16, y: 4 }
		]},
		{ x: 4, y: 5, connections: [
			{ x: 4, y: 4 },
			{ x: 4, y: 6 }
		]},
		{ x: 7, y: 5, connections: [
			{ x: 7, y: 4 },
			{ x: 8, y: 5 },
			{ x: 6, y: 5 }
		]},
		{ x: 17, y: 5, connections: [
			{ x: 17, y: 4 },
			{ x: 18, y: 5 },
			{ x: 17, y: 6 },
			{ x: 16, y: 5 }
		]},
		{ x: 4, y: 6, connections: [
			{ x: 4, y: 5 },
			{ x: 4, y: 7 }
		]},
		{ x: 4, y: 7, connections: [
			{ x: 4, y: 6 },
			{ x: 5, y: 7 },
			{ x: 4, y: 8 }
		]},
		{ x: 10, y: 8, connections: [
			{ x: 10, y: 7 },
			{ x: 11, y: 8 },
			{ x: 10, y: 9 },
			{ x: 9, y: 8 }
		]},
		{ x: 6, y: 12, connections: [
			{ x: 6, y: 11 },
			{ x: 7, y: 12 },
			{ x: 6, y: 13 }
		]},
		{ x: 6, y: 13, connections: [
			{ x: 6, y: 12 },
			{ x: 6, y: 14 }
		]},
		{ x: 12, y: 13, connections: [
			{ x: 12, y: 12 },
			{ x: 13, y: 13 },
			{ x: 12, y: 14 }
		]}
	],
	offMapTiles: [
		{ x: 4, y: 0 },
		{ x: 5, y: 0 },
		{ x: 6, y: 0 },
		{ x: 7, y: 0 },
		{ x: 8, y: 0 },
		{ x: 9, y: 0 },
		{ x: 10, y: 0 },
		{ x: 11, y: 0 },
		{ x: 12, y: 0 },
		{ x: 8, y: 1 },
		{ x: 7, y: 4 },
		{ x: 8, y: 4 },
		{ x: 9, y: 4 },
		{ x: 12, y: 4 },
		{ x: 12, y: 5 },
		{ x: 12, y: 5 },
		{ x: 0, y: 6 },
		{ x: 1, y: 6 },
		{ x: 1, y: 6 },
		{ x: 12, y: 6 },
		{ x: 15, y: 6 },
		{ x: 16, y: 6 },
		{ x: 0, y: 7 },
		{ x: 1, y: 7 },
		{ x: 4, y: 7 },
		{ x: 5, y: 7 },
		{ x: 6, y: 7 },
		{ x: 7, y: 7 },
		{ x: 10, y: 7 },
		{ x: 11, y: 7 },
		{ x: 12, y: 7 },
		{ x: 15, y: 7 },
		{ x: 16, y: 7 },
		{ x: 0, y: 8 },
		{ x: 1, y: 8 },
		{ x: 15, y: 8 },
		{ x: 16, y: 8 },
		{ x: 0, y: 9 },
		{ x: 1, y: 9 },
		{ x: 15, y: 9 },
		{ x: 16, y: 9 },
		{ x: 0, y: 10 },
		{ x: 1, y: 10 },
		{ x: 2, y: 10 },
		{ x: 3, y: 10 },
		{ x: 6, y: 10 },
		{ x: 7, y: 10 },
		{ x: 10, y: 10 },
		{ x: 11, y: 10 },
		{ x: 12, y: 10 },
		{ x: 15, y: 10 },
		{ x: 16, y: 10 },
		{ x: 0, y: 11 },
		{ x: 1, y: 11 },
		{ x: 2, y: 11 },
		{ x: 3, y: 11 },
		{ x: 6, y: 11 },
		{ x: 7, y: 11 },
		{ x: 10, y: 11 },
		{ x: 11, y: 11 },
		{ x: 12, y: 11 },
		{ x: 15, y: 11 },
		{ x: 16, y: 11 },
		{ x: 0, y: 12 },
		{ x: 1, y: 12 },
		{ x: 2, y: 12 },
		{ x: 3, y: 12 },
		{ x: 12, y: 12 },
		{ x: 15, y: 12 },
		{ x: 16, y: 12 },
		{ x: 0, y: 13 },
		{ x: 1, y: 13 },
		{ x: 2, y: 13 },
		{ x: 3, y: 13 },
		{ x: 15, y: 13 },
		{ x: 16, y: 13 },
		{ x: 0, y: 14 },
		{ x: 1, y: 14 },
		{ x: 2, y: 14 },
		{ x: 3, y: 14 },
		{ x: 15, y: 14 },
		{ x: 16, y: 14 },
		{ x: 0, y: 15 },
		{ x: 1, y: 15 },
		{ x: 2, y: 15 },
		{ x: 3, y: 15 },
		{ x: 15, y: 15 },
		{ x: 16, y: 15 },
		{ x: 0, y: 16 },
		{ x: 1, y: 16 },
		{ x: 2, y: 16 },
		{ x: 3, y: 16 },
		{ x: 4, y: 16 },
		{ x: 5, y: 16 },
		{ x: 12, y: 16 },
		{ x: 13, y: 16 },
		{ x: 14, y: 16 },
		{ x: 15, y: 16 },
		{ x: 16, y: 16 },
		{ x: 0, y: 17 },
		{ x: 1, y: 17 },
		{ x: 2, y: 17 },
		{ x: 3, y: 17 },
		{ x: 4, y: 17 },
		{ x: 5, y: 17 },
		{ x: 12, y: 17 },
		{ x: 13, y: 17 },
		{ x: 14, y: 17 },
		{ x: 15, y: 17 },
		{ x: 16, y: 17 },
	]
};

if (ia_los_maps) {
	ia_los_maps[mapName] = tarkin_initiative_labs_map;
	$('#map_load').trigger('map_loaded', [ mapName ]);
} else {
	ia_los_maps = {};
	ia_los_maps[mapName] = tarkin_initiative_labs_map;
	$('#map_load').trigger('map_loaded', [ mapName ]);
}