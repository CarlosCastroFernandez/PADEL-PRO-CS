import React, { useState } from 'react'
import "./RegistroComponent.css"
import { Link, useNavigate } from 'react-router-dom'
import atrasImg from "../img/aqua.png"
import { createStudent } from '../services/StudentApi'


const RegistroComponent = () => {
  const navigate=useNavigate();
  const [student,setStudent]=useState({});
  const navigateHome = () => {
    navigate("/")
  }

  const handleStudent=(prop,propValue)=>{
   const newStudent= {
      ...student,
      [prop]:propValue
    }
    setStudent(newStudent)
   
  }

  const createStudentForRegister=async (email,password,name,lastName)=>{
   const student2= await createStudent(email,password,name,lastName)
   console.log(student2)
    navigate("/log-in",{
      state:{
        data: student
      }
    })
  }
  return (
    <main className='main-register'>
     <div className="back-button">
  <img
    onClick={navigateHome}
    style={{ width: "30px", cursor: "pointer" }}
    src={atrasImg}
    alt="volver"
  />
</div>
      <div className='container-register'>
        <div className='titulo-register'>
          <h1>PADEL<span>PRO</span></h1>
          <h4>CREAR CUENTA</h4>
          <p>Regístrate para empezar a reservar clases</p>
        </div>
        <label htmlFor="">Nombre Completo</label>
        <input onChange={(e)=> handleStudent("name",e.target.value) } type="text" placeholder='     Tu Nombre' />
        <label htmlFor="">Apellidos</label>
         <input onChange={(e)=> handleStudent("lastName",e.target.value) } type="text" placeholder='     Tu Apellido' />
        <label htmlFor="">Email</label>
        <input onChange={(e)=> handleStudent("email",e.target.value) } type="text" placeholder='     Tu@email.com' />
        <label htmlFor="">Contraseña</label>
        <input onChange={(e)=> handleStudent("password",e.target.value) } type="password" placeholder='      Escribe Contraseña...' />
        <button onClick={async()=>await createStudentForRegister(student.email,student.password,student.name,student.lastName)}>Crear Cuenta</button>
        <p className='paragraph-footer-register'>¿Ya tienes cuenta? <Link className='link' to="/log-in">Inicia Sesión</Link></p>


      </div>
    </main>
  )
}

export default RegistroComponent