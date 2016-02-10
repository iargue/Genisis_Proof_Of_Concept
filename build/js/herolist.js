var heroList = {
	warrior: {
		stats: {
			AD: 30,
			MD: 10,
			AR: 50,
			MR: 5,
			HP: 55,
			MS: 11,
			AS: 10,
			RN: 15,

		},
		animations: {
			walk: ["warriorWalk_1.png","warriorWalk_2.png","warriorWalk_3.png","warriorWalk_4.png","warriorWalk_5.png","warriorWalk_6.png","warriorWalk_7.png","warriorWalk_8.png","warriorWalk_9.png","warriorWalk_10.png"],
			die: [10, 21, false],
			jump: [22, 32],
			celebrate: [33, 43],
			idle: ["warriorIdle_1.png"]
		},
	},
	archer: {
		stats: {
			AD: 30,
			HP: 55,
			MD: 5,
			MR: 5,
			AR: 5,
			MS: 11,
			RN: 15,
			AS: 10,
		},
		color: "red",
	},
	mage: {
		stats: {
			AD: 30,
			HP: 55,
			MD: 5,
			MR: 5,
			AR: 5,
			MS: 11,
			RN: 15,
			AS: 10,
		},
		color: "blue",
	}
}