process.nextTick(function() {
	delete require.cache[module.id];
	if(typeof window !== "undefined" && window.mochaPhantomJS)
		mochaPhantomJS.run();
	if(typeof window !== "undefined" && window.mochaSaucePlease)
		mochaSaucePlease();
	else
		mocha.run();
});
