var stage, timeCircle, tickCircle, unitList = [],
	playerList = [],
	keys = [],
	collisionTree,
	activePlayer,
	particlesList;


function spawnAll() {
	for (var i = 0; i < monsterList.length; i++) {
		spawnUnit(i, 0);
	}
	console.log(activePlayer.unitList.length)
}

function init() {

	playerList[0] = new player(0, true)
	playerList[0].hero = new hero(heroList['warrior'], [new spellList['singleTargetSlow'], new spellList['singleTargetStun'], new spellList['aoeSlow'], new spellList['aoeStun']], 450, 450, 0)
	activePlayer = playerList[0]
	ctx = activePlayer.stage.canvas.getContext('2d')
	console.log(ctx)
	bounds = {
		x: ctx.canvas.offsetLeft,
		y: ctx.canvas.offsetTop,
		w: ctx.canvas.width,
		h: ctx.canvas.height
	}
	console.log(bounds)
	collisionTree = QUAD.init(bounds);
	console.log(collisionTree)

	console.log(playerList[0])

	for (var i = 0; i < monsterList.length; i++) {
		spawnUnit(i, 0);
	}



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
		activePlayer.hero.levelSpell(e.keyCode)
	} else {
		activePlayer.hero.castSpell(e.keyCode)
	}

}


function handleClick(event) {
	if (event.currentTarget.canvas == activePlayer.stage.canvas) {
		if (activePlayer.stage.mouseInBounds == true) {
			activePlayer.hero.updateWaypoint(event);
		}
	}
}


function updateCollisionTree(event) {
	collisionTree.clear();
	for (var n = 0; n < playerList.length; n++) {
		for (var i = 0; i < playerList[n].unitList.length; i++) {
			if (playerList[n].unitList[i].alive == true) {
				collisionTree.insert(playerList[n].unitList[i])
			}
		}
	}
}

function gameLoop(event) {
	for (var player in playerList) { //Check each player in the game
		playerList[player].hero.update(event) //Update the hero object for this play
		for (var unit in playerList[player].unitList) {
			playerList[player].unitList[unit].update(event) //Update every unit spawned against this player
		}
		playerList[player].unitList = playerList[player].unitList.filter(function(x) { //Filter dead units from the player
			return x.alive == true;
		})
		playerList[player].stage.update(event); //Finally update the stage with all of our changes.
	}
	updateCollisionTree(event)
}