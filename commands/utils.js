
const fs = require('fs')
const path = require('path')

const checkExists = (dst, isCreate = true) => new Promise((resolve, reject) => {
  fs.exists(dst,(exists) => {
    if(exists){//存在
      resolve(true);
    }else{//不存在
      if(isCreate){
        fs.mkdir(dst, (err) => {//创建目录
          if(err){
            return reject(err)
          }
          resolve();
        })
      }else {
        resolve(false);
      }
    }
  })
})

const copyFile = (srcPath, tarPath) => new Promise((resolve, reject) => {
  const ws = fs.createWriteStream(tarPath).on('error', (err) => {
    if (err) { return reject(err) }
    resolve()
  }).on('close', (ex) => { resolve() })
  fs.createReadStream(srcPath).on('error', (err) => {
    if (err) { reject(err) }
  }).pipe(ws)
})

const copyFolder = (srcDir, tarDir) => new Promise( async (resolve, reject) => {
  await checkExists(tarDir)
  fs.readdir(srcDir, (err, files) => {
    let count = 0
    const checkEnd = function() {
      ++count == files.length && resolve()
    }
    if (err) {
      return reject()
    }
    files.forEach((file) => {
      const srcPath = path.join(srcDir, file)
      const tarPath = path.join(tarDir, file)
      fs.stat(srcPath, async (err, stats) => {
        try {
          if (stats.isDirectory()) {
            console.log('mkdir', tarPath)
            await checkExists(tarPath)
            await copyFolder(srcPath, tarPath)
          } else {
            await copyFile(srcPath, tarPath)
          }
          checkEnd()
        } catch (err) {
          reject()
        }
      })
    })

    files.length === 0 && resolve()
  })
})

const writeFile = (filename, data) => {
  return new Promise( (resolve, reject) => {
      fs.writeFile(filename, data, (err) => {
        if(err){
          console.log(err)
        }
        resolve();
      })
  });
  
};
const readFile = (filename) => {
  return new Promise( (resolve, reject) => {
      fs.readFile(filename,  {flag: 'r+', encoding: 'utf8'}, (err, data) => {
          resolve(data);
      });
  });
};


const upper = (str) => str.substr(0,1).toUpperCase() + str.substr(1)

module.exports = {
  checkExists,
  copyFile,
  copyFolder,
  writeFile,
  readFile,
  upper
}