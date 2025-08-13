import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/database'
import { verifyToken } from '@/lib/auth'

// GET - Fetch all team members
export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM team_members ORDER BY order_index ASC'
    )

    return NextResponse.json({ teamMembers: result.rows })
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}

// POST - Create new team member
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get('auth-token')?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { name, slug, title, bio, image_url, order_index, active } = await request.json()

    if (!name || !slug || !title) {
      return NextResponse.json(
        { error: 'Name, slug, and title are required' },
        { status: 400 }
      )
    }

    const result = await pool.query(
      `INSERT INTO team_members (name, slug, title, bio, image_url, order_index, active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, slug, title, bio || '', image_url || '', order_index || 0, active !== false]
    )

    return NextResponse.json({ teamMember: result.rows[0] })
  } catch (error) {
    console.error('Error creating team member:', error)
    
    if (error.code === '23505') { // Unique constraint violation
      return NextResponse.json(
        { error: 'A team member with this slug already exists' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    )
  }
}