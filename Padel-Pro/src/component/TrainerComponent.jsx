import React, { useEffect, useState } from 'react'
import "./TrainerComponent.css";
import CardTrainerComponent from './CardTrainerComponent';
const TrainerComponent = (props) => {
    const [listTrainer, setListTrainer] = useState([])
    const [selectTrainer, setSelectTrainer]=useState(null);
    const {classes , onChangeClase }=props;
    const changeAll=(trainer)=>{
        setSelectTrainer(trainer.id)
        onChangeClase(trainer,classes.day?classes.day:null,classes.hour?classes.hour:null);

    }
    const loadListTrainer = () => {
        let list = [
            {   id:"6978f8eb5e6c9327e645b25c",
                name: "carlos",
                sexo: "hombre",
                description: "Mejor entrenador"
            },
            {
                id:2,
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
                            <CardTrainerComponent onChangeClase={onChangeClase} className="caja-trainer" key={trainer.id} seleccionado={selectTrainer === trainer.id} trainer={trainer} onSelect={()=>changeAll(trainer)}></CardTrainerComponent>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default TrainerComponent