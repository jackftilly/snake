const Board = require('./board.js');
const Snake = require('./snake.js');

class Game {
  constructor (length) {
    this.snake = new Snake(this, length);
    this.length = length;
    this.board = new Board(this.snake, this.length);
    this.score = 0;
    this.level = 1;
    this.lives = 3;
    this.time = 0;
  }

  step() {
    this.snake.move();
    this.board.render();
    this.isEating();
    this.time += 1;
  }

  isEating() {
    if (this.snake.segments[0][0] === this.board.food[0] &&
        this.snake.segments[0][1] === this.board.food[1]) {
      this.board.food = this.board.placeFood();
      this.snake.eatingVar = 3;
      console.log(this.time);
      this.score += Math.ceil(this.level / 5) * Math.floor(50 / this.time);
      this.time = 0;

      this.level += 1;
    }
  }

}




module.exports = Game;
