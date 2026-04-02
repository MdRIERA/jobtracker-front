# JobTracker Frontend

Frontend de la aplicación **JobTracker**, desarrollado con **React** y **Vite**.  
Permite a los usuarios registrarse, iniciar sesión y gestionar ofertas de empleo y candidaturas de forma sencilla.

## Tecnologías usadas

- React
- Vite
- React Router DOM
- CSS
- Fetch API

## Funcionalidades

- Registro de usuario
- Inicio de sesión
- Protección de rutas privadas
- Visualización de ofertas de empleo
- Creación, edición y eliminación de jobs
- Visualización de candidaturas
- Creación, edición y eliminación de applications
- Filtros de búsqueda

## Instalación

1. Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
Entrar en la carpeta del proyecto:
cd jobtracker-front
Instalar dependencias:
npm install
Crear un archivo .env con la variable necesaria:
VITE_API_URL=http://localhost:3000/api
Ejecutar el proyecto:
npm run dev
```
## Variable de entorno

La aplicación necesita la siguiente variable de entorno:

VITE_API_URL: URL base de la API del backend
URL de la aplicación

## Frontend desplegado en Netlify:

https://buscadorempleo.netlify.app/home

## Credenciales de prueba

Para probar la aplicación con permisos de administrador, se puede usar el siguiente usuario:

- Email: martin@martin.com
- Contraseña: 12345
