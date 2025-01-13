# Livestock Management API

## Overview
Backend API for livestock management system that handles animal tracking, paddock management, and lot organization. Features include user authentication, data validation.

## Tech Stack
- Node.js & TypeScript
- Express.js
- PostgreSQL with TypeORM
- JWT Authentication

## Project Structure
```
src/
├── controllers/    # Request handlers
├── interfaces/     # TypeScript interfaces
├── middleware/     # Express middleware
├── models/        # Database entities
├── routes/        # API routes
├── services/      # Business logic
└── utils/         # Utility functions
```

## Environment Variables
Create a `.env` file:
```
PORT=8000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=livestock_db
JWT_SECRET=your_jwt_secret

```

## Quick Start
1. Clone repository:
```bash
git clone https://github.com/soriagaldona/Backend-CM.git
cd Backend-CM
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment:
- Set `.env` file
- Configure database connection

4. Import initial potreros data:
```bash
npm run import-potreros
```

5. Start development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - User login
- POST `/api/auth/reset-password` - Reset password

### Animals
- GET `/api/animales` - List animals
- GET `/api/animales/:id` - Get animal
- POST `/api/animales` - Create animal
- PUT `/api/animales/:id` - Update animal
- DELETE `/api/animales/:id` - Delete animal

### Potreros (Paddocks)
- GET `/api/potreros` - List paddocks
- GET `/api/potreros/:id` - Get paddock
- POST `/api/potreros` - Create paddock
- PUT `/api/potreros/:id` - Update paddock
- DELETE `/api/potreros/:id` - Delete paddock

### Lotes (Lots)
- GET `/api/lotes` - List lots
- GET `/api/lotes/:id` - Get lot
- POST `/api/lotes` - Create lot
- PUT `/api/lotes/:id` - Update lot
- DELETE `/api/lotes/:id` - Delete lot

### Data Validation
- POST `/api/validador/ValidarColumnas` - Validate columns
- POST `/api/validador/NuevaColumna` - Create column classification
- GET `/api/validador/ObtenerTodos` - List validations