import React from 'react'
import "./FooterComponent.css"
import facebook from "../img/facebook.png";
import instagam from "../img/instagram.png";
import twitter from "../img/twitter.png";

const FooterComponent = () => {
  return (
    <footer id='contacto'>
      <div className='container-footer'>
        <h3>PADEL<span>PRO</span></h3>
        <h3>ENLACES</h3>
        <h3>CONTACTO</h3>
        <h3>SÍGUENOS</h3>
        <p>La mejor academia de padel con los profesores <br />
          más cualificados. Mejora tu juego con nosotros
        </p>
        <p>Inicio</p>
        <p>Calle del Padel, 123, Madrid</p>
        <div>
          <img style={{ width: "30px", backgroundColor: "white", borderRadius: "5px" }} src={instagam} alt="" />
          <img style={{ width: "30px", backgroundColor: "white", borderRadius: "5px" }} src={facebook} alt="" />
          <img style={{ width: "30px", backgroundColor: "white", borderRadius: "5px" }} src={twitter} alt="" />
        </div>
        <p className='sitio'>Reservar Clase</p>
        <p>+34 912 345 678</p>
        <p className='sitio1'>Nuestros Profesores</p>
        <p className='sitio2'>info@padelpro.es</p>
        <p className='sitio3'>Precios</p>
      </div>
    </footer>
  )
}

export default FooterComponent