# Calculator App - Next.js with PostgreSQL

A full-stack calculator application built with Next.js 15, TypeScript, PostgreSQL, and Prisma ORM. Features user authentication and calculation history tracking.

## Features

- 🔐 User Authentication (Register/Login)
- 🧮 Functional Calculator
- 📊 Calculation History
- 💾 PostgreSQL Database
- 🎨 Tailwind CSS Styling
- 🔒 Secure JWT-based Sessions

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT with bcryptjs

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

Create a `.env` file in the root directory (you can copy from `.env.example`):

```env
DATABASE_URL="mysql://root:password@localhost:3306/calculator_db"
JWT_SECRET="your-secret-key-here-change-in-production"
```

Replace `root`, `password`, and `calculator_db` with your MySQL credentials and database name.

### 3. Set Up the Database

First, create the database in MySQL:

```bash
# Connect to MySQL
mysql -u root -p

# Create database
CREATE DATABASE calculator_db;

# Exit MySQL
exit;
```

Then run Prisma migrations to create the tables:

```bash
npx prisma migrate dev --name init
```

This will create the `User` and `Calculation` tables in your database.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Usage

1. **Register**: Navigate to the home page and click "Register" to create a new account
2. **Login**: Use your credentials to log in
3. **Calculator**: After logging in, you'll be redirected to the calculator page
4. **Calculate**: Use the calculator to perform operations
5. **History**: View your calculation history on the right side panel

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
│   └── prisma.ts                   # Prisma client
├── prisma/
│   └── schema.prisma               # Database schema
├── .env                            # Environment variables
└── package.json                    # Dependencies
```

## Database Schema

### User Table
- `id`: Unique identifier (cuid)
- `email`: User email (unique)
- `password`: Hashed password
- `name`: Optional user name
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

### Calculation Table
- `id`: Unique identifier (cuid)
- `userId`: Foreign key to User
- `expression`: Calculation expression (e.g., "2 + 2")
- `result`: Calculation result
- `createdAt`: Calculation timestamp

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Database Management

View and manage your database using Prisma Studio:

```bash
npx prisma studio
```

This will open a GUI at [http://localhost:5555](http://localhost:5555) where you can view and edit your data.

## Security Notes

⚠️ **Important**: 
- Change the `JWT_SECRET` in production to a strong, random string
- Never commit `.env` files to version control
- Use HTTPS in production
- The calculator uses `eval()` for simplicity - in production, use a proper math expression parser

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Verify your DATABASE_URL in `.env`
- Check that the database exists

### Prisma Issues
- Run `npx prisma generate` after schema changes
- Run `npx prisma migrate dev` to apply migrations
- Use `npx prisma studio` to inspect the database

### Build Errors
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
- Ensure all dependencies are installed: `npm install`

## License

MIT
# calculator_test
