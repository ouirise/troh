import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react'
import { client, postQuery, urlFor } from '../lib/sanity'

function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(postQuery, { slug })
      .then((data) => {
        setPost(data)
        setLoading(false)
        // Update page title
        if (data) {
          document.title = `${data.title} | TroH`
        }
      })
      .catch((err) => {
        console.error('Error fetching post:', err)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-troh-gold" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-troh-dark mb-2">Story not found</h1>
          <Link to="/blog" className="text-troh-gold hover:underline">
            Back to all stories
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Hero Image */}
      {post.mainImage && (
        <div className="relative h-96 md:h-[500px]">
          <img
            src={urlFor(post.mainImage).width(1200).height(600).url()}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
              <Link
                to="/blog"
                className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to stories
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex items-center gap-6 text-white/80">
                {post.author && (
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author.name}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {Math.ceil(post.body ? JSON.stringify(post.body).split(' ').length / 200 : 5)} min read
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!post.mainImage && (
            <>
              <Link
                to="/blog"
                className="inline-flex items-center text-troh-gold hover:underline mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to stories
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold text-troh-dark mb-4">{post.title}</h1>
              <div className="flex items-center gap-6 text-gray-500 mb-8 pb-8 border-b">
                {post.author && (
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author.name}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </>
          )}

          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.categories.map((cat) => (
                <Link
                  key={cat.slug.current}
                  to={`/category/${cat.slug.current}`}
                  className="text-sm px-4 py-2 bg-troh-gold/10 text-troh-gold rounded-full hover:bg-troh-gold hover:text-white transition-colors"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}

          <div className="portable-text prose prose-lg max-w-none">
            {post.body ? (
              <PortableText value={post.body} />
            ) : (
              <p className="text-gray-500 italic">No content available.</p>
            )}
          </div>

          {/* Author Bio */}
          {post.author?.bio && (
            <div className="mt-16 p-8 bg-gray-50 rounded-2xl">
              <div className="flex items-start gap-4">
                {post.author.image && (
                  <img
                    src={urlFor(post.author.image).width(80).height(80).url()}
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-troh-dark">Written by {post.author.name}</h3>
                  <p className="text-gray-600 mt-1">{post.author.bio}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}

export default BlogPost
