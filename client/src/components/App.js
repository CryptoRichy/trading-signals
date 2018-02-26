import React, { Component } from 'react'
import './App.css'
import Header from './header/Header'
import Form from './form/Form'
import Content from './content/Content'
import Footer from './footer/Footer'
import io from 'socket.io-client'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      "notifications": [],
      "time": this.props.time,
      "types": [],
      "exchanges": []
    }
    this.socket = io.connect(this.props.api)
  }

  componentDidMount() {
    this.socket.on('all', (data) => this.updateNotifications(data))
    this.socket.on('connect_error', () => {
      window.Materialize.toast('Servidor de notificaciones no disponible!', 3000, 'rounded')
    })
    this.resetWithTime()
  }

  updateNotifications(data) {
    this.setState((prevState, props) => {
      let newNotifications = [...prevState.notifications]
      newNotifications.unshift(data)
      return {
        'notifications': newNotifications
      }
    })
  }

  resetWithTime() {
    if (this.timerID) clearInterval(this.timerID)
    this.timerID = setInterval(() => {
      this.setState((prevState, props) => {
        let now = Date.now()
        let tempNotifications = prevState.notifications.filter((notification) =>
          Date.parse(notification.time) > now - (prevState.time * 1000 * 60)
        )
        return { "notifications": tempNotifications }
      })
    }, 1000)
  }

  reset() {
    this.setState({ 'notifications': [] })
  }

  changeTime(event) {
    this.setState({ 'time': event.target.value })
    this.resetWithTime()
  }

  changeTypes(value) {
    this.setState({ 'types': value })
  }

  changeExchanges(value) {
    this.setState({ 'exchanges': value })
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <Form
          time={this.state.time}
          changeTime={this.changeTime.bind(this)}
          types={this.state.types}
          typesToSelect={this.props.types}
          changeTypes={this.changeTypes.bind(this)}
          exchanges={this.state.exchanges}
          exchangesToSelect={this.props.exchanges}
          changeExchanges={this.changeExchanges.bind(this)}
          reset={this.reset.bind(this)}
        />
        <div className='divider' />
        <Content notifications={this.state.notifications} types={this.state.types} exchanges={this.state.exchanges} time={this.state.time} />
        <Footer />
      </div>
    )
  }
}

export default App
