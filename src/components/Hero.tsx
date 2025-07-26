import React from 'react';

const Hero: React.FC = () => {

  return (
            <section className="relative bg-[#0A2647] text-white overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Flash Sale
                <span className="block text-yellow-300">Up to 90% Off</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80">
                Discover amazing deals on millions of products. Limited time offers you can't miss!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#FF6B6B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0A2647] transition-colors shadow-lg">
                  Shop Flash Sale
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#0A2647] transition-colors">
                  View All Deals
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Shopping deals"
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-2xl"
              />
              <div className="absolute top-4 right-4 bg-[#FF6B6B] text-white px-4 py-2 rounded-full font-bold text-lg">
                90% OFF
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;