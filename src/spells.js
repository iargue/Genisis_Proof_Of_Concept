var spellList = {
	singleTargetSlow: {
		manaCost : 25,
		coolDown : 10,
		currentCoolDown : null,
		cast : function(x, y, attacker) {
			console.log(attacker.player.stage)
			target = attacker.player.stage.getObjectUnderPoint(x, y)
			console.log(target)
		}
	},
	singleTargetStun: {
		manaCost : 45,
		coolDown : 15,
		currentCoolDown : null,
		cast : function(x, y, attacker) {

			target = attacker.player.stage.getObjectUnderPoint(x, y)
			console.log(target)
		}
	}

}