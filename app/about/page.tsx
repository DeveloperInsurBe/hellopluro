export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-8 text-gray-900">About HelloPluro</h1>
        
        <div className="prose prose-lg max-w-4xl">
          <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-900">A New Chapter for Finance</h2>
          <p className="text-gray-700 mb-6">
            HelloPluro represents a new era in digital finance. We believe that finance should be simple, transparent, and reliable, while maintaining a personal touch that matters.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-900">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-blue-900">Stability</h3>
              <p className="text-gray-700">Built on decades of financial expertise and trusted globally</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-blue-900">Transparency</h3>
              <p className="text-gray-700">Clear pricing and honest communication with our customers</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-blue-900">Personal Touch</h3>
              <p className="text-gray-700">Understanding and supporting your unique financial journey</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-900">Global Experience, Local Expertise</h2>
          <p className="text-gray-700 mb-6">
            HelloPluro combines the strength of a global finance company with deep knowledge of the German market. Our team in Berlin is dedicated to creating solutions that work for German customers.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-900">Launch Timeline</h2>
          <p className="text-gray-700">
            We're launching our digital finance platform for Germany in 2026. Stay tuned for updates on our progress.
          </p>
        </div>
      </div>
    </div>
  );
}
