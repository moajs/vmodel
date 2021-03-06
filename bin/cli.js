#!/usr/bin/env node
'use strict'

/**
 * Module dependencies.
 */

var argv = require('yargs')

argv.usage('Usage: $0 <command> [options]')
  .command('init', 'init db.js with cli', function (yargs) {
    yargs.option('yes', {
      alias: 'u',
      default: 'config/'
    })
    return yargs.option('config', {
      alias: 'c',
      default: 'config/'
    })
  },
  function (argv) {
    require('./init/init')(argv)
  })
  .command('server', 'admin with http-server ui', function (yargs) {
    yargs.option('ip', {
      alias: 'i',
      default: '127.0.0.1'
    })

    yargs.option('port', {
      alias: 'p',
      default: '8000'
    })

    yargs.option('open', {
      alias: 'o'
    })

    yargs.option('url', {
      alias: 'u',
      default: 'http://yargs.js.org/'
    })

    return yargs
  }, function (argv) {
    console.log(argv.url)
  })
  .example('$0 count -f foo.js', 'count the lines in the given file')
  .help('h')
  .alias('h', 'help')
  .argv
