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
	this.cost = monster.cost,
	this.bounty = Math.ceil(this.cost / 20),
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


	this.move = function(event) {
		if (this.stunned) return;
		if (this.rooted) return;
		this.steps = (((event.delta) / 100 * this.CMS) / 10)
		if (this.attackTarget != null) {
			var xDist = this.stageobject.x - this.attackTarget.stageobject.x;
			var yDist = this.stageobject.y - this.attackTarget.stageobject.y;
			var distance = Math.sqrt(xDist * xDist + yDist * yDist);
			if (distance > this.RN) {
				this.moveTo(this.attackTarget.stageobject.x, this.attackTarget.stageobject.y, this.steps)
			}
			
		} else if (this.stageobject.x < this.player.stage.canvas.width - 150) {
			this.moveTo(this.player.stage.canvas.width - 150, this.player.stage.canvas.height / 2, this.steps)
			if (this.stageobject.x > this.player.stage.canvas.width) {
				this.passedGate();
			}
		} else {
			this.moveTo(this.player.stage.canvas.width + 10, this.player.stage.canvas.height / 2, this.steps)
		}

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
		this.player.stage.removeChild(this.stageobject)
		//handle team points later. pretty please?
	}

	this.takeDamage = function(damageAmount, damageType, attacker) {
		if (damageType == "AD") {
			damageAmount -= (damageAmount / 100) * this.AR
		} else if (damageType == "MD") {
			damageAmount -= (damageAmount / 100) * this.MR
		}
		this.CHP -= damageAmount
		console.log(this.CHP)
		if (this.CHP <= 0) {
			this.alive = false
			attacker.gold += this.bounty
		}
	}

	this.handleCombat = function() {
		if (this.attackTarget == null) {
			if (this.player.hero.alive == true) {
				this.attackTarget = this.player.hero
			}
		} else if (this.attackTarget.alive == false) {
			this.attackTarget = null
		}

	}

}