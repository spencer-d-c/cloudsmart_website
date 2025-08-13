import Image from 'next/image'
import Link from 'next/link'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function getTeamMembers() {
  try {
    const result = await pool.query(
      'SELECT * FROM team_members WHERE active = true ORDER BY order_index ASC'
    )
    return result.rows
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

export const metadata = {
  title: 'Our Team - CloudSmart Salesforce Experts',
  description: 'Meet the CloudSmart team of certified Salesforce consultants, developers, and business analysts who are ready to help your business succeed.',
}

export default async function Teams() {
  const teamMembers = await getTeamMembers()

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1>Meet Our Expert Team</h1>
          <p>
            Our certified Salesforce professionals are passionate about helping businesses 
            achieve their goals through innovative solutions and expert guidance.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Salesforce Experts</h2>
          <p className="section-subtitle">
            Each team member brings unique expertise and a shared commitment to delivering 
            exceptional results for our clients.
          </p>
          
          {teamMembers.length > 0 ? (
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
                    View Full Profile
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p>Team information is being updated. Please check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Expertise Section */}
      <section className="section" style={{ background: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">Our Collective Expertise</h2>
          
          <div className="team-grid">
            <div className="team-card">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📊</div>
              <h3 className="team-name">Sales Cloud</h3>
              <p className="team-bio">
                Lead management, opportunity tracking, forecasting, and sales process automation.
              </p>
            </div>
            
            <div className="team-card">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📧</div>
              <h3 className="team-name">Marketing Cloud</h3>
              <p className="team-bio">
                Email marketing, journey builder, automation studio, and customer segmentation.
              </p>
            </div>
            
            <div className="team-card">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎧</div>
              <h3 className="team-name">Service Cloud</h3>
              <p className="team-bio">
                Case management, knowledge base, omni-channel routing, and field service.
              </p>
            </div>
            
            <div className="team-card">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔧</div>
              <h3 className="team-name">Custom Development</h3>
              <p className="team-bio">
                Apex, Lightning components, integrations, and custom application development.
              </p>
            </div>
            
            <div className="team-card">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📱</div>
              <h3 className="team-name">Mobile Solutions</h3>
              <p className="team-bio">
                Salesforce mobile app configuration and custom mobile application development.
              </p>
            </div>
            
            <div className="team-card">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📈</div>
              <h3 className="team-name">Analytics</h3>
              <p className="team-bio">
                Reports, dashboards, Einstein Analytics, and business intelligence solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Work With Our Team</h2>
          <p className="section-subtitle">
            Ready to leverage our expertise for your Salesforce project? 
            Let's discuss how we can help you achieve your business goals.
          </p>
          <Link href="/contact-us" className="btn">
            Start Your Project
          </Link>
        </div>
      </section>
    </>
  )
}