import { compile, getCompiler, normalizeErrors, readAsset } from './helpers';

describe('mocha-loader', () => {
  it('should work', async () => {
    const compiler = getCompiler('fixture.js');
    const stats = await compile(compiler);

    const outputBundleText = readAsset('main.bundle.js', compiler, stats);
    const { errors, warnings } = stats.compilation;

    expect(outputBundleText).toMatchSnapshot('result');
    expect(normalizeErrors(warnings)).toMatchSnapshot('warnings');
    expect(normalizeErrors(errors)).toMatchSnapshot('errors');
  });
});
