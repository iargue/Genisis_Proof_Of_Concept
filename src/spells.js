var spellList = {
	singleTargetSlow: {
		manaCost: 25,
		coolDown: 10,
		currentCoolDown: null,
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
					if (collidee.checkCollision(x,y,2)) {
						console.log(collidee);
					}
				}
			}
			target = attacker.player.stage.getObjectUnderPoint(x, y)
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