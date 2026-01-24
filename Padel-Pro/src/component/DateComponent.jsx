
import React, { useEffect, useState } from 'react'
import "./DateComponent.css";
const DateComponent = (props) => {


const [listHours, setListHours] = useState([]);
const [selectDate, setSelectDate]=useState(null)

const {classes,onChangeClase}=props

const changeAll=(idx)=>{
    setSelectDate(idx)
    onChangeClase(classes.trainer,classes.day?classes.day:null,listHours[idx])
}

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
        <div className='container-date'>
            <div className='title-date'>
                <div className='container-number-title-date'>
                    <p>3</p>
                </div>
                <h3>ELIGE HORARIO</h3>
            </div>
            <div className='container-data-date'>
                <p className='fecha'>Horarios disponibles</p>
                <div className='container-div-date'>
                    {listHours.map((hour, idx) => (
                        <div className={`caja-date ${selectDate===idx?"select":""}`} key={idx} onClick={()=>changeAll(idx)}>
                            <p>{hour}</p>
                            

                        </div>
                    ))}
                </div>

            </div>
        </div >
    )
}
export default DateComponent