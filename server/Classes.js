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
	self.roles = []
	
	self.addPlayer = function(player) {
		if(Object.keys(self.players).length >= 10) {
			player.socket.emit("err", "The server is full.")
			return
		}
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
		self.roles = []
		for(var i = 0; i < roles.length; i++) 
			self.roles.push(Role.getRole(roles[i]))
		for(var name in self.players) {
			var player = self.players[name];
			if(name != host)
				player.socket.emit("roleUpdate", roles);
		}
	}
	
	self.attemptStart = function() {
		if(Object.keys(self.players).length < 3)
			host.socket.emit("err", "Too few players. You need at least three.")
		else if(self.roles.length != Object.keys(self.players).length + 3) 
			host.socket.emit("err", "You have an invalid number of roles selected. The number of roles selected should be the number of players plus three.")
		else {
			for(var name in self.players)
				self.players[name].socket.emit("startGame")
			self.startGame()
		}
	}
	
	self.startGame = function() {
		console.log("Starting game...")
		//TODO
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

//The Roles
Role = function() {
	var self = {};
	self.name = "";
	return self;
}

Werewolf = function() {
	var self = Role();
	self.name += "Werewolf";
	return self;
}
Minion = function() {
	var self = Role();
	self.name += "Minion";
	return self;
}
Mason = function() {
	var self = Role();
	self.name += "Mason";
	return self;
}
Seer = function() {
	var self = Role();
	self.name += "Seer";
	return self;
}
Robber = function() {
	var self = Role();
	self.name += "Robber";
	return self;
}
Troublemaker = function() {
	var self = Role();
	self.name += "Troublemaker";
	return self;
}
Drunk = function() {
	var self = Role();
	self.name += "Drunk";
	return self;
}
Insomniac = function() {
	var self = Role();
	self.name += "Insomniac";
	return self;
}
Villager = function() {
	var self = Role();
	self.name += "Villager";
	return self;
}
Hunter = function() {
	var self = Role();
	self.name += "Hunter";
	return self;
}
Tanner = function() {
	var self = Role();
	self.name += "Tanner";
	return self;
}

Role.list = [Werewolf, Minion, Mason, Seer, Robber, Troublemaker, Drunk, Insomniac, Villager, Villager, Villager, Hunter, Tanner];

Role.getRole = function(string) {
	for(var i = 0; i < Role.list.length; i++) {
		if(Role.list[i]().name == string)
			return Role.list[i]()
	}
	return null
}