const Adapter = require('./adapter')
const request = require('../../utils/axios')

async function addResponseListener(page, searchContent) {
  // 拦截
  return new Promise((resolve, reject) => {
    page.on('response', async resp => {
      if (resp.ok()) {
        const url = resp.url()
        const postData = resp.request()._postData
        const method = resp
          .request()
          .method()
          .toLowerCase()
        if (
          url === 'http://music.ifkdy.com/' &&
          method === 'post' &&
          postData.indexOf(`input=${encodeURI(searchContent)}`) > -1
        ) {
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
  constructor(searchContent) {
    super(searchContent)
  }

  // 搜索音乐，返回music[]
  async searchMusics(page, searchContent) {
    return addResponseListener(page, searchContent)
  }

  // 加载更多，返回music[]
  async loadMore() {}
}
