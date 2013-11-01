
describe("Piece", function() {
  var piece;

  beforeEach(function() {
    piece = new Piece();
  });

  it(".shapes describes all 7 initial state piece shapes", function() {
    expect(piece.shapes.length).toBe(7);
  });
});
