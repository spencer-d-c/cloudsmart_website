import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/database'
import { verifyToken } from '@/lib/auth'

// GET - Fetch all blog posts
export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts ORDER BY created_at DESC'
    )

    return NextResponse.json({ blogPosts: result.rows })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST - Create new blog post
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

    const { title, slug, excerpt, content, featured_image, published } = await request.json()

    if (!title || !slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      )
    }

    const published_at = published ? new Date() : null

    const result = await pool.query(
      `INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, published, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, slug, excerpt || '', content || '', featured_image || '', published || false, published_at]
    )

    return NextResponse.json({ blogPost: result.rows[0] })
  } catch (error: any) {
    console.error('Error creating blog post:', error)
    
    if (error.code === '23505') { // Unique constraint violation
      return NextResponse.json(
        { error: 'A blog post with this slug already exists' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}