/* eslint prefer-arrow-callback: off, global-require: off */

describe('test-case', function d() {
  it('should run', function it(done) {
    setTimeout(done, 1000);
  });

  it('should fail', function i() {
    setTimeout(function timeout() {
      throw new Error('Fail');
    }, 1000);
  });

  it('should randomly fail', function i() {
    if (require('./dep')) {
      throw new Error('Random fail');
    }
  });
});
