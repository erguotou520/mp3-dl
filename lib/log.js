const { config } = require('./config')

module.exports = function verboseLog(...args) {
  if (config.verbose) {
    console.log(...args)
  }
}
