const Board = require('./board.js');
const Snake = require('./snake.js');

class Game {
  constructor (length) {
    this.snake = new Snake(length);
    this.length = length;
    this.board = new Board(this.snake, this.length);
  }

  step() {
    this.snake.move();
    this.board.render();
    this.isEating();
  }

  isEating() {
    if (this.snake.segments[0][0] === this.board.food[0] &&
        this.snake.segments[0][1] === this.board.food[1]) {
      this.board.food = this.board.placeFood();
      this.snake.eatingVar = 3;
    }
  }

}




module.exports = Game;
