import { prisma } from "@/lib/prismaClient";
import { editPostAction } from "@/actions";

const EditPostPage = async ({ params }) => {
  const { id } = params;

  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  return (
    <section className="max-w-xl mx-auto">
      <form
        action={editPostAction}
        className="bg-white rounded-xl shadow-md p-8 border border-slate-200 flex flex-col gap-6"
        aria-label="Edit post"
      >
        <input type="hidden" name="id" value={id} />
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Edit Post
        </h2>
        <input
          type="text"
          name="title"
          defaultValue={post.title}
          placeholder="Title"
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 text-base bg-slate-50 placeholder-slate-400"
          required
        />
        <textarea
          name="content"
          defaultValue={post.content}
          placeholder="Content"
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 text-base bg-slate-50 placeholder-slate-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default EditPostPage;