var spellList = {
	singleTargetSlow: {
		damage: 50,
		coolDown: 10,
		currentCoolDown: null,
		effect: new effect(60, 7000, "slow"),
		cast: function(x, y, attacker) {
			bounds = {
				height: 9,
				width: 9,
				x: x,
				y: y,
			}

			collisionTree.retrieve(bounds, function(collidee) {
				if (collidee.checkCollision(x, y, 6) && !target) {
					target = collidee;
				}
			});

			if (target) {
				target.applyEffect(this.effect)
				target.takeDamage(this.damage, 'MD', attacker)
			}
		}
	},
	singleTargetStun: {
		coolDown: 15,
		damage: 25,
		currentCoolDown: null,
		effect: new effect(1, 3000, "stun"),
		cast: function(x, y, attacker) {
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
			}
		}
	},
	aoeSlow: {
		coolDown: 25,
		damage: 50,
		currentCoolDown: null,
		effect: new effect(60, 3000, "slow"),
		cast: function(x, y, attacker) {
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
			}
		}

	},
	aoeStun: {
		coolDown: 25,
		damage: 25,
		currentCoolDown: null,
		effect: new effect(1, 3000, "stun"),
		cast: function(x, y, attacker) {
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
			}
		}

	}
}