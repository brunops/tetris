function Board() {
  this.init();
}

Board.prototype.generateEmptyRow = function() {
  return _.map(Array(this.width + 1).join('0').split(''), parseFloat);
};

Board.prototype.generateBody = function() {
  var body = [];
  for (var i = 0; i < this.height; ++i) {
    body.push(this.generateEmptyRow());
  }

  return body;
};

Board.prototype.init = function() {
  this.width = 10;
  this.height = 20;
  this.body = this.generateBody();
};

Board.prototype.getBody = function() {
  return this.body;
};
