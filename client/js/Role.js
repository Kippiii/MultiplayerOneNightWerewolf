Role = function() {
	var self = {};
	self.name = "";
	self.roleSelectionImage = "client/img/";
	self.cardImage = "client/img/"
	self.description = ""
	self.setUpRole = function() {
		self.roleSelectionImage += self.name + ".png"
		self.cardImage +=  self.name + "Card.png"
	}
	return self;
}

Werewolf = function() {
	var self = Role();
	self.name += "Werewolf";
	self.description += "<font color='brown'>At night, you are told who the other werewolves are. Make sure none of the werewolves are voted out by the town. If you are the only werewolf, you may view one of the center roles.</font>"
	self.setUpRole()
	return self;
}
Minion = function() {
	var self = Role();
	self.name += "Minion";
	self.description += "<font color='brown'>You are told who the other werewolves are. Protect them at all costs. If you get voted out instead of the werewolves, you and the werewolves still win. The Minion is on the werewolf team.</font>"
	self.setUpRole()
	return self;
}
Mason = function() {
	var self = Role();
	self.name += "Mason";
	self.description += "<font color='green'>The Masons are told who the other mason is, giving them someone that they can trust. The Masons are villagers.</font>"
	self.setUpRole()
	return self;
}
Seer = function() {
	var self = Role();
	self.name += "Seer";
	self.description += "<font color='green'>The Seer may either look at one other player's role or at two of the center roles. The Seer is a villager.</font>"
	self.setUpRole()
	return self;
}
Robber = function() {
	var self = Role();
	self.name += "Robber";
	self.description += "<font color='green'>The Robber may choose to rob a role from another player. The person who he robs gets the robber role. The person he robs becomes a villager and he becomes the team of the person that he robbed. He does not do the action of that role. The Robber is a villager.</font>"
	self.setUpRole()
	return self;
}
Troublemaker = function() {
	var self = Role();
	self.name += "Troublemaker";
	self.description += "<font color='green'>The Troublemaker may switch the roles of two other players without knowing their roles. The players who recieve different roles are now on the team of their new role. The Troublemaker is a villager.</font>"
	self.setUpRole()
	return self;
}
Drunk = function() {
	var self = Role();
	self.name += "Drunk";
	self.description += "<font color='green'>The Drunk is so drunk that he doesn't remember his role. When it comes time to wake up at night, he must exchange his Drunk role for one of the center roles without knowing what it is. The Drunk is now the new role and is on that team.</font>"
	self.setUpRole()
	return self;
}
Insomniac = function() {
	var self = Role();
	self.name += "Insomniac";
	self.description += "<font color='green'>The Insomniac is told at the end of the night what their current role is. The Insomniac is a villager.</font>"
	self.setUpRole()
	return self;
}
Villager = function() {
	var self = Role();
	self.name += "Villager";
	self.description += "<font color='green'>You are a regular villager. You have no special abilities.</font>"
	self.setUpRole()
	return self;
}
Hunter = function() {
	var self = Role();
	self.name += "Hunter";
	self.description += "<font color='green'>If the Hunter is voted out, the player that he votes for is voted out as well. The Hunter is a villager.</font>"
	self.setUpRole()
	return self;
}
Tanner = function() {
	var self = Role();
	self.name += "Tanner";
	self.description += "<font color='red'>The Tanner hates his job so much that he wants to die. The Tanner only wins if he is voted out. If the Tanner is voted out and no Werewolves are voted out, the Werewolves do not win. If the Tanner dies and a Werewolf dies, the village team wins too. The Tanner is considered a member of the village, so if the Tanner dies when all werewolves are in the center, the village team loses. The Tanner is not on the werewolf or the villager team.</font>"
	self.setUpRole()
	return self;
}

Role.list = [Werewolf, Werewolf, Minion, Mason, Mason, Seer, Robber, Troublemaker, Drunk, Insomniac, Villager, Villager, Villager, Hunter, Tanner];
Role.getRole = function(string) {
	for(var i = 0; i < Role.list.length; i++) {
		if(Role.list[i]().name == string) {
			return Role.list[i]()
		}
	}
	return null
}