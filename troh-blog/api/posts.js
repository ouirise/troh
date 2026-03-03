// KV-based API for blog posts
// Simple, fast, perfect for JSON data

export async function onRequestGet(context) {
  const { env } = context
  
  try {
    // Get all posts from KV
    const postsJson = await env.BLOG_POSTS.get('posts')
    
    if (!postsJson) {
      return new Response(JSON.stringify([]), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
    
    const posts = JSON.parse(postsJson)
    
    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date))
    
    return new Response(JSON.stringify(posts), {
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

export async function onRequestPost(context) {
  const { env, request } = context
  
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  }
  
  try {
    const newPost = await request.json()
    
    // Generate slug
    if (!newPost.slug) {
      newPost.slug = newPost.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }
    
    // Get existing posts
    const postsJson = await env.BLOG_POSTS.get('posts')
    const posts = postsJson ? JSON.parse(postsJson) : []
    
    // Update or add
    const index = posts.findIndex(p => p.slug === newPost.slug)
    if (index >= 0) {
      posts[index] = newPost
    } else {
      posts.push(newPost)
    }
    
    // Save back to KV
    await env.BLOG_POSTS.put('posts', JSON.stringify(posts))
    
    return new Response(JSON.stringify({ success: true, post: newPost }), {
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
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}
