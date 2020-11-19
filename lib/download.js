// 根据命令行的配置下载文件到指定的目录
const request = require('../utils/axios')
const fs = require('fs')
const path = require('path')
const util = require('util')
const stream = require('stream')
const finished = util.promisify(stream.finished)
const { ensureFileSync, ensureDirSync } = require('fs-extra')
const { config } = require('./config')

async function downloadSong(answers, isDowLrc) {
  answers.forEach(async r => {
    const musicName = `${r.author}-${r.title}`
    // 管道pipe流入
    await toPipe(r.url, musicName)
    if (isDowLrc) {
      await downloadLrc(r.url, musicName)
    }
  })
}

async function toPipe(url, musicName) {
  try {
    // url: music下载路径   filePath: 文件路径
    const res = await request(url)
    // 创建目录
    ensureDirSync(config.output)
    // 创建文件名
    const filePath = path.resolve(config.output, `${musicName}.mp3`)
    ensureFileSync(filePath)
    var readableStream = fs.createWriteStream(filePath)
    res.pipe(readableStream)
    await finished(readableStream)
    console.log(`✿  ${musicName} download success!`)
  } catch (error) {
    console.log(`${musicName} download error!`)
  }
}
// 测试数据test： mp3-dl 红豆 -lrc
// todo：此处歌词查询不到，是否从别处下载
async function downloadLrc(url, musicName) {
  try {
    // url: music下载路径   lrcPath: 歌词路径
    const res = await request(url)
    // 创建目录
    ensureDirSync(config.output)
    // 创建文件名
    const lrcPath = path.resolve(config.output, `${musicName}.lrc`)
    ensureFileSync(lrcPath)
    var readableStream = fs.createWriteStream(lrcPath)
    res.pipe(readableStream)
    await finished(readableStream)
    console.log(`✿  ${musicName} lrc download success!`)
  } catch (error) {
    console.log(`${musicName} lrc download error!`)
  }
}

module.exports = {
  downloadSong
}
