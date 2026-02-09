import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Sun, Sparkles } from 'lucide-react'
import { client, postsQuery, urlFor } from '../lib/sanity'

function CloudVillage() {
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`${postsQuery}[0...3]`)
      .then((data) => {
        setFeaturedPosts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching posts:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-troh-dark min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-troh-dark via-troh-primary to-troh-accent opacity-90" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-troh-gold/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
              <Sun className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Sunshine still exists. It may not always be bright, but it's always there.</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Tayloring Rays of Hope
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              A light in the darkness for those facing life-changing diagnoses
            </p>
            <blockquote className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto italic">
              "Even in the face of no cure, there is still courage. You are not your diagnosis—you are strength, light, and the living proof that hope refuses to fade."
            </blockquote>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-troh-gold hover:bg-red-600 text-white rounded-full font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-troh-gold/25"
              >
                Read My Story
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/colors"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-400 text-gray-300 hover:text-white hover:border-white rounded-full font-medium transition-all hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Colors of Cancer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Brief */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-12 h-12 text-troh-gold mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-troh-dark mb-6">Grow Your Vision</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            A ray of hope through life-changing diagnoses—you're never alone. Support, clarity, and healing one ray at a time with Tayloring Rays of Hope.
          </p>
          <p className="text-lg text-gray-500 mt-6">
            Whether you're newly diagnosed, in the thick of treatment, or navigating life after it all—my voice is here to echo what you may not be able to say yet: <strong className="text-troh-gold">You've got this.</strong>
          </p>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="py-24 bg-troh-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl md:text-3xl italic leading-relaxed">
            "Hope is being able to see that there is light despite all of the darkness."
          </blockquote>
          <footer className="text-troh-gold mt-4 text-lg">— Desmond Tutu</footer>
        </div>
      </section>

      {/* Donation Call */}
      <section className="py-24 bg-troh-gold text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Support the Mission</h2>
          <p className="text-xl leading-relaxed mb-8">
            Donating to Tayloring Rays of Hope helps uplift vulnerable individuals by supporting programs that provide skills, resources, and opportunities for self-reliance. Your donation directly contributes to lasting impact, restoring hope, dignity, and a brighter future for communities in need.
          </p>
          <p className="text-lg opacity-90 mb-8">
            Thank you for supporting the battle—your generosity and commitment make a powerful difference and help bring hope, strength, and positive change to those who need it most.
          </p>
          <a
            href={`https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}`}
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-troh-gold rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg"
          >
            <Heart className="w-5 h-5 mr-2" />
            Donate Now
          </a>
        </div>
      </section>

      {/* Blog Preview - if posts exist */}
      {featuredPosts.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-troh-gold font-semibold text-sm uppercase tracking-wider">Stories</span>
              <h2 className="text-3xl md:text-5xl font-bold text-troh-dark mb-4 mt-2">Latest Updates</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <article key={post._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <Link to={`/blog/${post.slug.current}`}>
                    <div className="relative overflow-hidden">
                      {post.mainImage ? (
                        <img
                          src={urlFor(post.mainImage).width(600).height(300).url()}
                          alt={post.title}
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-56 bg-gradient-to-br from-troh-primary to-troh-accent flex items-center justify-center">
                          <Sun className="w-12 h-12 text-troh-gold" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</span>
                      <h3 className="text-xl font-semibold text-troh-dark group-hover:text-troh-gold transition-colors mt-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/blog"
                className="inline-flex items-center px-6 py-3 border-2 border-troh-gold text-troh-gold font-medium rounded-full hover:bg-troh-gold hover:text-white transition-all"
              >
                View All Stories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default CloudVillage
