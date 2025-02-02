# Catálogo de Recetas de Cocina

Este proyecto es una aplicación web para gestionar un catálogo de recetas de cocina. El backend está desarrollado con Django y Django REST Framework, y el frontend está desarrollado con Vue.js y Vuetify.

## Requisitos

- Docker
- Docker Compose

## Instalación

### Clonar el repositorio

```sh
git clone https://github.com/Tony0005/RecipeCatalog.git
cd RecipeCatalog


En la raíz del proyecto, ejecuta el siguiente comando para construir y ejecutar los contenedores de Docker:
docker-compose up --build

Acceso a la aplicación
El backend estará disponible en http://localhost:8000
El frontend estará disponible en http://localhost:5173
Documentación de la API
La documentación de la API está disponible en los siguientes endpoints:

Swagger UI: http://localhost:8000/swagger/
Redoc: http://localhost:8000/redoc/
Comandos útiles
Ejecutar pruebas
Para ejecutar las pruebas del backend, usa el siguiente comando:
docker-compose run backend python manage.py test