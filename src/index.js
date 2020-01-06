import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';

import schema from './options.json';

const startScriptPath = require.resolve('./start.js');
const enhancedMochaPath = require.resolve('./EnhancedMocha.js');
const mochaJs = require.resolve('mocha/mocha.js');
const mochaCss = require.resolve('mocha/mocha.css');
const { stringify } = JSON;

export default function mochaLoader(source) {
  return source;
}

mochaLoader.pitch = pitch;

export function pitch(req) {
  const options = getOptions(this) || {};

  validateOptions(schema, options, {
    name: 'Mocha Loader',
    baseDataPath: 'options',
  });

  options.ui = options.ui || 'bdd';

  const source = [];
  if (this.target === 'web' || this.target === 'electron-renderer') {
    source.push(
      `require(${stringify(`!!style-loader!css-loader!${mochaCss}`)});`
    );
    source.push(`require(${stringify(`!!${mochaJs}`)});`);
    source.push(`mocha.setup(${stringify(options)});`);
    source.push(`require(${stringify(`!!${req}`)});`);
    source.push(`require(${stringify(`!!${startScriptPath}`)});`);
    source.push('if(module.hot) {');
    source.push('\tmodule.hot.accept();');
    source.push('\tmodule.hot.dispose(function() {');
    source.push('\t\tmocha.suite.suites.length = 0;');
    source.push("\t\tvar stats = document.getElementById('mocha-stats');");
    source.push("\t\tvar report = document.getElementById('mocha-report');");
    source.push('\t\tstats && stats.parentNode.removeChild(stats);');
    source.push('\t\treport && report.parentNode.removeChild(report);');
    source.push('\t});');
    source.push('}');
  } else if (this.target === 'node') {
    source.push(
      `import EnhancedMocha from ${stringify(`!!${enhancedMochaPath}`)};`
    );
    source.push(
      `const mocha = new EnhancedMocha({reporter: ${stringify(
        options.reporter || 'spec'
      )}});`
    );
    source.push(`mocha.addFile(${stringify(`!!${req}`)});`);
    source.push('mocha.watch();');
  } else {
    throw new Error(`Unsupported target environment ${this.target}`);
  }

  return source.join('\n');
}
