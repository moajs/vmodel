'use strict'

/**
 * Module dependencies.
 */

var debug = require('debug')('vmodel')
var inquirer = require('inquirer')

/**
 * Exports
 */

var data = {
  type: 'Mongodb',
  host: '127.0.0.1',
  port: '27017',
  database: 'mydb'
}

module.exports = function (argv) {
  debug(argv)
  if (argv.y) {
    debug(data)
    return require('./g')(data)
  }
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
    debug(answers)
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
            debug(data)
            require('./g')(data)
          })
      }

      require('./g')(data)
    })
  })
}
