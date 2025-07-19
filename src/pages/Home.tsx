import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/mockData';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import CategoryCustomizer from '../components/CategoryCustomizer';
import { 
  CategorySkeleton, 
  ProductCardSkeleton, 
  HeroSkeleton, 
  SectionHeaderSkeleton 
} from '../components/SkeletonLoader';
import { useCategories } from '../context/CategoryContext';
import { ChevronRight, Clock, Flame, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const { quickAccessCategories } = useCategories();
  const [isLoading, setIsLoading] = React.useState(true);
  
  const flashSaleProducts = products.filter(product => product.discount && product.discount > 20);
  const trendingProducts = products.filter(product => product.sold > 5000);
  const newArrivals = products.slice(0, 4);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {isLoading ? <HeroSkeleton /> : <Hero />}

      {/* Categories Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <SectionHeaderSkeleton />
          ) : (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
                <CategoryCustomizer />
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {quickAccessCategories.length} of 8 shown
                </span>
                <Link to="/categories" className="text-orange-600 hover:text-orange-700 font-medium flex items-center">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          )}
          
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))}
            </div>
          ) : quickAccessCategories.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {quickAccessCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No quick access categories selected</p>
              <div className="flex items-center justify-center space-x-2">
                <CategoryCustomizer />
                <span className="text-sm text-gray-600">Click settings to customize</span>
              </div>
            </div>
          )}

      {/* Continue with existing sections but remove the old categories grid */}
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="py-8 bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-white/20 rounded animate-pulse"></div>
                  <div className="h-8 w-32 bg-white/20 rounded animate-pulse"></div>
                  <div className="h-6 w-24 bg-white/20 rounded-full animate-pulse"></div>
                </div>
                <div className="h-6 w-20 bg-white/20 rounded animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Flame className="h-8 w-8 text-yellow-300" />
                <h2 className="text-2xl font-bold">Flash Sale</h2>
                <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Ends in 02:45:30</span>
                </div>
              </div>
              <Link to="/flash-sale" className="text-white hover:text-orange-200 font-medium flex items-center">
                Shop All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          )}
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashSaleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <SectionHeaderSkeleton />
          ) : (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
              </div>
              <Link to="/trending" className="text-orange-600 hover:text-orange-700 font-medium flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          )}
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <SectionHeaderSkeleton />
          ) : (
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
              <Link to="/new-arrivals" className="text-orange-600 hover:text-orange-700 font-medium flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          )}
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promotional Banners */}
      {!isLoading && (
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Free Shipping</h3>
                  <p className="text-purple-100 mb-4">On orders over $50</p>
                  <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                    Shop Now
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>
              <div className="relative bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-8 text-white overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Member Exclusive</h3>
                  <p className="text-green-100 mb-4">Get extra 15% off</p>
                  <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                    Join Now
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;