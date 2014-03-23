function effect(effectAmount, effectDuration, effectType) {
	this.effectAmount = effectAmount
	this.effectDuration = effectDuration
	this.appliedTime = null;
	this.effectType = effectType
}



var spellList = { //Constains a list of every spell in the game, Named.
	singleTargetSlow: function() { //Now a constructor object that creates a new spell for each Hero
		this.level = 0, //Level of spell
		this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600], //Damage scaling per level. Balance goes here
		this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
		this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
		this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
		this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
		this.effect = new effect(60, 7000, "slow"), //Create a new effect for a 60% slow that lasts for 7 seconds
		this.cast = function(x, y, attacker) { //Called whenever the player presses q to cast
			if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) { //Either spell isn't leveled, or its on CD.
				return false; //Todo: Add display text
			}
			bounds = { //Creates the size of the spell.
				height: 9,
				width: 9,
				x: x,
				y: y,
			}

			var target; //Creates a blanket target object.
			collisionTree.retrieve(bounds, function(collidee) { //Get every object that collides with our target spell
				if (collidee.checkCollision(x, y, 6) && !target) { //If we don't have a target, and it does collide, set a new target
					target = collidee;
				}
			});

			if (target) { //If we did end up with a target
				object = new createjs.Shape(new createjs.Graphics().setStrokeStyle(2).beginStroke("black").drawCircle(x, y, 9))
				object.alpha = 0.5
				gameStage.addChild(object)
				particleList.push(new drawParticle(object, 750))
				target.applyEffect(this.effect) //Apply the effect
				target.takeDamage(this.damage, 'MD', attacker) //Deal damage
				this.currentCoolDown = new Date() // Set spell on CD
			}
		},
		this.levelUp = function(hero) { // Called when the player chooses to level a spell
			if ((hero.level / 3) < this.level) {
				return
			}
			this.level += 1 //Increase level of spell
			this.damage = this.damagePerLevel[this.level], //Damage based on level
			this.coolDown = this.coolDownPerLevel[this.level], //Cooldown based on level
			hero.spellLevels -= 1 //Hero has 1 less spell he can level up
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
				object = new createjs.Shape(new createjs.Graphics().setStrokeStyle(2).beginStroke("black").drawCircle(x, y, 9))
				object.alpha = 0.5
				gameStage.addChild(object)
				particleList.push(new drawParticle(object, 750))
				target.applyEffect(this.effect)
				target.takeDamage(this.damage, 'MD', attacker)
				this.currentCoolDown = new Date()
			}
		}
		this.levelUp = function(hero) {
			if ((hero.level / 3) < this.level) {
				return
			}
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
				height: 150,
				width: 150,
				x: x - 50,
				y: y - 50,
			}

			var targets = [];
			collisionTree.retrieve(bounds, function(collidee) {
				if (collidee.checkCollision(x, y, 100)) {
					targets.push(collidee)
				}
			});

			object = new createjs.Shape(new createjs.Graphics().setStrokeStyle(2).beginStroke("black").drawCircle(x, y, 100))
			object.alpha = 0.5
			gameStage.addChild(object)
			particleList.push(new drawParticle(object, 750))

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
			if ((hero.level / 3) < this.level) {
				return
			}
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
				height: 150,
				width: 150,
				x: x - 50,
				y: y - 50,
			}

			var targets = [];
			collisionTree.retrieve(bounds, function(collidee) {
				if (collidee.checkCollision(x, y, 100)) {
					targets.push(collidee)
				}
			});

			object = new createjs.Shape(new createjs.Graphics().setStrokeStyle(2).beginStroke("black").drawCircle(x, y, 100))
			object.alpha = 0.5
			gameStage.addChild(object)
			particleList.push(new drawParticle(object, 750))

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
			if ((hero.level / 3) < this.level) {
				return
			}
			this.level += 1
			this.damage = this.damagePerLevel[this.level],
			this.coolDown = this.coolDownPerLevel[this.level],
			console.log(this)
			hero.spellLevels -= 1
		}
	},
	aoeNuke: function() {
		this.level = 0,
		this.damagePerLevel = [0, 150, 400, 700, 800, 1000, 1250, 1400, 1650, 1900, 2199],
		this.coolDownPerLevel = [0, 10000, 9500, 8000, 7500, 7000, 6500, 5000, 4500, 3000, 3600],
		this.damage = this.damagePerLevel[this.level],
		this.coolDown = this.coolDownPerLevel[this.level],
		this.currentCoolDown = 9999999,
		this.cast = function(x, y, attacker) {
			if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
				return false;
			}
			bounds = {
				height: 150,
				width: 150,
				x: x - 50,
				y: y - 50,
			}

			var targets = [];
			collisionTree.retrieve(bounds, function(collidee) {
				if (collidee.checkCollision(x, y, 100)) {
					targets.push(collidee)
				}
			});

			object = new createjs.Shape(new createjs.Graphics().setStrokeStyle(2).beginStroke("black").drawCircle(x, y, 100))
			object.alpha = 0.5
			gameStage.addChild(object)
			particleList.push(new drawParticle(object, 750))

			if (targets) {
				for (var i = 0, n = targets.length; i < n; i++) {
					var target = targets[i];
					target.takeDamage(this.damage, 'MD', attacker)
				}
				this.currentCoolDown = new Date()
			}
		}
		this.levelUp = function(hero) {
			if ((hero.level / 3) < this.level) {
				return
			}
			this.level += 1
			this.damage = this.damagePerLevel[this.level],
			this.coolDown = this.coolDownPerLevel[this.level],
			console.log(this)
			hero.spellLevels -= 1

		}
	}
}