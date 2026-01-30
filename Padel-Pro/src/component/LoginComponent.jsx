import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./LoginComponent.css"
import atrasImg from "../img/aqua.png"
import { findStudentByEmail } from '../services/StudentApi'
import { findTrainerByEmail } from '../services/TrainerApi'
import { claseContext } from './Context'
const LoginComponent = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const [requestStudent,setRequestStudent]=useState({})
    const {changeUser}=useContext(claseContext);

    const navigateHome=()=>{
        navigate("/")
    }

    const handleLogin=(prop,propValue)=>{
        setRequestStudent({
            ...requestStudent,
            [prop]:propValue
        })
        //console.log(requestStudent)
    }
    const iniciarSesion=async (email,password)=>{
        // AQUI VA UN if-else SI ES STUDENT O TRAINER O ADMIN
        const userBBDForUser= await findStudentByEmail(email,password);
        if(userBBDForUser!==undefined){
             const userNorm={
            ...userBBDForUser,
            status:"user"
        }
        changeUser(userNorm)
        navigateHome()
        console.log("HOLA")
        return;
        }
       const userBBDTrainer= await findTrainerByEmail(email,password);
         if(userBBDTrainer!==undefined){
             const userNorm={
            ...userBBDTrainer,
            status:"trainer"
        }
   
        changeUser(userNorm)
       navigateHome()
        return;
        }
        
    }

    useEffect(()=>{
        if (location?.state?.data?.email!==undefined){
            handleLogin("email",location.state.data.email)
        }
         console.log(requestStudent)
    },[])
    return (
        <main className='main-login'>
             <div className="back-button">
          <img
            onClick={navigateHome}
            style={{ width: "30px", cursor: "pointer" }}
            src={atrasImg}
            alt="volver"
          />
        </div>

            <div className='container-login'>
                <div className='titulo-login'>
                    <h1>PADEL<span>PRO</span></h1>
                    <h4>INICIAR SESIÓN</h4>
                    <p>Accede a tu cuenta para  reservar clases</p>
                </div>

                <label htmlFor="">Email</label>
                {
                    (location?.state?.data?.email!==undefined?(
                    <input onChange={(e)=>handleLogin("email",e.target.value)} value={requestStudent.email} type="text" placeholder='     Tu@email.com' />
                    
                    ):(
                        <input onChange={(e)=>handleLogin("email",e.target.value)} type="text" placeholder='     Tu@email.com' />
                    ))
                }
             
                
                <label htmlFor="">Contraseña</label>
                <input onChange={(e)=>handleLogin("password",e.target.value)} type="password" placeholder='      Escribe Contraseña...' />
                <button onClick={async ()=> await iniciarSesion(requestStudent.email,requestStudent.password)}>Iniciar Sesión</button>
                <p className='paragraph-footer'>¿No tienes cuenta? <Link className='link' to="registro">Registrate</Link></p>


            </div>
        </main>
    )
}

export default LoginComponent