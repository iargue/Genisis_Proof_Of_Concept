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
	scrollRight = false,
	castActive = false,
	monsterbuttons = null,
	lastClickedItem = null,
	spellButtons = null;

function newGame(gameOptions) {
	if (gameOptions.mode == 'solo') {
		activeTeam = new team(0)
		activeTeam.addPlayer(0, true, gameOptions.hero, gameOptions.spells)
		opponentTeam = activeTeam
		teamList.push(activeTeam)
	}
	updateMonsterBar(0)
	updateShopBar(0)
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
		playerBar.canvas.height = playerBar.canvas.clientHeight
		playerBar.canvas.width = playerBar.canvas.clientWidth

		//miniMapStage is the container for the miniMap.
		miniMapStage.x = playerBar.canvas.width * 0.50 //Starts at 50% of the playerBar's width
		miniMapStage.y = 0
		miniMapStage.height = playerBar.canvas.height
		miniMapStage.width = playerBar.canvas.width * 0.20 //50% of the playerbars width is the size of this object.
		miniMapRatio = {
			height: gameStage.height / miniMapStage.height,
			width: gameStage.width / miniMapStage.width,
			radius: (gameStage.height + gameStage.width) / (miniMapStage.height + miniMapStage.width)
		}
		
		mapBorder.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("lightgrey").drawRect(0, 0, miniMapStage.width, miniMapStage.height)
		miniPlayerSplit.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("black").drawRect(0, miniMapStage.height / 2 - 1, miniMapStage.width, 2);
		playerBorder.graphics.clear().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, playerStage.canvas.clientWidth / miniMapRatio.width , playerStage.canvas.clientHeight / miniMapRatio.height);

		// Information Stage is a container for player/monster/shop it info. Updates based on what is selected.
		informationStage.x = playerBar.canvas.width * 0.30 //Starts at 30% of the bar
		informationStage.y = 0
		informationStage.height = playerBar.canvas.height
		informationStage.width = playerBar.canvas.width * 0.20 //20% of the playerbars width is the size of this object.
		informationStageObject.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("lightyellow").drawRect(0, 0, informationStage.width, informationStage.height)

		//Monster Stage is a container for all of the Monster's you can buy (Also contains spell objects on switch)		
		monsterStage.x = 0 //Starts at the start of the bar
		monsterStage.y = 0
		monsterStage.height = playerBar.canvas.height
		monsterStage.width = playerBar.canvas.width * 0.30 //30% of the playerbars width is the size of this object.
		monsterStageObject.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("lightblue").drawRect(0, 0, monsterStage.width, monsterStage.height)


		//shopStage is a container for all of the Shop's objects (Also contains player's inventory on switch)
		shopStage.x = playerBar.canvas.width * 0.70
		shopStage.y = 0
		shopStage.height = playerBar.canvas.height
		shopStage.width = playerBar.canvas.width * 0.30 //30% of the playerbars width is the size of this object.
		shopStageObject.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("lightblue").drawRect(0, 0, shopStage.width, shopStage.height)

		statusBar.height = textSize + textPadding * 2
		statusBar.width = gameTime.getMeasuredWidth() + incomeTime.getMeasuredWidth() + textPadding * 4
		statusBar.x = (playerStage.canvas.width * 0.5) - (statusBar.width / 2);
		statusBar.y = playerStage.canvas.height - statusBar.height
		statusBarObject.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("lightblue").drawRect(0, 0, statusBar.width, statusBar.height)

		gameTime.x = textPadding
		gameTime.y = incomeTime.y = textPadding
		incomeTime.x = gameTime.getMeasuredWidth() + textPadding * 3

		if (gameStage.regY + playerStage.canvas.height > gameStage.height) {
			gameStage.regY = gameStage.height - playerStage.canvas.height
		}
		if (gameStage.regX + playerStage.canvas.width > gameStage.width) {
			gameStage.regX = gameStage.width - playerStage.canvas.width
		}
		playerBorder.x = Math.round(gameStage.regX / miniMapRatio.width)
		playerBorder.y = Math.round(gameStage.regY / miniMapRatio.height)
		if (leftSwap.swapViewId == 0) {
			updateMonsterBar(1)
		} else {
			updateMonsterBar(0)
		}
		refreshMiniMap(event)
	}
	if (leftSwap.swapViewId == 0) {
		updateSpells(event)
	}
	playerStage.update(event); //Finally update the stage with all of our changes.
	playerBar.update(event)
}


function refreshMiniMap(event) {
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
			currentUnit.miniMapObject.x = Math.round(currentUnit.stageObject.x / miniMapRatio.width)
			currentUnit.miniMapObject.y = Math.round(currentUnit.stageObject.y / miniMapRatio.height)
		}
	}
}

function createStage() {
	playerStage = new createjs.Stage("gameCanvas");
	playerStage.canvas.height = playerStage.canvas.clientHeight;
	playerStage.canvas.width = playerStage.canvas.clientWidth;
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
	playerBar.canvas.height = playerBar.canvas.clientHeight;
	playerBar.canvas.width = playerBar.canvas.clientWidth;
	miniMapStage = new createjs.Container();
	miniMapStage.x = playerBar.canvas.width * 0.50;
	miniMapStage.y = 0;
	miniMapStage.height = playerBar.canvas.clientHeight;
	miniMapStage.width = playerBar.canvas.clientWidth * 0.20;
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

	textSize = 14;		// Used for maintaining text scaling for statusBar
	textPadding = 2;	// Vertical Padding for readability

	gameTime = new createjs.Text('Game Time 00:00:00', textSize + "px Arial", 'black');
	incomeTime = new createjs.Text('Next Income 00:00:00', textSize + "px Arial", 'black');

	statusBar = new createjs.Container();
	statusBar.height = textSize + textPadding * 2;
	statusBar.width = gameTime.getMeasuredWidth() + incomeTime.getMeasuredWidth() + textPadding * 4;
	statusBar.x = (playerStage.canvas.width * 0.5) - (statusBar.width / 2);
	statusBar.y = playerStage.canvas.height - statusBar.height
	statusBarObject = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("lightblue").drawRect(0, 0, statusBar.width, statusBar.height));
	statusBar.addChild(statusBarObject);
	playerStage.addChild(statusBar);

	gameTime.x = textPadding
	gameTime.y = incomeTime.y = textPadding
	incomeTime.x = gameTime.getMeasuredWidth() + textPadding * 3

	leftSwap = new createjs.Container();
	leftSwap.textObject = new createjs.Text('Show Spells', textSize + "px Arial", 'black');
	// Are we using quadtree to handle clicks outside the game? Certainly createjs has a method for this.
	var hit = new createjs.Shape();
	hit.graphics.beginFill("#000").drawRect(0, 0, leftSwap.textObject.getMeasuredWidth() + textPadding * 2, textSize + textPadding * 2);
	leftSwap.hitArea = hit;
	leftSwap.textObject.x = textPadding;
	leftSwap.textObject.y = playerStage.canvas.height - (textSize + textPadding * 2);
	leftSwap.swapViewId = 1;
	leftSwap.addChild(leftSwap.textObject);
	leftSwap.addEventListener('click', handleLeftSwap);

	rightSwap = new createjs.Container();
	rightSwap.textObject = new createjs.Text('Show Shop', textSize + "px Arial", 'black');
	var hit2 = new createjs.Shape();
	hit2.graphics.beginFill("#000").drawRect(0, 0, rightSwap.textObject.getMeasuredWidth() + textPadding * 2, textSize + textPadding * 2);
	rightSwap.hitArea = hit2;
	rightSwap.textObject.y = playerStage.canvas.height - (textSize + textPadding * 2);
	rightSwap.textObject.x = playerStage.canvas.width - (rightSwap.textObject.getMeasuredWidth() + textPadding * 2);
	rightSwap.addChild(rightSwap.textObject);

	playerStage.addChild(leftSwap)
	playerStage.addChild(rightSwap)
	statusBar.addChild(gameTime)
	statusBar.addChild(incomeTime)

	informationStage = new createjs.Container();
	informationStage.x = playerBar.canvas.width * 0.30
	informationStage.y = 0
	informationStage.height = playerBar.canvas.clientHeight
	informationStage.width = playerBar.canvas.clientWidth * 0.20
	informationStageObject = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("lightyellow").drawRect(0, 0, informationStage.width, informationStage.height));
	informationStage.addChild(informationStageObject)
	playerBar.addChild(informationStage)

	monsterStage = new createjs.Container();
	monsterStage.x = 0
	monsterStage.y = 0
	monsterStage.height = playerBar.canvas.clientHeight
	monsterStage.width = playerBar.canvas.clientWidth * 0.30
	monsterStageObject = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("lightblue").drawRect(0, 0, monsterStage.width, monsterStage.height));
	monsterStage.addChild(monsterStageObject)
	playerBar.addChild(monsterStage)

	shopStage = new createjs.Container();
	shopStage.x = playerBar.canvas.width * 0.70
	shopStage.y = 0
	shopStage.height = playerBar.canvas.clientHeight
	shopStage.width = playerBar.canvas.clientWidth * 0.30
	shopStageObject = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("lightblue").drawRect(0, 0, shopStage.width, shopStage.height));
	shopStage.addChild(shopStageObject)
	playerBar.addChild(shopStage)

}

function handleLeftSwap(event) {
	updateMonsterBar(event.target.swapViewId)
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
			itemButtons[item].costText = new createjs.Text(itemObject.cost, "18px Arial", 'black'); //Add in the text for how much it costs
			itemButtons[item].costText.x = buttonWidth - (itemObject.cost.toString().length * 10) //Put the text at the bottom based on how many digits are in the cost
			itemButtons[item].costText.y = buttonHeight - 18 //Put it 18px off (Size of text)itemButtons[item] .x = buttonWidth * spell //Since we are on row 1, we just increase the x by the width of a button for each unit
			itemButtons[item].x = buttonWidth * item
			itemButtons[item].y = 5
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

function itemClick(event) {
	if (lastClickedItem == event.target.itemId) {
		activePlayer.hero.buyItem(itemId)
		lastClickedItem = null
	} else {
		lastClickedItem == event.target.itemId
	}
}

function updateInfoBar(selected) {
	informationStage.removeAllChildren()
	informationStage.addChild(informationStageObject)
	if(selected){
		
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
			monsterButtons[unit].button.sourceRect = new createjs.Rectangle(monster.icon.left, monster.icon.top, monster.icon.height, monster.icon.width)
			if (unit > 3) { //We have added 4 units to this row, lets move it down 1.
				monsterButtons[unit].y = buttonHeight //This puts it in row 2 instead of 1.
				monsterButtons[unit].x = buttonWidth * (unit - 4) //Since we are on row 2, we have to restart our x movement
			} else {
				monsterButtons[unit].x = buttonWidth * unit //Since we are on row 1, we just increase the x by the width of a button for each unit
			}
			monsterButtons[unit].button.monsterId = unit //Store a reference to what monster this button is for. Used when clicking
			monsterButtons[unit].button.scaleX = buttonWidth / monster.icon.width //Scale the image down so it fits
			monsterButtons[unit].button.scaleY = buttonHeight / monster.icon.height //Scale the image down so it fits
			monsterButtons[unit].goldCost = new createjs.Text(monster.cost, "18px Arial", 'gold'); //Add in the text for how much it costs
			monsterButtons[unit].goldCost.x = buttonWidth - (monster.cost.toString().length * 10) //Put the text at the bottom based on how many digits are in the cost
			monsterButtons[unit].goldCost.y = buttonHeight - 18 //Put it 18px off (Size of text)
			monsterButtons[unit].addEventListener('click', monsterClick) //When this button is clicked, call this function (monsterclick)
			monsterButtons[unit].addChild(monsterButtons[unit].button) //Add to the container
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
			spellButtons[spell].levelText = new createjs.Text(spellObject.level, "18px Arial", 'red'); //Add in the text for how much it costs
			spellButtons[spell].levelText.x = buttonWidth - (spellObject.level.toString().length * 10) //Put the text at the bottom based on how many digits are in the cost
			spellButtons[spell].levelText.y = buttonHeight - 18 //Put it 18px off (Size of text)spellButtons[spell].x = buttonWidth * spell //Since we are on row 1, we just increase the x by the width of a button for each unit
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
}

function updateSpells(event) {
	for (var spell in activePlayer.hero.spells) { //Lets loop through all of the currently free spells
		var spellObject = activePlayer.hero.spells[spell] //Store a reference to the current spell
		percentage = ((new Date() - spellObject.currentCoolDown) / spellObject.coolDown)
		if (percentage > 1) {
			percentage = 1
		}
		if (spellObject.level == 0) {
			percentage = 0.1
		}
		if (activePlayer.hero.spellLevels > 0) {
			if ((activePlayer.hero.level / 3) >= spellObject.level) {
				spellButtons[spell].addChild(spellButtons[spell].levelButton)
			} else {
				spellButtons[spell].removeChild(spellButtons[spell].levelButton)
			}
		} else {
			spellButtons[spell].removeChild(spellButtons[spell].levelButton)
		}
		spellButtons[spell].button.alpha = percentage
	}
}

function monsterClick(event) { //Called when a Monster button is clicked.
	spawnUnit(event.target.monsterId) //Spawn the unit related to that button. This value is stored when the button is first created in updateMonsterBar
}

function spellClick(event) { //Called when a Monster button is clicked.
	castActive = event.target.spellId
}

function levelClick(event) { //Called when a Monster button is clicked.
	castActive = false
	levelSpell(activePlayer.hero, event.target.parent.button.spellId)
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

function handleComplete(e) {
	createStage()
	playerStage.canvas.oncontextmenu = function(e) {
		e.preventDefault();
	};
	playerBar.oncontextmenu = function(e) {
		e.preventDefault();
	};
	gameOptions = {
		mode: 'solo',
		hero: 'warrior',
		spells: [new spellList['cupcakeTrap'], new spellList['coneFire'], new spellList['damageOverTime'], new ultimateList['ultIceBall']]
	}
	newGame(gameOptions)
	createjs.Ticker.on("tick", gameLoop);
	createjs.Ticker.setFPS(60);
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
	contentManager.on("complete", handleComplete, this);
}

function edgeScrolling(event) {
	if (scrollDown) {
		if (gameStage.regY + playerStage.canvas.height < gameStage.height) {
			gameStage.regY += 5
		}
	}
	if (scrollRight) {
		if (gameStage.regX + playerStage.canvas.width < gameStage.width) {
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
	//MARKED
	playerBorder.x = Math.round(gameStage.regX / miniMapRatio.width)
	playerBorder.y = Math.round(gameStage.regY / miniMapRatio.height)
}



function handleMouse(e) {
	if (e.stageY >= playerStage.canvas.height - 30) {
		if (e.stageY + 1 != playerStage.canvas.height) {
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
	if (e.stageX >= playerStage.canvas.width - 30) {
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
				if (gameStage.regY + playerStage.canvas.height < gameStage.height) {
					gameStage.regY += 10
				} else {
					gameStage.regY = gameStage.height - playerStage.canvas.height
				}
				break;
			case 39: // Right arrow key
				if (gameStage.regX + playerStage.canvas.width < gameStage.width) {
					gameStage.regX += 10
				} else {
					gameStage.regX = playerStage - playerStage.canvas.width
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
	if (playerBar.mouseInBounds == true && event.nativeEvent.which == 1) {
		point = {
			x: (event.localX * miniMapRatio.width) - (playerStage.canvas.width / 2),
			y: (event.localY * miniMapRatio.height) - (playerStage.canvas.height / 2),
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
	if (miniMapStage.mouseInBounds == true && event.nativeEvent.which == 3) {
		castActive = false;
		activePlayer.hero.updateWaypoint(event, true);
	}
}

function handleClick(event) {
	if (playerStage.mouseInBounds == true && event.nativeEvent.which == 3) {
		castActive = false;
		activePlayer.hero.updateWaypoint(event);
	}
	if (castActive) {
		if (playerStage.mouseInBounds) { //Make sure they were in the canvas to actully cast a spell
			var point = gameStage.globalToLocal(playerStage.mouseX, playerStage.mouseY);
			activePlayer.hero.spells[castActive].cast(point.x, point.y, activePlayer.hero)
			castActive = false;
		} else {
			castActive = false;
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
	edgeScrolling(event);
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
	updateCollisionTree(event);
	updateStage(event);
}