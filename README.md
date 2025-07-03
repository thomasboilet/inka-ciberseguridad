# INKA Vulnerabilidades - Panel de Administración

Este proyecto es una aplicación web desarrollada con React y Firebase que permite gestionar vulnerabilidades informáticas dentro de una empresa ficticia llamada **INKA**. Cuenta con un panel de administración para usuarios con roles de **admin** y **analista**, y un dashboard independiente para usuarios **cliente**.

---

## Funcionalidades

### Autenticación
- Registro de usuarios (cliente, admin, analista)
- Inicio de sesión con verificación de correo electrónico
- Persistencia de sesión con `localStorage`
- Redirección según rol

### Control de Acceso
- Rutas protegidas por tipo de usuario
- Acceso diferenciado a dashboards y funciones

### Gestión de Vulnerabilidades (CRUD)
- Crear nueva vulnerabilidad
- Editar vulnerabilidad existente
- Eliminar vulnerabilidad
- Listar todas las vulnerabilidades en tabla
- Vista detallada de cada vulnerabilidad con íconos representativos

### Interfaz
- Bootstrap + React Icons
- Navbar responsivo y moderno
- Colores institucionales
- Diseño adaptable y limpio

---

## Tecnologías utilizadas

- **React** con Vite
- **Firebase Auth** y **Firestore**
- **React Router DOM**
- **Bootstrap 5**
- **React Icons**
- **SweetAlert2**

---

## Instalación y uso local

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/inka-panel.git
   cd inka-panel
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con tu configuración de Firebase:
   ```env
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

4. Ejecuta el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

---

## Roles de usuario

| Rol       | Permisos                                                                 |
|-----------|--------------------------------------------------------------------------|
| Cliente   | Accede a su propio dashboard (limitado)                                  |
| Analista  | Puede gestionar vulnerabilidades (crear, editar, ver)                    |
| Admin     | Acceso completo: CRUD + dashboard + control de rutas                     |

---

## Notas importantes

- El sistema exige **verificación de correo electrónico** antes de iniciar sesión.
- No se deben subir las credenciales `.env` al repositorio (están en `.gitignore`).
- Las rutas están protegidas para cada tipo de usuario.
- La base de datos está en **Firebase Firestore** bajo la colección `vulnerabilidades`.

---

## Licencia

Este proyecto es parte de una evaluación académica de Front-End y no tiene fines comerciales.