import { prisma } from "@/lib/prismaClient";
import Link from "next/link";
import { headers } from "next/headers";

export default async function Home() {
  // ✅ Get full request URL
  const headersList = headers();
  const fullUrl = headersList.get("x-url") || "http://localhost:3000";
  const url = new URL(fullUrl);
  const authorEmail = url.searchParams.get("author") || ("all");
  

  // ✅ Query user and posts if email is provided

  let user = {};

  if (authorEmail && authorEmail.includes("all")) {
    // Show all posts
    const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
    user.posts = posts;
  } else if (authorEmail) {
    // Show posts for a specific author
    user = await prisma.user.findUnique({
      where: { email: authorEmail },
      include: { posts: { orderBy: { createdAt: "desc" } } },
    }) || {};
  } else {
    user.posts = [];
  }

  

  return (
    <section className="w-full flex flex-col gap-8 items-start">
      <p>Currently filtered author: <strong>{user.name || "All"}</strong></p>

      {/* Posts List */}
      <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {user?.posts?.length > 0 ? (
          user.posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex flex-col gap-3"
            >
              <h2 className="text-2xl font-semibold text-slate-900 mb-2 truncate">
                <Link
                  href={`/${post.id}`}
                  className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  aria-label={`View post: ${post.title}`}
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-slate-700 text-base leading-relaxed line-clamp-3">
                {post.content}
              </p>
              <Link
                href={`/${post.id}`}
                className="mt-auto max-w-fit text-blue-600 font-medium hover:underline focus:outline-none transition-all"
                aria-label={`Read more about ${post.title}`}
              >
                Read More
              </Link>
            </div>
          ))
        ) : (
          <p className="text-slate-500 text-lg">No posts found for selected author.</p>
        )}
      </div>
    </section>
  );
}
