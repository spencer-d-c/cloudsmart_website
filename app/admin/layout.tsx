'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          credentials: 'include',
        })
        
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          router.push('/admin/login')
        }
      } catch (error) {
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#f8f9fa'
      }}>
        <div>Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div style={{ padding: '20px', borderBottom: '1px solid #555' }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>CloudSmart Admin</h2>
        </div>
        
        <nav>
          <ul className="admin-nav">
            <li><Link href="/admin">Dashboard</Link></li>
            <li><Link href="/admin/team">Team Members</Link></li>
            <li><Link href="/admin/blog">Blog Posts</Link></li>
            <li><Link href="/admin/jobs">Job Listings</Link></li>
            <li>
              <button 
                onClick={handleLogout}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 20px',
                  background: 'none',
                  border: 'none',
                  color: '#ccc',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = 'var(--primary-color)'}
                onMouseOut={(e) => e.target.style.background = 'none'}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      
      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}