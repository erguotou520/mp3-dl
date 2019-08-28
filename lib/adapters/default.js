const Adapter = require('./adapter')

module.exports = class DefaultAdapter extends Adapter {
  constructor(searchContent) {
    super(searchContent)
  }

  // 搜索音乐，返回music[]
  async searchMusics() {}

  // 加载更多，返回music[]
  async loadMore() {}
}
