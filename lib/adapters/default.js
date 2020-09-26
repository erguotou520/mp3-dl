const Adapter = require('./adapter')
async function addResponseListener(page, searchContent, url) {
  // 拦截
  return new Promise((resolve, reject) => {
    page.on('response', async resp => {
      if (resp.ok()) {
        const postData = resp.request()._postData
        const method = resp
          .request()
          .method()
          .toLowerCase()
        if (resp.url() === url && method === 'post' && postData.indexOf(`input=${encodeURI(searchContent)}`) > -1) {
          const json = await resp.json()
          if (json.data) {
            resolve(json.data)
            return
          }
          resolve([])
        }
      }
    })
  })
}

module.exports = class DefaultAdapter extends Adapter {
  constructor(searchContent, url) {
    super(searchContent, url)
  }

  // 搜索音乐，返回music[]
  searchMusics(page) {
    return addResponseListener(page, this.search, this.url)
  }

  // 加载更多，返回music[]
  async loadMore() {}
}
