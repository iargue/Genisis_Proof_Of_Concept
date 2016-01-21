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
    buttonWidth,
    buttonHeight,
    renderer = null,
    scrollDown = false,
    scrollUp = false,
    scrollLeft = false,
    scrollRight = false,
    castActive = false,
    monsterbuttons = null,
    viewTarget = [null, null],
    spellButtons = null,
    smallText = 12,
    textPadding = 2, // Vertical Padding for readability
    gameHeight = 4000,
    gameWidth = 8000,
    ticker = null,
    textFont = "Calibri";

function newGame(gameOptions) {
    if (gameOptions.mode === 'solo') {
        activeTeam = new team(0)
        activeTeam.addPlayer(0, true, gameOptions.hero, gameOptions.spells)
        opponentTeam = activeTeam
        teamList.push(activeTeam)
    } else if (gameOptions.mode === 'online') {
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
        if (gameStage.regY + playerStage.canvas.height > gameHeight) {
            gameStage.regY = gameHeight - playerStage.canvas.height
        }
        if (gameStage.regY + playerStage.canvas.height < 0) {
            gameStage.regY = 0 + playerStage.canvas.height
        }
        if (gameStage.regX + playerStage.canvas.width > gameWidth) {
            gameStage.regX = gameWidth- playerStage.canvas.width
        }
        if (gameStage.regX + playerStage.canvas.width < 0) {
            gameStage.regX = 0 + playerStage.canvas.width
        }
        gameTime.x = playerBar.canvas.width * 0.5
        gameTime.y = 0
        gameTime.width = playerBar.canvas.width * 0.1
        gameTime.height = playerBar.canvas.height * 0.2
        incomeTime.x = playerBar.canvas.width * 0.4
        incomeTime.y = 0
        incomeTime.width = playerBar.canvas.width * 0.1
        incomeTime.height = playerBar.canvas.height * 0.2
        goldStage.x = playerBar.canvas.width * 0.6
        goldStage.y = 0
        goldStage.width = playerBar.canvas.width * 0.1
        goldStage.height = playerBar.canvas.height * 0.2
        incomeStage.x = playerBar.canvas.width * 0.3
        incomeStage.y = 0
        incomeStage.width = playerBar.canvas.width * 0.1
        incomeStage.height = playerBar.canvas.height * 0.2
        leftTeamBar.x = playerBar.canvas.width * 0.1
        leftTeamBar.y = 0
        leftTeamBar.width = playerBar.canvas.width * 0.2
        leftTeamBar.height = playerBar.canvas.height * 0.2
        leftTeamBar.object.graphics.clear().beginStroke("black").beginLinearGradientFill(["#200", "#400", "#400", "#200"], [0, 0.2, 0.8, 1], 0, 0, 0, leftTeamBar.height).drawRect(0, 0, leftTeamBar.width, leftTeamBar.height);
        cacheItem(leftTeamBar.object)
        rightTeamBar.x = playerBar.canvas.width * 0.7
        rightTeamBar.y = 0
        rightTeamBar.width = playerBar.canvas.width * 0.2
        rightTeamBar.height = playerBar.canvas.height * 0.2
        rightTeamBar.object.graphics.clear().beginStroke("black").beginLinearGradientFill(["#200", "#400", "#400", "#200"], [0, 0.2, 0.8, 1], 0, 0, 0, rightTeamBar.height).drawRect(0, 0, rightTeamBar.width, rightTeamBar.height);
        cacheItem(rightTeamBar.object)
        leftSwap.x = 0
        leftSwap.y = 0
        leftSwap.height = playerBar.canvas.height * 0.2
        leftSwap.width = playerBar.canvas.width * 0.1
        leftSwap.object.graphics.clear().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#222", "#444", "#444", "#222"], [0, 0.2, 0.8, 1], 0, 0, 0, leftSwap.height).drawRect(0, 0, leftSwap.width, leftSwap.height);
        rightSwap.x = playerBar.canvas.width * 0.9
        rightSwap.y = 0
        rightSwap.height = playerBar.canvas.height * 0.2
        rightSwap.width = playerBar.canvas.width * 0.1
        rightSwap.object.graphics.clear().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#222", "#444", "#444", "#222"], [0, 0.2, 0.8, 1], 0, 0, 0, rightSwap.height).drawRect(0, 0, rightSwap.width, rightSwap.height);
        miniMapStage.x = playerBar.canvas.width * 0.3
        miniMapStage.y = playerBar.canvas.height * 0.2
        miniMapStage.height = playerBar.canvas.height * 0.8
        miniMapStage.width = playerBar.canvas.width * 0.2
        miniMapRatio = {
            height: gameHeight / miniMapStage.height,
            width: gameWidth/ miniMapStage.width,
            radius: (gameHeight + gameWidth) / (miniMapStage.height + miniMapStage.width)
        }
        mapBorder.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("lightgrey").drawRect(0, 0, miniMapStage.width, miniMapStage.height);
        miniPlayerSplit.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("black").drawRect(0, miniMapStage.height / 2, miniMapStage.width, 2);
        playerBorder.graphics.clear().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, playerStage.canvas.clientWidth / miniMapRatio.width, playerStage.canvas.clientHeight / miniMapRatio.height);
        informationStage.x = playerBar.canvas.width * 0.5
        informationStage.y = playerBar.canvas.height * 0.2
        informationStage.height = playerBar.canvas.height * 0.8
        informationStage.width = playerBar.canvas.width * 0.2
            // informationStage.object.graphics.clear().drawRect(0, 0, informationStage.width, informationStage.height)
        monsterStage.x = 0
        monsterStage.y = playerBar.canvas.height * 0.2
        monsterStage.height = playerBar.canvas.height * 0.8
        monsterStage.width = playerBar.canvas.width * 0.3
        console.log(monsterStage)
        shopStage.x = playerBar.canvas.width * 0.7
        shopStage.y = playerBar.canvas.height * 0.2
        shopStage.height = playerBar.canvas.height * 0.8
        shopStage.width = playerBar.canvas.width * 0.3
        playerBorder.x = gameStage.regX / miniMapRatio.width
        playerBorder.y = gameStage.regY / miniMapRatio.height
        if (leftSwap.swapViewId == 0) {
            updateLeftBar(1)
        } else {
            updateLeftBar(0)
        }
        updateRightBar(0)
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
    stage = new PIXI.Container();
    gameStage = new PIXI.Container();
    gameWidth= gameWidth;
    gameHeight = gameHeight;
    var border = new PIXI.Graphics().lineStyle(10, 0xdc143c).drawRect(0, 0, gameWidth, gameHeight).endFill()
    var playerSplit = new PIXI.Graphics().lineStyle(1, 0x000000, 1).beginFill(0x000000).drawRect(0,  gameHeight / 2 - 3, gameWidth, 6).endFill();
    gameStage.addChild(border);
    gameStage.addChild(playerSplit);
	console.log(gameStage)
    bounds = {
        x: 0,
        y: 0,
        w: gameWidth,
        h: gameHeight,
    }
    collisionTree = QUAD.init(bounds);
    fpsText = new PIXI.Text('0', {font: textSize + "px " + textFont, fill : '0x000000'});
    unitText = new PIXI.Text('0', {font: textSize + "px " + textFont, fill : '0x000000'});
    fpsText.x = 10
    fpsText.y = 6
    unitText.y = fpsText.height + 16
    unitText.x = 10
    stage.addChild(fpsText)
    stage.addChild(unitText)
    playerBar = new PIXI.Container();
    playerBar.height = renderer.height * 0.2
    playerBar.width = renderer.width
    playerBar.y = renderer.height - playerBar._height 
    playerBar.object = new PIXI.Graphics().beginFill("0x111").drawRect(0, 0, playerBar._width, playerBar._height);
    playerBar.addChild(playerBar.object);
    // gameTime = new createjs.Container();
    // gameTime.x = playerBar.canvas.width * 0.5
    // gameTime.y = 0
    // gameTime.width = playerBar.canvas.width * 0.1
    // gameTime.height = playerBar.canvas.height * 0.2
    // createTextObject(gameTime, "text", "00:00:00", 0.5);
    // gameTime.addChild(gameTime.textObject);
    // playerBar.addChild(gameTime);
    // incomeTime = new createjs.Container();
    // incomeTime.x = playerBar.canvas.width * 0.4
    // incomeTime.y = 0
    // incomeTime.width = playerBar.canvas.width * 0.1
    // incomeTime.height = playerBar.canvas.height * 0.2
    // createTextObject(incomeTime, "text", "00:00:00", 0.5);
    // incomeTime.addChild(incomeTime.textObject);
    // playerBar.addChild(incomeTime);
    // goldStage = new createjs.Container()
    // goldStage.x = playerBar.canvas.width * 0.6
    // goldStage.y = 0
    // goldStage.width = playerBar.canvas.width * 0.1
    // goldStage.height = playerBar.canvas.height * 0.2
    // createTextObject(goldStage, "label", "Current Gold", 0.75, 20, "#EFC94C");
    // createTextObject(goldStage, "content", "0", 0.75)
    // goldStage.addChild(goldStage.labelObject)
    // goldStage.addChild(goldStage.contentObject)
    // playerBar.addChild(goldStage)
    // incomeStage = new createjs.Container()
    // incomeStage.x = playerBar.canvas.width * 0.3
    // incomeStage.y = 0
    // incomeStage.width = playerBar.canvas.width * 0.1
    // incomeStage.height = playerBar.canvas.height * 0.2
    // createTextObject(incomeStage, "label", "Current Income", 0.75, 15, "#EFC94C")
    // createTextObject(incomeStage, "content", "1", 0.75)
    // incomeStage.addChild(incomeStage.labelObject)
    // incomeStage.addChild(incomeStage.contentObject)
    // playerBar.addChild(incomeStage)
    // leftTeamBar = new createjs.Container();
    // leftTeamBar.x = playerBar.canvas.width * 0.1
    // leftTeamBar.y = 0
    // leftTeamBar.width = playerBar.canvas.width * 0.2
    // leftTeamBar.height = playerBar.canvas.height * 0.2
    // leftTeamBar.object = new createjs.Shape(new createjs.Graphics().beginStroke("black").beginLinearGradientFill(["#700", "#500", "#500", "#700"], [0, 0.25, 0.75, 1], 0, 0, 0, leftTeamBar.height).drawRect(0, 0, leftTeamBar.width, leftTeamBar.height))
    // createTextObject(leftTeamBar, "text", "444/444", 0.5, 22);
    // leftTeamBar.addChild(leftTeamBar.object)
    // leftTeamBar.addChild(leftTeamBar.textObject)
    // playerBar.addChild(leftTeamBar)
    // rightTeamBar = new createjs.Container();
    // rightTeamBar.x = playerBar.canvas.width * 0.7
    // rightTeamBar.y = 0
    // rightTeamBar.width = playerBar.canvas.width * 0.2
    // rightTeamBar.height = playerBar.canvas.height * 0.2
    // rightTeamBar.object = new createjs.Shape(new createjs.Graphics().beginStroke("black").beginLinearGradientFill(["#700", "#500", "#500", "#700"], [0, 0.25, 0.75, 1], 0, 0, 0, rightTeamBar.height).drawRect(0, 0, rightTeamBar.width, rightTeamBar.height))
    // createTextObject(rightTeamBar, "text", "444/444", 0.5, 22);
    // rightTeamBar.addChild(rightTeamBar.object)
    // rightTeamBar.addChild(rightTeamBar.textObject)
    // playerBar.addChild(rightTeamBar)
    // leftSwap = new createjs.Container();
    // leftSwap.x = 0
    // leftSwap.y = 0
    // leftSwap.width = playerBar.canvas.width * 0.1
    // leftSwap.height = playerBar.canvas.height * 0.2
    // leftSwap.object = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#222", "#444", "#444", "#222"], [0, 0.25, 0.75, 1], 0, 0, 0, leftSwap.height).drawRect(0, 0, leftSwap.width, leftSwap.height))
    // createTextObject(leftSwap, "text", "Spells", 0.5);
    // leftSwap.viewId = 0;
    // leftSwap.addEventListener('click', function() {
    //     leftSwap.viewId === 0 ? leftSwap.viewId = 1 : leftSwap.viewId = 0;
    //     updateLeftBar(leftSwap.viewId)
    // });
    // leftSwap.addChild(leftSwap.object);
    // leftSwap.addChild(leftSwap.textObject);
    // cacheItem(leftSwap);
    // playerBar.addChild(leftSwap)
    // rightSwap = new createjs.Container();
    // rightSwap.x = playerBar.canvas.width * 0.9
    // rightSwap.y = 0
    // rightSwap.width = leftSwap.width
    // rightSwap.height = leftSwap.height
    // rightSwap.object = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#222", "#444", "#444", "#222"], [0, 0.25, 0.75, 1], 0, 0, 0, rightSwap.height).drawRect(0, 0, rightSwap.width, rightSwap.height))
    // createTextObject(rightSwap, "text", "Inventory", 0.5);
    // rightSwap.viewId = 0;
    // rightSwap.addEventListener('click', function() {
    //     rightSwap.viewId === 0 ? rightSwap.viewId = 1 : rightSwap.viewId = 0;
    //     updateRightBar(rightSwap.viewId)
    // });
    // rightSwap.addChild(rightSwap.object);
    // rightSwap.addChild(rightSwap.textObject);
    // cacheItem(rightSwap);
    // playerBar.addChild(rightSwap)
    // miniMapStage = new createjs.Container();
    // miniMapStage.x = playerBar.canvas.width * 0.3
    // miniMapStage.y = playerBar.canvas.height * 0.2
    // miniMapStage.width = playerBar.canvas.width * 0.2
    // miniMapStage.height = playerBar.canvas.height * 0.8
    // miniMapRatio = {
    //     width: gameWidth/ miniMapStage.width,
    //     height: gameHeight / miniMapStage.height,
    //     radius: (gameHeight + gameWidth) / (miniMapStage.height + miniMapStage.width)
    // }
    // mapBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("lightgrey").drawRect(0, 0, miniMapStage.width, miniMapStage.height));
    // mapBorder.width = miniMapStage.width
    // mapBorder.height = miniMapStage.height
    // miniPlayerSplit = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("black").drawRect(0, miniMapStage.height / 2, miniMapStage.width, 2));
    // miniPlayerSplit.width = miniMapStage.width
    // miniPlayerSplit.height = miniMapStage.height / 2
    // cacheItem(mapBorder)
    // cacheItem(miniPlayerSplit)
    // miniMapStage.addChild(mapBorder);
    // miniMapStage.addChild(miniPlayerSplit);
    // var point = playerStage.localToGlobal(gameStage.regX, gameStage.regY);
    // playerBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, playerStage.canvas.clientWidth / miniMapRatio.width, playerStage.canvas.clientHeight / miniMapRatio.height));
    // playerBorder.width = playerStage.canvas.clientWidth / miniMapRatio.width
    // playerBorder.height = playerStage.canvas.clientHeight / miniMapRatio.height
    // cacheItem(playerBorder);
    // miniMapStage.addChild(playerBorder);
    // playerBar.addChild(miniMapStage);
    // informationStage = new createjs.Container();
    // informationStage.x = playerBar.canvas.width * 0.5
    // informationStage.y = playerBar.canvas.height * 0.2
    // informationStage.width = playerBar.canvas.width * 0.2
    // informationStage.height = playerBar.canvas.height * 0.8
    // playerBar.addChild(informationStage)
    // monsterStage = new createjs.Container();
    // monsterStage.x = 0
    // monsterStage.y = playerBar.canvas.height * 0.2
    // monsterStage.width = playerBar.canvas.width * 0.3
    // monsterStage.height = playerBar.canvas.height * 0.8
    // playerBar.addChild(monsterStage)
    // shopStage = new createjs.Container();
    // shopStage.x = playerBar.canvas.width * 0.7
    // shopStage.y = playerBar.canvas.height * 0.2
    // shopStage.width = playerBar.canvas.width * 0.3
    // shopStage.height = playerBar.canvas.height * 0.8
    // playerBar.addChild(shopStage)
    stage.addChild(gameStage)
    stage.addChild(playerBar)
    
}

function updateRightBar(view, itemId) {
    shopStage.removeAllChildren()
        // View 0 is Shop
    if (view == 0) {
        rightSwap.textObject.text = "Inventory"
        cacheItem(rightSwap)
        buttonWidth = shopStage.width / 4
        buttonHeight = shopStage.height / 2
        itemButtons = []
        if (itemId !== undefined) {
            var i, list = itemList.filter(function(x) {
                return (x.stats[itemStats[itemId]] !== undefined)
            });
            for (i = 0; i < list.length; i++) {
                itemButtons[i] = new createjs.Container()
                itemButtons[i].width = buttonWidth
                itemButtons[i].height = buttonHeight
                if (i > 3) {
                    itemButtons[i].y = buttonHeight
                    itemButtons[i].x = buttonWidth * (i % 4)
                } else {
                    itemButtons[i].x = buttonWidth * i
                }
                itemButtons[i].object = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginLinearGradientFill(["#777", "#DDD", "#DDD", "#777"], [0, 0.2, 0.8, 1], 0, 0, 0, buttonHeight).drawRect(0, 0, buttonWidth, buttonHeight));
                itemButtons[i].item = list[i];
                itemButtons[i].addEventListener('click', function(event) {
                    updateInfoBar('item', event.currentTarget.item, true)
                })
                itemButtons[i].addChild(itemButtons[i].object)
                createTextObject(itemButtons[i], "text", list[i].name)
                cacheItem(itemButtons[i])
                shopStage.addChild(itemButtons[i])
            }
            itemButtons[i] = new createjs.Container()
            itemButtons[i].width = buttonWidth
            itemButtons[i].height = buttonHeight
            if (i > 3) {
                itemButtons[i].y = buttonHeight
                itemButtons[i].x = buttonWidth * (i % 4)
            } else {
                itemButtons[i].x = buttonWidth * i
            }
            itemButtons[i].object = new createjs.Shape(new createjs.Graphics().beginStroke().beginFill("purple").drawRect(0, 0, buttonWidth, buttonHeight));
            itemButtons[i].addEventListener('click', function() {
                updateRightBar(view);
            })
            itemButtons[i].addChild(itemButtons[i].object)
            createTextObject(itemButtons[i], "text", "BACK")
            cacheItem(itemButtons[i])
            shopStage.addChild(itemButtons[i])
        } else {
            for (var i = 0; i < itemStats.length; i++) {
                itemButtons[i] = new createjs.Container()
                itemButtons[i].width = buttonWidth
                itemButtons[i].height = buttonHeight
                if (i === 0) {
                    itemButtons[i].object = new createjs.Shape(new createjs.Graphics().beginFill("F00").drawRect(0, 0, buttonWidth, buttonHeight));
                } else if (i === 1) {
                    itemButtons[i].object = new createjs.Shape(new createjs.Graphics().beginFill("0F0").drawRect(0, 0, buttonWidth, buttonHeight));
                } else if (i === 2) {
                    itemButtons[i].object = new createjs.Shape(new createjs.Graphics().beginFill("00F").drawRect(0, 0, buttonWidth, buttonHeight));
                } else if (i === 3) {
                    itemButtons[i].object = new createjs.Shape(new createjs.Graphics().beginFill("F0F0F0").drawRect(0, 0, buttonWidth, buttonHeight));
                } else if (i === 4) {
                    itemButtons[i].object = new createjs.Shape(new createjs.Graphics().beginFill("0F0F0F").drawRect(0, 0, buttonWidth, buttonHeight));
                } else {
                    itemButtons[i].object = new createjs.Shape(new createjs.Graphics().beginFill("000").drawRect(0, 0, buttonWidth, buttonHeight));
                }
                itemButtons[i].object.value = i;
                if (i > 3) {
                    itemButtons[i].y = buttonHeight
                    itemButtons[i].x = buttonWidth * (i % 4)
                } else itemButtons[i].x = buttonWidth * i;
                itemButtons[i].object.addEventListener('click', function(event) {
                    updateRightBar(view, event.target.value);
                })
                itemButtons[i].addChild(itemButtons[i].object);
                createTextObject(itemButtons[i], "text", itemStats[i]);
                cacheItem(itemButtons[i])
                shopStage.addChild(itemButtons[i])
            }
        }
    }
    // View 1 is Inventory
    else if (view == 1) {
        rightSwap.textObject.text = "Shop"
        cacheItem(rightSwap)
        buttonWidth = shopStage.width / 4 //Calculate how much width we have for buttons
        buttonHeight = shopStage.height / 2 // Calculate the two levels for buttons
        inventoryButtons = [];
        if (activeHero.itemList.length === 0) {
            createTextObject(shopStage, "text", "Purchase Items in the Shop");
            return
        }
        for (var item in activeHero.itemList) {}
    }
}

function updateLeftBar(view) {
    monsterStage.removeAllChildren(); // Clear everything from this section
    // View 0 is Monsters
    if (view == 0) {
        leftSwap.textObject.text = "Spells"
        cacheItem(leftSwap)
        leftSwap.swapViewId = 0
        buttonWidth = monsterStage.width * 0.25
        buttonHeight = monsterStage.height * 0.5
        monsterButtons = []
        for (var unit in monsterList[activePlayer.summonLevel]) {
            var monster = monsterList[activePlayer.summonLevel][unit]
            monsterButtons[unit] = new createjs.Container();
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
            monsterButtons[unit].monsterId = unit;
            monsterButtons[unit].monster = monsterList[activePlayer.summonLevel][unit];
            monsterButtons[unit].button.scaleX = buttonWidth / monster.icon.width;
            monsterButtons[unit].button.scaleY = buttonHeight / monster.icon.height;
            monsterButtons[unit].goldCost = new createjs.Text(monster.cost, textSize + "px " + textFont, 'black');
            monsterButtons[unit].goldCost = new createjs.Text(monster.cost, "18px " + textFont, 'black')
            monsterButtons[unit].goldCost.x = buttonWidth - (monsterButtons[unit].goldCost.getMeasuredWidth() + textPadding)
            monsterButtons[unit].goldCost.y = textPadding
            monsterButtons[unit].goldCostBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("#FFF").drawRect(0, 0, buttonWidth - (monsterButtons[unit].goldCost.getMeasuredWidth() + textPadding), 50));
            monsterButtons[unit].addEventListener('click', function(event) {
                var unit = spawnUnit(event.currentTarget.monsterId)
                updateInfoBar('monster', unit)
            })
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
        leftSwap.swapViewId = 1
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
    contentManager.add("warrior", "http://localhost:8888/assets/game/warrior.png")
    contentManager.add("background", "http://localhost:8888/assets/game/background.png")
    contentManager.add("monster1", "http://localhost:8888/assets/game/monster1.png");
    contentManager.add("monsters", "http://localhost:8888/assets/game/monsters.png")
    contentManager.add("fireball", "http://localhost:8888/assets/game/fireball.png")
    contentManager.add("iceball", "http://localhost:8888/assets/game/iceball.png")
    contentManager.add("plus", "http://localhost:8888/assets/game/plus.png")
    contentManager.add("shop", "http://localhost:8888/assets/game/shop.png")
}

function imageLoadingDone(e) {
	console.log(e)
    gameOptions = {
        mode: 'solo',
        hero: 'warrior',
        spells: [new spellList['chainLightening'], new spellList['coneFire'], new spellList['damageOverTime'], new ultimateList['ultIceBall']]
    }
    createStage()
    console.log(renderer)
    // newGame(gameOptions)
    // renderer.canvas.oncontextmenu = function(e) {
    //     e.preventDefault();
    // };
    // playerBar.canvas.oncontextmenu = function(e) {
    //     e.preventDefault();
    // };
    ticker = new PIXI.ticker.Ticker();
    ticker.add(gameLoop, this);
    ticker.start()
    // createjs.Ticker.on("tick", gameLoop);
    // createjs.Ticker.setFPS(120);
    // document.onkeydown = handleKeyDown
    // playerStage.mouseMoveOutside = true;
    //playerStage.addEventListener("stagemouseup", handleClick);
    // miniMapStage.addEventListener("click", miniMapClick);
    // interactionManager = new PIXI.interaction.InteractionManager(renderer)
    // interactionManager.OnMouseMove = handleMouse
    renderer.view.onmousemove = handleMouse
    renderer.view.preventDefault = true
    // playerStage.onmousemove = handleMouse;
    // log = true
}


//This function will resize the render frame to match the screen
//This function will re-position the camera isn't of the game bounds.
function resize() {
	// renderer.resize(window.innerWidth, window.innerHeight)
    renderer.view.style.width = window.innerWidth + "px"
    renderer.view.style.height = window.innerHeight + "px"
    // if (gameStage.pivot.y + renderer.height > gameHeight) {
    //     gameStage.pivot.y = gameHeight - renderer.height
    // }
    // if (gameStage.pivot.y + renderer.height < 0) {
    //     gameStage.pivot.y = 0
    // }
    // if (gameStage.pivot.x + renderer.width > gameWidth) {
    //     gameStage.pivot.x = gameHeight - renderer.width
    // }
    // if (gameStage.pivot.x + renderer.width > gameWidth) {
    //     gameStage.pivot.x = gameWidth- renderer.width
    // }

}

window.onresize = function(event) {
    resize();
};

function init() {
	var rendererOptions = {
		antialiasing: false,
		transparent: false,
		resolution: window.devicePixelRatio,
		autoResize: true,
	}
    renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, rendererOptions);
    renderer.plugins.interaction.autoPreventDefault = true;
    renderer.view.style.position = "absolute";
	renderer.view.style.top = "0px";
	renderer.view.style.left = "0px";
	// renderer.view.style.border = "3px solid black";
	renderer.backgroundColor = 0x006600;
    document.body.appendChild(renderer.view);
    contentManager = new PIXI.loaders.Loader();
    loadImages()
    contentManager.once('complete', imageLoadingDone, this);
    contentManager.load();

}

function updatePlayerBar(event) {
    gameTime.textObject.text = msToTime(event.time);
    incomeTime.textObject.text = msToTime((activePlayer.hero.goldTime + 20000) - event.time);
    // createTextObject(goldStage, "content", activePlayer.hero.gold, 0.75)
    // createTextObject(incomeStage, "content", activePlayer.hero.income, 0.75)
    goldStage.contentObject.text = activePlayer.hero.gold
    incomeStage.contentObject.text = activePlayer.hero.income
    if (leftSwap.swapViewId == 1) {
        updateSpells(event)
    }
    refreshInfoBar(event);
    playerBar.update(event);
}

function gameLoop(event) {
    fpsText.text = 'FPS: ' + Math.round(ticker.FPS)
    // unitText.text = 'Units: ' + Object.keys(teamList[0].unitList).length
    edgeScrolling(event); //In handle.js
    // for (var team in teamList) { //We have to update each team
    //     for (var player in teamList[team].playerList) { //Check each player on that team
    //         teamList[team].playerList[player].hero.update(event) //Update the hero object for this player
    //     }
    //     for (var unit in teamList[team].unitList) {
    //         teamList[team].unitList[unit].update(event) //Update every unit spawned against this player
    //     }
    //     teamList[team].unitList = teamList[team].unitList.filter(function(x) { //Filter dead units from the player List
    //         return x.alive == true;
    //     })
    // }
    // for (var particle in particleList) {
    //     particleList[particle].update(event);
    // }
    // particleList = particleList.filter(function(x) { //Filter dead units from the player List
    //     return x.active == true;
    // })
    // updateCollisionTree(event) //in handle.js
    // updateStage(event);
    // updatePlayerBar(event);
    renderer.render(stage)
    
}

var server = eval(process.argv[2] === "true")
if (server === true) {
    var io = require('socket.io')
    var test = require('../vendor/node-easel.js')
    var createjs = require('../vendor/createjs.min.js')
    socket = io.listen(8000);
}