Role = function() {
	var self = {};
	self.name = "";
	self.roleSelectionImage = "client/img/";
	self.cardImage = "client/img/"
	self.setUpRole = function() {
		self.roleSelectionImage += self.name + ".png"
		self.cardImage +=  self.name + "Card.png"
	}
	return self;
}

Werewolf = function() {
	var self = Role();
	self.name += "Werewolf";
	self.setUpRole()
	return self;
}
Minion = function() {
	var self = Role();
	self.name += "Minion";
	self.setUpRole()
	return self;
}
Mason = function() {
	var self = Role();
	self.name += "Mason";
	self.setUpRole()
	return self;
}
Seer = function() {
	var self = Role();
	self.name += "Seer";
	self.setUpRole()
	return self;
}
Robber = function() {
	var self = Role();
	self.name += "Robber";
	self.setUpRole()
	return self;
}
Troublemaker = function() {
	var self = Role();
	self.name += "Troublemaker";
	self.setUpRole()
	return self;
}
Drunk = function() {
	var self = Role();
	self.name += "Drunk";
	self.setUpRole()
	return self;
}
Insomniac = function() {
	var self = Role();
	self.name += "Insomniac";
	self.setUpRole()
	return self;
}
Villager = function() {
	var self = Role();
	self.name += "Villager";
	self.setUpRole()
	return self;
}
Hunter = function() {
	var self = Role();
	self.name += "Hunter";
	self.setUpRole()
	return self;
}
Tanner = function() {
	var self = Role();
	self.name += "Tanner";
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