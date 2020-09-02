function delay(max, min) {
  // max：最大值 单位ms
  // min: 最小值 单位ms
  // 时间范围向下取整
  return Math.floor(Math.random() * (max - min)) + min
}

module.exports = {
  delay
}
