#!/usr/bin/env node

// var filePath = __dirname
// var currentPath = process.cwd()

var argv = require('yargs')

argv.usage('Usage: $0 <command> [options]')
  .command('init', 'init db.js with cli', function (yargs) {
    return yargs.option('url', {
      alias: 'u',
      default: 'http://yargs.js.org/'
    })
  }, function (argv) {
    console.log(argv.url)
  })
  .command('server', 'admin with http-server ui', function (yargs) {
    return yargs.option('url', {
      alias: 'u',
      default: 'http://yargs.js.org/'
    })
  }, function (argv) {
    console.log(argv.url)
  })
  .example('$0 count -f foo.js', 'count the lines in the given file')
  .help('h')
  .alias('h', 'help')
  .argv
