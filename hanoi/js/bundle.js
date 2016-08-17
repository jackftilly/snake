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

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);

	$( () => {
	  const rootEl = $('.hanoi');
	  newGame(rootEl);
	});

	function newGame(rootEl) {
	  let game = new HanoiGame();
	  rootEl.off("click");
	  new HanoiView(game, rootEl);
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);