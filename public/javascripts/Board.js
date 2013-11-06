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
  this.piece = new Piece();
  this.width = 10;
  this.height = 20;
  this.body = this.generateBody();
};

Board.prototype.getBody = function() {
  return this.body;
};

Board.prototype.place = function(piece, x, y) {
  for (var row = 0; row < piece.getHeight(); ++row) {
    for (var col = 0; col < piece.getWidth(); ++col) {
      this.body[x + row][y + col] = piece.getBody()[row][col];
    }
  }
};

Board.prototype.print = function() {
  var readableBoard = _.map(this.body, function(row) {
    return _.map(row, function(item) {
      return item ? '@' : ' ';
    });
  });
  for (var row = 0; row < readableBoard.length; ++row) {
    console.log(JSON.stringify(readableBoard[row]));
  }
};

Board.prototype.fallingPiece = function() {
  return this.piece;
}
