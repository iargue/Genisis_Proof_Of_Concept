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
	textSize = 18,
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
	spellButtons = null,
	smallText = 12,
	textPadding = 2, // Vertical Padding for readability
	textFont = "Calibri";

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
	updateLeftBar(0)
	updateRightBar(0)
	setupInfoBar()
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
		playerBar.object.graphics.clear().beginFill("#111").drawRect(0, 0, playerBar.canvas.width, playerBar.canvas.height);

		gameTime.x = playerBar.canvas.width * 0.5
		gameTime.y = 0
		gameTime.width = playerBar.canvas.width * 0.1
		gameTime.height = playerBar.canvas.height * 0.2
		gameTime.object.graphics.clear().drawRect(0, 0, gameTime.width, gameTime.height)

		incomeTime.x = playerBar.canvas.width * 0.4
		incomeTime.y = 0
		incomeTime.width = playerBar.canvas.width * 0.1
		incomeTime.height = playerBar.canvas.height * 0.2
		incomeTime.object.graphics.clear().drawRect(0, 0, incomeTime.width, incomeTime.height);

		goldStage.x = playerBar.canvas.width * 0.6
		goldStage.y = 0
		goldStage.width = playerBar.canvas.width * 0.1
		goldStage.height = playerBar.canvas.height * 0.2
		goldStage.object.graphics.clear().beginStroke("black").drawRect(0, 0, goldStage.width, goldStage.height);

		incomeStage.x = playerBar.canvas.width * 0.3
		incomeStage.y = 0
		incomeStage.width = playerBar.canvas.width * 0.1
		incomeStage.height = playerBar.canvas.height * 0.2
		incomeStage.object.graphics.clear().beginStroke("black").drawRect(0, 0, incomeStage.width, incomeStage.height);

		leftTeamBar.x = playerBar.canvas.width * 0.1
		leftTeamBar.y = 0
		leftTeamBar.width = playerBar.canvas.width * 0.2
		leftTeamBar.height = playerBar.canvas.height * 0.2
		leftTeamBar.object.graphics.clear().beginStroke("black").beginLinearGradientFill(["#200", "#400", "#400", "#200"], [0, 0.2, 0.8, 1], 0, 0, 0, leftTeamBar.height).drawRect(0, 0, leftTeamBar.width, leftTeamBar.height);

		rightTeamBar.x = playerBar.canvas.width * 0.7
		rightTeamBar.y = 0
		rightTeamBar.width = playerBar.canvas.width * 0.2
		rightTeamBar.height = playerBar.canvas.height * 0.2
		rightTeamBar.object.graphics.clear().beginStroke("black").beginFill("B30000").drawRect(0, 0, rightTeamBar.width, rightTeamBar.height);


		leftSwap.x = 0
		leftSwap.y = 0
		leftSwap.height = playerBar.canvas.height * 0.2
		leftSwap.width = playerBar.canvas.width * 0.1
		leftSwap.object.graphics.clear().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#222", "#444", "#444", "#222"], [0, 0.2, 0.8, 1], 0, 0, 0, leftSwap.height).drawRect(0, 0, leftSwap.width, leftSwap.height);
		leftSwap.viewId === 0 ? createTextObject(rightTeamBar, "text", "Spells", 0.5) : createTextObject(rightTeamBar, "Monsters", 0.5)

		rightSwap.x = playerBar.canvas.width * 0.9
		rightSwap.y = 0
		rightSwap.height = playerBar.canvas.height * 0.2
		rightSwap.width = playerBar.canvas.width * 0.1
		rightSwap.object.graphics.clear().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#222", "#444", "#444", "#222"], [0, 0.2, 0.8, 1], 0, 0, 0, leftSwap.height).drawRect(0, 0, rightSwap.width, rightSwap.height);

		rightTeamBar.x = playerBar.canvas.width * 0.7
		rightTeamBar.y = 0
		rightTeamBar.width = playerBar.canvas.width * 0.2
		rightTeamBar.height = playerBar.canvas.height * 0.2
		rightTeamBar.object.graphics.clear().beginStroke("black").beginFill("B30000").drawRect(0, 0, rightTeamBar.width, rightTeamBar.height);

		miniMapStage.x = playerBar.canvas.width * 0.3
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

		informationStage.x = playerBar.canvas.width * 0.5
		informationStage.y = playerBar.canvas.height * 0.2
		informationStage.height = playerBar.canvas.height * 0.8
		informationStage.width = playerBar.canvas.width * 0.2
		informationStage.object.graphics.clear().drawRect(0, 0, informationStage.width, informationStage.height)

		monsterStage.x = 0
		monsterStage.y = playerBar.canvas.height * 0.2
		monsterStage.height = playerBar.canvas.height * 0.8
		monsterStage.width = playerBar.canvas.width * 0.3

		shopStage.x = playerBar.canvas.width * 0.7
		shopStage.y = playerBar.canvas.height * 0.2
		shopStage.height = playerBar.canvas.height * 0.8
		shopStage.width = playerBar.canvas.width * 0.3

		if (gameStage.regY + playerStage.canvas.height > gameStage.height) {
			gameStage.regY = gameStage.height - playerStage.canvas.height
		}
		if (gameStage.regX + playerStage.canvas.width > gameStage.width) {
			gameStage.regX = gameStage.width - playerStage.canvas.width
		}
		playerBorder.x = gameStage.regX / miniMapRatio.width
		playerBorder.y = gameStage.regY / miniMapRatio.height
		if (leftSwap.swapViewId == 0) {
			updateLeftBar(1)
		} else {
			updateLeftBar(0)
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
	playerStage.update(event); //Finally update the stage with all of our changes.
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

	fpsText = new createjs.Text('0', textSize + "px " + textFont, 'black');
	unitText = new createjs.Text('0', textSize + "px " + textFont, 'black');
	unitText.y = fpsText.getMeasuredHeight() + 5
	playerStage.addChild(fpsText)
	playerStage.addChild(unitText)


	playerBar.canvas.height = playerBar.canvas.clientHeight;
	playerBar.canvas.width = playerBar.canvas.clientWidth;
	playerBar.object = new createjs.Shape(new createjs.Graphics().beginFill("#111").drawRect(0, 0, playerBar.canvas.width, playerBar.canvas.height));
	playerBar.addChild(playerBar.object);

	gameTime = new createjs.Container();
	gameTime.x = playerBar.canvas.width * 0.5
	gameTime.y = 0
	gameTime.width = playerBar.canvas.width * 0.1
	gameTime.height = (playerBar.canvas.height * 0.2)
	// gameTime.object = new createjs.Shape(new createjs.Graphics().beginStroke("black").beginLinearGradientFill(["#444", "#222", "#222", "#444"], [0, 0.25, 0.75, 1], 0, 0, 0, gameTime.height).drawRect(0, 0, gameTime.width, gameTime.height));
	createTextObject(gameTime, "text", "00:00:00", 0.5);
	// gameTime.addChild(gameTime.object);
	gameTime.addChild(gameTime.textObject);
	playerBar.addChild(gameTime);

	incomeTime = new createjs.Container();
	incomeTime.x = playerBar.canvas.width * 0.4
	incomeTime.y = 0
	incomeTime.width = playerBar.canvas.width * 0.1
	incomeTime.height = (playerBar.canvas.height * 0.2)
	// incomeTime.object = new createjs.Shape(new createjs.Graphics().beginStroke("black").beginLinearGradientFill(["#444", "#222", "#222", "#444"], [0, 0.25, 0.75, 1], 0, 0, 0, incomeTime.height).drawRect(0, 0, incomeTime.width, incomeTime.height));
	createTextObject(incomeTime, "text", "00:00:00", 0.5);
	// incomeTime.addChild(incomeTime.object);
	incomeTime.addChild(incomeTime.textObject);
	playerBar.addChild(incomeTime);

	goldStage = new createjs.Container()
	goldStage.x = playerBar.canvas.width * 0.6
	goldStage.y = 0
	goldStage.width = playerBar.canvas.width * 0.1
	goldStage.height = (playerBar.canvas.height * 0.2)
	// goldStage.object = new createjs.Shape(new createjs.Graphics().beginStroke("black").beginLinearGradientFill(["#444", "#222", "#222", "#444"], [0, 0.25, 0.75, 1], 0, 0, 0, goldStage.height).drawRect(0, 0, goldStage.width, goldStage.height));
	createTextObject(goldStage, "label", "Current Gold", 0.75, 20, "#EFC94C");
	createTextObject(goldStage, "content", "0", 0.75)
	// goldStage.addChild(goldStage.object)
	goldStage.addChild(goldStage.labelObject)
	goldStage.addChild(goldStage.contentObject)
	playerBar.addChild(goldStage)

	incomeStage = new createjs.Container()
	incomeStage.x = playerBar.canvas.width * 0.3
	incomeStage.y = 0
	incomeStage.width = playerBar.canvas.width * 0.1
	incomeStage.height = playerBar.canvas.height * 0.2
	// incomeStage.object = new createjs.Shape(new createjs.Graphics().beginStroke("black").beginLinearGradientFill(["#444", "#222", "#222", "#444"], [0, 0.25, 0.75, 1], 0, 0, 0, incomeStage.height).drawRect(0, 0, incomeStage.width, incomeStage.height))
	createTextObject(incomeStage, "label", "Current Income", 0.75, 15, "#EFC94C")
	createTextObject(incomeStage, "content", "1", 0.75)
	// incomeStage.addChild(incomeStage.object)
	incomeStage.addChild(incomeStage.labelObject)
	incomeStage.addChild(incomeStage.contentObject)
	playerBar.addChild(incomeStage)

	leftTeamBar = new createjs.Container();
	leftTeamBar.x = playerBar.canvas.width * 0.1
	leftTeamBar.y = 0
	leftTeamBar.width = playerBar.canvas.width * 0.2
	leftTeamBar.height = (playerBar.canvas.height * 0.2)
	leftTeamBar.object = new createjs.Shape(new createjs.Graphics().beginStroke("black").beginLinearGradientFill(["#700", "#500", "#500", "#700"], [0, 0.25, 0.75, 1], 0, 0, 0, leftTeamBar.height).drawRect(0, 0, leftTeamBar.width, leftTeamBar.height))
	createTextObject(leftTeamBar, "text", "444/444", 0.5, 22);
	leftTeamBar.addChild(leftTeamBar.object)
	leftTeamBar.addChild(leftTeamBar.textObject)
	playerBar.addChild(leftTeamBar)

	rightTeamBar = new createjs.Container();
	rightTeamBar.x = playerBar.canvas.width * 0.7
	rightTeamBar.y = 0
	rightTeamBar.width = playerBar.canvas.width * 0.2
	rightTeamBar.height = (playerBar.canvas.height * 0.2)
	rightTeamBar.object = new createjs.Shape(new createjs.Graphics().beginStroke("black").beginLinearGradientFill(["#700", "#500", "#500", "#700"], [0, 0.25, 0.75, 1], 0, 0, 0, rightTeamBar.height).drawRect(0, 0, rightTeamBar.width, rightTeamBar.height))
	createTextObject(rightTeamBar, "text", "444/444", 0.5, 22);
	rightTeamBar.addChild(rightTeamBar.object)
	rightTeamBar.addChild(rightTeamBar.textObject)
	playerBar.addChild(rightTeamBar)

	leftSwap = new createjs.Container();
	leftSwap.x = 0
	leftSwap.y = 0
	leftSwap.height = (playerBar.canvas.height * 0.2)
	leftSwap.width = playerBar.canvas.width * 0.1
	leftSwap.object = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#222", "#444", "#444", "#222"], [0, 0.25, 0.75, 1], 0, 0, 0, leftSwap.height).drawRect(0, 0, leftSwap.width, leftSwap.height))
	createTextObject(leftSwap, "text", "Spells", 0.5);
	leftSwap.viewId = 0;
	leftSwap.addEventListener('click', function() {
		leftSwap.viewId === 0 ? leftSwap.viewId = 1 : leftSwap.viewId = 0;
		updateLeftBar(leftSwap.viewId)
	})
	leftSwap.addChild(leftSwap.object);
	leftSwap.addChild(leftSwap.textObject);
	cacheItem(leftSwap);
	playerBar.addChild(leftSwap)

	rightSwap = new createjs.Container();
	rightSwap.x = playerBar.canvas.width * 0.9
	rightSwap.y = 0
	rightSwap.height = leftSwap.height
	rightSwap.width = leftSwap.width
	rightSwap.object = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#222", "#444", "#444", "#222"], [0, 0.25, 0.75, 1], 0, 0, 0, rightSwap.height).drawRect(0, 0, rightSwap.width, rightSwap.height))
	createTextObject(rightSwap, "text", "Inventory", 0.5);
	rightSwap.swapViewId = 1;
	rightSwap.addChild(rightSwap.object);
	rightSwap.addChild(rightSwap.textObject);
	rightSwap.viewId = 0;
	rightSwap.addEventListener('click', function() {
		rightSwap.viewId === 0 ? rightSwap.viewId = 0 : rightSwap.viewId = 0;
		updateRightBar(rightSwap.viewId)
	})
	cacheItem(rightSwap);
	playerBar.addChild(rightSwap)

	miniMapStage = new createjs.Container();
	miniMapStage.x = playerBar.canvas.width * 0.3
	miniMapStage.y = playerBar.canvas.height * 0.2
	miniMapStage.height = playerBar.canvas.height * 0.8
	miniMapStage.width = playerBar.canvas.width * 0.2
	miniMapRatio = {
		height: gameStage.height / miniMapStage.height,
		width: gameStage.width / miniMapStage.width,
		radius: (gameStage.height + gameStage.width) / (miniMapStage.height + miniMapStage.width)
	}
	mapBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("lightgrey").drawRect(0, 0, miniMapStage.width, miniMapStage.height));
	mapBorder.width = miniMapStage.width
	mapBorder.height = miniMapStage.height
	miniPlayerSplit = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("black").drawRect(0, miniMapStage.height / 2, miniMapStage.width, 2));
	miniPlayerSplit.width = miniMapStage.width
	miniPlayerSplit.height = miniMapStage.height / 2
	cacheItem(mapBorder)
	cacheItem(miniPlayerSplit)
	miniMapStage.addChild(mapBorder);
	miniMapStage.addChild(miniPlayerSplit);
	var point = playerStage.localToGlobal(gameStage.regX, gameStage.regY);
	playerBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, playerStage.canvas.clientWidth / miniMapRatio.width, playerStage.canvas.clientHeight / miniMapRatio.height));
	playerBorder.width = playerStage.canvas.clientWidth / miniMapRatio.width
	playerBorder.height = playerStage.canvas.clientHeight / miniMapRatio.height
	cacheItem(playerBorder)
	miniMapStage.addChild(playerBorder);
	playerBar.addChild(miniMapStage);

	informationStage = new createjs.Container();
	informationStage.x = playerBar.canvas.width * 0.5
	informationStage.y = playerBar.canvas.height * 0.2
	informationStage.height = playerBar.canvas.height * 0.8
	informationStage.width = playerBar.canvas.width * 0.2
	playerBar.addChild(informationStage)

	monsterStage = new createjs.Container();
	monsterStage.x = 0
	monsterStage.y = playerBar.canvas.height * 0.2
	monsterStage.height = playerBar.canvas.height * 0.8
	monsterStage.width = playerBar.canvas.width * 0.3
	playerBar.addChild(monsterStage)

	shopStage = new createjs.Container();
	shopStage.x = playerBar.canvas.width * 0.7
	shopStage.y = playerBar.canvas.height * 0.2
	shopStage.height = playerBar.canvas.height * 0.8
	shopStage.width = playerBar.canvas.clientWidth * 0.30
	playerBar.addChild(shopStage)
}

function updateRightBar(view) {
	shopStage.removeAllChildren()
	// View 0 is Shop
	if (view == 0) {
		buttonWidth = shopStage.width / 4
		buttonHeight = shopStage.height / 2
		itemButtons = []
		for (var item in itemList) {
			var itemObject = itemList[item]
			itemButtons[item] = new createjs.Container()
			itemButtons[item].width = buttonWidth
			itemButtons[item].height = buttonHeight
			itemButtons[item].button = new createjs.Bitmap(contentManager.getResult(itemObject.icon.base))
			itemButtons[item].buttonBackground = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#777", "#DDD", "#DDD", "#777"], [0, 0.2, 0.8, 1], 0, 0, 0, buttonHeight).drawRect(0, 0, buttonWidth, buttonHeight));
			itemButtons[item].button.sourceRect = new createjs.Rectangle(itemObject.icon.left, itemObject.icon.top, itemObject.icon.height, itemObject.icon.width)
			if (item > 3) {
				itemButtons[item].y = buttonHeight
				itemButtons[item].x = buttonWidth * (item % 4)
			} else {
				itemButtons[item].x = buttonWidth * item
			}
			itemButtons[item].costText = new createjs.Text(itemObject.cost, textSize + "px " + textFont, 'black');
			itemButtons[item].costText.x = textPadding
			itemButtons[item].costText.y = textPadding
			itemButtons[item].itemId = item
			itemButtons[item].button.scaleX = buttonWidth / itemObject.icon.width
			itemButtons[item].button.scaleY = buttonHeight / itemObject.icon.height
			itemButtons[item].addEventListener('click', itemClick)
			itemButtons[item].addChild(itemButtons[item].buttonBackground)
			itemButtons[item].addChild(itemButtons[item].button)
			itemButtons[item].addChild(itemButtons[item].costText)
			cacheItem(itemButtons[item])
			shopStage.addChild(itemButtons[item])
		}
	}
	// View 1 is Inventory
	else if (view == 1) {
		buttonWidth = shopStage.width / 4 //Calculate how much width we have for buttons
		buttonHeight = shopStage.height / 2 // Calculate the two levels for buttons

	}
}



function updateLeftBar(view) {
	monsterStage.removeAllChildren(); // Clear everything from this section
	// View 0 is Monsters
	if (view == 0) {
		leftSwap.swapViewId = 1
		leftSwap.textObject.text = "Spells"
		cacheItem(leftSwap)
		buttonWidth = monsterStage.width * 0.25
		buttonHeight = monsterStage.height * 0.5
		monsterButtons = []
		for (var unit in monsterList[activePlayer.summonLevel]) {
			var monster = monsterList[activePlayer.summonLevel][unit]
			monsterButtons[unit] = new createjs.Container()
			monsterButtons[unit].height = buttonHeight
			monsterButtons[unit].width = buttonWidth
			monsterButtons[unit].button = new createjs.Bitmap(contentManager.getResult(monster.icon.base))
			monsterButtons[unit].buttonBackground = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#777", "#DDD", "#DDD", "#777"], [0, 0.2, 0.8, 1], 0, 0, 0, buttonHeight).drawRect(0, 0, buttonWidth, buttonHeight));
			monsterButtons[unit].button.sourceRect = new createjs.Rectangle(monster.icon.left, monster.icon.top, monster.icon.height, monster.icon.width)
			if (unit > 3) {
				monsterButtons[unit].y = buttonHeight
				monsterButtons[unit].x = buttonWidth * (unit % 4)
			} else {
				monsterButtons[unit].x = buttonWidth * unit
			}
			monsterButtons[unit].button.monsterId = unit;
			monsterButtons[unit].button.scaleX = buttonWidth / monster.icon.width;
			monsterButtons[unit].button.scaleY = buttonHeight / monster.icon.height;
			monsterButtons[unit].goldCost = new createjs.Text(monster.cost, textSize + "px " + textFont, 'black');
			monsterButtons[unit].goldCost = new createjs.Text(monster.cost, "18px " + textFont, 'black')
			monsterButtons[unit].goldCost.x = buttonWidth - (monsterButtons[unit].goldCost.getMeasuredWidth() + textPadding)
			monsterButtons[unit].goldCost.y = textPadding
			monsterButtons[unit].addEventListener('click', monsterClick)
			monsterButtons[unit].addChild(monsterButtons[unit].buttonBackground)
			monsterButtons[unit].addChild(monsterButtons[unit].button)
			monsterButtons[unit].addChild(monsterButtons[unit].goldCost)
			cacheItem(monsterButtons[unit])
			monsterStage.addChild(monsterButtons[unit])
		}
	}
	//View 1 is Spells 
	else if (view == 1) {
		leftSwap.textObject.text = 'Monsters'
		cacheItem(leftSwap)
		leftSwap.swapViewId = 0
		buttonWidth = monsterStage.width * 0.25
		buttonHeight = monsterStage.height
		spellButtons = []
		for (var spell in activePlayer.hero.spells) {
			var spellObject = activePlayer.hero.spells[spell]
			spellButtons[spell] = new createjs.Container()
			spellButtons[spell].width = buttonWidth
			spellButtons[spell].height = buttonHeight
			spellButtons[spell].button = new createjs.Bitmap(contentManager.getResult(spellObject.icon))
			spellButtons[spell].buttonBackground = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#777", "#DDD", "#DDD", "#777"], [0, 0.2, 0.8, 1], 0, 0, 0, buttonHeight).drawRect(0, 0, buttonWidth, buttonHeight));
			spellButtons[spell].levelButton = new createjs.Bitmap(contentManager.getResult('plus'))
			spellButtons[spell].levelButton.scaleX = (buttonWidth * 0.3) / spellButtons[spell].levelButton.image.width
			spellButtons[spell].levelButton.scaleY = (buttonHeight * 0.3) / spellButtons[spell].levelButton.image.height
			spellButtons[spell].levelText = new createjs.Text(spellObject.level, textSize + "px " + textFont, 'red');
			spellButtons[spell].levelText = new createjs.Text(spellObject.level, "18px " + textFont, 'red');
			spellButtons[spell].levelText.x = buttonWidth - (spellObject.level.toString().length * 10)
			spellButtons[spell].levelText.y = buttonHeight - textSize
			spellButtons[spell].x = buttonWidth * spell
			spellButtons[spell].button.spellId = spell
			spellButtons[spell].button.scaleX = buttonWidth / spellButtons[spell].button.image.width
			spellButtons[spell].button.scaleY = buttonHeight / spellButtons[spell].button.image.height
			spellButtons[spell].levelButton.addEventListener('click', levelClick)
			spellButtons[spell].addEventListener('click', spellClick)
			spellButtons[spell].addChild(spellButtons[spell].buttonBackground)
			spellButtons[spell].addChild(spellButtons[spell].button)
			spellButtons[spell].addChild(spellButtons[spell].levelText)
			cacheItem(spellButtons[spell])
			monsterStage.addChild(spellButtons[spell])
		}
	}
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
	gameOptions = {
		mode: 'solo',
		hero: 'warrior',
		spells: [new spellList['cupcakeTrap'], new spellList['coneFire'], new spellList['damageOverTime'], new ultimateList['ultIceBall']]
	}
	createStage()
	newGame(gameOptions)
	playerStage.canvas.oncontextmenu = function(e) {
		e.preventDefault();
	};
	playerBar.canvas.oncontextmenu = function(e) {
		e.preventDefault();
	};
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

function updatePlayerBar(event) {

	gameTime.textObject.text = msToTime(event.time);
	incomeTime.textObject.text = msToTime((activePlayer.hero.goldTime + 20000) - event.time);
	// createTextObject(goldStage, "content", activePlayer.hero.gold, 0.75)
	// createTextObject(incomeStage, "content", activePlayer.hero.income, 0.75)
	goldStage.contentObject.text = activePlayer.hero.gold
	incomeStage.contentObject.text = activePlayer.hero.income
	if (leftSwap.swapViewId == 0) {
		updateSpells(event)
	}
	refreshInfoBar(event);
	playerBar.update(event);
}

function gameLoop(event) {
	fpsText.text = 'FPS: ' + Math.round(createjs.Ticker.getMeasuredFPS())
	unitText.text = 'Units: ' + Object.keys(teamList[0].unitList).length
	//edgeScrolling(event); //In handle.js
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
	updateCollisionTree(event) //in handle.js
	updateStage(event);
	updatePlayerBar(event);
}