import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key';

// Hardcoded user credentials
const HARDCODED_USER = {
  email: 'susmita@nishant.com',
  password: 'Susmita@123',
  name: 'Susmita'
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function authenticateUser(email: string, password: string): Promise<{ success: boolean; user?: any; message?: string }> {
  // Check against hardcoded credentials
  if (email === HARDCODED_USER.email && password === HARDCODED_USER.password) {
    return {
      success: true,
      user: {
        email: HARDCODED_USER.email,
        name: HARDCODED_USER.name,
        id: 'hardcoded-user-id'
      }
    };
  }

  return {
    success: false,
    message: 'Invalid credentials'
  };
}
