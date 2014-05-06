var stage, timeCircle, tickCircle, unitList = [],
	playerList = [],
	keys = [],
	collisionTree,
	teamList = [],
	activePlayer,
	activeTeam,
	opponentTeam,
	particleList = [],
	gameTime,
	incomeTime,
	gameOptions,
	playerBorder,
	scrollDown = false,
	scrollUp = false,
	scrollLeft = false,
	scrollRight = false;

var appModule = angular.module('siegeApp', []);

appModule.controller('appCtrl', function($scope){
	$scope.getSpells = function(){
		$scope.spells = activePlayer.hero.spells;
		console.log($scope.spells);
		$scope.$apply();
	}
	$scope.getMonsters = function(){
		$scope.monsters = monsterList[activePlayer.summonLevel];
		console.log($scope.monsters);
		$scope.$apply();
	}
	$scope.getImage = function(monster){
		var image = contentManager.getItem(monster.icon).src
		return image
	}
});

function newGame(gameOptions) {
	if (gameOptions.mode == 'solo') {
		activeTeam = new team(0)
		activeTeam.addPlayer(0, true, gameOptions.hero, gameOptions.spells)
		opponentTeam = activeTeam
		teamList.push(activeTeam)
	}
	angular.element(document.getElementById("GD-Game")).scope().getSpells();
	angular.element(document.getElementById("GD-Game")).scope().getMonsters();
	//Add story
	//Add online
	//Add tutorial

}

function endGame(loser) {
	console.log(Loser + ' Has lost this game. Sucker')
}

function updateStage(event) {
	if (playerStage.canvas.height != playerStage.canvas.clientHeight || playerStage.canvas.width != playerStage.canvas.clientWidth) {
		playerStage.canvas.height = playerStage.canvas.clientHeight
		playerStage.canvas.width = playerStage.canvas.clientWidth
		miniMapStage.canvas.height = miniMapStage.canvas.clientHeight
		miniMapStage.canvas.width = miniMapStage.canvas.clientWidth
		miniMapRatio = {
			height: Math.round(2000 / miniMapStage.canvas.height),
			width: Math.round(2000 / miniMapStage.canvas.width),
			radius: Math.round((2000 + 2000) / (miniMapStage.canvas.height + miniMapStage.canvas.width))
		}
		mapBorder.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("lightgrey").drawRect(0, 0, miniMapStage.canvas.width, miniMapStage.canvas.height)
		miniPlayerSplit.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("black").drawRect(0, miniMapStage.canvas.height / 2, miniMapStage.canvas.width, 2)
		playerBorder.graphics.clear().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, playerStage.canvas.width / miniMapRatio.width, playerStage.canvas.height / miniMapRatio.height)
		gameTime.x = playerStage.canvas.width - 60
		gameTime.y = playerStage.canvas.height - 60
		incomeTime.x = playerStage.canvas.width - 60
		incomeTime.y = playerStage.canvas.height - 40
		if (gameStage.regY + playerStage.canvas.height > 2000) {
			gameStage.regY = 2000 - playerStage.canvas.height
		}
		if (gameStage.regX + playerStage.canvas.width > 2000) {
			gameStage.regX = 2000 - playerStage.canvas.width
		}
		playerBorder.x = Math.round(gameStage.regX / miniMapRatio.width)
		playerBorder.y = Math.round(gameStage.regY / miniMapRatio.height)
	}
	playerStage.update(event); //Finally update the stage with all of our changes.
	miniMapStage.update(event)
}


function createStage() {
	playerStage = new createjs.Stage("gameCanvas");
	playerStage.canvas.height = playerStage.canvas.clientHeight
	playerStage.canvas.width = playerStage.canvas.clientWidth
	gameStage = new createjs.Container();
	gameStage.width = 2000;
	gameStage.height = 2000;
	var border = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill('lightgreen').drawRect(0, 0, 2000, 2000));
	var playerSplit = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("black").drawRect(0, 1000, 2000, 5))
	gameStage.addChild(border)
	gameStage.addChild(playerSplit)
	playerStage.addChild(gameStage);
	miniMapStage = new createjs.Stage("miniMap");
	miniMapStage.canvas.height = miniMapStage.canvas.clientHeight
	miniMapStage.canvas.width = miniMapStage.canvas.clientWidth
	miniMapRatio = {
		height: Math.round(2000 / miniMapStage.canvas.height),
		width: Math.round(2000 / miniMapStage.canvas.width),
		radius: Math.round((2000 + 2000) / (miniMapStage.canvas.height + miniMapStage.canvas.width))
	}
	mapBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("lightgrey").drawRect(0, 0, miniMapStage.canvas.width, miniMapStage.canvas.height));
	miniPlayerSplit = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("black").drawRect(0, miniMapStage.canvas.height / 2, miniMapStage.canvas.width, 2))
	miniMapStage.addChild(mapBorder)
	miniMapStage.addChild(miniPlayerSplit)
	var point = playerStage.localToGlobal(gameStage.regX, gameStage.regY)
	playerBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, Math.round(playerStage.canvas.width / miniMapRatio.width), Math.round(playerStage.canvas.height / miniMapRatio.height)))
	miniMapStage.addChild(playerBorder)
	gameTime = new createjs.Text('00:00:00', "12px Calibri", 'black');
	gameTime.x = playerStage.canvas.width - 60
	gameTime.y = playerStage.canvas.height - 60
	playerStage.addChild(gameTime)
	incomeTime = new createjs.Text('00:00:00', "12px Calibri", 'black');
	incomeTime.x = playerStage.canvas.width - 60
	incomeTime.y = playerStage.canvas.height - 40
	playerStage.addChild(incomeTime)

	bounds = {
		x: 0,
		y: 0,
		w: 2000,
		h: 2000,
	}
	collisionTree = QUAD.init(bounds);
}

function loadImages() {
	contentManager.loadManifest([{
		id: "warrior",
		src: "http://localhost:8888/build/assets/game/warrior.png"
	}, {
		id: "background",
		src: "http://localhost:8888/build/assets/game/background.png"
	}, {
		id: "monster1",
		src: "http://localhost:8888/build/assets/game/monster1.png"
	}]);

}

function handleComplete(e) {
	createStage()
	playerStage.canvas.oncontextmenu = function(e) {
		e.preventDefault();
	};
	gameOptions = {
		mode: 'solo',
		hero: 'warrior',
		spells: [new spellList['nidSpear'], new spellList['coneFire'], new spellList['damageOverTime'], new ultimateList['ultIceBall']]
	}
	newGame(gameOptions)
	createjs.Ticker.on("tick", gameLoop);
	createjs.Ticker.setFPS(60);
	document.onkeydown = handleKeyDown
	playerStage.mouseMoveOutside = true;
	playerStage.addEventListener("stagemouseup", handleClick);
	miniMapStage.addEventListener("stagemouseup", miniMapClick);
	playerStage.addEventListener("stagemousemove", handleMouse);
	log = true
}

function init() {
	contentManager = new createjs.LoadQueue();
	loadImages()
	contentManager.on("complete", handleComplete, this);
}

function edgeScrolling(event) {
	
	if (scrollDown) {
		if (gameStage.regY + playerStage.canvas.height < 2000) {
			gameStage.regY += 5
		}
	}
	if (scrollRight) {
		if (gameStage.regX + playerStage.canvas.width < 2000) {
			gameStage.regX += 5
		}

	}
	if (scrollUp) {
		if (gameStage.regY > 0) {
			gameStage.regY -= 5
		}

	}
	if (scrollLeft) {
		if (gameStage.regX > 0) {
			gameStage.regX -= 5
		}
	}
	playerBorder.x = Math.round(gameStage.regX / miniMapRatio.width)
	playerBorder.y = Math.round(gameStage.regY / miniMapRatio.height)
}

function handleMouse(e) {
	// console.log(playerStage.canvas.height)
	if (e.stageY >= playerStage.canvas.height - 30) {
		if (e.stageY+1 != playerStage.canvas.height) {
			scrollDown = true
			scrollUp = false
		} else {
			scrollUp = false
			scrollDown = false
		}
	} else if (e.stageY < 30) {
		scrollUp = true
		scrollDown = false
	} else {
		scrollUp = false
		scrollDown = false
	}
	if (e.stageX >= playerStage.canvas.width - 30 ) {
		scrollRight = true
		scrollLeft = false
	} else if (e.stageX < 30) {
		scrollLeft = true
		scrollRight = false
	} else {
		scrollLeft = false
		scrollRight = false
	}
}

function handleKeyDown(e) {
	if (e.shiftKey) {
		activePlayer.hero.levelSpell(e.keyCode)
	} else {
		switch (e.keyCode) {
			case 40:
				if (gameStage.regY + playerStage.canvas.height < 2000) {
					gameStage.regY += 10
				} else {
					gameStage.regY = 2000 - playerStage.canvas.height
				}
				break;
			case 39: // Right arrow key
				if (gameStage.regX + playerStage.canvas.width < 2000) {
					gameStage.regX += 10
				} else {
					gameStage.regX = 2000 - playerStage.canvas.width
				}
				break;
			case 38: //Up arrow key
				if (gameStage.regY > 0) {
					gameStage.regY -= 10
				} else {
					gameStage.regY = 0
				}
				break;
			case 37: // Left arrow key
				if (gameStage.regX > 0) {
					gameStage.regX -= 10
				} else {
					gameStage.regX = 0
				}
				break;
			case 49:
				spawnUnit(0, 0);
				break;
			case 50:
				spawnUnit(1, 0);
				break;
			case 51:
				spawnUnit(2, 0);
				break;
			case 52:
				spawnUnit(3, 0);
				break;
			case 53:
				spawnUnit(4, 0);
				break;
			case 65:
				spawnUnit(5, 0);
				break;
			case 83:
				spawnUnit(6, 0);
				break;
			case 68:
				spawnUnit(7, 0);
				break;
			case 70:
				spawnUnit(8, 0);
				break;
			case 71:
				spawnUnit(9, 0);
				break;
			default:
				activePlayer.hero.castSpell(e.keyCode)
		}

		playerBorder.x = Math.round(gameStage.regX / miniMapRatio.width)
		playerBorder.y = Math.round(gameStage.regY / miniMapRatio.height)
	}
}

function miniMapClick(event) {
	if (miniMapStage.mouseInBounds == true) {
		point = {
			x: (event.stageX * miniMapRatio.width) - (playerStage.canvas.width / 2),
			y: (event.stageY * miniMapRatio.height) - (playerStage.canvas.height / 2),
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

		playerBorder.x = Math.round(gameStage.regX / miniMapRatio.width)
		playerBorder.y = Math.round(gameStage.regY / miniMapRatio.height)
	}
	scrollDown = false
	scrollUp = false
	scrollLeft = false
	scrollRight = false
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
	edgeScrolling(event)
	gameTime.text = msToTime(event.time)
	incomeTime.text = msToTime(activePlayer.hero.goldTime + 20000)
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
	updateCollisionTree(event);
	updateStage(event);
}