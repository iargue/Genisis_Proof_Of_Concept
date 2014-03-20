// This is a temporary block designed to create a function for particles within the game. 
// Particles have their stage object created and then passed to this function during construction.
// The particle will expire when the number of milliseconds lasped in "expireTime" has happened.

particle = function(object, expireTime, particleSpeed, target, parent, callBack) {
	this.parent = parent
	this.stageObject = object,
	this.appliedTime = new Date()
	this.expires = expireTime
	this.active = true
	this.particleSpeed = particleSpeed || 0
	this.destination = target || false
	this.callBack = callBack || 0

	this.update = function(event) {
		if (new Date() - this.appliedTime > this.expires) {
			this.active = false
			gameStage.removeChild(this.stageObject)
		} else if (this.destination) {
			if (this.destination.checkCollision(this.stageObject.x, this.stageObject.y, this.stageObject.radius)) {
				this.active = false
				gameStage.removeChild(this.stageObject)
				if (this.callBack) {
					this.callBack(this.destination)
				}
			} else
				moveTo(this, this.destination.stageObject.x, this.destination.stageObject.y, steps)
		}

	}
}