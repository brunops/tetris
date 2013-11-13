describe("Board", function() {
  var board;

  beforeEach(function() {
    board = new Board();
  });

  describe("#isEmpty", function() {
    it("returns true if all elements are zero", function() {
      expect(board.isEmpty()).toBeTruthy();
    });

    it("returns false if any element is not zero", function() {
      board.body[0][0] = 1;
      expect(board.isEmpty()).toBeFalsy();
    });
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

  describe("#getFullBodyState", function() {
    it("doesn't change body state (not destructive)", function() {
      board.getFullBodyState();
      expect(board.isEmpty()).toBeTruthy();
    });

    it("returns body with fallingPiece printed on getFallingPosition cordinates", function() {
      var board2 = new Board();

      board2.place(board.getFallingPiece(), board.getFallingPosition()[0], board.getFallingPosition()[1]);

      expect(board2.getBody()).toEqual(board.getFullBodyState());
    });
  });

  describe("#canPieceFall", function() {
    it("returns true if all next rows for each piece column are free", function() {
      expect(board.canPieceFall()).toBeTruthy();
    });

    it("returns false if piece reaches the bottom", function() {
      var fallingPiece = board.getFallingPiece(),
          position     = [board.getHeight() - fallingPiece.getHeight(), 5]

      board.setFallingPosition(position[0], position[1]);
      expect(board.canPieceFall()).toBeFalsy();
    });

    it("returns false if any next rows after piece skirt on the board are taken", function() {
      var theSquare = new Piece(1),
          theSquarePlaceRowIndex = board.getHeight() - theSquare.getHeight();

      board.place(theSquare, theSquarePlaceRowIndex, 0);
      board.setFallingPosition(theSquarePlaceRowIndex - board.getFallingPiece().getHeight(), 1);

      expect(board.canPieceFall()).toBeFalsy();
    });
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

    describe("piece can't go further", function() {
      var fallingPiece, position;

      beforeEach(function() {
        fallingPiece = board.getFallingPiece();
        position     = [board.getHeight() - fallingPiece.getHeight(), 5];

        spyOn(board, 'place');
        board.setFallingPosition(position[0], position[1]);
        board.tick();
      });

      it("place piece in current position", function() {
        expect(board.place).toHaveBeenCalledWith(fallingPiece, position[0], position[1]);
      });

      it("reset falling piece", function() {
        expect(board.getFallingPiece()).not.toBe(fallingPiece);
      });

      it("reset falling position", function() {
        expect(board.getFallingPosition()).not.toEqual(position);
      });
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

  describe("#movePieceRight", function() {
    beforeEach(function() {
      board.movePieceRight();
    });

    it("makes current piece move right by 1 square", function() {
      var board2 = new Board();

      board2.place(board.getFallingPiece(), board2.getFallingPosition()[0], board2.getFallingPosition()[1] + 1);

      expect(board.getFullBodyState()).toEqual(board2.getBody());
    });

    it("does nothing if moving the piece makes it go out of the board", function() {
      board.setFallingPosition(0, board.getWidth() - board.getFallingPiece().getWidth());
      var boardStateWithPieceOnBoundaries = board.getFullBodyState();

      board.movePieceRight();

      expect(board.getFullBodyState()).toEqual(boardStateWithPieceOnBoundaries);
    });
  });

  describe("#isFull", function() {
    it("returns false when a brand new piece can fall", function() {
      expect(board.isFull()).toBe(false);
    });

    it("returns true when a brand new piece cannot fall", function() {
      var boardBody = board.getBody();
      for (var i = 2; i < board.getHeight(); i++) {
        boardBody[i] = _.map(boardBody[i], function(cell) { return 1; });
      }
      expect(board.isFull()).toBe(true);
    });
  });

  describe("#rotatePiece90", function() {
    it("rotates falling piece by 90 degrees", function() {
      spyOn(board.getFallingPiece(), 'rotate90');
      board.rotatePiece90();
      expect(board.getFallingPiece().rotate90).toHaveBeenCalled();
    });

    describe("overlapping tests", function() {
      beforeEach(function() {
        // Create two columns on index 3 and 6
        // leaving 2 empty square columns in between
        _.each(board.getBody(), function(row) { row[3] = row[6] = 1; });

        // Create the stick piece and put it in between the columns
        var theStick = new Piece(2);
        board.piece = theStick;
        board.setFallingPosition(0, 4);
      });

      it("DOES NOT rotate falling piece if that overlaps blocks on the board", function() {
        board.rotatePiece90();
        expect(board.getFallingPiece().getWidth()).toBe(1);
      });
    });
  });
});
