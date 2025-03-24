
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Users, Bookmark, BookmarkCheck, Heart, Share2, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getRecipeById } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { 
  addSavedRecipe, 
  addFavoriteRecipe, 
  getUserPreferences,
  removeSavedRecipe,
  removeFavoriteRecipe
} from '@/services/preferences';

const ExternalRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getRecipeById(parseInt(id));
        setRecipe(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to load recipe. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipe();
  }, [id]);
  
  // Load user preferences
  useEffect(() => {
    const loadUserPreferences = async () => {
      if (!user || !id) return;
      
      try {
        const preferences = await getUserPreferences(user.id);
        if (preferences) {
          const savedIds = preferences.savedRecipes || [];
          const favoriteIds = preferences.favoriteRecipes || [];
          
          setIsSaved(savedIds.includes(parseInt(id)));
          setIsFavorite(favoriteIds.includes(parseInt(id)));
        }
      } catch (error) {
        console.error('Error loading user preferences:', error);
      }
    };
    
    loadUserPreferences();
  }, [user, id]);
  
  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save recipes",
        variant: "destructive"
      });
      return;
    }
    
    if (!id) return;
    
    try {
      const recipeId = parseInt(id);
      
      if (isSaved) {
        await removeSavedRecipe(user.id, recipeId);
        setIsSaved(false);
        toast({
          title: "Recipe Removed",
          description: "This recipe has been removed from your saved recipes.",
        });
      } else {
        await addSavedRecipe(user.id, recipeId);
        setIsSaved(true);
        toast({
          title: "Recipe Saved",
          description: "This recipe has been added to your saved recipes.",
        });
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast({
        title: "Error",
        description: "Failed to update saved recipes",
        variant: "destructive",
      });
    }
  };
  
  const handleFavorite = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to favorite recipes",
        variant: "destructive"
      });
      return;
    }
    
    if (!id) return;
    
    try {
      const recipeId = parseInt(id);
      
      if (isFavorite) {
        await removeFavoriteRecipe(user.id, recipeId);
        setIsFavorite(false);
        toast({
          title: "Removed from Favorites",
          description: "This recipe has been removed from your favorites.",
        });
      } else {
        await addFavoriteRecipe(user.id, recipeId);
        setIsFavorite(true);
        toast({
          title: "Added to Favorites",
          description: "This recipe has been added to your favorites.",
        });
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      });
    }
  };
  
  const handleShare = () => {
    // In a real app, this would use the Web Share API
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Recipe link copied to clipboard",
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto max-w-6xl px-4 pt-24">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="aspect-video bg-gray-200 rounded mb-8"></div>
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-8">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="h-24 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-semibold mb-4">Recipe Not Found</h2>
            <p className="text-food-medium-gray mb-6">{error}</p>
            <Button onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!recipe) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto max-w-6xl px-4 pt-24 pb-16">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 text-food-medium-gray hover:text-food-dark-gray"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        
        <header className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
            {recipe.title}
          </h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            {recipe.diets && recipe.diets.map((diet: string) => (
              <Badge key={diet} variant="outline" className="capitalize">
                {diet}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap items-center gap-6 text-food-medium-gray mb-8">
            {recipe.readyInMinutes && (
              <div className="flex items-center">
                <Clock size={18} className="text-food-green mr-2" />
                <span>{recipe.readyInMinutes} min</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center">
                <Users size={18} className="text-food-green mr-2" />
                <span>{recipe.servings} servings</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSave}
              className={isSaved ? "text-food-green border-food-green hover:text-food-green/80 hover:border-food-green/80" : ""}
            >
              {isSaved ? <BookmarkCheck size={16} className="mr-2" /> : <Bookmark size={16} className="mr-2" />}
              {isSaved ? "Saved" : "Save Recipe"}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleFavorite}
              className={isFavorite ? "text-red-500 border-red-500 hover:text-red-400 hover:border-red-400" : ""}
            >
              <Heart size={16} className={`mr-2 ${isFavorite ? "fill-current" : ""}`} />
              {isFavorite ? "Favorited" : "Add to Favorites"}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleShare}
            >
              <Share2 size={16} className="mr-2" />
              Share
            </Button>
          </div>
        </header>
        
        {recipe.image && (
          <div className="mb-12">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="sticky top-24">
              <h2 className="font-heading text-xl font-semibold mb-4">Ingredients</h2>
              <ul className="space-y-3 mb-8">
                {recipe.extendedIngredients && recipe.extendedIngredients.map((ingredient: any, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-food-green mt-2 mr-3"></span>
                    <span>{ingredient.original}</span>
                  </li>
                ))}
              </ul>
              
              {recipe.nutrition && (
                <div className="p-4 bg-food-light-gray rounded-lg">
                  <h3 className="font-heading text-lg font-semibold mb-2">Nutrition Facts</h3>
                  <div className="space-y-2 text-sm">
                    {recipe.nutrition.nutrients.slice(0, 6).map((nutrient: any) => (
                      <div key={nutrient.name} className="flex justify-between">
                        <span>{nutrient.name}</span>
                        <span>{nutrient.amount} {nutrient.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:col-span-8">
            <Tabs defaultValue="instructions">
              <TabsList className="mb-6">
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>
              
              <TabsContent value="instructions">
                <h2 className="font-heading text-xl font-semibold mb-6">Instructions</h2>
                
                {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
                  <ol className="space-y-6">
                    {recipe.analyzedInstructions[0].steps.map((step: any) => (
                      <li key={step.number} className="flex">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-food-green text-white font-medium mr-4 flex-shrink-0">
                          {step.number}
                        </span>
                        <div>
                          <p>{step.step}</p>
                          
                          {step.ingredients && step.ingredients.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {step.ingredients.map((ingredient: any) => (
                                <Badge key={ingredient.id} variant="outline" className="text-xs">
                                  {ingredient.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : recipe.instructions ? (
                  <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                ) : (
                  <p className="text-food-medium-gray">No instructions available for this recipe.</p>
                )}
                
              </TabsContent>
              
              <TabsContent value="summary">
                <h2 className="font-heading text-xl font-semibold mb-4">Summary</h2>
                {recipe.summary ? (
                  <div 
                    className="prose max-w-none" 
                    dangerouslySetInnerHTML={{ __html: recipe.summary }} 
                  />
                ) : (
                  <p className="text-food-medium-gray">No summary available for this recipe.</p>
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

export default ExternalRecipe;
