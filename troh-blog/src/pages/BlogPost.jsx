import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { getPostBySlug } from '../lib/content.js'
import ReactMarkdown from 'react-markdown'

function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPost() {
      const data = await getPostBySlug(slug)
      setPost(data)
      setLoading(false)
      // Update page title
      if (data) {
        document.title = `${data.title} | TROH`
      }
    }
    loadPost()
  }, [slug])

  // Format date nicely
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-troh-primary" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-troh-dark mb-2">Journey not found</h1>
          <Link to="/blog" className="text-troh-primary hover:underline">
            Back to all journeys
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Hero Image */}
      {post.image && (
        <div className="relative h-96 md:h-[500px]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
              <Link
                to="/blog"
                className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to journey
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex items-center gap-6 text-white/80">
                {post.author && (
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* If no hero image, show title here */}
          {!post.image && (
            <div className="mb-12">
              <Link
                to="/blog"
                className="inline-flex items-center text-gray-600 hover:text-troh-primary mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to journey
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold text-troh-dark mb-4">{post.title}</h1>
              <div className="flex items-center gap-6 text-gray-500">
                {post.author && (
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
              </div>
            </div>
          )}

          {/* Post Body */}
          <div className="prose prose-lg max-w-none prose-headings:text-troh-dark prose-a:text-troh-primary">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPost
