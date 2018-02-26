module.exports = make => ({
  "name": 'binance',
  "period": 10000,
  "checkers": [
    {
      "name": '24hr-low',
      "condition": (lastTicker, currentTicker) => currentTicker.last <= lastTicker.low,
      "update": (lastTicker, currentTicker) => currentTicker,
      "do": data => make(data)
    },
    {
      "name": '24hr-high',
      "condition": (lastTicker, currentTicker) => currentTicker.last >= lastTicker.high,
      "update": (lastTicker, currentTicker) => currentTicker,
      "do": data => make(data)
    },
    {
      "name": 'down-high-15%',
      "condition": (lastTicker, currentTicker) => currentTicker.last < (lastTicker.high - (lastTicker.high * 0.15)),
      "update": (lastTicker, currentTicker) => currentTicker,
      "do": data => make(data)
    },
    {
      "name": 'down-last-5%',
      "condition": (lastTicker, currentTicker) => currentTicker.last < (lastTicker.last * 0.95),
      "update": (lastTicker, currentTicker) => {
        if ((currentTicker.timestamp - lastTicker.timestamp) > 600000) {
          return currentTicker
        } else if (currentTicker.last < (lastTicker.last * 0.95)) {
          return currentTicker
        } else if (currentTicker.last > lastTicker.last) {
          return currentTicker
        } else {
          return lastTicker
        }
      },
      "do": data => make(data)
    },
    {
      "name": 'up-last-3%',
      "condition": (lastTicker, currentTicker) => currentTicker.last > (lastTicker.last * 1.03),
      "update": (lastTicker, currentTicker) => {
        if ((currentTicker.timestamp - lastTicker.timestamp) > 600000) {
          return currentTicker
        } else if (currentTicker.last > (lastTicker.last * 1.03)) {
          return currentTicker
        } else if (currentTicker.last < lastTicker.last) {
          return currentTicker
        } else {
          return lastTicker
        }
      },
      "do": data => make(data)
    }
  ],
  "error": function (error) {
    setTimeout(() => this.getTickers(), 60000)
  }
})
