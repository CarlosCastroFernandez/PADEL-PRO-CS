import React, { useContext } from 'react'
import "./ReservedComponent.css"
import { useNavigate } from 'react-router-dom';
import { claseContext } from './Context';
import { createClass } from '../services/ClassApi';
const ReservedComponent = (props) => {
     const { userLogin , changeUser } = useContext(claseContext);
    const { classes }=props;
      const navigate = useNavigate();

    return (
        <div className='container-resume'>
            <h4 style={{color:"white", fontSize:"20px"}}>RESUMEN DE RESERVA</h4>
            <div className='container-data'>
                <div className='container-data2'>
                    <div className={`cajita-resume ${classes.trainer?"select":""}`}>
                        {classes.trainer?(
                            `Profesor: ${classes.trainer.name}`
                        ):
                        "Sin profesor"
                        }
                       
                    </div>
                    <div className={`cajita-resume ${classes.day?"select":""}`}>
                        {classes.day?(
                            `${classes.day.numero} / ${classes.day.nombre}`
                        ):
                        "Sin fecha"
                        }
                    </div>
                    <div className={`cajita-resume ${classes.hour?"select":""}`}>
                       {classes.hour?(
                            `${classes.hour}`
                        ):
                        "Sin hora"
                        }
                    </div>
                    
                </div>
                {
                    userLogin!==undefined?(
                        <button onClick={async ()=>await createClass(classes.trainer.id,new Date().getFullYear()+"-"+classes.day.mes+"-"+classes.day.numero,classes.students)}>Reservar</button>
                    ):(
                         <button onClick={()=>navigate("/log-in")}>Iniciar Sesion Para Reservar</button>
                    )
                }
               
            </div>
        </div>
    )
}

export default ReservedComponent