import React, { Component } from 'react'
import './Form.css'
import $ from 'jquery'

class Form extends Component {
  constructor(props) {
    super(props)
    this.isAClass = true // I do not want to see the message useless constructor
  }

  submit(event) {
    event.preventDefault()
  }

  componentDidMount() {
    $().ready(function () {
      $('select').material_select()
    })
    $('#select_types').on('change', () => {
      this.props.changeTypes($('#select_types').val())
    })
    $('#select_exchanges').on('change', () => {
      this.props.changeExchanges($('#select_exchanges').val())
    })
  }

  render() {
    let optionsTypes = this.props.typesToSelect.map((type) => {
      return <option value={type} key={type}>{type}</option>
    })

    let optionsExchanges = this.props.exchangesToSelect.map((exchange) => {
      return <option value={exchange} key={exchange}>{exchange}</option>
    })

    return (
      <div className="App-form container">
        <form onSubmit={this.submit}>
          <div className='row'>
            <p className='range-field col s12'>
              <input
                type='range'
                min='1'
                max='120'
                value={this.props.time}
                onChange={this.props.changeTime}
                onMouseLeave={this.props.changeTime}
              />
              Tiempo: {this.props.time} minutos
          </p>
            <div className="input-field col s12 m6">
              <select id="select_types" value={this.props.types} onChange={this.props.changeTypes} multiple >
                <option value="" disabled defaultValue>Selecciona tipos</option>
                {optionsTypes}
              </select>
              <label>Tipos</label>
            </div>
            <div className="input-field col s12 m6">
              <select id="select_exchanges" value={this.props.exchanges} onChange={this.props.changeExchanges} multiple >
                <option value="" disabled defaultValue>Selecciona exchanges</option>
                {optionsExchanges}
              </select>
              <label>Exchanges</label>
            </div>
            <div className='col s12 center-align'>
              <a className='waves-effect waves-light btn' onClick={this.props.reset}>Borrar datos</a>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Form
