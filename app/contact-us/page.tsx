export const metadata = {
  title: 'Contact Us - CloudSmart Salesforce Consultancy',
  description: 'Get in touch with CloudSmart. Let us help you transform your business with expert Salesforce consulting services.',
}

export default function ContactUs() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1>Get In Touch</h1>
          <p>
            Ready to transform your business with Salesforce? 
            Let's discuss how CloudSmart can help you achieve your goals.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            
            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '30px', color: 'var(--text-color)' }}>
                Contact Information
              </h2>
              
              <div className="team-card" style={{ textAlign: 'left', marginBottom: '30px' }}>
                <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>
                  CloudSmart Ltd
                </h3>
                <div style={{ lineHeight: '1.8', color: '#666' }}>
                  <p><strong>📧 Email:</strong> hello@cloudsmart.com</p>
                  <p><strong>📞 Phone:</strong> +44 (0) 20 7123 4567</p>
                  <p><strong>📍 Location:</strong> London, United Kingdom</p>
                  <p><strong>🕒 Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM GMT</p>
                </div>
              </div>

              <div className="team-card" style={{ textAlign: 'left' }}>
                <h4 style={{ marginBottom: '15px', color: 'var(--text-color)' }}>
                  What happens next?
                </h4>
                <ul style={{ color: '#666', lineHeight: '1.8', marginLeft: '20px' }}>
                  <li>We'll respond within 24 hours</li>
                  <li>Schedule a discovery call to understand your needs</li>
                  <li>Provide a tailored proposal for your project</li>
                  <li>Begin your Salesforce transformation journey</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '30px', color: 'var(--text-color)' }}>
                Send Us a Message
              </h2>
              
              <div className="team-card" style={{ textAlign: 'left' }}>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input type="text" id="name" name="name" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input type="text" id="company" name="company" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select id="subject" name="subject" required>
                      <option value="">Please select...</option>
                      <option value="consultation">Free Consultation</option>
                      <option value="sales-cloud">Sales Cloud Implementation</option>
                      <option value="marketing-cloud">Marketing Cloud Implementation</option>
                      <option value="service-cloud">Service Cloud Implementation</option>
                      <option value="integration">Integration Services</option>
                      <option value="support">Ongoing Support</option>
                      <option value="career">Career Opportunities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required
                      placeholder="Tell us about your project, timeline, and any specific requirements..."
                      style={{ minHeight: '120px' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    Send Message
                  </button>
                </form>

                <p style={{ 
                  marginTop: '20px', 
                  fontSize: '0.9rem', 
                  color: '#666',
                  textAlign: 'center'
                }}>
                  * Required fields. We respect your privacy and will never share your information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section" style={{ background: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">How We Can Help</h2>
          
          <div className="team-grid">
            <div className="team-card">
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎯</div>
              <h3 className="team-name">Sales Cloud</h3>
              <p className="team-bio">
                Streamline your sales processes, improve lead management, and increase conversion rates.
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
        </div>
      </section>
    </>
  )
}