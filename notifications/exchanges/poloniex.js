module.exports = make => ({
  "name": 'poloniex',
  "period": 10000,
  "checkers": [
    {
      "name": '24hr-low',
      "condition": (lastTicker, currentTicker) => currentTicker.last <= lastTicker.low && (!currentTicker.symbol.includes("/ETH")),
      "update": (lastTicker, currentTicker) => currentTicker,
      "do": data => make(data)
    },
    {
      "name": '24hr-high',
      "condition": (lastTicker, currentTicker) => currentTicker.last >= lastTicker.high && (!currentTicker.symbol.includes("/ETH")),
      "update": (lastTicker, currentTicker) => currentTicker,
      "do": data => make(data)
    },
    {
      "name": 'down-high-15%',
      "condition": (lastTicker, currentTicker) =>
        currentTicker.last < (lastTicker.high - (lastTicker.high * 0.15)) &&
        currentTicker.last === currentTicker.low &&
        (!currentTicker.symbol.includes("/ETH")),
      "update": (lastTicker, currentTicker) => currentTicker,
      "do": data => make(data)
    },
    {
      "name": 'down-last-5%',
      "condition": (lastTicker, currentTicker) => currentTicker.last < (lastTicker.last * 0.95) && (!currentTicker.symbol.includes("/ETH")),
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
      "condition": (lastTicker, currentTicker) => currentTicker.last > (lastTicker.last * 1.03) && (!currentTicker.symbol.includes("/ETH")),
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
    },
    {
      "name": 'crash',
      "condition": (lastTicker, currentTicker) => currentTicker.last < (lastTicker.last * 0.9),
      "update": (lastTicker, currentTicker) => {
        if ((currentTicker.timestamp - lastTicker.timestamp) > 180000) {
          return currentTicker
        } else if (currentTicker.last < (lastTicker.last * 0.9)) {
          return currentTicker
        } else if (currentTicker.last > lastTicker.last) {
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
