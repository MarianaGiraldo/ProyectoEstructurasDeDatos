# ProyectoEstructurasDeDatos

## Descripción

Este repositorio contiene el proyecto **“Mínima cantidad de semestres para graduarse”**, desarrollado como trabajo final de la materia **Estructuras de Datos 2025‑02**.

La aplicación permite modelar planes de estudio universitarios (materias, créditos y prerrequisitos) y calcular la **cantidad mínima de semestres necesarios para completar el plan**, respetando un número máximo de materias por semestre. Para ello se usa un algoritmo basado en **ordenamiento topológico (Kahn) y búsqueda en amplitud (BFS)** sobre un grafo de prerrequisitos.

## Integrantes

Grupo 1 (Nombres y nicknames de GitHub):

- **Mariana Giraldo Luna**: @MarianaGiraldo
- **Zaida Alejandra Guzmán Martínez**: @11ZaidaG11
- **Angie Natalia Hernández Clavijo**: @ahernandezcl-ai
- **Samuel Andrés Herrera Villero**: @Saanhevi
- **Daniel Felipe Pardo Castillo**: @dpardoca
- **Rafael Ricardo Uribe Perdomo**: @ZiidTri

## Tecnologías y lenguajes utilizados

- **Backend:** Java (Spring Boot, Maven)
- **Frontend:** JavaScript (React + Vite)
- **Base de datos:** SQL (scripts en la carpeta `sql/`)

## Estructura del proyecto

```text
ProyectoEstructurasDeDatos/
├── backend/                 # API REST en Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/        # Código fuente del backend
│   │       └── resources/   # Configuración y recursos
│   ├── pom.xml              # Configuración Maven
│   └── ...                  # Wrappers de Maven, etc.
├── frontend/                # Aplicación web en React + Vite
│   ├── src/                 # Componentes, páginas y rutas
│   ├── public/
│   ├── package.json         # Dependencias del frontend
│   └── vite.config.js       # Configuración de Vite
├── sql/                     # Scripts y artefactos de base de datos
│   ├── ScriptCreacionTablas.sql
│   ├── ScriptInsercionDatos.sql
│   ├── ModeloRelacional.png
│   └── FormatoPlanes.txt
└── README.md                # Documentación del proyecto
└── DiagramaComponentesEstructuras.png
└── DiagramaDeFlujoProyecto.png
```

## Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- **Java 17 o superior**
- **Maven 3.8+**
- **Node.js 18+ y npm**
- **Un gestor de base de datos SQL** (por ejemplo MySQL o MariaDB)

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/MarianaGiraldo/ProyectoEstructurasDeDatos.git
cd ProyectoEstructurasDeDatos
```

### 2. Base de datos

1. Crear una base de datos vacía (por ejemplo `graduacion`).
2. Ejecutar los scripts en este orden:

   - `sql/ScriptCreacionTablas.sql`
   - `sql/ScriptInsercionDatos.sql`

3. Configurar la conexión a la base de datos en el backend, editando el archivo:

   - `backend/src/main/resources/application.properties`

### 3. Backend (Spring Boot)

Desde la carpeta raíz del proyecto:

```bash
cd backend
# compilar el proyecto
./mvnw clean package      # Linux / macOS
# o en Windows:
# mvnw.cmd clean package

# ejecutar la API
./mvnw spring-boot:run    # Linux / macOS
# o:
# mvnw.cmd spring-boot:run
```

Por defecto la API quedará disponible en:  
`http://localhost:8088`

### 4. Frontend (React + Vite)

En otra terminal, desde la carpeta raíz del proyecto:

```bash
cd frontend
npm install        # instala las dependencias
npm run dev        # levanta el servidor de desarrollo
```

Por defecto la aplicación web se sirve en:  
`http://localhost:5173`

### 5. Uso general

1. Abrir el navegador en `http://localhost:5173`.
2. Seleccionar o crear un plan de estudio.
3. Registrar materias y sus prerrequisitos.
4. Configurar el número máximo de materias por semestre.
5. Ejecutar la simulación para obtener el **plan de semestres** sugerido y la **cantidad mínima de semestres para graduarse**.
