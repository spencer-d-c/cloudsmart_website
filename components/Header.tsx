'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="header-clean">
      <div className="header-container">
        <div className="header-content-clean">
          <Link href="/" className="logo-clean">
            <Image
              src="/logo.png"
              alt="CloudSmart"
              width={200}
              height={38}
              priority
              style={{ height: 'auto' }}
            />
          </Link>
          
          <nav className="nav-clean">
            <ul>
              <li><Link href="/" className="nav-link-clean">HOME</Link></li>
              <li><Link href="/about" className="nav-link-clean">ABOUT</Link></li>
              <li><Link href="/what-we-do" className="nav-link-clean">WHAT WE DO</Link></li>
              <li><Link href="/blog" className="nav-link-clean">BLOG</Link></li>
              <li><Link href="/careers" className="nav-link-clean">CAREERS</Link></li>
              <li><Link href="/contact-us" className="nav-link-clean">GET IN TOUCH</Link></li>
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
    </header>
  )
}