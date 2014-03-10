function player(playerNumber, active) {	
	this.stage = new createjs.Stage("player" + playerNumber + "Canvas"),
	this.unitList = [],
	this.hero = {},
	this.points = 1000,
	this.team = playerNumber,
	this.activePlayer = active
}

function effect(effectAmount, effectDuration, effectType) {
	this.effectAmount = effectAmount
	this.effectDuration = effectDuration
	this.appliedTime = null;
	this.effectType = effectType
}