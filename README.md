# 🚀 Subscrify API - Subscription Management System

Este proyecto es una API REST robusta para la gestión de suscripciones SaaS, construida bajo estándares de alta ingeniería y **Clean Architecture**.

## 🛠️ Stack Tecnológico
* **Runtime:** Node.js con TypeScript.
* **Framework:** Express.
* **Base de Datos:** MongoDB Atlas (Cloud) mediante Mongoose.
* **Infraestructura:** Docker & Docker Compose.
* **Testing:** Vitest & Supertest.
* **Seguridad:** JWT (JSON Web Tokens).
* **Documentación:** Swagger (OpenAPI 3.0).

## 📋 Requerimientos Funcionales (CRUD)
1. **Auth:** Registro e inicio de sesión con generación de tokens seguros.
2. **Creación:** Registro de nuevas suscripciones con cálculo automático de fecha de vencimiento.
3. **Lectura:** Listado con filtros avanzados (por plan y estatus: *active, expired, canceled*).
4. **Actualización:** Renovación de planes y cambio de estado de suscripción.
5. **Eliminación:** Borrado lógico (*Soft Delete*) para mantener integridad de reportes.

## 🏗️ Arquitectura y Patrones
* **Repository Pattern:** Desacoplamiento total entre la lógica de negocio y la base de datos.
* **Clean Architecture:** Separación estricta de responsabilidades (App vs Server).
* **Containerized Testing:** Ejecución de suites de pruebas integrales dentro de entornos aislados de Docker.
* **Middleware Security:** Protección de rutas críticas mediante validación de headers de autorización.

## 🚀 Cómo ejecutar
1. Clonar el repositorio.
2. Configurar el archivo `.env` (Mongo URI & JWT Secret).
3. Ejecutar `docker-compose up`.
4. Acceder a `/api-docs` para ver la documentación interactiva.