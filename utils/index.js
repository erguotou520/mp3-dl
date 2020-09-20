function delay(max, min) {
  // max：最大值 单位ms
  // min: 最小值 单位ms
  // 时间范围向下取整
  return Math.floor(Math.random() * (max - min)) + min
}
// 按钮随机
function radioRandom() {
  return Math.ceil(Math.random(0, 1) * 14)
}

module.exports = {
  delay,
  radioRandom
}
