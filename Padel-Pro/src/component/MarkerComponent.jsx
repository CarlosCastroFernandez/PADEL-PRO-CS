import React, { useEffect, useRef, useState } from 'react'
import "./MarkerComponent.css";
import TrainerComponent from './TrainerComponent';
import HourComponent from './HourComponent';
import DateComponent from './DateComponent';
import ReservedComponent from './ReservedComponent';
import { hourAvaliable } from '../services/ClassApi';
import padel from "../img/padel.png";
import trophy from "../img/trophy.png"
import satisfaccion from "../img/satisfaction.png"
import ole from "../img/ole.png"

 const Marker=()=> {
  const [clase,setClase]=useState({});
  const [listaHour,setListaHour]=useState([])
  const prevTrainerId = useRef(null);


  const cambioClase=async (trainer,day,hour,alumno)=>{
    setClase({
      ...clase,
      trainer:trainer?trainer:null,
      day:day?day:null,
      hour:hour,
      alumno:alumno?alumno.id:null
    })
    
  
  }
  const listaValidaHour=async ()=>{

     if (clase?.trainer?._id!==undefined){
      if(clase.trainer._id!==prevTrainerId.current){
        prevTrainerId.current=clase.trainer._id
         console.log("HOLAAA")
        
        const listaHourValaiable=await hourAvaliable(clase.trainer._id)
        setListaHour(listaHourValaiable)
        console.log("lista de horas validas "+listaHour)
      }
       
      }
  }
  useEffect(()=>{
    listaValidaHour()
  },[clase])
  
    return (
   
      <>
         {console.log(clase)};
        <main className='main-marker'>
          <section id='main_class' className='marker-section'>
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
                  <img src={padel} width={"45px"} style={{margin:"3px"}} alt="" />
                </div>

                <div className='container-text-marker'>
                  <p className="marker-number">12+</p>
                  <p className="marker-label">Profesores</p>
                </div>
              </div>
              <div className='container-marker-grid'>
                <div className='container-img-marker'>
                  <img src={trophy} width={"45px"} style={{margin:"3px"}} alt="" />
                </div>

                <div className='container-text-marker'>
                  <p className="marker-number">500+</p>
                  <p className="marker-label">Clases/Mes</p>
                </div>
              </div>
              <div className='container-marker-grid'>
                <div className='container-img-marker'>
                  <img src={ole} width={"45px"} style={{margin:"3px"}} alt="" />
                </div>

                <div className='container-text-marker'>
                  <p className="marker-number">98%</p>
                  <p className="marker-label">Satisfacción</p>
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
          <section id='trainer' className='section-trainers'>
            <TrainerComponent  classes={clase} onChangeClase={cambioClase} ></TrainerComponent>
          
          </section>
          <section className='section-hours'> 
          <HourComponent classes={clase} onChangeClase={cambioClase} ></HourComponent>
          </section>
          <section style={{marginBottom:"40px"}}>
            <DateComponent classes={clase} onChangeClase={cambioClase} ></DateComponent>
          </section>
          <section id='reserved' style={{width:"76%",margin:"0 auto", paddingBottom:"30px"}}>
            <ReservedComponent classes={clase}></ReservedComponent>
          </section>
        </main>

      </>
    )
  
}

export default Marker