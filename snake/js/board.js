
class  Board {
  constructor (snake, length) {
    this.snake = snake;
    this.grid = Array(length);
    for (var i = 0; i < this.grid.length; i++) {
      this.grid[i] = Array(length).fill("b");
    }
    this.food = this.placeFood();
  }

  render () {
    this.grid.forEach((row, x) => {
      row.forEach((element, y) => {
        this.grid[x][y] = "b";
      });
    });
    this.snake.segments.forEach(element => {
      let [x,y] = element;
      this.grid[x][y] = "s";
    });
    this.grid[this.food[0]][this.food[1]] = "f";
  }

  placeFood() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    return [x,y];
  }

}


module.exports = Board;
