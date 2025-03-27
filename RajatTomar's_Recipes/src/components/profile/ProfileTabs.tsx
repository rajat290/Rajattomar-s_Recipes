
import React from 'react';
import { Bookmark, Heart } from 'lucide-react';
import { TabsContent, TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';
import RecipeList from './RecipeList';
import { UserPreferences } from '@/services/preferences';

interface ProfileTabsProps {
  preferences: UserPreferences | null | undefined;
  preferencesLoading: boolean;
  handleToggleSaved: (recipeId: number, isSaved: boolean) => void;
  handleToggleFavorite: (recipeId: number, isFavorite: boolean) => void;
}

const ProfileTabs = ({ 
  preferences, 
  preferencesLoading,
  handleToggleSaved,
  handleToggleFavorite
}: ProfileTabsProps) => {
  return (
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
            onRemove={(recipeId) => handleToggleFavorite(recipeId, false)}
            listType="saved"
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
            onRemove={(recipeId) => handleToggleSaved(recipeId, false)}
            listType="favorites"
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;