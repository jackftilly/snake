const HanoiGame = require('./game.js');
const HanoiView = require('./view.js');

$( () => {
  const rootEl = $('.hanoi');
  newGame(rootEl);
});

function newGame(rootEl) {
  let game = new HanoiGame();
  rootEl.off("click");
  new HanoiView(game, rootEl);
}
