/**
 * 运行配置相关
 */
const os = require('os')
const path = require('path')
const chalk = require('chalk')
const { readJSONSync, existsSync, ensureFileSync, writeJSONSync } = require('fs-extra')

// 配置
const config = {
  chrome: '',
  output: process.cwd(),
  origin: 'https://muc.cheshirex.com',
  adapter: 'default',
  downloadLRC: false,
  verbose: false
}

// 全局配置文件路径
const globalConfigPath = path.resolve(os.homedir(), '.mp3-dl/config.json')

// 获取默认chrome的安装位置
function getDefaultchrome() {
  if (process.platform === 'win32') {
    return 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  } else {
    return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  }
}

// 初始化读取
function init() {
  loadGlobalConfig()
  if (!config.chrome) {
    config.chrome = getDefaultchrome()
  }
  setTimeout(() => {
    require('./log')(chalk.blue('当前配置'))
    require('./log')(JSON.stringify(config, null, 2))
  }, 1)
}

// 读取全局配置文件
function loadGlobalConfig() {
  if (existsSync(globalConfigPath)) {
    // 文件已存在，读取
    try {
      const _config = readJSONSync(globalConfigPath)
      Object.assign(config, _config)
    } catch (error) {
      // 配置文件读取错误
      console.warn(chalk.yellow('全局配置文件读取失败，将使用默认配置'))
    }
  } else {
    // 文件不存在，保存默认配置
    try {
      ensureFileSync(globalConfigPath)
      writeJSONSync(globalConfigPath, config)
    } catch (error) {
      // 写入错误，不做处理
      setTimeout(() => {
        require('./log')(chalk.yellow('写入配置文件失败'))
      }, 1)
    }
  }
}

// 根据命令行参数返回当前命令行运行时的配置
function mergeConfig(argv) {
  Object.keys(config).forEach(key => {
    if (argv[key] !== undefined) {
      config[key] = argv[key]
    }
  })
  if (argv['with-lrc']) {
    config.downloadLRC = true
  }
}

init()
module.exports = {
  config,
  mergeConfig
}
