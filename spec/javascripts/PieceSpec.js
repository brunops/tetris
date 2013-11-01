
describe("Piece", function() {
  var piece;

  beforeEach(function() {
    piece = new Piece();
  });

  it(".shapes describes all 7 initial state piece shapes", function() {
    expect(piece.shapes.length).toBe(7);
  });

  it("first shape represents the T piece", function() {
    expect(piece.shapes[0]).toEqual([[1, 1, 1], [0, 1, 0]]);
  });
});
