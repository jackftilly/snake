const Board = require('./board.js');
const Snake = require('./snake.js');

class Game {
  constructor () {
    this.snake = new Snake();
    this.board = new Board(this.snake, 10);
  }

  step() {
    this.snake.move();
    this.board.render();
    this.isEating();
  }

  isEating() {
    console.log(this.snake.segments[0]);
    console.log(this.board.food);
    if (this.snake.segments[0][0] === this.board.food[0] &&
        this.snake.segments[0][1] === this.board.food[1]) {
      this.board.food = this.board.placeFood();
      this.snake.eatingVar = 3;
    }
  }

}




module.exports = Game;
