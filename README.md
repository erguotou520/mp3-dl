# MP3下载工具
借助现有的一些全网音乐搜索网站，利用`Puppeteer`进行爬虫搜索获取音乐信息后执行下载。

## 用法
- `mp3-dl`, `mp3-dl -h` `mp3-dl --help` 打印帮助信息
- `mp3-dl -v`, `mp3-dl --version` 显示当前版本
- `mp3-dl 歌手/音乐 [-o /path/to/save] [-O https://muc.cheshirex.com] [-a default|mk|mm] [--with-lrc] [--verbose]` 搜索并下载音乐，`-o`指定下载目录，`-O`指定下载地址, `-a`指定下载适配器，`--with-lrc`同时下载歌词，`--verbose`显示详细信息

## 安装方法
安装前请确认本机已安装Chrome浏览器
```shell
npm i -g mp3-dl
# or
# yarn global add mp3-dl
```

## 全局设置
可以通过添加全局配置文件的方式来跳过每次下载时都设置参数的麻烦，配置文件地址为`~/.mp3-dl/config.json`，配置文件内容如下（配置内容同命令行）：

```json
{
  "output": "/path/to/save",
  "origin": "https://muc.cheshirex.com",
  "adapter": "default",
  "downloadLRC": true,
  "verbose": true
}
```

## 免责声明
本工具仅适用于个人学习和日常的mp3下载，请勿滥用本工具，否则由此造成的问题概不负责。

如果有设计到下载网站的侵权行为请告知，我们将删去相关代码。
