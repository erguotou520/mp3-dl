const axios = require('axios')
const fs = require('fs')
const { ensureFileSync, ensureDirSync } = require('fs-extra')
const { config } = require('../lib/config')

async function downloadSong(answers) {
  answers.forEach(async r => {
    let reg = new RegExp('\\(', 'g')
    let result,
      index = undefined
    // 根据左括号(截取
    while ((result = reg.exec(r)) != null) {
      index = reg.lastIndex
    }
    if (index === undefined) {
      return ora('音乐数据暂时无法下载').fail()
    }
    const url = r.substring(index, r.length - 1)
    const musicName = r.substring(0, index - 1)
    const filePath = `${config.output}/${musicName}.mp3`
    // 创建目录
    ensureDirSync(config.output)
    // 创建文件名
    ensureFileSync(filePath)
    // 管道pipe流入
    await toPipe(url, filePath)
  })
}

async function toPipe(url, filePath) {
  // url: music下载路径   filePath: 文件路径
  return new Promise(resolve => {
    var readableStream = fs.createWriteStream(filePath)
    axios({
      method: 'get',
      url,
      responseType: 'stream' // 服务器响应的数据类型
    }).then(res => {
      res.data.pipe(readableStream)
      readableStream.end(`${musicName} download success!`)
      resolve()
    })
  })
}

module.exports = {
  downloadSong
}
