import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BookOpen, ArrowLeft } from 'lucide-react'
import { client, postsByCategoryQuery, categoriesQuery, urlFor } from '../lib/sanity'

function Category() {
  const { slug } = useParams()
  const [posts, setPosts] = useState([])
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch category info
    client.fetch(`${categoriesQuery}[slug.current == $slug][0]`, { slug })
      .then((cat) => {
        setCategory(cat)
      })

    // Fetch posts in category
    client.fetch(postsByCategoryQuery, { category: slug })
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching posts:', err)
        setLoading(false)
      })
  }, [slug])

  useEffect(() => {
    if (category) {
      document.title = `${category.title} | TroH`
    }
  }, [category])

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-troh-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            All Stories
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {category?.title || 'Category'}
          </h1>
          {category?.description && (
            <p className="text-xl text-gray-400 max-w-2xl">{category.description}</p>
          )}
        </div>
      </section>

      {/* Posts */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-troh-gold" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600">No stories in this category yet</h3>
              <Link to="/blog" className="text-troh-gold hover:underline mt-2 inline-block">
                View all stories
              </Link>
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
                      <span className="text-sm text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                      <h2 className="text-xl font-semibold text-troh-dark group-hover:text-troh-gold transition-colors mt-2 mb-2">
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
