import React, { Component } from 'react'
import './Content.css'
import Notification from './notification/Notification'

class Content extends Component {
  constructor(props) {
    super(props)
    this.isAClass = true // I do not want to see the message useless constructor
  }

  notify() {
      if (!("Notification" in window)) {
        window.Materialize.toast('Nuevas señales!!!', 3000, 'rounded')
      }
    
      else if (window.Notification.permission === "granted") {
        new window.Notification("Nuevas señales!!!")
      }

      else if (window.Notification.permission !== "denied") {
        window.Notification.requestPermission(function (permission) {
          if (permission === "granted") {
            new window.Notification("Nuevas señales!!!");
          }
        })
      }
  }

  render() {
    let contentToRender
    if (this.props.notifications.length > 0) {
      let notificationsToRender = this.props.notifications
        .filter((notification) => Date.parse(notification.time) - Date.now() < this.props.time * 1000 * 60)
        .filter((notification) => {
          if (this.props.types.length === 0) return true
          return this.props.types.includes(notification.name)
        })
        .filter((notification) => {
          if (this.props.exchanges.length === 0) return true
          return this.props.exchanges.includes(notification.exchange)
        })
      
      // if (notificationsToRender.length > 0 && this.props.types.length > 0 && this.props.exchanges.length > 0) this.notify()

      contentToRender = notificationsToRender
        .map((notification) => <Notification notification={notification} key={notification.name + notification.exchange + notification.time} />)
    } else {
      contentToRender = (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      )
    }

    return (
      <main className="App-content valign-wrapper">
        <div className="container">
          {contentToRender}
        </div>
      </main>
    )
  }
}

export default Content
