const controller = require('check-markets-crypto')
const exchanges = require(__dirname + '/exchanges')

const make = (data) => {
  process.argv[2] === 'child' ? process.send(data) : console.log(data)
}

let obj = {
  'exchanges': exchanges(make)
}

controller(obj)
