
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Users, Printer, Bookmark, BookmarkCheck, Heart, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import RecipeCard from '@/components/RecipeCard';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { recipes, getRelatedRecipes } from '@/lib/data';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { 
  addSavedRecipe, 
  addFavoriteRecipe, 
  getUserPreferences, 
  removeSavedRecipe,
  removeFavoriteRecipe
} from '@/services/preferences';

const Recipe = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState(recipes.find(r => r.id === id));
  const [relatedRecipes, setRelatedRecipes] = useState(getRelatedRecipes(id || ''));
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Load user preferences when component mounts or user changes
  useEffect(() => {
    const loadUserPreferences = async () => {
      if (!user) return;
      
      try {
        const preferences = await getUserPreferences(user.id);
        if (preferences) {
          // Check if this recipe is saved or favorited
          const savedIds = preferences.savedRecipes || [];
          const favoriteIds = preferences.favoriteRecipes || [];
          
          setIsSaved(savedIds.includes(parseInt(id || '0')));
          setIsFavorite(favoriteIds.includes(parseInt(id || '0')));
        }
      } catch (error) {
        console.error('Error loading user preferences:', error);
      }
    };
    
    loadUserPreferences();
  }, [user, id]);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Update recipe when ID changes
    setRecipe(recipes.find(r => r.id === id));
    setRelatedRecipes(getRelatedRecipes(id || ''));
    
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save recipes",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const recipeId = parseInt(id || '0');
      
      if (isSaved) {
        await removeSavedRecipe(user.id, recipeId);
        setIsSaved(false);
        toast({
          title: "Recipe Removed",
          description: "This recipe has been removed from your saved recipes.",
          duration: 3000,
        });
      } else {
        await addSavedRecipe(user.id, recipeId);
        setIsSaved(true);
        toast({
          title: "Recipe Saved",
          description: "This recipe has been added to your saved recipes.",
          duration: 3000,
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
    
    try {
      const recipeId = parseInt(id || '0');
      
      if (isFavorite) {
        await removeFavoriteRecipe(user.id, recipeId);
        setIsFavorite(false);
        toast({
          title: "Removed from Favorites",
          description: "This recipe has been removed from your favorites.",
          duration: 3000,
        });
      } else {
        await addFavoriteRecipe(user.id, recipeId);
        setIsFavorite(true);
        toast({
          title: "Added to Favorites",
          description: "This recipe has been added to your favorites.",
          duration: 3000,
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
    toast({
      title: "Share Link Copied",
      description: "Recipe link copied to clipboard.",
      duration: 3000,
    });
  };

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-semibold mb-4">Recipe Not Found</h2>
            <p className="text-food-medium-gray mb-6">
              We couldn't find the recipe you're looking for.
            </p>
            <Link to="/" className="btn btn-primary">
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 page-transition">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Recipe Header */}
          <header className={`text-center mb-10 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Link 
              to={`/category/${recipe.category.toLowerCase()}`}
              className="inline-block text-food-green text-sm uppercase tracking-wider font-medium mb-2"
            >
              {recipe.category}
            </Link>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              {recipe.title}
            </h1>
            <p className="text-food-medium-gray mb-6 max-w-2xl mx-auto">
              {recipe.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center">
                <Clock size={18} className="text-food-green mr-2" />
                <span>Total: {recipe.totalTime}</span>
              </div>
              <div className="flex items-center">
                <Users size={18} className="text-food-green mr-2" />
                <span>Serves: {recipe.servings}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium">{recipe.calories} cal</span>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <button 
                onClick={handlePrint}
                className="flex items-center text-food-medium-gray hover:text-food-dark-gray transition-colors"
              >
                <Printer size={16} className="mr-1" />
                <span>Print</span>
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center transition-colors"
                aria-label={isSaved ? "Remove from saved recipes" : "Save recipe"}
              >
                {isSaved ? (
                  <span className="flex items-center text-food-green hover:text-food-green/80">
                    <BookmarkCheck size={16} className="mr-1" />
                    <span>Saved</span>
                  </span>
                ) : (
                  <span className="flex items-center text-food-medium-gray hover:text-food-dark-gray">
                    <Bookmark size={16} className="mr-1" />
                    <span>Save</span>
                  </span>
                )}
              </button>
              <button 
                onClick={handleFavorite}
                className="flex items-center transition-colors"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? (
                  <span className="flex items-center text-red-500 hover:text-red-400">
                    <Heart size={16} className="mr-1 fill-current" />
                    <span>Favorite</span>
                  </span>
                ) : (
                  <span className="flex items-center text-food-medium-gray hover:text-food-dark-gray">
                    <Heart size={16} className="mr-1" />
                    <span>Favorite</span>
                  </span>
                )}
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center text-food-medium-gray hover:text-food-dark-gray transition-colors"
              >
                <Share2 size={16} className="mr-1" />
                <span>Share</span>
              </button>
            </div>
          </header>
          
          {/* Hero Image */}
          <div className={`mb-12 transition-all duration-700 delay-100 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="aspect-[16/9] rounded-lg overflow-hidden">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover animate-image-fade"
              />
            </div>
          </div>
          
          {/* Two Column Layout */}
          <div className="grid md:grid-cols-12 gap-8">
            {/* Left Column - Ingredients */}
            <div className={`md:col-span-4 transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="sticky top-24">
                <h2 className="font-heading text-2xl font-semibold mb-4">Ingredients</h2>
                <p className="text-sm text-food-medium-gray mb-4">Servings: {recipe.servings}</p>
                
                <ul className="space-y-3 mb-8">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-food-green mt-2 mr-3"></span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="p-4 bg-food-light-gray rounded-lg">
                  <h3 className="font-heading text-lg font-semibold mb-2">Recipe Notes</h3>
                  <p className="text-food-medium-gray text-sm">{recipe.notes}</p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Instructions */}
            <div className={`md:col-span-8 transition-all duration-700 delay-300 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <h2 className="font-heading text-2xl font-semibold mb-6">Instructions</h2>
              
              <ol className="space-y-8">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-food-green text-white font-medium mr-4 flex-shrink-0">
                      {index + 1}
                    </span>
                    <p>{instruction}</p>
                  </li>
                ))}
              </ol>
              
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-heading text-xl font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/category/${tag}`}
                      className="px-3 py-1 bg-food-light-gray rounded-full text-sm hover:bg-food-green hover:text-white transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
        
        {/* Related Recipes */}
        <section className="py-16 mt-16 bg-food-beige">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-10 text-center">
              You Might Also Like
            </h2>
            
            <div className="recipe-grid max-w-5xl mx-auto">
              {relatedRecipes.map((recipe, index) => (
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
        
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Recipe;
