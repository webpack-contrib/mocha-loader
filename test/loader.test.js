import webpack from './helpers/compiler';

describe('mocha-loader', () => {
  it('works', async () => {
    const stats = await webpack('fixture.js', {
      loader: {
        test: /fixture\.js$/,
        options: {},
      },
    });
    const statsJson = stats.toJson();

    expect(statsJson.errors).toEqual([]);
    expect(statsJson.warnings).toEqual([]);
    expect(statsJson.modules[0].source).toMatchSnapshot();
  });
});
