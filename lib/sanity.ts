import { createClient } from 'next-sanity'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-04',
  useCdn: process.env.NODE_ENV === 'production', // CDN for production, fresh data for dev
})

// Image URL builder
const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// GROQ Queries
export const BLOG_POSTS_QUERY = `*[_type == "blog"] | order(publishedate desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  coverimage,
  publishedate
}`

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  coverimage,
  publishedate
}`
