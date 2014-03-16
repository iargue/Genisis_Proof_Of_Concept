var stage, timeCircle, tickCircle, unitList = [],
	playerList = [],
	keys = [],
	collisionTree,
	teamList = [],
	activePlayer,
	activeTeam,
	opponentTeam,
	particlesList;


function spawnAll() {
	for (var i = 0; i < monsterList.length; i++) {
		spawnUnit(i, 0);
	}
	console.log(activePlayer.unitList.length)
}

function newGame(gameMode, gameOptions) {
	if (gameMode == 'solo') {
		activeTeam = new team(0)
		activeTeam.addPlayer(0, true, gameOptions.hero, gameOptions.spells)
		opponentTeam = activeTeam
		teamList.push(activeTeam)
	}

	//Add story
	//Add online
	//Add tutorial
}

function endGame(loser) {

}

function init() {
	gameOptions = {
		hero: 'warrior',
		spells: [new spellList['singleTargetSlow'], new spellList['singleTargetStun'], new spellList['aoeSlow'], new spellList['aoeStun']]
	}
	newGame('solo', gameOptions)
	ctx = activePlayer.stage.canvas.getContext('2d')
	bounds = {
		x: ctx.canvas.offsetLeft,
		y: ctx.canvas.offsetTop,
		w: ctx.canvas.width,
		h: ctx.canvas.height
	}
	console.log(bounds)
	collisionTree = QUAD.init(bounds);
	console.log(collisionTree)

	for (var i = 0; i < monsterList.length; i++) {
		spawnUnit(i, 0);
	}

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
	for (var team in teamList) {
		for (var unit in teamList[team].unitList) {
			collisionTree.insert(teamList[team].unitList[unit])
		}
	}
}

function gameLoop(event) {
	for (var team in teamList) { //We have to update each team
		for (var unit in teamList[team].unitList) {
			teamList[team].unitList[unit].update(event) //Update every unit spawned against this player
		}
		teamList[team].unitList = teamList[team].unitList.filter(function(x) { //Filter dead units from the player List
			return x.alive == true;
		})
		for (var player in teamList[team].playerList) { //Check each player on that team
			teamList[team].playerList[player].hero.update(event) //Update the hero object for this player
			teamList[team].playerList[player].stage.update(event); //Finally update the stage with all of our changes.
		}
	}
	updateCollisionTree(event)
}