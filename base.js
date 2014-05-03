
var stage, timeCircle, tickCircle, unitList = [], colorList = ['blue', 'black', 'red', 'green', 'orange'];

function getRandom10(min, max) {
  return getRandomInt(min / 10, max / 10) * 10;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function Clone(x) {
   for(p in x)
   this[p] = (typeof(x[p]) == 'object')? new Clone(x[p]) : x[p];
}

function effect(effectAmount, effectDuration, effectType) {
	this.effectAmount = effectAmount
	this.effectDuration = effectDuration
	this.appliedTime = null;
	this.effectType = effectType
}


function unit(AD, ADPL, AP, APPL, MR, MRPL, PR, PRPL, MS, color, x, y)  {
	this.AD = AD;
	this.ADPL = ADPL;
	this.AP = AP;
	this.APPL = APPL
	this.MR = MR
	this.MRPL = MRPL
	this.PR = PR
	this.PRPL = PRPL
	this.MS = MS
	this.CMS = MS
	this.stunned = false;
	this.rooted = false;
	this.stageobject = new createjs.Shape();
	this.stageobject.graphics.beginFill(color).drawCircle(0, 0, 9);
	this.stageobject.x = x
	this.stageobject.y = y
	stage.addChild(this.stageobject);
	this.effects = [];
	this.hit = 11;


	this.move = function(event) {
		if (this.stunned) return
		if (this.rooted) return 
		this.stageobject.x = this.stageobject.x + ((event.delta)/100*this.CMS)/10;
		if (this.stageobject.x > stage.canvas.width) { this.stageobject.x = 0; }
		// if (this.CMS < this.MS) {
		// 	console.log(this.CMS)
		// }
	}

	this.applyEffect = function(x) {
		effect = new Clone(x)
		effect.appliedTime = new Date()
		if (effect.effectType == "slow") {
			this.effects.push(effect)
			this.CMS -= (effect.effectAmount/100) * this.MS

		}
		if (effect.effectType == "stun" && this.stunned == false){
			this.effects.push(effect)
			this.stunned = true
		}
		if (effect.effectType == "root" && this.rooted = false){
			this.effects.push(effect)
			this.rooted = true
		}
	}


	this.updateEffects = function(event) {
		for (var i = 0; i < this.effects.length; i++) {
			if (this.effects[i].effectType == "slow" && (new Date() - this.effects[i].appliedTime) >= this.effects[i].effectDuration) {
				this.CMS += (this.effects[i].effectAmount/100) * this.MS
				this.effects.splice(i, 1)
			}	
			if (this.effects[i].effectType == "stun" && (new Date() - this.effects[i].appliedTime) >= this.effects[i].effectDuration) {
				this.stunned = false
				this.effects.splice(i, 1)
			}
			if (this.effects[i].effectType == "root" && (new Date() - this.effects[i].appliedTime) >= this.effects[i].effectDuration) {
				this.rooted = false
				this.effects.splice(i, 1)
			}
		}
	}

	this.hitPoint = function (tX, tY) {
        return this.hitRadius(tX, tY, 0);
    }

    this.hitRadius = function (tX, tY, tHit) {
        //early returns speed it up
        if (tX - tHit > this.stageobject.x + this.hit) { return; }
        if (tX + tHit < this.stageobject.x - this.hit) { return; }
        if (tY - tHit > this.stageobject.y + this.hit) { return; }
        if (tY + tHit < this.stageobject.y - this.hit) { return; }

        //now do the circle distance test
        return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.stageobject.x - tX), 2) + Math.pow(Math.abs(this.stageobject.y - tY), 2));
    }

}

function spawnUnit(AD, ADPL, AP, APPL, MR, MRPL, PR, PRPL, MS, color, x, y) {
	blackList = []
	nodeOkay = false
    if ('undefined' === typeof x) {
    	x = 10
	}
	if ('undefined' === typeof y) {
    	y = 280
	}

	if ('undefined' === typeof color) {
    	color = getRandomInt(0,4);
    	color = colorList[color];
    	console.log(color)
	}
	for (var i = 0; i < unitList.length; i++) {
		if (unitList[i].hitRadius(x, y, 11)) {
			blackList.push(y)
			if (blackList.length >= 54) {
				x += 10
				blackList = 0
				nodeOkay = true
			} else {
				nodeOkay = false
			}
			while (nodeOkay ==  false ) {
				y = getRandom10(10, 560);
				if ($.inArray(y, blackList) === -1) {
					nodeOkay = true
				}

			}
		}
	}
	console.log(y)


	unitList[unitList.length] = new unit(AD, ADPL, AP, APPL, MR, MRPL, PR, PRPL, MS, color, x, y)
}

function init() {
	stage = new createjs.Stage("demoCanvas");

	spawnUnit(10,10,10,10,10,10,10,10,150)
	spawnUnit(10,20,30,40,50,60,70,90,150)
	// unitList.push(unit2)
	
	normalSlow = new effect(20,7000, "slow")
	normalStun = new effect(1,3000, "stun")
	
	createjs.Ticker.on("tick", gameLoop);
	createjs.Ticker.setFPS(60);


	console.log(unitList)
}

function gameLoop(event) {
	for (var i = 0; i < unitList.length; i++) {
		unitList[i].updateEffects(event)
    	unitList[i].move(event)
	}
	
	
	stage.update(event);
}
