import React, { useEffect, useState } from 'react'
import "./HourComponent.css"

const HourComponent = (props) => {
    const [anio, setAnio] = useState(undefined);
    const [mes, setMes] = useState(undefined);
    const [listDay, setListDay] = useState([]);
    const [selectDay,setSelectDay]=useState(null);
    const { onChangeClase, classes}=props;

       const changeAll=(idx)=>{
        setSelectDay(idx)
        onChangeClase(classes.trainer,listDay[idx],classes.hour?classes.hour:null);
    }

    const generateDays = () => {
        const diasSemana = [];
        for (let i = 0; i < 7; i++) {
            const fecha = new Date();
            fecha.setDate(fecha.getDate() + i);

            const numeroDia = fecha.getDate();
            const nombreDia = fecha.toLocaleDateString('es-ES', { weekday: 'long' });

            diasSemana.push({
                numero: numeroDia,
                nombre: nombreDia.toUpperCase()
            });
        }
        setListDay(diasSemana);

    }
    useEffect(() => {

        const fecha = new Date();
        const month = fecha.toLocaleString('es-ES', { month: 'long' });
        const year = fecha.getFullYear();
        setAnio(year);
        setMes(month.charAt(0).toUpperCase()+month.slice(1));
        generateDays();
    }, [])
    return (
        <div className='container-hour'>
            <div className='title-hour'>
                <div className='container-number-title'>
                    <p>2</p>
                </div>
                <h3>SELECCIONA FECHA</h3>
            </div>
            <div className='container-data-hour'>
                <p className='fecha'>{mes} {anio}</p>
                <div className='container-div-hour'>
                    {listDay.map((day, idx) => (
                        <div className={`caja-days ${selectDay===idx?"select":""}`}onClick={()=>changeAll(idx)} key={idx}>
                            <p>{day.nombre}</p>
                            <p className='number'>{day.numero}</p>

                        </div>
                    ))}
                </div>

            </div>
        </div >
    )
}

export default HourComponent