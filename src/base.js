var stage, timeCircle, tickCircle, unitList = [],
	playerList = [],
	heroList = [],
	activePlayer = null;

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

	player1 = {
		stats: {
			AD: 5,
			HP: 5,
			MP: 5,
			MD: 5,
			MR: 5,
			AR: 5,
			MS: 11,
			RN: 15,
			AS: 10,
		},
		color: "green",
		spells: {}
	}

	heroList[heroList.length] = new hero(player1, 450, 450, 0)
	//heroList[heroList.length] = new hero(player1, 150, 150, 1)
	playerList[0].hero = heroList[0]
	//playerList[1].hero = heroList[1]
	activePlayer = playerList[0]

	console.log(playerList)


	createjs.Ticker.on("tick", gameLoop);
	createjs.Ticker.setFPS(60);

	// test = document.getElementById("player0Canvas").id = "player1Canvas"
	// console.log(test)
	// test.id = "player1Canvas"


	activePlayer.stage.addEventListener("stagemouseup", handleClick);

	console.log(playerList[0].unitList)
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
			playerList[n].unitList[i].updateEffects(event)
			playerList[n].unitList[i].move(event)
			playerList[n].unitList[i].handleCombat()
			if (playerList[n].unitList[i].alive == false) {
				playerList[n].unitList[i].player.stage.removeChild(playerList[n].unitList[i].stageobject)
				playerList[n].unitList.splice(i, 1)
				i--;
			}
			
		}
	}

	for (var i = 0; i < playerList.length; i++) {
		playerList[i].hero.updateEffects(event)
		playerList[i].hero.move(event)
		playerList[i].hero.handleCombat()
	}


	for (var i = 0; i < playerList.length; i++) {
		playerList[i].stage.update(event);
	}

}