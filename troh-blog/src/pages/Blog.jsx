import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Calendar, User } from 'lucide-react'
import { client, postsQuery, urlFor } from '../lib/sanity'

function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(postsQuery)
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching posts:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-troh-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">All Stories</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real stories from our community. Hope, healing, and everything in between.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-troh-gold" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600">No stories yet</h3>
              <p className="text-gray-500 mt-2">Check back soon for new content.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <Link to={`/blog/${post.slug.current}`}>
                    <div className="relative overflow-hidden">
                      {post.mainImage ? (
                        <img
                          src={urlFor(post.mainImage).width(600).height(300).url()}
                          alt={post.title}
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                        {post.author && (
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author.name}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-semibold text-troh-dark group-hover:text-troh-gold transition-colors mb-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.categories.map((cat) => (
                            <span key={cat.slug.current} className="text-xs px-3 py-1 bg-troh-gold/10 text-troh-gold rounded-full">
                              {cat.title}
                            </span>
                          ))}
                        </div>
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
