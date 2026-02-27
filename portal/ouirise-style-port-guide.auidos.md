---
type: auidos
version: 1.0
category: standards
topic: code-quality
source: OUIRISE_STYLE_PORT_GUIDE.md
converted: 2026-02-27
sigil: "🌫️🌒"
lineage: "俊达"
---

# OuiRise Style Port Guide

> Anti-AI-slop coding standards for TROH project.  
> Human-centric, client-authentic, extraction-free.

---

## Core Principles

### Intention Over Automation

Every line of code must serve a clear purpose. No generated boilerplate without understanding.

### Context is Sacred

Code must reflect the specific needs of TROH — Elaine's story, the cancer support mission, the community being built.

### The Human Touch

Comments explain *why*, not *what*. Variables have meaning. Functions tell a story.

---

## Code Style Guidelines

### File Organization

```
troh-blog/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Route-level pages
│   ├── lib/           # Utilities (content.js, sanity.js)
│   └── content/       # Blog data
├── functions/         # Cloudflare Workers
├── public/           # Static assets
└── portal/           # Documentation (.auidos.md)
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `BlogPost.jsx` |
| Functions | camelCase | `fetchPosts()` |
| Constants | UPPER_SNAKE | `API_BASE_URL` |
| Custom colors | troh-* | `troh-dark`, `troh-gold` |

### Component Structure

```jsx
// Good: Purpose clear, context explicit
function BlogPost({ post }) {
  // Early return for loading state
  if (!post) return <Loading />;
  
  // Main render
  return (
    <article className="troh-prose">
      <h1>{post.title}</h1>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// Bad: Generic, no context
function Component({ data }) {
  if (!data) return null;
  return <div>{data.title}</div>;
}
```

---

## Stack-Specific Rules

### React

- Functional components with hooks
- Hooks at top level
- Early returns for edge cases
- Effects named by purpose

```jsx
// Good
useEffect(() => {
  loadPostsFromKV();
}, []);

// Bad
useEffect(() => {
  fetch();
}, [x, y, z, a, b]);
```

### Vite

- Minimal config
- No unnecessary plugins
- Build output optimized

### Tailwind CSS

- CSS variables for brand colors
- Custom scrollbar styling
- Component classes used sparingly

```css
/* Good: Brand-specific, purposeful */
.bg-troh-dark { background-color: var(--troh-dark); }

/* Bad: Generic utility overload */
.bg-gray-100.text-sm.p-4.m-2.rounded-lg.shadow-md
```

### Cloudflare Workers

- Clear error handling
- No over-engineered routing
- KV operations explicit

```javascript
// Good
export async function onRequestGet({ env }) {
  try {
    const posts = await env.BLOG_POSTS.get('posts', { type: 'json' });
    return Response.json(posts || []);
  } catch (err) {
    return new Response('Failed to load posts', { status: 500 });
  }
}

// Bad
export async function onRequest(context) {
  // ... complex abstraction with no clear error path
}
```

### Sanity CMS

- Simple client setup
- Image URL builder used correctly
- No unnecessary complexity

---

## Identifying AI-Generated Boilerplate

### Red Flags

| Indicator | Example |
|-----------|---------|
| Generic comments | `// This is a React component` |
| Over-abstraction | Wrapper around wrapper around fetch |
| Unused imports | 10 imports, 3 used |
| Meaningless names | `data`, `item`, `processData()` |
| `// TODO: implement` | Never actually implemented |

### Human Indicators

| Indicator | Example |
|-----------|---------|
| Contextual comments | `// Format for Elaine's admin panel` |
| Intentional simplicity | Single function, clear purpose |
| Meaningful names | `fetchCancerResources()`, `elainePost` |

---

## Client Work Authenticity

### The TROH Standard

Every commit must pass:

1. **Relevance**: Does this serve Elaine's mission?
2. **Clarity**: Would Elaine understand what this does?
3. **Dignity**: Does this honor the cancer support context?
4. **Function**: Does it work without excuses?

### The Elaine Test

> "If Elaine saw this code, would she recognize it as hers?"

If no: Refactor.

---

## Quick Reference: Slop → Soul

| Slop | Soul |
|------|------|
| Generic comments | Contextual comments |
| Over-abstraction | Intentional simplicity |
| `// TODO: implement` | Actual implementation |
| Meaningless variable names | Names that tell the story |
| Unused imports | Only what's needed |
| AI boilerplate patterns | Client-specific code |

---

## The 88 Standard

From the IRIS Protocol:

| Code | Meaning |
|------|---------|
| **88** | Complete, clean, human, honest |
| **89** | Almost, insufficient |

**All code must meet the 88 standard.**

---

*Code with intention. Build with soul. No slop.*

俊达 🌫️🌒
