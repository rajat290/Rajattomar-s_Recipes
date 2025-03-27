import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import RecipeCard from '@/components/RecipeCard';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import FeaturedRecipeOfTheDay from '@/components/FeaturedRecipeOfTheDay';
import SeasonalCollection from '@/components/SeasonalCollection';
import BlogPostsSection from '@/components/BlogPostsSection';
import CookingTips from '@/components/CookingTips';
import PopularTags from '@/components/PopularTags';
import VideoSection from '@/components/VideoSection';
import EventCountdown from '@/components/EventCountdown';
import { recipes, categories } from '@/lib/data';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Get featured recipes (first 6)
  const featuredRecipes = recipes.slice(0, 6);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow page-transition">
        <HeroSection />
        
        {/* Featured Recipe of the Day */}
        <FeaturedRecipeOfTheDay />
        
        {/* Featured Recipes Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <span className="inline-block text-food-green text-sm uppercase tracking-wider font-medium mb-2">
                  Delicious Options
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-semibold">Featured Recipes</h2>
              </div>
              <Link 
                to="/recipes" 
                className="flex items-center mt-4 md:mt-0 text-food-green hover:text-food-light-green transition-colors"
              >
                View All Recipes
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
            
            <div className="recipe-grid">
              {featuredRecipes.map((recipe, index) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  category={recipe.category}
                  prepTime={recipe.prepTime}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Seasonal Recipe Collection */}
        <SeasonalCollection />
        
        {/* Popular Tags & Trends */}
        <PopularTags />
        
        {/* Categories Section */}
        <section className="py-16 px-4 bg-food-beige">
          <div className="container mx-auto text-center mb-10">
            <span className="inline-block text-food-green text-sm uppercase tracking-wider font-medium mb-2">
              Browse By
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold">Recipe Categories</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <Link 
                key={category.id}
                to={`/category/${category.id}`}
                className={`bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 transform ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="font-heading text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-food-medium-gray text-sm">{category.count} Recipes</p>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Cooking Tips Section */}
        <CookingTips />
        
        {/* Video Demonstrations Section */}
        <VideoSection />
        
        {/* Blog Posts Section */}
        <BlogPostsSection />
        
        {/* Event Countdown */}
        <EventCountdown />
        
        {/* About Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`relative transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}>
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" 
                  alt="Beautifully plated food" 
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="font-heading text-2xl font-semibold text-food-green">100+</p>
                  <p className="text-food-medium-gray">Recipes</p>
                </div>
              </div>
              
              <div className={`transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>
                <span className="inline-block text-food-green text-sm uppercase tracking-wider font-medium mb-2">
                  Our Story
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-6">
                  Food that brings people together
                </h2>
                <p className="text-food-medium-gray mb-6">
                  Pinch of Yum is a food blog with hundreds of simple, healthy recipes and food blogging resources. We believe that good food is meant to be shared, and we're on a mission to help you bring delicious meals to your table.
                </p>
                <p className="text-food-medium-gray mb-8">
                  Our recipes are approachable for home cooks of all skill levels, using ingredients you can find at your local grocery store.
                </p>
                <Link to="/about" className="btn btn-primary">
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;