import test from 'ava'
var fs = require('fs')
var exec = require('co-exec')

test('$ vmodel init -y', function * (t) {
  yield exec('node ../bin/cli.js init -y')
  t.true(fs.existsSync('./database.json'))
})
