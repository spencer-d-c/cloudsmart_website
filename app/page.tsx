import Link from 'next/link'
import Image from 'next/image'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function getTeamMembers() {
  try {
    const result = await pool.query(
      'SELECT * FROM team_members WHERE active = true ORDER BY order_index ASC LIMIT 6'
    )
    return result.rows
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

async function getLatestBlogPosts() {
  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE published = true ORDER BY published_at DESC LIMIT 3'
    )
    return result.rows
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export default async function Home() {
  const teamMembers = await getTeamMembers()
  const blogPosts = await getLatestBlogPosts()

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1>Platinum Salesforce Consultancy</h1>
          <p>
            CloudSmart is a Platinum Salesforce Partner that helps businesses of all sizes 
            maximise their Sales and Marketing efforts. Get in touch for more details!
          </p>
          <Link href="/contact-us" className="btn">
            Get In Touch
          </Link>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What We Do</h2>
          <p className="section-subtitle">
            We specialize in Salesforce implementation, customization, and optimization 
            to help your business achieve its full potential.
          </p>
          
          <div className="team-grid">
            <div className="team-card">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎯</div>
              <h3 className="team-name">Sales Cloud</h3>
              <p className="team-bio">
                Streamline your sales processes and boost productivity with our expert Sales Cloud implementations.
              </p>
            </div>
            
            <div className="team-card">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📧</div>
              <h3 className="team-name">Marketing Cloud</h3>
              <p className="team-bio">
                Create personalized customer journeys and automated marketing campaigns that drive results.
              </p>
            </div>
            
            <div className="team-card">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤝</div>
              <h3 className="team-name">Service Cloud</h3>
              <p className="team-bio">
                Deliver exceptional customer service with intelligent case management and support automation.
              </p>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/what-we-do" className="btn">
              Learn More About Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className="section" style={{ background: '#f8f9fa' }}>
          <div className="container">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              Our experienced consultants are here to help you succeed with Salesforce.
            </p>
            
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-card">
                  <Image
                    src={member.image_url || '/placeholder-team.jpg'}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="team-avatar"
                  />
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-title">{member.title}</p>
                  <p className="team-bio">{member.bio}</p>
                  <Link href={`/teams/${member.slug}`} className="btn-secondary">
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/teams" className="btn">
                View All Team Members
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
      {blogPosts.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title">Latest Insights</h2>
            <p className="section-subtitle">
              Stay up to date with the latest Salesforce trends and best practices.
            </p>
            
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
                    <h3 className="blog-title">{post.title}</h3>
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
            
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/blog" className="btn">
                View All Blog Posts
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', color: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ color: 'white' }}>Ready to Transform Your Business?</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Let's discuss how CloudSmart can help you maximize your Salesforce investment.
          </p>
          <Link href="/contact-us" className="btn">
            Start Your Journey
          </Link>
        </div>
      </section>
    </>
  )
}