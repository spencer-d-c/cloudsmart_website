import Link from 'next/link'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function getJobListings() {
  try {
    const result = await pool.query(
      'SELECT * FROM job_listings WHERE active = true ORDER BY created_at DESC'
    )
    return result.rows
  } catch (error) {
    console.error('Error fetching job listings:', error)
    return []
  }
}

export const metadata = {
  title: 'Careers - Join the CloudSmart Team',
  description: 'Join our growing team of Salesforce experts. Explore current opportunities and grow your career with CloudSmart.',
}

export default async function Careers() {
  const jobListings = await getJobListings()

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1>Join Our Team</h1>
          <p>
            Be part of a dynamic team of Salesforce experts helping businesses 
            transform and grow. Explore our current opportunities below.
          </p>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose CloudSmart?</h2>
          
          <div className="team-grid">
            <div className="team-card">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🚀</div>
              <h3 className="team-name">Growth Opportunities</h3>
              <p className="team-bio">
                Continuous learning and development with access to the latest Salesforce training and certifications.
              </p>
            </div>
            
            <div className="team-card">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤝</div>
              <h3 className="team-name">Collaborative Culture</h3>
              <p className="team-bio">
                Work with a supportive team that values collaboration, innovation, and knowledge sharing.
              </p>
            </div>
            
            <div className="team-card">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏆</div>
              <h3 className="team-name">Exciting Projects</h3>
              <p className="team-bio">
                Work on challenging and rewarding projects for clients across various industries.
              </p>
            </div>
            
            <div className="team-card">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚖️</div>
              <h3 className="team-name">Work-Life Balance</h3>
              <p className="team-bio">
                Flexible working arrangements and a culture that supports personal well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="section" style={{ background: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">Current Opportunities</h2>
          
          {jobListings.length > 0 ? (
            <div className="job-list">
              {jobListings.map((job) => (
                <div key={job.id} className="job-card">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-meta">
                    <span>📍 {job.location || 'London, UK'}</span>
                    <span>💼 {job.job_type || 'Full-time'}</span>
                  </div>
                  <p className="job-description">{job.description}</p>
                  
                  {job.requirements && (
                    <div className="job-requirements">
                      <h4>Requirements:</h4>
                      <div style={{ whiteSpace: 'pre-line' }}>{job.requirements}</div>
                    </div>
                  )}
                  
                  <Link href="/contact-us" className="btn-primary">
                    Apply Now
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h3>No Current Openings</h3>
              <p style={{ marginBottom: '30px' }}>
                We don't have any open positions at the moment, but we're always interested 
                in hearing from talented Salesforce professionals.
              </p>
              <Link href="/contact-us" className="btn-primary">
                Send Us Your CV
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Application Process */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Application Process</h2>
          
          <div className="team-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div className="team-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>📝</div>
              <h4 style={{ marginBottom: '10px' }}>1. Apply</h4>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>
                Submit your application with CV and cover letter
              </p>
            </div>
            
            <div className="team-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>📞</div>
              <h4 style={{ marginBottom: '10px' }}>2. Initial Call</h4>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>
                Brief phone conversation to discuss your background
              </p>
            </div>
            
            <div className="team-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>💬</div>
              <h4 style={{ marginBottom: '10px' }}>3. Interview</h4>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>
                In-depth interview with our team
              </p>
            </div>
            
            <div className="team-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🎉</div>
              <h4 style={{ marginBottom: '10px' }}>4. Welcome</h4>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>
                Join the CloudSmart family!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}