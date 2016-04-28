function effect(effectAmount, effectDuration, effectType) {
    this.effectAmount = effectAmount
    this.effectDuration = effectDuration
    this.appliedTime = null;
    this.effectType = effectType
}



var spellList = { //Constains a list of every spell in the game, Named.
    aoeSlow: function() {
        this.icon = 'fireball',
        this.level = 0, //Level of spell
        this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600], //Damage scaling per level. Balance goes here
        this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
        this.rangePerLevel = [0, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350]
        this.effectDurationPerLevel = [0, 7000, 7500, 8000, 9000, 10000, 7000, 7000, 7000, 7000, 7000, 7000]
        this.effectAmountPerLevel = [0, 40, 50, 60, 70, 80, 80, 80, 80, 80, 80, 80]
        this.range = this.rangePerLevel[this.level]
        this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
        this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
        this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
        this.effect = new effect(this.effectAmountPerLevel[this.level], this.effectDurationPerLevel[this.level], "slow"), //Create a new effect for a 60% slow that lasts for 7 seconds
        this.effectType = "slow"
        this.cast = function(x, y, attacker) {
            if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
                console.log('Not ready')
                displayText('Spell not ready', 'colors.red')
                return false;
            }
            bounds = {
                height: 150,
                width: 150,
                x: x - 50,
                y: y - 50,
            }

            var targets = [];
            collisionTree.retrieve(bounds, function(collidee) {
                console.log(collidee)
                if (collidee.checkCollision(x, y, 100)) {
                    targets.push(collidee)
                }
            });

            object = new PIXI.Graphics().lineStyle(1, colors.black).drawCircle(x, y, 100)
            object.alpha = 0.5
            gameStage.addChild(object)
            particleList.push(new drawParticle(object, 750))

            if (targets) {
                for (var i = 0, n = targets.length; i < n; i++) {
                    var target = targets[i];
                    target.applyEffect(this.effect)
                    target.takeDamage(this.damage, 'MD', attacker)
                }
                this.currentCoolDown = new Date()
            }
        }

    },
    aoeStun: function() {
        this.icon = 'fireball',
        this.level = 0, //Level of spell
        this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600], //Damage scaling per level. Balance goes here
        this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
        this.rangePerLevel = [0, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350]
        this.effectDurationPerLevel = [0, 7000, 7500, 8000, 9000, 10000, 7000, 7000, 7000, 7000, 7000, 7000]
        this.effectAmountPerLevel = [0, 40, 50, 60, 70, 80, 80, 80, 80, 80, 80, 80]
        this.range = this.rangePerLevel[this.level]
        this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
        this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
        this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
        this.effect = new effect(this.effectAmountPerLevel[this.level], this.effectDurationPerLevel[this.level], "stun"), //Create a new effect for a 60% slow that lasts for 7 seconds
        this.effectType = "stun"
        this.cast = function(x, y, attacker) {
            if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
                displayText('Spell not ready', 'colors.red')
                return false; //Todo: Add display text
            }
            bounds = {
                height: 150,
                width: 150,
                x: x - 50,
                y: y - 50,
            }

            var targets = [];
            collisionTree.retrieve(bounds, function(collidee) {
                if (collidee.checkCollision(x, y, 100)) {
                    targets.push(collidee)
                }
            });

            object = new PIXI.Graphics().lineStyle(2, colors.black).drawCircle(x, y, 100)
            object.alpha = 0.5
            gameStage.addChild(object)
            particleList.push(new drawParticle(object, 750))

            if (targets) {
                for (var i = 0, n = targets.length; i < n; i++) {
                    var target = targets[i];
                    target.applyEffect(this.effect)
                    target.takeDamage(this.damage, 'MD', attacker)
                }
                this.currentCoolDown = new Date()
            }
        }

    },
    aoeNuke: function() {
        this.icon = 'fireball',
        this.level = 0, //Level of spell
        this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600], //Damage scaling per level. Balance goes here
        this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
        this.rangePerLevel = [0, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350]
        this.effectDurationPerLevel = [0, 7000, 7500, 8000, 9000, 10000, 7000, 7000, 7000, 7000, 7000, 7000]
        this.effectAmountPerLevel = [0, 40, 50, 60, 70, 80, 80, 80, 80, 80, 80, 80]
        this.range = this.rangePerLevel[this.level]
        this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
        this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
        this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
        this.effect = new effect(this.effectAmountPerLevel[this.level], this.effectDurationPerLevel[this.level], "slow"), //Create a new effect for a 60% slow that lasts for 7 seconds
        this.effectType = "slow"
        this.cast = function(x, y, attacker) {
            if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
                displayText('Spell not ready', 'colors.red')
                return false; //Todo: Add display text
            }
            bounds = {
                height: 150,
                width: 150,
                x: x - 50,
                y: y - 50,
            }

            var targets = [];
            collisionTree.retrieve(bounds, function(collidee) {
                if (collidee.checkCollision(x, y, 100)) {
                    targets.push(collidee)
                }
            });

            object = new PIXI.Graphics().lineStyle(2, colors.black).drawCircle(x, y, 100)
            object.alpha = 0.5
            gameStage.addChild(object)
            particleList.push(new drawParticle(object, 750))

            if (targets) {
                for (var i = 0, n = targets.length; i < n; i++) {
                    var target = targets[i];
                    target.takeDamage(this.damage, 'MD', attacker)
                }
                this.currentCoolDown = new Date()
            }
        }
    },
    nidSpear: function() {
        this.icon = 'fireball',
        this.level = 0, //Level of spell
        this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600], //Damage scaling per level. Balance goes here
        this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
        this.rangePerLevel = [0, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350]
        this.effectDurationPerLevel = [0, 7000, 7500, 8000, 9000, 10000, 7000, 7000, 7000, 7000, 7000, 7000]
        this.effectAmountPerLevel = [0, 40, 50, 60, 70, 80, 80, 80, 80, 80, 80, 80]
        this.range = this.rangePerLevel[this.level]
        this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
        this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
        this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
        this.cast = function(x, y, attacker) {
            if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
                displayText('Spell not ready', 'colors.red')
                return false; //Todo: Add display text
            }

            object = new PIXI.Graphics().lineStyle(2, colors.black).drawRect(0, 0, 10, 20)
            object.x = attacker.stageObject.x;
            object.y = attacker.stageObject.y;
            object.height = 10
            object.width = 20
            object.radius = 2 //2px from the x,y
            var angle = Math.atan2(y - attacker.stageObject.y, x - attacker.stageObject.x); //Rotation to target.
            object.angle = angle
            angle = angle * (180 / Math.PI);
            if (angle < 0) {
                angle = 360 - (-angle)
            }

            object.rotation = 90 + angle //Rotate
            gameStage.addChild(object)
            particleList.push(new skillShotParticle(object, 475, 150, attacker, this))
            this.currentCoolDown = new Date()
        }
        this.onCollision = function(object, collidee, attacker) { //Called when particle collides with a minion
            collidee.takeDamage(this.damage, 'MD', attacker) //Deal damage to target
            gameStage.removeChild(object) //Remove the "spear"
        }
        this.onRange = function(object, attacker) { //Called when particles reaches its max range
            gameStage.removeChild(object) //Since we don't do anything if range expires, we just remove the object from the stage
        }
    },
    fireBall: function() {
        this.icon = 'fireball',
        this.level = 0, //Level of spell
        this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600], //Damage scaling per level. Balance goes here
        this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
        this.rangePerLevel = [0, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350]
        this.effectDurationPerLevel = [0, 7000, 7500, 8000, 9000, 10000, 7000, 7000, 7000, 7000, 7000, 7000]
        this.effectAmountPerLevel = [0, 40, 50, 60, 70, 80, 80, 80, 80, 80, 80, 80]
        this.range = this.rangePerLevel[this.level]
        this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
        this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
        this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
        this.cast = function(x, y, attacker) {
            if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
                displayText('Spell not ready', 'colors.red')
                return false; //Todo: Add display text
            }

            object = new PIXI.Graphics().lineStyle(2, colors.red).drawCircle(0, 0, 10)
            object.x = attacker.stageObject.x;
            object.y = attacker.stageObject.y;
            object.height = 10
            object.width = 10
            object.radius = 10 //2px from the x,y
            var angle = Math.atan2(y - attacker.stageObject.y, x - attacker.stageObject.x); //Rotation to target.
            object.angle = angle
            gameStage.addChild(object)
            particleList.push(new skillShotParticle(object, 300, 225, attacker, this))
            this.currentCoolDown = new Date()
        }
        this.onCollision = function(object, collidee, attacker) { //Called when particle collides with a minion
            gameStage.removeChild(object) //Remove the "fireball"
            bounds = {
                height: 150,
                width: 150,
                x: collidee.stageObject.x - 50,
                y: collidee.stageObject.y - 50,
            }
            collidee.takeDamage(this.damage, 'MD', attacker) //Deal damage to target
            var targets = [];
            collisionTree.retrieve(bounds, function(hitTarget) {
                if (hitTarget.checkCollision(collidee.stageObject.x, collidee.stageObject.y, 50)) {
                    targets.push(hitTarget)
                }
            }, this);

            explosionObject = new PIXI.Graphics().lineStyle(2, colors.red).drawCircle(0, 0, 50)
            explosionObject.x = collidee.stageObject.x
            explosionObject.y = collidee.stageObject.y
            explosionObject.radius = 50
            gameStage.addChild(explosionObject)
            particleList.push(new drawParticle(explosionObject, 350)) //Draw Explosion to stage.

            if (targets) {
                for (var i = 0, n = targets.length; i < n; i++) {
                    var target = targets[i];
                    target.takeDamage(this.damage * (50 / 100), 'MD', attacker)
                }
            }
        }
        this.onRange = function(object, attacker) { //Called when particles reaches its max range
            gameStage.removeChild(object)
            bounds = {
                height: 150,
                width: 150,
                x: object.x - 50,
                y: object.y - 50,
            }
            var targets = [];
            collisionTree.retrieve(bounds, function(hitTarget) {
                if (hitTarget.checkCollision(object.x, object.y, 50)) {
                    targets.push(hitTarget)
                }
            }, this);

            explosionObject = new PIXI.Graphics().lineStyle(2, colors.red).drawCircle(0, 0, 50)
            explosionObject.x = object.x
            explosionObject.y = object.y
            explosionObject.radius = 50
            gameStage.addChild(explosionObject)
            particleList.push(new drawParticle(explosionObject, 350)) //Draw Explosion to stage.

            if (targets) {
                for (var i = 0, n = targets.length; i < n; i++) {
                    var target = targets[i];
                    target.takeDamage(this.damage * (50 / 100), 'MD', attacker)
                }
            }
        }
    },
    iceBall: function() {
        this.icon = 'fireball',
        this.level = 0, //Level of spell
        this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600], //Damage scaling per level. Balance goes here
        this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
        this.rangePerLevel = [0, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350]
        this.effectDurationPerLevel = [0, 7000, 7500, 8000, 9000, 10000, 7000, 7000, 7000, 7000, 7000, 7000]
        this.effectAmountPerLevel = [0, 40, 50, 60, 70, 80, 80, 80, 80, 80, 80, 80]
        this.range = this.rangePerLevel[this.level]
        this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
        this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
        this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
        this.cast = function(x, y, attacker) {
            if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
                displayText('Spell not ready', 'colors.red')
                return false; //Todo: Add display text
            }

            object = new PIXI.Graphics().lineStyle(2, colors.blue).drawCircle(0, 0, 10)
            object.x = attacker.stageObject.x;
            object.y = attacker.stageObject.y;
            object.height = 10
            object.width = 10
            object.radius = 10 //2px from the x,y
            var angle = Math.atan2(y - attacker.stageObject.y, x - attacker.stageObject.x); //Rotation to target.
            object.angle = angle
            gameStage.addChild(object)
            particleList.push(new skillShotParticle(object, 500, 100, attacker, this))
            this.currentCoolDown = new Date()
        }
        this.onCollision = function(object, collidee, attacker) { //Called when particle collides with a minion
            gameStage.removeChild(object) //Remove the "fireball"
            collidee.takeDamage(this.damage, 'MD', attacker) //Deal damage to target

            shard = {
                damage: this.damage,
                onCollision: function(object, collidee, attacker, particle) {
                    if (collidee.alive == false) {
                        particle.active = true
                        particleList.push(particle)
                        return
                    }
                    gameStage.removeChild(object)
                    collidee.takeDamage(this.damage * (50 / 100), 'MD', attacker)

                },
                onRange: function(object, attacker) {
                    gameStage.removeChild(object)
                }

            }

            for (var i = 1; i < 9; i++) {
                explosionObject = new PIXI.Graphics().setStrokeStyle(2).beginFill(colors.blue).drawRect(0, 0, 5, 10)
                explosionObject.x = object.x
                explosionObject.y = object.y
                explosionObject.height = 5
                explosionObject.width = 5
                explosionObject.radius = 2
                explosionObject.angle = (45 * i) * Math.PI / 180
                explosionObject.rotation = explosionObject.angle * 180 / Math.PI
                gameStage.addChild(explosionObject)
                particleList.push(new skillShotParticle(explosionObject, 50, 100, attacker, shard))
            }

        },
        this.onRange = function(object, attacker) { //Called when particles reaches its max range
            gameStage.removeChild(object) //Remove the "fireball"
            shard = {
                damage: this.damage,
                onCollision: function(object, collidee, attacker, particle) {
                    if (collidee.alive == false) {
                        particle.active = true
                        particleList.push(particle)
                        return
                    }
                    collidee.takeDamage(this.damage * (50 / 100), 'MD', attacker)

                    gameStage.removeChild(object)
                },
                onRange: function(object, attacker) {
                    gameStage.removeChild(object)
                }

            }

            for (var i = 1; i < 9; i++) {
                explosionObject = new PIXI.Graphics().setStrokeStyle(2).beginFill(colors.blue).drawRect(0, 0, 5, 10)
                explosionObject.x = object.x
                explosionObject.y = object.y
                explosionObject.height = 5
                explosionObject.width = 5
                explosionObject.radius = 2
                explosionObject.angle = (45 * i) * Math.PI / 180
                explosionObject.rotation = explosionObject.angle * 180 / Math.PI
                gameStage.addChild(explosionObject)
                particleList.push(new skillShotParticle(explosionObject, 50, 100, attacker, shard))
            }
        }
    },
    arcLightening: function() {
        this.icon = 'fireball',
        this.level = 0, //Level of spell
        this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600], //Damage scaling per level. Balance goes here
        this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
        this.rangePerLevel = [0, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350]
        this.effectDurationPerLevel = [0, 7000, 7500, 8000, 9000, 10000, 7000, 7000, 7000, 7000, 7000, 7000]
        this.effectAmountPerLevel = [0, 40, 50, 60, 70, 80, 80, 80, 80, 80, 80, 80]
        this.chainsPerLevel = [0, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6]
        this.range = this.rangePerLevel[this.level]
        this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
        this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
        this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
        this.cast = function(x, y, attacker) {
            if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
                displayText('Spell not ready', 'colors.red')
                return false; //Todo: Add display text
            }

            bounds = { //Creates the size of the spell.
                height: 250,
                width: 250,
                x: x - 250,
                y: y - 250,
            }

            var targets = []; //Creates a blanket target object.
            collisionTree.retrieve(bounds, function(collidee) { //Get every object that collides with our target spell
                targets.push(collidee);
            });
            var initialTarget;
            console.log(targets)
            for (var target in targets) {
                if (targets[target].checkCollision(x, y, 9)) {
                    initialTarget = targets[target]
                    break
                }
            }
            if (initialTarget) {
                this.currentCoolDown = new Date() // Set spell on CD
                object =new PIXI.Graphics().lineStyle(2).moveTo(attacker.stageObject.x, attacker.stageObject.y).lineStyle(2, colors.yellow).lineTo(x, y)
                gameStage.addChild(object)
                particleList.push(new drawParticle(object, 120))
                initialTarget.takeDamage(this.damage, 'MD', attacker) //Deal damage
                lastTarget = initialTarget;
                for (var i = 0; i < this.chainsPerLevel[this.level]; i++) {
                    var newTarget;
                    for (var n = 0; n < targets.length; n++) {
                        if (targets[n] == lastTarget || targets[n] == initialTarget) {
                            continue
                        }
                        if (distance(lastTarget, targets[n]) < 100) { //Target is in range
                            console.log(targets[n])
                            newTarget = targets[n]; //This is who we are attacking now
                            break;
                        }
                    }
                    if (newTarget) { //If we did end up with a new target
                        newTarget.takeDamage(this.damage * (50 / 100), 'MD', attacker) //Deal damage
                        object = new PIXI.Graphics().graphics.lineStyle(2).moveTo(lastTarget.stageObject.x, lastTarget.stageObject.y).lineStyle(2, colors.yellow).lineTo(x, y)
                        gameStage.addChild(object)
                        particleList.push(new drawParticle(object, 120))
                        lastTarget = newTarget
                    }
                }
            }
        }
    },
    coneFire: function() {
        this.icon = 'fireball',
        this.level = 0, //Level of spell
        this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600], //Damage scaling per level. Balance goes here
        this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
        this.rangePerLevel = [0, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350]
        this.effectDurationPerLevel = [0, 7000, 7500, 8000, 9000, 10000, 7000, 7000, 7000, 7000, 7000, 7000]
        this.effectAmountPerLevel = [0, 40, 50, 60, 70, 80, 80, 80, 80, 80, 80, 80]
        this.range = this.rangePerLevel[this.level]
        this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
        this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
        this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
        this.cast = function(x, y, attacker) {
            if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
                displayText('Spell not ready', 'colors.red')
                return false; //Todo: Add display text
            }

            bounds = { //Creates the size of the spell.
                height: 350,
                width: 350,
                x: x - 150,
                y: y - 150,
            }

            var targets = []; //Creates a blanket target object.
            collisionTree.retrieve(bounds, function(collidee) { //Get every object that collides with our target spell
                targets.push(collidee);
            });

            var angle = Math.atan2(y - attacker.stageObject.y, x - attacker.stageObject.x); //Find the angle of the mouseclick from the person.

            destination = { //This is the upper point of our triangle. 150 units from the hero
                x: Math.cos(angle + (30 * Math.PI / 180)) * 150 + attacker.stageObject.x,
                y: Math.sin(angle + (30 * Math.PI / 180)) * 150 + attacker.stageObject.y
            }
            destination2 = { // This is the lower point of our triangle. 150 units from the hero.
                x: Math.cos(angle - (30 * Math.PI / 180)) * 150 + attacker.stageObject.x,
                y: Math.sin(angle - (30 * Math.PI / 180)) * 150 + attacker.stageObject.y
            }
            object = new PIXI.Graphics().lineStyle(1, colors.black).moveTo(attacker.stageObject.x, attacker.stageObject.y).lineTo(destination.x, destination.y).lineTo(destination2.x, destination2.y).closePath()
            //The above object draws a triangle between every point.
            gameStage.addChild(object)
            particleList.push(new drawParticle(object, 350)) //Creates the temporary particle for 350 seconds for the spell.
            if (targets) { //If we did have collision with something.
                for (var i = 0, n = targets.length; i < n; i++) { //Loop through our targets.
                    var target = targets[i];
                    if (isInTriangle(target.stageObject.x, target.stageObject.y, destination.x, destination.y, destination2.x, destination2.y, attacker.stageObject.x, attacker.stageObject.y)) {
                        //Our targets x,y are inside of the triangle (Could be improved. Waiting on sprites to add full object collision)
                        target.takeDamage(this.damage, 'MD', attacker) //Deal damage
                    }
                }
                this.currentCoolDown = new Date() // Set our cooldown
            }
        }
    },
    damageOverTime: function() {
        this.icon = 'fireball',
        this.level = 0, //Level of spell
        this.damagePerLevel = [0, 11, 15, 25, 30, 38, 47, 49, 55, 61, 68], //Damage scaling per level. Balance goes here
        this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
        this.rangePerLevel = [0, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350]
        this.effectDurationPerLevel = [0, 7000, 7500, 8000, 9000, 10000, 7000, 7000, 7000, 7000, 7000, 7000]
        this.effectAmountPerLevel = [0, 40, 50, 60, 70, 80, 80, 80, 80, 80, 80, 80]
        this.range = this.rangePerLevel[this.level]
        this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
        this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
        this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
        this.cast = function(x, y, attacker) {
            if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
                displayText('Spell not ready', 'colors.red')
                return false; //Todo: Add display text
            }

            bounds = { //Creates the size of the spell.
                height: 350,
                width: 350,
                x: x - 150,
                y: y - 150,
            }

            var targets = []; //Creates a blanket target object.
            collisionTree.retrieve(bounds, function(collidee) { //Get every object that collides with our target spell
                if (collidee.checkCollision(x, y, 100)) {
                    targets.push(collidee)
                }
            });

            object = new PIXI.Graphics().lineStyle(1, colors.black).drawCircle(0, 0, 100)
            object.x = x
            object.y = y
            object.alpha = 0.5
            object.radius = 100
            gameStage.addChild(object)
            particleList.push(new damageOverTimeParticle(object, bounds, this, attacker, 250, 2500))

            if (targets) {
                for (var i = 0, n = targets.length; i < n; i++) {
                    var target = targets[i];
                    target.takeDamage(this.damage, 'MD', attacker)
                }
                this.currentCoolDown = new Date()
            }
        }
    },
    cupcakeTrap: function() {
        this.icon = 'fireball',
        this.level = 0, //Level of spell
        this.damagePerLevel = [0, 11, 15, 25, 30, 38, 47, 49, 55, 61, 68], //Damage scaling per level. Balance goes here
        this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
        this.rangePerLevel = [0, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350]
        this.effectDurationPerLevel = [0, 7000, 7500, 8000, 9000, 10000, 7000, 7000, 7000, 7000, 7000, 7000]
        this.effectAmountPerLevel = [0, 40, 50, 60, 70, 80, 80, 80, 80, 80, 80, 80]
        this.range = this.rangePerLevel[this.level]
        this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
        this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
        this.effect = new effect(this.effectAmountPerLevel[this.level], this.effectDurationPerLevel[this.level], "stun"),
        this.effectType = "stun"
        this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
        this.cast = function(x, y, attacker) {
            if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
                displayText('Spell not ready', 'colors.red')
                return false; //Todo: Add display text
            }

            bounds = { //Creates the size of the spell.
                height: 25,
                width: 25,
                x: x - 10,
                y: y - 10,
            }

            var targets = []; //Creates a blanket target object.
            collisionTree.retrieve(bounds, function(collidee) { //Get every object that collides with our target spell
                if (collidee.checkCollision(x, y, 16)) {
                    targets.push(collidee)
                }
            });

            object = new PIXI.Graphics().lineStyle(1, colors.black).drawCircle(0, 0, 16)
            object.x = x
            object.y = y
            object.radius = 16
            gameStage.addChild(object)
            particleList.push(new trapParticle(object, bounds, this, attacker, 95000, this.effect))
        }
    },
    chainLightening: function() {
        this.icon = 'fireball',
        this.level = 0, //Level of spell
        this.damagePerLevel = [0, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600], //Damage scaling per level. Balance goes here
        this.coolDownPerLevel = [0, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 900], //Cooldown scaling per level. Balance goes here
        this.rangePerLevel = [0, 150, 160, 170, 180, 190, 200, 210, 215, 220, 225, 250]
        this.effectAmountPerLevel = [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6]
        this.range = this.rangePerLevel[this.level]
        this.damage = this.damagePerLevel[this.level], //Current damage based on level of spell
        this.coolDown = this.coolDownPerLevel[this.level], //Current cooldown based on level of spell
        this.currentCoolDown = 9999999, //Set this to a high number so next new date() check will pass.
        this.cast = function(x, y, attacker) {
            if (new Date() - this.currentCoolDown < this.coolDown || this.level == 0) {
                displayText('Spell not ready', 'colors.red')
                return false; //Todo: Add display text
            }
            var range = this.rangePerLevel[this.level]
            var bounds = {
                height: range * 2,
                width: range * 2,
                x: x - (range / 2),
                y: y - (range / 2),
            }

            var targets = [];
            collisionTree.retrieve(bounds, function(collidee) {
                if (collidee.checkCollision(x, y, 5)) {
                    targets.push(collidee)
                    return
                }

            });

            if (targets[0] == undefined) {
                displayText('Invalid Target', 'colors.red')
                return false;
            }

            this.currentCoolDown = new Date();
            targets[0].takeDamage(this.damagePerLevel[this.level], "MD", attacker)

            for (var i = 1; i < this.effectAmountPerLevel[this.level]; i++) {
            	console.log(targets[i])
                bounds = {
                	height: range * 2,
                	width: range * 2,
                	x: targets[i-1].stageObject.x - (range / 2),
                	y: targets[i-1].stageObject.y - (range / 2),
            	}
            	collisionTree.retrieve(bounds, function(collidee) {
                	if (targets.indexOf(collidee) == -1 && (distance(collidee, targets[i-1]) <= range)) {
                	    targets[i] = collidee
                	    return
                	}
            	});
           		if (targets[i] == undefined) {
           			return
           		}
            }


            object = new PIXI.Graphics().lineStyle(1, colors.blue).moveTo(targets[0].stageObject.x, targets[0].stageObject.y)
            
            for (var i = 1; i < targets.length; i++) {
                console.log(object)
				targets[i].takeDamage(this.damagePerLevel[this.level], "MD", attacker)
				object.lineTo(targets[i].stageObject.x, targets[i].stageObject.y)
            }

         
         	gameStage.addChild(object)
            particleList.push(new drawParticle(object, 150))
        }

    }
}