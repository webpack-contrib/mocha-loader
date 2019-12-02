/* global window document */
window.addEventListener('DOMContentLoaded', function runMocha() {
  if (!document.getElementById('mocha')) {
    // eslint-disable-next-line
    var mochaContainer = document.createElement('div');
    mochaContainer.id = 'mocha';
    document.body.appendChild(mochaContainer);
  }
  mocha.run();
});
