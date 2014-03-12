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
	this.stageobject = new createjs.Shape(),
	this.stageobject.graphics.beginFill(monster.color).drawCircle(0, 0, 9),
	this.stageobject.x = x,
	this.stageobject.y = y,
	this.player = playerList[player],
	this.player.stage.addChild(this.stageobject),
	this.effects = [],
	this.hit = 11,
	this.healthBar = new createjs.Shape(),
	this.healthBar.graphics.beginFill("red").drawRect(0, 0, 20, 5);
	this.healthBar.x = x - 11;
	this.healthBar.y = y - 16;
	this.player.stage.addChild(this.healthBar),
	this.radius = 9,
	this.stageobject.setBounds(x,y,9,9),


	this.update = function(event) {
		if (this.alive == false) {
			return
		}
		this.updateEffects(event)
		this.move(event)
		this.handleCombat(event)
		this.stageobject.setBounds(this.stageobject.x,this.stageobject.y,9,9)
	}


	this.move = function(event) {
		if (this.stunned) return;
		if (this.rooted) return;
		this.steps = (((event.delta) / 100 * this.CMS) / 10)
		if (this.attackTarget != null) {
			if (this.distance(this.attackTarget.stageobject.x, this.attackTarget.stageobject.y) > this.RN) {
				this.moving = true;
				this.moveTo(this.attackTarget.stageobject.x, this.attackTarget.stageobject.y, this.steps)
			} else {
				this.moving = false;
			}
		} else if (this.stageobject.x < this.player.stage.canvas.width - 150) {
			this.moving = true;
			this.moveTo(this.player.stage.canvas.width - 150, this.player.stage.canvas.height / 2, this.steps)
		} else {
			this.moving = true;
			this.moveTo(this.player.stage.canvas.width + 10, this.player.stage.canvas.height / 2, this.steps)
			if (this.stageobject.x > this.player.stage.canvas.width) {
				this.passedGate();
			}
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

	this.hitPoint = function(tX, tY) {
		return this.hitRadius(tX, tY, 0);
	},

	this.hitRadius = function(tX, tY, tHit) {
		//early returns speed it up
		if (tX - tHit > this.stageobject.x + this.hit) {
			return;
		}
		if (tX + tHit < this.stageobject.x - this.hit) {
			return;
		}
		if (tY - tHit > this.stageobject.y + this.hit) {
			return;
		}
		if (tY + tHit < this.stageobject.y - this.hit) {
			return;
		}

		//now do the circle distance test
		return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.stageobject.x - tX), 2) + Math.pow(Math.abs(this.stageobject.y - tY), 2));
	}

	this.passedGate = function() {
		this.alive = false
		this.player.points -= 1
		this.player.stage.removeChild(this.stageobject)
		this.player.stage.removeChild(this.healthBar)
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
			this.player.stage.removeChild(this.stageobject)
			this.player.stage.removeChild(this.healthBar)
		} else {
			this.healthBar.graphics.clear().beginFill("red").drawRect(0, 0, (this.CHP / this.HP) * 20, 5)
			this.healthBar.x = this.stageobject.x - 11;
			this.healthBar.y = this.stageobject.y - 16;
		}
	}

	this.distance = function(x, y) {
		var xDist = Math.abs(this.stageobject.x - x)
		var yDist = Math.abs(this.stageobject.y - y)
		return distance = Math.sqrt(xDist * xDist + yDist * yDist);

	}

	this.checkCollision = function(x,y,radius) {
		if (this.radius + radius < Math.sqrt(Math.pow(x - this.stageobject.x, 2) + Math.pow(y - this.stageobject.y, 2))) {
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
		} else if (this.attackTarget.distance(this.stageobject.x, this.stageobject.y) <= this.RN) {
			if ((new Date() - this.attackTime) > this.AS) {
				if (this.moving) return
				if (this.alive == false) return;
				this.attackTarget.takeDamage(this.AD, "AD", this)
				this.attackTime = new Date()
			}
		}


	}

}