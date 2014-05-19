function updateInfoBar(type, object) {
	viewTarget = [type, object]
	informationStage.removeAllChildren();
	informationStage.addChild(informationStageObject);
	informationBar = new createjs.Container();
	iconWidth = informationStage.width * 0.3
	iconHeight = informationStage.height * 0.5
	spellWidth = (informationStage.width * 0.5) / 4
	spellHeight = informationStage.height * 0.25
	statWidth = informationStage.width / 4
	statHeight = (informationStage.height * 0.5) / 2
	switch (type) {
		case 'hero':
			informationBar.grid = []
			informationBar.grid[0] = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, iconWidth, iconHeight));
			informationBar.grid[1] = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, informationStage.width * 0.2, informationStage.height * 0.25));
			informationBar.grid[1].x = informationStage.width * 0.3
			informationBar.grid[2] = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, informationStage.width * 0.2, informationStage.height * 0.25));
			informationBar.grid[2].x = informationStage.width * 0.3
			informationBar.grid[2].y = informationStage.height * 0.25
			informationBar.grid[3] = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, informationStage.width * 0.5, informationStage.height * 0.25));
			informationBar.grid[3].x = informationStage.width * 0.5
			informationBar.grid[3].y = informationStage.height * 0.25
			object.icon.scaleX = iconWidth / object.icon.spriteSheet._frameWidth
			object.icon.scaleY = iconHeight / object.icon.spriteSheet._frameHeight
			object.icon.spriteSheet._regX = object.icon.getTransformedBounds().width / 2
			object.icon.spriteSheet._regY = object.icon.getTransformedBounds().height / 2
			object.icon.x = object.icon.spriteSheet._regX % (iconHeight)
			object.icon.y = object.icon.spriteSheet._regY % (iconWidth)
			informationBar.healthBar = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginFill("green").beginStroke("black").drawRect(0, 0, informationStage.width * 0.5, informationStage.height * 0.25))
			informationBar.healthBar.x = informationStage.width * 0.5
			informationBar.healthBarText = new createjs.Text(object.CHP + '/' + object.HP, textSize + "px " + textFont, 'white');
			informationBar.healthBarText.scaleX = ((informationStage.width * 0.5) / 2) / (informationBar.healthBarText.getMeasuredWidth())
			informationBar.healthBarText.scaleY = ((informationStage.height * 0.25) / 2) / (informationBar.healthBarText.getMeasuredHeight())
			informationBar.healthBarText.x = (informationStage.width * 0.5) + (informationBar.healthBarText.getTransformedBounds().width / 2)
			informationBar.healthBarText.y = (informationBar.healthBarText.getTransformedBounds().height / 2)
			informationBar.levelText = new createjs.Text(' Level ', textSize + "px " + textFont, 'white');
			informationBar.levelText.scaleX = (informationStage.width * 0.2) / informationBar.levelText.getMeasuredWidth()
			informationBar.levelText.scaleY = (informationStage.height * 0.2) / informationBar.levelText.getMeasuredHeight()
			informationBar.levelText.x = informationStage.width * 0.3
			informationBar.levelText.y = (informationStage.height * 0.25) - informationBar.levelText.getTransformedBounds().height
			informationBar.heroText = new createjs.Text(object.level, textSize + "px " + textFont, 'white');
			informationBar.heroText.scaleX = ((informationStage.width * 0.2) / 2) / informationBar.heroText.getMeasuredWidth()
			informationBar.heroText.scaleY = ((informationStage.height * 0.25)) / informationBar.heroText.getMeasuredHeight()
			informationBar.heroText.x = informationStage.width * 0.35
			informationBar.heroText.y = (informationStage.height * 0.25)
			informationBar.spellButtons = []
			for (var spell in object.spells) {
				spellObject = object.spells[spell]
				informationBar.spellButtons[spell] = new createjs.Container();
				informationBar.spellButtons[spell].icon = new createjs.Bitmap(contentManager.getResult(spellObject.icon)) //Add an image to the container. Based on monster icon
				informationBar.spellButtons[spell].iconBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, spellWidth, spellHeight));
				informationBar.spellButtons[spell].x = (informationStage.width * 0.5) + (spellWidth * spell)
				informationBar.spellButtons[spell].y = informationStage.height * 0.25
				informationBar.spellButtons[spell].icon.scaleX = spellWidth / informationBar.spellButtons[spell].icon.image.width //Scale the image down so it fits
				informationBar.spellButtons[spell].icon.scaleY = spellHeight / informationBar.spellButtons[spell].icon.image.height //Scale the image down so it fits
				informationBar.spellButtons[spell].addChild(informationBar.spellButtons[spell].icon)
				informationBar.spellButtons[spell].addChild(informationBar.spellButtons[spell].iconBorder)
				informationBar.addChild(informationBar.spellButtons[spell])
			}
			informationBar.statButtons = [];
			var count = 0
			var statPosition = (informationStage.height * 0.5)
			for (var stat in object.baseStats) {
				if (stat == 'HP') {
					stat = 'CMS'
				}
				informationBar.statButtons[stat] = new createjs.Container();
				informationBar.statButtons[stat].textObject = new createjs.Text(' ' + stat + " : " + object[stat] + ' ', textSize + "px " + textFont, 'white');
				informationBar.statButtons[stat].textBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, statWidth, statHeight));
				if (count > 3) {
					count = 0;
					statPosition = (informationStage.height * 0.75)
				}
				informationBar.statButtons[stat].x = statWidth * count
				informationBar.statButtons[stat].y = statPosition
				informationBar.statButtons[stat].textObject.scaleX = statWidth / informationBar.statButtons[stat].textObject.getMeasuredWidth() //Scale the image down so it fits
				informationBar.statButtons[stat].textObject.scaleY = statHeight / informationBar.statButtons[stat].textObject.getMeasuredHeight()
				informationBar.statButtons[stat].addChild(informationBar.statButtons[stat].textObject)
				informationBar.statButtons[stat].addChild(informationBar.statButtons[stat].textBorder)
				informationStage.addChild(informationBar.statButtons[stat])
				count++;
			}
			for (var gridID in informationBar.grid) {
				informationBar.addChild(informationBar.grid[gridID])
			}
			informationBar.addChild(object.icon)
			informationBar.addChild(informationBar.healthBar)
			informationBar.addChild(informationBar.healthBarText)
			informationBar.addChild(informationBar.levelText)
			informationBar.addChild(informationBar.heroText)
			informationStage.addChild(informationBar)
			return
		case 'monster':
			informationBar.grid = []
			informationBar.grid[0] = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, iconWidth, iconHeight));
			informationBar.grid[1] = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, informationStage.width * 0.2, informationStage.height * 0.25));
			informationBar.grid[1].x = informationStage.width * 0.3
			informationBar.grid[2] = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, informationStage.width * 0.2, informationStage.height * 0.25));
			informationBar.grid[2].x = informationStage.width * 0.3
			informationBar.grid[2].y = informationStage.height * 0.25
			informationBar.grid[3] = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, informationStage.width * 0.5, informationStage.height * 0.25));
			informationBar.grid[3].x = informationStage.width * 0.5
			informationBar.grid[3].y = informationStage.height * 0.25
			object.icon.scaleX = iconWidth / object.icon.sourceRect.width
			object.icon.scaleY = iconHeight / object.icon.sourceRect.height
			object.icon.x = 0
			object.icon.y = 0
			informationBar.healthBar = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginFill("green").beginStroke("black").drawRect(0, 0, informationStage.width * 0.5, informationStage.height * 0.25))
			informationBar.healthBar.x = informationStage.width * 0.5
			informationBar.healthBarText = new createjs.Text(object.CHP + '/' + object.HP, textSize + "px " + textFont, 'white');
			informationBar.healthBarText.scaleX = ((informationStage.width * 0.5) / 2) / (informationBar.healthBarText.getMeasuredWidth())
			informationBar.healthBarText.scaleY = ((informationStage.height * 0.25) / 2) / (informationBar.healthBarText.getMeasuredHeight())
			informationBar.healthBarText.x = (informationStage.width * 0.5) + (informationBar.healthBarText.getTransformedBounds().width / 2)
			informationBar.healthBarText.y = (informationBar.healthBarText.getTransformedBounds().height / 2)
			informationBar.costText = new createjs.Text(' Cost ', textSize + "px " + textFont, 'white');
			informationBar.costText.scaleX = (informationStage.width * 0.2) / informationBar.costText.getMeasuredWidth()
			informationBar.costText.scaleY = (informationStage.height * 0.2) / informationBar.costText.getMeasuredHeight()
			informationBar.costText.x = informationStage.width * 0.3
			informationBar.costText.y = (informationStage.height * 0.25) - informationBar.costText.getTransformedBounds().height
			informationBar.monsterText = new createjs.Text(object.cost, textSize + "px " + textFont, 'white');
			informationBar.monsterText.scaleX = ((informationStage.width * 0.2) / 2) / informationBar.monsterText.getMeasuredWidth()
			informationBar.monsterText.scaleY = ((informationStage.height * 0.25)) / informationBar.monsterText.getMeasuredHeight()
			informationBar.monsterText.x = informationStage.width * 0.35
			informationBar.monsterText.y = (informationStage.height * 0.25)
			informationBar.spellButtons = []
			if (object.spells) {
				for (var spell in object.spells) {
					spellObject = object.spells[spell]
					informationBar.spellButtons[spell] = new createjs.Container();
					informationBar.spellButtons[spell].icon = new createjs.Bitmap(contentManager.getResult(spellObject.icon)) //Add an image to the container. Based on monster icon
					informationBar.spellButtons[spell].iconBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, spellWidth, spellHeight));
					informationBar.spellButtons[spell].x = (informationStage.width * 0.5) + (spellWidth * spell)
					informationBar.spellButtons[spell].y = informationStage.height * 0.25
					informationBar.spellButtons[spell].icon.scaleX = spellWidth / informationBar.spellButtons[spell].icon.image.width //Scale the image down so it fits
					informationBar.spellButtons[spell].icon.scaleY = spellHeight / informationBar.spellButtons[spell].icon.image.height //Scale the image down so it fits
					informationBar.spellButtons[spell].addChild(informationBar.spellButtons[spell].icon)
					informationBar.spellButtons[spell].addChild(informationBar.spellButtons[spell].iconBorder)
					informationBar.addChild(informationBar.spellButtons[spell])
				}
			} else {
				informationBar.spellText = new createjs.Text(' This poor guy has no spells ', textSize + "px " + textFont, 'white');
				informationBar.spellText.x = (informationStage.width * 0.5)
				informationBar.spellText.y = informationStage.height * 0.25
				informationBar.spellText.scaleX = (informationStage.width * 0.5) / informationBar.spellText.getMeasuredWidth() //Scale the image down so it fits
				informationBar.spellText.scaleY = (informationStage.height * 0.25) / informationBar.spellText.getMeasuredHeight() //Scale the image down so it fits
				informationBar.addChild(informationBar.spellText)
			}
			informationBar.statButtons = [];
			var count = 0
			var statPosition = (informationStage.height * 0.5)
			for (var stat in object.baseStats) {
				if (stat == 'HP') {
					stat = 'CMS'
				}
				informationBar.statButtons[stat] = new createjs.Container();
				informationBar.statButtons[stat].textObject = new createjs.Text(' ' + stat + " : " + object[stat] + ' ', textSize + "px " + textFont, 'white');
				informationBar.statButtons[stat].textBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, statWidth, statHeight));
				if (count > 3) {
					count = 0;
					statPosition = (informationStage.height * 0.75)
				}
				informationBar.statButtons[stat].x = statWidth * count
				informationBar.statButtons[stat].y = statPosition
				informationBar.statButtons[stat].textObject.scaleX = statWidth / informationBar.statButtons[stat].textObject.getMeasuredWidth() //Scale the image down so it fits
				informationBar.statButtons[stat].textObject.scaleY = statHeight / informationBar.statButtons[stat].textObject.getMeasuredHeight()
				informationBar.statButtons[stat].addChild(informationBar.statButtons[stat].textObject)
				informationBar.statButtons[stat].addChild(informationBar.statButtons[stat].textBorder)
				informationStage.addChild(informationBar.statButtons[stat])
				count++;
			}

			for (var gridID in informationBar.grid) {
				informationBar.addChild(informationBar.grid[gridID])
			}
			informationBar.addChild(object.icon)
			informationBar.addChild(informationBar.healthBar)
			informationBar.addChild(informationBar.healthBarText)
			informationBar.addChild(informationBar.costText)
			informationBar.addChild(informationBar.monsterText)
			informationStage.addChild(informationBar)
			return
		case 'item':
			informationBar.grid = []
			informationBar.grid[0] = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, iconWidth, iconHeight));
			informationBar.grid[1] = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, informationStage.width * 0.2, informationStage.height * 0.25));
			informationBar.grid[1].x = informationStage.width * 0.3
			informationBar.grid[2] = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, informationStage.width * 0.2, informationStage.height * 0.25));
			informationBar.grid[2].x = informationStage.width * 0.3
			informationBar.grid[2].y = informationStage.height * 0.25
			informationBar.grid[3] = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, informationStage.width * 0.5, informationStage.height * 0.25));
			informationBar.grid[3].x = informationStage.width * 0.5
			informationBar.grid[3].y = informationStage.height * 0.25
			informationBar.icon = new createjs.Bitmap(contentManager.getResult(object.icon.base)) //Add an image to the container. Based on item icon
			informationBar.icon.sourceRect = new createjs.Rectangle(object.icon.left, object.icon.top, object.icon.height, object.icon.width)
			informationBar.icon.scaleX = iconWidth / informationBar.icon.sourceRect.width
			informationBar.icon.scaleY = iconHeight / informationBar.icon.sourceRect.height
			informationBar.icon.x = 0
			informationBar.icon.y = 0
			informationBar.itemName = new createjs.Text(object.name, textSize + "px " + textFont, 'white');
			informationBar.itemName.scaleX = ((informationStage.width * 0.5)) / (informationBar.itemName.getMeasuredWidth())
			informationBar.itemName.scaleY = ((informationStage.height * 0.25)) / (informationBar.itemName.getMeasuredHeight())
			informationBar.itemName.x = (informationStage.width * 0.5)
			informationBar.costText = new createjs.Text(' Cost ', textSize + "px " + textFont, 'white');
			informationBar.costText.scaleX = (informationStage.width * 0.2) / informationBar.costText.getMeasuredWidth()
			informationBar.costText.scaleY = (informationStage.height * 0.2) / informationBar.costText.getMeasuredHeight()
			informationBar.costText.x = informationStage.width * 0.3
			informationBar.costText.y = (informationStage.height * 0.25) - informationBar.costText.getTransformedBounds().height
			informationBar.itemText = new createjs.Text(object.cost, textSize + "px " + textFont, 'white');
			informationBar.itemText.scaleX = ((informationStage.width * 0.2) / 2) / informationBar.itemText.getMeasuredWidth()
			informationBar.itemText.scaleY = ((informationStage.height * 0.25)) / informationBar.itemText.getMeasuredHeight()
			informationBar.itemText.x = informationStage.width * 0.35
			informationBar.itemText.y = (informationStage.height * 0.25)
			informationBar.buyButton = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("green").drawRect(0, 0, ((informationStage.width * 0.5 / 2)), informationStage.height * 0.25));
			informationBar.buyButton.x = informationStage.width * 0.5
			informationBar.buyButton.y = (informationStage.height * 0.25)
			informationBar.buyButton.itemId = itemList.indexOf(object)
			informationBar.buyButton.addEventListener('click', itemClick)
			informationBar.buyText = new createjs.Text(' BUY ', textSize + "px " + textFont, 'white');
			informationBar.buyText.scaleX = ((informationStage.width * 0.25) / 2) / informationBar.buyText.getMeasuredWidth()
			informationBar.buyText.scaleY = ((informationStage.height * 0.25)) / informationBar.buyText.getMeasuredHeight()
			informationBar.buyText.x = informationStage.width * 0.5 + (informationBar.buyText.getTransformedBounds().width / 2)
			informationBar.buyText.y = (informationStage.height * 0.25)
			informationBar.sellButton = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("red").drawRect(0, 0, ((informationStage.width * 0.5 / 2)), informationStage.height * 0.25));
			informationBar.sellButton.x = informationStage.width * 0.5 + informationStage.width * 0.25
			informationBar.sellButton.y = (informationStage.height * 0.25)
			informationBar.sellButton.itemId = itemList.indexOf(object)
			informationBar.sellButton.addEventListener('click', itemClick)
			informationBar.sellText = new createjs.Text(' SELL ', textSize + "px " + textFont, 'white');
			informationBar.sellText.scaleX = ((informationStage.width * 0.25) / 2) / informationBar.sellText.getMeasuredWidth()
			informationBar.sellText.scaleY = ((informationStage.height * 0.25)) / informationBar.sellText.getMeasuredHeight()
			informationBar.sellText.x = informationStage.width * 0.75 + (informationBar.sellText.getTransformedBounds().width / 2)
			informationBar.sellText.y = (informationStage.height * 0.25)
			informationBar.statButtons = [];
			var count = 0
			var statPosition = (informationStage.height * 0.5)
			// console.log(Object.keys(object.stats).length)
			// if (Object.keys(object.stats).length > 4) {
			// 	statWidth = informationStage.width / 4
			// 	statHeight = (informationStage.height * 0.5) / 2
			// } else {
			// 	statWidth = informationStage.width / Object.keys(object.stats).length
			// }
			for (var stat in object.stats) {
				if (stat == 'HP') {
					stat = 'CMS'
				}
				informationBar.statButtons[stat] = new createjs.Container();
				informationBar.statButtons[stat].textObject = new createjs.Text(' ' + stat + " : " + object.stats[stat] + ' ', textSize + "px " + textFont, 'white');
				informationBar.statButtons[stat].textBorder = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, statWidth, statHeight));
				if (count > 3) {
					count = 0;
					statPosition = (informationStage.height * 0.75)
				}
				informationBar.statButtons[stat].x = statWidth * count
				informationBar.statButtons[stat].y = statPosition
				informationBar.statButtons[stat].textObject.scaleX = statWidth / informationBar.statButtons[stat].textObject.getMeasuredWidth() //Scale the image down so it fits
				informationBar.statButtons[stat].textObject.scaleY = statHeight / informationBar.statButtons[stat].textObject.getMeasuredHeight()
				informationBar.statButtons[stat].addChild(informationBar.statButtons[stat].textObject)
				informationBar.statButtons[stat].addChild(informationBar.statButtons[stat].textBorder)
				informationStage.addChild(informationBar.statButtons[stat])
				count++;
			}

			for (var gridID in informationBar.grid) {
				informationBar.addChild(informationBar.grid[gridID])
			}
			informationBar.addChild(informationBar.icon)
			informationBar.addChild(informationBar.buyButton)
			informationBar.addChild(informationBar.buyText)
			informationBar.addChild(informationBar.sellButton)
			informationBar.addChild(informationBar.sellText)
			informationBar.addChild(informationBar.itemName)
			informationBar.addChild(informationBar.costText)
			informationBar.addChild(informationBar.itemText)
			informationStage.addChild(informationBar)
			return
	}
}

function refreshInfoBar(event) {
	switch (viewTarget[0]) {
		case 'hero':
			var hero = viewTarget[1]
			informationBar.healthBar.graphics.clear().setStrokeStyle(1).beginFill("green").beginStroke("black").drawRect(0, 0, (hero.CHP / hero.HP) * (informationStage.width * 0.5), informationStage.height * 0.25)
			informationBar.healthBarText.text = Math.round(hero.CHP) + '/' + Math.round(hero.HP)
			informationBar.heroText.text = hero.level
			informationBar.heroText.scaleX = ((informationStage.width * 0.2) / 2) / informationBar.heroText.getMeasuredWidth()
			informationBar.heroText.scaleY = ((informationStage.height * 0.25)) / informationBar.heroText.getMeasuredHeight()
			for (var stat in hero.baseStats) {
				if (stat == 'HP') {
					stat = 'CMS'
				}
				informationBar.statButtons[stat].textObject.text = ' ' + stat + " : " + hero[stat] + ' '
				informationBar.statButtons[stat].textObject.scaleX = statWidth / informationBar.statButtons[stat].textObject.getMeasuredWidth() //Scale the image down so it fits
				informationBar.statButtons[stat].textObject.scaleY = statHeight / informationBar.statButtons[stat].textObject.getMeasuredHeight()
			}
		case 'monster':
			var monster = viewTarget[1]
			if (monster.alive == false) {
				informationBar.healthBar.graphics.clear().setStrokeStyle(1).beginStroke("black").beginFill("green").drawRect(0, 0, 0, informationStage.height * 0.25)
				informationBar.healthBarText.text = 'Dead'
			} else {
				informationBar.healthBar.graphics.clear().beginFill("green").drawRect(0, 0, (monster.CHP / monster.HP) * (informationStage.width * 0.5), informationStage.height * 0.25)
				informationBar.healthBarText.text = Math.round(monster.CHP) + '/' + Math.round(monster.HP)
			}

			return
		case 'item':
			//item stuff here
			return
	}
}