export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6">
      <div>
        <h1 className="text-3xl font-semibold text-blue-600 mb-4">Loading...</h1>
        <p className="text-gray-600 text-lg">Fetching your content, please wait.</p>
      </div>
    </div>
  );
}
