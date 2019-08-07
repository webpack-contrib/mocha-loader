import path from 'path';

import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';

import schema from './options.json';

export default function loader() {}

const startScriptPath = path.join(__dirname, 'start.js');
const webScriptPath = path.join(__dirname, 'web.js');
const enhancedMochaPath = path.join(__dirname, 'EnhancedMocha.js');

export function pitch(req) {
  const options = getOptions(this) || {};

  validateOptions(schema, options, 'mocha-loader');

  options.ui = options.ui || 'bdd';

  const source = [];
  if (this.target === 'web' || this.target === 'electron-renderer') {
    source.push(`import ${JSON.stringify(`!!${webScriptPath}`)};`);
    source.push(
      "if(typeof window !== 'undefined' && window.initMochaPhantomJS) { window.initMochaPhantomJS(); }"
    );
    source.push(`mocha.setup(${JSON.stringify(options)});`);
    source.push(`import ${JSON.stringify(`!!${req}`)}`);
    source.push(`import ${JSON.stringify(`!!${startScriptPath}`)};`);
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
      `import EnhancedMocha from ${JSON.stringify(`!!${enhancedMochaPath}`)};`
    );
    source.push(
      `const mocha = new EnhancedMocha({reporter: ${JSON.stringify(
        options.reporter || 'spec'
      )}});`
    );
    source.push(`mocha.addFile(${JSON.stringify(`!!${req}`)});`);
    source.push('mocha.watch();');
  } else {
    throw new Error(`Unsupported target environment ${this.target}`);
  }

  return source.join('\n');
}
