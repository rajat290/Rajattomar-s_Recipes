import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { recipes } from '@/lib/data';

const FeaturedRecipeOfTheDay = () => {
  // Select a random recipe to feature (in a real app, this would be selected strategically)
  const randomIndex = Math.floor(Math.random() * recipes.length);
  const featuredRecipe = recipes[randomIndex];

  return (
    <section className="py-16 px-4 bg-food-green/5">
      <div className="container mx-auto">
        <div className="mb-10 text-center">
          <span className="inline-block text-food-green text-sm uppercase tracking-wider font-medium mb-2">
            Something Special
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold">Recipe of the Day</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative overflow-hidden rounded-xl">
            <img 
              src={featuredRecipe.image} 
              alt={featuredRecipe.title}
              className="w-full h-auto object-cover transition-all duration-300 hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-white px-3 py-1 text-xs uppercase tracking-wider font-medium text-food-dark-gray">
                {featuredRecipe.category}
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading text-2xl md:text-3xl font-semibold mb-4">{featuredRecipe.title}</h3>
            <div className="flex items-center mb-6 text-food-medium-gray">
              <Clock size={18} className="mr-2" />
              <span>{featuredRecipe.prepTime}</span>
            </div>
            <p className="text-food-medium-gray mb-6">
              {featuredRecipe.description || 'This delicious recipe is our featured dish of the day. Perfect for any occasion, it combines fresh ingredients with a unique approach to create a memorable meal.'}
            </p>
            <Link to={`/recipe/${featuredRecipe.id}`} className="btn btn-primary">
              View Recipe
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipeOfTheDay;
