import React from 'react'
import "./ReservedComponent.css"
const ReservedComponent = (props) => {

    const { classes }=props;

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
                <button>Iniciar Sesion Para Reservar</button>
            </div>
        </div>
    )
}

export default ReservedComponent