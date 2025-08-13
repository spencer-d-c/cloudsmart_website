import Image from 'next/image'
import Link from 'next/link'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function getBlogPosts() {
  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE published = true ORDER BY published_at DESC'
    )
    return result.rows
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export const metadata = {
  title: 'Blog - CloudSmart Insights & Updates',
  description: 'Stay up to date with the latest Salesforce trends, best practices, and CloudSmart company updates.',
}

export default async function Blog() {
  const blogPosts = await getBlogPosts()

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1>CloudSmart Blog</h1>
          <p>
            Stay up to date with the latest Salesforce trends, best practices, 
            and insights from our team of experts.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section">
        <div className="container">
          {blogPosts.length > 0 ? (
            <div className="blog-grid">
              {blogPosts.map((post) => (
                <article key={post.id} className="blog-card">
                  {post.featured_image && (
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      width={350}
                      height={200}
                      className="blog-image"
                    />
                  )}
                  <div className="blog-content">
                    <h2 className="blog-title">{post.title}</h2>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <p className="blog-date">
                      {new Date(post.published_at).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="btn-secondary">
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h2>Coming Soon</h2>
              <p>We're working on some great content. Check back soon for our latest insights!</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}