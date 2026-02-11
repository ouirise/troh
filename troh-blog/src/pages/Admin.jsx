import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit2, Trash2, Eye, Save, Copy, Check } from 'lucide-react'
import { getAllPosts } from '../lib/content'

function Admin() {
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)
  const [showJson, setShowJson] = useState(false)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().slice(0, 16),
    author: 'Elaine Taylor',
    image: '',
    excerpt: '',
    body: ''
  })

  useEffect(() => {
    loadPosts()
  }, [])

  async function loadPosts() {
    const data = await getAllPosts()
    setPosts(data)
  }

  function handleSubmit(e) {
    e.preventDefault()
    
    // Generate slug from title
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    const post = {
      ...formData,
      slug
    }
    
    setEditingPost(post)
    setShowJson(true)
  }

  function copyJson() {
    const json = JSON.stringify(editingPost, null, 2)
    navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function resetForm() {
    setFormData({
      title: '',
      date: new Date().toISOString().slice(0, 16),
      author: 'Elaine Taylor',
      image: '',
      excerpt: '',
      body: ''
    })
    setEditingPost(null)
    setShowJson(false)
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-troh-dark">Content Admin</h1>
              <p className="text-gray-500 mt-1">Manage blog posts without coding</p>
            </div>
            <Link
              to="/"
              className="text-troh-primary hover:underline"
            >
              View Site →
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-troh-dark mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                {editingPost ? 'Edit Post' : 'New Post'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-troh-primary focus:border-transparent"
                    placeholder="Post title"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-troh-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Author *
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-troh-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-troh-primary focus:border-transparent"
                    placeholder="/images/uploads/your-image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload image to /images/uploads/ folder first
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-troh-primary focus:border-transparent h-20"
                    placeholder="Short summary (shown on blog listing)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content *
                  </label>
                  <textarea
                    value={formData.body}
                    onChange={(e) => setFormData({...formData, body: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-troh-primary focus:border-transparent h-64 font-mono text-sm"
                    placeholder="Write your post content here...

Use ** for bold text**
Use ## for headings
Use blank lines for paragraphs"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-troh-primary text-white py-3 rounded-lg font-medium hover:bg-red-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Generate JSON
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-6">
              <h3 className="font-semibold text-blue-900 mb-2">How to Publish</h3>
              <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                <li>Fill out the form</li>
                <li>Click "Generate JSON"</li>
                <li>Copy the JSON output</li>
                <li>Create a new file in GitHub: <code>src/content/posts/YOUR-POST.json</code></li>
                <li>Paste the JSON and commit</li>
                <li>Site updates automatically!</li>
              </ol>
            </div>
          </div>

          {/* Right Column - Preview & JSON */}
          <div className="space-y-6">
            {/* JSON Output */}
            {showJson && editingPost && (
              <div className="bg-gray-900 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">JSON Output</h3>
                  <button
                    onClick={copyJson}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  {JSON.stringify(editingPost, null, 2)}
                </pre>
              </div>
            )}

            {/* Live Preview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-troh-dark mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Live Preview
              </h3>
              
              <article className="border border-gray-200 rounded-xl overflow-hidden">
                {formData.image ? (
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <img
                      src={formData.image}
                      alt={formData.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = '<span class="text-gray-400">Image not found</span>'
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-troh-primary/20 to-troh-secondary/30 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                <div className="p-4">
                  <p className="text-sm text-gray-500">
                    {formatDate(formData.date)}
                  </p>
                  <h4 className="text-lg font-semibold text-troh-dark mt-1">
                    {formData.title || 'Untitled Post'}
                  </h4>
                  <p className="text-gray-600 mt-2 line-clamp-3">
                    {formData.excerpt || 'No excerpt'}
                  </p>
                  <p className="text-sm text-gray-500 mt-3">
                    By {formData.author}
                  </p>
                </div>
              </article>
            </div>

            {/* Existing Posts */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-troh-dark mb-4">
                Existing Posts ({posts.length})
              </h3>
              <div className="space-y-3">
                {posts.map((post) => (
                  <div
                    key={post.slug}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-troh-dark">{post.title}</p>
                      <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="p-2 text-gray-500 hover:text-troh-primary transition-colors"
                        title="View post"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
