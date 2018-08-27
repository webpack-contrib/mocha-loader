/* globals document: true */
/* eslint import/no-unresolved: off, import/no-webpack-loader-syntax: off  */
if (!document.getElementById('mocha')) {
  document.write('<div id="mocha"></div>');
}

require('!style-loader!css-loader!mocha/mocha.css');
require('!script-loader!mocha/mocha.js');
