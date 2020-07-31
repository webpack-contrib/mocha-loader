/* eslint-disable no-var */

var mochaModule = require('mocha/mocha.js');

var mochaInstance = window.mocha || mochaModule;

/* global window document */
window.addEventListener('DOMContentLoaded', function runMocha() {
  if (!document.getElementById('mocha')) {
    // eslint-disable-next-line
    var mochaContainer = document.createElement('div');
    mochaContainer.id = 'mocha';
    document.body.appendChild(mochaContainer);
  }
  mochaInstance.run();
});
