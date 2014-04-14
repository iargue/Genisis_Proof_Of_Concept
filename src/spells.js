function effect(effectAmount, effectDuration, effectType) {
	this.effectAmount = effectAmount
	this.effectDuration = effectDuration
	this.appliedTime = null;
	this.effectType = effectType
}



var spellList = { //Constains a list of every spell in the game, Named.
	aoeSlow: function() {
		this.level = 0, //Level of spell
		this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600], //Damage scaling per level. Balance goes here
		this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
		this.rangePerLevel = [0, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350]
		this.effectDurationPerLevel = [0, 7000, 7500, 8000, 9000, 10000, 7000, 7000, 7000, 7000, 7000, 7000]
		this.effectAmountPerLevel = [0, 40, 50, 60, 70, 80, 80, 80, 80, 80, 80, 80]
		this.range = this.rangePerLevel[this.level]
		this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
		this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
		this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
		this.effect = new effect(this.effectAmountPerLevel[this.level], this.effectDurationPerLevel[this.level], "slow"), //Create a new effect for a 60% slow that lasts for 7 seconds
		this.cast = function(x, y, attacker) {
			if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
				displayText('Spell not ready', 'red')
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

	},
	aoeStun: function() {
		this.level = 0, //Level of spell
		this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600], //Damage scaling per level. Balance goes here
		this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
		this.rangePerLevel = [0, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350]
		this.effectDurationPerLevel = [0, 7000, 7500, 8000, 9000, 10000, 7000, 7000, 7000, 7000, 7000, 7000]
		this.effectAmountPerLevel = [0, 40, 50, 60, 70, 80, 80, 80, 80, 80, 80, 80]
		this.range = this.rangePerLevel[this.level]
		this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
		this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
		this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
		this.effect = new effect(this.effectAmountPerLevel[this.level], this.effectDurationPerLevel[this.level], "slow"), //Create a new effect for a 60% slow that lasts for 7 seconds
		this.cast = function(x, y, attacker) {
			if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
				displayText('Spell not ready', 'red')
				return false; //Todo: Add display text
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

	},
	aoeNuke: function() {
		this.level = 0, //Level of spell
		this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600], //Damage scaling per level. Balance goes here
		this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
		this.rangePerLevel = [0, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350]
		this.effectDurationPerLevel = [0, 7000, 7500, 8000, 9000, 10000, 7000, 7000, 7000, 7000, 7000, 7000]
		this.effectAmountPerLevel = [0, 40, 50, 60, 70, 80, 80, 80, 80, 80, 80, 80]
		this.range = this.rangePerLevel[this.level]
		this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
		this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
		this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
		this.effect = new effect(this.effectAmountPerLevel[this.level], this.effectDurationPerLevel[this.level], "slow"), //Create a new effect for a 60% slow that lasts for 7 seconds
		this.cast = function(x, y, attacker) {
			if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
				displayText('Spell not ready', 'red')
				return false; //Todo: Add display text
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
	},
	nidSpear: function() {
		this.level = 0, //Level of spell
		this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600], //Damage scaling per level. Balance goes here
		this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
		this.rangePerLevel = [0, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350]
		this.effectDurationPerLevel = [0, 7000, 7500, 8000, 9000, 10000, 7000, 7000, 7000, 7000, 7000, 7000]
		this.effectAmountPerLevel = [0, 40, 50, 60, 70, 80, 80, 80, 80, 80, 80, 80]
		this.range = this.rangePerLevel[this.level]
		this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
		this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
		this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
		this.effect = new effect(this.effectAmountPerLevel[this.level], this.effectDurationPerLevel[this.level], "slow"), //Create a new effect for a 60% slow that lasts for 7 seconds
		this.cast = function(x, y, attacker) {
			if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
				displayText('Spell not ready', 'red')
				return false; //Todo: Add display text
			}

			object = new createjs.Shape(new createjs.Graphics().setStrokeStyle(2).beginFill("black").drawRect(0, 0, 10, 20))
			object.x = attacker.stageObject.x;
			object.y = attacker.stageObject.y;
			object.height = 10
			object.width = 20
			object.radius = 2 //2px from the x,y
			var angle = Math.atan2(y - attacker.stageObject.y, x - attacker.stageObject.x); //Rotation to target.
			object.angle = angle
			angle = angle * (180 / Math.PI);
			if (angle < 0) {
				angle = 360 - (-angle)
			}

			object.rotation = 90 + angle //Rotate
			gameStage.addChild(object)
			particleList.push(new skillShotParticle(object, 475, 150, attacker, this))
			this.currentCoolDown = new Date()
		}
		this.onCollision = function(object, collidee, attacker) { //Called when particle collides with a minion
			collidee.takeDamage(this.damage, 'MD', attacker) //Deal damage to target
			gameStage.removeChild(object) //Remove the "spear"
		}
		this.onRange = function(object, attacker) { //Called when particles reaches its max range
			gameStage.removeChild(object) //Since we don't do anything if range expires, we just remove the object from the stage
		}
	},
	fireBall: function() {
		this.level = 0, //Level of spell
		this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600], //Damage scaling per level. Balance goes here
		this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
		this.rangePerLevel = [0, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350]
		this.effectDurationPerLevel = [0, 7000, 7500, 8000, 9000, 10000, 7000, 7000, 7000, 7000, 7000, 7000]
		this.effectAmountPerLevel = [0, 40, 50, 60, 70, 80, 80, 80, 80, 80, 80, 80]
		this.range = this.rangePerLevel[this.level]
		this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
		this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
		this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
		this.effect = new effect(this.effectAmountPerLevel[this.level], this.effectDurationPerLevel[this.level], "slow"), //Create a new effect for a 60% slow that lasts for 7 seconds
		this.cast = function(x, y, attacker) {
			if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
				displayText('Spell not ready', 'red')
				return false; //Todo: Add display text
			}

			object = new createjs.Shape(new createjs.Graphics().setStrokeStyle(2).beginFill("red").drawCircle(0, 0, 10))
			object.x = attacker.stageObject.x;
			object.y = attacker.stageObject.y;
			object.height = 10
			object.width = 10
			object.radius = 10 //2px from the x,y
			var angle = Math.atan2(y - attacker.stageObject.y, x - attacker.stageObject.x); //Rotation to target.
			object.angle = angle
			gameStage.addChild(object)
			particleList.push(new skillShotParticle(object, 300, 225, attacker, this))
			this.currentCoolDown = new Date()
		}
		this.onCollision = function(object, collidee, attacker) { //Called when particle collides with a minion
			gameStage.removeChild(object) //Remove the "fireball"
			bounds = {
				height: 150,
				width: 150,
				x: collidee.stageObject.x - 50,
				y: collidee.stageObject.y - 50,
			}
			collidee.takeDamage(this.damage, 'MD', attacker) //Deal damage to target
			var targets = [];
			collisionTree.retrieve(bounds, function(hitTarget) {
				if (hitTarget.checkCollision(collidee.stageObject.x, collidee.stageObject.y, 50)) {
					targets.push(hitTarget)
				}
			}, this);

			explosionObject = new createjs.Shape(new createjs.Graphics().setStrokeStyle(2).beginFill('red').drawCircle(0, 0, 50))
			explosionObject.x = collidee.stageObject.x
			explosionObject.y = collidee.stageObject.y
			explosionObject.radius = 50
			gameStage.addChild(explosionObject)
			particleList.push(new drawParticle(explosionObject, 350)) //Draw Explosion to stage.

			if (targets) {
				for (var i = 0, n = targets.length; i < n; i++) {
					var target = targets[i];
					target.takeDamage(this.damage * (50 / 100), 'MD', attacker)
				}
			}
		}
		this.onRange = function(object, attacker) { //Called when particles reaches its max range
			gameStage.removeChild(object)
			bounds = {
				height: 150,
				width: 150,
				x: object.x - 50,
				y: object.y - 50,
			}
			var targets = [];
			collisionTree.retrieve(bounds, function(hitTarget) {
				if (hitTarget.checkCollision(object.x, object.y, 50)) {
					targets.push(hitTarget)
				}
			}, this);

			explosionObject = new createjs.Shape(new createjs.Graphics().setStrokeStyle(2).beginFill('red').drawCircle(0, 0, 50))
			explosionObject.x = object.x
			explosionObject.y = object.y
			explosionObject.radius = 50
			gameStage.addChild(explosionObject)
			particleList.push(new drawParticle(explosionObject, 350)) //Draw Explosion to stage.

			if (targets) {
				for (var i = 0, n = targets.length; i < n; i++) {
					var target = targets[i];
					target.takeDamage(this.damage * (50 / 100), 'MD', attacker)
				}
			}
		}
	},
	iceBall: function() {
		this.level = 0, //Level of spell
		this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600], //Damage scaling per level. Balance goes here
		this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
		this.rangePerLevel = [0, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350]
		this.effectDurationPerLevel = [0, 7000, 7500, 8000, 9000, 10000, 7000, 7000, 7000, 7000, 7000, 7000]
		this.effectAmountPerLevel = [0, 40, 50, 60, 70, 80, 80, 80, 80, 80, 80, 80]
		this.range = this.rangePerLevel[this.level]
		this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
		this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
		this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
		this.effect = new effect(this.effectAmountPerLevel[this.level], this.effectDurationPerLevel[this.level], "slow"), //Create a new effect for a 60% slow that lasts for 7 seconds
		this.cast = function(x, y, attacker) {
			if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
				displayText('Spell not ready', 'red')
				return false; //Todo: Add display text
			}

			object = new createjs.Shape(new createjs.Graphics().setStrokeStyle(2).beginFill("blue").drawCircle(0, 0, 10))
			object.x = attacker.stageObject.x;
			object.y = attacker.stageObject.y;
			object.height = 10
			object.width = 10
			object.radius = 10 //2px from the x,y
			var angle = Math.atan2(y - attacker.stageObject.y, x - attacker.stageObject.x); //Rotation to target.
			object.angle = angle
			gameStage.addChild(object)
			particleList.push(new skillShotParticle(object, 500, 100, attacker, this))
			this.currentCoolDown = new Date()
		}
		this.onCollision = function(object, collidee, attacker) { //Called when particle collides with a minion
			gameStage.removeChild(object) //Remove the "fireball"
			collidee.takeDamage(this.damage, 'MD', attacker) //Deal damage to target

			shard = {
				damage: this.damage,
				onCollision: function(object, collidee, attacker, particle) {
					if (collidee.alive == false) {
						particle.active = true
						particleList.push(particle)
						return
					}
					gameStage.removeChild(object)
					collidee.takeDamage(this.damage * (50 / 100), 'MD', attacker)
					
				},
				onRange: function(object, attacker) {
					gameStage.removeChild(object)
				}

			}

			for (var i = 1; i < 9; i++) {
				explosionObject = new createjs.Shape(new createjs.Graphics().setStrokeStyle(2).beginFill('blue').drawRect(0, 0, 5, 10))
				explosionObject.x = object.x
				explosionObject.y = object.y
				explosionObject.height = 5
				explosionObject.width = 5
				explosionObject.radius = 2
				explosionObject.angle = (45 * i) * Math.PI / 180
				explosionObject.rotation = explosionObject.angle * 180 / Math.PI
				gameStage.addChild(explosionObject)
				particleList.push(new skillShotParticle(explosionObject, 50, 100, attacker, shard))
			}

		},
		this.onRange = function(object, attacker) { //Called when particles reaches its max range
			gameStage.removeChild(object) //Remove the "fireball"
			shard = {
				damage: this.damage,
				onCollision: function(object, collidee, attacker, particle) {
					if (collidee.alive == false) {
						particle.active = true
						particleList.push(particle)
						return
					}
					collidee.takeDamage(this.damage * (50 / 100), 'MD', attacker)

					gameStage.removeChild(object)
				},
				onRange: function(object, attacker) {
					gameStage.removeChild(object)
				}

			}

			for (var i = 1; i < 9; i++) {
				explosionObject = new createjs.Shape(new createjs.Graphics().setStrokeStyle(2).beginFill('blue').drawRect(0, 0, 5, 10))
				explosionObject.x = object.x
				explosionObject.y = object.y
				explosionObject.height = 5
				explosionObject.width = 5
				explosionObject.radius = 2
				explosionObject.angle = (45 * i) * Math.PI / 180
				explosionObject.rotation = explosionObject.angle * 180 / Math.PI
				gameStage.addChild(explosionObject)
				particleList.push(new skillShotParticle(explosionObject, 50, 100, attacker, shard))
			}
		}
	}
}