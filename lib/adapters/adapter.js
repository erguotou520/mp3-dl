module.exports = class Adapter {
  constructor(searchContent) {
    this.page = 1
    this.search = searchContent
  }

  // 搜索音乐，返回music[]
  async searchMusics() {}

  // 加载更多，返回music[]
  async loadMore() {}
}
