var View = function (game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupBoard();
  this.bindEvents();
};
View.prototype.setupBoard = function() {
  let towers = this.game.towers;
  for (var i = 0; i < towers.length; i++) {
    const $list = $('<ul class="tower"></ul');
    // $list.text("Tower:");
    $list.data("tower", i);
    $list.attr("id", i)
    for (var j = 0; j < towers[i].length; j++) {
      const $block = $('<li></li>');

      $block.data("size", towers[i][j]);
      $block.css("width",((towers[i][j] + 3) * 20));
      $block.css("height",((towers[i][j] + 8) * 3));
      $list.append($block);
    }
    this.$el.append($list);
  }
  this.$el.append($('<h1 class="result"></h1>'));
};

View.prototype.bindEvents = function() {
  $('ul.tower').on("click", event => {
    let $tower = $(event.currentTarget);
    this.clickTower($tower);
  });
};

View.prototype.render = function(first, second) {
  let $towers = $('ul.tower');
  $towers.each((idx, el) => {
    if ($(el).data("tower") === first) {
      let mover = $(`#${idx} li:last`).remove();
      $(`#${second}`).append(mover);
    }
  });
  if (this.game.isWon()) {
    $('.result').text("You Win!");
  }
};

View.prototype.clickTower = function(tower) {
  if (this.firstTower >= 0) {
    this.secondTower = tower.data("tower");
    let x = this.game.move(this.firstTower, this.secondTower);
    if (x) {
      $('.result').text("");
      this.render(this.firstTower, this.secondTower);
    } else {
    $('.result').text("invalid move");
    }
    this.firstTower = -1;
  } else {
    this.firstTower = tower.data("tower");
  }
};



module.exports = View;
