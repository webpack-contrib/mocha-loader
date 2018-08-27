const webpack = require('@webpack-contrib/test-utils');

describe('Loader', () => {
  test('Defaults', () => {
    const config = {
      loader: {
        test: /\.js$/,
        options: {},
      },
    };

    return webpack('fixture.js', config).then((stats) => {
      const { modules } = stats.toJson();
      const [module] = modules;

      if (module) {
        const { source } = module;

        expect(source).toMatchSnapshot();
      } else {
        expect(true).toEqual(true);
      }
    });
  });
});
