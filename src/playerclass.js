function team(teamNumber) {
	this.playerList = [],
	this.unitList = [],
	this.points = 1000,
	this.side = teamNumber,

	this.addPlayer = function(playerNumber, active, heroName, heroSpells) {
		player = new player(this, active, this)
		player.hero = new hero(heroList[heroName], heroSpells, 450, 450, player)
		this.playerList.push(player)
	}

	this.removePoints = function(pointsLost) {
		this.points -= pointsLost
		if (this.points <= 0) {
			this.endGame(this.side)
		}
	}
}

function player(team, active, team) {	
	this.team = team
	this.hero = {},
	this.team = team,
	this.activePlayer = active
	if (active) {
		activePlayer = this
	}
}

