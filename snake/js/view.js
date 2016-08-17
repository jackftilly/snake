
var View = function (game, rootEl) {
  this.game = game;
  this.$el = rootEl;
  this.bindKeys();
  this.render();
};

View.prototype.setupBoard = function () {
  const $rows = $('<ul></ul>');

  for (var i = 0; i < 100; i++) {
    let row = Math.floor(i / 10);
    let col = Math.floor(i % 10);
    const $item = $('<li></li>');
    $item.data("pos", [row, col]);
    // $item.text('X');
    $rows.append($item);
  }
  $rows.css("list-style","none");

  this.$el.append($rows);

};

View.prototype.render = function () {
  this.game.step();
  let board = this.game.board;
  $('ul').remove();
  const $rows = $('<ul></ul>');
  board.grid.forEach((row) => {
    row.forEach((element) => {
      const $item = $('<li></li>');
      if (element === 's') {
        $item.addClass("green");
      } else if (element === 'f'){
        $item.addClass("blue");
      } else {
        $item.addClass("grey");
      }
      $rows.append($item);
    });
  });
  $rows.css("list-style","none");
  this.$el.append($rows);
};



View.prototype.bindKeys = function () {
  let that = this;
  $(document).keydown(function(e) {
    let snake = that.game.snake;
    if (snake.dir % 2 !== e.which % 2) {
      switch(e.which) {
        case 37: // left
          snake.changeDir(3);
        break;

        case 38: // up
          snake.changeDir(0);
        break;

        case 39: // right
          snake.changeDir(1);
        break;

        case 40: // down
          snake.changeDir(2);
        break;

        default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    }
  });

};

module.exports = View;