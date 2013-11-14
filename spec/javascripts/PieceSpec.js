describe("Piece", function() {

  it(".shapes describes all 7 initial state piece shapes", function() {
    expect(Piece.shapes.length).toBe(7);
  });

  it("has its on color id", function() {
    for (var n = 0; n < Piece.shapes.length; n++) {
      piece = new Piece(n);
      expect(piece.getColorId()).toEqual(n + 1);
    }
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
      expect(Piece.shapes[3]).toEqual([[1, 0], [1, 0], [1, 1]]);
    });

    it("fifth shape represents the mirrored L piece", function() {
      expect(Piece.shapes[4]).toEqual([[0, 1], [0, 1], [1, 1]]);
    });

    it("sixth shape represents the dog piece", function() {
      expect(Piece.shapes[5]).toEqual([[0, 1, 1], [1, 1, 0]]);
    });

    it("seventh shape represents the mirrored dog piece", function() {
      expect(Piece.shapes[6]).toEqual([[1, 1, 0], [0, 1, 1]]);
    });
  });

  describe("behavior", function() {

    it("new Piece(0) initializes the T piece", function() {
      var theT = new Piece(0);
      expect(theT.getBody()).toEqual(Piece.shapes[0]);
    });

    it("new Piece(n) initializes piece with corresponding shape", function() {
      var piece;

      for (var n = 0; n < Piece.shapes.length; n++) {
        piece = new Piece(n);
        expect(piece.getBody()).toEqual(Piece.shapes[n]);
      }
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

    describe(".rotate90() clockwise rotates 90 degrees", function() {
      it("calls are chainable", function() {
        var theL = new Piece(3);
        expect(theL.rotate90().getBody()).toEqual([[1, 1, 1], [1, 0, 0]]);
      });

      it("Main shape is not affected by rotate", function() {
        var originalLShape = Piece.shapes[3].slice(0),
            theL = new Piece(3);

        theL.rotate90();
        expect(originalLShape).toEqual(Piece.shapes[3]);
      });

      it("and after 4 calls, shape is back to its original state", function() {
        var theL = new Piece(3);

        expect(theL.rotate90().rotate90().rotate90().rotate90().getBody()).toEqual(Piece.shapes[3]);
      });

      it("the T", function() {
        var theT = new Piece(0);
        expect(theT.rotate90().getBody()).toEqual([[0, 1], [1, 1], [0, 1]]);
        expect(theT.rotate90().getBody()).toEqual([[0, 1, 0], [1, 1, 1]]);
        expect(theT.rotate90().getBody()).toEqual([[1, 0], [1, 1], [1, 0]]);
        expect(theT.rotate90().getBody()).toEqual(Piece.shapes[0]);
      });
    });

    describe(".getWidth()", function() {
      it("returns piece max width", function() {
        var piece = new Piece();
        expect(piece.getWidth()).toBe(piece.getBody()[0].length);
      });

      it("may change piece width after a 90 degree rotation", function() {
        var theT = new Piece(0);
        expect(theT.rotate90().getWidth()).toBe(2);
      });
    });

    describe(".getHeight()", function() {
      it("returns piece max height", function() {
        var piece = new Piece();
        expect(piece.getHeight()).toBe(piece.getBody().length);
      });

      it("may change piece height after a 90 degree rotation", function() {
        var theT = new Piece(0);
        expect(theT.rotate90().getHeight()).toBe(3);
      });
    });

    describe("#skirt", function() {
      it("the T", function() {
        var theT = new Piece(0);
        expect(theT.skirt()).toEqual([0, 1, 0]);
      });

      it("the square", function() {
        var square = new Piece(1);
        expect(square.skirt()).toEqual([1, 1]);
      });

      it("the stick", function() {
        var stick = new Piece(2);
        expect(stick.skirt()).toEqual([3]);
      });

      it("the L", function() {
        var theL = new Piece(3);
        expect(theL.skirt()).toEqual([2, 2]);
      });

      it("the mirrored L", function() {
        var theMirroredL = new Piece(4);
        expect(theMirroredL.skirt()).toEqual([2, 2]);
      });

      it("the dog", function() {
        var theDog = new Piece(5);
        expect(theDog.skirt()).toEqual([1, 1, 0]);
      });

      it("the mirrored dog", function() {
        var theMirroredDog = new Piece(6);
        expect(theMirroredDog.skirt()).toEqual([0, 1, 1]);
      });

      it("changes after rotating the dog", function() {
        var theDog = new Piece(5);
        expect(theDog.rotate90().skirt()).toEqual([1, 2]);
      });

      it("changes after rotating the stick", function() {
        var stick = new Piece(2);
        expect(stick.rotate90().skirt()).toEqual([0, 0, 0, 0]);
      });
    });

    describe("#clone", function() {
      it("returns a clone of the current piece", function() {
        var stick = new Piece(2);
        expect(stick.clone()).not.toBe(stick);
      });

      it("keeps piece current state", function() {
        var stick = new Piece(2);
        expect(stick.rotate90().clone().getBody()).toEqual([[1, 1, 1, 1]]);
      });
    });
  });
});
