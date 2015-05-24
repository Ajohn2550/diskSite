var _debug = {
  active: true,
  log: [],
  logger: function (data) {
    if (this.active) this.log.push(data);
  }
};

var Player = function (firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = firstName + ' ' + lastName;
  _debug.logger('Added Player: ' + this.fullName);
};
var Hole = function (number, score, par) {
  this.number = number;
  this.par = par;
  this
};
var Course = function (numHoles, name, geo, address) {
  this.name = name;
  this.geo = geo || null;
  this.address = address || null;
};
var Team   = Team   || {};

var Players = [];

Players.push(new Player('Alex', 'Johnson'));



if (_debug.active) console.log(_debug.log);