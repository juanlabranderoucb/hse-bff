# Panamerican - Health Safety Enviroment (Backend)

Sistema de salud, seguridad y medio ambiente de la empresa Panamerican

## 🚀 Características

- ✅ Reporte de condiciones subestandar.

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js, NestJS, Prisma
- **Base de Datos:** PostgreSQL
- **Autenticación:** JWT

## 📦 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/juanlabranderoucb/hse-bff.git

   ```

2. Entra en el directorio del proyecto:

   ```bash
   cd hse-bff

   ```

3. Instala las dependencias:

   ```bash
   npm install

   ```

4. Configura las variables de entorno en un archivo .env:

   ENV_PORT=3000
   ENV_DB_CENTRAL_URL=postgresql://postgres:postgres@localhost:5432/db_hse_dev?connection_limit=5&pool_timeout=5
   ENV_JWT_SECRET=totally-secret

5. Genera el cliente prisma:

   ```bash
   npm run db:gen

   ```

6. Ejecuta las migraciones de base de datos:

   ```bash
   npm run db:migrate

   ```

7. Siembra los datos de prueba:

   ```bash
   npm run db:seed

   ```

8. Compila el proyecto:

   ```bash
   npm run build

   ```

9. Inicia el servidor:
   ```bash
   npm run start
   ```
