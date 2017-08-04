//Creating the player class
Player = function(socket, name) {
	var self = {};
	self.socket = socket;
	self.name = name;
	return self;
}

//Creating the game class
Game = function(host) {
	var self = {};
	self.host = host;
	self.players = {};
	self.players[host.name] = host;
	self.code = Game.createGameCode();
	self.state = "serverJoiner";
	
	self.addPlayer = function(player) {
		self.players[player.name] = player;
		var players = [];
		for(var name in self.players)
			players.push(name);
		player.socket.emit('join', {
			code: self.code,
			players: players
		});
		for(var name in self.players) {
			var player = self.players[name];
			player.socket.emit("serverJoinerUpdate", {
				players: players
			});
		}
	}
	
	self.removePlayer = function(player) {
		delete self.players[player.name];
		var players = [];
		for(var name in self.players)
			players.push(name);
		for(var name in self.players) {
			var player = self.players[name];
			player.socket.emit("serverJoinerUpdate", {
				players: players
			})
		}
	}
	
	self.updateRoles = function(roles) {
		for(var name in self.players) {
			var player = self.players[name];
			if(name != host)
				player.socket.emit("roleUpdate", roles);
		}
	}
	
	Game.list[self.code] = self;
	return self;
}
Game.list = {};

Game.createGameCode = function() {
	var code = "";
	var alphabet = {
		0: "A",
		1: "B",
		2: "C",
		3: "D",
		4: "E",
		5: "F",
		6: "G",
		7: "H",
		8: "I",
		9: "J",
		10: "K",
		11: "L",
		12: "M",
		13: "N",
		14: "O",
		15: "P",
		16: "Q",
		17: "R",
		18: "S",
		19: "T",
		20: "U",
		21: "V",
		22: "W",
		23: "X",
		24: "Y",
		25: "Z"
	}
	for(var i = 0; i < 4; i++)
		code += alphabet[Math.floor(Math.random() * 26)];
	var flag = true;
	for(var i in Game.list) {
		if(Game.list[i].code == code) {
			flag = false;
			break;
		}
	}
	if(flag)
		return code;
	else
		createGameCode();
}