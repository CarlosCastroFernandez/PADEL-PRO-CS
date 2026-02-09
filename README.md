## Proyecto Sin Responsive
### hay un endpoint para crear un admin con esta peticion POST desde postman http://localhost:3000/admin/createAdmin y en el body {
    "email":"admin@gmail.com",
    "name":"carlos",
    "lastName":"castro fernandez",
    "password":"123456"
}

# 🏓 PadelPro – Gestión de Clases y Reservas

PadelPro es una aplicación web desarrollada para la **gestión de clases de pádel**, donde **usuarios (alumnos)**, **entrenadores** y **administradores** tienen diferentes permisos y funcionalidades según su rol.

El sistema permite visualizar clases según **fecha y hora actual**, gestionar reservas y administrar usuarios de forma segura mediante autenticación con tokens.

---

## 🚀 Funcionalidades Principales

### 👤 Usuarios (Alumnos)
- Ver las **clases reservadas** filtradas automáticamente:
  - Solo se muestran clases **posteriores a la fecha y hora actual**.
- Consultar información de la clase:
  - Hora
  - Entrenador asignado
  - Precio
- Autenticación segura mediante JWT.

---

### 🧑‍🏫 Entrenadores
- Visualizar las **clases que imparten**, organizadas por día y hora.
- Ver los **alumnos inscritos** en cada clase.
- Acceso solo a clases futuras (no se muestran clases pasadas).

---

### 🛠️ Administrador
El administrador tiene control total del sistema:

- 📅 **Gestión de clases**
  - Cancelar clases.
  - Añadir alumnos a una clase existente.
- 👥 **Gestión de usuarios**
  - Crear nuevos alumnos.
  - Crear nuevos entrenadores.
  - Modificar nombre y apellidos de alumnos.
- 🔐 Acceso protegido por rol (`admin`).

---

## ⏱️ Filtro por Fecha y Hora

Tanto alumnos como entrenadores solo pueden ver clases que cumplan esta condición:

```js
classDate >= currentDate


