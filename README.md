# Expense Tracker

A modern expense tracking application built with Next.js, TypeScript, MongoDB, and shadcn/ui.

## Features

- **Authentication**: Hardcoded login (susmita@nishant.com / Susmita@123)
- **Expense Management**: Add, edit, delete expenses with categories and dates
- **Category Management**: Full CRUD operations for expense categories
- **Reports & Analytics**: 
  - Daily, weekly, and monthly expense reports
  - Visual charts (bar charts, pie charts)
  - Category-wise breakdown
  - Export functionality
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: MongoDB
- **Charts**: Recharts
- **Authentication**: JWT with HTTP-only cookies

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud instance)

### Installation

1. **Run the setup script** (this will install all required shadcn components and dependencies):
   ```powershell
   .\setup.ps1
   ```

2. **Configure environment variables**:
   Update `.env.local` with your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Login

- **Email**: susmita@nishant.com
- **Password**: Susmita@123

## Features Overview

### Dashboard
- Overview cards showing today's, weekly, and monthly expenses
- Quick add expense button
- Tabbed interface for expenses, reports, and categories

### Expense Management
- Add new expenses with amount, category, date, and description
- Edit existing expenses
- Delete expenses
- Filter by category and date range
- Pagination for large expense lists

### Category Management
- Create custom expense categories
- Edit category details (name, description, color)
- Delete categories (with validation)
- Color-coded categories for better organization

### Reports & Analytics
- **Daily Reports**: Track daily spending patterns
- **Weekly Reports**: Weekly expense summaries
- **Monthly Reports**: Monthly spending analysis
- **Visual Charts**: 
  - Pie charts for category breakdown
  - Bar charts for daily spending trends
- **Export**: Download reports as CSV files

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category

### Expenses
- `GET /api/expenses` - Get expenses (with pagination and filters)
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/[id]` - Update expense
- `DELETE /api/expenses/[id]` - Delete expense

### Reports
- `GET /api/reports` - Generate reports (daily/weekly/monthly)

## Development

The application automatically initializes with sample categories and expenses when first accessed.

### Adding New Components

1. Create component in `src/components/`
2. Add necessary shadcn/ui components: `npx shadcn@latest add [component-name]`
3. Import and use in your pages

## Production Deployment

1. Set up MongoDB production instance
2. Update environment variables
3. Build the application: `npm run build`
4. Start production server: `npm start`
