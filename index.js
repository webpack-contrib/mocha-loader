/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var path = require("path");
var loaderUtils = require("loader-utils");
module.exports = function() {};
module.exports.pitch = function(req) {
	this.cacheable && this.cacheable();
	var query = loaderUtils.parseQuery(this.query);
	var source = [];
	if(this.target == "web") {
		source.push("require(" + JSON.stringify("!!" + path.join(__dirname, "web.js")) + ");");
		source.push("mocha.setup(" + JSON.stringify(query["interface"] || "bdd") + ");");
		source.push("require(" + JSON.stringify("!!" + req) + ")");
		source.push("mocha.run();");
	} else if(this.target == "node") {
		source.push('var EnhancedMocha = require(' + JSON.stringify("!!" + path.join(__dirname, "EnhancedMocha.js")) + ');');
		source.push('var mocha = new EnhancedMocha({reporter: ' + JSON.stringify(query.reporter || "spec") + '});');
		source.push('mocha.addFile(' + JSON.stringify("!!" + req) + ');');
		source.push('mocha.watch();');
	} else {
		throw new Error("Unsupported target environment " + this.target);
	}
	return source.join("\n");
}
module.exports.seperable = true;