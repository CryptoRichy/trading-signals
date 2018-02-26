const bittrex = require('./bittrex')
const poloniex = require('./poloniex')
const binance = require('./binance')
const bitfinex = require('./bitfinex')

module.exports = (make) => ([
  bittrex(make),
  poloniex(make),
  binance(make),
  bitfinex(make)
])
