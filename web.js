if (! document.getElementById("mocha")) { document.write("<div id=\"mocha\"></div>"); }

require("!style-loader!css-loader!mocha/mocha.css");
require("!script-loader!mocha/mocha.js");
