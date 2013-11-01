
describe("Piece", function() {
  var piece;

  beforeEach(function() {
    piece = new Piece();
  });

  it(".shapes describes all 7 initial state piece shapes", function() {
    expect(Piece.shapes.length).toBe(7);
  });

  describe("shapes", function() {
    it("first shape represents the T piece", function() {
      expect(Piece.shapes[0]).toEqual([[1, 1, 1], [0, 1, 0]]);
    });

    it("second shape represents the square piece", function() {
      expect(Piece.shapes[1]).toEqual([[1, 1], [1, 1]]);
    });

    it("third shape represents the stick piece", function() {
      expect(Piece.shapes[2]).toEqual([[1], [1], [1], [1]]);
    });

    it("fourth shape represents the L piece", function() {
      expect(Piece.shapes[3]).toEqual([[1, 1], [1, 0], [1, 0], [1, 0]]);
    });

    it("fifth shape represents the mirrored L piece", function() {
      expect(Piece.shapes[4]).toEqual([[1, 1], [0, 1], [0, 1], [0, 1]]);
    });

    it("sixth shape represents the dog piece", function() {
      expect(Piece.shapes[5]).toEqual([[1, 1, 0], [0, 1, 1]]);
    });

    it("seventh shape represents the mirrored dog piece", function() {
      expect(Piece.shapes[6]).toEqual([[0, 1, 1], [1, 1, 0]]);
    });
  });

  describe("piece information", function() {

    it("new Piece(0) initializes the T piece", function() {
      var theT = new Piece(0);
      expect(theT.getBody()).toEqual(Piece.shapes[0]);
    });

    it("new Piece() initializes piece with random shape", function() {
      var theT = new Piece(0),
          newPiece;
      for (var i = 0; i < Piece.shapes.length; i++) {
        if ((newPiece = new Piece()).getBody() !== theT.getBody()) {
          break;
        }
      }

      expect(newPiece.getBody()).toBeDefined();
      expect(theT.getBody()).toNotEqual(newPiece.getBody());
    });

  });
});
