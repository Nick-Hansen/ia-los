QUnit.module( "calculate mutual LoS tiles" );
QUnit.test("0 attackers, 0 defenders, 0 mutual", function( assert ) {
	//arrange
	var attackerLoSTiles = [];
	var defenderLoSTiles = [];
	var expectedAttackerLoSTiles = [];
	var expectedDefenderLoSTiles = [];
	var expectedMutualLoSTiles = [];
	var gridCalculator = GridCalculator();

	//act
	var result = gridCalculator.calculateMutualLoSTiles(attackerLoSTiles, defenderLoSTiles);
	var resultAttackerLoSTiles = result.attackerLOSTiles;
	var resultDefenderLoSTiles = result.defenderLOSTiles;
	var resultMutualLoSTiles = result.mutualLOSTiles;
	
	//assert
	assert.deepEqual(expectedAttackerLoSTiles, resultAttackerLoSTiles, "attacker tiles match" );
	assert.deepEqual(expectedDefenderLoSTiles, resultDefenderLoSTiles, "defender tiles match" );
	assert.deepEqual(expectedMutualLoSTiles, resultMutualLoSTiles, "mutual tiles match" );
});

QUnit.test("1 attackers, 0 defenders, 0 mutual", function( assert ) {
	//arrange
	var attackerLoSTiles = [{ x: 0, y: 0 }];
	var defenderLoSTiles = [];
	var expectedAttackerLoSTiles = [{ x: 0, y: 0 }];
	var expectedDefenderLoSTiles = [];
	var expectedMutualLoSTiles = [];
	var gridCalculator = GridCalculator();

	//act
	var result = gridCalculator.calculateMutualLoSTiles(attackerLoSTiles, defenderLoSTiles);
	var resultAttackerLoSTiles = result.attackerLOSTiles;
	var resultDefenderLoSTiles = result.defenderLOSTiles;
	var resultMutualLoSTiles = result.mutualLOSTiles;
	
	//assert
	assert.deepEqual(expectedAttackerLoSTiles, resultAttackerLoSTiles, "attacker tiles match" );
	assert.deepEqual(expectedDefenderLoSTiles, resultDefenderLoSTiles, "defender tiles match" );
	assert.deepEqual(expectedMutualLoSTiles, resultMutualLoSTiles, "mutual tiles match" );
});

QUnit.test("0 attackers, 1 defenders, 0 mutual", function( assert ) {
	//arrange
	var attackerLoSTiles = [];
	var defenderLoSTiles = [{ x: 0, y: 0 }];
	var expectedAttackerLoSTiles = [];
	var expectedDefenderLoSTiles = [{ x: 0, y: 0 }];
	var expectedMutualLoSTiles = [];
	var gridCalculator = GridCalculator();

	//act
	var result = gridCalculator.calculateMutualLoSTiles(attackerLoSTiles, defenderLoSTiles);
	var resultAttackerLoSTiles = result.attackerLOSTiles;
	var resultDefenderLoSTiles = result.defenderLOSTiles;
	var resultMutualLoSTiles = result.mutualLOSTiles;
	
	//assert
	assert.deepEqual(expectedAttackerLoSTiles, resultAttackerLoSTiles, "attacker tiles match" );
	assert.deepEqual(expectedDefenderLoSTiles, resultDefenderLoSTiles, "defender tiles match" );
	assert.deepEqual(expectedMutualLoSTiles, resultMutualLoSTiles, "mutual tiles match" );
});

QUnit.test("1 attackers, 1 defenders, 0 mutual", function( assert ) {
	//arrange
	var attackerLoSTiles = [{ x: 0, y: 0 }];
	var defenderLoSTiles = [{ x: 1, y: 1 }];
	var expectedAttackerLoSTiles = [{ x: 0, y: 0 }];
	var expectedDefenderLoSTiles = [{ x: 1, y: 1 }];
	var expectedMutualLoSTiles = [];
	var gridCalculator = GridCalculator();

	//act
	var result = gridCalculator.calculateMutualLoSTiles(attackerLoSTiles, defenderLoSTiles);
	var resultAttackerLoSTiles = result.attackerLOSTiles;
	var resultDefenderLoSTiles = result.defenderLOSTiles;
	var resultMutualLoSTiles = result.mutualLOSTiles;
	
	//assert
	assert.deepEqual(expectedAttackerLoSTiles, resultAttackerLoSTiles, "attacker tiles match" );
	assert.deepEqual(expectedDefenderLoSTiles, resultDefenderLoSTiles, "defender tiles match" );
	assert.deepEqual(expectedMutualLoSTiles, resultMutualLoSTiles, "mutual tiles match" );
});

QUnit.test("1 attackers, 1 defenders, 1 mutual", function( assert ) {
	//arrange
	var attackerLoSTiles = [{ x: 0, y: 0 }];
	var defenderLoSTiles = [{ x: 0, y: 0 }];
	var expectedAttackerLoSTiles = [];
	var expectedDefenderLoSTiles = [];
	var expectedMutualLoSTiles = [{ x: 0, y: 0 }];
	var gridCalculator = GridCalculator();

	//act
	var result = gridCalculator.calculateMutualLoSTiles(attackerLoSTiles, defenderLoSTiles);
	var resultAttackerLoSTiles = result.attackerLOSTiles;
	var resultDefenderLoSTiles = result.defenderLOSTiles;
	var resultMutualLoSTiles = result.mutualLOSTiles;
	
	//assert
	assert.deepEqual(expectedAttackerLoSTiles, resultAttackerLoSTiles, "attacker tiles match" );
	assert.deepEqual(expectedDefenderLoSTiles, resultDefenderLoSTiles, "defender tiles match" );
	assert.deepEqual(expectedMutualLoSTiles, resultMutualLoSTiles, "mutual tiles match" );
});

QUnit.test("2 attackers, 2 defenders, 1 mutual", function( assert ) {
	//arrange
	var attackerLoSTiles = [{ x: 0, y: 0 }, { x: 0, y: 1 }];
	var defenderLoSTiles = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
	var expectedAttackerLoSTiles = [{ x: 0, y: 1 }];
	var expectedDefenderLoSTiles = [{ x: 1, y: 0 }];
	var expectedMutualLoSTiles = [{ x: 0, y: 0 }];
	var gridCalculator = GridCalculator();

	//act
	var result = gridCalculator.calculateMutualLoSTiles(attackerLoSTiles, defenderLoSTiles);
	var resultAttackerLoSTiles = result.attackerLOSTiles;
	var resultDefenderLoSTiles = result.defenderLOSTiles;
	var resultMutualLoSTiles = result.mutualLOSTiles;
	
	//assert
	assert.deepEqual(expectedAttackerLoSTiles, resultAttackerLoSTiles, "attacker tiles match" );
	assert.deepEqual(expectedDefenderLoSTiles, resultDefenderLoSTiles, "defender tiles match" );
	assert.deepEqual(expectedMutualLoSTiles, resultMutualLoSTiles, "mutual tiles match" );
});