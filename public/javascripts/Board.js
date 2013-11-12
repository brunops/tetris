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

  this.piece = new Piece();
  this.position = [0, this.getWidth() / 2];
};

Board.prototype.getBody = function() {
  return this.body;
};

Board.prototype.getFullBodyState = function() {
  var bodyClone = this.body.slice(),
      fallingPosition = this.fallingPosition();

  for (var row = 0; row < this.piece.getHeight(); ++row) {
    for (var col = 0; col < this.piece.getWidth(); ++col) {
      bodyClone[fallingPosition[0] + row][fallingPosition[1] + col] = this.piece.getBody()[row][col];
    }
  }

  return bodyClone;
};

Board.prototype.getWidth = function() {
  return this.width;
};

Board.prototype.getHeight = function() {
  return this.height;
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
};

Board.prototype.fallingPosition = function() {
  return this.position;
};

Board.prototype.tick = function() {
  this.position[1] += 1;
}
