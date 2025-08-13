'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="header">
      {/* Blue Toolbar - Matching Original */}
      <div className="header-toolbar">
        <div className="cs-container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            fontSize: '14px'
          }}>
            <div>
              📧 info@cloudsmart.co.uk | 📞 +44 (0) 20 3488 3545
            </div>
            <div>
              Platinum Salesforce Partner
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="cs-container">
          <div className="header-content">
            <Link href="/" className="logo">
              <Image
                src="/logo.png"
                alt="CloudSmart"
                width={200}
                height={38}
                priority
                style={{ height: 'auto' }}
              />
            </Link>
            
            <nav>
              <ul className="nav">
                <li><Link href="/" className="nav-link">Home</Link></li>
                <li><Link href="/about" className="nav-link">About</Link></li>
                <li><Link href="/what-we-do" className="nav-link">What We Do</Link></li>
                <li><Link href="/teams" className="nav-link">Team</Link></li>
                <li><Link href="/blog" className="nav-link">Blog</Link></li>
                <li><Link href="/careers" className="nav-link">Careers</Link></li>
                <li><Link href="/contact-us" className="nav-link">Get In Touch</Link></li>
              </ul>
            </nav>
            
            {/* Mobile menu button */}
            <button 
              className="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}