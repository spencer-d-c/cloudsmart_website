const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const teamMembers = [
  {
    name: 'Spencer Collins',
    slug: 'spencer-collins',
    title: 'Founder & Lead Consultant',
    bio: 'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution.',
    image_url: '/uploads/team/spencer-collins.jpg',
    order_index: 1
  },
  {
    name: 'Ashok Dorairaj',
    slug: 'ashok-dorairaj',
    title: 'Senior Salesforce Consultant',
    bio: 'Experienced Salesforce consultant specializing in Sales Cloud and Service Cloud implementations.',
    image_url: '/uploads/team/ashok-dorairaj.jpg',
    order_index: 2
  },
  {
    name: 'Clare Harden',
    slug: 'clare-harden',
    title: 'Salesforce Business Analyst',
    bio: 'Skilled business analyst with expertise in Salesforce configuration and process optimization.',
    image_url: '/uploads/team/clare-harden.jpg',
    order_index: 3
  },
  {
    name: 'Geri Parkins',
    slug: 'geri-parkins',
    title: 'Project Manager',
    bio: 'Experienced project manager ensuring smooth delivery of Salesforce implementations.',
    image_url: '/uploads/team/geri-parkins.jpg',
    order_index: 4
  },
  {
    name: 'Herman Mansoor',
    slug: 'herman-mansoor',
    title: 'Salesforce Developer',
    bio: 'Talented developer specializing in custom Salesforce solutions and integrations.',
    image_url: '/uploads/team/herman-mansoor.jpg',
    order_index: 5
  },
  {
    name: 'Jan Dacey',
    slug: 'jan-dacey',
    title: 'Senior Consultant',
    bio: 'Senior consultant with deep expertise in Salesforce Marketing Cloud and automation.',
    image_url: '/uploads/team/jan-dacey.jpg',
    order_index: 6
  },
  {
    name: 'Lily McKeown',
    slug: 'lily-mckeown',
    title: 'Junior Consultant',
    bio: 'Energetic junior consultant growing expertise in Salesforce Sales and Service Cloud.',
    image_url: '/uploads/team/lily-mckeown.jpg',
    order_index: 7
  },
  {
    name: 'Linesh Mali',
    slug: 'linesh-mali',
    title: 'Technical Architect',
    bio: 'Technical architect designing robust Salesforce solutions for enterprise clients.',
    image_url: '/uploads/team/linesh-mali.jpg',
    order_index: 8
  }
];

const blogPosts = [
  {
    title: '5 Strategies for Revenue Optimisation Through Effective Salesforce Implementation',
    slug: '5-strategies-for-revenue-optimisation-through-effective-salesforce-implementation',
    excerpt: 'Discover how to maximize your revenue potential with strategic Salesforce implementation approaches.',
    content: `# 5 Strategies for Revenue Optimisation Through Effective Salesforce Implementation

Revenue optimization is at the heart of every successful business strategy. When combined with effective Salesforce implementation, it becomes a powerful driver for sustainable growth.

## 1. Streamline Your Sales Process

Implement standardized sales processes that guide your team from lead to close. Use Salesforce's workflow automation to eliminate manual tasks and ensure consistent follow-up.

## 2. Leverage Data-Driven Insights

Utilize Salesforce's robust reporting and analytics capabilities to identify trends, bottlenecks, and opportunities in your sales pipeline.

## 3. Enhance Customer Experience

Create personalized customer journeys using Salesforce's customer 360 view, ensuring every interaction adds value.

## 4. Optimize Marketing Campaigns

Integrate Marketing Cloud to create targeted campaigns that nurture leads and drive conversions.

## 5. Implement Effective Lead Scoring

Use Salesforce's lead scoring capabilities to prioritize high-value prospects and allocate resources efficiently.`,
    featured_image: '/uploads/blog/5-strategies-for-revenue.jpg',
    published: true,
    published_at: new Date('2023-07-15')
  },
  {
    title: 'Salesforce Marketing Cloud January 2021 Release Summary',
    slug: 'salesforce-marketing-cloud-january-2021-release-summary',
    excerpt: 'A comprehensive overview of the latest features and improvements in Salesforce Marketing Cloud.',
    content: `# Salesforce Marketing Cloud January 2021 Release Summary

The January 2021 release brings exciting new features and enhancements to Salesforce Marketing Cloud.

## New Features

- Enhanced Journey Builder capabilities
- Improved email template designer
- Advanced segmentation tools
- Better integration with Sales Cloud

## Key Improvements

- Performance optimizations
- User interface enhancements
- Enhanced reporting capabilities`,
    featured_image: '/uploads/blog/salesforce-marketing-cloud-january-2021.jpg',
    published: true,
    published_at: new Date('2021-02-01')
  }
];

const jobListings = [
  {
    title: 'Salesforce Business Analyst',
    slug: 'salesforce-business-analyst',
    description: 'We are looking for an experienced Salesforce Business Analyst to join our growing team.',
    requirements: '• 3+ years of Salesforce experience\n• Strong analytical skills\n• Excellent communication abilities\n• Salesforce certifications preferred',
    location: 'London, UK',
    job_type: 'Full-time',
    active: true
  },
  {
    title: 'Salesforce Marketing Cloud Administrator',
    slug: 'salesforce-marketing-cloud-administrator',
    description: 'Join our team as a Marketing Cloud Administrator and help our clients maximize their marketing automation.',
    requirements: '• Marketing Cloud certification\n• 2+ years of Marketing Cloud experience\n• Email marketing expertise\n• Journey Builder proficiency',
    location: 'London, UK',
    job_type: 'Full-time',
    active: true
  },
  {
    title: 'Senior Salesforce Consultant',
    slug: 'salesforce-sales-service-senior-consultant',
    description: 'Lead complex Salesforce implementations for our enterprise clients.',
    requirements: '• 5+ years of Salesforce consulting experience\n• Multiple Salesforce certifications\n• Leadership experience\n• Client-facing skills',
    location: 'London, UK',
    job_type: 'Full-time',
    active: true
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database...');

    // Create admin user
    const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
    await pool.query(`
      INSERT INTO admin_users (email, password_hash) 
      VALUES ($1, $2) 
      ON CONFLICT (email) DO NOTHING
    `, [process.env.ADMIN_EMAIL || 'admin@cloudsmart.com', adminPassword]);
    console.log('✅ Admin user created');

    // Seed team members
    for (const member of teamMembers) {
      await pool.query(`
        INSERT INTO team_members (name, slug, title, bio, image_url, order_index)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          title = EXCLUDED.title,
          bio = EXCLUDED.bio,
          image_url = EXCLUDED.image_url,
          order_index = EXCLUDED.order_index,
          updated_at = CURRENT_TIMESTAMP
      `, [member.name, member.slug, member.title, member.bio, member.image_url, member.order_index]);
    }
    console.log('✅ Team members seeded');

    // Seed blog posts
    for (const post of blogPosts) {
      await pool.query(`
        INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, published, published_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          excerpt = EXCLUDED.excerpt,
          content = EXCLUDED.content,
          featured_image = EXCLUDED.featured_image,
          published = EXCLUDED.published,
          published_at = EXCLUDED.published_at,
          updated_at = CURRENT_TIMESTAMP
      `, [post.title, post.slug, post.excerpt, post.content, post.featured_image, post.published, post.published_at]);
    }
    console.log('✅ Blog posts seeded');

    // Seed job listings
    for (const job of jobListings) {
      await pool.query(`
        INSERT INTO job_listings (title, slug, description, requirements, location, job_type, active)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          requirements = EXCLUDED.requirements,
          location = EXCLUDED.location,
          job_type = EXCLUDED.job_type,
          active = EXCLUDED.active,
          updated_at = CURRENT_TIMESTAMP
      `, [job.title, job.slug, job.description, job.requirements, job.location, job.job_type, job.active]);
    }
    console.log('✅ Job listings seeded');

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedDatabase();