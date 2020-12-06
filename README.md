# MP3下载工具
借助现有的一些全网音乐搜索网站，利用`Puppeteer`进行爬虫搜索获取音乐信息后执行下载。

## 用法
- `[-h|--help]` 打印帮助信息
- `[-v|--version]` 显示当前版本
- `[-o|--output /path/to/save]` 下载保存位置
- `[-O|--origin https://muc.cheshirex.com]` 下载网站来源
- `[-a|--adapter default|mk|mm]` 适配器，根据网站决定
- `[-c|--chrome /path/to/chrome]` 如果自动查找chrome安装位置失败时需要手动指定chrome的安装目录
- `[--with-lrc]` 同时下载歌词
- `[--verbose]` 显示详细信息

## 示例
```bash
# 打印帮助信息
mp3-dl -h
# 显示当前版本
mp3-dl -v
# 下载“丑八怪”的mp3和歌词到指定目录并打印详细信息
mp3-dl 丑八怪 -o ~/Documents/Musics --lrc --verbose
# 默认下载搜索到的第一个mp3
mp3-dl 丑八怪 -y
```

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
  "chromePath": "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome",
  "output": "/path/to/save",
  "origin": "https://muc.cheshirex.com",
  "adapter": "default",
  "downloadLRC": true,
  "verbose": true
}
```

## 开发

```shell
# 安装依赖
yarn

# 运行
yarn start
```

## 免责声明
本工具仅适用于个人学习和日常的mp3下载，请勿滥用本工具，否则由此造成的问题概不负责。

如果有设计到下载网站的侵权行为请告知，我们将删去相关代码。
