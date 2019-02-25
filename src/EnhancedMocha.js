const Mocha = require('mocha');

function EnhancedMocha(options) {
  Mocha.call(this, options);
}
module.exports = EnhancedMocha;

EnhancedMocha.prototype = Object.create(Mocha.prototype);

EnhancedMocha.prototype.loadFiles = function loadFiles(fn) {
  const self = this;
  const { suite } = this;

  suite.suites.length = 0;
  suite.tests.length = 0;

  try {
    const [file] = this.files;
    if (module.hot) {
      module.hot.accept(file, () => {
        if (self.watching) {
          if (!self.running) self.run();
          else self.outdated = true;
        }
      });
    }
    suite.emit('pre-require', global, file, self);
    // eslint-disable-next-line global-require, import/no-dynamic-require
    suite.emit('require', require(file), file, self);
    suite.emit('post-require', global, file, self);
  } catch (e) {
    suite.addTest(
      new Mocha.Test('fix test errors', () => {
        throw e;
      })
    );
  }

  if (fn) {
    fn();
  }
};

EnhancedMocha.prototype.watch = function watch() {
  const self = this;
  self.outdated = false;
  self.running = true;
  self.watching = true;

  // reinit ui to fix ui bugs
  this.ui(this.options.ui);

  // run the tests
  this.run((/* failures */) => {
    self.running = false;
    if (self.outdated) self.watch();
  });

  if (module.hot) {
    // Don't exit the process
    setInterval(() => {}, 100000);
  }
};
