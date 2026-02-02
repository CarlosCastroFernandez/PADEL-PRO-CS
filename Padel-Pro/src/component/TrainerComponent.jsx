import React, { useContext, useEffect, useState } from 'react'
import "./TrainerComponent.css";
import CardTrainerComponent from './CardTrainerComponent';
import { claseContext } from './Context';
import { hourAvaliableDate } from '../services/ClassApi';
import { getAllTrainer } from '../services/TrainerApi';
const TrainerComponent = (props) => {
    const [listTrainer, setListTrainer] = useState([])
    const [selectTrainer, setSelectTrainer] = useState(null);
    const { classes, onChangeClase } = props;
    const { listHour, changeListHour } = useContext(claseContext);

    const changeAll = async (trainer) => {
        setSelectTrainer(trainer._id)
        onChangeClase(trainer, classes.day ? classes.day : null, classes.hour ? classes.hour : null);
        console.log("AQUIIIIIIITRAINERRR:"+ JSON.stringify(trainer))
        console.log(classes.day)
        if (trainer && classes.day) {
             console.log("ENT>ROOOOO")
            const listHours = await hourAvaliableDate("" + new Date().getFullYear() + "-" + classes.day.mes + "-" + classes.day.numero, trainer._id)
            changeListHour(listHours);
            console.log(listHour)
        }
    }
    const loadListTrainer = async () => {
        const list= await getAllTrainer();
        setListTrainer(list);
    }
    useEffect(() => {
        loadListTrainer();
    }, [])
    return (
        <>
            <div className='container-trainer'>
                <div className='title-trainer'>
                    <div className='container-number-title'>
                        <p>1</p>
                    </div>

                    <h3>ELIGE TU PROFESOR</h3>

                </div>
                <div className='list-trainer'>
                    {
                        listTrainer.map((trainer) => (
                            <CardTrainerComponent onChangeClase={onChangeClase} className="caja-trainer" key={trainer._id} seleccionado={selectTrainer === trainer._id} trainer={trainer} onSelect={() => changeAll(trainer)}></CardTrainerComponent>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default TrainerComponent