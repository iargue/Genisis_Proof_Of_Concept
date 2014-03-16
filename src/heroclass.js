function hero(hero, heroSpells, x, y, player) {
	this.level = 1
	this.baseStats = hero.stats
	this.AD = this.baseStats.AD,
	this.HP = this.baseStats.HP * 10,
	this.CHP = this.baseStats.HP * 10
	this.MP = this.baseStats.MP * 5,
	this.CMP = this.baseStats.CMP * 10,
	this.MD = this.baseStats.MD,
	this.MR = this.baseStats.MR,
	this.AR = this.baseStats.AR,
	this.MS = this.baseStats.MS * 10,
	this.RN = this.baseStats.RN * 10,
	this.CMS = this.baseStats.MS * 10,
	this.AS = 1000 - (this.baseStats.AS * 10),
	this.attackTime = new Date(),
	this.spells = heroSpells,
	this.alive = true,
	this.stunned = false,
	this.rooted = false,
	this.attackTarget = null,
	this.stageobject = new createjs.Container(),
	this.stageobject.x = x,
	this.stageobject.y = y,
	this.stageShape = new createjs.Shape(),
	this.stageShape.graphics.beginFill(hero.color).drawCircle(0, 0, 25),
	this.healthBar = new createjs.Shape(),
	this.healthBar.graphics.beginFill("green").drawRect(-30, -60, 60, 10);
	// this.spellTwo.graphics.beginLinearGradientFill(["red","white"], [0, 1], 0, 120, 0, 20).drawRect(20, 20, 120, 120);
	this.spellBar = {
		spellOne: new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(-30, -50, 11, 15)),
		spellOneCooldown: new createjs.Shape(new createjs.Graphics().beginFill('white').drawRect(-30, -50, 11, 15)),
		spellTwo: new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(-18, -50, 11, 15)),
		spellTwoCooldown: new createjs.Shape(new createjs.Graphics().beginFill("white").drawRect(-18, -50, 11, 15)),
		spellThree: new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(-6, -50, 11, 15)),
		spellThreeCooldown: new createjs.Shape(new createjs.Graphics().beginFill("white").drawRect(-6, -50, 11, 15)),
		spellFour: new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(6, -50, 11, 15)),
		spellFourCooldown: new createjs.Shape(new createjs.Graphics().beginFill("white").drawRect(6, -50, 11, 15)),
		spellFive: new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(18, -50, 11, 15)),
		spellfiveCooldown: new createjs.Shape(new createjs.Graphics().beginFill("white").drawRect(18, -50, 11, 15)),
	},
	this.player = player,
	this.player.stage.addChild(this.stageobject),
	this.stageobject.addChild(this.stageShape)
	this.stageobject.addChild(this.healthBar),
	this.stageobject.addChild(this.spellBar.spellOneCooldown),
	this.stageobject.addChild(this.spellBar.spellTwoCooldown),
	this.stageobject.addChild(this.spellBar.spellThreeCooldown),
	this.stageobject.addChild(this.spellBar.spellFourCooldown),
	this.stageobject.addChild(this.spellBar.spellFiveCooldown),
	this.stageobject.addChild(this.spellBar.spellOne),
	this.stageobject.addChild(this.spellBar.spellTwo),
	this.stageobject.addChild(this.spellBar.spellThree),
	this.stageobject.addChild(this.spellBar.spellFour),
	this.stageobject.addChild(this.spellBar.spellFive),

	this.effects = [],
	this.hit = 11,
	this.movewaypoint = {
		x: x,
		y: y
	}
	this.gold = 100,
	this.moving = false,
	this.spawnTime = 5000 + (1000 * this.level),
	this.deadTime = null,
	this.experience = 0,
	this.experienceToLevel = 50 + (this.level * 50),
	this.spellLevels = 1,


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
		}
	},



	this.move = function(event) {
		for (var effect in this.effects) {
			if (effect.effectType == "stun" || "root") return
		}
		if (this.alive == false) return; //We can possibly remove this
		steps = (((event.delta) / 100 * this.CMS) / 10)

		if (this.movewaypoint.x != this.stageobject.x || this.movewaypoint.y != this.stageobject.y) {
			this.moving = true;
			moveTo(this, this.movewaypoint.x, this.movewaypoint.y, steps)
		} else {
			this.moving = false
		}
		// this.statusBar.x = this.stageobject.x - 11;
		// this.statusBar.y = this.stageobject.y - 20;

	},

	// spellOne: new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(-30, -50, 11, 15)),
	// spellOneCooldown: new createjs.Shape(new createjs.Graphics().beginFill('white').drawRect(-30, -50, 11, 15)),
	// spellTwo: new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(-18, -50, 11, 15)),
	// spellTwoCooldown: new createjs.Shape(new createjs.Graphics().beginFill("white").drawRect(-18, -50, 11, 15)),
	// spellThree: new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(-6, -50, 11, 15)),
	// spellThreeCooldown: new createjs.Shape(new createjs.Graphics().beginFill("white").drawRect(-6, -50, 11, 15)),
	// spellFour: new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(6, -50, 11, 15)),
	// spellFourCooldown: new createjs.Shape(new createjs.Graphics().beginFill("white").drawRect(6, -50, 11, 15)),
	// spellFive: new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("black").drawRect(18, -50, 11, 15)),
	// spellfiveCooldown: new createjs.Shape(new createjs.Graphics().beginFill("white").drawRect(18, -50, 11, 15)),

	this.updateSpellBar = function(event) {
		for (var spell in this.spells) {
			if (this.spells[spell].level = 0) return
			switch (spell) {
				case 0: //Key 1
					this.spellBar.spellOneCooldown.graphics.clear().beginFill("red").drawRect(-30, -50, 11, 15)
					return false;
					// case : //Key 2
					// 	this.spells[1].cast(this.player.stage.mouseX, this.player.stage.mouseY, this) //Cast Spell 2 with current mouse x and y
					// 	return false;
					// case 0:
					// 	this.spells[2].cast(this.player.stage.mouseX, this.player.stage.mouseY, this)
					// 	return false;
					// case 0:
					// 	this.spells[3].cast(this.player.stage.mouseX, this.player.stage.mouseY, this)
					// 	return false;
					// case 0:
					// 	this.spells[4].cast(this.player.stage.mouseX, this.player.stage.mouseY, this)
					// 	return false;
			}

		}

	}

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

		if (this.player.stage.mouseInBounds) { //Make sure they were in the canvas to actully cast a spell
			switch (keyCode) {
				case 49: //Key 1
					this.spells[0].cast(this.player.stage.mouseX, this.player.stage.mouseY, this) //Cast spell 1 with current mouse x and y
					return false;
				case 50: //Key 2
					this.spells[1].cast(this.player.stage.mouseX, this.player.stage.mouseY, this) //Cast Spell 2 with current mouse x and y
					return false;
				case 51:
					this.spells[2].cast(this.player.stage.mouseX, this.player.stage.mouseY, this)
					return false;
				case 52:
					this.spells[3].cast(this.player.stage.mouseX, this.player.stage.mouseY, this)
					return false;
				case 53:
					this.spells[4].cast(this.player.stage.mouseX, this.player.stage.mouseY, this)
					return false;
			}
		}

	},

	this.levelSpell = function(keyCode) {
		if (this.spellLevels > 0) { //Do they even have the ability to level up a spell?
			switch (keyCode) {
				case 49: //Key 1
					this.spells[0].levelUp(this) //Spell 1. Level it up, passing hero object
					return false;
				case 50:
					this.spells[1].levelUp(this)
					return false;
				case 51:
					this.spells[2].levelUp(this)
					return false;
				case 52:
					this.spells[3].levelUp(this)
					return false;
				case 53:
					this.spells[4].levelUp(this)
					return false;
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

	this.updateWaypoint = function(event) { //Simply updates our hero's Waypoint based on clicks
		this.movewaypoint.x = event.stageX;
		this.movewaypoint.y = event.stageY;
	}

	this.levelUp = function() { //We have enough experience, we should level up!
		this.experience -= this.experienceToLevel //Take away the experience needed to level up this time.
		for (var stat in this.baseStats) {
			this.baseStats[stat] += 1 //Increase all of our base stats by 1
		}
		this.level += 1 //Increase our level
		this.AD = this.baseStats.AD, //Normalize all stats based on value
		this.HP = this.baseStats.HP * 10,
		this.CHP = this.baseStats.HP * 10
		this.MP = this.baseStats.MP * 5,
		this.CMP = this.baseStats.CMP * 10,
		this.MD = this.baseStats.MD,
		this.MR = this.baseStats.MR,
		this.AR = this.baseStats.AR,
		this.AS = 1000 - (this.baseStats.AS * 10),
		this.spawnTime = 5000 + (1000 * this.level),
		this.experienceToLevel = 50 + (this.level * 50), //Increase our experience needed to level.
		this.spellLevels += 1 //Give us the ability to level up a new spell
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
			this.player.stage.removeChild(this.stageobject)
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
		this.stageobject.x = this.player.stage.canvas.width - 250
		this.stageobject.y = this.player.stage.canvas.height / 2
		this.healthBar.graphics.clear().beginFill("green").drawRect(-30, -60, 60, 10);
		this.movewaypoint.x = this.stageobject.x,
		this.movewaypoint.y = this.stageobject.y,
		this.player.stage.addChild(this.stageobject)
	}

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
			this.attackTarget.takeDamage(this.AD, "AD", this) //Deal damage to that minion based on our AD
			this.attackTime = new Date() //set our last attack time to just now.
		}

	}

}