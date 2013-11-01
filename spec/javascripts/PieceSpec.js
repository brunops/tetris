
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

  it("second shape represents the square piece", function() {
    expect(piece.shapes[1]).toEqual([[1, 1], [1, 1]]);
  });

  it("third shape represents the stick piece", function() {
    expect(piece.shapes[2]).toEqual([[1], [1], [1], [1]]);
  });

  it("fourth shape represents the L piece", function() {
    expect(piece.shapes[3]).toEqual([[1, 1], [1, 0], [1, 0], [1, 0]]);
  });

  it("fifth shape represents the mirrored L piece", function() {
    expect(piece.shapes[4]).toEqual([[1, 1], [0, 1], [0, 1], [0, 1]]);
  });
});
