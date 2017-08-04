require('./Classes');

var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 2000);
console.log("Server started.")

var io = require('socket.io')(serv, {});

io.sockets.on('connection', function(socket) {
	//When a Player leaves
	socket.on('disconnect', function() {
		for(var code in Game.list) {
			for(var name in Game.list[code].players) {
				if(Game.list[code].players[name].socket.id == socket.id) {
					if(Game.list[code].state == "serverJoiner") {
						Game.list[code].removePlayer(Game.list[code].players[name]);
					}
				}
			}
		}
	});
	
	//When Player hosts a game.
	socket.on('host', function(data) {
		var host = Player(socket, data.name);
		var game = Game(host);
		socket.emit("hosting", {
			code: game.code,
			name: host.name
		});
	});
	
	//When Player joins a game
	socket.on('join', function(data) {
		for(var g in Game.list) {
			if(g == data.code) {
				for(var name in Game.list[g].players) {
					if(name == data.name) {
						socket.emit("failedJoin");
						return;
					}
				}
				var player = Player(socket, data.name);
				Game.list[g].addPlayer(player);
				return;
			}
		}
		socket.emit("failedJoin");
	});
	
	//When the host kicks a player
	socket.on('kickPlayer', function(data) {
		for(var code in Game.list) {
			if(Game.list[code].host.socket.id == socket.id) {
				Game.list[code].players[data.player].socket.emit("kick");
				Game.list[code].removePlayer(Game.list[code].players[data.player]);
			}
		}
	});
	
	//When the host submits roles
	socket.on('hostRoles', function(data) {
		for(var code in Game.list) {
			if(Game.list[code].host.name == data.name) {
				Game.list[code].updateRoles(data.roles);
			}
		}
	});
});