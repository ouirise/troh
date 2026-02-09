# TroH Blog - Vite + Sanity CMS

Blog platform for Tayloring Rays of Hope. Built with Vite, React, and Sanity CMS.

## Stack

- **Frontend**: Vite + React + React Router
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io
- **Icons**: Lucide React

## Setup

1. **Install dependencies**:
   ```bash
   cd troh-blog
   npm install
   ```

2. **Environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Sanity credentials
   ```

3. **Run dev server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Sanity Schema

Required content types:

```javascript
// post
{
  _type: 'post',
  title: 'string',
  slug: { current: 'string' },
  excerpt: 'text',
  body: 'array', // Portable Text
  mainImage: 'image',
  publishedAt: 'datetime',
  author: { _type: 'reference', to: 'author' },
  categories: [{ _type: 'reference', to: 'category' }]
}

// author
{
  _type: 'author',
  name: 'string',
  image: 'image',
  bio: 'text'
}

// category
{
  _type: 'category',
  title: 'string',
  slug: { current: 'string' },
  description: 'text'
}
```

## Deployment

1. **Cloudflare Pages**:
   - Build command: `npm run build`
   - Build output: `dist`
   - Root directory: `troh-blog`

2. **Environment variables in CF**:
   - Add all `VITE_` prefixed env vars

## Structure

```
troh-blog/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Route pages
│   ├── lib/           # Sanity client
│   ├── App.jsx        # Routes
│   └── main.jsx       # Entry
├── public/            # Static assets
└── index.html
```

🌫️🌒 67 Protocol Active
