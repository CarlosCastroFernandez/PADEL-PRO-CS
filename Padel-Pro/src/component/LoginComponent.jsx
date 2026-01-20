import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./LoginComponent.css"
import atrasImg from "../img/aqua.png"
const LoginComponent = () => {
    const navigate=useNavigate();

    const navigateHome=()=>{
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
                    <h4>INICIAR SESIÓN</h4>
                    <p>Accede a tu cuenta para  reservar clases</p>
                </div>

                <label htmlFor="">Email</label>
                <input type="text" placeholder='     Tu@email.com' />
                <label htmlFor="">Contraseña</label>
                <input type="password" placeholder='      Escribe Contraseña...' />
                <button>Iniciar Sesión</button>
                <p className='paragraph-footer'>¿No tienes cuenta? <Link className='link' to="registro">Registrate</Link></p>


            </div>
        </main>
    )
}

export default LoginComponent