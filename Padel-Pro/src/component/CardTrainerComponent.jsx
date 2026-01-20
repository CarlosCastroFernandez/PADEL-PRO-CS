import React, { useEffect, useState } from 'react'
import "./CardTrainerComponent.css"
import hombrePadel from "../img/hombre-padel.png"
import mujerPadel from "../img/mujer-padel.png"
const CardTrainerComponent = (props) => {
    const { trainer, idx } = props
    const [exp, setExp] = useState(1);


    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 20) + 1;
        setExp(randomNumber);
    }, [])
    return (
        <>

            <div className='caja-trainer'>
                <div>
                    <img src={hombrePadel} alt="" />
                    <p>{trainer.name}</p>
                    <p>{trainer.description}</p>
                </div>

                <p>{exp} años de experiencia</p>
            </div>
        </>
    )
}

export default CardTrainerComponent