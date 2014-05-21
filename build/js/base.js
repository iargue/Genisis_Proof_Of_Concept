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
	spellButtons = null;
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
		leftTeamBar.object.graphics.clear().beginStroke("black").beginFill("B30000").drawRect(0, 0, leftTeamBar.width, leftTeamBar.height);

		rightTeamBar.x = playerBar.canvas.width * 0.7
		rightTeamBar.y = 0
		rightTeamBar.width = playerBar.canvas.width * 0.2
		rightTeamBar.height = playerBar.canvas.height * 0.2
		rightTeamBar.object.graphics.clear().beginStroke("black").beginFill("B30000").drawRect(0, 0, rightTeamBar.width, rightTeamBar.height);

		leftSwap.x = 0
		leftSwap.y = 0
		leftSwap.height = playerBar.canvas.height * 0.2
		leftSwap.width = playerBar.canvas.width * 0.1
		leftSwap.object.graphics.clear().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#777", "#DDD", "#DDD", "#777"], [0, 0.2, 0.8, 1], 0, 0, 0, leftSwap.height).drawRect(0, 0, leftSwap.width, leftSwap.height);

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
		informationStageObject.graphics.clear().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, informationStage.width, informationStage.height)

		monsterStage.x = 0
		monsterStage.y = playerBar.canvas.height * 0.2
		monsterStage.height = playerBar.canvas.height * 0.8
		monsterStage.width = playerBar.canvas.width * 0.3
		monsterStageObject.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("lightblue").drawRect(0, 0, monsterStage.width, monsterStage.height)

		shopStage.x = playerBar.canvas.width * 0.70
		shopStage.y = (playerBar.canvas.height * 0.2)
		shopStage.height = playerBar.canvas.height * 0.8
		shopStage.width = playerBar.canvas.width * 0.30
		shopStageObject.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("lightblue").drawRect(0, 0, shopStage.width, shopStage.height)

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

function createTextObject(container, text, width) {
	// Create string always 9 or more characters long
	var newText = text;
	if(text.length < 9){
		var str1 = "", 
			str2 = "";
		for(var i = 0; i < 9 - text.length; i++)
			newText = " " + newText
	}
	console.log(newText);
	container.textObject = new createjs.Text(newText, textSize + "px " + textFont, '#FFF');
	container.textObject.scaleX = (container.width * width) / container.textObject.getMeasuredWidth();
	container.textObject.scaleY = (container.height / 2) / container.textObject.getMeasuredHeight();
	container.textObject.x = (container.width * 0.5) - (container.textObject.getTransformedBounds().width / 2);
	container.textObject.y = container.textObject.getTransformedBounds().height / 2;
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
	playerBar.object = new createjs.Shape(new createjs.Graphics().beginFill("#111").drawRect(0, 0, playerBar.canvas.width, playerBar.canvas.height));
	playerBar.addChild(playerBar.object);

	gameTime = new createjs.Container();
	gameTime.x = playerBar.canvas.width * 0.5
	gameTime.y = 0
	gameTime.width = playerBar.canvas.width * 0.1
	gameTime.height = (playerBar.canvas.height * 0.2)
	gameTime.object = new createjs.Shape(new createjs.Graphics().drawRect(0, 0, gameTime.width, gameTime.height));
	createTextObject(gameTime, "00:00:00", 0.5);
	gameTime.addChild(gameTime.object);
	gameTime.addChild(gameTime.textObject);
	playerBar.addChild(gameTime);

	incomeTime = new createjs.Container();
	incomeTime.x = playerBar.canvas.width * 0.4
	incomeTime.y = 0
	incomeTime.width = playerBar.canvas.width * 0.1
	incomeTime.height = (playerBar.canvas.height * 0.2)
	incomeTime.object = new createjs.Shape(new createjs.Graphics().beginStroke("black").drawRect(0, 0, incomeTime.width, incomeTime.height));
	createTextObject(incomeTime, "00:00:00", 0.5);
	incomeTime.addChild(incomeTime.object);
	incomeTime.addChild(incomeTime.textObject);
	playerBar.addChild(incomeTime);

	goldStage = new createjs.Container()
	goldStage.x = playerBar.canvas.width * 0.6
	goldStage.y = 0
	goldStage.width = playerBar.canvas.width * 0.1
	goldStage.height = (playerBar.canvas.height * 0.2) 
	goldStage.object = new createjs.Shape(new createjs.Graphics().beginStroke("black").drawRect(0, 0, goldStage.width, goldStage.height));
	createTextObject(goldStage, "0", 0.5); 
	goldStage.addChild(goldStage.object)
	goldStage.addChild(goldStage.textObject)
	playerBar.addChild(goldStage)

	incomeStage = new createjs.Container()
	incomeStage.x = playerBar.canvas.width * 0.3
	incomeStage.y = 0
	incomeStage.width = playerBar.canvas.width * 0.1
	incomeStage.height = playerBar.canvas.height * 0.2
	incomeStage.object = new createjs.Shape(new createjs.Graphics().beginStroke("black").drawRect(0, 0, incomeStage.width, incomeStage.height))
	createTextObject(incomeStage, "1", 0.5); 
	incomeStage.addChild(incomeStage.object)
	incomeStage.addChild(incomeStage.textObject)
	playerBar.addChild(incomeStage)

	leftTeamBar = new createjs.Container()
	leftTeamBar.x = playerBar.canvas.width * 0.1
	leftTeamBar.y = 0
	leftTeamBar.width = playerBar.canvas.width * 0.2
	leftTeamBar.height = (playerBar.canvas.height * 0.2)
	leftTeamBar.object = new createjs.Shape(new createjs.Graphics().beginStroke("black").beginFill("B30000").drawRect(0, 0, leftTeamBar.width, leftTeamBar.height))
	createTextObject(leftTeamBar, "444/444", 0.25);
	leftTeamBar.addChild(leftTeamBar.object)
	leftTeamBar.addChild(leftTeamBar.textObject)
	playerBar.addChild(leftTeamBar)

	rightTeamBar = new createjs.Container()
	rightTeamBar.x = playerBar.canvas.width * 0.7
	rightTeamBar.y = 0
	rightTeamBar.width = playerBar.canvas.width * 0.2
	rightTeamBar.height = (playerBar.canvas.height * 0.2)
	rightTeamBar.object = new createjs.Shape(new createjs.Graphics().beginStroke("black").beginFill("B30000").drawRect(0, 0, rightTeamBar.width, rightTeamBar.height))
	createTextObject(rightTeamBar, "444/444", 0.25);
	rightTeamBar.addChild(rightTeamBar.object)
	rightTeamBar.addChild(rightTeamBar.textObject)
	playerBar.addChild(rightTeamBar)

	leftSwap = new createjs.Container();
	leftSwap.x = 0
	leftSwap.y = 0
	leftSwap.height = (playerBar.canvas.height * 0.2)
	leftSwap.width = playerBar.canvas.width * 0.1
	leftSwap.object = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#222", "#444", "#444", "#222"], [0, 0.25, 0.75, 1], 0, 0, 0, leftSwap.height).drawRect(0, 0, leftSwap.width, leftSwap.height))
	createTextObject(leftSwap, "Spells", 0.5);
	leftSwap.viewId = 0;
	leftSwap.addEventListener('click', function(){
		leftSwap.viewId === 0 ? leftSwap.viewId = 1 : leftSwap.viewId = 0;
		updateLeftBar(leftSwap.viewId)
	})
	leftSwap.addChild(leftSwap.object);
	leftSwap.addChild(leftSwap.textObject);
	playerBar.addChild(leftSwap)

	rightSwap = new createjs.Container();
	rightSwap.x = playerBar.canvas.width * 0.9
	rightSwap.y = 0
	rightSwap.height = leftSwap.height
	rightSwap.width = leftSwap.width
	rightSwap.object = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#222", "#444", "#444", "#222"], [0, 0.25, 0.75, 1], 0, 0, 0, rightSwap.height).drawRect(0, 0, rightSwap.width, rightSwap.height))
	createTextObject(rightSwap, "Inventory", 0.5);
	rightSwap.swapViewId = 1;
	rightSwap.addChild(rightSwap.object);
	rightSwap.addChild(rightSwap.textObject);
	rightSwap.viewId = 0;
	rightSwap.addEventListener('click', function(){
		rightSwap.viewId === 0 ? rightSwap.viewId = 0 : rightSwap.viewId = 0;
		updateRightBar(rightSwap.viewId)
	})
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
	miniPlayerSplit = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("black").drawRect(0, miniMapStage.height / 2, miniMapStage.width, 2));
	miniMapStage.addChild(mapBorder);
	miniMapStage.addChild(miniPlayerSplit);
	var point = playerStage.localToGlobal(gameStage.regX, gameStage.regY);
	playerBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, playerStage.canvas.clientWidth / miniMapRatio.width, playerStage.canvas.clientHeight / miniMapRatio.height));
	miniMapStage.addChild(playerBorder);
	playerBar.addChild(miniMapStage);

	informationStage = new createjs.Container();
	informationStage.x = playerBar.canvas.width * 0.5
	informationStage.y = playerBar.canvas.height * 0.2
	informationStage.height = playerBar.canvas.height * 0.8
	informationStage.width = playerBar.canvas.width * 0.2
	informationStageObject = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, informationStage.width, informationStage.height));
	informationStage.addChild(informationStageObject)
	playerBar.addChild(informationStage)

	monsterStage = new createjs.Container();
	monsterStage.x = 0
	monsterStage.y = playerBar.canvas.height * 0.2
	monsterStage.height = playerBar.canvas.height * 0.8
	monsterStage.width = playerBar.canvas.width * 0.3
	monsterStageObject = new createjs.Shape(new createjs.Graphics().drawRect(0, 0, monsterStage.width, monsterStage.height));
	monsterStage.addChild(monsterStageObject)
	playerBar.addChild(monsterStage)

	shopStage = new createjs.Container();
	shopStage.x = playerBar.canvas.width * 0.7
	shopStage.y = playerBar.canvas.height * 0.2
	shopStage.height = playerBar.canvas.height * 0.8
	shopStage.width = playerBar.canvas.clientWidth * 0.30
	shopStageObject = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, shopStage.width, shopStage.height));
	shopStage.addChild(shopStageObject)
	playerBar.addChild(shopStage)
}

function updateRightBar(view) {
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
			itemButtons[item].buttonBackground = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#777", "#DDD", "#DDD", "#777"], [0, 0.2, 0.8, 1], 0, 0, 0, buttonHeight).drawRect(0, 0, buttonWidth, buttonHeight));
			itemButtons[item].button.sourceRect = new createjs.Rectangle(itemObject.icon.left, itemObject.icon.top, itemObject.icon.height, itemObject.icon.width)
			if (item > 3) { //We have added 4 units to this row, lets move it down 1.
				itemButtons[item].y = buttonHeight //This puts it in row 2 instead of 1.
				itemButtons[item].x = buttonWidth * (item % 4) //Since we are on row 2, we have to restart our x movement
			} else {
				itemButtons[item].x = buttonWidth * item //Since we are on row 1, we just increase the x by the width of a button for each unit
			}
			itemButtons[item].costText = new createjs.Text(itemObject.cost, textSize + "px " + textFont, 'black'); //Add in the text for how much it costs
			itemButtons[item].costText.x = textPadding //buttonWidth - (itemButtons[item].costText.getMeasuredWidth() + textPadding) //Put the text at the bottom based on how many digits are in the cost
			itemButtons[item].costText.y = textPadding // buttonHeight - (18 + textPadding) //Put it 18px off (Size of text)itemButtons[item] .x = buttonWidth * spell //Since we are on row 1, we just increase the x by the width of a button for each unit
			itemButtons[item].costText = new createjs.Text(itemObject.cost, "18px " + textFont, 'black'); //Add in the text for how much it costs
			itemButtons[item].costText.x = buttonWidth - (itemButtons[item].costText.getMeasuredWidth() + textPadding) //Put the text at the bottom based on how many digits are in the cost
			itemButtons[item].costText.y = buttonHeight - (18 + textPadding) //Put it 18px off (Size of text)itemButtons[item] .x = buttonWidth * spell //Since we are on row 1, we just increase the x by the width of a button for each unit
			itemButtons[item].button.itemId = item //Store a reference to what item this button is for. Used when clicking
			itemButtons[item].button.scaleX = buttonWidth / itemObject.icon.width //Scale the image down so it fits
			itemButtons[item].button.scaleY = buttonHeight / itemObject.icon.height //Scale the image down so it fits
			itemButtons[item].addEventListener('click', itemClick) //When this button is clicked, call this function (itemclick)
			itemButtons[item].addChild(itemButtons[item].buttonBackground)
			itemButtons[item].addChild(itemButtons[item].button) //Add to the container
			itemButtons[item].addChild(itemButtons[item].costText)
			shopStage.addChild(itemButtons[item]) //Add the container to the shopStage container
		}
	}
}



function updateLeftBar(view) {
	monsterStage.removeAllChildren() // Clear everything from this section
	monsterStage.addChild(monsterStageObject) //Add back our background
	if (view == 0) { //View 0 is Monsters
		leftSwap.swapViewId = 1
		leftSwap.textObject.text = 'Spells'
		buttonWidth = monsterStage.width / 4 //Calculate how much width we have for buttons
		buttonHeight = monsterStage.height / 2 // Calculate the two levels for buttons
		monsterButtons = [] //Create an object to store everything
		for (var unit in monsterList[activePlayer.summonLevel]) { //Lets loop through all of the currently free monsters
			var monster = monsterList[activePlayer.summonLevel][unit] //Store a reference to the current monster
			monsterButtons[unit] = new createjs.Container() //Container for the multiple objects we will be creating
			monsterButtons[unit].button = new createjs.Bitmap(contentManager.getResult(monster.icon.base)) //Add an image to the container. Based on monster icon
			monsterButtons[unit].buttonBackground = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#777", "#DDD", "#DDD", "#777"], [0, 0.2, 0.8, 1], 0, 0, 0, buttonHeight).drawRect(0, 0, buttonWidth, buttonHeight));
			monsterButtons[unit].button.sourceRect = new createjs.Rectangle(monster.icon.left, monster.icon.top, monster.icon.height, monster.icon.width)
			//monsterButtons[unit].buttonBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, buttonWidth, buttonHeight));
			if (unit > 3) { //We have added 4 units to this row, lets move it down 1.
				monsterButtons[unit].y = buttonHeight //This puts it in row 2 instead of 1.
				monsterButtons[unit].x = buttonWidth * (unit % 4) //Since we are on row 2, we have to restart our x movement
			} else {
				monsterButtons[unit].x = buttonWidth * unit //Since we are on row 1, we just increase the x by the width of a button for each unit
			}
			monsterButtons[unit].button.monsterId = unit //Store a reference to what monster this button is for. Used when clicking
			monsterButtons[unit].button.scaleX = buttonWidth / monster.icon.width //Scale the image down so it fits
			monsterButtons[unit].button.scaleY = buttonHeight / monster.icon.height //Scale the image down so it fits
			monsterButtons[unit].goldCost = new createjs.Text(monster.cost, textSize + "px " + textFont, 'black'); //Add in the text for how much it costs
			monsterButtons[unit].goldCost = new createjs.Text(monster.cost, "18px " + textFont, 'black'); //Add in the text for how much it costs
			monsterButtons[unit].goldCost.x = buttonWidth - (monsterButtons[unit].goldCost.getMeasuredWidth() + textPadding) //Put the text at the bottom based on how many digits are in the cost
			monsterButtons[unit].goldCost.y = textPadding //buttonHeight - (18 + textPadding) //Put it 18px off (Size of text)
			monsterButtons[unit].addEventListener('click', monsterClick) //When this button is clicked, call this function (monsterclick)
			monsterButtons[unit].addChild(monsterButtons[unit].buttonBackground)
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
			spellButtons[spell].buttonBackground = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#777", "#DDD", "#DDD", "#777"], [0, 0.2, 0.8, 1], 0, 0, 0, buttonHeight).drawRect(0, 0, buttonWidth, buttonHeight));
			spellButtons[spell].levelButton = new createjs.Bitmap(contentManager.getResult('plus'))
			spellButtons[spell].levelButton.scaleX = (buttonWidth * 0.3) / spellButtons[spell].levelButton.image.width //Scale the image down so it fits
			spellButtons[spell].levelButton.scaleY = (buttonHeight * 0.3) / spellButtons[spell].levelButton.image.height //Scale the image down so it fits
			spellButtons[spell].levelText = new createjs.Text(spellObject.level, textSize + "px " + textFont, 'red'); //Add in the text for how much it costs
			spellButtons[spell].levelText = new createjs.Text(spellObject.level, "18px " + textFont, 'red'); //Add in the text for how much it costs
			spellButtons[spell].levelText.x = buttonWidth - (spellObject.level.toString().length * 10) //Put the text at the bottom based on how many digits are in the cost
			spellButtons[spell].levelText.y = buttonHeight - textSize //Put it 18px off (Size of text)spellButtons[spell].x = buttonWidth * spell //Since we are on row 1, we just increase the x by the width of a button for each unit
			spellButtons[spell].x = buttonWidth * spell
			spellButtons[spell].button.spellId = spell //Store a reference to what monster this button is for. Used when clicking
			spellButtons[spell].button.scaleX = buttonWidth / spellButtons[spell].button.image.width //Scale the image down so it fits
			spellButtons[spell].button.scaleY = buttonHeight / spellButtons[spell].button.image.height //Scale the image down so it fits
			spellButtons[spell].levelButton.addEventListener('click', levelClick)
			spellButtons[spell].addEventListener('click', spellClick) //When this button is clicked, call this function (monsterclick)
			spellButtons[spell].addChild(spellButtons[spell].buttonBackground)
			spellButtons[spell].addChild(spellButtons[spell].button) //Add to the container
			spellButtons[spell].addChild(spellButtons[spell].levelText)
			monsterStage.addChild(spellButtons[spell]) //Add the container to the monsterStage container
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
	contentManager.on("complete", imageLoadingDone, this);
}

function gameLoop(event) {
	edgeScrolling(event); //In handle.js
	gameTime.textObject.text = msToTime(event.time);
	incomeTime.textObject.text = msToTime((activePlayer.hero.goldTime + 20000) - event.time);
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