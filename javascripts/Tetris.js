var Tetris = {
  board: new Board(),

  keyCodes: {
    top: 38,
    right: 39,
    bottom: 40,
    left: 37
  },

  init: function() {
    this.$el = $('.tetris');

    this.bind();
    this.start();
  },

  bind: function() {
    $(document).on('keydown', Tetris.handleUserInput)
  },

  start: function() {
    var gameInterval = setInterval(function() {
      if (Tetris.board.isFull()) {
        alert('GAME OVER!')
        clearInterval(gameInterval);
      }
      else {
        Tetris.board.tick();
        Tetris.render();
      }
    }, 400)
  },

  handleUserInput: function(e) {
    switch (e.keyCode) {
      case Tetris.keyCodes.top:
        Tetris.board.rotatePiece90();
        e.preventDefault();
        Tetris.render();
        break;
      case Tetris.keyCodes.left:
        Tetris.board.movePieceLeft();
        e.preventDefault();
        Tetris.render();
        break;
      case Tetris.keyCodes.bottom:
        if (!Tetris.board.isFull()) {
          Tetris.board.tick();
          e.preventDefault();
          Tetris.render();
        }
        break;
      case Tetris.keyCodes.right:
        Tetris.board.movePieceRight();
        e.preventDefault();
        Tetris.render();
        break;
    }
  },

  render: function() {
    this.$el.empty();
    var board = Tetris.board.getFullBodyState();
    for (var row = 0; row < board.length; ++row) {
      for (var col = 0; col < board[0].length; ++col) {
        this.$el.append($('<div></div>').attr({class: (board[row][col] ? ('piece full' + board[row][col]) : '')}));
      }
    }
  }
};
