import React from 'react'
import "./ReservedComponent.css"
const ReservedComponent = () => {
    return (
        <div className='container-resume'>
            <h4 style={{color:"white", fontSize:"20px"}}>RESUMEN DE RESERVA</h4>
            <div className='container-data'>
                <div className='container-data2'>
                    <div>
                        Sin Profesor
                    </div>
                    <div>
                        Sin Fecha
                    </div>
                    <div>
                        Sin Hora
                    </div>
                    
                </div>
                <button>Iniciar Sesion Para Reservar</button>
            </div>
        </div>
    )
}

export default ReservedComponent