// MOCK MODE - No Sanity connection needed
export const client = {
  fetch: (query, params) => Promise.resolve(mockPosts)
}

export function urlFor(source) {
  return { url: () => 'https://via.placeholder.com/600x400/1a1a2e/e94560?text=TROH' }
}

// Mock data for development
const mockPosts = [
  {
    _id: '1',
    title: "Finding Hope in the Darkest Moments",
    slug: { current: "finding-hope" },
    excerpt: "When I was diagnosed, I thought my world was ending. But I found strength I never knew I had.",
    publishedAt: "2024-01-15T10:00:00Z",
    mainImage: null,
    author: { name: "Sarah Mitchell", image: null },
    categories: [{ title: "Survivor Stories", slug: { current: "stories" } }],
    body: [
      { _type: 'block', children: [{ _type: 'span', text: "This is a sample blog post for development. When you connect Sanity, real content will appear here." }] }
    ]
  },
  {
    _id: '2',
    title: "Supporting Your Loved One Through Treatment",
    slug: { current: "supporting-loved-ones" },
    excerpt: "Caregiving is hard. Here are practical tips from those who've walked this path.",
    publishedAt: "2024-01-10T10:00:00Z",
    mainImage: null,
    author: { name: "James Thompson", image: null },
    categories: [{ title: "Caregiving", slug: { current: "caregiving" } }],
    body: [
      { _type: 'block', children: [{ _type: 'span', text: "Caregiving content will appear here once Sanity is connected." }] }
    ]
  },
  {
    _id: '3',
    title: "Nutrition During Chemotherapy",
    slug: { current: "nutrition-chemo" },
    excerpt: "What to eat when nothing tastes right. A practical guide for patients.",
    publishedAt: "2024-01-05T10:00:00Z",
    mainImage: null,
    author: { name: "Dr. Maria Garcia", image: null },
    categories: [{ title: "Resources", slug: { current: "resources" } }],
    body: [
      { _type: 'block', children: [{ _type: 'span', text: "Nutrition content placeholder." }] }
    ]
  }
]

export const postsQuery = ''
export const postQuery = ''
export const categoriesQuery = ''
export const postsByCategoryQuery = ''
