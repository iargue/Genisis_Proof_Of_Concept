function getRandom10(min, max) {
	return getRandomInt(min / 10, max / 10) * 10;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function Clone(x) {
	for (p in x)
		this[p] = (typeof(x[p]) == 'object') ? new Clone(x[p]) : x[p];
}

function spawnUnit(monsterNumber) {
	blackList = []
	nodeOkay = false
	x = 10
	y = getRandom10(10, 560);

	for (var i = 0; i < unitList.length; i++) {
		if (unitList[i].hitRadius(x, y, 11)) {
			blackList.push(y)
			if (blackList.length >= 54) {
				x += 10
				blackList = 0
				nodeOkay = true
			} else {
				nodeOkay = false
			}
			while (nodeOkay == false) {
				y = getRandom10(10, 560);
				if ($.inArray(y, blackList) === -1) {
					nodeOkay = true
				}

			}
		}
	}
	unit = new monster(monsterList[monsterNumber], x, y, activePlayer)
	opponentTeam.unitList.push(unit)
	collisionTree.insert(unit)
}

function moveTo(unit, targetX, targetY, steps) {
	// Calculate direction towards target
	towardsX = targetX - unit.stageObject.x;
	towardsY = targetY - unit.stageObject.y;

	// Normalize
	toPlayerLength = Math.sqrt(towardsX * towardsX + towardsY * towardsY);
	if (toPlayerLength > steps) {
		towardsX = towardsX / toPlayerLength;
		towardsY = towardsY / toPlayerLength;

		// Move towards the player
		unit.stageObject.x += towardsX * steps;
		unit.stageObject.y += towardsY * steps;
	} else {
		unit.stageObject.x = targetX
		unit.stageObject.y = targetY
	}

}

function distance(firstUnit, secondUnit) {
	var xDist = Math.abs(firstUnit.stageObject.x - secondUnit.stageObject.x)
	var yDist = Math.abs(firstUnit.stageObject.y - secondUnit.stageObject.y)
	return Math.sqrt(xDist * xDist + yDist * yDist);
}