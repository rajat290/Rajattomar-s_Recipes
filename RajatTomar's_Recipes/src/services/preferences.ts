
import { mockAPI } from './mockBackend';
import { getToken } from './auth';

// Types
export interface UserPreferences {
  id: string;
  userId: string;
  dietaryPreferences: string[];
  favoriteRecipes: number[];
  savedRecipes: number[];
  allergies: string[];
}

// Get user preferences
export const getUserPreferences = async (userId: string): Promise<UserPreferences | null> => {
  const token = getToken();
  if (!token) return null;
  
  try {
    return await mockAPI.preferences.get(userId, token);
  } catch (error) {
    console.error('Error getting user preferences:', error);
    return null;
  }
};

// Save user preferences
export const saveUserPreferences = async (preferences: Omit<UserPreferences, 'id'>): Promise<UserPreferences> => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  
  return await mockAPI.preferences.save(preferences, token);
};

// Add favorite recipe
export const addFavoriteRecipe = async (userId: string, recipeId: number): Promise<UserPreferences> => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  
  return await mockAPI.preferences.addFavorite(userId, recipeId, token);
};

// Remove favorite recipe
export const removeFavoriteRecipe = async (userId: string, recipeId: number): Promise<UserPreferences> => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  
  return await mockAPI.preferences.removeFavorite(userId, recipeId, token);
};

// Add saved recipe
export const addSavedRecipe = async (userId: string, recipeId: number): Promise<UserPreferences> => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  
  return await mockAPI.preferences.addSaved(userId, recipeId, token);
};

// Remove saved recipe
export const removeSavedRecipe = async (userId: string, recipeId: number): Promise<UserPreferences> => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  
  return await mockAPI.preferences.removeSaved(userId, recipeId, token);
};
