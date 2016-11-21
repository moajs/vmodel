var path = require('path')
var tpl = require('tpl_apply')
var source = path.join(__dirname, 'tpl.json')
var defaultDest = process.cwd() + '/database.json'

module.exports = function (data, dest) {
  if (dest) {
    defaultDest = dest
  }

  tpl.tpl_apply(source, data, defaultDest)
}
