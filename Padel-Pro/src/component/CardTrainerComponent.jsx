import React, { useEffect, useState } from 'react'
import "./CardTrainerComponent.css"
import hombrePadel from "../img/hombre-padel.png"
import mujerPadel from "../img/mujer-padel.png"
const CardTrainerComponent = (props) => {
    const { trainer, seleccionado, onSelect } = props
    const [exp, setExp] = useState(1);


    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 20) + 1;
        setExp(randomNumber);
    }, [])
    return (
        <>

            <div className={`caja-trainer ${seleccionado ? "select" : ""}`} onClick={() => onSelect(trainer)}>
                <div>
                    <img src={trainer.sex === "h" ? hombrePadel : mujerPadel} alt="" />
                    <p className='name-title'>{trainer.name + " " + trainer.lastName}</p>
                    <p className='description'>{trainer.description}</p>

                </div>
                <p className='footer'>{exp} años de experiencia</p>


            </div>
        </>
    )
}

export default CardTrainerComponent