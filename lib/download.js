// 根据命令行的配置下载文件到指定的目录
const request = require('../utils/axios')
const fs = require('fs')
const path = require('path')
const util = require('util')
const stream = require('stream')
const finished = util.promisify(stream.finished)
const { ensureFileSync, ensureDirSync } = require('fs-extra')
const { config } = require('./config')
const chalk = require('chalk')

async function downloadSong(answers, isDowLrc) {
  answers.forEach(async r => {
    const musicName = `${r.author}-${r.title}`
    // 管道pipe流入
    // 请求mp3，若mp3请求不到，则lrc定取不到
    if (!(await toPipe(r.url, musicName, 'mp3'))) {
      console.log(`${musicName} download error!`)
      return
    }
    if (!isDowLrc) {
      console.log(
        chalk.blue(`✿  ${musicName} download success!
        Download directory: ${config.output}`)
      )
      return
    }
    // 请求歌词
    if (!(await toPipe(r.url, musicName, 'lrc'))) return
    console.log(
      chalk.blue(`✿  ${musicName} and The lyrics download success!
      Download directory: ${config.output}`)
    )
  })
}
// 测试数据test： mp3-dl 红豆 -lrc
// todo：此处歌词查询不到，是否从别处下载
async function toPipe(url, musicName, suffixName) {
  return new Promise(async (resolve, reject) => {
    try {
      // url: music下载路径   filePath: 文件路径
      const res = await request(url)
      // 创建目录
      ensureDirSync(config.output)
      // 创建文件名
      const filePath = path.resolve(config.output, `${musicName}.${suffixName}`)
      ensureFileSync(filePath)
      var readableStream = fs.createWriteStream(filePath)
      res.pipe(readableStream)
      await finished(readableStream)
      resolve(true)
    } catch (error) {
      reject()
    }
  })
}

module.exports = {
  downloadSong
}
