import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Eye, Save, Copy, Check, RefreshCw, AlertCircle, Upload, Image as ImageIcon, X } from 'lucide-react'
import { getAllPosts, savePost } from '../lib/content.js'

const API_BASE = '/api'

function Admin() {
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)
  const [showJson, setShowJson] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [isProduction] = useState(import.meta.env.PROD)
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  
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

  async function handleImageUpload(file) {
    if (!file) return
    
    setUploading(true)
    
    // Show preview immediately
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target.result)
    reader.readAsDataURL(file)
    
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      
      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: uploadFormData
      })
      
      if (!response.ok) {
        throw new Error('Upload failed')
      }
      
      const result = await response.json()
      
      if (result.success) {
        setFormData(prev => ({ ...prev, image: result.url }))
        setSaveMessage('✅ Image uploaded successfully!')
        setTimeout(() => setSaveMessage(''), 2000)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setSaveMessage('❌ Image upload failed. Will use preview.')
      // Keep the preview for base64 fallback
      setFormData(prev => ({ ...prev, image: imagePreview }))
    } finally {
      setUploading(false)
    }
  }

  function handleFileSelect(e) {
    const file = e.target.files[0]
    if (file) handleImageUpload(file)
  }

  function handleDrop(e) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file)
    }
  }

  function clearImage() {
    setFormData(prev => ({ ...prev, image: '' }))
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setSaveMessage('')
    
    // Generate slug from title
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    const post = {
      ...formData,
      slug
    }
    
    try {
      const result = await savePost(post)
      
      if (result.success) {
        setSaveMessage('✅ Post saved successfully!')
        setEditingPost(post)
        setShowJson(false)
        loadPosts()
        setTimeout(() => {
          resetForm()
          setSaveMessage('')
        }, 2000)
      } else {
        setEditingPost(post)
        setShowJson(true)
        setSaveMessage('⚠️ Development mode: Copy JSON and save manually')
      }
    } catch (error) {
      setSaveMessage(`❌ Error: ${error.message}`)
      setEditingPost(post)
      setShowJson(true)
    } finally {
      setSaving(false)
    }
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
    setSaveMessage('')
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
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
              <p className="text-gray-500 mt-1">
                {isProduction 
                  ? '✅ Connected to Cloudflare (auto-save enabled)'
                  : '⚠️ Development mode (manual JSON copy required)'
                }
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={loadPosts}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-troh-primary transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <Link
                to="/"
                className="px-4 py-2 text-troh-primary hover:underline"
              >
                View Site →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {saveMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            saveMessage.includes('✅') ? 'bg-green-100 text-green-800' :
            saveMessage.includes('⚠️') ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {saveMessage}
          </div>
        )}

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

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Featured Image
                  </label>
                  
                  {formData.image || imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview || formData.image}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                        onError={() => setImagePreview(null)}
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {uploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                          <RefreshCw className="w-8 h-8 text-white animate-spin" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-troh-primary hover:bg-troh-primary/5 transition-colors"
                    >
                      <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-gray-500 text-center">
                        <span className="font-medium text-troh-primary">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                      {uploading && (
                        <RefreshCw className="w-6 h-6 text-troh-primary animate-spin mt-2" />
                      )}
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
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
                    disabled={saving || uploading}
                    className="flex-1 bg-troh-primary text-white py-3 rounded-lg font-medium hover:bg-red-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {saving ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {isProduction ? 'Save Post' : 'Generate JSON'}
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
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                How It Works
              </h3>
              {isProduction ? (
                <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                  <li>Fill out the form above</li>
                  <li><strong>Drag & drop or click</strong> to upload an image</li>
                  <li>Click <strong>"Save Post"</strong></li>
                  <li>Post is saved instantly - no technical steps needed!</li>
                </ol>
              ) : (
                <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                  <li>Fill out the form</li>
                  <li>Upload image (or paste URL)</li>
                  <li>Click <strong>"Generate JSON"</strong></li>
                  <li>Copy the JSON output</li>
                  <li>Give it to your developer to add</li>
                </ol>
              )}
            </div>
          </div>

          {/* Right Column - Preview & JSON */}
          <div className="space-y-6">
            {/* JSON Output (Development Mode) */}
            {!isProduction && showJson && editingPost && (
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
                {formData.image || imagePreview ? (
                  <div className="h-48 bg-gray-100">
                    <img
                      src={imagePreview || formData.image}
                      alt={formData.title}
                      className="w-full h-full object-cover"
                      onError={() => setImagePreview(null)}
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
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {posts.map((post) => (
                  <div
                    key={post.slug}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt="" 
                          className="w-10 h-10 object-cover rounded"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      )}
                      <div>
                        <p className="font-medium text-troh-dark">{post.title}</p>
                        <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="p-2 text-gray-500 hover:text-troh-primary transition-colors"
                      title="View post"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
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
