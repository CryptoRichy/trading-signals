import React from 'react'
import './Table.css'

let Table = function Table(props) {
  let content = props.data.map((market, index) => (
    <div className="Table" key={index}>
      <h5>{market.current.symbol}</h5>
      <table className="responsive-table bordered">
        <thead>
          <tr>
            <th>Campo</th>
            <th>Ticker Anterior</th>
            <th>Ticker Actual</th>
          </tr>
        </thead>

        <tbody>
          {
            Object.keys(market.current)
	     .filter((value) => value !== 'info' && value !== 'symbol' && value !== 'timestamp' && value !== 'datetime' && value !== 'baseVolume')
             .map((value) => 
                <tr key={value}>
                  <td>{value}</td>
                  <td>{market.last[value]}</td>
                  <td>{market.current[value]}</td>
                </tr>
              )
          }
        </tbody>
      </table>
    </div>
  ))

  return (
    <div className="Table-content">
      {content}
    </div>
  )
}

export default Table
