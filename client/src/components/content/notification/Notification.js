import React, { Component } from 'react'
import './Notification.css'
import Table from './table/Table'

class Notification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      "show": false
    }
  }

  showInformation() {
    this.setState((prevState, props) => ({ "show": !prevState.show }))
  }

  render() {
    let table
    if (this.state.show) {
      table = <Table data={this.props.notification.result} />
    }

    return (
      <div className="Notification-content" onDoubleClick={this.showInformation.bind(this)}>
        <div className="Notification-header valign-wrapper">
          <div className="row">
            <div className="col s12 l10">
              <h4>Tipo: {this.props.notification.name}</h4>
              <h4>Exchange: {this.props.notification.exchange}</h4>
              <h4>Tiempo: {this.props.notification.time}</h4>
            </div>
          </div>
        </div>
        <div className="Notification-table">
          {this.state.show && table}
        </div>
      </div>
    )
  }
}

export default Notification