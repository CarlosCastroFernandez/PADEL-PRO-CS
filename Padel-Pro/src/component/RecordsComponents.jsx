import React, { useContext, useEffect, useState } from 'react';
import "./RecordsComponents.css";
import { classesByStudents, classesByTrainer } from '../services/ClassApi';
import { claseContext } from './Context';
import atrasImg from "../img/aqua.png"
import { useNavigate } from 'react-router-dom';
import { getNewToken } from '../services/TokenRefres';

const RecordsComponents = () => {
    const [listClass, setListClass] = useState([]);
    const { userLogin, changeUser } = useContext(claseContext);
    const navigate = useNavigate();

    const classByStudent = async (user) => {
        let idMoment = user._id;
        let listClassByStudent;
        if (user && userLogin.status === "user") {
            listClassByStudent = await classesByStudents(idMoment);
        } else {
            listClassByStudent = await classesByTrainer(idMoment);
        }


        if (listClassByStudent !== null) {
            const now = new Date();

            const filteredClasses = listClassByStudent.filter((element) => {
                const classDate = new Date(element.date);


                return classDate >= now;
            });

            setListClass(filteredClasses);
        } else {
            setListClass([]);
        }
    };



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
            await classByStudent(user)

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

    return (

        <main>
            <section className='section-1-records'>
                <div className="back-button">
                    <img
                        onClick={() => navigate("/")}
                        style={{ width: "30px", cursor: "pointer" }}
                        src={atrasImg}
                        alt="volver"
                    />
                </div>
                <div className='title'>
                    <h1 style={{ fontSize: "55px", color: "white" }}>Bienvenido a <span>sus reservas</span></h1>
                    <i style={{ color: "white", fontSize: "17px" }}>En esta sección podrás ver qué reservas tienes pendientes a realizar</i>
                </div>

            </section>

            <section>
                {listClass.length > 0 ? (
                    Object.entries(groupedClasses).map(([date, classesOfDay]) => (
                        <details className='accordion' key={date}>
                            <summary>Clases del {date}</summary>
                            <div className='phather-content'>
                                {classesOfDay.map((element) => {

                                    const { hour } = formatDate(element.date);

                                    // Usuario normal
                                    if (userLogin && userLogin.status === "user") {
                                        return (
                                            <div
                                                className="content"
                                                key={element._id}
                                                style={{ borderBottom: "1px solid hsl(var(--primary))", paddingBottom: "10px", marginBottom: "10px" }}
                                            >
                                                <p>HORA: {hour}:00</p>
                                                <p>
                                                    PROFESOR: {element.trainer?.name?.toUpperCase() || "Sin profesor"} {element.trainer?.lastName?.toUpperCase() || ""}
                                                </p>
                                                <p>PRECIO: {element.trainer.priceByClass}€</p>
                                            </div>
                                        );
                                    }


                                    return (
                                        <div
                                            className="content"
                                            key={element._id}
                                            style={{ borderBottom: "1px solid hsl(var(--primary))", paddingBottom: "10px", marginBottom: "10px" }}
                                        >
                                            <p>HORA: {hour}:00</p>
                                            {element.students.map((student) => (
                                                <div key={student._id} style={{ marginBottom: "10px" }}>

                                                    <ul >
                                                        <li style={{ listStyle: "none" }}>
                                                            {student.lastName.toUpperCase()}
                                                        </li>
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        </details>
                    ))
                ) : (
                    <div>No hay Cursos</div>
                )}
            </section>
        </main>
    );
}

export default RecordsComponents;
