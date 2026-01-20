import React, {  } from 'react'
import "./MarkerComponent.css";
import TrainerComponent from './TrainerComponent';

 const Marker=()=> {
    return (
      <>
        <main className='main-marker'>
          <section className='marker-section'>
            <div className='container1-marker'>
              <h1>RESERVA <br />TU<br /><span>ClASE DE<br />PADEL</span></h1>
              <p>Entrena con los mejores profesores certificados. Mejora tu <br />
                técnica, potencia tu juego y disfruta de cada partido.
              </p>
              <div className='group-button2-marker'>
                <button className='button1-marker'>Reservar Ahora</button>
                <button className='button2-marker'>Ver Profesores</button>
              </div>
            </div>
            <div className='container-marker-ticket'>
              <div className='container-marker-grid'>
                <div className='container-img-marker'>
                  <img src="" alt="" />
                </div>

                <div className='container-text-marker'>
                  <p className="marker-number">12+</p>
                  <p className="marker-label">Profesores</p>
                </div>
              </div>
              <div className='container-marker-grid'>
                <div className='container-img-marker'>
                  <img src="" alt="" />
                </div>

                <div className='container-text-marker'>
                  <p className="marker-number">12+</p>
                  <p className="marker-label">Profesores</p>
                </div>
              </div>
              <div className='container-marker-grid'>
                <div className='container-img-marker'>
                  <img src="" alt="" />
                </div>

                <div className='container-text-marker'>
                  <p className="marker-number">12+</p>
                  <p className="marker-label">Profesores</p>
                </div>
              </div>
            </div>

          </section>
          <section className='marker-section2'>
            <div>
              <h1>RESERVA TU <span>CLASE</span></h1>
              <p>Elige tu profesor favorito, selecciona fecha y hora, y preparate para mejorar tu juego</p>
              <p style={{fontSize:"larger",cursor:"pointer", borderBottom:"1px solid hsl(var(--primary))" }}>Inicia Sesión para reservar</p>
            </div>
          </section>
          <section className='section-trainers'>
            <TrainerComponent></TrainerComponent>
            <hr />
          </section>
        </main>

      </>
    )
  
}

export default Marker