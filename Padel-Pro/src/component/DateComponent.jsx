
import React, { useEffect, useState } from 'react'
import "./HourComponent.css"
const DateComponent = () => {


const [listHours, setListHours] = useState([]);

   function generateHours() {
  const horas = [];


  for (let h = 9; h <= 12; h++) {
    horas.push(`${h.toString().padStart(2, '0')}:00`);
  }

  
  for (let h = 16; h <= 20; h++) {
    horas.push(`${h.toString().padStart(2, '0')}:00`);
  }

  setListHours(horas)
}
    useEffect(() => {
        generateHours();
    }, [])
    return (
        <div className='container-hour'>
            <div className='title-hour'>
                <div className='container-number-title'>
                    <p>3</p>
                </div>
                <h3>ELIGE HORARIO</h3>
            </div>
            <div className='container-data-hour'>
                <p className='fecha'>Horarios disponibles</p>
                <div className='container-div-hour'>
                    {listHours.map((hour, idx) => (
                        <div key={idx}>
                            <p>{hour}</p>
                            

                        </div>
                    ))}
                </div>

            </div>
        </div >
    )
}
export default DateComponent