import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { removeFavoriteRecipe, removeSavedRecipe } from '@/services/preferences';

export const useProfileActions = (userId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleRemoveSaved = async (recipeId: number) => {
    try {
      await removeSavedRecipe(userId, recipeId);
      // Invalidate userPreferences query to refresh the data
      queryClient.invalidateQueries({ queryKey: ['userPreferences', userId] });
      toast({
        title: "Recipe removed",
        description: "Recipe removed from saved recipes"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not remove recipe from saved recipes",
        variant: "destructive"
      });
    }
  };
  
  const handleRemoveFavorite = async (recipeId: number) => {
    try {
      await removeFavoriteRecipe(userId, recipeId);
      // Invalidate userPreferences query to refresh the data
      queryClient.invalidateQueries({ queryKey: ['userPreferences', userId] });
      toast({
        title: "Recipe removed",
        description: "Recipe removed from favorites"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not remove recipe from favorites",
        variant: "destructive"
      });
    }
  };

  return {
    handleRemoveSaved,
    handleRemoveFavorite
  };
};