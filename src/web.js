/* eslint-disable import/first, import/extensions, import/no-webpack-loader-syntax, import/no-unresolved */
/* globals document: true */
if (!document.getElementById('mocha')) {
  document.write('<div id="mocha"></div>');
}

import '!style-loader!css-loader!mocha/mocha.css';
import '!script-loader!mocha/mocha.js';
