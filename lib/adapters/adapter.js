module.exports = class Adapter {
  constructor(searchContent, url) {
    this.page = 1
    this.search = searchContent
    this.url = 'http://music.ifkdy.com/' || url
  }

  // 搜索音乐，返回music[]
  async searchMusics() {}

  // 加载更多，返回music[]
  async loadMore() {}
}
