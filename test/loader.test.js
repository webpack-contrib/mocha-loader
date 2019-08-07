import webpack from './helpers/compiler';

describe('mocha-loader', () => {
  it('works', async () => {
    const config = {
      loader: {
        test: /\.js$/,
        options: {},
      },
    };

    const stats = await webpack('fixture.js', config);
    const [, { source }] = stats.toJson().modules;

    expect(source).toMatchSnapshot();
  });
});
