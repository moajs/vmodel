var path = require('path')
var tpl = require('tpl_apply')
var source = path.join(__dirname, 'tpl.json')
var defaultDest = process.cwd() + '/1database.json'

module.exports = function (data) {
  if (data.dest) {
    defaultDest = process.cwd() + '/' + data.dest + '/database.json'
  }

  tpl.tpl_apply(source, data, defaultDest)
}
