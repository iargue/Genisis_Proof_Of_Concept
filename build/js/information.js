function setupInfoBar(){
	informationStage.bar = new createjs.Container();
	informationStage.bar.grid = []
	// Hero / Monster / Item - Icon
	informationStage.bar.grid[0] = new createjs.Container();
	informationStage.bar.grid[0].width = informationStage.width * 0.25
	informationStage.bar.grid[0].height = informationStage.height * 0.5
	// Hero Experience / Monster Bounty / Item Buy
	informationStage.bar.grid[1] = new createjs.Container();
	informationStage.bar.grid[1].x = informationStage.width * 0.25
	informationStage.bar.grid[1].width = informationStage.width * 0.375
	informationStage.bar.grid[1].height = informationStage.height * 0.25
	// Hero Health / Monster Health / Item Sell
	informationStage.bar.grid[2] = new createjs.Container();
	informationStage.bar.grid[2].x = informationStage.width * 0.625
	informationStage.bar.grid[2].width = informationStage.width * 0.375
	informationStage.bar.grid[2].height = informationStage.height * 0.25
	// Hero Level
	informationStage.bar.grid[3] = new createjs.Container();
	informationStage.bar.grid[3].x = informationStage.width * 0.25
	informationStage.bar.grid[3].y = informationStage.height * 0.25
	informationStage.bar.grid[3].width = informationStage.width * 0.25
	informationStage.bar.grid[3].height = informationStage.height * 0.25
	// Skills
	for(var i = 0; i < 4; i++){
		informationStage.bar.grid[i+4] = new createjs.Container();
		informationStage.bar.grid[i+4].x = ((i % 4) * informationStage.width * 0.125) + (informationStage.width * 0.5)
		informationStage.bar.grid[i+4].y = informationStage.height * 0.25
		informationStage.bar.grid[i+4].width = informationStage.width * 0.125
		informationStage.bar.grid[i+4].height = informationStage.height * 0.25
	}
	// Stats
	for(var i = 0; i < 8; i++){
		informationStage.bar.grid[i+8] = new createjs.Container();
		informationStage.bar.grid[i+8].x = (i % 4) * informationStage.width * 0.25
		informationStage.bar.grid[i+8].y = (Math.floor(i / 4) * informationStage.height * 0.25) + (informationStage.height * 0.5)
		informationStage.bar.grid[i+8].width = informationStage.width * 0.25
		informationStage.bar.grid[i+8].height = informationStage.height * 0.25
	}
	// Monster / Item - Cost
	informationStage.bar.grid[16] = new createjs.Container();
	informationStage.bar.grid[16].x = informationStage.width * 0.25
	informationStage.bar.grid[16].y = informationStage.height * 0.25
	informationStage.bar.grid[16].width = informationStage.width * 0.375
	informationStage.bar.grid[16].height = informationStage.height * 0.25
	// Item Special
	informationStage.bar.grid[17] = new createjs.Container();
	informationStage.bar.grid[17].x = informationStage.width * 0.625
	informationStage.bar.grid[17].y = informationStage.height * 0.25
	informationStage.bar.grid[17].width = informationStage.width * 0.375
	informationStage.bar.grid[17].height = informationStage.height * 0.25

}

function updateInfoBar(type, object, buySell) {
	viewTarget = [type, object]
	informationStage.removeAllChildren();
	for(var i = 0; i < informationStage.bar.grid.length; i++){
		informationStage.bar.grid[i].removeAllChildren();
		informationStage.bar.grid[i].removeAllEventListeners();
	}
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
			informationStage.bar.grid[1].addChild(informationStage.bar.grid[1].object)
			createTextObject(informationStage.bar.grid[1], "text", object.experience + "/" + object.experienceToLevel, 0.75, 12);
			// Hero Health
			informationStage.bar.grid[2].object = new createjs.Shape(new createjs.Graphics().beginStroke("#000").beginLinearGradientFill(["#070", "#050", "#050", "#070"], [0, 0.25, 0.75, 1], 0, 0, 0, informationStage.bar.grid[2].height).drawRect(0, 0, informationStage.bar.grid[2].width, informationStage.bar.grid[2].height));
			informationStage.bar.grid[2].addChild(informationStage.bar.grid[2].object);
			createTextObject(informationStage.bar.grid[2], "text", Math.round(object.CHP) + "/" + object.HP, 0.75);
			// Hero Level
			informationStage.bar.grid[3].object = new createjs.Shape(new createjs.Graphics().beginStroke("#000").drawRect(0, 0, informationStage.bar.grid[3].width, informationStage.bar.grid[3].height));
			informationStage.bar.grid[3].addChild(informationStage.bar.grid[3].object);
			informationStage.bar.grid[3].object.addEventListener("click", function(){
				informationStage.bar.grid[3].removeAllChildren();
				informationStage.bar.grid[3].addChild(informationStage.bar.grid[3].object);
				createTextObject(informationStage.bar.grid[3], "label", "Level", 0.6, 0, "#EFC94C");
				createTextObject(informationStage.bar.grid[3], "content", "" + object.level, 0.5);
			})
			createTextObject(informationStage.bar.grid[3], "text", "" + object.level, 0.5);
			
			// Hero Skills
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
			// Monster Bounty
			createTextObject(informationStage.bar.grid[1], "label", "Bounty", 0.6, 0, "#EFC94C");
			createTextObject(informationStage.bar.grid[1], "content", object.bounty, 0.5, 0);
			// Monster Health
			informationStage.bar.grid[2].object = new createjs.Shape(new createjs.Graphics().beginStroke("#000").beginLinearGradientFill(["#070", "#050", "#050", "#070"], [0, 0.25, 0.75, 1], 0, 0, 0, informationStage.bar.grid[2].height).drawRect(0, 0, informationStage.bar.grid[2].width, informationStage.bar.grid[2].height));
			informationStage.bar.grid[2].addChild(informationStage.bar.grid[2].object);
			createTextObject(informationStage.bar.grid[2], "text", object.CHP + "/" + object.HP, 0.5, 0);
			// Monster Cost 
			createTextObject(informationStage.bar.grid[16], "label", "Cost", 0.6, 8, "#EFC94C");
			createTextObject(informationStage.bar.grid[16], "content", object.cost, 0.5, 0);
			// Monster Skills
			for(var i = 0; i < 3; i++){
				informationStage.bar.grid[i+5].object = new createjs.Shape(new createjs.Graphics().beginStroke("#000").drawRect(0, 0, informationStage.bar.grid[i+5].width, informationStage.bar.grid[i+5].height));
				spellObject = object.spells[i];
				//informationStage.bar.grid[i+5].iconObject = new createjs.Bitmap(contentManager.getResult(spellObject.icon));
				informationStage.bar.grid[i+5].iconObject = new createjs.Shape(new createjs.Graphics().beginStroke("#FFF").beginFill("#000").drawRect(0, 0, informationStage.bar.grid[i+5].width, informationStage.bar.grid[i+5].height));
				//informationStage.bar.grid[i+5].iconObject.scaleX = informationStage.bar.grid[i+5].width / informationStage.bar.grid[i+5].iconObject.image.width;
				//informationStage.bar.grid[i+5].iconObject.scaleY = informationStage.bar.grid[i+5].height / informationStage.bar.grid[i+5].iconObject.image.height;
				informationStage.bar.grid[i+5].addChild(informationStage.bar.grid[i+5].object)
				informationStage.bar.grid[i+5].addChild(informationStage.bar.grid[i+5].iconObject);
			}
			// Monster Stats
			var i = 0;
			for(var stat in object.baseStats){
				createTextObject(informationStage.bar.grid[i+8], "text", stat + " : " + object[stat], 0.75);
				i++;
			}
			for(var item in informationStage.bar.grid){
				informationStage.bar.addChild(informationStage.bar.grid[item]);
			}
			informationStage.addChild(informationStage.bar)
			return
		case 'item':
			console.log(object);
			// Item Icon 
			//object.icon.scaleX = informationStage.bar.grid[0].width / object.icon.sourceRect.width
			//object.icon.scaleY = informationStage.bar.grid[0].height / object.icon.sourceRect.height
			//object.icon.x = 0
			//object.icon.y = 0
			informationStage.bar.grid[0].object = new createjs.Shape(new createjs.Graphics().beginStroke("#000").beginFill("white").drawRect(0, 0, informationStage.bar.grid[0].width, informationStage.bar.grid[0].height));
			informationStage.bar.grid[0].addChild(informationStage.bar.grid[0].object);
			//informationStage.bar.grid[0].addChild(object.icon);
			// Item Buy 
			if(buySell)
				informationStage.bar.grid[1].object = new createjs.Shape(new createjs.Graphics().beginStroke("#000").beginFill("#070").drawRect(0, 0, informationStage.bar.grid[1].width, informationStage.bar.grid[1].height));
			else
				informationStage.bar.grid[1].object = new createjs.Shape(new createjs.Graphics().beginStroke("#000").beginFill("#555").drawRect(0, 0, informationStage.bar.grid[1].width, informationStage.bar.grid[1].height));
			informationStage.bar.grid[1].addChild(informationStage.bar.grid[1].object);
			createTextObject(informationStage.bar.grid[1], "text", "Buy", 0.3, 0);
			informationStage.bar.grid[2].addEventListener("click", function(){

			})
			// Item Sell
			informationStage.bar.grid[2].object = new createjs.Shape(new createjs.Graphics().beginStroke("#000").beginFill("#700").drawRect(0, 0, informationStage.bar.grid[2].width, informationStage.bar.grid[2].height))
			informationStage.bar.grid[2].addChild(informationStage.bar.grid[2].object)
			createTextObject(informationStage.bar.grid[2], "text", "Sell", 0.3, 0);
			// Item Cost
			createTextObject(informationStage.bar.grid[16], "label", "Cost", 0.6, 8, "#EFC94C");
			createTextObject(informationStage.bar.grid[16], "content", object.cost, 0.5, 0);
			// Item Special
			createTextObject(informationStage.bar.grid[17], "text", object.name, 0.9, 14, "00FF00");
			// Item Stats
			var i = 0;
			for(var stat in object.stats){
				createTextObject(informationStage.bar.grid[i+8], "text", stat + " : " + object.stats[stat], 0.75);
				i++;
			}
			for(var item in informationStage.bar.grid){
				informationStage.bar.addChild(informationStage.bar.grid[item]);
			}
			informationStage.addChild(informationStage.bar)
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