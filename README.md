[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![chat][chat]][chat-url]

<div align="center">
  <img width="200" height="200"
    src="https://cdn.worldvectorlogo.com/logos/mocha.svg">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" hspace="20"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Mocha Loader</h1>
  <h3>Mocha for webpack</h3>
</div>

<h2 align="center">Install</h2>

```bash
npm install --save-dev mocha-loader
```

<h2 align="center">Usage</h2>

### Configuration (recommended)

**webpack.config.js**
```js

module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  }
}
```

```js
import test from './test'
```

### CLI

```bash
webpack --module-bind 'mocha-loader!./test'
```

```js
import test from './test'
```

### Require

```js
import test from 'mocha-loader!./test'
```

<h2 align="center">Options</h2>

<h2 align="center">Maintainer</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/166921?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/533616?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/3408176?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/mocha-loader.svg
[npm-url]: https://npmjs.com/package/mocha-loader

[deps]: https://david-dm.org/webpack/mocha-loader.svg
[deps-url]: https://david-dm.org/webpack/mocha-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
