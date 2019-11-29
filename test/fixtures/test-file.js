import test from './module';

describe('behavior', () => {
  it('should pass', () => {
    if (!test) {
      throw new Error(`should not happen`)
    }
  });

  it('should fail', () => {
    if (test) {
      throw new Error(`always fails`)
    }
  });
});
