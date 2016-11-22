var fs = require('fs')
var path = require('path')
var tpl = require('tpl_apply')
var source = path.join(__dirname, 'tpl.json')
var defaultDest = process.cwd() + '/database.json'

module.exports = function (data) {
  if (fs.existsSync(process.cwd() + '/config')) {
    defaultDest = process.cwd() + '/config/database.json'
  }

  tpl.tpl_apply(source, data, defaultDest)
}
