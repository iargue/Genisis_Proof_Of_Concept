var stage, timeCircle, tickCircle, unitList = [],
	playerList = [],
	keys = [],
	collisionTree,
	teamList = [],
	activePlayer,
	activeTeam,
	opponentTeam,
	particleList = [],
	playerBorder;
	textList = [],


function spawnAll() {
	for (var i = 0; i < monsterList.length; i++) {
		spawnUnit(i, 0);
	}
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
	console.log(Loser + ' Has lost this game. Sucker')
}

function init() {
	playerStage = new createjs.Stage("gameCanvas");
	gameStage = new createjs.Container();
	gameStage.width = 2000;
	gameStage.height = 2000;
	var border = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("lightgreen").drawRect(0, 0, 2000, 2000));
	var playerSplit = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("black").drawRect(0, 1000, 2000, 5))
	gameStage.addChild(border)
	gameStage.addChild(playerSplit)
	playerStage.addChild(gameStage);
	miniMapStage = new createjs.Stage("miniMap");
	var mapBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("lightgrey").drawRect(0, 0, 200, 200));
	var miniPlayerSplit = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("black").drawRect(0, 100, 200, 5))
	miniMapStage.addChild(mapBorder)
	miniMapStage.addChild(miniPlayerSplit)
	var point = playerStage.localToGlobal(gameStage.regX, gameStage.regY)
	playerBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, Math.round(playerStage.canvas.width / 10), Math.round(playerStage.canvas.height / 10)))
	miniMapStage.addChild(playerBorder)

	playerStage.canvas.oncontextmenu = function(e) {
		e.preventDefault();
	};
	gameOptions = {
		hero: 'warrior',
		spells: [new spellList['nidSpear'], new spellList['singleTargetStun'], new spellList['aoeSlow'], new spellList['aoeStun'], new spellList['aoeNuke']]
	}
	newGame('solo', gameOptions);
	bounds = {
		x: 0,
		y: 0,
		w: 2000,
		h: 2000,
	}
	collisionTree = QUAD.init(bounds);

	for (var i = 0; i < monsterList.length; i++) {
		spawnUnit(i, 0);
	}

	createjs.Ticker.on("tick", gameLoop);
	createjs.Ticker.setFPS(60);
	document.onkeydown = handleKeyDown
	playerStage.addEventListener("stagemouseup", handleClick);
	miniMapStage.addEventListener("stagemouseup", miniMapClick);

}

function handleKeyDown(e) {
	if (!e) {
		var e = window.event;
	}
	if (e.shiftKey) {
		activePlayer.hero.levelSpell(e.keyCode)
	} else {
		switch (e.keyCode) {
			case 40: //Down arrow key
				if (gameStage.regY + playerStage.canvas.height < 2000) {
					gameStage.regY += 10
				}
				break
			case 39: // Right arrow key
				if (gameStage.regX + playerStage.canvas.width < 2000) {
					gameStage.regX += 10
				}
				break;
			case 38: //Up arrow key
				if (gameStage.regY > 0) {
					gameStage.regY -= 10
				}
				break;
			case 37: // Left arrow key
				if (gameStage.regX > 0) {
					gameStage.regX -= 10
				}
				break;
			default:
				activePlayer.hero.castSpell(e.keyCode)
		}
	}

	playerBorder.x = Math.round(gameStage.regX / 10)
	playerBorder.y = Math.round(gameStage.regY / 10)
}

function miniMapClick(event) {
	if (miniMapStage.mouseInBounds == true) {
		point = {
			x: (event.stageX * 10) - (playerStage.canvas.width / 2),
			y: (event.stageY * 10) - (playerStage.canvas.height / 2),
		}
		if (point.x < 0) {
			point.x = 0
		} else if (point.x > (2000 - playerStage.canvas.width)) {
			point.x = (2000 - playerStage.canvas.width)
		}
		if (point.y < 0) {
			point.y = 0
		} else if (point.y > (2000 - playerStage.height / 2)) {
			point.y = (2000 - playerStage.height / 2)
		}

		gameStage.regX = point.x
		gameStage.regY = point.y

		playerBorder.x = Math.round(gameStage.regX / 10)
		playerBorder.y = Math.round(gameStage.regY / 10)
	}
}


function handleClick(event) {
	if (playerStage.mouseInBounds == true && event.nativeEvent.which == 3) {
		activePlayer.hero.updateWaypoint(event);
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
		for (var player in teamList[team].playerList) { //Check each player on that team
			teamList[team].playerList[player].hero.update(event) //Update the hero object for this player

		}
		for (var unit in teamList[team].unitList) {
			teamList[team].unitList[unit].update(event) //Update every unit spawned against this player
		}
		teamList[team].unitList = teamList[team].unitList.filter(function(x) { //Filter dead units from the player List
			return x.alive == true;
		})
	}
	for (var particle in particleList) {
		particleList[particle].update(event)
	}
	particleList = particleList.filter(function(x) { //Filter dead units from the player List
		return x.active == true;
	})
	updateCollisionTree(event)
	playerStage.update(event); //Finally update the stage with all of our changes.
	miniMapStage.update(event)
}