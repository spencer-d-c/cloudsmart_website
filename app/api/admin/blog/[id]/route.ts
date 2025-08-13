import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/database'
import { verifyToken } from '@/lib/auth'

// GET - Fetch single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE id = $1',
      [params.id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ blogPost: result.rows[0] })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

// PUT - Update blog post
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

    const { title, slug, excerpt, content, featured_image, published } = await request.json()

    if (!title || !slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      )
    }

    // Get current post to check if published status changed
    const currentResult = await pool.query(
      'SELECT published FROM blog_posts WHERE id = $1',
      [params.id]
    )

    if (currentResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    const wasPublished = currentResult.rows[0].published
    const published_at = published && !wasPublished ? new Date() : (published ? undefined : null)

    let query = `UPDATE blog_posts 
                 SET title = $1, slug = $2, excerpt = $3, content = $4, 
                     featured_image = $5, published = $6, updated_at = CURRENT_TIMESTAMP`
    let params = [title, slug, excerpt || '', content || '', featured_image || '', published || false]

    if (published_at !== undefined) {
      query += `, published_at = $7 WHERE id = $8 RETURNING *`
      params.push(published_at, params.id)
    } else {
      query += ` WHERE id = $7 RETURNING *`
      params.push(params.id)
    }

    const result = await pool.query(query, params)

    return NextResponse.json({ blogPost: result.rows[0] })
  } catch (error) {
    console.error('Error updating blog post:', error)
    
    if (error.code === '23505') { // Unique constraint violation
      return NextResponse.json(
        { error: 'A blog post with this slug already exists' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// DELETE - Delete blog post
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
      'DELETE FROM blog_posts WHERE id = $1 RETURNING *',
      [params.id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}