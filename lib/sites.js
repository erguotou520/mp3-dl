const os = require('os')
const path = require('path')
const { readJSONSync, existsSync, ensureFileSync, writeJSONSync } = require('fs-extra')
const globalSitesPath = path.resolve(os.homedir(), '.mp3-dl/sites.json')
// 添加一个读取配置文件的功能 默认检测如果没有这个文件则用默认配置生成文件
// 这个配置文件是一个json 存一个更新时间 一个site list 每个site item包含网页地址 adapter 失败次数
// 然后在config.js里读取这个配置 导出排序（优先按照失败次数倒叙，其次数组正序）后的site数组
const sites = {
  updateTime: new Date(), // 更新时间
  siteList: []
}
const siteItem = {
  adapter: 'default', // 网站程序的类型名称
  origin: 'https://muc.cheshirex.com', // 网址
  errorCount: 1 // 失败次数
}

function loadGlobalSites() {
  if (existsSync(globalSitesPath)) {
    // 文件已存在，读取
    try {
      const _sites = readJSONSync(globalSitesPath)
      Object.assign(sites, _sites)
    } catch (error) {
      // 状态记录文件读取错误
      console.warn(chalk.yellow('状态记录文件读取失败，将使用默认状态'))
    }
  } else {
    // 文件不存在，保存默认状态
    writeSites()
  }
}

// 更新次数
function updateCount(args) {
  // args 参数，音乐网址
  // 失败情况
  // 寻找siteList中是否存在过args
  let index = sites.siteList.findIndex(r => {
    return r.origin === args
  })
  if (index !== -1) {
    // 存在
    sites.siteList[index].errorCount++
  } else {
    // 不存在
    siteItem.origin = args
    sites.siteList.push(siteItem)
  }
  // 更新本地sites.json
  sitesSort()
}

// 优先按照失败次数倒叙，其次数组正序
function sitesSort() {
  sites.siteList.sort((a, b) => {
    return b.errorCount - a.errorCount
  })
  writeSites()
}

// 写入sites数据, 更新数据
function writeSites() {
  try {
    ensureFileSync(globalSitesPath)
    writeJSONSync(globalSitesPath, sites)
  } catch (error) {
    setTimeout(() => {
      require('./log')(chalk.yellow('写入sites状态记录文件失败'))
    }, 1)
  }
}

module.exports = {
  sites,
  updateCount,
  loadGlobalSites
}
