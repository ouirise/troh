// Seed KV with initial welcome post

const initialPosts = [
  {
    slug: 'welcome',
    title: 'Welcome to Our Journey',
    date: '2026-02-11T12:00:00.000Z',
    author: 'Elaine Taylor',
    image: '/images/uploads/placeholder.svg',
    excerpt: 'Our first post sharing the mission and vision of Tayloring Rays of Hope.',
    body: 'Welcome to Tayloring Rays of Hope!\n\nThis space is dedicated to sharing stories of hope, resilience, and community support. As someone who has faced the challenges of a life-changing diagnosis, I understand the importance of having support during difficult times.\n\n## Our Mission\n\nOur mission is simple: to provide rays of hope to families navigating cancer diagnoses.\n\n## What to Expect\n\nThrough this blog, we\'ll share:\n- Personal stories from our community\n- Resources for patients and families\n- Updates on our outreach efforts\n- Ways you can get involved\n\nThank you for joining us on this journey!\n\n**Elaine Taylor**\nFounder, Tayloring Rays of Hope'
  }
]

export async function onRequestPost(context) {
  const { env } = context
  
  try {
    // Check if already seeded
    const existing = await env.BLOG_POSTS.get('posts')
    if (existing) {
      return new Response(JSON.stringify({ message: 'Already seeded' }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
    
    // Seed posts
    await env.BLOG_POSTS.put('posts', JSON.stringify(initialPosts))
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Seeded successfully',
      posts: initialPosts 
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}
