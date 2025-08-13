import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/database'
import { verifyToken } from '@/lib/auth'

// GET - Fetch single team member
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await pool.query(
      'SELECT * FROM team_members WHERE id = $1',
      [params.id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ teamMember: result.rows[0] })
  } catch (error) {
    console.error('Error fetching team member:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team member' },
      { status: 500 }
    )
  }
}

// PUT - Update team member
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      `UPDATE team_members 
       SET name = $1, slug = $2, title = $3, bio = $4, image_url = $5, 
           order_index = $6, active = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [name, slug, title, bio || '', image_url || '', order_index || 0, active !== false, params.id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ teamMember: result.rows[0] })
  } catch (error) {
    console.error('Error updating team member:', error)
    
    if (error.code === '23505') { // Unique constraint violation
      return NextResponse.json(
        { error: 'A team member with this slug already exists' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    )
  }
}

// DELETE - Delete team member
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const token = request.cookies.get('auth-token')?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const result = await pool.query(
      'DELETE FROM team_members WHERE id = $1 RETURNING *',
      [params.id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting team member:', error)
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    )
  }
}