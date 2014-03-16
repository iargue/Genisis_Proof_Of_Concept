// This is a temporary block designed to create a function for particles within the game. 
// Particles have their stage object created and then passed to this function during construction.
// The particle will expire when the number of milliseconds lasped in "expireTime" has happened.

particle = function(object, expireTime) {
	this.stageObject = object,
	this.appliedTime = new Date()
	this.expires = expireTime
	this.active = true

	this.update = function(event) {
		if (new Date() -this.appliedTime > this.expires) {
			this.active = false
		}
	}
}