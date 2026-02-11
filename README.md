# 🏓 PadelPro – Gestión de Clases y Reservas

PadelPro es una aplicación web desarrollada para la **gestión de clases de pádel**, donde **alumnos**, **entrenadores** y **administradores** disponen de diferentes permisos y funcionalidades según su rol.

El sistema permite visualizar clases filtradas por **fecha y hora actual**, gestionar reservas y administrar usuarios de forma segura mediante autenticación con **JWT**.

---

## 📌 Estado del Proyecto

> ⚠️ Proyecto actualmente **sin diseño responsive**.

---

## 🚀 Funcionalidades Principales

### 👤 Usuarios (Alumnos)

- Visualizar sus **clases reservadas**.
- Solo se muestran clases **posteriores a la fecha y hora actual**.
- Consultar información detallada:
  - 🕒 Hora
  - 🧑‍🏫 Entrenador asignado
  - 💰 Precio
- Autenticación segura mediante **JWT**.

---

### 🧑‍🏫 Entrenadores

- Visualizar las **clases que imparten**, organizadas por día y hora.
- Ver los **alumnos inscritos** en cada clase.
- Acceso únicamente a clases futuras.

---

### 🛠️ Administrador

El administrador tiene control total del sistema:

#### 📅 Gestión de clases
- Cancelar clases.
- Añadir alumnos a una clase existente.

#### 👥 Gestión de usuarios
- Crear nuevos alumnos.
- Crear nuevos entrenadores.
- Modificar nombre y apellidos de alumnos.

🔐 Acceso protegido por rol (`admin`).

---

## 🔐 Creación Manual de Administrador

Existe un endpoint para crear un administrador manualmente desde **Postman**.

### 📌 Endpoint

**POST**
http://localhost:3000/admin/createAdmin

### 📌 Body (JSON)


{
  "email": "admin@gmail.com",
  "name": "carlos",
  "lastName": "castro fernandez",
  "password": "123456"
}


# 🚀 Tecnologías Utilizadas

### 🖥️ Frontend
- **React** — Construcción de interfaces de usuario dinámicas.
- **JavaScript (ES6+)** — Lenguaje principal del proyecto.
- **Vite** — Entorno de desarrollo rápido y optimizado.
- **HTML5** — Estructura del contenido.
- **CSS3** — Diseño y estilos visuales.

# Como ejecutar el proyect:
Se clona este repo y abre la ubicación del proyecto y se ejecuta en consola **npm run dev** comprobando anteriormente si esta desplegado el backend 
