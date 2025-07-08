// app/_not-found/page.js
'use client';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6">
      <div>
        <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 text-lg">This page does not exist.</p>
      </div>
    </div>
  );
}
