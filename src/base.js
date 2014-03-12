var stage, timeCircle, tickCircle, unitList = [],
	playerList = [],
	keys = [],
	collisionTree,
	activePlayer;



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
	activePlayer.stage.setBounds(ctx.canvas.offsetLeft, ctx.canvas.offsetRight, ctx.canvas.width, ctx.canvas.height)
	collisionTree = QUAD.init(activePlayer.stage.getBounds());
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
	for (var n = 0; n < playerList.length; n++) {
		for (var i = 0; i < playerList[n].unitList.length; i++) {
			playerList[n].unitList[i].update(event)
			if (playerList[n].unitList[i].alive == false) {
				playerList[n].unitList.splice(i, 1)
				i--;
			}

		}
	}
	updateCollisionTree(event)
	for (var i = 0; i < playerList.length; i++) {
		playerList[i].hero.update(event)
	}


	for (var i = 0; i < playerList.length; i++) {
		playerList[i].stage.update(event);
	}

}