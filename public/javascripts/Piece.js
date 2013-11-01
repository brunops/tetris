function Piece(shapeId) {
  shapeId = typeof shapeId !== 'undefined' ? shapeId : Math.floor(Math.random() * Piece.shapes.length);
  this.body = Piece.shapes[shapeId];
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
    [1, 0],
    [1, 1]
  ],
  [ // The mirrored L
    [0, 1],
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

Piece.prototype.getBody = function() {
  return this.body;
};

Piece.prototype.rotate90 = function() {
  this.body = _.zip.apply(this, this.body.reverse());
  return this;
};
