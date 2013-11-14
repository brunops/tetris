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

  describe("#place(piece, row, col)", function() {
    it("places piece into boards ROW and COLUMN coordinates", function() {
      var row = 5,
          col = 5,
          piece = new Piece();

      board.place(piece, row, col);

      for (var currentRow = 0; currentRow < piece.getHeight(); ++currentRow) {
        for (var currentCol = 0; currentCol < piece.getWidth(); ++currentCol) {
          if (piece.getBody()[currentRow][currentCol]) {
            expect(board.getBody()[row + currentRow][col + currentCol]).toBe(piece.getColorId());
          }
        }
      }
    });

    it("ignores pieces empty blocks when placing it into the board", function() {
      var square = new Piece(1),
          theT   = new Piece(0);

      // place a square at the bottom of the board and fit the T on top of it
      board.place(square, 18, 0);
      board.place(theT, 17, 1);

      expect(board.getBody()[18][1]).toBe(square.getColorId());
    });
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

    it("falling piece empty spots don't overlap board taken spots", function() {
      var theSquare = new Piece(1),
          theT      = new Piece(0);

      board.piece = theT;
      board.setFallingPosition(17, 1);
      board.place(theSquare, 18, 0);

      expect(board.getFullBodyState()[18][1]).toBe(theSquare.getColorId());
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
          theDog    = new Piece(5);

      board.piece = theSquare;
      board.setFallingPosition(16, 0)
      board.place(theDog, 18, 0);

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

    it("places piece only on next #tick, allowing user to move the piece when it's already sticked", function() {
      var theDog = new Piece(5),
          theMirroredL = new Piece(4);

      board.place(theDog, 18, 0);
      board.piece = theMirroredL;
      board.setFallingPosition(16, 3);
      board.tick();
      board.movePieceLeft();
      expect(board.getFallingPosition()).toEqual([17, 2]);
    });

    describe("piece can't go further", function() {
      var fallingPiece, position;

      beforeEach(function() {
        fallingPiece = board.getFallingPiece();
        position     = [board.getHeight() - fallingPiece.getHeight(), 5];

        spyOn(board, 'place');
        spyOn(board, 'clearFullRows');
        board.setFallingPosition(position[0], position[1]);
        board.tick();
      });

      it("clears rows when they get filled", function() {
        expect(board.clearFullRows).toHaveBeenCalled();
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

    it("does nothing if it would overlap some taken spot", function() {
      var fallingColumn = board.getFallingPosition()[1];
      // fill column before piece's falling position
      _.each(board.getBody(), function(row) { row[fallingColumn - 1] = 3; });
      board.movePieceLeft();
      expect(board.getFallingPosition()[1]).toBe(fallingColumn);
    });

    it("moves piece if the overlap happens in empty piece spots", function() {
      var theStick = new Piece(2),
          theL     = new Piece(3);

      board.place(theStick, 16, 5);
      board.piece = theL.rotate90().rotate90();
      board.setFallingPosition(14, 6);
      board.movePieceLeft();
      expect(board.getFallingPosition()).toEqual([14, 5]);
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

    it("does nothing if it would overlap some taken spot", function() {
      var fallingColumn = board.getFallingPosition()[1];
      // fill column before piece's falling position
      _.each(board.getBody(), function(row) { row[fallingColumn + board.piece.getWidth()] = 3; });
      board.movePieceRight();
      expect(board.getFallingPosition()[1]).toBe(fallingColumn);
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

    it("DOES NOT rotate falling piece if that overlaps blocks on the board", function() {
      // Create two columns on index 3 and 6
      // leaving 2 empty square columns in between
      _.each(board.getBody(), function(row) { row[3] = row[6] = 1; });

      // Create the stick piece and put it in between the columns
      var theStick = new Piece(2);
      board.piece = theStick;
      board.setFallingPosition(0, 4);

      board.rotatePiece90();
      expect(board.getFallingPiece().getWidth()).toBe(1);
    });

    it("try to fit piece in a valid spot when rotation would make the piece go out of boundaries", function() {
      var theStick = new Piece(2);
      board.piece = theStick;
      board.setFallingPosition(0, 9);

      board.rotatePiece90();
      expect(board.getFallingPosition()).toEqual([0, 6]);
    });
  });

  describe("#clearFullRows", function() {
    beforeEach(function() {
      // fill 5 last rows
      _.each(board.getBody().slice(15), function(row) {
        for (var i = 0; i < row.length; i++) {
          row[i] = 1;
        }
      });
    })

    it("clears all full rows (not a single empty square)", function() {
      board.clearFullRows();

      expect(board.isEmpty()).toBeTruthy();
    });

    it("removes full rows in a way that the upper rows 'fall'", function() {
      board.getBody()[14][0] = 1;
      board.clearFullRows();
      expect(board.getBody()[19][0]).toBe(1);
    });
  });
});
