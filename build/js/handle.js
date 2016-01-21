function handleMouse(e) {
	offsetX = window.innerWidth * 0.05
	offsetY = window.innerHeight * 0.05
	if (e.pageY >= (window.innerHeight - (window.innerHeight * 0.2)) - offsetY) {
		if (e.pageY + 1 < (window.innerHeight - (window.innerHeight * 0.2))) {
			scrollDown = true
			scrollUp = false
		} else {
			scrollUp = false
			scrollDown = false
		}
	} else if (e.pageY < offsetY) {
		scrollUp = true
		scrollDown = false
	} else {
		scrollUp = false
		scrollDown = false
	}
	if (e.pageX >= window.innerWidth - offsetX) {
		scrollRight = true
		scrollLeft = false
	} else if (e.pageX < offsetX) {
		scrollLeft = true
		scrollRight = false
	} else {
		scrollLeft = false
		scrollRight = false
	}
}

function handleKeyDown(e) {
	if (e.shiftKey) {
		activePlayer.hero.levelSpell(e.keyCode)
	} else {
		switch (e.keyCode) {
			case 40:
				if (gameStage.pivot.y + renderer.height < gameHeight) {
					gameStage.pivot.y += 10
				} else {
					gameStage.pivot.y = gameHeight - renderer.height
				}
				break;
			case 39: // Right arrow key
				if (gameStage.pivot.x + renderer.width < gameWidth) {
					gameStage.pivot.x += 10
				} else {
					gameStage.pivot.x = gameWidth - renderer.width
				}
				break;
			case 38: //Up arrow key
				if (gameStage.pivot.y > 0) {
					gameStage.pivot.y -= 10
				} else {
					gameStage.pivot.y = 0
				}
				break;
			case 37: // Left arrow key
				if (gameStage.pivot.x > 0) {
					gameStage.pivot.x -= 10
				} else {
					gameStage.pivot.x = 0
				}
				break;
			case 49:
				spawnUnit(0, 0);
				break;
			case 50:
				spawnUnit(1, 0);
				break;
			case 51:
				spawnUnit(2, 0);
				break;
			case 52:
				spawnUnit(3, 0);
				break;
			case 53:
				spawnUnit(4, 0);
				break;
			case 65:
				spawnUnit(5, 0);
				break;
			case 83:
				spawnUnit(6, 0);
				break;
			case 68:
				spawnUnit(7, 0);
				break;
			case 70:
				spawnUnit(8, 0);
				break;
			case 71:
				spawnUnit(9, 0);
				break;
			default:
				activePlayer.hero.castSpell(e.keyCode);
		}

		playerBorder.x = gameStage.pivot.x / miniMapRatio.width
		playerBorder.y = gameStage.pivot.y / miniMapRatio.height
	}
}

function miniMapClick(event) {
	if (playerBar.mouseInBounds == true && event.nativeEvent.which == 1) {
		point = {
			x: (event.localX * miniMapRatio.width) - (renderer.width / 2),
			y: (event.localY * miniMapRatio.height) - (renderer.height / 2),
		}
		if (point.x < 0) {
			point.x = 0
		} else if (point.x > (gameWidth - renderer.width)) {
			point.x = (gameWidth - renderer.width)
		}
		if (point.y < 0) {
			point.y = 0
		} else if (point.y > (gameHeight - renderer.height)) {
			point.y = (gameHeight - renderer.height)
		}

		gameStage.pivot.x = point.x;
		gameStage.pivot.y = point.y;

		playerBorder.x = gameStage.pivot.x / miniMapRatio.width;
		playerBorder.y = gameStage.pivot.y / miniMapRatio.height;
	}
	scrollDown = false
	scrollUp = false
	scrollLeft = false
	scrollRight = false
	if (playerBar.mouseInBounds == true && event.nativeEvent.which == 3) {
		castActive = false;
		activePlayer.hero.updateWaypoint(event, true);
	}
}

function handleClick(event) {
	if (playerStage.mouseInBounds == true && event.nativeEvent.which == 3) {
		castActive = false;
		activePlayer.hero.updateWaypoint(event);
	}
	if (castActive) {
		if (playerStage.mouseInBounds) { //Make sure they were in the canvas to actully cast a spell
			var point = gameStage.globalToLocal(playerStage.mouseX, playerStage.mouseY);
			activePlayer.hero.spells[castActive].cast(point.x, point.y, activePlayer.hero)
			castActive = false;
		} else {
			castActive = false;
		}
	}
}

function updateSpells(event) {
	for (var spell in activePlayer.hero.spells) { //Lets loop through all of the currently free spells
		var spellObject = activePlayer.hero.spells[spell] //Store a reference to the current spell
		percentage = ((new Date() - spellObject.currentCoolDown) / spellObject.coolDown)
		if (percentage > 1) {
			percentage = 1
		}
		if (spellObject.level == 0) {
			percentage = 0.1
		}
		if (activePlayer.hero.spellLevels > 0) {
			if ((activePlayer.hero.level / 3) >= spellObject.level) {
				spellButtons[spell].addChild(spellButtons[spell].levelButton)
			} else {
				spellButtons[spell].removeChild(spellButtons[spell].levelButton)
			}
		} else {
			spellButtons[spell].removeChild(spellButtons[spell].levelButton)
		}
		spellButtons[spell].button.alpha = percentage
		cacheItem(spellButtons[spell])
	}
}


function edgeScrolling(event) {
	if (scrollDown) {
		if (gameStage.pivot.y + (renderer.height - (renderer.height * 0.2)) > gameHeight) {
			gameStage.pivot.y = gameHeight - (renderer.height - (renderer.height * 0.2))
		} else if (gameStage.pivot.y + (renderer.height - (renderer.height * 0.2)) < gameHeight) {
			gameStage.pivot.y += gameHeight * 0.01
		}
	}
	if (scrollRight) {
		if(gameStage.pivot.x + renderer.width > gameWidth) {
			// If we have scrolled out of range put us back
			gameStage.pivot.x = gameWidth - renderer.width;
		} else if (gameStage.pivot.x + renderer.width < gameWidth) {
			gameStage.pivot.x += gameWidth * 0.01
		}
	}
	if (scrollUp) {
		if (gameStage.pivot.y < 0) {
			gameStage.pivot.y = 0
		} else if (gameStage.pivot.y > 0) {
			gameStage.pivot.y -= gameHeight * 0.01
		}

	}
	if (scrollLeft) {
		if (gameStage.pivot.x < 0) {
			gameStage.pivot.x = 0
		} else if (gameStage.pivot.x > 0) {
			gameStage.pivot.x -= gameWidth * 0.01
		}
	}
	//MARKED
	// playerBorder.x = gameStage.pivot.x / miniMapRatio.width
	// playerBorder.y = gameStage.pivot.y / miniMapRatio.height
}

function updateCollisionTree(event) {
	collisionTree.clear();
	for (var team in teamList) {
		for (var unit in teamList[team].unitList) {
			collisionTree.insert(teamList[team].unitList[unit])
		}
	}
}

function changeDisplay(event) {
	if (event.currentTarget.monsterReference) {
		updateInfoBar('monster', event.currentTarget.monsterReference)
	} else if (event.currentTarget.heroReference) {
		updateInfoBar('hero', event.currentTarget.heroReference)
	}
}

/*function monsterClick(event) { //Called when a Monster button is clicked.
	spawnUnit(event.target.monsterId) //Spawn the unit related to that button. This value is stored when the button is first created in updateMonsterBar
}*/

function spellClick(event) { //Called when a Monster button is clicked.
	castActive = event.target.spellId
}

function levelClick(event) { //Called when a Monster button is clicked.
	castActive = false
	levelSpell(activePlayer.hero, event.target.parent.button.spellId)
}

function itemClick(event) {
	updateInfoBar('item', event.target.item)
}

function endGame(loser) {
	console.log(Loser + ' Has lost this game. Sucker')
}

var leftSwaps = document.getElementsByClassName('leftSwap');
var leftPads = document.getElementsByClassName('leftPad');
function leftSwapClick() {
	if(leftSwaps[0].classList.contains('hide')) {
		leftSwaps[1].className += ' hide';
		leftSwaps[0].className = 'leftSwap';
		leftPads[1].className += ' hide';
		leftPads[0].className = 'leftPad';
	} else {
		leftSwaps[0].className += ' hide';
		leftSwaps[1].className = 'leftSwap';
		leftPads[0].className += ' hide';
		leftPads[1].className = 'leftPad';
	}
}

var rightSwaps = document.getElementsByClassName('rightSwap');
var rightPads = document.getElementsByClassName('rightPad');
function rightSwapClick() {
	if(rightSwaps[0].classList.contains('hide')) {
		rightSwaps[1].className += ' hide';
		rightSwaps[0].className = 'rightSwap';
		rightPads[1].className += ' hide';
		rightPads[0].className = 'rightPad';
	} else {
		rightSwaps[0].className += ' hide';
		rightSwaps[1].className = 'rightSwap';
		rightPads[0].className += ' hide';
		rightPads[1].className = 'rightPad';
	}
}