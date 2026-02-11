import React, { useContext, useEffect, useState } from 'react'
import { Link, UNSAFE_RSCDefaultRootErrorBoundary, useLocation, useNavigate } from 'react-router-dom'
import "./LoginComponent.css"
import atrasImg from "../img/aqua.png"
import { findStudentByEmail } from '../services/StudentApi'
import { findTrainerByEmail } from '../services/TrainerApi'
import { claseContext } from './Context'
import { findAdminByEmail } from '../services/AdminApi'
const LoginComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [requestStudent, setRequestStudent] = useState({})
    const { changeUser } = useContext(claseContext);
    const [mapLogin, setMapLogin] = useState(new Map())

    const navigateHome = () => {
        navigate("/")
    }


    const checkControlLogin = () => {
        let mapa = new Map();
        if (requestStudent.email === undefined) {
            mapa.set("email", "No puede estar vacío")
        }
        if (requestStudent.password === undefined) {
            mapa.set("password", "No puede estar vacío")

        } else if (requestStudent.password.length <= 3) {
            mapa.set("password", "Debe de tener mas de 3 caracteres")
        }

        setMapLogin(mapa);

        setTimeout(() => {
            setMapLogin(new Map())
        }, 5000)

        return mapa

    }

    const handleLogin = (prop, propValue) => {
        setRequestStudent(prev => {
            const updated = { ...prev, [prop]: propValue }

            if (propValue === "") {
                delete updated[prop]
            }

            return updated
        })
    }
    const iniciarSesion = async (email, password) => {
        const mapa = checkControlLogin();
        if (mapa.get("email") === undefined && mapa.get("password") === undefined) {
            const userBBDForUser = await findStudentByEmail(email, password);
            if (userBBDForUser?.data !== undefined) {
                const userNorm = {
                    ...userBBDForUser.data,
                    status: "user"
                }
                sessionStorage.setItem("token", userBBDForUser.token)
                sessionStorage.setItem("tokenRefresh", userBBDForUser.tokenRefresh)
                changeUser(userNorm)
                sessionStorage.setItem("user", JSON.stringify(userNorm))
                navigateHome()

                return;
            }
            const userBBDTrainer = await findTrainerByEmail(email, password);
            if (userBBDTrainer?.data !== undefined) {
                const userNorm = {
                    ...userBBDTrainer.data,
                    status: "trainer"
                }
                sessionStorage.setItem("token", userBBDTrainer.token)
                sessionStorage.setItem("tokenRefresh", userBBDTrainer.tokenRefresh)
                changeUser(userNorm)
                sessionStorage.setItem("user", JSON.stringify(userNorm))
                navigateHome()
                return;
            }
            const userBBDTAdmin = await findAdminByEmail(email, password);

            if (userBBDTAdmin?.data !== undefined) {
                const userNorm = {
                    ...userBBDTAdmin.data,
                    status: "admin"
                }

                sessionStorage.setItem("token", userBBDTAdmin.token)
                sessionStorage.setItem("tokenRefresh", userBBDTAdmin.tokenRefresh)
                changeUser(userNorm)
                sessionStorage.setItem("user", JSON.stringify(userNorm))
                navigateHome()
                return;
            } else {
                let mapa = new Map();
                mapa.set("KO", "El email o contraseña son incorrectos");
                setMapLogin(mapa);
            }

        }



    }

    useEffect(() => {
        if (location?.state?.data?.email !== undefined) {
            handleLogin("email", location.state.data.email)
        }

    }, [])
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

                <label>Email</label>
                <input
                    type="email"
                    placeholder="     Tu@email.com"
                    value={requestStudent.email || ""}
                    onChange={(e) => handleLogin("email", e.target.value)}
                />

                {mapLogin.get("email") && (
                    <label style={{ color: "red" }}>{mapLogin.get("email")}</label>
                )}


                <label>Contraseña</label>
                <input
                    type="password"
                    placeholder="      Escribe Contraseña..."
                    value={requestStudent.password || ""}
                    onChange={(e) => handleLogin("password", e.target.value)}
                />

                {mapLogin.get("password") && (
                    <label style={{ color: "red" }}>{mapLogin.get("password")}</label>
                )}
                <button onClick={async () => await iniciarSesion(requestStudent.email, requestStudent.password)}>Iniciar Sesión</button>
                {mapLogin.get("KO") &&
                    (
                        <p style={{ color: "red" }}>{mapLogin.get("KO")}</p>
                    )
                }
                <p className='paragraph-footer'>¿No tienes cuenta? <Link className='link' to="registro">Registrate</Link></p>


            </div>
        </main>
    )
}

export default LoginComponent