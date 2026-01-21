import React, { useEffect, useState } from 'react'
import "./TrainerComponent.css";
import CardTrainerComponent from './CardTrainerComponent';
const TrainerComponent = () => {
    const [listTrainer, setListTrainer] = useState([])
    const loadListTrainer = () => {
        let list = [
            {
                name: "carlos",
                sexo: "hombre",
                description: "Mejor entrenador"
            },
            {
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
                        listTrainer.map((trainer, idx) => (
                            <CardTrainerComponent className="caja-trainer" key={idx} trainer={trainer}></CardTrainerComponent>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default TrainerComponent