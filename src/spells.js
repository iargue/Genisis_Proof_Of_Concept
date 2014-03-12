function effect(effectAmount, effectDuration, effectType) {
	this.effectAmount = effectAmount
	this.effectDuration = effectDuration
	this.appliedTime = null;
	this.effectType = effectType
}


var spellList = {
	singleTargetSlow: function() {
		this.level = 0,
		this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600],
		this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900],
		this.damage = this.damagePerLevel[this.level],
		this.coolDown = this.coolDownPerLevel[this.level],
		this.currentCoolDown = 9999999,
		this.effect = new effect(60, 7000, "slow"),
		this.cast = function(x, y, attacker) {
			if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
				return false;
			}
			bounds = {
				height: 9,
				width: 9,
				x: x,
				y: y,
			}

			var target;
			collisionTree.retrieve(bounds, function(collidee) {
				if (collidee.checkCollision(x, y, 6) && !target) {
					target = collidee;
				}
			});

			if (target) {
				target.applyEffect(this.effect)
				target.takeDamage(this.damage, 'MD', attacker)
				this.currentCoolDown = new Date()
			}
		},
		this.levelUp = function(hero) {
			this.level += 1
			this.damage = this.damagePerLevel[this.level],
			this.coolDown = this.coolDownPerLevel[this.level],
			console.log(this)
			hero.spellLevels -= 1
		}
	},
	singleTargetStun: function() {
		this.level = 0,
		this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600],
		this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900],
		this.damage = this.damagePerLevel[this.level],
		this.coolDown = this.coolDownPerLevel[this.level],
		this.currentCoolDown = 9999999,
		this.effect = new effect(1, 3000, "stun"),
		this.cast = function(x, y, attacker) {
			if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
				return false;
			}
			bounds = {
				height: 9,
				width: 9,
				x: x,
				y: y,
			}

			var target;


			collisionTree.retrieve(bounds, function(collidee) {
				if (collidee.checkCollision(x, y, 6) && !target) {
					target = collidee;
				}
			});

			if (target) {
				target.applyEffect(this.effect)
				target.takeDamage(this.damage, 'MD', attacker)
				this.currentCoolDown = new Date()
			}
		}
		this.levelUp = function(hero) {
			this.level += 1
			this.damage = this.damagePerLevel[this.level],
			this.coolDown = this.coolDownPerLevel[this.level],
			console.log(this)
			hero.spellLevels -= 1
		}

	},
	aoeSlow: function() {
		this.level = 0,
		this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600],
		this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900],
		this.damage = this.damagePerLevel[this.level],
		this.coolDown = this.coolDownPerLevel[this.level],
		this.currentCoolDown = 9999999,
		this.effect = new effect(60, 3000, "slow"),
		this.cast = function(x, y, attacker) {
			if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
				return false;
			}
			bounds = {
				height: 9,
				width: 9,
				x: x,
				y: y,
			}

			var targets = [];
			collisionTree.retrieve(bounds, function(collidee) {
				if (collidee.checkCollision(x, y, 100)) {
					targets.push(collidee)
				}
			});

			if (targets) {
				for (var i = 0, n = targets.length; i < n; i++) {
					var target = targets[i];
					target.applyEffect(this.effect)
					target.takeDamage(this.damage, 'MD', attacker)
				}
				this.currentCoolDown = new Date()
			}
		}
		this.levelUp = function(hero) {
			this.level += 1
			this.damage = this.damagePerLevel[this.level],
			this.coolDown = this.coolDownPerLevel[this.level],
			console.log(this)
			hero.spellLevels -= 1
		}
	},
	aoeStun: function() {
		this.level = 0,
		this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600],
		this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900],
		this.damage = this.damagePerLevel[this.level],
		this.coolDown = this.coolDownPerLevel[this.level],
		this.currentCoolDown = 9999999,
		this.effect = new effect(1, 3000, "stun"),
		this.cast = function(x, y, attacker) {
			if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
				return false;
			}
			bounds = {
				height: 9,
				width: 9,
				x: x,
				y: y,
			}

			var targets = [];
			collisionTree.retrieve(bounds, function(collidee) {
				if (collidee.checkCollision(x, y, 100)) {
					targets.push(collidee)
				}
			});

			if (targets) {
				for (var i = 0, n = targets.length; i < n; i++) {
					var target = targets[i];
					target.applyEffect(this.effect)
					target.takeDamage(this.damage, 'MD', attacker)
				}
				this.currentCoolDown = new Date()
			}
		}
		this.levelUp = function(hero) {
			this.level += 1
			this.damage = this.damagePerLevel[this.level],
			this.coolDown = this.coolDownPerLevel[this.level],
			console.log(this)
			hero.spellLevels -= 1
		}

	}
}