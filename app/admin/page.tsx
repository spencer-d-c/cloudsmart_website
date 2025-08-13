'use client'

import { useEffect, useState } from 'react'

interface Stats {
  teamMembers: number
  blogPosts: number
  publishedPosts: number
  jobListings: number
  activeJobs: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [teamRes, blogRes, jobsRes] = await Promise.all([
          fetch('/api/admin/team'),
          fetch('/api/admin/blog'),
          fetch('/api/admin/jobs')
        ])

        const [teamData, blogData, jobsData] = await Promise.all([
          teamRes.json(),
          blogRes.json(),
          jobsRes.json()
        ])

        setStats({
          teamMembers: teamData.teamMembers?.length || 0,
          blogPosts: blogData.blogPosts?.length || 0,
          publishedPosts: blogData.blogPosts?.filter((post: any) => post.published).length || 0,
          jobListings: jobsData.jobs?.length || 0,
          activeJobs: jobsData.jobs?.filter((job: any) => job.active).length || 0
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="admin-content">
        <h1>Loading dashboard...</h1>
      </div>
    )
  }

  return (
    <>
      <div className="admin-header">
        <h1>Dashboard</h1>
        <p>Welcome to the CloudSmart admin panel. Manage your website content below.</p>
      </div>

      <div className="admin-content">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div className="team-card">
            <h3 style={{ color: 'var(--primary-color)', fontSize: '2rem', margin: '0 0 10px 0' }}>
              {stats?.teamMembers || 0}
            </h3>
            <p style={{ margin: '0 0 10px 0', fontWeight: '600' }}>Team Members</p>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
              Active team member profiles
            </p>
          </div>

          <div className="team-card">
            <h3 style={{ color: 'var(--primary-color)', fontSize: '2rem', margin: '0 0 10px 0' }}>
              {stats?.publishedPosts || 0}/{stats?.blogPosts || 0}
            </h3>
            <p style={{ margin: '0 0 10px 0', fontWeight: '600' }}>Blog Posts</p>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
              Published / Total posts
            </p>
          </div>

          <div className="team-card">
            <h3 style={{ color: 'var(--primary-color)', fontSize: '2rem', margin: '0 0 10px 0' }}>
              {stats?.activeJobs || 0}/{stats?.jobListings || 0}
            </h3>
            <p style={{ margin: '0 0 10px 0', fontWeight: '600' }}>Job Listings</p>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
              Active / Total job listings
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div>
            <h2 style={{ marginBottom: '20px', color: 'var(--text-color)' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <a href="/admin/team" className="btn-primary" style={{ textAlign: 'center', textDecoration: 'none' }}>
                Manage Team Members
              </a>
              <a href="/admin/blog" className="btn-primary" style={{ textAlign: 'center', textDecoration: 'none' }}>
                Manage Blog Posts
              </a>
              <a href="/admin/jobs" className="btn-primary" style={{ textAlign: 'center', textDecoration: 'none' }}>
                Manage Job Listings
              </a>
              <a href="/" className="btn-secondary" style={{ textAlign: 'center', textDecoration: 'none' }}>
                View Live Website
              </a>
            </div>
          </div>

          <div>
            <h2 style={{ marginBottom: '20px', color: 'var(--text-color)' }}>System Info</h2>
            <div className="team-card" style={{ textAlign: 'left' }}>
              <h4 style={{ marginBottom: '15px' }}>CloudSmart CMS</h4>
              <p style={{ margin: '5px 0', color: '#666' }}>
                <strong>Version:</strong> 1.0.0
              </p>
              <p style={{ margin: '5px 0', color: '#666' }}>
                <strong>Framework:</strong> Next.js
              </p>
              <p style={{ margin: '5px 0', color: '#666' }}>
                <strong>Database:</strong> PostgreSQL
              </p>
              <p style={{ margin: '5px 0', color: '#666' }}>
                <strong>Status:</strong> <span style={{ color: '#28a745' }}>✅ Online</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}