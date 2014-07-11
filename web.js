document.write("<div id=\"mocha\"></div>");

require("!style!css!mocha/mocha.css");
require("!script!mocha/mocha.js");

process.nextTick(function() {
  window.mochaPhantomJS ? mochaPhantomJS.run() : mocha.run();
});
