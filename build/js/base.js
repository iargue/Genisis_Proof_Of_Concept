var stage, 
    gameStage,
    unitList = [],
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

var font = {
    sizeS: '12px',
    sizeM: '18px',
    sizeL: '24px',
    family: 'Arial'
}

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

function createStage() {
    stage = new PIXI.Container();

    gameStage = new PIXI.Container();

    var border = new PIXI.Graphics().lineStyle(10, 0xdc143c).drawRect(5, 5, gameWidth - 10, gameHeight - 10).endFill();
    gameStage.addChild(border);

    var playerSplit = new PIXI.Graphics().lineStyle(1, 0x000000, 1).beginFill(0x000000).drawRect(0,  gameHeight / 2 - 3, gameWidth, 6).endFill();
    gameStage.addChild(playerSplit);

    collisionTree = QUAD.init({x: 0, y: 0, w: gameWidth, h: gameHeight});

    fpsText = new PIXI.Text('0', {font: textSize + "px " + textFont, fill : '0x000000'});
    fpsText.x = 10;
    fpsText.y = 6;
    stage.addChild(fpsText);

    var unitText = new PIXI.Text('0', {font: textSize + "px " + textFont, fill : '0x000000'});
    unitText.x = 10;
    unitText.y = fpsText.height + 16;
	stage.addChild(unitText);

    var playerBar = new PIXI.Container();
    playerBar.y = renderer.height - (renderer.height * 0.2);
    playerBar.width = renderer.width;
    playerBar.height = renderer.height * 0.2;
    playerBar.object = new PIXI.Graphics().beginFill("0x111").drawRect(0, 0, playerBar._width, playerBar._height);
    playerBar.addChild(playerBar.object);

    // * Replaced with HTML * //

    // var leftSwap = new PIXI.Container();
    // leftSwap.object = new PIXI.Graphics().beginFill("0x111111").drawRect(0, 0, 
    //     playerBar._width * 0.1,
    //     playerBar._height * 0.2
    // );
    // leftSwap.addChild(leftSwap.object);
    // playerBar.addChild(leftSwap);

    // var leftTeamBar = new PIXI.Container();
    // leftTeamBar.position = new PIXI.Point(playerBar._width * 0.1, 0);
    // leftTeamBar.object = new PIXI.Graphics().beginFill("0x222222").drawRect(0, 0,
    //     playerBar._width * 0.2,
    //     playerBar._height * 0.2
    // );
    // leftTeamBar.addChild(leftTeamBar.object);
    // playerBar.addChild(leftTeamBar);

    // var incomeStage = new PIXI.Container();
    // incomeStage.position = new PIXI.Point(playerBar._width * 0.3, 0);
    // incomeStage.object = new PIXI.Graphics().beginFill("0x333333").drawRect(0, 0,
    //     playerBar._width * 0.1,
    //     playerBar._height * 0.2
    // );
    // incomeStage.addChild(incomeStage.object);
    // playerBar.addChild(incomeStage);

    // var incomeTime = new PIXI.Container();
    // incomeTime.position = new PIXI.Point(playerBar._width * 0.4, 0);
    // incomeTime.object = new PIXI.Graphics().beginFill("0x444444").drawRect(0, 0,
    //     playerBar._width * 0.1,
    //     playerBar._height * 0.2
    // );
    // incomeTime.addChild(incomeTime.object);
    // incomeTime.textObject = new PIXI.Text('00:00:00', {
    //     font: font.sizeM + ' ' + font.family,
    //     fill: '#000000',
    //     align: 'center'
    // });
    // incomeTime.addChild(incomeTime.textObject);
    // playerBar.addChild(incomeTime);

    // var gameTime = new PIXI.Container();
    // gameTime.position = new PIXI.Point(playerBar._width * 0.5, 0);
    // gameTime.object = new PIXI.Graphics().beginFill("0x555555").drawRect(0, 0,
    //     playerBar._width * 0.1,
    //     playerBar._height * 0.2
    // );
    // gameTime.addChild(gameTime.object);
    // gameTime.textObject = new PIXI.Text('00:00:00', {
    //     font: font.sizeM + ' ' + font.family,
    //     fill: '#000000',
    //     align: 'center'
    // });
    // gameTime.addChild(gameTime.textObject);
    // playerBar.addChild(gameTime);

    // var goldStage = new PIXI.Container();
    // goldStage.position = new PIXI.Point(playerBar._width * 0.6, 0);
    // goldStage.object = new PIXI.Graphics().beginFill("0x666666").drawRect(0, 0,
    //     playerBar._width * 0.1,
    //     playerBar._height * 0.2
    // );
    // goldStage.addChild(goldStage.object);
    // playerBar.addChild(goldStage);

    // var rightTeamBar = new PIXI.Container();
    // rightTeamBar.position = new PIXI.Point(playerBar._width * 0.7, 0);
    // rightTeamBar.object = new PIXI.Graphics().beginFill("0x777777").drawRect(0, 0,
    //     playerBar._width * 0.2,
    //     playerBar._height * 0.2
    // );
    // rightTeamBar.addChild(rightTeamBar.object);
    // playerBar.addChild(rightTeamBar);

    // var rightSwap = new PIXI.Container();
    // rightSwap.position = new PIXI.Point(playerBar._width * 0.9, 0);
    // rightSwap.object = new PIXI.Graphics().beginFill("0x888888").drawRect(0, 0,
    //     playerBar._width * 0.1,
    //     playerBar._height * 0.2
    // );
    // rightSwap.addChild(rightSwap.object);
    // playerBar.addChild(rightSwap);

    // * End Replaced with HTML * //



    stage.addChild(gameStage);
    stage.addChild(playerBar);
    // createTextObject(gameTime, "text", "00:00:00", 0.5);
    // gameTime.addChild(gameTime.textObject);
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

    //Capture mousemovement events for canvas
    renderer.view.onmousemove = handleMouse
    //Capture move leaving events for canvas
    renderer.view.onmouseout = handleMouse
    //Prevent right clicks... not working yet???
    renderer.view.preventDefault = true

    resize()
}


//This function will resize the render frame to match the screen
//This function will re-position the camera isn't of the game bounds.
function resize() {
    renderer.view.style.width = window.innerWidth + "px"
    renderer.view.style.height = window.innerHeight + "px"
    // renderer.resize(window.innerWidth, window.innerHeight)
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
    var gameCanvas = document.getElementById("gameCanvas");
    renderer = new PIXI.autoDetectRenderer(window.screen.width, window.screen.height, {
        view: gameCanvas
    });
    renderer.plugins.interaction.autoPreventDefault = true;
    renderer.view.style.position = "absolute";
	renderer.view.style.top = "0px";
	renderer.view.style.left = "0px";
	renderer.backgroundColor = 0x006600;
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