// Content loader - uses D1 in production, local JSON in development

import siteSettings from '../content/settings/site.json'

const API_BASE = '/api'

// Detect environment
const isProduction = import.meta.env.PROD

// Get all posts
export async function getAllPosts() {
  if (isProduction) {
    try {
      const response = await fetch(`${API_BASE}/posts`)
      if (!response.ok) throw new Error('Failed to fetch posts')
      return await response.json()
    } catch (error) {
      console.error('Error fetching posts:', error)
      return []
    }
  } else {
    // Development: Use local JSON files
    try {
      const postFiles = import.meta.glob('../content/posts/*.json', { eager: true })
      
      const posts = Object.entries(postFiles).map(([path, module]) => {
        const slug = path.replace(/.*\/(.+)\.json$/, '$1')
        return {
          slug,
          ...(module.default || module)
        }
      })
      
      return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
    } catch (error) {
      console.error('Error loading posts:', error)
      return []
    }
  }
}

// Get single post by slug
export async function getPostBySlug(slug) {
  if (isProduction) {
    try {
      const response = await fetch(`${API_BASE}/posts/${slug}`)
      if (!response.ok) throw new Error('Post not found')
      return await response.json()
    } catch (error) {
      console.error('Error fetching post:', error)
      return null
    }
  } else {
    const posts = await getAllPosts()
    return posts.find(post => post.slug === slug) || null
  }
}

// Save post (for admin panel)
export async function savePost(post) {
  if (isProduction) {
    try {
      const response = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      })
      
      if (!response.ok) throw new Error('Failed to save post')
      return await response.json()
    } catch (error) {
      console.error('Error saving post:', error)
      throw error
    }
  } else {
    return { success: false, post, message: 'Development mode: Copy JSON manually' }
  }
}

// Delete post
export async function deletePost(slug) {
  if (isProduction) {
    try {
      const response = await fetch(`${API_BASE}/posts`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug })
      })
      
      if (!response.ok) throw new Error('Failed to delete post')
      return await response.json()
    } catch (error) {
      console.error('Error deleting post:', error)
      throw error
    }
  }
}

// Upload image
export async function uploadImage(file) {
  if (isProduction) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) throw new Error('Upload failed')
      return await response.json()
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  } else {
    // Development: Return base64
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve({ success: true, url: e.target.result })
      }
      reader.readAsDataURL(file)
    })
  }
}

// Get site settings
export function getSiteSettings() {
  return siteSettings
}

// Placeholder image
export function getPlaceholderImage() {
  return '/images/uploads/placeholder.svg'
}
