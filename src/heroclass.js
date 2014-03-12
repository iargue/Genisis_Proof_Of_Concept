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
	this.stageobject = new createjs.Shape(),
	this.stageobject.graphics.beginFill(hero.color).drawCircle(0, 0, 9),
	this.stageobject.x = x,
	this.stageobject.y = y,
	this.healthBar = new createjs.Shape(),
	this.healthBar.graphics.beginFill("green").drawRect(0, 0, 20, 5);
	this.healthBar.x = x - 11,
	this.healthBar.y = y - 25,
	this.manaBar = new createjs.Shape(),
	this.manaBar.graphics.beginFill("blue").drawRect(0, 0, 20, 5);
	this.manaBar.x = x - 11,
	this.manaBar.y = y - 15,
	this.player = playerList[player]
	this.player.stage.addChild(this.stageobject),
	this.player.stage.addChild(this.healthBar),
	this.player.stage.addChild(this.manaBar),
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


	this.update = function(event) {
		if (this.alive == false) {
			if (new Date() - this.deadTime > this.spawnTime) {
				console.log('Spawning')
				this.spawn();
			} else {
				return
			}
		}
		this.updateEffects(event)
		this.move(event)
		this.handleCombat(event)

	}



	this.move = function(event) {
		if (this.stunned) return;
		if (this.rooted) return;
		if (this.alive == false) return;
		this.steps = (((event.delta) / 100 * this.CMS) / 10)

		if (this.movewaypoint.x != this.stageobject.x || this.movewaypoint.y != this.stageobject.y) {
			this.moving = true;
			moveTo(this, this.movewaypoint.x, this.movewaypoint.y, this.steps)
		} else {
			this.moving = false
		}
		this.healthBar.x = this.stageobject.x - 11;
		this.healthBar.y = this.stageobject.y - 20;
		this.manaBar.x = this.stageobject.x - 11;
		this.manaBar.y = this.stageobject.y - 15;

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

	this.castSpell = function(keyCode) {
		if (this.player.stage.mouseInBounds) {
			switch (keyCode) {
				case 49:
					this.spells[0].cast(this.player.stage.mouseX, this.player.stage.mouseY, this)
					return false;
				case 50:
					this.spells[1].cast(this.player.stage.mouseX, this.player.stage.mouseY, this)
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
		if (this.player.stage.mouseInBounds) {
			switch (keyCode) {
				case 49:
					this.spells[0].level(this.player.stage.mouseX, this.player.stage.mouseY, this)
					return false;
				case 50:
					this.spells[1].level(this.player.stage.mouseX, this.player.stage.mouseY, this)
					return false;
				case 51:
					this.spells[2].level(this.player.stage.mouseX, this.player.stage.mouseY, this)
					return false;
				case 52:
					this.spells[3].level(this.player.stage.mouseX, this.player.stage.mouseY, this)
					return false;
				case 53:
					this.spells[4].level(this.player.stage.mouseX, this.player.stage.mouseY, this)
					return false;
			}
		}
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
		this.movewaypoint.x = event.stageX;
		this.movewaypoint.y = event.stageY;
	}



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
			this.player.stage.removeChild(this.healthBar)
			this.player.stage.removeChild(this.manaBar)
		} else {
			this.healthBar.graphics.clear().beginFill("green").drawRect(0, 0, (this.CHP / this.HP) * 20, 5)
			this.healthBar.x = this.stageobject.x - 11;
			this.healthBar.y = this.stageobject.y - 16;
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
		this.healthBar.x = this.stageobject.x - 11;
		this.healthBar.y = this.stageobject.y - 20;
		this.manaBar.x = this.stageobject.x - 11;
		this.manaBar.y = this.stageobject.y - 15;
		this.healthBar.graphics.clear().beginFill("green").drawRect(0, 0, 20, 5)
		this.manaBar.graphics.clear().beginFill("blue").drawRect(0, 0, 20, 5)
		this.movewaypointx = this.stageobject.x,
		this.movewaypointy = this.stageobject.y,
		this.player.stage.addChild(this.stageobject)
		this.player.stage.addChild(this.healthBar)
		this.player.stage.addChild(this.manaBar)
	}

	this.handleCombat = function() {
		if (this.stunned) return
		if (this.moving) return
		if (this.alive == false) return;
		if (this.attackTarget == null) {
			for (var i = 0; i < this.player.unitList.length; i++) {
				if (distance(this, this.player.unitList[i]) < this.RN) {
					this.attackTarget = this.player.unitList[i];
					break;
				}
			}
		} else if (this.attackTarget.alive == false) {
			this.attackTarget = null;
		} else if (distance(this, this.attackTarget) > this.RN) {
			this.attackTarget = null;
		} else if ((new Date() - this.attackTime) > this.AS) {
			this.attackTarget.takeDamage(this.AD, "AD", this)
			this.attackTime = new Date()
		}

	}

}