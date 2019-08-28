const puppeteer = require('puppeteer-core')
const chalk = require('chalk')
const { config } = require('./config')

let browser
let page
let adapter

// 打开浏览器并导航到搜索网站
async function loadPage() {
  browser = await puppeteer.launch({
    executablePath: config.chrome,
    headless: false
  })
  page = await browser.newPage()
  await page.goto(config.origin)
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
    return adapter.searchMusics(searchContent)
  },
  // 加载更多音乐
  loadMore: function() {
    return adapter.loadMore()
  }
}
