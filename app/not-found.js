'use client';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-700 text-lg mb-2">Oops! No page found at this route.</p>
    </div>
  );
}
