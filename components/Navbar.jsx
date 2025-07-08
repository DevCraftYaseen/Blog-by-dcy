// components/Navbar.jsx
"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { initialAuthors } from "@/Data";

function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedEmail = searchParams.get("author");

   const handleChange = (e) => {
    const email = e.target.value
    const newParams = new URLSearchParams(searchParams.toString())
    if (email) {
      newParams.set('author', email)
    } else {
      newParams.delete('author')
    }
    router.push(`/?${newParams.toString()}`)
  }

  // Prepare authors for the select dropdown
  const authors = initialAuthors;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200 shadow-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Simple Blog Home"
        >
          <span className="inline-block w-8 h-8 bg-blue-600 rounded-lg mr-2"></span>
          <span className="text-2xl font-semibold tracking-tight text-slate-900">
            Simple Blog
          </span>
        </Link>
        <ul className="flex items-center gap-8 text-base font-medium">
          <li className="flex items-center">
            <select
              onChange={handleChange}
              value={selectedEmail || ""}
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 hover:border-blue-400 transition-colors"
            >
              <option value="">All Authors</option>
              {authors.map((author) => (
                <option key={author.email} value={author.email}>
                  {author.name}
                </option>
              ))}
            </select>
          </li>
          <li>
            <Link
              href="/"
              className="hidden md:inline-block hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/newPost"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg border border-blue-600 font-semibold shadow-sm hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              + New Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
