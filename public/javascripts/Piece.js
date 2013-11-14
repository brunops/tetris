function Piece(shapeId) {
  this.shapeId = typeof shapeId !== 'undefined' ? shapeId : Math.floor(Math.random() * Piece.shapes.length);
  this.body = Piece.shapes[this.shapeId];
}

Piece.shapes = [
  [ // The T
    [1, 1, 1],
    [0, 1, 0]
  ],
  [ // The Square
    [1, 1],
    [1, 1]
  ],
  [ // The Stick
    [1],
    [1],
    [1],
    [1]
  ],
  [ // The L
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  [ // The mirrored L
    [0, 1],
    [0, 1],
    [1, 1]
  ],
  [ // The Dog
    [0, 1, 1],
    [1, 1, 0]
  ],
  [ // The mirrored Dog
    [1, 1, 0],
    [0, 1, 1]
  ]
];

Piece.prototype.getColorId = function() {
  return this.shapeId + 1;
};

Piece.prototype.getBody = function() {
  return this.body;
};

Piece.prototype.rotate90 = function() {
  this.body = _.zip.apply(this, this.body.slice().reverse());
  return this;
};

Piece.prototype.getWidth = function() {
  return this.body[0].length;
};

Piece.prototype.getHeight = function() {
  return this.body.length;
};

Piece.prototype.skirt = function() {
  var skirt = [];
  for (var col = 0; col < this.getWidth(); ++col) {
    for (var row = this.getHeight() - 1; row >= 0; row--) {
      if (this.body[row][col]) {
        skirt.push(row);
        break;
      }
    }
  }

  return skirt;
};

Piece.prototype.clone = function() {
  var pieceClone = new Piece(this.shapeId);
  pieceClone.body = this.body.slice();
  return pieceClone;
};
