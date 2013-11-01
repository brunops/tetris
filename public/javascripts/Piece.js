function Piece(shapeId) {
  shapeId = typeof shapeId !== 'undefined' ? shapeId : Math.floor(Math.random() * Piece.shapes.length);
  this.body = Piece.shapes[shapeId];
}

Piece.shapes = [
  [[1, 1, 1], [0, 1, 0]],           // The T
  [[1, 1], [1, 1]],                 // The Square
  [[1], [1], [1], [1]],             // The Stick
  [[1, 1], [1, 0], [1, 0], [1, 0]], // The L
  [[1, 1], [0, 1], [0, 1], [0, 1]], // The mirrored L
  [[1, 1, 0], [0, 1, 1]],           // The Dog
  [[0, 1, 1], [1, 1, 0]]            // The mirrored Dog
];

Piece.prototype.getBody = function() {
  return this.body;
}