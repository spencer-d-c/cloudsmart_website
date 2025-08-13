import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { pool } from './database'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface User {
  id: number
  email: string
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    const result = await pool.query(
      'SELECT id, email, password_hash FROM admin_users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return null
    }

    const user = result.rows[0]
    const isValid = await bcrypt.compare(password, user.password_hash)

    if (!isValid) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
    }
  } catch (error: any) {
    console.error('Authentication error:', error)
    return null
  }
}

export function generateToken(user: User): string {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '24h',
  })
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return {
      id: decoded.userId,
      email: decoded.email,
    }
  } catch (error: any) {
    return null
  }
}

export async function createAdminUser(email: string, password: string): Promise<User | null> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(
      'INSERT INTO admin_users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    )

    return result.rows[0]
  } catch (error: any) {
    console.error('Create user error:', error)
    return null
  }
}