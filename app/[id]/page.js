import { prisma } from "@/lib/prismaClient";
import { deletePostAction } from "@/actions";
import Link from "next/link";

const postDetails = async ({ params }) => {
  const { id } = params;

  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include:{
      author: true
    }
  });

  if (!post) {
    return (
      <div className="text-center text-xl text-slate-700 py-16">
        Post not found
      </div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-slate-900 mb-2">
          {post.title}
        </h1>
        <p className="text-slate-700 text-lg leading-relaxed mb-4">
          {post.content}
        </p>
        <p className="text-slate-500 text-base">
          Created At: {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p className="text-slate-500 text-base mb-6">
          Author: {post.author.name}
        </p>
        <div className="flex gap-4">
          <Link href={`/${id}/edit`} aria-label="Edit Post">
            <button>Edit Post</button>
          </Link>
          <form action={deletePostAction} className="inline">
            <input type="hidden" name="id" value={id} />
            <button type="submit" aria-label="Delete Post">
              Delete Post
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default postDetails;
