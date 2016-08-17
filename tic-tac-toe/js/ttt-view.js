var View = function (game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupBoard();
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  $('li').on("click", event => {
    this.makeMove($(event.currentTarget));
  });
};

View.prototype.makeMove = function ($square) {
  this.game.playMove($square.data("pos"));
  $square.text(this.game.previousPlayer.toUpperCase());
  if (this.game.isOver()) {
    if (this.game.winner()){
      alert(`Player ${this.game.previousPlayer} won!!!`);
    } else {
      alert("The game is a tie");
    }
  }
};

View.prototype.setupBoard = function () {
  console.log("here");
  const $rows = $('<ul></ul>');

  for (var i = 0; i < 9; i++) {
    let row = Math.floor(i / 3);
    let col = Math.floor(i % 3);
    const $item = $('<li></li>');
    $item.data("pos", [row, col]);
    // $item.text('X');
    $rows.append($item);
  }
  $rows.css("list-style","none");

  this.$el.append($rows);

};

module.exports = View;
