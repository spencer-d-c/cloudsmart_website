import Link from 'next/link'

export const metadata = {
  title: 'About CloudSmart - Platinum Salesforce Partner',
  description: 'Learn about CloudSmart, our mission, and why we are the trusted Salesforce partner for businesses across London and the UK.',
}

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1>About CloudSmart</h1>
          <p>
            We are a Platinum Salesforce Partner with a passion for helping businesses 
            transform their operations and achieve remarkable growth.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="section-title">Our Story</h2>
            
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
              Founded with a vision to bridge the gap between technology and business success, 
              CloudSmart has grown from a small consultancy to a recognized Platinum Salesforce Partner. 
              Our journey began with a simple belief: that every business, regardless of size, 
              deserves access to world-class Salesforce expertise.
            </p>
            
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
              Today, we work with organizations across various industries, from ambitious startups 
              to established enterprises, helping them harness the full potential of the Salesforce platform. 
              Our team of certified consultants brings together deep technical expertise and practical 
              business acumen to deliver solutions that drive real results.
            </p>

            <h3 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '20px', marginTop: '50px' }}>
              Our Mission
            </h3>
            
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
              To empower businesses by maximizing their Salesforce investment through expert guidance, 
              innovative solutions, and ongoing support. We believe in building long-term partnerships 
              that evolve with our clients' needs and contribute to their sustained success.
            </p>

            <h3 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '20px', marginTop: '50px' }}>
              Why Choose CloudSmart?
            </h3>
            
            <div className="team-grid" style={{ marginTop: '30px' }}>
              <div className="team-card">
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏆</div>
                <h4 className="team-name">Platinum Partner</h4>
                <p className="team-bio">
                  As a Salesforce Platinum Partner, we have demonstrated exceptional expertise 
                  and customer success across all Salesforce clouds.
                </p>
              </div>
              
              <div className="team-card">
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👥</div>
                <h4 className="team-name">Expert Team</h4>
                <p className="team-bio">
                  Our team holds multiple Salesforce certifications and brings years of 
                  hands-on experience to every project.
                </p>
              </div>
              
              <div className="team-card">
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎯</div>
                <h4 className="team-name">Results-Driven</h4>
                <p className="team-bio">
                  We focus on delivering measurable business outcomes and ROI, not just 
                  technical implementations.
                </p>
              </div>
              
              <div className="team-card">
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤝</div>
                <h4 className="team-name">Partnership Approach</h4>
                <p className="team-bio">
                  We work as an extension of your team, providing ongoing support and 
                  strategic guidance beyond project completion.
                </p>
              </div>
              
              <div className="team-card">
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚡</div>
                <h4 className="team-name">Agile Methodology</h4>
                <p className="team-bio">
                  Our agile approach ensures rapid delivery while maintaining flexibility 
                  to adapt to changing requirements.
                </p>
              </div>
              
              <div className="team-card">
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📈</div>
                <h4 className="team-name">Proven Track Record</h4>
                <p className="team-bio">
                  With numerous successful implementations across various industries, 
                  we have the experience to handle complex challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: 'var(--light-gray)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to Get Started?</h2>
          <p className="section-subtitle">
            Let's discuss how CloudSmart can help transform your business with Salesforce.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact-us" className="btn">
              Contact Us
            </Link>
            <Link href="/teams" className="btn-secondary">
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}