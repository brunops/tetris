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
    expect(board.getFallingPiece()).toBeDefined();
  });

  it("current falling piece is a Piece object", function() {
    expect(board.getFallingPiece()).toEqual(jasmine.any(Piece));
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
    expect(board.getFallingPosition()).toEqual([startRow, startCol]);
  });

  it(".getFullBodyState() returns body with fallingPiece printed on getFallingPosition cordinates", function() {
    var board2 = new Board();

    board2.place(board.getFallingPiece(), board.getFallingPosition()[0], board.getFallingPosition()[1]);

    expect(board2.getBody()).toEqual(board.getFullBodyState());
  });

  describe("#tick", function() {
    beforeEach(function() {
      board.tick();
    });

    it("makes current piece fall 1 square", function() {
      var board2 = new Board();

      board2.place(board.getFallingPiece(), board.getFallingPosition()[0] + 1, board.getFallingPosition()[1]);
      board.tick();

      expect(board.getFullBodyState()).toEqual(board2.getBody());
    });
  });

  describe("#movePieceLeft", function() {
    beforeEach(function() {
      board.movePieceLeft();
    });

    it("makes current piece move left by 1 square", function() {
      var board2 = new Board();

      board2.place(board.getFallingPiece(), board2.getFallingPosition()[0], board2.getFallingPosition()[1] - 1);

      expect(board.getFullBodyState()).toEqual(board2.getBody());
    });

    it("does nothing if moving the piece makes it go out of the board", function() {
      board.setFallingPosition(0, 0);
      var boardStateWithPieceOnBoundaries = board.getFullBodyState().slice();

      board.movePieceLeft();

      expect(board.getFullBodyState()).toEqual(boardStateWithPieceOnBoundaries);
    });
  });

});
