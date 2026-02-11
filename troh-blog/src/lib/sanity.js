import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Real Sanity client
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  useCdn: true,
})

// Image URL builder
const builder = imageUrlBuilder(client)
export function urlFor(source) {
  return builder.image(source)
}

// GROQ Queries
export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  author->{name, image},
  categories[]->{title, slug}
}`

export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  author->{name, image},
  categories[]->{title, slug},
  body
}`

export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description
}`

export const postsByCategoryQuery = `*[_type == "post" && $category in categories[]->slug.current] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  author->{name, image},
  categories[]->{title, slug}
}`
