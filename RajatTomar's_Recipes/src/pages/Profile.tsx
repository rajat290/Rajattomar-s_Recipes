
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, Bookmark, Heart, LogOut } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { getUserPreferences } from '@/services/preferences';
import { getRecipeById } from '@/services/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user, navigate]);
  
  if (!user) {
    return null; // Will redirect to sign-in
  }
  
  const { data: preferences, isLoading: preferencesLoading } = useQuery({
    queryKey: ['userPreferences', user.id],
    queryFn: () => getUserPreferences(user.id),
    staleTime: 5 * 60 * 1000,
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Profile Header */}
            <div className="p-8 bg-food-beige">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-food-green flex items-center justify-center text-white text-3xl font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <h1 className="font-heading text-2xl font-semibold">
                    {user.name}
                  </h1>
                  <p className="text-food-medium-gray mb-4">
                    {user.email}
                  </p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <Link to="/preferences">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Settings size={16} />
                        <span>Preferences</span>
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2 text-red-600 hover:text-red-700"
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Profile Tabs */}
            <Tabs defaultValue="saved" className="p-6">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="saved" className="text-base">
                  <Bookmark size={16} className="mr-2" />
                  Saved Recipes
                </TabsTrigger>
                <TabsTrigger value="favorites" className="text-base">
                  <Heart size={16} className="mr-2" />
                  Favorites
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="saved">
                {preferencesLoading ? (
                  <div className="text-center p-8">
                    <p className="text-food-medium-gray">Loading saved recipes...</p>
                  </div>
                ) : (
                  <RecipeList 
                    recipeIds={preferences?.savedRecipes || []} 
                    emptyMessage="You haven't saved any recipes yet." 
                  />
                )}
              </TabsContent>
              
              <TabsContent value="favorites">
                {preferencesLoading ? (
                  <div className="text-center p-8">
                    <p className="text-food-medium-gray">Loading favorite recipes...</p>
                  </div>
                ) : (
                  <RecipeList 
                    recipeIds={preferences?.favoriteRecipes || []} 
                    emptyMessage="You haven't added any favorite recipes yet." 
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface RecipeListProps {
  recipeIds: number[];
  emptyMessage: string;
}

const RecipeList = ({ recipeIds, emptyMessage }: RecipeListProps) => {
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
            <h3 className="font-heading font-medium text-lg mb-2 group-hover:text-food-green transition-colors">
              <Link to={`/external-recipe/${recipe.id}`}>
                {recipe.title}
              </Link>
            </h3>
            
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

export default Profile;
