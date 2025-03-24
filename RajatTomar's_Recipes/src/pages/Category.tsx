
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import RecipeCard from '@/components/RecipeCard';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { getRecipesByCategory, categories } from '@/lib/data';

const Category = () => {
  const { id } = useParams<{ id: string }>();
  const [categoryRecipes, setCategoryRecipes] = useState(getRecipesByCategory(id || ''));
  const [categoryInfo, setCategoryInfo] = useState(categories.find(c => c.id === id));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Update recipes when category changes
    setCategoryRecipes(getRecipesByCategory(id || ''));
    setCategoryInfo(categories.find(c => c.id === id));
    
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 page-transition">
        {/* Category Header */}
        <section className="bg-food-beige py-12 mb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 transition-all duration-700 ${
              isLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'
            }`}>
              {categoryInfo?.name || id?.charAt(0).toUpperCase() + id?.slice(1)} Recipes
            </h1>
            <p className={`text-food-medium-gray max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
            }`}>
              {categoryInfo?.name === 'Breakfast' && 'Start your day with these delicious breakfast recipes that are both satisfying and easy to make.'}
              {categoryInfo?.name === 'Lunch' && 'Quick and easy lunch recipes perfect for weekdays or leisurely weekend meals.'}
              {categoryInfo?.name === 'Dinner' && 'Comforting and flavorful dinner recipes for every occasion, from quick weeknight meals to special celebrations.'}
              {categoryInfo?.name === 'Desserts' && 'Indulge your sweet tooth with these irresistible dessert recipes that are worth saving room for.'}
              {categoryInfo?.name === 'Vegan' && 'Plant-based recipes that are full of flavor and perfect for vegans and non-vegans alike.'}
              {!categoryInfo && 'Explore our collection of recipes in this category, carefully crafted for delicious results every time.'}
            </p>
          </div>
        </section>
        
        {/* Recipe Grid */}
        <section className="container mx-auto px-4 mb-16">
          {categoryRecipes.length > 0 ? (
            <div className="recipe-grid">
              {categoryRecipes.map((recipe, index) => (
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
          ) : (
            <div className="text-center py-12">
              <h2 className="font-heading text-2xl font-semibold mb-4">No Recipes Found</h2>
              <p className="text-food-medium-gray">
                We couldn't find any recipes in this category. Please check back later!
              </p>
            </div>
          )}
        </section>
        
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Category;
