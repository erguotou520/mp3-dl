const puppeteer = require('puppeteer-core')
const chalk = require('chalk')
const { config } = require('./config')
const { delay } = require('../utils')
const max =  500, min = 200
let browser
let page
let adapter

// 打开浏览器并导航到搜索网站
async function loadPage(searchContent) {
  browser = await puppeteer.launch({
    executablePath: config.chrome,
    headless: false
  })
  page = await browser.newPage()
  await page.goto(config.origin)
  await getDocument(page, searchContent)
  return adapter.searchMusics(page, searchContent)
}

// 加入延迟
function getDocument(page, searchContent) {
  // page: Page实例, searchContent: 歌曲名称
  return new Promise(resolve => {
    setTimeout(async () => {
      const input = await page.$('#j-input')
      // 写入搜素的歌曲名称
      await input.type(searchContent)
      // 点击确定按钮
      await page.click('#j-submit', { delay: delay(max, min) })
      resolve()
    }, delay(max, min))
  })
}

// 选择adapter
async function getAdapter() {
  // 查找适配器
  const Adapter = require(`./adapters/${config.adapter}.js`)
  adapter = new Adapter()
}

module.exports = {
  // 根据搜索内容查找可下载音乐列表或者返回搜索失败或空结果
  search: function(searchContent) {
    getAdapter()
    // 根据内容搜索，返回列表
    return loadPage(searchContent)
  },
  // 加载更多音乐
  loadMore: function() {
    return adapter.loadMore()
  }
}
