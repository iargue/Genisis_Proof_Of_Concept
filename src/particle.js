// This JS file will contain every particle effect. We can create multiple particle effects to handle different objects
// but every particle effect must have a stageOjbect, and every particle must have na update function to be called. All Particle 
// must also have this.active called in them to track if they are still active.


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
			console.log(steps)
			moveTo(this, this.destination.stageObject.x, this.destination.stageObject.y, steps)
	}
}