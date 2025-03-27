import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { recipes } from '@/lib/data';
import RecipeCard from '@/components/RecipeCard';

const SeasonalCollection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Get current season (simplified)
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return "Spring";
    if (month >= 5 && month <= 7) return "Summer";
    if (month >= 8 && month <= 10) return "Fall";
    return "Winter";
  };
  
  const season = getCurrentSeason();
  
  // Filter recipes by season (in a real app, this would use real tags)
  let seasonalRecipes;
  switch(season) {
    case "Spring":
      seasonalRecipes = recipes.filter(recipe => 
        recipe.category === "Salads" || 
        recipe.category === "Vegetables" || 
        recipe.id.includes("spring")
      ).slice(0, 3);
      break;
    case "Summer":
      seasonalRecipes = recipes.filter(recipe => 
        recipe.category === "Grilled" || 
        recipe.category === "Salads" || 
        recipe.id.includes("summer")
      ).slice(0, 3);
      break;
    case "Fall":
      seasonalRecipes = recipes.filter(recipe => 
        recipe.category === "Soups" || 
        recipe.category === "Baking" || 
        recipe.id.includes("fall")
      ).slice(0, 3);
      break;
    case "Winter":
      seasonalRecipes = recipes.filter(recipe => 
        recipe.category === "Soups" || 
        recipe.category === "Comfort Food" || 
        recipe.id.includes("winter")
      ).slice(0, 3);
      break;
    default:
      seasonalRecipes = recipes.slice(6, 9);
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="inline-block text-food-green text-sm uppercase tracking-wider font-medium mb-2">
              Seasonal Favorites
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold">{season} Collection</h2>
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
          {seasonalRecipes.map((recipe, index) => (
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
  );
};

export default SeasonalCollection;