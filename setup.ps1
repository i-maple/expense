# PowerShell setup script for expense tracking application

Write-Host "Setting up shadcn UI components..." -ForegroundColor Green

# Install required shadcn components
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add card
npx shadcn@latest add form
npx shadcn@latest add select
npx shadcn@latest add table
npx shadcn@latest add dialog
npx shadcn@latest add calendar
npx shadcn@latest add popover
npx shadcn@latest add toast
npx shadcn@latest add tabs
npx shadcn@latest add sheet
npx shadcn@latest add badge
npx shadcn@latest add alert
npx shadcn@latest add textarea

Write-Host "Installing additional dependencies..." -ForegroundColor Green

# Install additional required packages
npm install react-hook-form @hookform/resolvers zod recharts

Write-Host "Setup complete! All components and dependencies installed." -ForegroundColor Green
Write-Host "You can now run 'npm run dev' to start the development server." -ForegroundColor Yellow
