import Mocha from 'mocha';

export default class EnhancedMocha extends Mocha {
  loadFiles(fn) {
    const { suite } = this;

    suite.suites.length = 0;
    suite.tests.length = 0;

    try {
      const [file] = this.files;
      if (module.hot) {
        module.hot.accept(file, () => {
          if (this.watching) {
            if (!this.running) this.run();
            else this.outdated = true;
          }
        });
      }
      suite.emit('pre-require', global, file, this);
      // eslint-disable-next-line global-require, import/no-dynamic-require
      suite.emit('require', require(file), file, this);
      suite.emit('post-require', global, file, this);
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
  }

  watch() {
    this.outdated = false;
    this.running = true;
    this.watching = true;

    // reinit ui to fix ui bugs
    this.ui(this.options.ui);

    // run the tests
    this.run((/* failures */) => {
      this.running = false;
      if (this.outdated) this.watch();
    });

    if (module.hot) {
      // Don't exit the process
      setInterval(() => {}, 100000);
    }
  }
}
