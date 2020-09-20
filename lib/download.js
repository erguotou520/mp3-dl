// 根据命令行的配置下载文件到指定的目录
const request = require('../utils/axios')
const fs = require('fs')
const finished = util.promisify(stream.finished)
const { ensureFileSync, ensureDirSync } = require('fs-extra')
const { config } = require('./config')

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
    await toPipe(url, filePath, musicName)
  })
}

async function toPipe(url, filePath, musicName) {
  // url: music下载路径   filePath: 文件路径
  var readableStream = fs.createWriteStream(filePath)
  const res = await request(url)
  res.pipe(readableStream)
  await finished(readableStream)
  console.log(`✿  ${musicName} download success!`)
}

module.exports = {
  downloadSong
}
