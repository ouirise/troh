// Retrieve image from KV

export async function onRequestGet(context) {
  const { env, params } = context
  const { filename } = params
  
  try {
    const key = `image:${filename}`
    const imageData = await env.BLOG_POSTS.get(key)
    
    if (!imageData) {
      return new Response('Not found', { status: 404 })
    }
    
    // Parse data URL
    const match = imageData.match(/^data:([^;]+);base64,(.+)$/)
    if (!match) {
      return new Response('Invalid image data', { status: 500 })
    }
    
    const contentType = match[1]
    const base64 = match[2]
    
    // Decode base64
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    
    return new Response(bytes, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000'
      }
    })
    
  } catch (error) {
    return new Response('Error: ' + error.message, { status: 500 })
  }
}
