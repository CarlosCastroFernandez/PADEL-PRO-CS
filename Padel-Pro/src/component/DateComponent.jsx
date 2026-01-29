
import React, { useContext, useEffect, useRef, useState } from 'react'
import "./DateComponent.css";
import { claseContext } from './Context';
const DateComponent = (props) => {


    const [listHours, setListHours] = useState([]);
    const [selectDate, setSelectDate] = useState(null)
    const {listHour,changeListHour}=useContext(claseContext);
    const first=useRef(true)

    const { classes, onChangeClase } = props
    console.log(classes.day)
    console.log(classes.trainer)
     console.log(classes)

    const changeAll = (idx) => {
        setSelectDate(idx)
        onChangeClase(classes.trainer, classes.day ? classes.day : null, listHours[idx])
      
    }

    function generateHours() {
        let horas = [];

        console.log("AQUIIIENTROOOOOOOOOOO")
        for (let h = 9; h <= 12; h++) {
            horas.push(`${h.toString().padStart(2, '0')}:00`);
        }


        for (let h = 16; h <= 20; h++) {
            horas.push(`${h.toString().padStart(2, '0')}:00`);
        }
          
        if (classes.trainer&&classes.day&&listHour && listHour.length>0){
            first.current=false;
            listHour.forEach(element => {
                horas=horas.map(horita=>{
                    if (element==horita){
                        return horita +" invalid"
                    }else{
                        return horita
                    }
                })
            });
        }
        console.log(horas)
      
        console.log("HORAS DISPONIBLES"+horas)
        setListHours(horas)
        
    }
    useEffect(() => {
        generateHours();
        
    }, [listHour])
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
                    {
                      
                        (classes && classes.trainer && classes.day&&listHour.length===0) ? (
                            listHours.map((hour, idx) => (

                                <div className={`caja-date ${selectDate === idx ? "select" : ""}`} key={idx} onClick={() => changeAll(idx)}>
                                    <p>{hour}</p>


                                </div>
                            ))
                        ) :

                            listHours.map((hour, idx) => (

                                <div  style={hour.includes("invalid")||first.current?{ pointerEvents: "none", opacity: "0.2" }:{}} className={`caja-date ${selectDate === idx ? "select" : ""}`} key={idx} onClick={() => changeAll(idx)}>
                                    <p>{hour.split(" ")[0]}</p>


                                </div>
                            ))
                    }

                </div>

            </div>
        </div >
    )
}
export default DateComponent