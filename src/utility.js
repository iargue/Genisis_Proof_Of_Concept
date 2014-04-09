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

function displayText(text, color) {
	var y = playerStage.canvas.height - 50
	var blackList = []
	for (var particle in particleList) {
		blackList.push(particleList[particle].stageObject.y)
	}
	while (true) { //Be cafefull with this one luke
		if (blackList.indexOf(y) != -1) {
			y -= 20
		} else {
			var textObject = new createjs.Text(text, "12px Calibri", color);
			textObject.x = playerStage.canvas.width / 2
			textObject.y = y
			playerStage.addChild(textObject)
			particleList.push(new textParticle(textObject, 2000))
			break;
		}
		if (y < playerStage.canvas.height / 2 + playerStage.canvas.height / 4) {
			break
		}
	}
}

function levelSpell(hero, spellNumber) {
	if ((hero.level / 3) < hero.spells[spellNumber].level) {
		return
	}

	hero.spells[spellNumber].level += 1 //Increase level of spell
	hero.spells[spellNumber].range = hero.spells[spellNumber].rangePerLevel[hero.spells[spellNumber].level]
	hero.spells[spellNumber].damage = hero.spells[spellNumber].damagePerLevel[hero.spells[spellNumber].level] //Current damage based on level of spell
	hero.spells[spellNumber].coolDown = hero.spells[spellNumber].coolDownPerLevel[hero.spells[spellNumber].level] //Current cooldown based on level of spell
	hero.spells[spellNumber].damage = hero.spells[spellNumber].damagePerLevel[hero.spells[spellNumber].level] //Damage based on level
	hero.spells[spellNumber].coolDown = hero.spells[spellNumber].coolDownPerLevel[hero.spells[spellNumber].level] //Cooldown based on level
	if (hero.spells[spellNumber].effect) {
		hero.spells[spellNumber].effect = new effect(hero.spells[spellNumber].effectAmountPerLevel[hero.spells[spellNumber].level], hero.spells[spellNumber].effectDurationPerLevel[hero.spells[spellNumber].level], "slow")
	}
	hero.spellLevels -= 1 //Hero has 1 less spell he can level up
}

function spawnHero(hero, side) {
	spawnListOne = [{
			x: 1850,
			y: 500
		}, {
			x: 1850,
			y: 400
		}, {
			x: 1850,
			y: 600
		}

	]
	if (side == 0) {
		console.log(hero.player.team.playerList)
		for (var player in hero.player.team.playerList) {
			for (var spawn in spawnListOne) {
				console.log(spawnListOne[spawn].x)
				if (hero.player.team.playerList[player].hero.checkCollision(spawnListOne[spawn].x, spawnListOne[spawn].y, 60)) {
					continue
				} else {
					hero.stageObject.x = spawnListOne[spawn].x
					hero.stageObject.y = spawnListOne[spawn].y
					hero.moveWayPoint.x = hero.stageObject.x
					hero.moveWayPoint.y = hero.stageObject.y
					hero.miniMapObject.x = Math.round(hero.stageObject.x / 10)
					hero.miniMapObject.y = Math.round(hero.stageObject.y / 10)
					return
				}
			}
		}
	}
	console.log('nope')
}

function spawnUnit(monsterNumber) {
	blackList = []
	nodeOkay = false
	x = 10
	if (opponentTeam == activeTeam) {
		y = getRandom10(20, 960);
	} else {
		y = getRandom10(1020, 1960)
	}

	// for (var i = 0; i < unitList.length; i++) {
	// 	if (unitList[i].checkCollision(x, y, 16)) {
	// 		blackList.push(y)
	// 		if (blackList.length >= 54) {
	// 			x += 10
	// 			blackList = 0
	// 			nodeOkay = true
	// 		} else {
	// 			nodeOkay = false
	// 		}
	// 		while (nodeOkay == false) {
	// 			y = getRandom10(10, 560);
	// 			if ($.inArray(y, blackList) === -1) {
	// 				nodeOkay = true
	// 			}

	// 		}
	// 	}
	// }
	console.log(monsterList)
	if (activePlayer.hero.gold > monsterList[activePlayer.summonLevel][monsterNumber].cost) {
		if (monsterNumber == 9) {
			activePlayer.summonLevel += 1
			activePlayer.hero.gold -= monsterList[activePlayer.summonLevel][monsterNumber].cost
		} else {
			unit = new monster(monsterList[activePlayer.summonLevel][monsterNumber], x, y, activePlayer)
			opponentTeam.unitList.push(unit)
			collisionTree.insert(unit)
			activePlayer.hero.gold -= monsterList[activePlayer.summonLevel][monsterNumber].cost
		}
	} else {
		displayText("Not enough gold to summon", "red")
	}


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
		if (unit.animationObject) {
			var angle = Math.atan2(towardsY, towardsX);
			angle = angle * (180 / Math.PI);
			if (angle < 0) {
				angle = 360 - (-angle)
			}
			// if (unit.animationObject.rotation <= Math.round(angle)) {
			// 	unit.animationObject.rotation += Math.round(steps)
			// } else if (unit.animationObject.rotation >= Math.round(angle)) {
			// 	unit.animationObject.rotation -= Math.round(steps)
			// }
			unit.animationObject.rotation = angle //Rotate
			// console.log(unit.animationObject.rotation)
			if (90 < unit.animationObject.rotation && unit.animationObject.rotation < 300) {
				unit.animationObject.direction = 1
				unit.animationObject.scaleY = -1
			} else {
				unit.animationObject.direction = 1
				unit.animationObject.scaleY = 1
			}
			unit.animationObject.isInIdleMode = false
			if (unit.animationObject.currentAnimation.indexOf("walk") === -1 && unit.animationObject.direction === -1) {
				unit.animationObject.gotoAndPlay("walk");
			}
			if (unit.animationObject.currentAnimation.indexOf("walk_h") === -1 && unit.animationObject.direction === 1) {
				unit.animationObject.gotoAndPlay("walk_h");
			}
		}
		unit.stageObject.x += towardsX * steps;
		unit.stageObject.y += towardsY * steps;

	} else {
		if (unit.animationObject) {
			unit.animationObject.gotoAndPlay("idle")
			unit.animationObject.isInIdleMode = true
			unit.animationObject.rotation = 0
			unit.animationObject.scaleY = 1
		}
		unit.stageObject.x = targetX
		unit.stageObject.y = targetY
	}
	if (unit.miniMapObject) {
		unit.miniMapObject.x = Math.round(unit.stageObject.x / 10)
		unit.miniMapObject.y = Math.round(unit.stageObject.y / 10)

	}

}

function distance(firstUnit, secondUnit) {
	var xDist = Math.abs(firstUnit.stageObject.x - secondUnit.stageObject.x)
	var yDist = Math.abs(firstUnit.stageObject.y - secondUnit.stageObject.y)
	return Math.sqrt(xDist * xDist + yDist * yDist);
}

function distanceTo(x, y, toX, toY) {
	var xDist = Math.abs(x - toX)
	var yDist = Math.abs(y - toY)
	return Math.sqrt(xDist * xDist + yDist * yDist);
}