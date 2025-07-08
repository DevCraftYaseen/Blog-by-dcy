"use client"
import { addPost } from "@/actions";
import { useActionState } from "react";

export default function NewPostPage() {
  const [formState, formAction] = useActionState(addPost, {});
  return (
    <section className="max-w-xl mx-auto mt-10">
      <form
        action={formAction}
        className="bg-white rounded-xl shadow-md p-8 border border-slate-200 flex flex-col gap-6"
        aria-label="Add new post"
      >
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Add a New Post</h2>
        {formState?.error &&
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="font-bold">Error: </span>
          {formState.error}
        </div>}
        <input
          type="text"
          name="title"
          placeholder="Enter title of post"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 text-base bg-slate-50 placeholder-slate-400"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Enter Author's email"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 text-base bg-slate-50 placeholder-slate-400"
          required
        />
        <textarea
          rows={5}
          name="content"
          placeholder="Enter content of post"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 text-base bg-slate-50 placeholder-slate-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-sm border border-blue-600 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
        >
          Add Post
        </button>
      </form>
    </section>
  );
}
