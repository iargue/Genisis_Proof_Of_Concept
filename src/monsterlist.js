var monsterList = [{
	stats: {
		AD: 5,
		HP: 5,
		MP: 5,
		MD: 5,
		MR: 5,
		AR: 5,
		MS: 20,
		RN: 10,
		AS: 10,
	},
	color: "black",
	experience: 10,
	cost: 1,
},{
	stats: {
		AD: 5,
		HP: 5,
		MP: 5,
		MD: 5,
		MR: 5,
		AR: 5,
		MS: 10,
		RN: 15,
		AS: 15,
	},
	color: "blue",
	experience: 10,
	cost: 1,
},{
	stats: {
		AD: 5,
		HP: 5,
		MP: 5,
		MD: 5,
		MR: 5,
		AR: 5,
		MS: 15,
		RN: 20,
		AS: 5,
	},
	color: "orange",
	experience: 10,
	cost: 1,
},{
	stats: {
		AD: 5,
		HP: 5,
		MP: 5,
		MD: 5,
		MR: 5,
		AR: 5,
		MS: 5,
		RN: 5,
		AS: 10,
	},
	color: "red",
	experience: 10,
	cost: 1,
} ];


//10 enemies per battle group. Tenth is commander who upgrades creeps to next creep
//Battle group 0 is 40 start, group 1 is 50, group 2 is 65, group 3 is 80, group 4 is 100