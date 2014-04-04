var heroList = {
	warrior: {
		stats: {
			AD: 30,
			HP: 55,
			MP: 5,
			MD: 5,
			MR: 5,
			AR: 50,
			MS: 11,
			RN: 15,
			AS: 10,
		},
		color: "green",
		imageName: 'warrior',
		frames: {
			width: 64,
			height: 64,
			regX: 32,
			regY: 32,
		},
		animations: {
			walk: [0, 9, true],
			die: [10, 21, false],
			jump: [22, 32],
			celebrate: [33, 43],
			idle: [44, 44]
		},
	},
	archer: {
		stats: {
			AD: 30,
			HP: 55,
			MP: 5,
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
			MP: 5,
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