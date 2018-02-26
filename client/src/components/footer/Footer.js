import React from 'react'
import './Footer.css'

let Footer = function Footer(props) {
  return (
    <footer className="App-footer page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Señales de Trading</h5>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © {new Date().getFullYear()} Christian Barrios
            <a className="grey-text text-lighten-4 right" href="https://christiandbf.github.io/" target="_blank" rel="noopener noreferrer">Pagina de Contacto</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer