
const fs = require('fs')
const path = require('path')
const { prompt } = require('inquirer')
const ora = require('ora')
const { resolve } = require('path')
const chalk = require('chalk');
const { 
  checkExists,
  copyFile,
  copyFolder
} = require('./utils')

const question = [
  {
    type: 'input',
    name: 'project',
    message: 'Project name:',
    // validate (val) {
    //   if (val !== '') {
    //     return true
    //   }
    //   return 'Project name is required!'
    // }
    default: 'abc'
  },
  {
    type: 'input',
    name: 'place',
    message: 'Where to init the project:',
    default: './'
  }
]

const srcPath  = resolve(__dirname, '../template')

const folder = ['bin','public','routes','src','views']

const files = ['.babelrc','.gitignore','app.js','package.json','webpack.config.js','webpack.config.prod.js']

module.exports = prompt(question).then( async ({ project, place }) => {
  const spinner = ora('generate template...')
  spinner.start()
  const tarPath = `${place}${project}/`
  try {
    const isExsit = await checkExists(tarPath, false) 
    if(isExsit){
      console.log(chalk.red('\nProject has exsit! Place checkit or change name!'))
      spinner.stop()
      return;
    }
    await checkExists(tarPath)
    await Promise.all([folder.map( async(item) => {
      await copyFolder(`${srcPath}/${item}`,`${tarPath}${item}`)
    })])
    await Promise.all([files.map( async(item) => {
      await copyFile(`${srcPath}/${item}`,`${tarPath}${item}`)
    })])
  } catch (err) {
    console.log(err)
  }
  spinner.stop()
})
