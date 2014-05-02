// This JS file will contain every particle effect. We can create multiple particle effects to handle different objects
// but every particle effect must have a stageOjbect, and every particle must have na update function to be called. All Particle 
// must also have this.active called in them to track if they are still active.

damageOverTimeParticle = function(object, bounds, spell, attacker, interval, duration) {
	this.stageObject = object
	this.bounds = bounds
	this.spell = spell
	this.attacker = attacker
	this.interval = interval
	this.lastDamage = new Date()
	this.duration = duration
	this.createdDate = new Date()
	this.active = true

	this.update = function(event) {
		if (this.attacker.alive == false || this.active == false) {
			this.active = false
			return
		}
		if (new Date() - this.createdDate > this.duration) {
			gameStage.removeChild(this.stageObject)
			this.active = false
		} else if ((new Date() - this.lastDamage) > this.interval) {
			this.lastDamage = new Date()
			collisionTree.retrieve(this.bounds, function(collidee) {
				if (collidee.checkCollision(this.stageObject.x, this.stageObject.y, this.stageObject.radius)) {
					collidee.takeDamage(this.spell.damage, "MD", this.attacker)
				}
			}, this);
		}
	}
}

skillShotParticle = function(object, distance, speed, attacker, spell) {
	this.stageObject = object, //The object created before hand is stored here to be removed.

	this.destination = {
		x: Math.cos(this.stageObject.angle) * distance + this.stageObject.x,
		y: Math.sin(this.stageObject.angle) * distance + this.stageObject.y
	}, //When this particle is created, we count down the time to expire.
	this.particleSpeed = speed,
	this.attacker = attacker
	this.spell = spell
	this.active = true //Active or not. Duh.

	this.update = function(event) {
		if (this.attacker.alive == false || this.active == false) {
			this.active = false
			return
		}
		bounds = {
			height: this.stageObject.height,
			width: this.stageObject.width,
			x: this.stageObject.x,
			y: this.stageObject.y,
		}
		collisionTree.retrieve(bounds, function(collidee) {
			if (collidee.checkCollision(this.stageObject.x, this.stageObject.y, this.stageObject.radius)) {
				this.active = false
				this.spell.onCollision(this.stageObject, collidee, this.attacker, this)
				return
			}
		}, this);
		if (this.stageObject.x == this.destination.x && this.stageObject.y == this.destination.y) {
			this.active = false
			this.spell.onRange(object, attacker)
		} else {
			steps = (((event.delta) / 100 * this.particleSpeed) / 10)
			moveTo(this, this.destination.x, this.destination.y, steps)
		}
	}

}

textParticle = function(object, expireTime) { //This is used to draw temporary text on the Player Stage
	this.stageObject = object, //The object created before hand is stored here to be removed.
	this.appliedTime = new Date() //When this particle is created, we count down the time to expire.
	this.expires = expireTime //How many MS it takes for this effect to expire.
	this.active = true //Active or not. Duh.


	this.update = function(event) { //This is called ever time.
		if (new Date() - this.appliedTime > this.expires) { //More MS have elapsed then our expired time.
			this.active = false //No longer active.
			playerStage.removeChild(this.stageObject) //Object is removed from playerStage too
		}
	}
}

drawParticle = function(object, expireTime) { //This is used to draw temporary things on a map (Ping/spell aoe/attack AOE)
	this.stageObject = object, //The object created before hand is stored here to be removed.
	this.appliedTime = new Date() //When this particle is created, we count down the time to expire.
	this.expires = expireTime //How many MS it takes for this effect to expire.
	this.active = true //Active or not. Duh.


	this.update = function(event) { //This is called ever time.
		if (new Date() - this.appliedTime > this.expires) { //More MS have elapsed then our expired time.
			this.active = false //No longer active.
			gameStage.removeChild(this.stageObject) //Object is removed from stage too
		}
	}
}

bulletParticle = function(object, particleSpeed, target, parent) { //This created a bullet between two targets
	this.parent = parent //reference to parent that the bullet game from.
	this.stageObject = object, //
	this.particleSpeed = particleSpeed
	this.active = true
	this.destination = target

	this.update = function(event) {
		if (this.destination.alive == false || this.parent.alive == false) {
			this.active = false
			gameStage.removeChild(this.stageObject)
			return
		}
		if (this.destination.checkCollision(this.stageObject.x, this.stageObject.y, this.stageObject.radius)) {
			this.active = false
			gameStage.removeChild(this.stageObject)
			this.destination.takeDamage(this.parent.AD, "AD", this.parent)
		} else
			steps = (((event.delta) / 100 * this.particleSpeed) / 10)
		moveTo(this, this.destination.stageObject.x, this.destination.stageObject.y, steps)
	}
}