export default function Services() {
  const services = [
    {
      title: "Digital Accounts",
      description: "Easy-to-use accounts designed for modern finance"
    },
    {
      title: "Smart Payments",
      description: "Fast and secure payment solutions"
    },
    {
      title: "Financial Planning",
      description: "Tools to help you reach your financial goals"
    },
    {
      title: "24/7 Support",
      description: "Always here when you need help"
    },
    {
      title: "Investment Options",
      description: "Grow your wealth with our investment products"
    },
    {
      title: "Security First",
      description: "Industry-leading security to protect your money"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">Our Finance Services</h1>
        <p className="text-xl text-gray-600 mb-12">
          Discover what your finance can do with HelloPluro
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">{service.title}</h2>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-900 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-lg text-blue-100 mb-6">
            Join us as we launch HelloPluro in 2026 and transform your digital finance experience.
          </p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition">
            Stay Updated
          </button>
        </div>
      </div>
    </div>
  );
}
