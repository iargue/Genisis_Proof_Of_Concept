function team(teamNumber) {
	this.playerList = [],
	this.unitList = [],
	this.points = 1000,
	this.side = teamNumber,
	this.teamPortal = {
		x: 1950,
		y: 500
	}

	this.addPlayer = function(playerNumber, active, heroName, heroSpells) {
		player = new player(this, active)
		player.hero = new hero(heroList[heroName], heroSpells, 450, 450, player)
		this.playerList.push(player)
		spawnHero(player.hero, this.side)
		
	}

	this.removePoints = function(pointsLost) {
		this.points -= pointsLost
		if (this.points <= 0) {
			this.endGame(this.side)
		}
	}
}

function player(team, active) {
	this.team = team
	this.hero = {},
	this.activePlayer = active
	if (active) {
		activePlayer = this
	}
}