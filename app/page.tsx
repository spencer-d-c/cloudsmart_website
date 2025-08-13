import Link from 'next/link'
import Image from 'next/image'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function getTeamMembers() {
  try {
    const result = await pool.query(
      'SELECT * FROM team_members WHERE active = true ORDER BY order_index ASC LIMIT 8'
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
      {/* Hero Section - Matching Original */}
      <section className="cs-hero">
        <div className="cs-container">
          <div className="cs-hero-content">
            <h1 className="cs-hero-title">
              CloudSmart - Platinum Salesforce Consultancy - London
            </h1>
            <p className="cs-hero-subtitle">
              CloudSmart is a Platinum Salesforce Partner that helps businesses of all sizes 
              maximise their Sales and Marketing efforts. Get in touch for more details!
            </p>
            <div className="cs-hero-buttons">
              <Link href="/contact-us" className="cs-btn cs-btn-primary">
                Get In Touch
              </Link>
              <Link href="/about" className="cs-btn cs-btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is Salesforce Section */}
      <section className="cs-section cs-section-white">
        <div className="cs-container">
          <div className="cs-row">
            <div className="cs-col-lg-6">
              <h2 className="cs-section-title">What is Salesforce?</h2>
              <div className="cs-text-content">
                <p>Salesforce is a cloud-based application to manage sales, service, marketing, and more.</p>
                <p>The easy-to-use system allows you to log, manage, and analyse your customer data and activity in one place.</p>
                <p>CloudSmart's Salesforce implementation experts can help your business to harness the power of Salesforce to allow you to monitor all business activity from sales leads through to support and analytics.</p>
              </div>
            </div>
            <div className="cs-col-lg-6">
              <div className="cs-image-container">
                <Image
                  src="/uploads/cloudsmart_salesforce.png"
                  alt="CloudSmart Salesforce"
                  width={500}
                  height={500}
                  className="cs-featured-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About CloudSmart Section */}
      <section className="cs-section cs-section-light">
        <div className="cs-container">
          <div className="cs-row">
            <div className="cs-col-lg-6">
              <div className="cs-image-container">
                <Image
                  src="/uploads/cloudsmart_what-we-do-2.jpg"
                  alt="CloudSmart What We Do"
                  width={500}
                  height={500}
                  className="cs-featured-image"
                />
              </div>
            </div>
            <div className="cs-col-lg-6">
              <h2 className="cs-section-title">About CloudSmart</h2>
              <div className="cs-text-content">
                <p>Founded in 2017, CloudSmart is a Platinum Salesforce Partner that helps businesses of all sizes maximise their Sales and Marketing efforts. Our team of employees is crucial to the success we have had so far. We work in a close team who enjoy regular team trips and days out. With our London based office, we use this space to meet up regularly to work together and collaborate on projects.</p>
                <p>Our team come from both Sales and Marketing backgrounds in both B2B and B2C industries and pride themselves on being able to understand customer needs and match the most appropriate Salesforce solution.</p>
              </div>
              <Link href="/about" className="cs-btn cs-btn-outline">
                read more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="cs-section cs-section-white">
        <div className="cs-container">
          <div className="cs-text-center">
            <h2 className="cs-section-title">What Make Us Different</h2>
            <p className="cs-section-subtitle">
              We pride ourselves on delivering exceptional Salesforce solutions tailored to your business needs
            </p>
          </div>
          
          <div className="cs-row cs-what-different">
            <div className="cs-col-lg-4">
              <div className="cs-feature-card">
                <div className="cs-feature-icon">
                  <Image
                    src="/uploads/difference-collaboration.jpg"
                    alt="Collaboration"
                    width={300}
                    height={232}
                    className="cs-feature-image"
                  />
                </div>
                <h3 className="cs-feature-title">Collaboration</h3>
                <p className="cs-feature-description">
                  We work closely with your team to ensure seamless integration and adoption of Salesforce solutions.
                </p>
              </div>
            </div>
            
            <div className="cs-col-lg-4">
              <div className="cs-feature-card">
                <div className="cs-feature-icon">
                  <Image
                    src="/uploads/quality-featured-v2.jpg"
                    alt="Quality"
                    width={300}
                    height={232}
                    className="cs-feature-image"
                  />
                </div>
                <h3 className="cs-feature-title">Quality</h3>
                <p className="cs-feature-description">
                  Our commitment to quality ensures that every Salesforce implementation meets the highest standards.
                </p>
              </div>
            </div>
            
            <div className="cs-col-lg-4">
              <div className="cs-feature-card">
                <div className="cs-feature-icon">
                  <Image
                    src="/uploads/difference-team.jpg"
                    alt="The Team That Delivers Results"
                    width={300}
                    height={232}
                    className="cs-feature-image"
                  />
                </div>
                <h3 className="cs-feature-title">The Team That Delivers Results</h3>
                <p className="cs-feature-description">
                  Our experienced team has a proven track record of delivering successful Salesforce implementations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      {teamMembers.length > 0 && (
        <section className="cs-section cs-section-light">
          <div className="cs-container">
            <div className="cs-text-center">
              <h2 className="cs-section-title">Our Team</h2>
              <p className="cs-section-subtitle">
                Meet our experienced Salesforce consultants who are here to help you succeed.
              </p>
            </div>
            
            <div className="cs-team-grid">
              {teamMembers.map((member) => (
                <div key={member.id} className="cs-team-card">
                  <div className="cs-team-image">
                    <Image
                      src={member.image_url || '/placeholder-team.jpg'}
                      alt={member.name}
                      width={273}
                      height={300}
                      className="cs-team-photo"
                    />
                  </div>
                  <div className="cs-team-info">
                    <h3 className="cs-team-name">{member.name}</h3>
                    <p className="cs-team-title">{member.title}</p>
                    <Link href={`/teams/${member.slug}`} className="cs-team-link">
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cs-text-center" style={{ marginTop: '40px' }}>
              <Link href="/teams" className="cs-btn cs-btn-primary">
                View All Team Members
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Partnership Logos Section */}
      <section className="cs-section cs-section-white">
        <div className="cs-container">
          <div className="cs-text-center">
            <div className="cs-partners-logos">
              <Image
                src="/uploads/platinum-salesforce.png"
                alt="Platinum Salesforce Partner"
                width={300}
                height={80}
                className="cs-partner-logo"
              />
              <Image
                src="/uploads/nintex-logo-dark.webp"
                alt="Nintex Partner"
                width={300}
                height={83}
                className="cs-partner-logo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {blogPosts.length > 0 && (
        <section className="cs-section cs-section-light">
          <div className="cs-container">
            <div className="cs-text-center">
              <h2 className="cs-section-title">Latest Insights</h2>
              <p className="cs-section-subtitle">
                Stay up to date with the latest Salesforce trends and best practices.
              </p>
            </div>
            
            <div className="cs-blog-grid">
              {blogPosts.map((post) => (
                <article key={post.id} className="cs-blog-card">
                  {post.featured_image && (
                    <div className="cs-blog-image">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        width={365}
                        height={243}
                        className="cs-blog-featured-image"
                      />
                    </div>
                  )}
                  <div className="cs-blog-content">
                    <h3 className="cs-blog-title">{post.title}</h3>
                    <p className="cs-blog-excerpt">{post.excerpt}</p>
                    <div className="cs-blog-meta">
                      <p className="cs-blog-date">
                        {new Date(post.published_at).toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <Link href={`/blog/${post.slug}`} className="cs-blog-link">
                        Read More
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="cs-text-center" style={{ marginTop: '40px' }}>
              <Link href="/blog" className="cs-btn cs-btn-primary">
                View All Blog Posts
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}