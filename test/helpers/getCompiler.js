import path from 'path';

import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';

export default (fixture, loaderOptions = {}, config = {}) => {
  const fullConfig = {
    mode: 'production',
    devtool: config.devtool || false,
    context: path.join(__dirname, '../fixtures'),
    entry: path.join(__dirname, '../fixtures', fixture),
    output: {
      path: path.join(__dirname, '../outputs'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
    },
    performance: {
      hints: false,
    },
    module: {
      rules: [
        {
          test: /\.js$/i,
          rules: [
            {
              loader: path.join(__dirname, '../../src'),
              options: loaderOptions,
            },
          ],
        },
      ],
    },
    plugins: [],
    ...config,
  };

  const compiler = webpack(fullConfig);

  if (!config.outputFileSystem) {
    const outputFileSystem = createFsFromVolume(new Volume());
    // Todo remove when we drop webpack@4 support
    outputFileSystem.join = path.join.bind(path);

    compiler.outputFileSystem = outputFileSystem;
  }

  return compiler;
};
