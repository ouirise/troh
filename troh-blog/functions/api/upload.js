// KV-based image upload (base64 storage)
// Simple, works great for small images (<1MB)

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
    const formData = await request.formData()
    const file = formData.get('file')
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
    
    // Validate
    if (!file.type.startsWith('image/')) {
      return new Response(JSON.stringify({ error: 'Not an image' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
    
    // 1MB limit for KV
    if (file.size > 1024 * 1024) {
      return new Response(JSON.stringify({ error: 'Max 1MB for images' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
    
    // Convert to base64
    const arrayBuffer = await file.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
    const dataUrl = `data:${file.type};base64,${base64}`
    
    // Generate filename
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.]/g, '-')}`
    
    // Store in KV
    const key = `image:${filename}`
    await env.BLOG_POSTS.put(key, dataUrl)
    
    // Return API URL
    return new Response(JSON.stringify({ 
      success: true,
      url: `/api/images/${filename}`,
      filename
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
