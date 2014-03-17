function monster(monster, x, y, player) {
	this.AD = monster.stats.AD * 5,
	this.HP = monster.stats.HP * 10,
	this.CHP = monster.stats.HP * 10,
	this.MP = monster.stats.MP * 10,
	this.CMP = monster.stats.MP * 10,
	this.MD = monster.stats.MD * 5,
	this.MR = monster.stats.MR * 5,
	this.AR = monster.stats.AR * 5,
	this.MS = monster.stats.MS * 10,
	this.RN = monster.stats.RN * 10,
	this.CMS = monster.stats.MS * 10,
	this.AS = 2000 - (monster.stats.AS * 10),
	this.cost = monster.cost,
	this.experience = monster.experience,
	this.bounty = Math.ceil(this.cost / 20),
	this.attackTime = new Date(),
	this.stunned = false,
	this.rooted = false,
	this.alive = true,
	this.attackTarget = null,
	this.stageObject = new createjs.Container(),
	this.stageObject.x = x,
	this.stageObject.y = y,
	this.stageShape = new createjs.Shape(),
	this.stageShape.graphics.beginFill(monster.color).drawCircle(0, 0, 16),
	this.healthBar = new createjs.Shape(),
	this.healthBar.graphics.beginFill("red").drawRect(-18, -30, 35, 8);
	this.player = player
	gameStage.addChild(this.stageObject),
	this.stageObject.addChild(this.stageShape)
	this.stageObject.addChild(this.healthBar),
	this.effects = [],
	this.hit = 11,
	this.radius = 9,
	this.stageObject.setBounds(x, y, 16, 16),


	this.update = function(event) {
		if (this.alive == false) {
			return
		}
		this.updateEffects(event)
		this.move(event)
		this.handleCombat(event)
		this.stageObject.setBounds(this.stageObject.x, this.stageObject.y, 16, 16)
	}


	this.move = function(event) {
		if (this.stunned) return;
		if (this.rooted) return;
		this.steps = (((event.delta) / 100 * this.CMS) / 10)
		if (this.attackTarget != null) {
			if (distance(this, this.attackTarget) > this.RN) {
				this.moving = true;
				moveTo(this, this.attackTarget.stageObject.x, this.attackTarget.stageObject.y, this.steps)
			} else {
				this.moving = false;
			}
		} else if (this.stageObject.x < gameStage.canvas.width - 150) {
			this.moving = true;
			moveTo(this, gameStage.canvas.width - 150, gameStage.canvas.height / 2, this.steps)
		} else {
			this.moving = true;
			moveTo(this, gameStage.canvas.width + 10, gameStage.canvas.height / 2, this.steps)
			if (this.stageObject.x > gameStage.canvas.width) {
				this.passedGate();
			}
		}

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
		if (effect.effectType == "root" && this.rooted == false) {
			this.effects.push(effect)
			this.rooted = true
		}
	},


	this.updateEffects = function(event) {
		for (var i = 0; i < this.effects.length; i++) {
			if ('undefined' == typeof(this.effects[i])) {
				continue
			}
			if (this.effects[i].effectType == "slow" && (new Date() - this.effects[i].appliedTime) >= this.effects[i].effectDuration) {
				this.CMS += (this.effects[i].effectAmount / 100) * this.MS
				this.effects.splice(i, 1)
				i--;
				continue
			}
			if (this.effects[i].effectType == "stun" && (new Date() - this.effects[i].appliedTime) >= this.effects[i].effectDuration) {
				this.stunned = false
				this.effects.splice(i, 1)
				i--;
				continue
			}
			if (this.effects[i].effectType == "root" && (new Date() - this.effects[i].appliedTime) >= this.effects[i].effectDuration) {
				this.rooted = false
				this.effects.splice(i, 1)
				i--;
				continue
			}
		}
	},


	this.passedGate = function() {
		this.alive = false
		this.player.team.removePoints(1)
		gameStage.removeChild(this.stageObject)
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
			attacker.gold += this.bounty
			attacker.experience += this.experience
			gameStage.removeChild(this.stageObject)
		} else {
			this.healthBar.graphics.clear().beginFill("red").drawRect(-18, -30, (this.CHP / this.HP) * 35, 8)
		}
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
		if (this.alive == false) return;
		if (this.attackTarget == null) {
			if (this.player.hero.alive == true) {
				this.attackTarget = this.player.hero
			}
		} else if (this.attackTarget.alive == false) {
			this.attackTarget = null
		} else if (distance(this, this.attackTarget) <= this.RN) {
			if ((new Date() - this.attackTime) > this.AS) {
				if (this.moving) return
				if (this.alive == false) return;
				this.attackTarget.takeDamage(this.AD, "AD", this)
				this.attackTime = new Date()
			}
		}


	}

}