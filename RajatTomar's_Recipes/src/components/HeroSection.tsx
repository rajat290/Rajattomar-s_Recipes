
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen max-h-[800px] overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Delicious food on a table"
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isLoaded ? 'scale-100 filter-none' : 'scale-105 blur-sm'
          }`}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className={`max-w-xl text-white transition-all duration-1000 delay-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="inline-block bg-food-orange px-4 py-1 rounded text-sm uppercase tracking-wider font-medium mb-4">
            Fresh & Delicious
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Simple, Tasty Recipes for Everyday Cooking
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Discover recipes that are easy to make and full of flavor for any occasion
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/recipes" className="btn btn-primary">
              Browse Recipes
            </Link>
            <Link to="/about" className="btn btn-outline border-white text-white hover:bg-white hover:text-food-dark-gray">
              About Us
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm animate-pulse transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex flex-col items-center">
          <span className="mb-2">Scroll Down</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L18 13M12 19L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
