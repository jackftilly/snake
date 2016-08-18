
var View = function (game, rootEl) {
  this.game = game;
  this.$el = rootEl;
  this.bindKeys();
  this.render();
};

View.prototype.setupBoard = function () {
  const $rows = $('<ul></ul>');


  for (var i = 0; i < Math.pow(this.game.length, 2); i++) {
    let row = Math.floor(i / this.game.length);
    let col = Math.floor(i % this.game.length);
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
  $('h1.score').text(this.game.score);
  $('h1.lives').text(this.game.lives);
  $('h1.level').text(this.game.level);
  const $rows = $('<ul class="group"></ul>');
  board.grid.forEach((row) => {
    row.forEach((element) => {
      const $item = $('<li></li>');
      if (element === 's') {
        $item.addClass("green");
      } else if (element === 'h') {
        $item.addClass("head");
        if (this.game.snake.dir === 38) {
          $item.css("transform", "rotate(-90deg)");
        } else if (this.game.snake.dir === 40) {
          $item.css("transform", "rotate(90deg)");
        } else if (this.game.snake.dir === 37) {
          $item.css("transform", "rotate(180deg)");
        }
      } else if (element === 'f'){
        $item.addClass("blue");
      } else {
        $item.addClass("grey");
      }
      $rows.append($item);
    });
  });
  $rows.css("list-style","none");
  $rows.css("width",`${this.game.length * 20}px`);
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
