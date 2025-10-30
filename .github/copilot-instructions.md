<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Expense Tracker - Copilot Instructions

This is a Next.js expense tracking application with the following key characteristics:

## Project Structure
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: MongoDB with direct driver (not Mongoose)
- **Authentication**: JWT with hardcoded credentials

## Key Patterns

### Authentication
- Hardcoded user: susmita@nishant.com / Susmita@123
- JWT tokens stored in HTTP-only cookies
- User ID: 'hardcoded-user-id' for all database operations

### Database Operations
- Use MongoDB driver directly, not Mongoose
- Collections: 'categories', 'expenses'
- Always handle ObjectId conversion for MongoDB operations
- Use proper TypeScript types from @/types

### API Routes
- Follow REST conventions
- Always check authentication for protected routes
- Return consistent error formats: `{ error: "message" }`
- Use proper HTTP status codes

### Component Structure
- Use shadcn/ui components consistently
- Implement proper TypeScript typing
- Handle loading and error states
- Use proper form validation

### Styling Guidelines
- Use Tailwind utility classes
- Maintain consistent spacing and colors
- Use shadcn/ui component variants
- Ensure responsive design

## Common Code Patterns

### API Route Authentication
```typescript
const token = request.cookies.get('auth-token')?.value;
if (!token) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

const user = verifyToken(token);
if (!user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### MongoDB Operations
```typescript
const db = await getDatabase();
const result = await db.collection('expenses').insertOne(data);
```

### Form Handling
- Use controlled components
- Implement proper validation
- Show loading states during submission
- Handle errors gracefully

## File Naming Conventions
- Components: PascalCase (e.g., ExpenseForm.tsx)
- API routes: lowercase with route.ts
- Utilities: camelCase
- Types: interfaces in /types/index.ts

## Dependencies to Use
- shadcn/ui for UI components
- lucide-react for icons
- recharts for charts
- date-fns for date operations
- MongoDB driver for database
- jsonwebtoken for authentication
