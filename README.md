# Livestock Management Backend

## Overview
This is a backend application for managing livestock data, built with Node.js, TypeScript, and Express. It provides functionality for user authentication and animal management and tracking.

## Features
- User Authentication (Login/Register)
- Animal Data Management
- Data Validation System
- TypeORM for Database Management

## Tech Stack
- Node.js
- TypeScript
- Express.js
- TypeORM
- PostgreSQL
- JWT Authentication

## Project Structure
```
src/
├── controllers/      # Request handlers
├── interfaces/       # TypeScript interfaces
├── middleware/       # Express middleware
├── models/          # Database models
├── repositories/    # Database operations
├── routes/          # API routes
├── services/        # Business logic
├── utils/           # Utility functions
├── validators/      # Input validation
└── __tests__/       # Test files
```

## Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn package manager

## Environment Variables
Create a `.env` file in the root directory with the following variables:
```
PORT=8000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=livestock_db
JWT_SECRET=your_jwt_secret_key
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/soriagaldona/Backend-CM.git
cd Backend-CM
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
- Create a PostgreSQL database
- Configure the connection in `ormconfig.json`
- The tables will be automatically created on first run due to `synchronize: true`

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login
- POST `/api/auth/reset-password` - Reset password (authenticated)

### Animals
- GET `/api/animales` - Get all animals
- GET `/api/animales/:id` - Get specific animal
- POST `/api/animales` - Create new animal
- PUT `/api/animales/:id` - Update animal
- DELETE `/api/animales/:id` - Delete animal

### Data Validation
- POST `/api/validador/ValidarColumnas` - Validate columns
- POST `/api/validador/NuevaColumna` - Create new column classification
- GET `/api/validador/ObtenerTodos` - Get all validations


## Database Schema

### Users Table
- UsuarioID (Primary Key)
- nombre (String)
- apellido (String)
- correo (String, Unique)
- password (String, Hashed)
- rol (Number)
- FechaCreacion (Timestamp)
- FechaActualizacion (Timestamp)

### Animals Table
- id (Primary Key)
- IDE (String, Unique)
- IDV (String, Unique)
- Categoria (String)
- Raza (String)
- Pelo (String)
- Grupo (String)
- Fecha (Date)
- Hora (Time)

## Development

### TypeScript Best Practices
- Always initialize class properties or use the non-null assertion operator (!)
- Use proper type annotations for request handlers:
```typescript
async function handler(req: Request, res: Response): Promise<void> {
  // Handler implementation
}
```

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

The compiled JavaScript will be output to the `dist` directory.

## Deployment
1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Common Issues and Solutions

### TypeScript Errors
1. Property initialization:
```typescript
// Correct way
class Example {
  private property: string = '';
  // OR
  private property!: string;
}
```

2. Request handler types:
```typescript
// Correct way
const handler: RequestHandler = async (req, res) => {
  // Implementation
};
```

### Database Connection Issues
- Check PostgreSQL service is running
- Verify database credentials in .env file
- Ensure database exists and is accessible

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

