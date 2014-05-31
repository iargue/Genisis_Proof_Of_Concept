itemStats = [
	'AD',
	'MD',
	'AR',
	'MR',
	'HP',
	'MS',
	'AS',
	'RN'
],

itemList = [{
		//Item Id 0
		name: 'Dagger',
		stats: {
			AD: 15
		},
		icon: {
			base: 'shop',
			top: 42,
			left: 320,
			height: 42,
			width: 42,
		},
		cost: 15,
		unique: false
	}, {
		//Item Id 1
		name: 'Magic Page',
		stats: {
			MD: 10
		},
		icon: {
			base: 'shop',
			top: 42,
			left: 320,
			height: 42,
			width: 42,
		},
		cost: 12,
		unique: false
	}, {
		//Item Id 2
		name: 'Duel Daggers',
		stats: {
			AD: 30,
			AS: 20
		},
		icon: {
			base: 'shop',
			top: 42,
			left: 320,
			height: 42,
			width: 42,
		},
		//Requires A Dagger first
		required: [0],
		cost: 60,
		unique: true
	},{
		//Item Id 3
		name: 'Two daggers with Posion',
		stats: {
			AD: 100,
			AS: 50
		},
		icon: {
			base: 'shop',
			top: 42,
			left: 320,
			height: 42,
			width: 42,
		},
		//Requires Dual Daggers to upgrade
		required: [2],
		cost: 120,
		unique: true
	},{
		//Item Id 4
		name: 'Magic Book',
		stats: {
			MD: 100,
			MR: 10
		},
		icon: {
			base: 'shop',
			top: 42,
			left: 320,
			height: 42,
			width: 42,
		},
		//Requires 4 Magic Pages to make a Magic Book (Obviously)
		required: [1,1,1,1],
		cost: 60,
		unique: true
	},{
		//Item Id 5
		name: 'Triangle Shield',
		stats: {
			AR: 5,
		},
		icon: {
			base: 'shop',
			top: 42,
			left: 320,
			height: 42,
			width: 42,
		},
		cost: 25,
		unique: true
	},{
		//Item Id 6
		name: 'Triangle Shield with extra wood',
		stats: {
			AR: 15
		},
		icon: {
			base: 'shop',
			top: 42,
			left: 320,
			height: 42,
			width: 42,
		},
		//Requires a Triangle shield before you can add wood to it.
		requires: [5],
		cost: 25,
		unique: true
	},{
		//Item Id 7
		name: 'Kite shield',
		stats: {
			AR: 40,
		},
		icon: {
			base: 'shop',
			top: 42,
			left: 320,
			height: 42,
			width: 42,
		},
		//Requires a Triangle shield AND a triangle shield with extra wood.
		requires: [5,6],
		cost: 75,
		unique: true
	},{
		//Item Id 8
		name: 'Longsword',
		stats: {
			AD: 25
		},
		icon: {
			base: 'shop',
			top: 42,
			left: 320,
			height: 42,
			width: 42,
		},
		//Requires a Dagger
		requires: [0],
		cost: 45,
		unique: true
	},{
		//Item Id 9
		name: 'DeathStick',
		stats: {
			AD: 45,
			AS: 25,
			MS: 5
		},
		icon: {
			base: 'shop',
			top: 42,
			left: 320,
			height: 42,
			width: 42,
		},
		//Requires a Longsword and Dual Daggers
		requires: [0, 2],
		cost: 99,
		unique: true
	},{
		//Item Id 10
		name: 'Magic Wand',
		stats: {
			MD: 25,
		},
		icon: {
			base: 'shop',
			top: 42,
			left: 320,
			height: 42,
			width: 42,
		},
		cost: 60,
		unique: true
	},{
		//Item Id 11
		name: 'Extended Magic Wand',
		stats: {
			MD: 75,
		},
		icon: {
			base: 'shop',
			top: 42,
			left: 320,
			height: 42,
			width: 42,
		},
		//Requires that you have a magic wand before you extend it.
		requires: [10],
		cost: 100,
		unique: true
	},{
		//Item Id 10
		name: 'Overcompensating Magic Wand',
		stats: {
			MD: 120,
		},
		icon: {
			base: 'shop',
			top: 42,
			left: 320,
			height: 42,
			width: 42,
		},
		//Requires an Extended Magic Wand.
		requires: [11],
		cost: 75,
		unique: true
	}
]