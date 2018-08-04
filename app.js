const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const Records = require('spike-records')
const sugarml = require('sugarml')
const sugarss = require('sugarss')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const utils = require('./utils.js')
const env = process.env.SPIKE_ENV
const locals = {}

const articles = yaml.safeLoad(fs.readFileSync('content/articles.yml', 'utf8'))
const authors = yaml.safeLoad(fs.readFileSync('content/authors.yml', 'utf8'))

locals.articleList = utils.articleList(articles, authors)

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.sss' },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', 'content/*', 'readme.md', 'yarn.lock', 'package-lock.json'],
  reshape: htmlStandards({
    parser: sugarml,
    locals: (ctx) => locals,
    root: path.join(__dirname, 'views'),
    minify: env === 'production'
  }),
  postcss: cssStandards({
    parser: sugarss,
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  }),
  babel: jsStandards(),
  plugins: [
    new Records({
      addDataTo: locals,
    }),
  ],
}
