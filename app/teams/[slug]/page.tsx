import Image from 'next/image'
import Link from 'next/link'
import { Pool } from 'pg'
import { notFound } from 'next/navigation'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function getTeamMember(slug: string) {
  try {
    const result = await pool.query(
      'SELECT * FROM team_members WHERE slug = $1 AND active = true',
      [slug]
    )
    return result.rows[0] || null
  } catch (error) {
    console.error('Error fetching team member:', error)
    return null
  }
}

async function getAllTeamMembers() {
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

export async function generateStaticParams() {
  const teamMembers = await getAllTeamMembers()
  return teamMembers.map((member) => ({
    slug: member.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const member = await getTeamMember(params.slug)
  
  if (!member) {
    return {
      title: 'Team Member Not Found',
    }
  }

  return {
    title: `${member.name} - ${member.title} | CloudSmart`,
    description: `Meet ${member.name}, ${member.title} at CloudSmart. ${member.bio}`,
  }
}

export default async function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = await getTeamMember(params.slug)
  
  if (!member) {
    notFound()
  }

  return (
    <>
      {/* Hero Section */}
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <Image
              src={member.image_url || '/placeholder-team.jpg'}
              alt={member.name}
              width={200}
              height={200}
              className="team-avatar"
              style={{ width: '200px', height: '200px' }}
            />
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '20px 0 10px', color: 'var(--text-color)' }}>
              {member.name}
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)', fontWeight: '500', marginBottom: '30px' }}>
              {member.title}
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="team-card" style={{ textAlign: 'left', padding: '40px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '20px', color: 'var(--text-color)' }}>
                About {member.name.split(' ')[0]}
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666' }}>
                {member.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section" style={{ background: 'var(--light-gray)', paddingTop: '60px' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="section-title">Expertise & Experience</h2>
            
            <div className="team-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <div className="team-card">
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🏆</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>
                  Salesforce Certified
                </h3>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>
                  Holds multiple Salesforce certifications and stays current with platform updates.
                </p>
              </div>
              
              <div className="team-card">
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>💼</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>
                  Industry Experience
                </h3>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>
                  Extensive experience working with clients across various industries and business sizes.
                </p>
              </div>
              
              <div className="team-card">
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🎯</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>
                  Results-Driven
                </h3>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>
                  Focused on delivering measurable business outcomes and maximizing ROI for clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to Work Together?</h2>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
            Get in touch to discuss how {member.name.split(' ')[0]} and the CloudSmart team 
            can help transform your business with Salesforce.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact-us" className="btn">
              Contact Us
            </Link>
            <Link href="/teams" className="btn-secondary">
              View All Team Members
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}