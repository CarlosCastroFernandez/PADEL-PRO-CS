import React from 'react'
import "./RecordsComponents.css";

const RecordsComponents = () => {
    return (

        <main>
            <section>
                <h1>
                    Bienvenido a sus reservas
                </h1>
                <p>En esta sección podras ver que reservas tienes pendientes a realizar</p>
            </section>
            <section>
                <details className="accordion">
                    <summary>
                        Horarios disponibles
                        <span className="arrow" style={{ color: "black" }}></span>
                    </summary>

                    <div className="content">
                        <p>Lunes a Viernes</p>
                        <p>09:00 – 20:00</p>
                    </div>
                </details>
            </section>

        </main>
    )
}

export default RecordsComponents