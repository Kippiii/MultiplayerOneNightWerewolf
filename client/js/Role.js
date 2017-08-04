Role = function() {
	var self = {};
	self.name = "";
	self.roleSelectionImage = "client/img/";
	return self;
}

Werewolf = function() {
	var self = Role();
	self.name += "Werewolf";
	self.roleSelectionImage += "Werewolf.png";
	return self;
}
Minion = function() {
	var self = Role();
	self.name += "Minion";
	self.roleSelectionImage += "Minion.png";
	return self;
}
Mason = function() {
	var self = Role();
	self.name += "Mason";
	self.roleSelectionImage += "Mason.png";
	return self;
}
Seer = function() {
	var self = Role();
	self.name += "Seer";
	self.roleSelectionImage += "Seer.png";
	return self;
}
Robber = function() {
	var self = Role();
	self.name += "Robber";
	self.roleSelectionImage += "Robber.png";
	return self;
}
Troublemaker = function() {
	var self = Role();
	self.name += "Troublemaker";
	self.roleSelectionImage += "Troublemaker.png";
	return self;
}
Drunk = function() {
	var self = Role();
	self.name += "Drunk";
	self.roleSelectionImage += "Drunk.png";
	return self;
}
Insomniac = function() {
	var self = Role();
	self.name += "Insomniac";
	self.roleSelectionImage += "Insomniac.png";
	return self;
}
Villager = function() {
	var self = Role();
	self.name += "Villager";
	self.roleSelectionImage += "Villager.png";
	return self;
}
Hunter = function() {
	var self = Role();
	self.name += "Hunter";
	self.roleSelectionImage += "Hunter.png";
	return self;
}
Tanner = function() {
	var self = Role();
	self.name += "Tanner";
	self.roleSelectionImage += "Tanner.png";
	return self;
}

Role.list = [Werewolf, Werewolf, Minion, Mason, Mason, Seer, Robber, Troublemaker, Drunk, Insomniac, Villager, Villager, Villager, Hunter, Tanner];