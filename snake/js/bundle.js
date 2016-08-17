/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(4);
	const View = __webpack_require__(3);

	$( () => {
	  const rootEl = $('.snake');
	  const game = new Game();
	  const view = new View(game, rootEl);
	  let that = this;
	  setInterval(() => {
	    view.render.bind(that);
	    view.render();
	  }, 250);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	


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


/***/ },
/* 2 */
/***/ function(module, exports) {

	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);
	const Snake = __webpack_require__(1);

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


/***/ }
/******/ ]);