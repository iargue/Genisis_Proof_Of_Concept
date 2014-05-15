function msToTime(duration) {
	var milliseconds = parseInt((duration % 1000) / 100),
		seconds = parseInt((duration / 1000) % 60),
		minutes = parseInt((duration / (1000 * 60)) % 60),
		hours = parseInt((duration / (1000 * 60 * 60)) % 24);

	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	return hours + ":" + minutes + ":" + seconds;
}



function timeToMs(str) {
	var p = str.split(':'),
		s = 0,
		m = 1;

	while (p.length > 0) {
		s += m * parseInt(p.pop(), 10);
		m *= 60;
	}

	return s * 1000;
}

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
	var y = playerStage.canvas.height - 50;
	var blackList = []
	for (var particle in particleList) {
		blackList.push(particleList[particle].stageObject.y)
	}
	while (true) { //Be cafefull with this one luke
		if (blackList.indexOf(y) != -1) {
			y -= 20;
		} else {
			var textObject = new createjs.Text(text, "12px " + textFont, color);
			textObject.x = playerStage.canvas.width / 2;
			textObject.y = y;
			playerStage.addChild(textObject);
			particleList.push(new textParticle(textObject, 2000));
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
	// hero.spells[spellNumber].coolDown = hero.spells[spellNumber].coolDownPerLevel[hero.spells[spellNumber].level] //Current cooldown based on level of spell
	hero.spells[spellNumber].coolDown = 1 //URF MODE ACTIVATED
	hero.spells[spellNumber].damage = hero.spells[spellNumber].damagePerLevel[hero.spells[spellNumber].level] //Damage based on level
	if (hero.spells[spellNumber].effect) {
		hero.spells[spellNumber].effect = new effect(hero.spells[spellNumber].effectAmountPerLevel[hero.spells[spellNumber].level], hero.spells[spellNumber].effectDurationPerLevel[hero.spells[spellNumber].level], hero.spells[spellNumber].effectType)
	}
	hero.spellLevels -= 1 //Hero has 1 less spell he can level up
	if (spellButtons) {
		spellButtons[spellNumber].levelText.text = hero.spells[spellNumber].level //Add in the text for what level the spell is
	}

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
	}]
	if (side == 0) {
		for (var player in hero.player.team.playerList) {
			for (var spawn in spawnListOne) {
				if (hero.player.team.playerList[player].hero.checkCollision(spawnListOne[spawn].x, spawnListOne[spawn].y, 60)) {
					continue;
				} else {
					hero.stageObject.x = spawnListOne[spawn].x;
					hero.stageObject.y = spawnListOne[spawn].y;
					hero.moveWayPoint.x = hero.stageObject.x;
					hero.moveWayPoint.y = hero.stageObject.y;
					hero.miniMapObject.x = Math.round(hero.stageObject.x / miniMapRatio.width);
					hero.miniMapObject.y = Math.round(hero.stageObject.y / miniMapRatio.height);
					return;
				}
			}
		}
	}
	console.log('nope');
}

function spawnUnit(monsterNumber) {
	blackList = [];
	nodeOkay = false;
	x = 10
	if (opponentTeam == activeTeam) {
		y = getRandom10(20, 960);
	} else {
		y = getRandom10(1020, 1960);
	}

	if (activePlayer.hero.gold > monsterList[activePlayer.summonLevel][monsterNumber].cost) {
		if (monsterNumber == 9) {
			activePlayer.summonLevel += 1;
			activePlayer.hero.gold -= monsterList[activePlayer.summonLevel][monsterNumber].cost;
		} else {
			unit = new monster(monsterList[activePlayer.summonLevel][monsterNumber], x, y, activePlayer)
			opponentTeam.unitList.push(unit)
			collisionTree.insert(unit)
			activePlayer.hero.gold -= monsterList[activePlayer.summonLevel][monsterNumber].cost
			activePlayer.hero.income += monsterList[activePlayer.summonLevel][monsterNumber].incomeGain
		}
	} else {
		displayText("Not enough gold to summon", "red")
	}


}

function moveTo(unit, targetX, targetY, steps) {
	// Calculate direction towards target
	towardsX = targetX - unit.stageObject.x;
	towardsY = targetY - unit.stageObject.y;


	toPlayerLength = Math.sqrt(towardsX * towardsX + towardsY * towardsY);
	if (toPlayerLength > steps) {
		towardsX = towardsX / toPlayerLength;
		towardsY = towardsY / toPlayerLength;

		// Move towards the player
		if (unit.animationObject) {
			// var angle = Math.atan2(towardsY, towardsX);
			// angle = angle * (180 / Math.PI);
			// if (angle < 0) {
			// 	angle = 360 - (-angle)
			// }
			// if (unit.animationObject.rotation <= Math.round(angle)) {
			// 	unit.animationObject.rotation += Math.round(steps)
			// } else if (unit.animationObject.rotation >= Math.round(angle)) {
			// 	unit.animationObject.rotation -= Math.round(steps)
			// }
			// unit.animationObject.rotation = angle //Rotate
			// console.log(unit.animationObject.rotation)
			// if (90 < unit.animationObject.rotation && unit.animationObject.rotation < 300) {
			// 	unit.animationObject.direction = 1
			// 	unit.animationObject.scaleY = -1
			// } else {
			// 	unit.animationObject.direction = 1
			// 	unit.animationObject.scaleY = 1
			// }
			if (towardsX > 0) {
				if (unit.animationObject.direction != 1) {
					unit.animationObject.direction = 1
					unit.animationObject.gotoAndPlay("walk_h");
				} else if (unit.animationObject.currentAnimation.indexOf("walk_h") === -1) {
					unit.animationObject.gotoAndPlay("walk_h");
				}

			} else {
				if (unit.animationObject.direction != -1) {
					unit.animationObject.direction = -1
					unit.animationObject.gotoAndPlay("walk");
				} else if (unit.animationObject.currentAnimation.indexOf("walk") === -1) {
					unit.animationObject.gotoAndPlay("walk");
				}
			}
			unit.animationObject.isInIdleMode = false
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
		unit.miniMapObject.x = Math.round(unit.stageObject.x / miniMapRatio.width)
		unit.miniMapObject.y = Math.round(unit.stageObject.y / miniMapRatio.height)

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

function isInTriangle(px, py, ax, ay, bx, by, cx, cy) {

	// This is not readable at all, but this uses the  Barycentric coordinate method to test for collision with a triangle.
	//px,py are the point you want to test
	//ax,ay, bx,by, cx,cy are the 3 points that make the triangle.

	var v0 = [cx - ax, cy - ay];
	var v1 = [bx - ax, by - ay];
	var v2 = [px - ax, py - ay];

	var dot00 = (v0[0] * v0[0]) + (v0[1] * v0[1]);
	var dot01 = (v0[0] * v1[0]) + (v0[1] * v1[1]);
	var dot02 = (v0[0] * v2[0]) + (v0[1] * v2[1]);
	var dot11 = (v1[0] * v1[0]) + (v1[1] * v1[1]);
	var dot12 = (v1[0] * v2[0]) + (v1[1] * v2[1]);

	var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);

	var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
	var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

	return ((u >= 0) && (v >= 0) && (u + v < 1));
}