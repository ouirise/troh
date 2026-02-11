import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Calendar, User } from 'lucide-react'
import { getAllPosts } from '../lib/content.js'

function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      const data = await getAllPosts()
      setPosts(data)
      setLoading(false)
    }
    loadPosts()
  }, [])

  // Format date nicely
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-white via-orange-50 to-green-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-troh-dark mb-4">All Journey</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Real journeys from our community. Hope, healing, and everything in between.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-troh-primary" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600">No journeys yet</h3>
              <p className="text-gray-500 mt-2">Check back soon for new content.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <Link to={`/blog/${post.slug}`}>
                    <div className="relative overflow-hidden">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = '/images/uploads/placeholder.jpg'
                          }}
                        />
                      ) : (
                        <div className="w-full h-56 bg-gradient-to-br from-troh-primary/20 to-troh-secondary/30 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-troh-primary" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-gray-500 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.date)}
                      </span>
                      <h2 className="text-xl font-semibold text-troh-dark group-hover:text-troh-primary transition-colors mt-2 mb-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                      {post.author && (
                        <span className="text-sm text-gray-500 mt-3 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Blog
