var stage, unitList = [],
	playerList = [],
	keys = [],
	collisionTree,
	teamList = [],
	activePlayer,
	activeTeam,
	opponentTeam,
	particleList = [],
	gameTime,
	largeTextSize = 18,
	textSize = 14,
	textPadding = 2,
	incomeTime,
	gameOptions,
	playerBorder,
	scrollDown = false,
	scrollUp = false,
	scrollLeft = false,
	scrollRight = false,
	castActive = false,
	monsterbuttons = null,
	lastClickedItem = null,
	viewTarget = [null, null],
	spellButtons = null;
textSize = 14, // Used for maintaining text scaling for statusBar
smallText = 12,
textPadding = 2, // Vertical Padding for readability
textFont = "Calibri"

function newGame(gameOptions) {
	if (gameOptions.mode == 'solo') {
		activeTeam = new team(0)
		activeTeam.addPlayer(0, true, gameOptions.hero, gameOptions.spells)
		opponentTeam = activeTeam
		teamList.push(activeTeam)
	} else if (gameOptions.mode == 'online') {
		activeTeam = new team(0)
		activeTeam.addPlayer(0, true, gameOptions.currentPlayer.hero, gameOptions.currentPlayer.spells)
		opponentTeam = new team(1)
		opponentTeam.addPlayer(0, true, gameOptions.opponentPlayer.hero, gameOptions.opponentPlayer.spells)
		teamList.push(activeTeam)
	}
	updateMonsterBar(0)
	updateShopBar(0)
	updateInfoBar('hero', activePlayer.hero)
	//Add story
	//Add online
	//Add tutorial

}

function updateStage(event) {
	if (playerStage.canvas.height != playerStage.canvas.clientHeight || playerStage.canvas.width != playerStage.canvas.clientWidth) {
		playerStage.canvas.height = playerStage.canvas.clientHeight
		playerStage.canvas.width = playerStage.canvas.clientWidth
		playerBar.canvas.height = playerBar.canvas.clientHeight
		playerBar.canvas.width = playerBar.canvas.clientWidth

		miniMapStage.x = playerBar.canvas.width * 0.5
		miniMapStage.y = playerBar.canvas.height * 0.2
		miniMapStage.height = playerBar.canvas.height * 0.8
		miniMapStage.width = playerBar.canvas.width * 0.2
		miniMapRatio = {
			height: gameStage.height / miniMapStage.height,
			width: gameStage.width / miniMapStage.width,
			radius: (gameStage.height + gameStage.width) / (miniMapStage.height + miniMapStage.width)
		}


		mapBorder.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("lightgrey").drawRect(0, 0, miniMapStage.width, miniMapStage.height);
		miniPlayerSplit.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("black").drawRect(0, miniMapStage.height / 2, miniMapStage.width, 2);
		playerBorder.graphics.clear().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, playerStage.canvas.clientWidth / miniMapRatio.width, playerStage.canvas.clientHeight / miniMapRatio.height);

		informationStage.x = playerBar.canvas.width * 0.3
		informationStage.y = playerBar.canvas.height * 0.2
		informationStage.height = playerBar.canvas.height * 0.8
		informationStage.width = playerBar.canvas.width * 0.2
		informationStageObject.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("lightyellow").drawRect(0, 0, informationStage.width, informationStage.height)

		monsterStage.x = 0
		monsterStage.y = playerBar.canvas.height * 0.2
		monsterStage.height = playerBar.canvas.height * 0.8
		monsterStage.width = playerBar.canvas.width * 0.3
		monsterStageObject.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("lightblue").drawRect(0, 0, monsterStage.width, monsterStage.height)

		shopStage.x = playerBar.canvas.width * 0.70
		shopStage.y = 0
		shopStage.height = playerBar.canvas.height
		shopStage.width = playerBar.canvas.width * 0.30 //30% of the playerbars width is the size of this object.
		shopStageObject.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("lightblue").drawRect(0, 0, shopStage.width, shopStage.height)

		statusBar.x = 0
		statusBar.y = 0
		statusBar.height = playerBar.canvas.height * 0.2
		statusBar.width = playerBar.canvas.width
		statusBarObject.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("lightblue").drawRect(0, 0, statusBar.width, statusBar.height)

		gameTime.x = playerBar.canvas.width * 0.5
		gameTime.y = incomeTime.y = 0
		incomeTime.x = playerBar.canvas.width * 0.4

		if (gameStage.regY + playerStage.canvas.height > gameStage.height) {
			gameStage.regY = gameStage.height - playerStage.canvas.height
		}
		if (gameStage.regX + playerStage.canvas.width > gameStage.width) {
			gameStage.regX = gameStage.width - playerStage.canvas.width
		}
		playerBorder.x = gameStage.regX / miniMapRatio.width
		playerBorder.y = gameStage.regY / miniMapRatio.height
		if (leftSwap.swapViewId == 0) {
			updateMonsterBar(1)
		} else {
			updateMonsterBar(0)
		}
		updateInfoBar(viewTarget[0], viewTarget[1])
		for (var team in teamList) { //We have to update each team
			for (var player in teamList[team].playerList) { //Check each player on that team
				var hero = teamList[team].playerList[player].hero
				hero.miniMapObject.graphics.clear().beginFill('green').drawCircle(0, 0, hero.radius / miniMapRatio.radius)
				hero.miniMapObject.x = hero.stageObject.x / miniMapRatio.width
				hero.miniMapObject.y = hero.stageObject.y / miniMapRatio.height
			}
			for (var unit in teamList[team].unitList) {
				var currentUnit = teamList[team].unitList[unit]
				currentUnit.miniMapObject.graphics.clear().beginFill('red').drawCircle(0, 0, currentUnit.radius / miniMapRatio.radius)
				currentUnit.miniMapObject.x = currentUnit.stageObject.x / miniMapRatio.width
				currentUnit.miniMapObject.y = currentUnit.stageObject.y / miniMapRatio.height
				currentUnit.miniMapObject.updateCache()
			}
		}

	}
	if (leftSwap.swapViewId == 0) {
		updateSpells(event)
	}
	refreshInfoBar(event)
	playerStage.update(event); //Finally update the stage with all of our changes.
	playerBar.update(event);
}

function createStage() {
	playerStage = new createjs.Stage("gameCanvas");
	// playerStage.canvas.height = playerStage.canvas.clientHeight;
	// playerStage.canvas.width = playerStage.canvas.clientWidth;
	gameStage = new createjs.Container();
	gameStage.width = 2000;
	gameStage.height = 2000;
	var border = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill('lightgreen').drawRect(0, 0, gameStage.width, gameStage.height));
	var playerSplit = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("black").drawRect(0, gameStage.height / 2 - 3, gameStage.width, 6));
	gameStage.addChild(border);
	gameStage.addChild(playerSplit);
	bounds = {
		x: 0,
		y: 0,
		w: gameStage.width,
		h: gameStage.height,
	}
	collisionTree = QUAD.init(bounds);
	playerStage.addChild(gameStage);
	playerBar = new createjs.Stage("gamePanel");
	// playerBar.canvas.height = playerBar.canvas.clientHeight;
	// playerBar.canvas.width = playerBar.canvas.clientWidth;

	fpsText = new createjs.Text('0', textSize + "px " + textFont, 'black');
	unitText = new createjs.Text('0', textSize + "px " + textFont, 'black');
	unitText.y = fpsText.getMeasuredHeight() + 3
	playerStage.addChild(fpsText)
	playerStage.addChild(unitText)


	statusBar = new createjs.Container();
	statusBar.x = 0
	statusBar.y = 0
	statusBar.height = playerBar.canvas.height * 0.2
	statusBar.width = playerBar.canvas.width
	statusBarObject = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("lightblue").drawRect(0, 0, statusBar.width, statusBar.height));
	statusBar.addChild(statusBarObject);
	playerBar.addChild(statusBar);

	gameTime = new createjs.Text('Game Time 00:00:00', textSize + "px " + textFont, 'black');
	incomeTime = new createjs.Text('Next Income 00:00:00', textSize + "px " + textFont, 'black');
	gameTime.x = playerBar.canvas.width * 0.5
	gameTime.y = incomeTime.y = 0
	incomeTime.x = playerBar.canvas.width * 0.4
	statusBar.addChild(gameTime)
	statusBar.addChild(incomeTime)

	leftSwap = new createjs.Container();
	leftSwap.x = 0
	leftSwap.y = 0
	leftSwap.height = playerBar.canvas.height * 0.2
	leftSwap.width = playerBar.canvas.width * 0.05
	leftSwapObject = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("green").drawRect(0, 0, leftSwap.width, leftSwap.height))
	leftSwap.textObject = new createjs.Text('Show Spells', largeTextSize + "px " + textFont, 'black');
	leftSwap.textObject.x = 0
	leftSwap.textObject.y = 0
	leftSwap.swapViewId = 1;
	leftSwap.addChild(leftSwap.textObject);
	leftSwap.addEventListener('click', handleLeftSwap)
	statusBar.addChild(leftSwap)

	rightSwap = new createjs.Container();
	rightSwap.x = playerStage.canvas.width * 0.95
	rightSwap.y = 0
	rightSwap.height = playerBar.canvas.height * 0.2
	rightSwap.width = playerBar.canvas.width * 0.05
	rightSwapObject = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("green").drawRect(0, 0, rightSwap.width, rightSwap.height))
	rightSwap.textObject = new createjs.Text('Show Inventory', largeTextSize + "px " + textFont, 'black');
	rightSwap.textObject.x = 0
	rightSwap.textObject.y = 0
	rightSwap.swapViewId = 1;
	rightSwap.addChild(rightSwap.textObject);
	rightSwap.addEventListener('click', handleRightSwap)
	statusBar.addChild(rightSwap)

	miniMapStage = new createjs.Container();
	miniMapStage.x = playerBar.canvas.width * 0.5
	miniMapStage.y = playerBar.canvas.height * 0.2
	miniMapStage.height = playerBar.canvas.height * 0.8
	miniMapStage.width = playerBar.canvas.width * 0.2
	miniMapRatio = {
		height: gameStage.height / miniMapStage.height,
		width: gameStage.width / miniMapStage.width,
		radius: (gameStage.height + gameStage.width) / (miniMapStage.height + miniMapStage.width)
	}
	mapBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("lightgrey").drawRect(0, 0, miniMapStage.width, miniMapStage.height));
	miniPlayerSplit = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("black").drawRect(0, miniMapStage.height / 2, miniMapStage.width, 2));
	miniMapStage.addChild(mapBorder);
	miniMapStage.addChild(miniPlayerSplit);
	var point = playerStage.localToGlobal(gameStage.regX, gameStage.regY);
	playerBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, playerStage.canvas.clientWidth / miniMapRatio.width, playerStage.canvas.clientHeight / miniMapRatio.height));
	miniMapStage.addChild(playerBorder);
	playerBar.addChild(miniMapStage);

	informationStage = new createjs.Container();
	informationStage.x = playerBar.canvas.width * 0.3
	informationStage.y = playerBar.canvas.height * 0.2
	informationStage.height = playerBar.canvas.height * 0.8
	informationStage.width = playerBar.canvas.width * 0.2
	informationStageObject = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("lightyellow").drawRect(0, 0, informationStage.width, informationStage.height));
	informationStage.addChild(informationStageObject)
	playerBar.addChild(informationStage)

	monsterStage = new createjs.Container();
	monsterStage.x = 0
	monsterStage.y = playerBar.canvas.height * 0.2
	monsterStage.height = playerBar.canvas.height * 0.8
	monsterStage.width = playerBar.canvas.width * 0.3
	monsterStageObject = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("lightblue").drawRect(0, 0, monsterStage.width, monsterStage.height));
	monsterStage.addChild(monsterStageObject)
	playerBar.addChild(monsterStage)

	shopStage = new createjs.Container();
	shopStage.x = playerBar.canvas.width * 0.7
	shopStage.y = playerBar.canvas.height * 0.2
	shopStage.height = playerBar.canvas.height * 0.8
	shopStage.width = playerBar.canvas.clientWidth * 0.30
	shopStageObject = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("lightblue").drawRect(0, 0, shopStage.width, shopStage.height));
	shopStage.addChild(shopStageObject)
	playerBar.addChild(shopStage)
}

function updateShopBar(view) {
	shopStage.removeAllChildren()
	shopStage.addChild(shopStageObject)
	if (view == 0) { //View 0 is the item shop. Fuck yeah
		buttonWidth = shopStage.width / 4 //Calculate how much width we have for buttons
		buttonHeight = shopStage.height / 2 // Calculate the two levels for buttons
		itemButtons = []
		for (var item in itemList) { //Lets loop through all of the currently free items
			var itemObject = itemList[item] //Store a reference to the current item
			itemButtons[item] = new createjs.Container() //Container for the multiple objects we will be creating
			itemButtons[item].button = new createjs.Bitmap(contentManager.getResult(itemObject.icon.base)) //Add an image to the container. Based on item icon
			itemButtons[item].button.sourceRect = new createjs.Rectangle(itemObject.icon.left, itemObject.icon.top, itemObject.icon.height, itemObject.icon.width)
			if (item > 3) { //We have added 4 units to this row, lets move it down 1.
				itemButtons[item].y = buttonHeight //This puts it in row 2 instead of 1.
				itemButtons[item].x = buttonWidth * (item % 4) //Since we are on row 2, we have to restart our x movement
			} else {
				itemButtons[item].x = buttonWidth * item //Since we are on row 1, we just increase the x by the width of a button for each unit
			}
			itemButtons[item].costText = new createjs.Text(itemObject.cost, largeTextSize + "px " + textFont, 'black'); //Add in the text for how much it costs
			itemButtons[item].costText.x = textPadding //buttonWidth - (itemButtons[item].costText.getMeasuredWidth() + textPadding) //Put the text at the bottom based on how many digits are in the cost
			itemButtons[item].costText.y = textPadding // buttonHeight - (18 + textPadding) //Put it 18px off (Size of text)itemButtons[item] .x = buttonWidth * spell //Since we are on row 1, we just increase the x by the width of a button for each unit
			itemButtons[item].costText = new createjs.Text(itemObject.cost, "18px " + textFont, 'black'); //Add in the text for how much it costs
			itemButtons[item].costText.x = buttonWidth - (itemButtons[item].costText.getMeasuredWidth() + textPadding) //Put the text at the bottom based on how many digits are in the cost
			itemButtons[item].costText.y = buttonHeight - (18 + textPadding) //Put it 18px off (Size of text)itemButtons[item] .x = buttonWidth * spell //Since we are on row 1, we just increase the x by the width of a button for each unit
			itemButtons[item].button.itemId = item //Store a reference to what item this button is for. Used when clicking
			itemButtons[item].button.scaleX = buttonWidth / itemObject.icon.width //Scale the image down so it fits
			itemButtons[item].button.scaleY = buttonHeight / itemObject.icon.height //Scale the image down so it fits
			itemButtons[item].addEventListener('click', itemClick) //When this button is clicked, call this function (itemclick)
			itemButtons[item].addChild(itemButtons[item].button) //Add to the container
			itemButtons[item].addChild(itemButtons[item].costText)
			shopStage.addChild(itemButtons[item]) //Add the container to the shopStage container
		}
	}
}



function updateMonsterBar(view) {
	monsterStage.removeAllChildren() // Clear everything from this section
	monsterStage.addChild(monsterStageObject) //Add back our background
	if (view == 0) { //View 0 is Monsters
		leftSwap.swapViewId = 1
		leftSwap.textObject.text = 'Show Spells'
		buttonWidth = monsterStage.width / 4 //Calculate how much width we have for buttons
		buttonHeight = monsterStage.height / 2 // Calculate the two levels for buttons
		monsterButtons = [] //Create an object to store everything
		for (var unit in monsterList[activePlayer.summonLevel]) { //Lets loop through all of the currently free monsters
			var monster = monsterList[activePlayer.summonLevel][unit] //Store a reference to the current monster
			monsterButtons[unit] = new createjs.Container() //Container for the multiple objects we will be creating
			monsterButtons[unit].button = new createjs.Bitmap(contentManager.getResult(monster.icon.base)) //Add an image to the container. Based on monster icon
			monsterButtons[unit].buttonBackground = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill(["#777", "#DDD", "#DDD", "#777"], [0, 0.2, 0.8, 1], 0, 0, 0, buttonHeight).drawRect(0, 0, buttonWidth, buttonHeight));
			monsterButtons[unit].button.sourceRect = new createjs.Rectangle(monster.icon.left, monster.icon.top, monster.icon.height, monster.icon.width)
			monsterButtons[unit].buttonBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, buttonWidth, buttonHeight));
			if (unit > 3) { //We have added 4 units to this row, lets move it down 1.
				monsterButtons[unit].y = buttonHeight //This puts it in row 2 instead of 1.
				monsterButtons[unit].x = buttonWidth * (unit % 4) //Since we are on row 2, we have to restart our x movement
			} else {
				monsterButtons[unit].x = buttonWidth * unit //Since we are on row 1, we just increase the x by the width of a button for each unit
			}
			monsterButtons[unit].button.monsterId = unit //Store a reference to what monster this button is for. Used when clicking
			monsterButtons[unit].button.scaleX = buttonWidth / monster.icon.width //Scale the image down so it fits
			monsterButtons[unit].button.scaleY = buttonHeight / monster.icon.height //Scale the image down so it fits
			monsterButtons[unit].goldCost = new createjs.Text(monster.cost, largeTextSize + "px " + textFont, 'black'); //Add in the text for how much it costs
			monsterButtons[unit].goldCost = new createjs.Text(monster.cost, "18px " + textFont, 'black'); //Add in the text for how much it costs
			monsterButtons[unit].goldCost.x = buttonWidth - (monsterButtons[unit].goldCost.getMeasuredWidth() + textPadding) //Put the text at the bottom based on how many digits are in the cost
			monsterButtons[unit].goldCost.y = textPadding //buttonHeight - (18 + textPadding) //Put it 18px off (Size of text)
			monsterButtons[unit].addEventListener('click', monsterClick) //When this button is clicked, call this function (monsterclick)
			monsterButtons[unit].addChild(monsterButtons[unit].buttonBackground)
			monsterButtons[unit].addChild(monsterButtons[unit].button) //Add to the container
			monsterButtons[unit].addChild(monsterButtons[unit].buttonBorder)
			monsterButtons[unit].addChild(monsterButtons[unit].goldCost) //Add to the container
			monsterStage.addChild(monsterButtons[unit]) //Add the container to the monsterStage container
		}
	} else if (view == 1) { //View 1 is Spells
		leftSwap.textObject.text = 'Monsters'
		leftSwap.swapViewId = 0
		buttonWidth = monsterStage.width / 4 //Calculate how much width we have for buttons
		buttonHeight = monsterStage.height // Calculate the two levels for buttons
		spellButtons = [] //Create an object to store everything
		for (var spell in activePlayer.hero.spells) { //Lets loop through all of the currently free monsters
			var spellObject = activePlayer.hero.spells[spell] //Store a reference to the current monster
			spellButtons[spell] = new createjs.Container() //Container for the multiple objects we will be creating
			spellButtons[spell].button = new createjs.Bitmap(contentManager.getResult(spellObject.icon)) //Add an image to the container. Based on monster icon
			spellButtons[spell].levelButton = new createjs.Bitmap(contentManager.getResult('plus'))
			spellButtons[spell].levelButton.scaleX = (buttonWidth * 0.3) / spellButtons[spell].levelButton.image.width //Scale the image down so it fits
			spellButtons[spell].levelButton.scaleY = (buttonHeight * 0.3) / spellButtons[spell].levelButton.image.height //Scale the image down so it fits
			spellButtons[spell].levelText = new createjs.Text(spellObject.level, largeTextSize + "px " + textFont, 'red'); //Add in the text for how much it costs
			spellButtons[spell].levelText = new createjs.Text(spellObject.level, "18px " + textFont, 'red'); //Add in the text for how much it costs
			spellButtons[spell].levelText.x = buttonWidth - (spellObject.level.toString().length * 10) //Put the text at the bottom based on how many digits are in the cost
			spellButtons[spell].levelText.y = buttonHeight - largeTextSize //Put it 18px off (Size of text)spellButtons[spell].x = buttonWidth * spell //Since we are on row 1, we just increase the x by the width of a button for each unit
			spellButtons[spell].x = buttonWidth * spell
			spellButtons[spell].button.spellId = spell //Store a reference to what monster this button is for. Used when clicking
			spellButtons[spell].button.scaleX = buttonWidth / spellButtons[spell].button.image.width //Scale the image down so it fits
			spellButtons[spell].button.scaleY = buttonHeight / spellButtons[spell].button.image.height //Scale the image down so it fits
			spellButtons[spell].levelButton.addEventListener('click', levelClick)
			spellButtons[spell].addEventListener('click', spellClick) //When this button is clicked, call this function (monsterclick)
			spellButtons[spell].addChild(spellButtons[spell].button) //Add to the container
			spellButtons[spell].addChild(spellButtons[spell].levelText)
			monsterStage.addChild(spellButtons[spell]) //Add the container to the monsterStage container
		}
	}
	monsterStage.cache(0, 0, monsterStage.width, monsterStage.height)
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
	}, {
		id: "monsters",
		src: "http://localhost:8888/build/assets/game/monsters.png"
	}, {
		id: "fireball",
		src: "http://localhost:8888/build/assets/game/fireball.png"
	}, {
		id: "iceball",
		src: "http://localhost:8888/build/assets/game/iceball.png"
	}, {
		id: "plus",
		src: "http://localhost:8888/build/assets/game/plus.png"
	}, {
		id: "shop",
		src: "http://localhost:8888/build/assets/game/shop.png"
	}]);

}

function imageLoadingDone(e) {
	createStage()
	playerStage.canvas.oncontextmenu = function(e) {
		e.preventDefault();
	};
	playerBar.canvas.oncontextmenu = function(e) {
		e.preventDefault();
	};
	gameOptions = {
		mode: 'solo',
		hero: 'warrior',
		spells: [new spellList['cupcakeTrap'], new spellList['coneFire'], new spellList['damageOverTime'], new ultimateList['ultIceBall']]
	}
	newGame(gameOptions)
	createjs.Ticker.on("tick", gameLoop);
	createjs.Ticker.setFPS(120);
	document.onkeydown = handleKeyDown
	playerStage.mouseMoveOutside = true;
	playerStage.addEventListener("stagemouseup", handleClick);
	miniMapStage.addEventListener("click", miniMapClick);
	playerStage.addEventListener("stagemousemove", handleMouse);
	log = true

}

function init() {
	contentManager = new createjs.LoadQueue();
	loadImages()
	contentManager.on("complete", imageLoadingDone, this);
}

function gameLoop(event) {
	fpsText.text = 'FPS: ' + Math.round(createjs.Ticker.getMeasuredFPS())
	unitText.text = 'Units: ' + Object.keys(teamList[0].unitList).length
	edgeScrolling(event); //In handle.js
	gameTime.text = 'Game Time ' + msToTime(event.time);
	incomeTime.text = 'Next Income ' + msToTime((activePlayer.hero.goldTime + 20000) - event.time);
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
		particleList[particle].update(event);
	}
	particleList = particleList.filter(function(x) { //Filter dead units from the player List
		return x.active == true;
	})
	updateCollisionTree(event); //in handle.js
	updateStage(event);
}