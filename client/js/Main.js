var socket = io();

var code;
var players;
var name;
var roles = [];
var yourRole = {};

$(document).ready(function() {
	$('#serverJoiner').hide();
	$('#roleSelectorHost').hide();
	$('#roleSelectorJoiner').hide();
	$("#showRole").hide();
	generateRoleSelector();
});

//Received when you start hosting
socket.on('hosting', function(data) {
	$('#serverBrowser').hide();
	$('#serverJoiner').show();
	code = data.code;
	players = [data.name];
	setupServerBrowser();
	updateServerBrowser();
});

//Received when a join failed
socket.on('failedJoin', function() {
	alert("Invalid Room Code");
});

//Received  when a join succeeds
socket.on('join', function(data) {
	$('#serverBrowser').hide();
	$('#serverJoiner').show();
	code = data.code;
	players = data.players;
	setupServerBrowser();
	updateServerBrowser();
});

//Received when an update happens when the server is still in the joiner phase.
socket.on('serverJoinerUpdate', function(data) {
	players = data.players;
	updateServerBrowser();
});

socket.on('kick', function() {
	$('#serverJoiner').html("<div class=\"container\"><div class=\"row\" id=\"serverJoinerRow\"></div></div>");
	$('#serverJoiner').hide();
	$('#serverBrowser').show();
	alert("You have been kicked");
});

socket.on("roleUpdate", function(roless) {
	for(var i = 0; i < roless.length; i++) {
		roles = roless
		$("#roleSelectorJoiner .container .roleSelectorImages").children(".roleSelectorImage").each(function() {
			$image = $(this).find(".roleImage")
			$image.removeClass("glow")
			var role = ""
			for(var i = 0; i < Role.list.length; i++) {
				if($image.hasClass(Role.list[i].name)) {
					role = Role.list[i].name
					break
				}
			}
			for(var i = 0; i < roless.length; i++) {
				if(role == roless[i]) {
					$image.addClass("glow")
					roless.splice(i, 1)
					break
					//TODO
				}
			}
		});
	}
});

socket.on("err", function(msg) {
	alert(msg)
});

socket.on("startGame", function(role) {
	yourRole = Role.getRole(role)
	$div = $("#showRole .container .row")
	$div.append("<div class='col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 roleSelectorImage'><img src=\"" + yourRole.cardImage + "\" class='roleImage'></div>")
	$("#showRole .container").append("<h1>" + yourRole.description + "</h1>")
	$('#serverJoiner').hide();
	$("#showRole").show();
})

function hostServer(playerName) {
	if(playerName != "") {
		socket.emit('host', {
			name: playerName
		});
	}else{
		alert("Please type in a name.");
	}
	name = playerName;
}

function joinServer(code, playerName) {
	if(code.length == 4 && playerName != "") {
		socket.emit('join', {
			code: code,
			name: playerName
		});
	}else if(code.legnth != 4) {
		alert("Invalid Room Code");
	}else{
		alert("Please type in a name.");
	}
	name = playerName;
}

function setupServerBrowser() {
	$('.roomInfo').html("Room Code: " + code);
	for(var i = 0; i < 10; i++) {
		if((i + 1) % 2 == 1)
			$('#serverJoinerRow').append("<div class='col-md-5 col-sm-5 serverListName' id='player" + (i + 1) +"'>Waiting for player...</div>");
		else
			$('#serverJoinerRow').append("<div class='col-md-5 col-md-offset-2 col-sm-5 col-sm-offset-2 serverListName' id='player" + (i + 1) +"'>Waiting for player...</div>");
	}
	$('.serverListName').hover(function() {
		var text = $(this).clone().children().remove().end().text();
		if(text != "Waiting for player..." && text != name && players[0] == name)
			$(this).toggleClass('strike');
	});
	$('.serverListName').click(function() {
		var text = $(this).clone().children().remove().end().text();
		if(text != "Waiting for player..." && text != name && players[0] == name) {
			socket.emit("kickPlayer", {
				player: text
			});
			$(this).toggleClass('strike');
		}
	});
}

function updateServerBrowser() {
	var i = 0;
	for( ; i < players.length; i++) {
		$('#player' + (i+1)).html(players[i]);
		if(name == players[i])
			$('#player' + (i+1)).addClass("glow");
		else
			$('#player' + (i+1)).removeClass("glow");
	}
	for( ; i < 10; i++) {
		$('#player' + (i+1)).html("Waiting for player...");
		$('#player' + (i+1)).removeClass("glow");
	}
}

function generateRoleSelector() {
	for(var i = 0; i < Role.list.length; i++) {
		$('.roleSelectorImages').append("<div class=\"col-md-2 col-sm-2 col-xs-3 roleSelectorImage\"><img src=\"" + Role.list[i]().roleSelectionImage + "\" class=\"roleImage " + Role.list[i]().name +"\"></div>");
	}
	$('.roleImage').on("click", function() {
		if(players[0] == name) {
			$(this).toggleClass("glow");
		}
	});
}

function openRoleSelector() {
	$('#serverJoiner').hide();
	if(players[0] == name)
		$('#roleSelectorHost').show();
	else
		$('#roleSelectorJoiner').show();
}

function submitRoleList() {
	roles = []
	$('#roleSelectorHost .container .roleSelectorImages').children('.roleSelectorImage').each(function() {
		$image = $(this).find(".roleImage");
		if($image.hasClass("glow")) {
			for(var i = 0; i < Role.list.length; i++) {
				if($image.hasClass(Role.list[i].name)) {
					roles.push(Role.list[i]);
					break;
				}
			}
		}
	});
	
	var tempRoles = []
	for(var i = 0; i < roles.length; i++)
		tempRoles.push(roles[i].name)
	socket.emit("hostRoles", {
		roles: tempRoles,
		name: name
	});
	
	$('#roleSelectorHost').hide();
	$('#serverJoiner').show();
}

function backToServerJoiner() {
	$('#roleSelectorJoiner').hide();
	$('#serverJoiner').show();
}

function startGame() {
	if(players[0] == name)
		socket.emit("startGame");
	else
		alert("Only the host can start the game.")
}