/* globals mochaPhantomJS: true, window: true */
// eslint-disable-next-line prefer-arrow-callback
process.nextTick(function tick() {
  delete require.cache[module.id];
  if (typeof window !== 'undefined' && window.mochaPhantomJS) {
    mochaPhantomJS.run();
  } else {
    mocha.run();
  }
});
