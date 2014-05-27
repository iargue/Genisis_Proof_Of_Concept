function setupInfoBar(){
	informationStage.bar = new createjs.Container();
	informationStage.bar.grid = []
	// Hero Icon
	informationStage.bar.grid[0] = new createjs.Container();
	informationStage.bar.grid[0].width = informationStage.width * 0.3
	informationStage.bar.grid[0].height = informationStage.height * 0.5
	// Hero Level Label
	informationStage.bar.grid[1] = new createjs.Container();
	informationStage.bar.grid[1].x = informationStage.width * 0.3
	informationStage.bar.grid[1].width = informationStage.width * 0.35
	informationStage.bar.grid[1].height = informationStage.height * 0.25
	// Hero Health
	informationStage.bar.grid[2] = new createjs.Container();
	informationStage.bar.grid[2].x = informationStage.width * 0.65
	informationStage.bar.grid[2].width = informationStage.width * 0.35
	informationStage.bar.grid[2].height = informationStage.height * 0.25
	// Hero Level
	informationStage.bar.grid[3] = new createjs.Container();
	informationStage.bar.grid[3].x = informationStage.width * 0.3
	informationStage.bar.grid[3].y = informationStage.height * 0.25
	informationStage.bar.grid[3].width = informationStage.width * 0.2
	informationStage.bar.grid[3].height = informationStage.height * 0.25
	// Hero Skills
	for(var i = 0; i < 4; i++){
		informationStage.bar.grid[i+4] = new createjs.Container();
		informationStage.bar.grid[i+4].x = ((i % 4) * informationStage.width * 0.125) + (informationStage.width * 0.5)
		informationStage.bar.grid[i+4].y = informationStage.height * 0.25
		informationStage.bar.grid[i+4].width = informationStage.width * 0.125
		informationStage.bar.grid[i+4].height = informationStage.height * 0.25
	}
	// Hero Stats
	for(var i = 0; i < 8; i++){
		informationStage.bar.grid[i+8] = new createjs.Container();
		informationStage.bar.grid[i+8].x = (i % 4) * informationStage.width * 0.25
		informationStage.bar.grid[i+8].y = (Math.floor(i / 4) * informationStage.height * 0.25) + (informationStage.height * 0.5)
		informationStage.bar.grid[i+8].width = informationStage.width * 0.25
		informationStage.bar.grid[i+8].height = informationStage.height * 0.25
	}
}

function updateInfoBar(type, object) {
	viewTarget = [type, object]
	informationStage.removeAllChildren();
	for(var i = 0; i < informationStage.bar.grid.length; i++){
		informationStage.bar.grid[i].removeAllChildren();
	}
	//informationStage.addChild(informationStage.object);
	// TO Delete
	iconWidth = informationStage.width * 0.3
	iconHeight = informationStage.height * 0.5
	spellWidth = (informationStage.width * 0.5) / 4
	spellHeight = informationStage.height * 0.25
	statWidth = informationStage.width / 4
	statHeight = (informationStage.height * 0.5) / 2
	//
	switch (type) {
		case 'hero':
			// Hero Icon
			object.icon.scaleX = informationStage.bar.grid[0].width / object.icon.spriteSheet._frameWidth
			object.icon.scaleY = informationStage.bar.grid[0].height / object.icon.spriteSheet._frameHeight
			object.icon.spriteSheet._regX = object.icon.getTransformedBounds().width / 2
			object.icon.spriteSheet._regY = object.icon.getTransformedBounds().height / 2
			object.icon.x = object.icon.spriteSheet._regX % informationStage.bar.grid[0].width
			object.icon.y = object.icon.spriteSheet._regY % informationStage.bar.grid[0].height
			informationStage.bar.grid[0].object = new createjs.Shape(new createjs.Graphics().beginStroke("#222").beginFill("white").drawRect(0, 0, informationStage.bar.grid[0].width, informationStage.bar.grid[0].height));
			informationStage.bar.grid[0].addChild(informationStage.bar.grid[0].object);
			informationStage.bar.grid[0].addChild(object.icon);
			// Hero Experience
			informationStage.bar.grid[1].object = new createjs.Shape(new createjs.Graphics().beginStroke("#000").beginLinearGradientFill(["#007", "#005", "#005", "#007"], [0, 0.25, 0.75, 1], 0, 0, 0, informationStage.bar.grid[1].height).drawRect(0, 0, informationStage.bar.grid[1].width, informationStage.bar.grid[1].height));
			createTextObject(informationStage.bar.grid[1], "text", object.experience + "/" + object.experienceToLevel, 0.75, 12);
			informationStage.bar.grid[1].addChild(informationStage.bar.grid[1].object)
			informationStage.bar.grid[1].addChild(informationStage.bar.grid[1].textObject)
			// Hero Health
			informationStage.bar.grid[2].object = new createjs.Shape(new createjs.Graphics().beginStroke("#000").beginLinearGradientFill(["#070", "#050", "#050", "#070"], [0, 0.25, 0.75, 1], 0, 0, 0, informationStage.bar.grid[2].height).drawRect(0, 0, informationStage.bar.grid[2].width, informationStage.bar.grid[2].height));
			createTextObject(informationStage.bar.grid[2], "text", object.CHP + "/" + object.HP, 0.75);
			informationStage.bar.grid[2].addChild(informationStage.bar.grid[2].object);
			informationStage.bar.grid[2].addChild(informationStage.bar.grid[2].textObject);
			// Hero Level
			informationStage.bar.grid[3].object = new createjs.Shape(new createjs.Graphics().beginStroke("#000").drawRect(0, 0, informationStage.bar.grid[3].width, informationStage.bar.grid[3].height));
			createTextObject(informationStage.bar.grid[3], "label", "Level", 0.6, 0, "#EFC94C")
			createTextObject(informationStage.bar.grid[3], "content", "" + object.level, 0.5)
			informationStage.bar.grid[3].addChild(informationStage.bar.grid[3].object);
			informationStage.bar.grid[3].addChild(informationStage.bar.grid[3].labelObject)
			informationStage.bar.grid[3].addChild(informationStage.bar.grid[3].contentObject)
			// Hero Spells
			for(var i = 0; i < object.spells.length; i++){
				informationStage.bar.grid[i+4].object = new createjs.Shape(new createjs.Graphics().beginStroke("#000").drawRect(0, 0, informationStage.bar.grid[i+4].width, informationStage.bar.grid[i+4].height));
				spellObject = object.spells[i];
				informationStage.bar.grid[i+4].iconObject = new createjs.Bitmap(contentManager.getResult(spellObject.icon));
				informationStage.bar.grid[i+4].iconObject.scaleX = informationStage.bar.grid[i+4].width / informationStage.bar.grid[i+4].iconObject.image.width;
				informationStage.bar.grid[i+4].iconObject.scaleY = informationStage.bar.grid[i+4].height / informationStage.bar.grid[i+4].iconObject.image.height;
				informationStage.bar.grid[i+4].addChild(informationStage.bar.grid[i+4].object);
				informationStage.bar.grid[i+4].addChild(informationStage.bar.grid[i+4].iconObject);
			}
			// Hero Stats
			var i = 0;
			for(var stat in object.baseStats){
				createTextObject(informationStage.bar.grid[i+8], "text", stat + " : " + object[stat], 0.75);
				informationStage.bar.grid[i+8].addChild(informationStage.bar.grid[i+8].textObject);
				i++;
			}
			// Add containers to InformationStage
			for(var item in informationStage.bar.grid){
				informationStage.bar.addChild(informationStage.bar.grid[item]);
			}
			informationStage.addChild(informationStage.bar)
			return
		case 'monster':
			// Monster Icon
			object.icon.scaleX = informationStage.bar.grid[0].width / object.icon.sourceRect.width
			object.icon.scaleY = informationStage.bar.grid[0].height / object.icon.sourceRect.height
			object.icon.x = 0
			object.icon.y = 0
			informationStage.bar.grid[0].object = new createjs.Shape(new createjs.Graphics().beginStroke("#222").beginFill("white").drawRect(0, 0, informationStage.bar.grid[0].width, informationStage.bar.grid[0].height));
			informationStage.bar.grid[0].addChild(informationStage.bar.grid[0].object);
			informationStage.bar.grid[0].addChild(object.icon);
			// Monster Cost Label
			createTextObject(informationStage.bar.grid[1], "label", "Cost", 0.6, 0, "#EFC94C");
			createTextObject(informationStage.bar.grid[1], "content", object.cost, 0.5, 0);
			informationStage.bar.grid[1].addChild(informationStage.bar.grid[1].labelObject);
			informationStage.bar.grid[1].addChild(informationStage.bar.grid[1].contentObject);
			// Monster Health
			informationStage.bar.grid[2].object = new createjs.Shape(new createjs.Graphics().beginStroke("#000").beginFill("#070").drawRect(0, 0, informationStage.bar.grid[2].width, informationStage.bar.grid[2].height));
			createTextObject(informationStage.bar.grid[2], "text", object.CHP + "/" + object.HP, 0.5, 0);
			informationStage.bar.grid[2].addChild(informationStage.bar.grid[2].object);
			informationStage.bar.grid[2].addChild(informationStage.bar.grid[2].textObject);
			// Monster Cost 
			createTextObject(informationStage.bar.grid[3], "text", "" + object.cost, 0.75);
			informationStage.bar.grid[3].addChild(informationStage.bar.grid[3].textObject)
			// Monster Stats
			for(var i = 0; i < object.spells.length; i++){
				informationStage.bar.grid[i+4].borderObject = new createjs.Shape(new createjs.Graphics().beginStroke("#000").drawRect(0, 0, informationStage.bar.grid[i+4].width, informationStage.bar.grid[i+4].height));
				spellObject = object.spells[i];
				informationStage.bar.grid[i+4].iconObject = new createjs.Bitmap(contentManager.getResult(spellObject.icon));
				informationStage.bar.grid[i+4].iconObject.scaleX = informationStage.bar.grid[i+4].width / informationStage.bar.grid[i+4].iconObject.image.width;
				informationStage.bar.grid[i+4].iconObject.scaleY = informationStage.bar.grid[i+4].height / informationStage.bar.grid[i+4].iconObject.image.height;
				informationStage.bar.grid[i+4].addChild(informationStage.bar.grid[i+4].borderObject)
				informationStage.bar.grid[i+4].addChild(informationStage.bar.grid[i+4].iconObject);
			}
			// Monster Stats
			var i = 0;
			for(var stat in object.baseStats){
				createTextObject(informationStage.bar.grid[i+8], "text", stat + " : " + object[stat], 0.75);
				informationStage.bar.grid[i+8].addChild(informationStage.bar.grid[i+8].textObject);
				i++;
			}
			for(var item in informationStage.bar.grid){
				informationStage.bar.addChild(informationStage.bar.grid[item]);
			}
			informationStage.addChild(informationStage.bar)
			return
		case 'item':
			console.log(object)
			// Item Icon 
			object.icon.scaleX = informationStage.bar.grid[0].width / object.icon.sourceRect.width
			object.icon.scaleY = informationStage.bar.grid[0].height / object.icon.sourceRect.height
			object.icon.x = 0
			object.icon.y = 0
			informationStage.bar.grid[0].object = new createjs.Shape(new createjs.Graphics().beginStroke("#222").beginFill("white").drawRect(0, 0, informationStage.bar.grid[0].width, informationStage.bar.grid[0].height));
			informationStage.bar.grid[0].addChild(informationStage.bar.grid[0].object);
			informationStage.bar.grid[0].addChild(object.icon);
			// Item Buy 
			informationStage.bar.grid[1].object = new createjs.Shape(new createjs.Graphics().beginStroke("#000").beginFill("#070").drawRect(0, 0, informationStage.bar.grid[1].width, informationStage.bar.grid[1].height));
			createTextObject(informationStage.bar.grid[1], "text", "Buy", 0.75, 0);
			informationStage.bar.grid[1].addChild(informationStage.bar.grid[1].object)
			informationStage.bar.grid[1].addChild(informationStage.bar.grid[1].textObject)
			// Item Name
			createTextObject(informationStage.bar.grid[2], "text", "" + object.name, 0.75);
			informationStage.bar.grid[2].addChild(informationStage.bar.grid[2].textObject)
			// Item Sell 
			informationStage.bar.grid[3].object = new createjs.Shape(new createjs.Graphics().beginStroke("#000").beginFill("#700").drawRect(0, 0, informationStage.bar.grid[3].width, informationStage.bar.grid[3].height));
			createTextObject(informationStage.bar.grid[3], "text", "Buy", 0.75, 0);
			informationStage.bar.grid[3].addChild(informationStage.bar.grid[3].object)
			informationStage.bar.grid[3].addChild(informationStage.bar.grid[3].textObject)	
			// informationStage.bar.grid = []
			// informationStage.bar.grid[0] = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, iconWidth, iconHeight));
			// informationStage.bar.grid[1] = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, informationStage.width * 0.2, informationStage.height * 0.25));
			// informationStage.bar.grid[1].x = informationStage.width * 0.3
			// informationStage.bar.grid[2] = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, informationStage.width * 0.2, informationStage.height * 0.25));
			// informationStage.bar.grid[2].x = informationStage.width * 0.3
			// informationStage.bar.grid[2].y = informationStage.height * 0.25
			// informationStage.bar.grid[3] = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(0, 0, informationStage.width * 0.5, informationStage.height * 0.25));
			// informationStage.bar.grid[3].x = informationStage.width * 0.5
			// informationStage.bar.grid[3].y = informationStage.height * 0.25
			// informationStage.bar.icon = new createjs.Bitmap(contentManager.getResult(object.icon.base)) //Add an image to the container. Based on item icon
			// informationStage.bar.icon.sourceRect = new createjs.Rectangle(object.icon.left, object.icon.top, object.icon.height, object.icon.width)
			// informationStage.bar.icon.scaleX = iconWidth / informationStage.bar.icon.sourceRect.width
			// informationStage.bar.icon.scaleY = iconHeight / informationStage.bar.icon.sourceRect.height
			// informationStage.bar.icon.x = 0
			// informationStage.bar.icon.y = 0
			// informationStage.bar.itemName = new createjs.Text(object.name, textSize + "px " + textFont, 'white');
			// informationStage.bar.itemName.scaleX = ((informationStage.width * 0.5)) / (informationStage.bar.itemName.getMeasuredWidth())
			// informationStage.bar.itemName.scaleY = ((informationStage.height * 0.25)) / (informationStage.bar.itemName.getMeasuredHeight())
			// informationStage.bar.itemName.x = (informationStage.width * 0.5)
			// informationStage.bar.costText = new createjs.Text(' Cost ', textSize + "px " + textFont, 'white');
			// informationStage.bar.costText.scaleX = (informationStage.width * 0.2) / informationStage.bar.costText.getMeasuredWidth()
			// informationStage.bar.costText.scaleY = (informationStage.height * 0.2) / informationStage.bar.costText.getMeasuredHeight()
			// informationStage.bar.costText.x = informationStage.width * 0.3
			// informationStage.bar.costText.y = (informationStage.height * 0.25) - informationStage.bar.costText.getTransformedBounds().height
			// informationStage.bar.itemText = new createjs.Text(object.cost, textSize + "px " + textFont, 'white');
			// informationStage.bar.itemText.scaleX = ((informationStage.width * 0.2) / 2) / informationStage.bar.itemText.getMeasuredWidth()
			// informationStage.bar.itemText.scaleY = ((informationStage.height * 0.25)) / informationStage.bar.itemText.getMeasuredHeight()
			// informationStage.bar.itemText.x = informationStage.width * 0.35
			// informationStage.bar.itemText.y = (informationStage.height * 0.25)
			// informationStage.bar.buyButton = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("green").drawRect(0, 0, ((informationStage.width * 0.5 / 2)), informationStage.height * 0.25));
			// informationStage.bar.buyButton.x = informationStage.width * 0.5
			// informationStage.bar.buyButton.y = (informationStage.height * 0.25)
			// informationStage.bar.buyButton.itemId = itemList.indexOf(object)
			// informationStage.bar.buyButton.addEventListener('click', itemClick)
			// informationStage.bar.buyText = new createjs.Text(' BUY ', textSize + "px " + textFont, 'white');
			// informationStage.bar.buyText.scaleX = ((informationStage.width * 0.25) / 2) / informationStage.bar.buyText.getMeasuredWidth()
			// informationStage.bar.buyText.scaleY = ((informationStage.height * 0.25)) / informationStage.bar.buyText.getMeasuredHeight()
			// informationStage.bar.buyText.x = informationStage.width * 0.5 + (informationStage.bar.buyText.getTransformedBounds().width / 2)
			// informationStage.bar.buyText.y = (informationStage.height * 0.25)
			// informationStage.bar.sellButton = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("red").drawRect(0, 0, ((informationStage.width * 0.5 / 2)), informationStage.height * 0.25));
			// informationStage.bar.sellButton.x = informationStage.width * 0.5 + informationStage.width * 0.25
			// informationStage.bar.sellButton.y = (informationStage.height * 0.25)
			// informationStage.bar.sellButton.itemId = itemList.indexOf(object)
			// informationStage.bar.sellButton.addEventListener('click', itemClick)
			// informationStage.bar.sellText = new createjs.Text(' SELL ', textSize + "px " + textFont, 'white');
			// informationStage.bar.sellText.scaleX = ((informationStage.width * 0.25) / 2) / informationStage.bar.sellText.getMeasuredWidth()
			// informationStage.bar.sellText.scaleY = ((informationStage.height * 0.25)) / informationStage.bar.sellText.getMeasuredHeight()
			// informationStage.bar.sellText.x = informationStage.width * 0.75 + (informationStage.bar.sellText.getTransformedBounds().width / 2)
			// informationStage.bar.sellText.y = (informationStage.height * 0.25)
			// informationStage.bar.statButtons = [];
			// Item Stats
			var i = 0;
			for(var stat in object.baseStats){
				createTextObject(informationStage.bar.grid[i+8], "text", stat + " : " + object[stat], 0.75);
				informationStage.bar.grid[i+8].addChild(informationStage.bar.grid[i+8].textObject);
				i++;
			}
			for(var item in informationStage.bar.grid){
				informationStage.bar.addChild(informationStage.bar.grid[item]);
			}
			informationStage.addChild(informationStage.bar)
			//informationStage.bar.addChild(informationStage.bar.icon)
			//informationStage.bar.addChild(informationStage.bar.buyButton)
			//informationStage.bar.addChild(informationStage.bar.buyText)
			//informationStage.bar.addChild(informationStage.bar.sellButton)
			//informationStage.bar.addChild(informationStage.bar.sellText)
			//informationStage.bar.addChild(informationStage.bar.itemName)
			//informationStage.bar.addChild(informationStage.bar.costText)
			//informationStage.bar.addChild(informationStage.bar.itemText)
			//informationStage.addChild(informationStage.bar)
			return
	}
	informationStage.cache(0, 0, informationStage.width, informationStage.height)
}

function refreshInfoBar(event) {
	switch (viewTarget[0]) {
		case 'hero':
			var hero = viewTarget[1]
			//informationStage.bar.healthBar.graphics.clear().beginFill("#051").drawRect(0, 0, (hero.CHP / hero.HP) * (informationStage.width * 0.5), informationStage.height * 0.25)
			//informationStage.bar.grid[2].textObject.text = Math.round(hero.CHP) + '/' + Math.round(hero.HP)
			//informationStage.bar.heroText.text = hero.level
			//informationStage.bar.heroText.scaleX = ((informationStage.width * 0.2) / 2) / informationStage.bar.heroText.getMeasuredWidth()
			//informationStage.bar.heroText.scaleY = ((informationStage.height * 0.25)) / informationStage.bar.heroText.getMeasuredHeight()
			for (var stat in hero.baseStats) {
				if (stat == 'HP') {
					stat = 'CMS'
				}
				//informationStage.bar.statButtons[stat].textObject.text = ' ' + stat + " : " + hero[stat] + ' '
				//informationStage.bar.statButtons[stat].textObject.scaleX = statWidth / informationStage.bar.statButtons[stat].textObject.getMeasuredWidth()
				//informationStage.bar.statButtons[stat].textObject.scaleY = statHeight / informationStage.bar.statButtons[stat].textObject.getMeasuredHeight()
			}
		case 'monster':
			var monster = viewTarget[1]
			if (monster.alive == false) {
				//informationStage.bar.healthBar.graphics.clear().beginStroke("black").beginFill("green").drawRect(0, 0, 0, informationStage.height * 0.25)
				//informationStage.bar.healthBar.textObject.text = 'Dead'
			} else {
				//informationStage.bar.healthBar.graphics.clear().beginFill("green").drawRect(0, 0, (monster.CHP / monster.HP) * (informationStage.width * 0.5), informationStage.height * 0.25)
				//informationStage.bar.healthBar.textObject.text = Math.round(monster.CHP) + '/' + Math.round(monster.HP)
			}

			return
		case 'item':
			//item stuff here
			return
	}
	informationStage.updateCache()
}