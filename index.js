/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var path = require("path");
var loaderUtils = require("loader-utils");
module.exports = function() {
	this.cacheable && this.cacheable();
	this.clearDependencies && this.clearDependencies()
	var query = loaderUtils.parseQuery(this.query);
	var req = loaderUtils.getRemainingRequest(this);
	var source = [];
	if(this.web) {
		source.push("require(" + JSON.stringify(path.join(__dirname, "web.js")) + ");");
		source.push("mocha.setup(" + JSON.stringify(query["interface"] || "bdd") + ");");
		source.push("require(" + JSON.stringify(req) + ")");
		source.push("mocha.run();");
	} else {
		source.push('var EnhancedMocha = require(' + JSON.stringify(path.join(__dirname, "EnhancedMocha.js")) + ');');
		source.push('var mocha = new EnhancedMocha({reporter: ' + JSON.stringify(query.reporter || "spec") + '});');
		source.push('mocha.addFile(' + JSON.stringify(req) + ');');
		source.push('mocha.watch();');
	}
	return source.join("\n");
}
module.exports.seperable = true;