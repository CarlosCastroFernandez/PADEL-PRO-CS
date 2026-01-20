import React from 'react'
import "./RegistroComponent.css"
import { Link, useNavigate } from 'react-router-dom'
import atrasImg from "../img/aqua.png"

const RegistroComponent = () => {
  const navigate=useNavigate();
  const navigateHome = () => {
    navigate("/")
  }
  return (
    <main className='main-login'>
      <div>
        <img onClick={navigateHome} style={{ width: "100px" }} src={atrasImg} alt="no se ve" />
      </div>
      <div className='container-login'>
        <div className='titulo-login'>
          <h1>PADEL<span>PRO</span></h1>
          <h4>CREAR CUENTA</h4>
          <p>Regístrate para empezar a reservar clases</p>
        </div>
        <label htmlFor="">Nombre Completo</label>
        <input type="text" placeholder='     Tu Nombre' />
        <label htmlFor="">Email</label>
        <input type="text" placeholder='     Tu@email.com' />
        <label htmlFor="">Contraseña</label>
        <input type="password" placeholder='      Escribe Contraseña...' />
        <button>Crear Cuenta</button>
        <p className='paragraph-footer'>Ya tienes cuenta? <Link className='link' to="/log-in">Inicia Sesión</Link></p>


      </div>
    </main>
  )
}

export default RegistroComponent