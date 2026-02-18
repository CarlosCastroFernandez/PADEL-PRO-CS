import React, { useContext, useEffect, useState } from 'react'
import { deleteStudentById, getAllUsers } from '../services/StudentApi'
import "./PanelComponent.css";
import atrasImg from "../img/aqua.png"
import { getNewToken } from '../services/TokenRefres';
import { claseContext } from './Context';
import { useNavigate } from 'react-router-dom';

const Panel = () => {

    const [usuarios, setUsuarios] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const { userLogin, changeUser } = useContext(claseContext);
    const [borrado, setBorrado] = useState(undefined)
    
    
    const navigate = useNavigate();
    const borrarUsuario = async (id) => {

        const deleteStudentBBDD = await deleteStudentById(id)
        if (deleteStudentBBDD.status === "SUCCESS") {
            setBorrado(true)
            const nuevosUsuarios = usuarios.filter(usuario => usuario._id !== id)
            setUsuarios(nuevosUsuarios)
        } else {
            setBorrado(false)
        }

    }

    const getAllUser = async () => {
        const listUsers = await getAllUsers()
        setUsuarios(listUsers)
    }
    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.name.toLowerCase().includes(busqueda.toLowerCase()) ||
        usuario.lastName.toLowerCase().includes(busqueda.toLowerCase()) ||
        usuario.email.toLowerCase().includes(busqueda.toLowerCase())
    )
    const controlNewToken = async (user) => {
        const newToken = await getNewToken(user.status)
        if (!newToken) {
            changeUser(undefined)
            sessionStorage.removeItem("user")
            navigate("/log-in")
        }
    }


    useEffect(() => {
        const call = async (user) => {
            await controlNewToken(user)
            await getAllUser();
        }
        if (userLogin) {

            call(userLogin);
        } else {

            const storedUser = sessionStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                changeUser(parsedUser);
                call(parsedUser);
            }
        }
    }, [])

    return (
        <main className='container-table'>
           <div className="back-button">
                             <img
                                 onClick={() => navigate("/admin-panel")}
                                 style={{ width: "30px", cursor: "pointer" }}
                                 src={atrasImg}
                                 alt="volver"
                             />
                         </div>
            <div className='table-users'>
                <h2>Lista de Usuarios</h2>
                 <i style={{ textAlign: "center", lineHeight: "30px" }}>
                        Este es su panel de control donde podrás borrar padeleros.
                        ¡GRACIAS!, por confiar en PADEL<span>PRO</span>
                    </i>
                <input
                    style={{ minWidth: "400px", borderRadius: "6px", marginBottom: "15px" }}
                    type="text"
                    placeholder='Buscar'
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFiltrados.map(usuario => (
                            <tr key={usuario._id}>
                                <td>{usuario.name}</td>
                                <td>{usuario.lastName}</td>
                                <td>{usuario.email}</td>
                                <td>
                                    <button style={{background:"hsl(var(--primary))",borderRadius:"10px", width:"80px", height:"30px", cursor:"pointer"}} onClick={() => borrarUsuario(usuario._id)}>
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {
                    borrado === false && (
                        <p style={{ color: "red" }}>No se ha podido borrar el padelero, contacte con el desarrollador, gracias</p>
                    )


                }
            </div>
        </main>

    )
}

export default Panel
