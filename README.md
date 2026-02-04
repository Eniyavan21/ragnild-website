# ragnild-web

A Next.js project for Ragnild with Sanity CMS integration.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Version 18 or later recommended)
- npm, yarn, pnpm, or bun

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ragnild-web
```

### 2. Environment Setup

Copy the example environment file to create your local environment file:

```bash
cp .env.example .env.local
```

Update the `.env.local` file with your configuration:

```env
NEXT_PUBLIC_LINKEDIN_URL=your_linkedin_url
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=iyuqyxv5
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-04
```

### 3. Install Dependencies

**Main Application:**
```bash
npm install
```

**Sanity Studio:**
```bash
cd sanity
npm install
cd ..
```

### 4. Run the Development Server

**Start Next.js (Terminal 1):**
```bash
npm run dev
```

**Start Sanity Studio (Terminal 2):**
```bash
cd sanity
npm run dev
```

- Next.js App: [http://localhost:3000](http://localhost:3000)
- Sanity Studio: [http://localhost:3333](http://localhost:3333)

## Scripts

### Main Application
- `npm run dev`: Starts the Next.js development server
- `npm run build`: Builds the application for production
- `npm start`: Starts the production server
- `npm run lint`: Runs the linter

### Sanity Studio
- `cd sanity && npm run dev`: Starts Sanity Studio
- `cd sanity && npm run build`: Builds Sanity Studio
- `cd sanity && npx sanity deploy`: Deploys Studio to Sanity hosting

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling
- [Sanity CMS](https://sanity.io/) - Headless CMS for blog content
- [next-sanity](https://github.com/sanity-io/next-sanity) - Sanity integration for Next.js
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lottie](https://airbnb.design/lottie/) - Animation library
- [EmailJS](https://www.emailjs.com/) - Email service
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering

## Blog Content Management

The blog content is managed through **Sanity Studio**. Blog posts are fetched from Sanity's Content Lake via their CDN.

### Sanity Studio

Access Sanity Studio to manage content:

**Local Development:**
```bash
cd sanity
npm run dev
```
Open [http://localhost:3333](http://localhost:3333)

**Schema Management:**
Blog schema is defined in `sanity/schemaTypes/blog.ts`

**Deploy Schema Changes:**
```bash
cd sanity
npx sanity schema deploy
```

### Content Structure

**Blog Post Schema:**
- `title` (string): Post title
- `slug` (slug): URL-friendly identifier (auto-generated from title)
- `description` (array of blocks): Rich content using Portable Text
- `coverimage` (image): Featured image with automatic optimization
- `publishedate` (date): Publication date

### Blog API

The application uses `next-sanity` to fetch blog posts from:
- Project ID: `iyuqyxv5`
- Dataset: `production`
- API Version: `2025-02-04`

**Configuration:** `lib/sanity.ts`

**Blog Queries:** GROQ queries defined in `lib/sanity.ts`

**Data Layer:** `lib/blog.ts` handles data fetching and transformation

Blog posts support:
- Rich text content with Portable Text
- Custom slugs for SEO-friendly URLs
- Publication dates for sorting
- Auto-generated excerpts
- Auto-calculated read times
- Optimized images via Sanity CDN

## Project Structure

```
ragnild-web/
├── app/                      # Next.js App Router pages
│   ├── blog/                # Blog pages
│   │   ├── [slug]/         # Individual blog post page
│   │   └── page.tsx        # Blog listing page
│   └── ...
├── components/              # React components
├── lib/                     # Utility functions
│   ├── sanity.ts           # Sanity client configuration
│   └── blog.ts             # Blog data layer
├── sanity/                  # Sanity Studio
│   ├── schemaTypes/        # Content schemas
│   │   └── blog.ts         # Blog schema
│   └── sanity.config.ts    # Studio configuration
├── public/                  # Static assets
└── ...
```

## Deployment

### Deploy Next.js App
Follow standard Next.js deployment (Vercel, Netlify, etc.)

### Deploy Sanity Studio
```bash
cd sanity
npx sanity deploy
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [next-sanity Guide](https://github.com/sanity-io/next-sanity)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
