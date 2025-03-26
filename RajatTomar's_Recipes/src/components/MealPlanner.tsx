import React, { useState } from 'react';
import { ArrowRight, Calendar, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getRandomRecipes } from '@/services/api';
import { Link } from 'react-router-dom';
import LoadingSpinner from './ui/loading-spinner';
import { toast } from '@/components/ui/use-toast';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
// Fallback image when original images fail to load
const fallbackImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=800';

const MealPlanner = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');
  const [isGenerating, setIsGenerating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<any[]>([]);
  
  // Mock meal plan data structure
  const [mealPlan, setMealPlan] = useState<Record<string, Record<string, any>>>({
    Monday: { Breakfast: null, Lunch: null, Dinner: null, Snack: null },
    Tuesday: { Breakfast: null, Lunch: null, Dinner: null, Snack: null },
    Wednesday: { Breakfast: null, Lunch: null, Dinner: null, Snack: null },
    Thursday: { Breakfast: null, Lunch: null, Dinner: null, Snack: null },
    Friday: { Breakfast: null, Lunch: null, Dinner: null, Snack: null },
    Saturday: { Breakfast: null, Lunch: null, Dinner: null, Snack: null },
    Sunday: { Breakfast: null, Lunch: null, Dinner: null, Snack: null },
  });
  
  // Track image loading errors
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (recipeId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [recipeId]: true
    }));
  };

  const handleGenerateRecipes = async () => {
    setIsGenerating(true);
    
    try {
      // Get a diet tag based on meal type to get relevant recipes
      const tag = selectedMeal === 'Breakfast' ? 'breakfast' : 
                 selectedMeal === 'Lunch' ? 'lunch' : 
                 selectedMeal === 'Dinner' ? 'dinner' : '';
      
      const recipes = await getRandomRecipes(tag);
      setGeneratedRecipes(recipes);
    } catch (error) {
      console.error('Error generating recipes:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate recipe suggestions',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectRecipe = (recipe: any) => {
    setMealPlan(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [selectedMeal]: recipe
      }
    }));
    
    setDialogOpen(false);
    
    toast({
      title: 'Meal added',
      description: `${recipe.title} added to ${selectedDay}'s ${selectedMeal}`
    });
  };

  const handleRemoveRecipe = (day: string, meal: string) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: null
      }
    }));
    
    toast({
      title: 'Meal removed',
      description: `Removed from ${day}'s ${meal}`
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-heading text-2xl font-semibold mb-4">Weekly Meal Planner</h2>
      
      <Tabs defaultValue="Monday">
        <TabsList className="grid grid-cols-7 mb-6">
          {daysOfWeek.map(day => (
            <TabsTrigger key={day} value={day}>{day.slice(0, 3)}</TabsTrigger>
          ))}
        </TabsList>
        
        {daysOfWeek.map(day => (
          <TabsContent key={day} value={day}>
            <div>
              <h3 className="font-heading text-xl font-medium mb-4 flex items-center">
                <Calendar className="mr-2" size={18} />
                {day}'s Meals
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mealTypes.map(meal => (
                  <Card key={meal} className="flex flex-col h-full">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{meal}</CardTitle>
                      <CardDescription>
                        {mealPlan[day][meal] ? `${mealPlan[day][meal].readyInMinutes || 30} min` : 'No meal planned'}
                      </CardDescription>
                    </CardHeader>
                    
                    {mealPlan[day][meal] ? (
                      <CardContent className="pb-3 flex-grow">
                        <div className="aspect-video rounded-md overflow-hidden bg-gray-100 mb-3">
                          <img 
                            src={imageErrors[mealPlan[day][meal].id] ? fallbackImage : mealPlan[day][meal].image} 
                            alt={mealPlan[day][meal].title}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(mealPlan[day][meal].id)}
                          />
                        </div>
                        <p className="font-medium">{mealPlan[day][meal].title}</p>
                      </CardContent>
                    ) : (
                      <CardContent className="pb-3 flex-grow flex items-center justify-center">
                        <div className="text-center text-food-medium-gray py-6">
                          <Plus size={36} className="mx-auto mb-2 opacity-30" />
                          <p>Add a meal</p>
                        </div>
                      </CardContent>
                    )}
                    
                    <CardFooter className="pt-0">
                      {mealPlan[day][meal] ? (
                        <div className="flex justify-between w-full gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-500 border-red-200 hover:text-red-600 hover:bg-red-50 flex-grow"
                            onClick={() => handleRemoveRecipe(day, meal)}
                          >
                            <Trash size={14} className="mr-1" />
                            Remove
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-grow"
                            asChild
                          >
                            <Link to={`/recipe/${mealPlan[day][meal].id}`}>
                              View
                              <ArrowRight size={14} className="ml-1" />
                            </Link>
                          </Button>
                        </div>
                      ) : (
                        <Dialog open={dialogOpen && selectedDay === day && selectedMeal === meal} onOpenChange={(open) => {
                          if (open) {
                            setSelectedDay(day);
                            setSelectedMeal(meal);
                            handleGenerateRecipes();
                          }
                          setDialogOpen(open);
                        }}>
                          <DialogTrigger asChild>
                            <Button className="w-full">
                              <Plus size={16} className="mr-2" />
                              Add Meal
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-xl">
                            <DialogHeader>
                              <DialogTitle>Add a meal for {day}'s {meal}</DialogTitle>
                              <DialogDescription>
                                Select a recipe or search for something specific.
                              </DialogDescription>
                            </DialogHeader>
                            
                            {isGenerating ? (
                              <div className="py-10">
                                <LoadingSpinner />
                                <p className="text-center mt-4 text-food-medium-gray">
                                  Generating recipe suggestions...
                                </p>
                              </div>
                            ) : (
                              <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto py-2">
                                  {generatedRecipes.map(recipe => (
                                    <Card key={recipe.id} className="cursor-pointer hover:border-food-green transition-colors"
                                      onClick={() => handleSelectRecipe(recipe)}
                                    >
                                      <div className="aspect-video overflow-hidden">
                                        <img 
                                          src={imageErrors[recipe.id] ? fallbackImage : recipe.image} 
                                          alt={recipe.title}
                                          className="w-full h-full object-cover"
                                          onError={() => handleImageError(recipe.id)}
                                        />
                                      </div>
                                      <div className="p-3">
                                        <h4 className="font-medium text-sm">{recipe.title}</h4>
                                        <p className="text-food-medium-gray text-xs mt-1">{recipe.readyInMinutes || 30} min</p>
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                                
                                <DialogFooter>
                                  <Button variant="outline" onClick={handleGenerateRecipes}>
                                    Generate More
                                  </Button>
                                  <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                </DialogFooter>
                              </>
                            )}
                          </DialogContent>
                        </Dialog>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MealPlanner;
