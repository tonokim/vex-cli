#!/usr/bin/env node --harmony
'use strict'
process.env.NODE_PATH = __dirname + '/../node_modules/'

const { resolve } = require('path')

const res = command => resolve(__dirname, './commands/', command)

const program = require('commander')

program
  .version(require('./package').version )

program
    .usage('<command>')

program
  .command('init')
  .description('Generate a new project')
  .alias('i')
  .action(() => {
    require(res('init'))
  })

// program
//   .command('add')
//   .description('Add a new template')
//   .alias('a')
//   .action(() => {
//     require(res('add'))
//   })
  
program.parse(process.argv)

if(!program.args.length){
  program.help()
}

// https://segmentfault.com/a/1190000006190814#articleHeader6
// https://medium.freecodecamp.org/part-1-react-app-from-scratch-using-webpack-4-562b1d231e75