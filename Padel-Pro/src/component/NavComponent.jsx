import React, { useContext, useState } from 'react'

import "./NavComponent.css";
import { useNavigate } from 'react-router-dom';
import { claseContext } from './Context';

const Nav = () => {

  const { userLogin , changeUser } = useContext(claseContext);
  const navigate = useNavigate();
  console.log("EL USERRR " + userLogin?.status)

  const navigatLogIn = () => {
    navigate("/log-in");
  }
  const navigateRegister = () => {
    navigate("/log-in/registro");
  }

  const showUserInNav = () => {
    if (userLogin!== undefined) {
          const nameVisual = userLogin.name + " " + userLogin.lastName
          const nameResult = nameVisual.split(" ").slice(0, 2)
      switch (userLogin.status) {
        case "admin":
          return (
            <>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center", gap:"20px"}}>
                <h5>{nameResult[0] + " " + nameResult[1]}</h5>
                <button className='button-menu2' >Ver Clases</button>
                <button onClick={()=>changeUser(undefined)} className='button-menu1' >Log-Out</button>
              </div>

            </>
          )
        case "user":
          return (
            <>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center", gap:"20px"}}>
                <h5>{nameResult[0] + " " + nameResult[1]}</h5>
                <button className='button-menu2' onClick={()=>navigate("/records")}>Ver Reservas</button>
                <button onClick={()=>changeUser(undefined)} className='button-menu1' >Log-Out</button>
              </div>

            </>
          )
        case "trainer":
      
          return (
            <>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center", gap:"20px"}}>
                <h5>{nameResult[0] + " " + nameResult[1]}</h5>
                <button className='button-menu2' >Ver Clases</button>
                <button onClick={()=>changeUser(undefined)} className='button-menu1' >Log-Out</button>
              </div>

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
            userLogin !== undefined ? (
              showUserInNav()
            ) : (
              <>
                <button className='button-menu1' onClick={navigatLogIn}>Iniciar Sesión</button>
                <button className='button-menu2' onClick={navigateRegister}>Registrarse</button>
              </>
            )
          }

        </div>
      </nav>
    </section>
  )

}

export default Nav