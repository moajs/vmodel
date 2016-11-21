#!/usr/bin/env node

// var filePath = __dirname
// var currentPath = process.cwd()

var argv = require('yargs')
var inquirer = require('inquirer')

var data = {}

argv.usage('Usage: $0 <command> [options]')
  .command('init', 'init db.js with cli', function (yargs) {
    return yargs.option('config', {
      alias: 'c',
      default: 'config/'
    })
  },
  function (argv) {
    console.log(argv)
    return inquirer.prompt([{
      type: 'list',
      name: 'type',
      message: 'What\'s your db type',
      choices: [
        'Mongodb',
        'MySQL'
      ]
    }]).then(function (answers) {
        // Use user feedback for... whatever!!
      console.log(answers)
      data.type = answers.type

      var dbInfo = {}
      if (answers.type === 'Mongodb') {
        dbInfo = {
          host: '127.0.0.1',
          port: '27017'
        }
      }

      if (answers.type === 'MySQL') {
        dbInfo = {
          host: '127.0.0.1',
          port: '3306'
        }
      }

      inquirer.prompt([{
        type: 'input',
        name: 'host',
        message: 'What\'s your db host',
        default: function () {
          return dbInfo.host
        }
      },
      {
        type: 'input',
        name: 'port',
        message: 'What\'s your db port',
        default: function () {
          return dbInfo.port
        }
      },
      {
        type: 'input',
        name: 'database',
        message: 'What\'s your db name',
        default: function () {
          return 'mydb'
        }

      },
      {
        type: 'confirm',
        name: 'is_auth',
        message: 'What\'s your user auth?',
        default: function () {
          return false
        }

      }]).then(function (answers) {
        for (var k in answers) {
          data[k] = answers[k]
        }
          // Use user feedback for... whatever!!
        if (answers.is_auth === true) {
          inquirer.prompt([
            {
              type: 'input',
              name: 'user',
              message: 'What\'s your user name',
              default: function () {
                return 'admin'
              }

            },
            {
              type: 'password',
              name: 'password',
              message: 'What\'s your password',
              default: function () {
                return ''
              }

            }]).then(function (answers2) {
              for (var k in answers2) {
                data[k] = answers2[k]
              }
              // Use user feedback for... whatever!!
              console.log(data)

              require('./g')(data)
            })
        }

        require('./g')(data)
      })
    })
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
