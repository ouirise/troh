import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BookOpen, ArrowLeft } from 'lucide-react'
import { getAllPosts } from '../lib/content'

function Category() {
  const { slug } = useParams()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      const allPosts = await getAllPosts()
      // Simple category filtering - in real use, you'd have categories in your posts
      // For now, show all posts or filter by some criteria
      setPosts(allPosts)
      setLoading(false)
    }
    loadPosts()
  }, [slug])

  // Capitalize category name
  const categoryName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'All Posts'

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-white via-orange-50 to-green-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-600 hover:text-troh-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            My Journey
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-troh-dark mb-4">
            {categoryName}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl">
            Posts and stories from our community.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-troh-primary" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600">No journeys in this category yet</h3>
              <Link to="/blog" className="text-troh-primary hover:underline mt-2 inline-block">
                View all journeys
              </Link>
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
                        <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <h2 className="text-xl font-semibold text-troh-dark group-hover:text-troh-primary transition-colors mt-2 mb-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
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

export default Category
