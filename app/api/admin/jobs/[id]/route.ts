import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/database'
import { verifyToken } from '@/lib/auth'

// PUT - Update job listing
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = await params
    
    // Check authentication
    const token = request.cookies.get('auth-token')?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { title, slug, description, requirements, location, job_type, active } = await request.json()

    if (!title || !slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      )
    }

    const result = await pool.query(
      `UPDATE job_listings 
       SET title = $1, slug = $2, description = $3, requirements = $4, 
           location = $5, job_type = $6, active = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [title, slug, description || '', requirements || '', location || '', job_type || '', active !== false, resolvedParams.id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Job listing not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ job: result.rows[0] })
  } catch (error: any) {
    console.error('Error updating job listing:', error)
    
    if (error.code === '23505') { // Unique constraint violation
      return NextResponse.json(
        { error: 'A job listing with this slug already exists' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update job listing' },
      { status: 500 }
    )
  }
}

// DELETE - Delete job listing
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = await params
    
    // Check authentication
    const token = request.cookies.get('auth-token')?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const result = await pool.query(
      'DELETE FROM job_listings WHERE id = $1 RETURNING *',
      [resolvedParams.id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Job listing not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting job listing:', error)
    return NextResponse.json(
      { error: 'Failed to delete job listing' },
      { status: 500 }
    )
  }
}