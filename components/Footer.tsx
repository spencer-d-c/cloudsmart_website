import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="cs-footer">
      <div className="cs-footer-main">
        <div className="cs-footer-container">
          {/* Column 1 - Company Info */}
          <div className="cs-footer-column">
            <Link href="/" className="cs-footer-logo">
              <Image
                src="/logo.png"
                alt="CloudSmart"
                width={200}
                height={38}
                style={{ height: 'auto' }}
              />
            </Link>
            <p className="cs-footer-description">
              CloudSmart Helps Transform Sales, Marketing and Customer Service Teams With The Power Of Salesforce.com
            </p>
            <div className="cs-footer-social">
              <a href="https://uk.linkedin.com/company/cloudsmart-consulting" target="_blank" rel="noopener noreferrer" className="cs-social-icon cs-social-linkedin">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://www.facebook.com/CloudSmartConsulting/" target="_blank" rel="noopener noreferrer" className="cs-social-icon cs-social-facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/cloudsmartconsulting/?hl=en-gb" target="_blank" rel="noopener noreferrer" className="cs-social-icon cs-social-instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com/channel/UCakHPPXx4sTto-TpHS3U6EA" target="_blank" rel="noopener noreferrer" className="cs-social-icon cs-social-youtube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Column 2 - Services */}
          <div className="cs-footer-column">
            <h3 className="cs-footer-title">SERVICES</h3>
            <ul className="cs-footer-links">
              <li><Link href="/what-we-do/services/consulting"><i className="fas fa-angle-right"></i> Consulting</Link></li>
              <li><Link href="/what-we-do/services/implementation"><i className="fas fa-angle-right"></i> Implementation</Link></li>
              <li><Link href="/what-we-do/services/training"><i className="fas fa-angle-right"></i> Training</Link></li>
              <li><Link href="/what-we-do/services/managed-services"><i className="fas fa-angle-right"></i> Managed Services</Link></li>
            </ul>
          </div>

          {/* Column 3 - Clouds */}
          <div className="cs-footer-column">
            <h3 className="cs-footer-title">CLOUDS</h3>
            <ul className="cs-footer-links">
              <li><Link href="/what-we-do/clouds/sales-cloud"><i className="fas fa-angle-right"></i> Sales Cloud</Link></li>
              <li><Link href="/what-we-do/clouds/marketing-cloud"><i className="fas fa-angle-right"></i> Marketing Cloud</Link></li>
              <li><Link href="/what-we-do/clouds/service-cloud"><i className="fas fa-angle-right"></i> Service Cloud</Link></li>
              <li><Link href="/what-we-do/clouds/community-cloud"><i className="fas fa-angle-right"></i> Community Cloud</Link></li>
              <li><Link href="/what-we-do/clouds/pardot"><i className="fas fa-angle-right"></i> Pardot</Link></li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="cs-footer-column">
            <h3 className="cs-footer-title">GET IN TOUCH</h3>
            <div className="cs-contact-info">
              <div className="cs-contact-item">
                <div className="cs-contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="cs-contact-content">
                  <p>
                    CloudSmart Consulting Ltd<br />
                    78 Cannon St,<br />
                    London EC4N 6HL
                  </p>
                </div>
              </div>
              <div className="cs-contact-item">
                <div className="cs-contact-icon">
                  <a href="tel:08081350350">
                    <i className="fas fa-phone-alt"></i>
                  </a>
                </div>
                <div className="cs-contact-content">
                  <p>
                    <a href="tel:08081350350">+44 8081 350350</a>
                  </p>
                </div>
              </div>
              <div className="cs-contact-item">
                <div className="cs-contact-icon">
                  <a href="mailto:support@cloudsmart.co.uk">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
                <div className="cs-contact-content">
                  <p>
                    <a href="mailto:support@cloudsmart.co.uk">support@cloudsmart.co.uk</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="cs-footer-bottom">
        <div className="cs-footer-container">
          <p>&copy; 2024 CloudSmart Consulting Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}