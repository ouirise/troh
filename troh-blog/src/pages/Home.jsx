import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Sun, Sparkles } from 'lucide-react'
import { getAllPosts } from '../lib/content.js'
import siteSettings from '../content/settings/site.json'

function CloudVillage() {
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      const data = await getAllPosts()
      // Get first 3 posts
      setFeaturedPosts(data.slice(0, 3))
      setLoading(false)
    }
    loadPosts()
  }, [])

  const stats = siteSettings.stats || []

  return (
    <div>
      {/* Hero Section - Light Theme */}
      <section className="relative bg-gradient-to-br from-white via-orange-50 to-green-50 min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-troh-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-troh-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-troh-primary/10 backdrop-blur-sm mb-8">
              <Sun className="w-4 h-4 text-troh-primary" />
              <span className="text-sm text-troh-dark">Sunshine still exists. It may not always be bright, but it's always there.</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-troh-dark mb-6 tracking-tight">
              {siteSettings.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-2 max-w-3xl mx-auto">
              {siteSettings.description}
            </p>
            <p className="text-lg text-troh-primary font-semibold mb-4">
              Founded by Elaine Taylor
            </p>
            <blockquote className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto italic">
              "Even in the face of no cure, there is still courage. You are not your diagnosis—you are strength, light, and the living proof that hope refuses to fade."
            </blockquote>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-troh-primary hover:bg-red-500 text-white rounded-full font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-troh-primary/25"
              >
                Read My Story
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/colors"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-troh-primary text-troh-primary hover:bg-troh-primary hover:text-white rounded-full font-medium transition-all hover:scale-105"
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
          <Heart className="w-12 h-12 text-troh-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-troh-dark mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Founded by <strong>Elaine Taylor</strong>, {siteSettings.title} is a registered 501(c)(3) nonprofit organization dedicated to sharing the journey and providing support for those facing life-changing diagnoses.
          </p>
          <p className="text-lg text-gray-500 mt-6">
            Through our blog and community, we offer hope, clarity, and healing—one ray at a time. Whether you're newly diagnosed, in treatment, or navigating life after it all, our voice is here to echo what you may not be able to say yet: <strong className="text-troh-primary">You've got this.</strong>
          </p>
        </div>
      </section>

      {/* Impact Numbers - Light Background */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <p className="text-5xl font-bold text-troh-primary mb-2">{stat.number}</p>
                <p className="text-lg text-troh-dark">{stat.label}</p>
                {stat.sublabel && (
                  <p className="text-sm text-gray-500 mt-1">{stat.sublabel}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quote - Light Theme */}
      <section className="py-24 bg-troh-secondary/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl md:text-3xl italic leading-relaxed text-troh-dark">
            "Hope is being able to see that there is light despite all of the darkness."
          </blockquote>
          <footer className="text-troh-primary mt-4 text-lg font-semibold">— Desmond Tutu</footer>
        </div>
      </section>

      {/* Shop for Reparations - Coral Background */}
      <section className="py-24 bg-troh-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Support Through Our Shop</h2>
          <p className="text-xl leading-relaxed mb-8">
            Every purchase from the {siteSettings.title} store directly supports our mission. Your support helps provide reparations and assistance to families facing life-changing diagnoses—covering co-pays, transportation, food, and basic necessities that insurance doesn't reach.
          </p>
          <p className="text-lg opacity-90 mb-8">
            Shop with purpose. 100% of proceeds go toward helping real families in our community. Thank you for joining the battle—your support brings hope, dignity, and tangible relief to those who need it most.
          </p>
          <a
            href={`https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}`}
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-troh-primary rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg"
          >
            <Heart className="w-5 h-5 mr-2" />
            Visit Our Shop
          </a>
          <p className="text-sm mt-4 opacity-75">{siteSettings.title} is a registered 501(c)(3) nonprofit. EIN available upon request.</p>
        </div>
      </section>

      {/* Blog Preview - if posts exist */}
      {featuredPosts.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-troh-primary font-semibold text-sm uppercase tracking-wider">Journey</span>
              <h2 className="text-3xl md:text-5xl font-bold text-troh-dark mb-4 mt-2">Latest Updates</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.slug} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
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
                          <Sun className="w-12 h-12 text-troh-primary" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                      <h3 className="text-xl font-semibold text-troh-dark group-hover:text-troh-primary transition-colors mt-2">
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
                className="inline-flex items-center px-6 py-3 border-2 border-troh-primary text-troh-primary font-medium rounded-full hover:bg-troh-primary hover:text-white transition-all"
              >
                View All Journeys
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
