import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const initialAuthors = [
  { email: 'author1@example.com', name: 'Author One' },
  { email: 'author2@example.com', name: 'Author Two' },
  { email: 'author3@example.com', name: 'Author Three' },
  { email: 'author4@example.com', name: 'Author Four' },
  { email: 'author5@example.com', name: 'Author Five' },
]

const initialPost = [
  {
    title: 'Welcome to the Simple Blog',
    slug: 'welcome-to-the-simple-blog',
    content: 'This is your first post on the minimalist Next.js blog!',
    published: true,
    authorEmail: 'author1@example.com',
  },
  {
    title: 'Getting Started with Next.js',
    slug: 'getting-started-with-next-js',
    content: 'Learn how to build modern web apps with Next.js and Prisma.',
    published: true,
    authorEmail: 'author2@example.com',
  },
  {
    title: 'Why Tailwind CSS Rocks',
    slug: 'why-tailwind-css-rocks',
    content: 'Discover the power of utility-first CSS for rapid UI development.',
    published: true,
    authorEmail: 'author3@example.com',
  },
  {
    title: 'Accessible & Responsive Design',
    slug: 'accessible-and-responsive-design',
    content: 'Best practices for building accessible and responsive UIs.',
    published: true,
    authorEmail: 'author4@example.com',
  },
  {
    title: 'Deploying Your Next.js App',
    slug: 'deploying-your-next-js-app',
    content: 'A quick guide to deploying your Next.js app to production.',
    published: true,
    authorEmail: 'author5@example.com',
  },
  {
    title: 'Understanding Prisma Relations',
    slug: 'understanding-prisma-relations',
    content: 'A deep dive into relational data modeling with Prisma.',
    published: true,
    authorEmail: 'author1@example.com',
  },
  {
    title: 'Next.js Routing Explained',
    slug: 'next-js-routing-explained',
    content: 'How to use file-based routing in Next.js for dynamic apps.',
    published: true,
    authorEmail: 'author2@example.com',
  },
  {
    title: 'Styling with Tailwind CSS',
    slug: 'styling-with-tailwind-css',
    content: 'Tips and tricks for beautiful UIs using Tailwind CSS.',
    published: true,
    authorEmail: 'author3@example.com',
  },
  {
    title: 'Optimizing Performance in Next.js',
    slug: 'optimizing-performance-in-next-js',
    content: 'Strategies to make your Next.js apps blazing fast.',
    published: true,
    authorEmail: 'author4@example.com',
  },
  {
    title: 'Deploying with Vercel',
    slug: 'deploying-with-vercel',
    content: 'Step-by-step guide to deploying your Next.js app on Vercel.',
    published: true,
    authorEmail: 'author5@example.com',
  },
]

async function main() {
  // 1. Upsert users and store their generated IDs
  const authorMap = {}
  for (const author of initialAuthors) {
    const upserted = await prisma.user.upsert({
      where: { email: author.email },
      update: {},
      create: {
        email: author.email,
        name: author.name,
      },
    })
    authorMap[author.email] = upserted.id
  }

  // 2. Create posts and use correct authorId
  for (const post of initialPost) {
    const authorId = authorMap[post.authorEmail]
    await prisma.post.create({
      data: {
        title: post.title,
        slug: post.slug,
        content: post.content,
        published: post.published,
        authorId: authorId, // ✅ Connect via ID
      },
    })
  }

  console.log('✅ Seeded authors and posts successfully!')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
