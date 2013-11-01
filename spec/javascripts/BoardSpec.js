describe("Board", function() {
  var board;

  beforeEach(function() {
    board = new Board();
  });

  it("starts empty, all elements should be zero", function() {
    var flattenBoard = _.flatten(board.getBody());

    expect(_.all(flattenBoard, function(e) { return e === 0 })).toBeTruthy();
  });
});
