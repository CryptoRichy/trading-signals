import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import config from './config-client'

import '../node_modules/materialize-css/dist/css/materialize.min.css'
import '../node_modules/materialize-css/dist/js/materialize.min.js'

const API = config.api
const TIME = config.time
const TYPES = config.types
const EXCHANGES = config.exchanges

ReactDOM.render(<App api={API} time={TIME} types={TYPES} exchanges={EXCHANGES} />, document.getElementById('root'))
registerServiceWorker()
