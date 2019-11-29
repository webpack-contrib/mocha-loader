import path from 'path';

import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';

export default (entry, config = {}) => {
  const fullConfig = {
    mode: 'development',
    devtool: config.devtool || false,
    context: path.join(__dirname, '../fixtures'),
    entry,
    output: {
      path: path.join(__dirname, '../outputs'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
    },
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
