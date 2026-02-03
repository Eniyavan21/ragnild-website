# ragnild-web

A Next.js project for Ragnild.

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
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
```

### 3. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm start`: Starts the production server.
- `npm run lint`: Runs the linter.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Strapi CMS](https://strapi.io/) - Headless CMS for blog content
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lottie](https://airbnb.design/lottie/) - Animation library
- [EmailJS](https://www.emailjs.com/) - Email service

## Blog Content Management

The blog content is managed through Strapi CMS. The blog posts are fetched from the Strapi API at runtime.

### Running Strapi CMS (Optional)

If you want to manage blog content locally:

1. Navigate to the CMS directory:
```bash
cd cms
```

2. Install dependencies:
```bash
npm install
```

3. Start Strapi:
```bash
npm run develop
```

4. Access the admin panel at [http://localhost:1337/admin](http://localhost:1337/admin)

### Blog API

The application fetches blog posts from: `http://localhost:1337/api/blogs`

Blog posts support:
- Rich text content
- Custom slugs for URLs
- Publication dates
- Auto-generated excerpts
- Auto-calculated read times
