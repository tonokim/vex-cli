
// todo

// const fs = require('fs')
// const path = require('path')
// const { prompt } = require('inquirer')
// const ora = require('ora')
// const { resolve } = require('path')
// const { 
//   checkExists,
//   copyFile,
//   copyFolder,
//   writeFile,
//   readFile,
//   upper
// } = require('./utils')


// const question = [
//   {
//     type: 'input',
//     name: 'type',
//     message: 'type: [1:page, 2:component, 3:store]',
//     default: '1'
//   },
//   {
//     type: 'input',
//     name: 'name',
//     message: 'template name:',
//     validate (val) {
//       if (val !== '') {
//         return true
//       }
//       return 'template name is required!'
//     }
//   }
// ]

// const srcPath  = resolve(__dirname, '../viewtemplate')
// const files = ['index.js','style.less']

// const typeDict = {
//   1: 'page',
//   2: 'component',
//   3: 'store'
// }
// const folderDict = {
//   1: 'containers',
//   2: 'components',
//   3: 'stores',
// }
// module.exports = prompt(question).then( async ({ type, name }) => {
//   const spinner = ora(`generate ${typeDict[type]} template...`)
//   spinner.start()
//   const tarPath = `./src/${folderDict[type]}/${name}/`
//   try {
//     switch (type) {
//       case '1':
//       case '2':
//         await checkExists(tarPath)
//         await Promise.all([files.map( async(item) => {
//           await copyFile(`${srcPath}/${item}`,`${tarPath}${item}`)
//         })])
//         break;
//       case '3':
//         let storeContent = await readFile(`${srcPath}/store.js`);
//         storeContent = storeContent.replace(/Test/g, upper(name))
//         await writeFile(`./src/stores/${name}.js`, storeContent)
//         break;
//       default:
//         break;
//     }
   
//   } catch (err) {
//     console.log(err)
//   }
//   spinner.stop()
// })
