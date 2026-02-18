import React, { useContext, useEffect, useRef, useState } from 'react'
import "./AdminComponent.css";
import { createClass, deleteClassById, deleteStudentByClass, getAllClasses } from '../services/ClassApi';
import { createTrainer } from '../services/TrainerApi';
import atrasImg from "../img/aqua.png"
import { createSinceAdmin, createStudent, getStudentByEmail, modifyStudent } from '../services/StudentApi';
import { useNavigate } from 'react-router-dom';
import { claseContext } from './Context';
import { getNewToken } from '../services/TokenRefres';
const AdminComponent = () => {
    const [listClass, setListClass] = useState([]);
    const [openTrainerModal, setOpenTrainerModal] = useState(false);
    const [openPadeleroModal, setOpenPadeleroModal] = useState(false);
    const [openAddStudentModal, setOpenAddStudentModal] = useState(false)
    const [openModifyStudentModal, setOpenModifyStudentModal] = useState(false)
    const [trainer, setTrainer] = useState({})
    const [trainerId, setTrainerId] = useState("");
    const [padelero, setPadelero] = useState({})
    const [addStudent, setAddStudent] = useState({})
    const [classe, setClasse] = useState({})
    const [modifyPlayer, setModifyPlayer] = useState({});
    const [questionStudent, setQuestionStudent] = useState(null)
    const [mapErrorTrainer, setMapErrorTrainer] = useState(new Map())
    const [mapErrorPadelero, setMapErrorPadelero] = useState(new Map())
    const { userLogin, changeUser } = useContext(claseContext);
    const [com, setCom] = useState(false);
    const [isModify, setIsModify] = useState(undefined)

    const navigate = useNavigate();
    const classes = async () => {

        let listClasses = await getAllClasses();
        if (listClasses != null && listClasses.status === "EXPIRED") {
            const newToken = await getNewToken(userLogin.status);
            if (newToken) {
                listClasses = await getAllClasses();
            } else {
                changeUser(undefined);
                sessionStorage.removeItem("user")
                navigate("/log-in")
            }
        }

        if (listClasses !== null && listClasses.status === "SUCCESS") {
            listClasses = listClasses.data
            const now = new Date();
            for (const element of listClasses) {
                if (!element.students || element.students.length === 0) {
                    await deleteClassById(element._id);
                }
            }

            const filteredClasses = listClasses.filter(async (element) => {
                const classDate = new Date(element.date);
                return classDate >= now && element.students.length > 0;
            });


            setListClass(filteredClasses);
        } else {
            setListClass([]);
        }
    };

    const checkTrainer = (newTrainer) => {
        let mapError = new Map();
        setCom(true)
        if (!newTrainer.email) {
            mapError.set("email", "No puede ser un email vacío");
        }
        if (!(validarEmail(newTrainer.email))) {
            mapError.set("email", "Debe de tener formato válido");
        }
        if (!newTrainer.name || newTrainer.name.length <= 3) {
            mapError.set("name", (!newTrainer.name ? "No puede ser un nombre vacío" : newTrainer.name.length <= 3 ? "Mínimo 3 carácteres" : ""));
        }
        if (!newTrainer.lastName || newTrainer.lastName.length <= 3) {
            mapError.set("lastName", (!newTrainer.lastName ? "No puede ser unos apellidos vacío" : newTrainer.lastName.length <= 3 ? "Mínimo 3 carácteres" : ""));
        }
        if (!newTrainer.password || newTrainer.password.length < 6) {
            mapError.set("password", (!newTrainer.password ? "No puede ser contraseña vacía" : newTrainer.password.length <= 6 ? "Mínimo 6 carácteres" : ""));
        }
        if (!newTrainer.description) {
            mapError.set("description", "No puede estar vacío la descripción")
        }
        if (!newTrainer.sex || newTrainer.sex.charAt(0).toLowerCase() !== 'h' && newTrainer.sex.charAt(0).toLowerCase() !== 'm') {
            mapError.set("sex", !newTrainer.sex ? "No puede estar vacío este campo" : newTrainer.sex !== 'h' || newTrainer.sex !== 'm' ? "Porfavor escriba hombre o mujer" : "")
        }
        if (!newTrainer.priceByClass) {
            mapError.set("priceByClass", "No puede estar vacío este campo")
        }
        if (!newTrainer.experienceYears) {
            mapError.set("experienceYears", "No puede estar vacío este campo")
        }
        setMapErrorTrainer(mapError)
        return mapError;

    }
    const checkPadelero = (newPadelero) => {
        let mapError = new Map();
        setCom(true)
        if (!newPadelero?.email) {
            mapError.set("email", "No puede ser un email vacío");
        }
        if (!(validarEmail(newPadelero?.email))) {
            mapError.set("email", "Debe de tener formato válido");
        }
        if (!newPadelero?.name || newPadelero?.name?.length < 3) {
            mapError.set("name", (!newPadelero?.name ? "No puede ser un nombre vacío" : newPadelero?.name.length < 3 ? "Mínimo 3 carácteres" : ""));
        }
        if (!newPadelero?.lastName || newPadelero?.lastName?.length < 3) {
            mapError.set("lastName", (!newPadelero?.lastName ? "No puede ser unos apellidos vacío" : newPadelero?.lastName?.length < 3 ? "Mínimo 3 carácteres" : ""));
        }
        if (!newPadelero?.password || newPadelero?.password?.length < 6) {
            mapError.set("password", (!newPadelero?.password ? "No puede ser contraseña vacía" : newPadelero?.password?.length <= 6 ? "Mínimo 6 carácteres" : ""));
        }

        setMapErrorPadelero(mapError)
        return mapError;

    }

    const handleTrainer = (prop, proValue) => {
        const newTrainer = {
            ...trainer,
            [prop]: proValue
        }
        setTrainer(newTrainer);
    }

    const crearTrainer = async (trainerPadel) => {

        const mapErrorTrainer = checkTrainer(trainerPadel);


        if (mapErrorTrainer.size === 0) {
            const newTrainer = await createTrainer(trainerPadel.email, trainerPadel.password, trainerPadel.name, trainerPadel.lastName,
                trainerPadel.description, trainerPadel.priceByClass, trainerPadel.sex, trainerPadel.experienceYears
            )
            if (newTrainer.status === "EXPIRED") {
                const newToken = await getNewToken(userLogin.status)
                if (newToken) {
                    const trainerNew = await createTrainer(trainerPadel.email, trainerPadel.password, trainerPadel.name, trainerPadel.lastName,
                        trainerPadel.description, trainerPadel.priceByClass, trainerPadel.sex, trainerPadel.experienceYears)

                } else {
                    changeUser(undefined);
                    sessionStorage.removeItem("user")
                    navigate("/log-in")
                }
            }

        }

    }
    const validarEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }
    const handlePadelero = (prop, proValue) => {
        const newPadelero = {
            ...padelero,
            [prop]: proValue
        }
        setPadelero(newPadelero);
    }

    const checkAddStudent = (student) => {
        let mapError = new Map();
        if (!student?.email) {
            mapError.set("email", "No puede ser un email vacío");
        }
        setMapErrorPadelero(mapError);
        return mapError;

    }
    const crearPadelero = async (padeleroStudent) => {

        const mapErrorPadelero = checkPadelero(padeleroStudent);


        if (mapErrorPadelero.size === 0) {
            const newPadelero = await createSinceAdmin(padeleroStudent.email, padeleroStudent.password, padeleroStudent.name, padeleroStudent.lastName)
            if (newPadelero.status === "EXPIRED") {
                const newToken = await getNewToken(userLogin.status);
                if (newToken) {
                    const padeleroNew = await createSinceAdmin(padeleroStudent.email, padeleroStudent.password, padeleroStudent.name, padeleroStudent.lastName)
                } else {
                    changeUser(undefined);
                    sessionStorage.removeItem("user")
                    navigate("/log-in")
                }
            }

        }

    }

    const cancelClass = async (classId) => {
        let listaClasses = [...listClass]
        let classDelete;
        if (classId) {
            classDelete = await deleteClassById(classId)
            if (classDelete !== null && classDelete.status === "EXPIRED") {
                const newToken = await getNewToken(userLogin.status)
                if (newToken) {
                    classDelete = await deleteClassById(classId)
                } else {
                    changeUser(undefined);
                    sessionStorage.removeItem("user")
                    navigate("/log-in")
                }
            }

        }
        if (classDelete) {
            listaClasses = listaClasses.filter(element => element._id !== classId);
            setListClass(listaClasses);
        }

    }

    const handleAddStudent = (prop, propValue) => {
        let newAddStudent = {
            ...addStudent,
            [prop]: propValue
        }
        setAddStudent(newAddStudent);
    }
    const addStudentInClass = async (email, trainerId, date) => {

        const mapError = checkAddStudent(addStudent)
        setMapErrorPadelero(mapError);
        if (mapError.size === 0) {
            const fecha = new Date(date);
            const fechaString = fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + "-" + fecha.getHours();
            let student = await getStudentByEmail(email);
            if (student !== undefined && student.status === "EXPIRED") {
                const newToken = await getNewToken(userLogin.status);
                if (newToken) {
                    student = await getStudentByEmail(email);
                } else {
                    changeUser(undefined);
                    sessionStorage.removeItem("user")
                    navigate("/log-in")
                }
            }

            if (student) {
                let listIdStudent = [student._id];
                let data = await createClass(classe.date, trainerId, listIdStudent)

                if (data !== null && data.status === "EXPIRED") {
                    const newToken = await getNewToken(userLogin.status);
                    if (newToken) {
                        data = await createClass(classe.date, trainerId, listIdStudent)
                    } else {
                        changeUser(undefined);
                        sessionStorage.removeItem("user")
                        navigate("/log-in")
                    }
                }

                if (data === "NO EXITOSO") {
                    setQuestionStudent(false);
                } else {
                    setQuestionStudent(true);
                    await classes();
                }

            } else {
                setQuestionStudent(false);
            }

        }


    }

    const deleteStudentByClassId = async (idClass, studentId) => {
        let classAfectada = await deleteStudentByClass(idClass, studentId);
        if (classAfectada !== null && classAfectada === "EXPIRED") {
            const newToken = await getNewToken(userLogin.status);
            if (newToken) {
                classAfectada = await deleteStudentByClass(idClass, studentId);
                await classes();
            } else {
                changeUser(undefined);
                sessionStorage.removeItem("user")
                navigate("/log-in")
            }
        }

        if (classAfectada) {

            await classes();
        }
    };

    const handleModify = (prop, propValue) => {
        setModifyPlayer({
            ...modifyPlayer,
            [prop]: propValue
        })



    }
    const checkModifyPlayer = () => {
        if (modifyPlayer.name === "" || modifyPlayer.lastName === "") {
            setIsModify(false);
            return false
        } else if (modifyPlayer.name.length<3 || modifyPlayer.lastName.length<3){
             setIsModify(false);
             return false
            
        }else{
            return true
        }
    }

    const modifyPlayerBBD = async () => {
        const result = checkModifyPlayer()
        if (result) {
            let data = await modifyStudent(modifyPlayer.name, modifyPlayer.lastName, modifyPlayer.id);
            if (data !== null && data.status === "EXPIRED") {
                const newToken = await getNewToken(userLogin.status);
                if (newToken) {
                    data = await modifyStudent(modifyPlayer.name, modifyPlayer.lastName, modifyPlayer.id);
                } else {
                    changeUser(undefined);
                    sessionStorage.removeItem("user")
                    navigate("/log-in")
                }
            }
            setIsModify(true);

            await classes();

        }
    }
    const controlNewToken = async (user) => {
        const newToken = await getNewToken(user.status)
        if (!newToken) {
            changeUser(undefined)
            sessionStorage.removeItem("user")
            navigate("/log-in")
        }
    }

    useEffect(() => {

        const fetchData = async (user) => {
            await controlNewToken(user);
            await classes(user);
        };

        if (userLogin) {

            fetchData(userLogin);
        } else {

            const storedUser = sessionStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                changeUser(parsedUser);
                fetchData(parsedUser);
            }
        }
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
            const dateKey = `${year}-${month}-${day}`;
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(curr);
            return acc;
        }, {});
    };

    const groupedClasses = groupByDate(listClass);



    return (
        <main>
            <section className='section1-admin'>
                <div className="back-button">
                    <img
                        onClick={() => navigate("/")}
                        style={{ width: "30px", cursor: "pointer" }}
                        src={atrasImg}
                        alt="volver"
                    />
                </div>
                <div className='titulo'>
                    <h1 style={{ textAlign: "center", color: "white", fontSize: "55px" }}>PANEL D<span>E CONTROL</span>  </h1>
                    <i style={{ textAlign: "center", lineHeight: "30px" }}>
                        Este es su panel de control donde podrás cancelar clases, borrar
                        padeleros de sus clases <br />e incluso añadir padeleros a las clases
                        siempre y cuando en una  clase<br /> no haya 4 padeleros.
                        ¡GRACIAS!, por confiar en PADEL<span>PRO</span>
                    </i>
                </div>

            </section>

            <section>
                <div className='container-options'>
                    <button onClick={() => setOpenTrainerModal(true)}>+</button>
                    <p onClick={() => setOpenTrainerModal(true)}>Nuevo Entrenador</p>
                    <button onClick={() => setOpenPadeleroModal(true)}>+</button>
                    <p onClick={() => setOpenPadeleroModal(true)}>Nuevo Padelero</p>
                    <p onClick={() => navigate("/admin-panel/users")}>Lista de usuarios</p>
                </div>
                <hr />
                {listClass.length > 0 && (
                    Object.entries(groupedClasses).map(([date, classesOfDay]) => (
                        <details className="accordion" key={date}>
                            <summary>Clases del {date}</summary>

                            <div className="phather-content">
                                {classesOfDay.filter(element => element.students && element.students.length > 0).map((element) => {
                                    const { hour } = formatDate(element.date)

                                    return (

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
                                                        <button onClick={() => deleteStudentByClassId(element._id, student._id)}> X</button>
                                                        <button onClick={() => { setModifyPlayer({ name: student.name, lastName: student.lastName, id: student._id }); setOpenModifyStudentModal(true) }} style={{ background: "hsl(var(--primary))" }}>O</button>

                                                    </ul>
                                                </div>
                                            ))}
                                            <div className='container-button'>
                                                <button style={{ margin: "0 auto" }} onClick={() => cancelClass(element._id)}>Cancelar Clase</button>
                                                <button style={{ margin: "0 auto" }} onClick={() => { setClasse(element); setTrainerId(element.trainer._id); setOpenAddStudentModal(true) }}>Añadir Alumno</button>
                                            </div>

                                        </div>


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
                                onClick={() => { setCom(false); setOpenTrainerModal(false) }}
                            >
                                ✕
                            </button>
                        </header>

                        <form className="modal-body" onSubmit={(e) => {
                            e.preventDefault();
                            crearTrainer(trainer)
                        }
                        }
                        >


                            {mapErrorTrainer.get("name") ? (
                                <>
                                    <input onChange={(e) => handleTrainer("name", e.target.value)} type="text" placeholder="Nombre" />
                                    <label style={{ color: "red" }}>{mapErrorTrainer.get("name")}</label>
                                </>
                            ) :
                                (
                                    <input onChange={(e) => handleTrainer("name", e.target.value)} type="text" placeholder="Nombre" />
                                )


                            }
                            {mapErrorTrainer.get("lastName") ? (
                                <>
                                    <input onChange={(e) => handleTrainer("lastName", e.target.value)} type="text" placeholder="Apellidos" />
                                    <label style={{ color: "red" }}>{mapErrorTrainer.get("lastName")}</label>
                                </>
                            ) :
                                (
                                    <input onChange={(e) => handleTrainer("lastName", e.target.value)} type="text" placeholder="Apellidos" />
                                )


                            }
                            {mapErrorTrainer.get("email") ? (
                                <>
                                    <input onChange={(e) => handleTrainer("email", e.target.value)} type="email" placeholder="Email" />
                                    <label style={{ color: "red" }}>{mapErrorTrainer.get("email")}</label>
                                </>
                            ) :
                                (
                                    <input onChange={(e) => handleTrainer("email", e.target.value)} type="email" placeholder="Email" />
                                )


                            }

                            {mapErrorTrainer.get("password") ? (
                                <>
                                    <input onChange={(e) => handleTrainer("password", e.target.value)} type="password" placeholder="Contraseña" />
                                    <label style={{ color: "red" }}>{mapErrorTrainer.get("password")}</label>
                                </>
                            ) :
                                (
                                    <input onChange={(e) => handleTrainer("password", e.target.value)} type="password" placeholder="Contraseña" />
                                )


                            }
                            {mapErrorTrainer.get("description") ? (
                                <>
                                    <input onChange={(e) => handleTrainer("description", e.target.value)} type="text" placeholder="Descripción" />
                                    <label style={{ color: "red" }}>{mapErrorTrainer.get("description")}</label>
                                </>
                            ) :
                                (
                                    <input onChange={(e) => handleTrainer("description", e.target.value)} type="text" placeholder="Descripción" />
                                )


                            }
                            {mapErrorTrainer.get("priceByClass") ? (
                                <>
                                    <input onChange={(e) => handleTrainer("priceByClass", e.target.value)} type="number" placeholder="Precio" />
                                    <label style={{ color: "red" }}>{mapErrorTrainer.get("priceByClass")}</label>
                                </>
                            ) :
                                (
                                    <input onChange={(e) => handleTrainer("priceByClass", e.target.value)} type="number" placeholder="Precio" />
                                )


                            }
                            {mapErrorTrainer.get("sex") ? (
                                <>
                                    <input onChange={(e) => handleTrainer("sex", e.target.value.charAt(0).toLowerCase())} type="text" placeholder="Sexo (Escribe hombre o mujer)" />
                                    <label style={{ color: "red" }}>{mapErrorTrainer.get("sex")}</label>
                                </>
                            ) :
                                (
                                    <input onChange={(e) => handleTrainer("sex", e.target.value.charAt(0).toLowerCase())} type="text" placeholder="Sexo (Escribe hombre o mujer)" />
                                )


                            }
                            {mapErrorTrainer.get("experienceYears") ? (
                                <>
                                    <input onChange={(e) => handleTrainer("experienceYears", e.target.value)} type="number" placeholder="Años de experiencia" />


                                    <label style={{ color: "red" }}>{mapErrorTrainer.get("experienceYears")}</label>
                                </>
                            ) :
                                (
                                    <input onChange={(e) => handleTrainer("experienceYears", e.target.value)} type="number" placeholder="Años de experiencia" />


                                )


                            }
                            {mapErrorTrainer.size === 0 && com && (
                                <label style={{ color: "green" }}>Entrenador Creado</label>
                            )

                            }

                            <div className="modal-footer">
                                <button type="submit" >Guardar</button>
                                <button
                                    type="button"
                                    onClick={() => { setCom(false); setOpenTrainerModal(false) }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {openPadeleroModal && (
                <div className="modal-backdrop">
                    <div className="modal-window">
                        <header className="modal-header">
                            <h2>Nuevo Padelero</h2>
                            <button
                                className="close-modal"
                                onClick={() => { setCom(false); setOpenPadeleroModal(false) }}
                            >
                                ✕
                            </button>
                        </header>

                        <form
                            className="modal-body"
                            onSubmit={(e) => {
                                e.preventDefault();
                                crearPadelero(padelero)
                            }}

                        >
                            {mapErrorPadelero.get("name") ? (
                                <>
                                    <input onChange={(e) => handlePadelero("name", e.target.value)} type="text" placeholder="Nombre" />


                                    <label style={{ color: "red" }}>{mapErrorPadelero.get("name")}</label>
                                </>
                            ) :
                                (
                                    <input onChange={(e) => handlePadelero("name", e.target.value)} type="text" placeholder="Nombre" />
                                )


                            }
                            {mapErrorPadelero.get("lastName") ? (
                                <>
                                    <input onChange={(e) => handlePadelero("lastName", e.target.value)} type="text" placeholder="Apellidos" />


                                    <label style={{ color: "red" }}>{mapErrorPadelero.get("lastName")}</label>
                                </>
                            ) :
                                (
                                    <input onChange={(e) => handlePadelero("lastName", e.target.value)} type="text" placeholder="Apellidos" />
                                )


                            }

                            {mapErrorPadelero.get("email") ? (
                                <>
                                    <input onChange={(e) => handlePadelero("email", e.target.value)} type="email" placeholder="Email" />


                                    <label style={{ color: "red" }}>{mapErrorPadelero.get("email")}</label>
                                </>
                            ) :
                                (
                                    <input onChange={(e) => handlePadelero("email", e.target.value)} type="email" placeholder="Email" />
                                )


                            }
                            {mapErrorPadelero.get("password") ? (
                                <>
                                    <input onChange={(e) => handlePadelero("password", e.target.value)} type="text" placeholder="Contraseña" />


                                    <label style={{ color: "red" }}>{mapErrorPadelero.get("password")}</label>
                                </>
                            ) :
                                (
                                    <input onChange={(e) => handlePadelero("password", e.target.value)} type="text" placeholder="Contraseña" />
                                )


                            }

                            {
                                mapErrorPadelero.size === 0 && com && (
                                    <label style={{ color: "green" }}>Padelero Creado</label>
                                )
                            }


                            <div className="modal-footer">
                                <button type="submit">Guardar</button>
                                <button
                                    type="button"
                                    onClick={() => { setCom(false); setOpenPadeleroModal(false) }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {openAddStudentModal && (
                <div className="modal-backdrop">
                    <div className="modal-window">
                        <header className="modal-header">
                            <h2>Agregar Alumno a la clase</h2>
                            <button
                                className="close-modal"
                                onClick={() => setOpenAddStudentModal(false)}
                            >
                                ✕
                            </button>
                        </header>

                        <form
                            className="modal-body"
                            onSubmit={(e) => {
                                e.preventDefault();

                                addStudentInClass(addStudent.email, trainerId, classe.date);
                            }}

                        >

                            {mapErrorPadelero.get("email") ? (
                                <>
                                    <input onChange={(e) => handleAddStudent("email", e.target.value)} type="email" placeholder="Email" />


                                    <label style={{ color: "red" }}>{mapErrorPadelero.get("email")}</label>
                                </>
                            ) :
                                (
                                    <input onChange={(e) => handleAddStudent("email", e.target.value)} type="email" placeholder="Email" />

                                )


                            }
                            {
                                questionStudent !== null && (

                                    <label style={{ color: questionStudent ? "hsl(var(--primary))" : "red" }} htmlFor="">{questionStudent ? "Agregado extitosamente" : "No existe el usuario o ya tiene una clase a esta hora o incluso hay 4 padeleros ya"}</label>

                                )
                            }



                            <div className="modal-footer">
                                <button type="submit">Guardar</button>
                                <button
                                    type="button"
                                    onClick={() => setOpenAddStudentModal(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {openModifyStudentModal && (
                <div className="modal-backdrop">
                    <div className="modal-window">
                        <header className="modal-header">
                            <h2 style={{ textAlign: "center" }}>Modificar el apellido o el nombre del  padelero</h2>
                            <button
                                className="close-modal"
                                onClick={() => { setIsModify(undefined); setOpenModifyStudentModal(false) }}
                            >
                                ✕
                            </button>
                        </header>

                        <form
                            className="modal-body"
                            onSubmit={(e) => {
                                e.preventDefault();

                                modifyPlayerBBD();
                            }}

                        >

                            <input value={modifyPlayer.name} onChange={(e) => handleModify("name", e.target.value)} type="text" placeholder="Nombre Padelero" />

                            <input value={modifyPlayer.lastName} onChange={(e) => handleModify("lastName", e.target.value)} type="text" placeholder="Apellidos" />
                           
                            {isModify  ? (
                                <label style={{ color: "green" }}>¡Modificado!</label>
                            ):
                            (
                                <label style={{ color: "red" }}> {isModify===undefined?"":"No pueden ser vacíos y deben de contener al menos 3 caracteres o más"}</label>
                            )
                        
                        }




                            <div className="modal-footer">
                                <button type="submit">Guardar</button>
                                <button
                                    type="button"
                                    onClick={() => { setIsModify(undefined); setOpenModifyStudentModal(false) }}
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