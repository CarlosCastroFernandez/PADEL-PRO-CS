import React, { useState } from 'react'
import "./RegistroComponent.css"
import { Link, useNavigate } from 'react-router-dom'
import atrasImg from "../img/aqua.png"
import { createStudent } from '../services/StudentApi'


const RegistroComponent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [mapRegistro, setMapRegistro] = useState(new Map)
  const navigateHome = () => {
    navigate("/")
  }

  const checkRegistro = () => {
    let mapa = new Map()
    if (!student || student.name === undefined) {
      mapa.set("name", "No puede estar vacío")
    } else if (student.name.length < 3) {
      mapa.set("name", "El nombre no puede tener menos de 3 carácteres")
    }

    if (!student || student.lastName === undefined) {
      mapa.set("lastName", "Los apellido no puede estar vacío ")
    } else if (student.lastName.length < 3) {
      mapa.set("lastName", "Los apellidos no puede tener menos de 3 carácteres")
    }

    if (!student || student.email === undefined) {
      mapa.set("email", "El email no puese estar vacío")
    }
    if (!student || student.password === undefined) {
      mapa.set("password", "La contraseña no puede estar vacío ")
    } else if (student.password.length < 6) {
      mapa.set("password", "La contraseña no puede tener menos de 6 carácteres")
    }


    setMapRegistro(mapa)

    setTimeout(() => {
      setMapRegistro(new Map())
    }, 5000)
    return mapa;


  }

  const handleStudent = (prop, propValue) => {
    setStudent(pre => {
      const newStudent = { ...pre, [prop]: propValue }

      if (propValue === "") {
        delete newStudent[prop];
      }
      return newStudent
    })

  }

  const createStudentForRegister = async (email, password, name, lastName) => {
    const mapa = checkRegistro();
    if (mapa.get("name") === undefined && mapa.get("email") === undefined && mapa.get("lastName") === undefined && mapa.get("password") === undefined) {
      const student2 = await createStudent(email, password, name, lastName)

      navigate("/log-in", {
        state: {
          data: student
        }
      })
    }

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
        <input onChange={(e) => handleStudent("name", e.target.value)} type="text" placeholder='     Tu Nombre' />
        {mapRegistro.get("name") && (
          <label style={{ color: "red" }}>{mapRegistro.get("name")}</label>
        )


        }
        <label htmlFor="">Apellidos</label>
        <input onChange={(e) => handleStudent("lastName", e.target.value)} type="text" placeholder='     Tu Apellido' />
        {mapRegistro.get("lastName") && (
          <label style={{ color: "red" }}>{mapRegistro.get("lastName")}</label>
        )


        }
        <label htmlFor="">Email</label>
        <input onChange={(e) => handleStudent("email", e.target.value)} type="email" placeholder='     Tu@email.com' />
        {mapRegistro.get("email") && (
          <label style={{ color: "red" }}>{mapRegistro.get("email")}</label>
        )


        }
        <label htmlFor="">Contraseña</label>
        <input onChange={(e) => handleStudent("password", e.target.value)} type="password" placeholder='      Escribe Contraseña...' />
        {mapRegistro.get("password") && (
          <label style={{ color: "red" }}>{mapRegistro.get("password")}</label>
        )


        }
        <button onClick={async () => await createStudentForRegister(student.email, student.password, student.name, student.lastName)}>Crear Cuenta</button>
        <p className='paragraph-footer-register'>¿Ya tienes cuenta? <Link className='link' to="/log-in">Inicia Sesión</Link></p>


      </div>
    </main>
  )
}

export default RegistroComponent