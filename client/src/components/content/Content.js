import React from 'react'
import './Content.css'
import Notification from './notification/Notification'

let Content = function Content(props) {
  let contentToRender

  if (props.notifications.length > 0) {
    let notificationsToRender = props.notifications
      .filter((notification) => Date.parse(notification.time.replace(/-/g, "/")) - Date.now() < props.time * 1000 * 60)
      .filter((notification) => {
        if (props.types.length === 0) return true
        return props.types.includes(notification.name)
      })
      .filter((notification) => {
        if (props.exchanges.length === 0) return true
        return props.exchanges.includes(notification.exchange)
      })

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

export default Content
