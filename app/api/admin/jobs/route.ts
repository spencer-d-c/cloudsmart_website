import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/database'
import { verifyToken } from '@/lib/auth'

// GET - Fetch all job listings
export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM job_listings ORDER BY created_at DESC'
    )

    return NextResponse.json({ jobs: result.rows })
  } catch (error) {
    console.error('Error fetching job listings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch job listings' },
      { status: 500 }
    )
  }
}

// POST - Create new job listing
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

    const { title, slug, description, requirements, location, job_type, active } = await request.json()

    if (!title || !slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      )
    }

    const result = await pool.query(
      `INSERT INTO job_listings (title, slug, description, requirements, location, job_type, active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, slug, description || '', requirements || '', location || '', job_type || '', active !== false]
    )

    return NextResponse.json({ job: result.rows[0] })
  } catch (error) {
    console.error('Error creating job listing:', error)
    
    if (error.code === '23505') { // Unique constraint violation
      return NextResponse.json(
        { error: 'A job listing with this slug already exists' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create job listing' },
      { status: 500 }
    )
  }
}