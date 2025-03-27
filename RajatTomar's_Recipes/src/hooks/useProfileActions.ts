
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { 
  removeFavoriteRecipe, 
  removeSavedRecipe,
  addFavoriteRecipe,
  addSavedRecipe
} from '@/services/preferences';

export const useProfileActions = (userId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleToggleSaved = async (recipeId: number, isSaved: boolean) => {
    try {
      if (isSaved) {
        await removeSavedRecipe(userId, recipeId);
        toast({
          title: "Recipe removed",
          description: "Recipe removed from saved recipes"
        });
      } else {
        await addSavedRecipe(userId, recipeId);
        toast({
          title: "Recipe saved",
          description: "Recipe added to saved recipes"
        });
      }
      // Invalidate userPreferences query to refresh the data
      queryClient.invalidateQueries({ queryKey: ['userPreferences', userId] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not update saved recipes",
        variant: "destructive"
      });
    }
  };
  
  const handleToggleFavorite = async (recipeId: number, isFavorite: boolean) => {
    try {
      if (isFavorite) {
        await removeFavoriteRecipe(userId, recipeId);
        toast({
          title: "Recipe removed",
          description: "Recipe removed from favorites"
        });
      } else {
        await addFavoriteRecipe(userId, recipeId);
        toast({
          title: "Recipe favorited",
          description: "Recipe added to favorites"
        });
      }
      // Invalidate userPreferences query to refresh the data
      queryClient.invalidateQueries({ queryKey: ['userPreferences', userId] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not update favorites",
        variant: "destructive"
      });
    }
  };

  return {
    handleToggleSaved,
    handleToggleFavorite
  };
};