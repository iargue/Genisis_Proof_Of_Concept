var spellList = {
	singleTargetSlow: {
		damage: 50,
		manaCost: 25,
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
					if (collidee.checkCollision(x, y, 2)) {
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
		manaCost: 45,
		coolDown: 15,
		currentCoolDown: null,
		cast: function(x, y, attacker) {

			target = attacker.player.stage.getObjectUnderPoint(x, y)
			console.log(target)
		}
	}

}