import React, { useContext, useEffect, useState } from 'react'
import "./TrainerComponent.css";
import CardTrainerComponent from './CardTrainerComponent';
import { claseContext } from './Context';
import { hourAvaliableDate } from '../services/ClassApi';
const TrainerComponent = (props) => {
    const [listTrainer, setListTrainer] = useState([])
    const [selectTrainer, setSelectTrainer] = useState(null);
    const { classes, onChangeClase } = props;
    const { listHour, changeListHour } = useContext(claseContext);

    const changeAll = async (trainer) => {
        setSelectTrainer(trainer.id)
        onChangeClase(trainer, classes.day ? classes.day : null, classes.hour ? classes.hour : null);
        console.log("AQUIIIIIII")
        if (trainer && classes.day) {
             console.log("ENT>ROOOOO")
            const listHours = await hourAvaliableDate("" + new Date().getFullYear() + "-" + classes.day.mes + "-" + classes.day.numero, trainer.id)
            changeListHour(listHours);
            console.log(listHour)
        }
    }
    const loadListTrainer = () => {
        let list = [
            {
                id: "6978f8eb5e6c9327e645b25c",
                name: "carlos",
                sexo: "hombre",
                description: "Mejor entrenador"
            },
            {
                id: "6979342232e1c58febb88e9e",
                name: "pepe",
                sexo: "hombre",
                description: "Mejor entrenador"
            }
        ]
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
                            <CardTrainerComponent onChangeClase={onChangeClase} className="caja-trainer" key={trainer.id} seleccionado={selectTrainer === trainer.id} trainer={trainer} onSelect={() => changeAll(trainer)}></CardTrainerComponent>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default TrainerComponent