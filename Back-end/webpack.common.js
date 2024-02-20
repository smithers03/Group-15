const path = require('path');

module.exports = {
  entry: {
    app: '.game.html',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '.game.html'
  },
};
