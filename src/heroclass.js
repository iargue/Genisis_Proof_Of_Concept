function hero(hero, x, y, player) {
	this.AD = hero.stats.AD,
	this.HP = hero.stats.HP * 5,
	this.MP = hero.stats.MP * 5,
	this.MD = hero.stats.MD,
	this.MR = hero.stats.MR,
	this.AR = hero.stats.AR,
	this.MS = hero.stats.MS * 10,
	this.RN = hero.stats.RN * 10,
	this.CMS = hero.stats.MS * 10,
	this.AS = 1000 - (hero.stats.AS * 10),
	this.attackTime = new Date(),
	this.spells = hero.spells,
	this.alive = true,
	this.stunned = false,
	this.rooted = false,
	this.attackTarget = null,
	this.stageobject = new createjs.Shape(),
	this.stageobject.graphics.beginFill(hero.color).drawCircle(0, 0, 9),
	this.stageobject.x = x,
	this.stageobject.y = y,
	this.player = playerList[player]
	this.player.stage.addChild(this.stageobject),
	this.effects = [],
	this.hit = 11,
	this.movewaypointx = x,
	this.movewaypointy = y,
	this.gold = 100,
	this.moving = false,
	this.healthBar = new createjs.Shape(),
	this.healthBar.graphics.beginFill("green").drawRect(0, 0, 20, 5);
	this.healthBar.x = x - 11;
	this.healthBar.y = y - 16;
	this.player.stage.addChild(this.healthBar),



	this.move = function(event) {
		if (this.stunned) return;
		if (this.rooted) return;
		this.steps = (((event.delta) / 100 * this.CMS) / 10)

		if (this.movewaypointx != this.stageobject.x || this.movewaypointy != this.stageobject.y) {
			this.moving = true;
			if (this.distance(this.movewaypointx, this.movewaypointy) < this.steps) {
				this.stageobject.x = this.movewaypointx
				this.stageobject.y = this.movewaypointy
			} else {
				this.moveTo(this.movewaypointx, this.movewaypointy, this.steps)
			}
		} else {
			this.moving = false
		}
		this.healthBar.x = this.stageobject.x - 11;
		this.healthBar.y = this.stageobject.y - 16;

	},

	this.moveTo = function(targetX, targetY, steps) {
		// Calculate direction towards target
		towardsX = targetX - this.stageobject.x;
		towardsY = targetY - this.stageobject.y;

		// Normalize
		toPlayerLength = Math.sqrt(towardsX * towardsX + towardsY * towardsY);
		towardsX = towardsX / toPlayerLength;
		towardsY = towardsY / toPlayerLength;

		// Move towards the player
		this.stageobject.x += towardsX * steps;
		this.stageobject.y += towardsY * steps;
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
			this.stunned = true
		}
		if (effect.effectType == "root" && this.rooted = false) {
			this.effects.push(effect)
			this.rooted = true
		}
	},

	this.castQ = function(event) {
		//handle casting Q spell
	},

	this.castE = function(event) {
		//handle casting E spell
	},

	this.castW = function(event) {
		//handle casting W spell
	},

	this.castR = function(event) {
		//handle casting R spell
	},

	this.levelQ = function(event) {
		//handle leveling Q spell
	},

	this.levelE = function(event) {
		//handle casting E spell
	},

	this.levelW = function(event) {
		//handle casting W spell
	},

	this.levelR = function(event) {
		//handle casting R spell
	},


	this.updateEffects = function(event) {
		for (var i = 0; i < this.effects.length; i++) {
			if (this.effects[i].effectType == "slow" && (new Date() - this.effects[i].appliedTime) >= this.effects[i].effectDuration) {
				this.CMS += (this.effects[i].effectAmount / 100) * this.MS
				this.effects.splice(i, 1)
			}
			if (this.effects[i].effectType == "stun" && (new Date() - this.effects[i].appliedTime) >= this.effects[i].effectDuration) {
				this.stunned = false
				this.effects.splice(i, 1)
			}
			if (this.effects[i].effectType == "root" && (new Date() - this.effects[i].appliedTime) >= this.effects[i].effectDuration) {
				this.rooted = false
				this.effects.splice(i, 1)
			}
		}
	},

	this.updateWaypoint = function(event) {
		this.movewaypointx = event.stageX;
		this.movewaypointy = event.stageY;
	}

	this.distance = function(x, y) {
		var xDist = this.stageobject.x - x;
		var yDist = this.stageobject.y - y;
		return distance = Math.sqrt(xDist * xDist + yDist * yDist);

	}

	this.handleCombat = function() {
		if (this.stunned) return
		if (this.moving) return
		if (this.attackTarget == null) {
			console.log('Looking for target')
			for (var i = 0; i < this.player.unitList.length; i++) {
				if (this.player.unitList[i].distance(this.stageobject.x, this.stageobject.y) < this.RN) {
					this.attackTarget = this.player.unitList[i];
					break;
				}
			}
		} else if (this.attackTarget.alive == false) {
			console.log('Dead')
			this.attackTarget = null;
		} else if (this.attackTarget.distance(this.stageobject.x, this.stageobject.y) > this.RN) {
			console.log('Too far')
			this.attackTarget = null;
		} else if ((new Date() - this.attackTime) > this.AS) {
			console.log('Attacking')
			this.attackTarget.takeDamage(this.AD, "AD", this)
			this.attackTime = new Date()
		}
	}


}