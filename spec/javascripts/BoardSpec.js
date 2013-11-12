describe("Board", function() {
  var board;

  beforeEach(function() {
    board = new Board();
  });

  it("starts empty (all elements should be zero)", function() {
    var flattenBoard = _.flatten(board.getBody());

    expect(_.all(flattenBoard, function(e) { return e === 0 })).toBeTruthy();
  });

  it(".place(piece, x, y) places piece into boards X and Y coordinates", function() {
    var x = 5,
        y = 5,
        piece = new Piece();

    board.place(piece, x, y);

    for (var row = 0; row < piece.getHeight(); ++row) {
      for (var col = 0; col < piece.getWidth(); ++col) {
        expect(board.getBody()[x + row][y + col]).toBe(piece.getBody()[row][col]);
      }
    }
  });

  it("has a current falling piece", function() {
    expect(board.fallingPiece()).toBeDefined();
  });

  it("current falling piece is a Piece object", function() {
    expect(board.fallingPiece()).toEqual(jasmine.any(Piece));
  });

  it(".getWidth() returns its width", function() {
    expect(board.getWidth()).toBe(board.width);
  });

  it(".getHeight() return its height", function() {
    expect(board.getHeight()).toBe(board.height);
  });

  it("has a current position coordinates", function() {
    var startCol = board.getWidth() / 2,
        startRow = 0;
    expect(board.fallingPosition()).toEqual([startRow, startCol]);
  });

  it(".getFullBodyState() returns body with fallingPiece printed on fallingPosition cordinates", function() {
    var board2 = new Board();

    board2.place(board.fallingPiece(), board.fallingPosition()[0], board.fallingPosition()[1]);

    expect(board2.getBody()).toEqual(board.getFullBodyState());
  });

  describe("#tick", function() {
    beforeEach(function() {
      board.tick();
    });

    it("makes current piece fall 1 square", function() {
      var board2 = new Board();

      board2.place(board.fallingPiece(), board.fallingPosition()[0], board.fallingPosition()[1] + 1);
      board.tick();

      expect(board.getFullBodyState()).toEqual(board2.getBody());
    });
  })

});
