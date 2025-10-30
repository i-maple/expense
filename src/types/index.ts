export interface User {
  _id?: string;
  email: string;
  password: string;
  name?: string;
  createdAt: Date;
}

export interface ExpenseCategory {
  _id?: string;
  name: string;
  description?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  _id?: string;
  amount: number;
  category: string; // Category name or ID
  categoryId?: string;
  date: Date;
  description?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpenseReport {
  totalAmount: number;
  categoryBreakdown: {
    category: string;
    amount: number;
    count: number;
  }[];
  period: 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
}
