const View = require('./ttt-view.js'); // require appropriate file
const Game = require('../game/game.js');// require appropriate file

$( () => {
  // Your code here
  let game = new Game();
  let $figure = $('figure.ttt');
  let view = new View(game, $figure);
});
