const Game = require('./game.js');
const View = require('./view.js');

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
