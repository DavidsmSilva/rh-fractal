# Recursos Humanos Fractal Estrategias Sostenibles

## Descripción

Aplicación web de Recursos Humanos desarrollada con Angular (frontend) y Java Spring Boot (backend) para la empresa Fractal Estrategias Sostenibles. La aplicación permite gestionar empleados, departamentos, nominas, beneficios y vacaciones.

## Características

- **Backend**: Java 17 + Spring Boot 4.0.3
- **Frontend**: Angular 18+ (por configurar)
- **Base de datos**: H2 (desarrollo) / PostgreSQL (producción)
- **API REST**: Documentada y segura
- **Despliegue**: GitHub Actions + Heroku + GitHub Pages
- **Seguridad**: Configuración de seguridad Spring

## Estructura del Proyecto

```
RH-proyect/
├── rh-fractal-backend/     # Backend Spring Boot
├── rh-fractal-frontend/    # Frontend Angular (por crear)
└── .github/
    └── workflows/
        └── ci-cd.yml        # Pipeline de CI/CD
```

## Entidades Principales

### Empleado
- Datos personales y profesionales
- Información de contacto
- Historial laboral
- Beneficios y observaciones

### Departamento
- Estructura organizacional
- Presupuesto y objetivos
- Jefatura y ubicación

### Nomina
- Gestión de pagos
- Cálculos de devengados y deducciones
- Resumen financiero

### Beneficio
- Tipos de beneficios
- Valores y periodos
- Estados y observaciones

### Vacación
- Gestión de permisos
- Aprobación y rechazo
- Periodos y estados

## Endpoints API

### Empleados (`/api/empleados`)
- `GET /` - Listar todos
- `GET /{id}` - Obtener por ID
- `POST /` - Crear
- `PUT /{id}` - Actualizar
- `DELETE /{id}` - Eliminar
- `GET /departamento/{departamento}` - Filtrar por departamento
- `GET /estado/{estado}` - Filtrar por estado
- `GET /numero/{numero}` - Buscar por número de empleado
- `GET /email/{email}` - Buscar por email

### Departamentos (`/api/departamentos`)
- `GET /` - Listar todos
- `GET /{id}` - Obtener por ID
- `POST /` - Crear
- `PUT /{id}` - Actualizar
- `DELETE /{id}` - Eliminar
- `GET /codigo/{codigo}` - Buscar por código
- `GET /nombre/{nombre}` - Buscar por nombre

### Nominas (`/api/nominas`)
- `GET /` - Listar todas
- `GET /{id}` - Obtener por ID
- `POST /` - Crear
- `PUT /{id}` - Actualizar
- `DELETE /{id}` - Eliminar
- `GET /periodo/{periodo}` - Filtrar por periodo
- `GET /estado/{estado}` - Filtrar por estado
- `GET /fecha/entre/{startDate}/{endDate}` - Filtrar por rango de fechas
- `GET /resumen/{periodo}` - Obtener resumen financiero

### Beneficios (`/api/beneficios`)
- `GET /` - Listar todos
- `GET /{id}` - Obtener por ID
- `POST /` - Crear
- `PUT /{id}` - Actualizar
- `DELETE /{id}` - Eliminar
- `GET /tipo/{tipo}` - Filtrar por tipo
- `GET /estado/{estado}` - Filtrar por estado
- `GET /fecha/entre/{startDate}/{endDate}` - Filtrar por rango de fechas
- `GET /resumen` - Obtener resumen de beneficios

### Vacaciones (`/api/vacaciones`)
- `GET /` - Listar todas
- `GET /{id}` - Obtener por ID
- `POST /` - Crear
- `PUT /{id}` - Actualizar
- `DELETE /{id}` - Eliminar
- `GET /empleado/{empleadoId}` - Filtrar por empleado
- `GET /periodo/{periodo}` - Filtrar por periodo
- `GET /estado/{estado}` - Filtrar por estado
- `GET /fecha/entre/{startDate}/{endDate}` - Filtrar por rango de fechas
- `GET /resumen/{periodo}` - Obtener resumen de vacaciones

## Configuración Requerida

### Variables de Entorno

Crear archivo `.env` en el directorio del backend:

```bash
SPRING_DATASOURCE_URL=jdbc:h2:mem:testdb
SPRING_DATASOURCE_USERNAME=sa
SPRING_DATASOURCE_PASSWORD=
SPRING_H2_CONSOLE_ENABLED=true
```

### Base de Datos

- **Desarrollo**: H2 (configuración por defecto)
- **Producción**: PostgreSQL (configurar en `application.properties`)

## Despliegue

### Preparación

1. Crear repositorio en GitHub
2. Configurar variables de entorno en GitHub Actions:
   - `HEROKU_API_KEY` - Clave de API de Heroku
   - `HEROKU_APP_NAME` - Nombre de la aplicación Heroku

### Ejecución Local

```bash
# Backend
cd rh-fractal-backend
./mvnw spring-boot:run

# Frontend (cuando esté disponible)
cd rh-fractal-frontend
npm install
npm start
```

### Despliegue Automático

El pipeline CI/CD se ejecuta automáticamente:
- **Pruebas**: Ejecuta tests del backend
- **Build**: Compila frontend y backend
- **Despliegue**: Publica en Heroku (backend) y GitHub Pages (frontend)

## Tecnologías Utilizadas

### Backend
- **Java 17**: Lenguaje de programación
- **Spring Boot 4.0.3**: Framework de desarrollo
- **Spring Data JPA**: Persistencia de datos
- **Spring Security**: Configuración de seguridad
- **H2/PostgreSQL**: Bases de datos
- **Lombok**: Reducción de código boilerplate

### Frontend (por implementar)
- **Angular**: Framework de desarrollo
- **TypeScript**: Tipado estático
- **CSS**: Estilos
- **RxJS**: Programación reactiva

### DevOps
- **GitHub Actions**: CI/CD
- **Heroku**: Plataforma de despliegue
- **GitHub Pages**: Hosting estático

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Contacto

Para soporte o consultas sobre el proyecto:
- Empresa: Fractal Estrategias Sostenibles
- Repositorio: [GitHub URL] (por configurar)
- Desarrollador: [Tu nombre/contacto]

---

**Nota**: El frontend Angular aún no ha sido creado. El proyecto actual incluye solo el backend Spring Boot con todas las entidades, repositorios, controladores y configuración necesarios.
