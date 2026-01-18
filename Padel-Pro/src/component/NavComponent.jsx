import React, { useState } from 'react'

import "./NavComponent.css";

const Nav= ()=> {

    const [userLogin, setUserLogin] = useState(null);

    const changeUser = (userLogeado) => {
      setUserLogin(userLogeado);
    }

    const showUserInNav = () => {
      if (userLogin !== null) {
        switch (userLogin.status) {
          case "admin":
            return (
              <>
                <h5>{userLogin.name}</h5>
                <button >Ver Clases</button>
              </>
            )
          case "user":
            return (
              <>
                <h5>{userLogin.name}</h5>
                <button >Ver Reservas</button>
              </>
            )
          case "entrenador":
            return (
              <>
                <h5>{userLogin.name}</h5>
                <button >Ver Clases</button>
              </>
            )
        }

      }

    }
    
    return (
      <section>
        <nav className='nav-menu'>
          <div>
            <h2>PADEL<span>PRO</span></h2>
          </div>
          <div>
            <ul>
              <li><a href="">Inicio</a></li>
              <li><a href="">Reservar</a></li>
              <li><a href="">Profesores</a></li>
              <li><a href="">Contacto</a></li>
            </ul>
          </div>
          <div className='nav-menu-button'>
            {
              userLogin ? (
                 showUserInNav() 
              ) : (
                <>
                  <button className='button-menu1'>Iniciar Sesión</button>
                  <button className='button-menu2'>Registrarse</button>
                </>
              )
            }

          </div>
        </nav>
      </section>
    )
  
}

export default Nav