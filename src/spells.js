function effect(effectAmount, effectDuration, effectType) {
	this.effectAmount = effectAmount
	this.effectDuration = effectDuration
	this.appliedTime = null;
	this.effectType = effectType
}


var spellList = {
	singleTargetSlow: {
		damage: 50,
		coolDown: 1000,
		currentCoolDown: new Date(),
		effect: new effect(60, 7000, "slow"),
		cast: function(x, y, attacker) {
			if (new Date() - this.currentCoolDown < this.coolDown) {
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
	},
	singleTargetStun: {
		coolDown: 1500,
		damage: 25,
		currentCoolDown: new Date(),
		effect: new effect(1, 3000, "stun"),
		cast: function(x, y, attacker) {
			if (new Date() - this.currentCoolDown < this.coolDown) {
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
	},
	aoeSlow: {
		coolDown: 2500,
		damage: 50,
		currentCoolDown: new Date(),
		effect: new effect(60, 3000, "slow"),
		cast: function(x, y, attacker) {
			if (new Date() - this.currentCoolDown < this.coolDown) {
				return false;
			}
			bounds = {
				height: 200,
				width: 200,
				x: x - 100,
				y: y - 100,
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

	},
	aoeStun: {
		coolDown: 2500,
		damage: 25,
		currentCoolDown: new Date(),
		effect: new effect(1, 3000, "stun"),
		cast: function(x, y, attacker) {
			if (new Date() - this.currentCoolDown < this.coolDown) {
				return false;
			}
			bounds = {
				height: 200,
				width: 200,
				x: x - 100,
				y: y - 100,
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

	}
}