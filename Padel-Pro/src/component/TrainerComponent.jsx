import React, { useEffect, useState } from 'react'
import "./TrainerComponent.css";
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
        <div className='list-trainer'>
            {
                listTrainer.map((trainer, idx) => (
                    <div className='caja-trainer' key={idx}>
                        <p>{trainer.name}</p>
                        <p>{trainer.description}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default TrainerComponent