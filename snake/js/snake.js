


class Snake {

  constructor () {
    this.SNAKE_DIRS = [38, 39, 40, 37];
    this.dir = 38;
    this.segments = [[5,5]];
    this.eatingVar = 0;
  }

  changeDir (dir) {
    this.dir = this.SNAKE_DIRS[dir];
  }

  direction() {
    let x = 0;
    let y = 0;
    switch(this.dir) {
      case 38: // left
        y = -1;
      break;

      case 39:// up
        x = 1;
      break;

      case 40: // right
        y = 1;
      break;

      case 37: // down
        x = -1;
      break;

    }
    return [y, x];
  }

  move() {
    let head = this.segments[0];
    let next = this.direction();
    let newHead = [head[0] + next[0], head[1] + next[1]];
    if (newHead[0] > 9 || newHead[0] < 0 || newHead[1] > 9 || newHead[1] < 0) {
        alert("You're dead!");
        this.segments = [[5,5]];
      } else {
        this.segments.unshift(newHead);
        if (this.eatingVar === 0) {
          this.segments.pop();
        } else {
          this.eatingVar -= 1;
        }
      }
  }

}



module.exports = Snake;
