function hero(hero, heroSpells, x, y, player) {
	this.level = 1
	this.baseStats = hero.stats
	this.AD = this.baseStats.AD,
	this.HP = this.baseStats.HP * 10,
	this.CHP = this.baseStats.HP * 10
	this.MD = this.baseStats.MD,
	this.MR = this.baseStats.MR,
	this.AR = this.baseStats.AR,
	this.MS = this.baseStats.MS * 10,
	this.RN = this.baseStats.RN * 10,
	this.CMS = this.baseStats.MS * 10,
	this.AS = 1000 - (this.baseStats.AS * 10),
	this.particleSpeed = 450,
	this.attackTime = new Date(),
	this.spells = heroSpells,
	this.alive = true,
	this.stunned = false,
	this.rooted = false,
	this.attackTarget = null,
	this.stageObject = new createjs.Container(),
	this.stageObject.x = x,
	this.stageObject.y = y,
	// this.stageShape = new createjs.Shape(),
	// this.stageShape.graphics.beginFill(hero.color).drawCircle(0, 0, 25),

	this.healthBar = new createjs.Shape(),
	this.healthBar.graphics.beginFill("green").drawRect(-30, -60, 60, 10);
	// this.spellTwo.graphics.beginLinearGradientFill(["red","white"], [0, 1], 0, 120, 0, 20).drawRect(20, 20, 120, 120);
	this.spellBar = {
		spellOne: new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill('white').drawRect(-30, -50, 15, 15)),
		spellOneCooldown: new createjs.Shape(new createjs.Graphics().beginFill('white').drawRect(-30, -50, 14, 14)),
		spellTwo: new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill('white').drawRect(-15, -50, 15, 15)),
		spellTwoCooldown: new createjs.Shape(new createjs.Graphics().beginFill("white").drawRect(-15, -50, 14, 14)),
		spellThree: new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill('white').drawRect(0, -50, 15, 15)),
		spellThreeCooldown: new createjs.Shape(new createjs.Graphics().beginFill("white").drawRect(0, -50, 14, 14)),
		spellFour: new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill('white').drawRect(15, -50, 15, 15)),
		spellFourCooldown: new createjs.Shape(new createjs.Graphics().beginFill("white").drawRect(15, -50, 14, 14)),
	},
	this.player = player,
	this.stageObject.alpha = 0.9
	gameStage.addChild(this.stageObject),
	this.stageObject.addChild(this.stageShape)
	this.stageObject.addChild(this.healthBar),
	this.stageObject.addChild(this.spellBar.spellOne),
	this.stageObject.addChild(this.spellBar.spellTwo),
	this.stageObject.addChild(this.spellBar.spellThree),
	this.stageObject.addChild(this.spellBar.spellFour),
	this.stageObject.addChild(this.spellBar.spellOneCooldown),
	this.stageObject.addChild(this.spellBar.spellTwoCooldown),
	this.stageObject.addChild(this.spellBar.spellThreeCooldown),
	this.stageObject.addChild(this.spellBar.spellFourCooldown),

	this.effects = [],
	this.hit = 11,
	this.moveWayPoint = {
		x: x,
		y: y
	}
	this.gold = 100,
	this.income = 3,
	this.moving = false,
	this.spawnTime = 5000 + (1000 * this.level),
	this.deadTime = null,
	this.experience = 0,
	this.experienceToLevel = 50 + (this.level * 50),
	this.spellLevels = 1,
	this.radius = 25,
	this.miniMapObject = new createjs.Shape(new createjs.Graphics().beginFill('green').drawCircle(0, 0, this.radius / miniMapRatio.radius))
	this.miniMapWayPoint = new createjs.Shape(new createjs.Graphics().setStrokeStyle(10 / miniMapRatio.radius).moveTo(this.stageObject.x, this.stageObject.y).beginStroke('yellow').lineTo(this.stageObject.x, this.stageObject.y))
	this.miniMapObject.x = Math.round(this.stageObject.x / miniMapRatio.width)
	this.miniMapObject.y = Math.round(this.stageObject.y / miniMapRatio.height)
	miniMapStage.addChild(this.miniMapObject)
	miniMapStage.addChild(this.miniMapWayPoint)
	this.localSpriteSheet = new createjs.SpriteSheet({
		framerate: 10,
		images: [contentManager.getResult(hero.imageName)], //image to use
		frames: hero.frames,
		animations: hero.animations
	}),
	createjs.SpriteSheetUtils.addFlippedFrames(this.localSpriteSheet, true, false, false),
	this.animationObject = new createjs.Sprite(this.localSpriteSheet),
	this.animationObject.gotoAndPlay("idle"), //animate
	this.icon = new createjs.Sprite(this.localSpriteSheet),
	this.icon.gotoAndStop("idle"),
	this.animationObject.isInIdleMode = true,
	// gameStage.addChild(this.animationObject)
	this.animationObject.rotation = 0
	this.stageObject.addChild(this.animationObject)
	this.goldTime = 45000
	this.itemList = []
	this.stageObject.heroReference = this
	this.stageObject.addEventListener('click', changeDisplay) //Located in handle.js

	this.update = function(event) {
		if (this.alive == false) { //Hero is dead
			if (new Date() - this.deadTime > this.spawnTime) { //Is current time long enough after he died?
				this.spawn(); //Spawn the Hero
			}
		} else {
			if (this.experience >= this.experienceToLevel) { //Is our experience greated then what we need to level?
				this.levelUp() //Level up our hero
			}
			this.updateEffects(event) //Update all effects on character, removing those that have expired.
			this.updateSpellBar(event)
			this.move(event) //Move the hero is he needs to be moved
			this.handleCombat(event) //Handle targeting and dealing damage
			// this.animate(event)
			this.updatePassive(event)
		}
	},


	this.move = function(event) {
		for (var effect in this.effects) {
			if (effect.effectType == "stun" || "root") return
		}
		if (this.alive == false) return; //We can possibly remove this
		steps = (((event.delta) / 100 * this.CMS) / 10)

		if (this.moveWayPoint.x != this.stageObject.x || this.moveWayPoint.y != this.stageObject.y) {
			this.moving = true;
			moveTo(this, this.moveWayPoint.x, this.moveWayPoint.y, steps)
		} else {
			this.moving = false
		}
		this.miniMapWayPoint.graphics.clear().setStrokeStyle(10 / miniMapRatio.radius).moveTo(Math.round(this.stageObject.x / miniMapRatio.width), Math.round(this.stageObject.y / miniMapRatio.height)).beginStroke('black').lineTo(Math.round(this.moveWayPoint.x / miniMapRatio.width), Math.round(this.moveWayPoint.y / miniMapRatio.height))
	},

	this.updatePassive = function(event) {
		if (event.time > 45000) {
			if (this.goldTime + 20000 < event.time) {
				this.gold += this.income
				this.goldTime = event.time
			}
		}
		if (this.CHP < this.HP) {
			this.CHP += (((2 / 100) * this.HP) / (1000 / event.delta))
			if (this.CHP > this.HP) {
				this.CHP = this.HP
			}
		}

		this.healthBar.graphics.clear().beginFill("green").drawRect(-30, -60, (this.CHP / this.HP) * 60, 10)

	},

	this.updateSpellBar = function(event) {
		for (var spell in this.spells) {
			if (this.spells[spell].level == 0) continue
			switch (spell) {
				case "0": //Key 1
					percentage = ((new Date() - this.spells[spell].currentCoolDown) / this.spells[spell].coolDown)
					if (percentage > 1) {
						percentage = 1
					}
					this.spellBar.spellOneCooldown.graphics.clear().beginFill("red").drawRect(-30, -50, percentage * 14, 14)
					continue
				case "1": //Key 2
					percentage = ((new Date() - this.spells[spell].currentCoolDown) / this.spells[spell].coolDown)
					if (percentage > 1) {
						percentage = 1
					}
					this.spellBar.spellTwoCooldown.graphics.clear().beginFill("red").drawRect(-15, -50, percentage * 14, 14)
					continue
				case "2":
					percentage = ((new Date() - this.spells[spell].currentCoolDown) / this.spells[spell].coolDown)
					if (percentage > 1) {
						percentage = 1
					}
					this.spellBar.spellThreeCooldown.graphics.clear().beginFill("red").drawRect(0, -50, percentage * 14, 14)
					continue
				case "3":
					percentage = ((new Date() - this.spells[spell].currentCoolDown) / this.spells[spell].coolDown)
					if (percentage > 1) {
						percentage = 1
					}
					this.spellBar.spellFourCooldown.graphics.clear().beginFill("red").drawRect(15, -50, percentage * 14, 14)
					continue
			}

		}

	},

	this.buyItem = function(itemID) {
		if (this.itemList.length >= 6) {
			displayText('You are currently wielding too many items', 'red')
			return
		} else if (itemList[itemID].cost > this.gold) {
			displayText('You cannot afford this item', 'red')
			return
		} else if (itemList[itemID].unique == true) {
			for (var item in this.itemList) {
				console.log(item)
				if (this.itemList[item] == itemList[itemID]) {
					displayText('You already own one of this item', 'red')
					return
				}
			}
		}
		this.gold -= itemList[itemID].cost
		this.itemList.push(itemList[itemID])
		for (var stat in itemList[itemID].stats) {
			this[stat] += itemList[itemID].stats[stat]
		}
		console.log(this.itemList)
	},

	this.sellItem = function(itemNumber) {
		this.gold += this.itemList[itemNumber].cost / 2
		this.itemList.splice(itemNumber, 1)
	},

	this.applyEffect = function(x) {
		effect = new Clone(x)
		effect.appliedTime = new Date()
		if (effect.effectType == "slow") {
			this.effects.push(effect)
			this.CMS -= (effect.effectAmount / 100) * this.MS
		}
		if (effect.effectType == "stun" && this.stunned == false) {
			this.effects.push(effect)
		}
		if (effect.effectType == "root" && this.rooted = false) {
			this.effects.push(effect)
		}
	},

	this.castSpell = function(keyCode) {
		if (this.alive == false) return
		for (var effect in this.effects) {
			if (effect.effectType == "stun" || "root") return
		}
		if (playerStage.mouseInBounds) { //Make sure they were in the canvas to actully cast a spell
			var point = gameStage.globalToLocal(playerStage.mouseX, playerStage.mouseY);
			switch (keyCode) {
				case 81: //Key Q
					this.spells[0].cast(point.x, point.y, this) //Cast spell 1 with current mouse x and y
					return false;
				case 87: //Key W
					this.spells[1].cast(point.x, point.y, this) //Cast Spell 2 with current mouse x and y
					return false;
				case 69: // Key E
					this.spells[2].cast(point.x, point.y, this)
					return false;
				case 82: // Key R (ULTIMATE)
					this.spells[3].cast(point.x, point.y, this)
					return false;
			}
		}

	},

	this.levelSpell = function(keyCode) {
		if (this.spellLevels > 0) { //Do they even have the ability to level up a spell?
			switch (keyCode) {
				case 81: //Key Q
					levelSpell(this, 0)
					break;
				case 87: //Key W
					levelSpell(this, 1)
					break;
				case 69: //Key E
					levelSpell(this, 2)
					break;
				case 82: //Key R
					levelSpell(this, 3)
					break;
			}
		}
	},



	this.updateEffects = function(event) { //called every ticket
		for (var i = 0; i < this.effects.length; i++) { //For every effect
			if (this.effects[i].effectType == "slow" && (new Date() - this.effects[i].appliedTime) >= this.effects[i].effectDuration) { //If its a slow and its expired
				this.CMS += (this.effects[i].effectAmount / 100) * this.MS //Improve our CMS by the amount it was reduced by
				this.effects.splice(i, 1) //Remove that effect from the list
			}
			if (this.effects[i].effectType == "stun" && (new Date() - this.effects[i].appliedTime) >= this.effects[i].effectDuration) { //Its a stun and its expired
				this.stunned = false //We are no longer stunned. Two stuns never stack (Currently)
				this.effects.splice(i, 1) //Remove that effect from list
			}
			if (this.effects[i].effectType == "root" && (new Date() - this.effects[i].appliedTime) >= this.effects[i].effectDuration) { //Its a root and its expired
				this.rooted = false //We are no longer ooted. Two roots never stack Currently)
				this.effects.splice(i, 1) //Remove that effect
			}
		}
	},

	this.updateWaypoint = function(event, miniMap) { //Simply updates our hero's Waypoint based on clicks
		if (miniMap) {
			// var point = gameStage.localToLocal(event.stageX * miniMapRatio.width, event.stageY * miniMapRatio.height, miniMapStage);
			var globalPoint = miniMapStage.globalToLocal(event.stageX, event.stageY)
			point = {
				x: globalPoint.x * miniMapRatio.width,
				y: globalPoint.y * miniMapRatio.height
			}
			if (this.player.team.side == 0 && point.y > 1000 - this.radius) {
				return;
			} else if (this.player.team.side == 1 && point.y < 1000 - this.radius) {
				return;
			}
			this.moveWayPoint.x = point.x;
			this.moveWayPoint.y = point.y;
		} else {
			var point = gameStage.globalToLocal(event.stageX, event.stageY);

			if (this.player.team.side == 0 && point.y > 1000 - this.radius) {
				return;
			} else if (this.player.team.side == 1 && point.y < 1000 - this.radius) {
				return;
			}
			this.moveWayPoint.x = point.x;
			this.moveWayPoint.y = point.y;
		}
	}

	this.levelUp = function() { //We have enough experience, we should level up!
		this.experience -= this.experienceToLevel //Take away the experience needed to level up this time.
		for (var stat in this.baseStats) {
			this.baseStats[stat] += 1 //Increase all of our base stats by 1
		}
		this.level += 1 //Increase our level
		this.AD = this.baseStats.AD, //Normalize all stats based on value
		this.CHP += (this.baseStats.HP * 10) - this.HP
		this.HP = this.baseStats.HP * 10,
		this.MD = this.baseStats.MD,
		this.MR = this.baseStats.MR,
		this.AR = this.baseStats.AR,
		this.AS = 1000 - (this.baseStats.AS * 10),
		this.spawnTime = 5000 + (1000 * this.level),
		this.experienceToLevel = 50 + (this.level * 50), //Increase our experience needed to level.
		this.spellLevels += 1 //Give us the ability to level up a new spell
		if (this.CHP > this.HP) {
			this.CHP = this.HP
		}
	},

	this.takeDamage = function(damageAmount, damageType, attacker) {
		if (damageType == "AD") {
			damageAmount -= (damageAmount / 100) * this.AR
		} else if (damageType == "MD") {
			damageAmount -= (damageAmount / 100) * this.MR
		}
		this.CHP -= damageAmount
		if (this.CHP <= 0) {
			this.alive = false
			this.deadTime = new Date()
			// gameStage.removeChild(this.stageObject)
			// miniMapStage.removeChild(this.miniMapObject)
			this.animationObject.gotoAndPlay('die')

		} else {
			this.healthBar.graphics.clear().beginFill("green").drawRect(-30, -60, (this.CHP / this.HP) * 60, 10)
		}
	}

	this.spawn = function() {
		this.alive = true
		this.stunned = false
		this.rooted = false
		this.CMS = this.MS
		this.CHP = this.HP
		this.CMP = this.MP
		this.healthBar.graphics.clear().beginFill("green").drawRect(-30, -60, 60, 10);
		console.log(this.player)
		spawnHero(this, this.player.team.side)
		this.moveWayPoint.x = this.stageObject.x
		this.moveWayPoint.y = this.stageObject.y
		this.animationObject.gotoAndPlay('idle')
		// gameStage.addChild(this.stageObject)
		// miniMapStage.addChild(this.miniMapObject)
	}

	this.checkCollision = function(x, y, radius) {
		if (this.radius + radius < Math.sqrt(Math.pow(x - this.stageObject.x, 2) + Math.pow(y - this.stageObject.y, 2))) {
			return false;
		} else {
			return true;
		}
	},

	this.handleCombat = function() {
		if (this.stunned) return
		if (this.moving) return
		if (this.alive == false) return;
		if (this.attackTarget == null) { //Find an attack target if they are near you
			for (var i = 0; i < this.player.team.unitList.length; i++) {
				if (distance(this, this.player.team.unitList[i]) < this.RN) { //Target is in range
					this.attackTarget = this.player.team.unitList[i]; //This is who we are attacking now
					break;
				}
			}
		} else if (this.attackTarget.alive == false) { //Whoops, our target is dead. We will get a new one next tick
			this.attackTarget = null;
		} else if (distance(this, this.attackTarget) > this.RN) { //Moved out of range, we should find a new target
			this.attackTarget = null;
		} else if ((new Date() - this.attackTime) > this.AS) { //Hes in range, and not dead, AND we can attack. Lets deal some damage
			object = new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").beginFill("black").drawRect(0, 0, 4, 2)) //Create bullet object
			object.x = this.stageObject.x
			object.y = this.stageObject.y //I had to override the default, creating it calling this was screwing something up.
			object.radius = 2 //bullet is 2px wide.
			var angle = Math.atan2(this.attackTarget.stageObject.y - this.stageObject.y, this.attackTarget.stageObject.y - this.stageObject.x); //Rotation to target.
			angle = angle * (180 / Math.PI);
			object.rotation = 90 + angle //Rotate
			gameStage.addChild(object) //add the object to the stage
			particleList.push(new bulletParticle(object, this.particleSpeed, this.attackTarget, this)) //Create particle to track this particle
			this.attackTime = new Date() //set our last attack time to just now.
		}

	}

}