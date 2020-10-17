// 根据命令行的配置下载文件到指定的目录
const request = require('../utils/axios')
const fs = require('fs')
const path = require('path')
const util = require('util')
const stream = require('stream')
const finished = util.promisify(stream.finished)
const { ensureFileSync, ensureDirSync } = require('fs-extra')
const { config } = require('./config')

async function downloadSong(answers) {
  answers.forEach(async r => {
    const musicName = `${r.author}-${r.title}`
    const filePath = path.resolve(config.output, `${musicName}.mp3`)
    // 管道pipe流入
    await toPipe(r.url, filePath, musicName)
  })
}

async function toPipe(url, filePath, musicName) {
  try {
    // url: music下载路径   filePath: 文件路径
    const res = await request(url)
    // 创建目录
    ensureDirSync(config.output)
    // 创建文件名
    ensureFileSync(filePath)
    var readableStream = fs.createWriteStream(filePath)
    res.pipe(readableStream)
    await finished(readableStream)
    console.log(`✿  ${musicName} download success!`)
  } catch (error) {
    console.log(`${musicName} download error!`)
  }
}

module.exports = {
  downloadSong
}
