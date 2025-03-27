
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { X, Bookmark, BookmarkCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getRecipeById } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { getUserPreferences } from '@/services/preferences';

interface RecipeListProps {
  recipeIds: number[];
  emptyMessage: string;
  onRemove: (recipeId: number) => void;
  listType: 'saved' | 'favorites';
}

const RecipeList = ({ recipeIds, emptyMessage, onRemove, listType }: RecipeListProps) => {
  const { user } = useAuth();
  
  // Get user preferences to check status of other recipes
  const { data: preferences } = useQuery({
    queryKey: ['userPreferences', user?.id],
    queryFn: () => user ? getUserPreferences(user.id) : null,
    staleTime: 60 * 1000, // 1 minute
    enabled: !!user,
  });
  
  // For each recipe ID, fetch the recipe data
  const recipeQueries = recipeIds.map(id => {
    return useQuery({
      queryKey: ['recipe', id],
      queryFn: () => getRecipeById(id),
      enabled: !!id,
      staleTime: 60 * 60 * 1000, // 1 hour
    });
  });
  
  // Check if any queries are loading
  const isLoading = recipeQueries.some(query => query.isLoading);
  
  // Collect all successful recipe data
  const recipes = recipeQueries
    .filter(query => query.data)
    .map(query => query.data);
  
  if (isLoading) {
    return (
      <div className="text-center p-8">
        <p className="text-food-medium-gray">Loading recipes...</p>
      </div>
    );
  }
  
  if (recipes.length === 0 && !isLoading) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-food-medium-gray">{emptyMessage}</p>
        <Link to="/search" className="text-food-green hover:underline mt-2 inline-block">
          Browse recipes
        </Link>
      </div>
    );
  }
  
  // Check if a recipe is saved or favorited
  const isRecipeSaved = (recipeId: number) => {
    return preferences?.savedRecipes?.includes(recipeId) || false;
  };
  
  const isRecipeFavorite = (recipeId: number) => {
    return preferences?.favoriteRecipes?.includes(recipeId) || false;
  };
  
  // Determine which toggle button to show based on list type
  const getToggleButton = (recipe: any) => {
    const recipeId = Number(recipe.id);
    
    if (listType === 'saved') {
      const isFavorite = isRecipeFavorite(recipeId);
      return (
        <Button 
          variant="ghost" 
          size="sm" 
          className={`text-food-medium-gray ${isFavorite ? 'text-red-500 hover:text-red-400' : 'hover:text-red-500'} p-1 h-auto`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove(recipeId);
          }}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={16} className={isFavorite ? "fill-current" : ""} />
        </Button>
      );
    } else {
      const isSaved = isRecipeSaved(recipeId);
      return (
        <Button 
          variant="ghost" 
          size="sm" 
          className={`text-food-medium-gray ${isSaved ? 'text-food-green hover:text-food-green/80' : 'hover:text-food-green'} p-1 h-auto`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove(recipeId);
          }}
          title={isSaved ? "Remove from saved" : "Save recipe"}
        >
          {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </Button>
      );
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map(recipe => (
        <div key={recipe.id} className="group rounded-lg overflow-hidden border border-gray-200">
          <div className="aspect-video overflow-hidden bg-gray-100">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-heading font-medium text-lg mb-2 group-hover:text-food-green transition-colors">
                <Link to={`/external-recipe/${recipe.id}`}>
                  {recipe.title}
                </Link>
              </h3>
              <div className="flex gap-1">
                {getToggleButton(recipe)}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-food-medium-gray hover:text-red-500 p-1 h-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemove(Number(recipe.id));
                  }}
                  title="Remove from this list"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between text-sm text-food-medium-gray">
              <span>
                {recipe.readyInMinutes} min
              </span>
              {recipe.diets && recipe.diets.length > 0 && (
                <span className="capitalize">
                  {recipe.diets[0]}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;