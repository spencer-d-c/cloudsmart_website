'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="nav-container">
        <Link href="/" className="logo">
          CloudSmart
        </Link>
        
        <nav>
          <ul className="nav-menu">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/what-we-do">What We Do</Link></li>
            <li><Link href="/teams">Team</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/contact-us">Contact</Link></li>
          </ul>
        </nav>
        
        {/* Mobile menu button - will implement mobile menu later */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ display: 'none' }}
        >
          ☰
        </button>
      </div>
    </header>
  )
}