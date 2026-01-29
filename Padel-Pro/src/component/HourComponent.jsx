import React, { useContext, useEffect, useState } from 'react'
import "./HourComponent.css"
import { claseContext } from './Context';
import { hourAvaliableDate } from '../services/ClassApi';

const HourComponent = (props) => {
    const [anio, setAnio] = useState(undefined);
    const [mes, setMes] = useState(undefined);
    const [listDay, setListDay] = useState([]);
    const [selectDay, setSelectDay] = useState(null);
    const { onChangeClase, classes } = props;
    const { listHour, changeListHour } = useContext(claseContext);

    const changeAll = async (idx) => {
        setSelectDay(idx)
        onChangeClase(classes.trainer, listDay[idx], classes.hour ? classes.hour : null);
        console.log("HOLAAAAAAAAAA" + listDay[idx].numero)
        if (classes.trainer && listDay[idx]) {
            const listHours = await hourAvaliableDate("" + new Date().getFullYear() + "-" + listDay[idx].mes + "-" + listDay[idx].numero, classes.trainer.id)
            changeListHour(listHours);
            console.log(listHour)
        }

    }

    const generateDays = () => {
        const diasSemana = [];
        const today = new Date();
        const currentYear = today.getMonth();
        for (let i = 0; i < 7; i++) {
            const fecha = new Date();
            fecha.setDate(today.getDate() + i);
            if (fecha.getMonth() !== currentYear) break;

            const numeroDia = fecha.getDate();
            const nombreDia = fecha.toLocaleDateString('es-ES', { weekday: 'long' }).slice(0, 3);
            const mesIndex = fecha.getMonth(); // 0 = enero, 1 = febrero...

            diasSemana.push({
                numero: numeroDia,
                nombre: nombreDia.toUpperCase(),
                mes: (mesIndex + 1 < 10 ? "0" + (mesIndex + 1) : mesIndex + 1)
            });
        }
        setListDay(diasSemana);

    }
    useEffect(() => {

        const fecha = new Date();
        const month = fecha.toLocaleString('es-ES', { month: 'long' });
        const year = fecha.getFullYear();
        setAnio(year);
        setMes(month.charAt(0).toUpperCase() + month.slice(1));
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
                        <div className={`caja-days ${selectDay === idx ? "select" : ""}`} onClick={() => changeAll(idx)} key={idx}>
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