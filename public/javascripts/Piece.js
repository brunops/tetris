function Piece() {
}

Piece.prototype.shapes = [
  [[1, 1, 1], [0, 1, 0]], // The T
  [[1, 1], [1, 1]],       // The Square
  [[1], [1], [1], [1]],   // The Stick
  [[1, 1], [1, 0], [1, 0], [1, 0]], // The L
  [[1, 1], [0, 1], [0, 1], [0, 1]], // The mirrored L
  [],
  []
];
