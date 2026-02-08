import React, { useContext, useEffect, useState } from 'react'
import "./ReservedComponent.css"
import { useNavigate } from 'react-router-dom';
import { claseContext } from './Context';
import { createClass } from '../services/ClassApi';
import { getNewToken } from '../services/TokenRefres';
const ReservedComponent = (props) => {
    const { userLogin, changeUser } = useContext(claseContext);
    const [message, setMessage] = useState("")
    const { classes } = props;
    const navigate = useNavigate();
    console.log(classes.hour);

    console.log(JSON.stringify(classes));

    const creationClass = async (date, idTrainer, listStudents) => {
        console.log(JSON.stringify(listStudents));
        let result = await createClass(date, idTrainer, listStudents);
        console.log(JSON.stringify(result))
        if (result !== null && result !== "EXITOSO" && result !== "EXPIRED") {
            setMessage("Este estudiante ya tiene una clase a esta hora");
        } else if (result === null) {
            setMessage("Algo ha ido mal contacta con el desarrollador");
        } else if (result === "EXPIRED") {
            const newToken = await getNewToken(userLogin.status);
            console.log(newToken);
            if (newToken) {
                result = await createClass(date, idTrainer, listStudents);
                if (result !== null && result !== "EXITOSO") {
                    console.log(JSON.stringify(result))
                    setMessage("Este estudiante ya tiene una clase a esta hora");
                } else if (result === null) {
                    setMessage("Algo ha ido mal contacta con el desarrollador");
                } else {
                    setMessage("CLASE RESERVADA");
                }
            }else{
                changeUser(undefined)
                navigate("/log-in")
            }


        }else{
             setMessage("CLASE RESERVADA");
        }


        setTimeout(() => {
            setMessage("");
        }, 5000)

    }

        const controlNewToken = async (user) => {
            const newToken = await getNewToken(user.status)
            if (!newToken) {
                changeUser(undefined)
                sessionStorage.removeItem("user")
                navigate("/log-in")
            }
        }
        useEffect(() => {
            // Función que hace todo el fetch
            const fetchData = async (user) => {
                await controlNewToken(user); // renovar token si está expirado
                  
            };
        
            if (userLogin) {
                // Si ya tenemos el usuario en el contexto, usamos directamente
                fetchData(userLogin);
            } else {
                // Intentar recuperar del storage
                const storedUser = sessionStorage.getItem("user");
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    changeUser(parsedUser); // actualiza el contexto
                    fetchData(parsedUser);  // usa el usuario recuperado
                } 
            }
        }, []); // se ejecuta 
    
    return (
        <div className='container-resume'>
            <h4 style={{ color: "white", fontSize: "20px" }}>RESUMEN DE RESERVA</h4>
            <div className='container-data'>
                <div className='container-data2'>
                    <div className={`cajita-resume ${classes.trainer ? "select" : ""}`}>
                        {classes.trainer ? (
                            `Profesor: ${classes.trainer.name}`
                        ) :
                            "Sin profesor"
                        }

                    </div>
                    <div className={`cajita-resume ${classes.day ? "select" : ""}`}>
                        {classes.day ? (
                            `${classes.day.numero} / ${classes.day.nombre}`
                        ) :
                            "Sin fecha"
                        }
                    </div>
                    <div className={`cajita-resume ${classes.hour ? "select" : ""}`}>
                        {classes.hour ? (
                            `${classes.hour}`
                        ) :
                            "Sin hora"
                        }
                    </div>


                </div>
                <span style={{ fontSize: "20px" }} >
                    {classes.trainer ? (
                        "PRECIO : " + classes.trainer.priceByClass + "€"
                    ) :
                        ""
                    }

                </span>
                {
                    userLogin !== undefined && userLogin.status === "user" ? (

                        <button style={(!classes.trainer || !classes.day || !classes.hour) ? { pointerEvents: "none", opacity: "0.2" } : {}} onClick={() => creationClass("" + new Date().getFullYear() + "-" + classes.day.mes + "-" + classes.day.numero + "-" + classes.hour, classes.trainer._id, [userLogin._id])}>Reservar</button>
                    ) : (
                        <button onClick={() => navigate("/log-in")}>Iniciar Sesion Para Reservar</button>
                    )
                }


            </div>
            {
                message !== "" && (
                    <p style={message === "CLASE RESERVADA" ? { color: "green", fontSize: "20px" } : { color: "red" }}>{message}</p>
                )
            }
        </div>
    )
}

export default ReservedComponent