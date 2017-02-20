/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var path = require("path");
var loaderUtils = require("loader-utils");
module.exports = function() {};
module.exports.pitch = function(req) {
	this.cacheable && this.cacheable();
	var source = [];
	var query = loaderUtils.parseQuery(this.query);
	query.ui = query.ui || 'bdd';
	if(this.target == "web" || this.target == "electron-renderer") {
		source.push("require(" + JSON.stringify("!!" + path.join(__dirname, "web.js")) + ");");
		source.push("if(typeof window !== 'undefined' && window.initMochaPhantomJS) { window.initMochaPhantomJS(); }");
		source.push("mocha.setup(" + JSON.stringify(query) + ");");
		source.push("require(" + JSON.stringify("!!" + req) + ")");
		source.push("require(" + JSON.stringify("!!" + path.join(__dirname, "start.js")) + ");");
		source.push("if(module.hot) {");
		source.push("\tmodule.hot.accept();");
		source.push("\tmodule.hot.dispose(function() {");
		source.push("\t\tmocha.suite.suites.length = 0;");
		source.push("\t\tvar stats = document.getElementById('mocha-stats');");
		source.push("\t\tvar report = document.getElementById('mocha-report');");
		source.push("\t\tstats && stats.parentNode.removeChild(stats);");
		source.push("\t\treport && report.parentNode.removeChild(report);");
		source.push("\t});");
		source.push("}");
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
