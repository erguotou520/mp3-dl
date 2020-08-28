const Adapter = require('./adapter')

async function addResponseListener(page) {
  // 拦截
  return new Promise((resolve, reject) => {
    page.on('response', async resp => {
      if (resp.ok()) {
        const url = resp.url()
        const method = resp
          .request()
          .method()
          .toLowerCase()
        if (url.indexOf('http://music.ifkdy.com') > -1 && method === 'post') {
          try {
            const json = await resp.json()
            resolve(json.data)
          } catch (error) {
            resolve([])
          }
        }
      }
    })
  })
}

module.exports = class DefaultAdapter extends Adapter {
  constructor(searchContent) {
    super(searchContent)
  }

  // 搜索音乐，返回music[]
  async searchMusics(page) {
    return addResponseListener(page)
  }

  // 加载更多，返回music[]
  async loadMore() {}
}
