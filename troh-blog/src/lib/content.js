// Simple JSON-based content loader
// No CMS required - just edit the JSON files in src/content/

import siteSettings from '../content/settings/site.json'

// Get all posts
export async function getAllPosts() {
  try {
    // In development, we can use import.meta.glob
    // In production, these would be pre-built
    const modules = import.meta.glob('../content/posts/*.json', { eager: true })
    
    const posts = Object.entries(modules).map(([path, module]) => {
      const slug = path.replace(/.*\/(.+)\.json$/, '$1')
      return {
        slug,
        ...module.default || module
      }
    })
    
    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error('Error loading posts:', error)
    return []
  }
}

// Get single post by slug
export async function getPostBySlug(slug) {
  try {
    const posts = await getAllPosts()
    return posts.find(post => post.slug === slug) || null
  } catch (error) {
    console.error('Error loading post:', error)
    return null
  }
}

// Get site settings
export function getSiteSettings() {
  return siteSettings
}

// Simple placeholder image helper
export function getPlaceholderImage() {
  return '/images/uploads/placeholder.jpg'
}
