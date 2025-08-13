import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>CloudSmart</h3>
          <p>
            Platinum Salesforce Partner helping businesses maximize their Sales and Marketing efforts.
          </p>
          <p>
            <strong>London, UK</strong><br />
            Leading Salesforce consultancy with a proven track record of success.
          </p>
        </div>
        
        <div className="footer-section">
          <h3>Services</h3>
          <Link href="/what-we-do">What We Do</Link>
          <Link href="/what-we-do#sales-cloud">Sales Cloud</Link>
          <Link href="/what-we-do#marketing-cloud">Marketing Cloud</Link>
          <Link href="/what-we-do#service-cloud">Service Cloud</Link>
        </div>
        
        <div className="footer-section">
          <h3>Company</h3>
          <Link href="/about">About Us</Link>
          <Link href="/teams">Our Team</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/blog">Blog</Link>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <Link href="/contact-us">Get In Touch</Link>
          <p>
            Email: hello@cloudsmart.com<br />
            Phone: +44 (0) 20 7123 4567
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CloudSmart. All rights reserved. | Platinum Salesforce Partner</p>
      </div>
    </footer>
  )
}