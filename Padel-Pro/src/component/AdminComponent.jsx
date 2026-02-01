import React, { useEffect, useState } from 'react'
import "./AdminComponent.css";
import { getAllClasses } from '../services/ClassApi';
import { createTrainer } from '../services/TrainerApi';
const AdminComponent = () => {
    const [listClass, setListClass] = useState([]);
    const [openTrainerModal, setOpenTrainerModal] = useState(false);
    const [trainer ,setTrainer]=useState({})
    const classes = async () => {
        let listClasses = await getAllClasses();

        if (listClasses !== null) {
            const now = new Date();

            const filteredClasses = listClasses.filter((element) => {
                const classDate = new Date(element.date);

                // Incluye la clase si es posterior a ahora
                return classDate >= now;
            });

            setListClass(filteredClasses);
        } else {
            setListClass([]);
        }
    };

    const handleTrainer=(prop,proValue)=>{
        const newTrainer={
            ...trainer,
            [prop]:proValue
        }
        setTrainer(newTrainer);
    }

    const crearTrainer=async (trainerPadel)=>{
        const newTrainer= await createTrainer(trainerPadel.email,trainerPadel.password,trainerPadel.name,trainerPadel.lastName,
            trainerPadel.description,trainerPadel.priceByClass,trainerPadel.sex,trainerPadel.experienceYears
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            await classes();
        };
        fetchData();
    }, []);

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        const hour = String(d.getHours()).padStart(2, "0");
        return { day, month, year, hour };
    };

    const groupByDate = (classes) => {
        return classes.reduce((acc, curr) => {
            const { day, month, year } = formatDate(curr.date);
            const dateKey = `${year}-${month}-${day}`; // formato YYYY-MM-DD
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(curr);
            return acc;
        }, {});
    };

    const groupedClasses = groupByDate(listClass);



    return (
        <main>
            <section className='section1-admin'>
                <h1>PANEL DE CONTROL</h1>
                <p>
                    Este es su panel de control donde podrás cancelar clases, borrar
                    padeleros de sus clases e incluso añadir padeleros a las clases
                    siempre y cuando en una clase no haya 4 padeleros.
                    ¡GRACIAS!, por confiar en PADEL<span>PRO</span>
                </p>
            </section>

            <section>
                <div className='container-options'>
                    <button onClick={() => setOpenTrainerModal(true)}>+</button>
                    <p>Nuevo Entrenador</p>
                    <button>+</button>
                    <p>Nuevo Padelero</p>
                </div>
                <hr />
                {listClass.length > 0 && (
                    Object.entries(groupedClasses).map(([date, classesOfDay]) => (
                        <details className="accordion" key={date}>
                            <summary>Clases del {date}</summary>

                            <div className="phather-content">
                                {classesOfDay.map((element) => {
                                    const { hour } = formatDate(element.date)

                                    return (
                                        <>
                                            <div
                                                className="content"
                                                key={element._id}
                                                style={{
                                                    borderBottom: "1px solid hsl(var(--primary))",
                                                    paddingBottom: "10px",
                                                    marginBottom: "10px",
                                                }}
                                            >
                                                <h3>
                                                    {element.trainer.name} {element.trainer.lastName}
                                                </h3>

                                                <p>HORA: {hour}:00</p>

                                                {element.students.map((student) => (
                                                    <div key={student._id} style={{ marginBottom: "10px" }}>
                                                        <ul className='container-student'>
                                                            <li style={{ listStyle: "none" }}>
                                                                {student.name.toUpperCase()} {student.lastName.toUpperCase()}
                                                            </li>
                                                            <button>X</button>
                                                            <button style={{ background: "hsl(var(--primary))" }}>O</button>

                                                        </ul>
                                                    </div>
                                                ))}
                                                <div className='container-button'>
                                                    <button style={{ margin: "0 auto" }}>Cancelar Clase</button>
                                                    <button style={{ margin: "0 auto" }}>Añadir Alumno</button>
                                                </div>

                                            </div>

                                        </>
                                    )
                                })}
                            </div>
                        </details>
                    ))
                )}
            </section>
            {openTrainerModal && (
                <div className="modal-backdrop">
                    <div className="modal-window">
                        <header className="modal-header">
                            <h2>Nuevo Entrenador</h2>
                            <button
                                className="close-modal"
                                onClick={() => setOpenTrainerModal(false)}
                            >
                                ✕
                            </button>
                        </header>

                        <form className="modal-body">
                            <input onChange={(e)=>handleTrainer("name",e.target.value)} type="text" placeholder="Nombre" />
                            <input onChange={(e)=>handleTrainer("lastName",e.target.value)} type="text" placeholder="Apellidos" />
                            <input onChange={(e)=>handleTrainer("email",e.target.value)} type="email" placeholder="Email" />
                            <input onChange={(e)=>handleTrainer("password",e.target.value)} type="password" placeholder="Contraseña" />
                            <input onChange={(e)=>handleTrainer("description",e.target.value)} type="text" placeholder="Descripción" />
                            <input onChange={(e)=>handleTrainer("priceByClass",e.target.value)} type="number" placeholder="Precio" />
                            <input onChange={(e)=>handleTrainer("sex",e.target.value)} type="text" placeholder="Sexo (Escribe hombre o mujer)" />
                            <input onChange={(e)=>handleTrainer("experienceYears",e.target.value)} type="number" placeholder="Años de experiencia" />
                            

                            <div className="modal-footer">
                                <button type="submit" onClick={createTrainer(trainer)}>Guardar</button>
                                <button
                                    type="button"
                                    onClick={() => setOpenTrainerModal(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </main>
    )
}
export default AdminComponent