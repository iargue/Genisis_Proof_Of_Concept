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

			var potential_collidees = collisionTree.getObjectsAtBounds(bounds);

			if (potential_collidees) {
				for (var i = 0, n = potential_collidees.length; i < n; i++) {
					var collidee = potential_collidees[i];
					// console.log(collidee)
					if (collidee == this) continue;
					if (collidee.checkCollision(x, y, 6)) {
						target = collidee;
						break;
					}
				}
			}
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

			var potential_collidees = collisionTree.getObjectsAtBounds(bounds);
			var target;

			if (potential_collidees) {
				for (var i = 0, n = potential_collidees.length; i < n; i++) {
					var collidee = potential_collidees[i];
					// console.log(collidee)
					if (collidee == this) continue;
					if (collidee.checkCollision(x, y, 6)) {
						target = collidee;
						break;
					}
				}
			}
			if (target) {
				target.applyEffect(this.effect)
				target.takeDamage(this.damage, 'MD', attacker)
			}
		}
	},
	aoeStun: {
		coolDown: 25,
		damage: 50,
		currentCoolDown: null,
		effect: new effect(1, 3000, "stun"),
		cast: function(x, y, attacker) {
			bounds = {
				height: 9,
				width: 9,
				x: x,
				y: y,
			}

			var potential_collidees = collisionTree.getObjectsAtBounds(bounds);
			var targets = [];
			if (potential_collidees) {
				for (var i = 0, n = potential_collidees.length; i < n; i++) {
					var collidee = potential_collidees[i];
					// console.log(collidee)
					if (collidee == this) continue;
					if (collidee.checkCollision(x, y, 100)) {
						targets.push(collidee)
					}
				}
			}
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