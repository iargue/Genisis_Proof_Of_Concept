var stage, timeCircle, tickCircle, unitList = [],
	playerList = [],
	keys = [],
	activePlayer = null;

var KEYCODE_Q = 81;
var KEYCODE_W = 87;
var KEYCODE_E = 69;
var KEYCODE_R = 82;


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

function effect(effectAmount, effectDuration, effectType) {
	this.effectAmount = effectAmount
	this.effectDuration = effectDuration
	this.appliedTime = null;
	this.effectType = effectType
}

function spawnUnit(monsterNumber, player) {
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
	playerList[player].unitList[this.playerList[player].unitList.length] = new monster(monsterList[monsterNumber], x, y, player)
}

function spawnAll() {
	for (var i = 0; i < monsterList.length; i++) {
		spawnUnit(i, 0);
	}
	console.log(unitList.length)
}

function init() {
	// stage = new createjs.Stage("demoCanvas");

	playerList[0] = new player(0, true)
	//playerList[1] = new player(1, false)

	console.log(playerList[0])

	for (var i = 0; i < monsterList.length; i++) {
		spawnUnit(i, 0);
	}
	// spawnUnit(2, 0)


	normalSlow = new effect(20, 7000, "slow")
	normalStun = new effect(1, 3000, "stun")


	console.log(heroList)
	//heroList[heroList.length] = new hero(player1, 150, 150, 1)
	playerList[0].hero = new hero(heroList['warrior'], [spellList['singleTargetSlow'], spellList['singleTargetStun']], 450, 450, 0)
	//playerList[1].hero = heroList[1]
	activePlayer = playerList[0]

	console.log(playerList)


	createjs.Ticker.on("tick", gameLoop);
	createjs.Ticker.setFPS(60);
	document.onkeydown = handleKeyDown;



	activePlayer.stage.addEventListener("stagemouseup", handleClick);

}

function handleKeyDown(e) {
	if (!e) {
		var e = window.event;
	}
	if (e.shiftKey) {

	} else {
		switch (e.keyCode) {
			case KEYCODE_Q:
				activePlayer.hero.castQ();
				return false;
			case KEYCODE_W:
				activePlayer.hero.castW();
				return false;
			case KEYCODE_E:
				activePlayer.hero.castE();
				return false;
			case KEYCODE_R:
				activePlayer.hero.castR();
				return false;
		}
	}

}


function handleClick(event) {
	if (event.currentTarget.canvas == activePlayer.stage.canvas) {
		if (activePlayer.stage.mouseInBounds == true) {
			activePlayer.hero.updateWaypoint(event);
		}
	}
}

function switchCanvas() {

}

function gameLoop(event) {
	for (var n = 0; n < playerList.length; n++) {
		for (var i = 0; i < playerList[n].unitList.length; i++) {
			playerList[n].unitList[i].update(event)
			if (playerList[n].unitList[i].alive == false) {
				playerList[n].unitList.splice(i, 1)
				i--;
			}

		}
	}

	for (var i = 0; i < playerList.length; i++) {
		playerList[i].hero.update(event)
	}


	for (var i = 0; i < playerList.length; i++) {
		playerList[i].stage.update(event);
	}

}