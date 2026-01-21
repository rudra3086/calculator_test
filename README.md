# Calculator App - Next.js with MySQL

A full-stack calculator application built with Next.js 15, TypeScript, and MySQL. Features user authentication, calculation history tracking, and a modern responsive UI.

## Features

- 🔐 **User Authentication**: Secure registration and login system
- 🧮 **Interactive Calculator**: Fully functional calculator with real-time display
- 📊 **Calculation History**: View and track all your past calculations
- 💾 **MySQL Database**: Persistent storage for users and calculations
- 🎨 **Modern UI**: Responsive design with Tailwind CSS
- 🔒 **Secure Sessions**: JWT-based authentication with HTTP-only cookies
- 🚪 **Logout Functionality**: Secure session termination

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL 2 with direct connection pooling
- **Authentication**: JWT with bcryptjs
- **Utilities**: UUID for unique identifiers

## Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- MySQL installed and running
- npm or yarn package manager

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=calculator_db
JWT_SECRET=your-secret-key-here-change-in-production
```

Replace the values with your MySQL credentials. The `JWT_SECRET` should be a long, random string in production.

### 3. Set Up the Database

Create the database and tables in MySQL. Connect to MySQL:

```bash
mysql -u root -p
```

Then run the following SQL commands:

```sql
CREATE DATABASE calculator_db;
USE calculator_db;

CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE calculations (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  expression TEXT NOT NULL,
  result VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_id ON calculations(user_id);
CREATE INDEX idx_created_at ON calculations(created_at);
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Usage

1. **Register**: Navigate to [http://localhost:3000](http://localhost:3000) and click "Register" to create a new account
2. **Login**: Use your credentials to log in
3. **Calculator**: After logging in, you'll be redirected to the calculator page where you can:
   - Perform basic arithmetic operations (+, -, *, /)
   - View real-time calculations
   - See your calculation history in the right panel
4. **History**: All calculations are automatically saved and displayed
5. **Logout**: Click the logout button to securely end your session

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts      # Login API
│   │   │   ├── register/route.ts   # Registration API
│   │   │   └── logout/route.ts     # Logout API
│   │   └── calculate/route.ts      # Calculator API
│   ├── calculator/
│   │   └── page.tsx                # Calculator page
│   ├── login/
│   │   └── page.tsx                # Login page
│   ├── register/
│   │   └── page.tsx                # Register page
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page
│   └── globals.css                 # Global styles
├── lib/
│   ├── auth.ts                     # Authentication utilities
│   └── db.ts                       # MySQL database connection
├── .env                            # Environment variables
└── package.json                    # Dependencies
```

## Database Schema

### Users Table
- `id`: Unique identifier (UUID, VARCHAR(36))
- `email`: User email (VARCHAR(255), unique)
- `password`: Hashed password (VARCHAR(255))
- `name`: Optional user name (VARCHAR(255))
- `created_at`: Account creation timestamp

### Calculations Table
- `id`: Unique identifier (UUID, VARCHAR(36))
- `user_id`: Foreign key to users table (VARCHAR(36))
- `expression`: Calculation expression (TEXT, e.g., "2+2")
- `result`: Calculation result (VARCHAR(255))
- `created_at`: Calculation timestamp

**Indexes**: 
- `idx_user_id` on calculations(user_id) for efficient history queries
- `idx_created_at` on calculations(created_at) for chronological sorting

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## API Routes

The application provides the following API endpoints:

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `POST /api/auth/logout` - Logout and clear session
- `GET /api/calculate` - Get user's calculation history
- `POST /api/calculate` - Save a new calculation

## Security Notes

⚠️ **Important**: 
- Change the `JWT_SECRET` in production to a strong, random string (at least 32 characters)
- Never commit `.env` files to version control (add to `.gitignore`)
- Use HTTPS in production environments
- Passwords are hashed using bcryptjs before storage
- JWT tokens are stored in HTTP-only cookies to prevent XSS attacks
- Sessions expire after 7 days

## Troubleshooting

### Database Connection Issues
- Ensure MySQL service is running
- Verify your credentials in `.env` file
- Check that the database `calculator_db` exists
- Test connection: `mysql -u root -p -h localhost`

### Authentication Issues
- Clear browser cookies if experiencing login issues
- Verify JWT_SECRET is set in `.env`
- Check that users table exists in database

### Build Errors
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
- Ensure all dependencies are installed: `npm install`
- Verify Node.js version is 18 or higher: `node --version`

## Future Enhancements

Potential features to add:
- Scientific calculator functions
- Export calculation history
- Dark/light theme toggle
- Advanced math operations (powers, roots, etc.)
- Calculation sharing between users
- Mobile app version

## License

MIT

---

**Built with ❤️ using Next.js and TypeScript**
