var

matchMaking = {
    key: null,
    bf: null,
    token: null,
    gameToken: null,
    matchToken: null,
    login: {},
    register: {},
    matchmaking: {},
    cipherLogin: null,
    cipherRegister: null,
    cipherMatchmaking: null,
    cipherMatch: null,
    gameData: null,
    latency: null,
    userData: {},
    server: "http://api.raedixgames.com",


    initialize: function() {
        jQuery.ajaxSetup({
            async: false
        });

        var dataObject = {
            data: new Date()
        }

        $.post(this.server + "/requestkey", {
            data: dataObject
        })
            .done(function(data) {
                console.log(data.key);
                matchMaking.bf = new Blowfish(data.key);
            }, 'json');

        return matchMaking;
    },

    setLogin: function(username, password, gameid) {
        this.login.username = username
        this.login.password = password
        this.login.gameid = gameid

        this.cipherLogin = this.bf.encrypt(JSON.stringify(this.login));

        this.login = {};
        this.userData.username = username

        return matchMaking;
    },

    setRegister: function(username, email, password) {
        this.register.username = username;
        this.register.email = email;
        this.register.password = password;

        this.cipherRegister = this.bf.encrypt(JSON.stringify(this.register));

        this.register = {};

        return matchMaking;
    },

    setMatchmaking: function(gameid, numPlayers) {
        this.matchmaking.token = this.token;
        this.matchmaking.gameid = gameid;
        this.matchmaking.numberplayers = numPlayers;

        this.cipherMatchmaking = this.bf.encrypt(JSON.stringify(this.matchmaking));

        return matchMaking;
    },

    sendLogin: function() {
        $.post(this.server + "/login", {
            encdata: this.cipherLogin
        })
            .done(function(data) {
                data = matchMaking.bf.decrypt(data.encdata); // decrypts encdata and makes it the default data object
                try {
                    data = JSON.parse(data)
                } catch (err) {
                    data += '}'
                    data = JSON.parse(data)
                }
                if (data.result == 'Fail') {
                    console.log(data.error)
                }
                matchMaking.token = data.token;
                console.log(matchMaking.token);
            }, 'json');

        return matchMaking;
    },

    sendRegister: function() {
        // Register an account. All data should be encrypted and sent via encdata object
        $.post(this.server + "/register", {
            encdata: this.cipherRegister
        })
            .done(function(data) {
                data = matchMaking.bf.decrypt(data.encdata); // decrypts encdata and makes it the default data object
                try {
                    data = JSON.parse(data)
                } catch (err) {
                    data += '}'
                    data = JSON.parse(data)
                }
                console.log(data);
            }, 'json');
        console.log(data);

        return matchMaking;
    },

    sendMatchmaking: function() {
        $.post(this.server + "/joinmatchmaking", {
            encdata: this.cipherMatchmaking
        })
            .done(function(data) {
                data = matchMaking.bf.decrypt(data.encdata); // decrypts encdata and makes it the default data object
                try {
                    data = JSON.parse(data)
                } catch (err) {
                    data += '}'
                    data = JSON.parse(data)
                }
                console.log(data);
                matchMaking.matchToken = data.matchToken
            }, 'json');

        this.cipherMatch = this.bf.encrypt(JSON.stringify({
            'matchToken': this.matchToken
        }));

        return matchMaking;
    },

    sendMove: function(gameToken, board) {
        cipherData = {
            'gameToken': gameToken,
            'board': board,
            'token': matchMaking.token
        }
        cipherData = matchMaking.bf.encrypt(JSON.stringify(cipherData))
        $.post(this.server + "/makemove", {
            encdata: cipherData
        })
            .done(function(data) {
                data = matchMaking.bf.decrypt(data.encdata); // decrypts encdata and makes it the default data object
                try {
                    data = JSON.parse(data)
                } catch (err) {
                    data += '}'
                    data = JSON.parse(data)
                }
                if (data.winner != null) {
                    matchMaking.gameData.winner = data.winner
                } else {
                    console.log(data.currentplayer)
                    matchMaking.gameData.currentplayer = data.currentplayer
                }
                console.log(data);
            }, 'json');

        return matchMaking;
    },

    checkMatchmaking: function() {
        $.post(this.server + "/checkmatchmaking", {
            encdata: this.cipherMatch
        })
            .done(function(data) {
                data = matchMaking.bf.decrypt(data.encdata); // decrypts encdata and makes it the default data object
                try {
                    data = JSON.parse(data)
                } catch (err) {
                    data += '}'
                    data = JSON.parse(data)
                }
                if (data.result == 'Success') {
                    matchMaking.gameToken = data.gameToken;
                    matchMaking.matchToken = null;
                }
                console.log(data);
            }, 'json');

        return matchMaking;
    },
    getGame: function(gameToken) {
        cipherData = {
            'gameToken': gameToken
        }
        cipherData = matchMaking.bf.encrypt(JSON.stringify(cipherData))
        $.post(this.server + "/getgame", {
            encdata: cipherData
        })
            .done(function(data) {
                data = matchMaking.bf.decrypt(data.encdata); // decrypts encdata and makes it the default data object
                try {
                    data = JSON.parse(data)
                } catch (err) {
                    data += '}'
                    data = JSON.parse(data)
                }
                if (data.result == 'Success') {
                    matchMaking.gameData = data
                }
                console.log(data);
            }, 'json');

        return matchMaking;
    },
    endGame: function(gameToken, token, winner) {
        cipherData = {
            'gameToken': gameToken,
            'token': token,
            'winner': winner
        }
        cipherData = matchMaking.bf.encrypt(JSON.stringify(cipherData))
        $.post(this.server + "/endgame", {
            encdata: cipherData
        })
            .done(function(data) {
                data = matchMaking.bf.decrypt(data.encdata); // decrypts encdata and makes it the default data object
                console.log(data);
                try {
                    data = JSON.parse(data)
                } catch (err) {
                    data += '}'
                    data = JSON.parse(data)
                }

                if (data.result == 'Success') {
                    matchMaking.gameData.winner = winner
                }
                console.log(data);
            }, 'json');

        return matchMaking;
    },
};

// HOW TO CALL ALL METHODS

// Register an Account
// matchMaking
//     .initialize() // Prepares the Module
//     .setRegister('test123', 'test@email.com', 'p@ssw0rd') //Sets the data to register an account
//     .sendRegister() // Registers the account. Will return success if it works.



//Login.
//     .initialize() // Prepares the Module
//     .setLogin('test123', 'P@ss0rd', '001') // Sets the data for. Username, password, gameid
//     .sendLogin() //Send the login data. Sets matchMaking.token if it works.

//Join Matchmaking
//     .setMatchmaking('001', '02') //Sets the matchmaking data. Gameid, number of players
//     .sendMatchmaking(); //Joins the matchmaking que


//     .checkMatchmaking() // Call this every 15 seconds. Will return Success and set .gameToken when a match is found.
//     .getGame(matchMaking.gameToken) //gets the game data. Sets .gameData to the variables of the game.
//     .gameData.playerarray //Array of player names so you know who they are playing with.
//     .gameData.numberplayers //Tells you how many people you are playing with
//     .gameData.currentplayer //Tells you the player number that is currently playering from the playerarray
//     .gameData.board //The array relating to the board passed from the last player.

//     .sendMove(matchMaking.gameToken, board) //Send the move to the server. Returns success unless its not your turn. Sets CurrentPlayer to the next player.
//     .endGame(Raedex.gameToken, winner) //Send the name of the person who wins.