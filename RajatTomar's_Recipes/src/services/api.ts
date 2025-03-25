
import { mockAPI } from './mockBackend';
import { getToken } from './auth';

// Recipe search functions
export const searchRecipes = async (query: string, diet?: string, intolerances?: string, page: number = 1) => {
  try {
    const token = getToken();
    const data = await mockAPI.recipes.search(query, diet, intolerances, token || undefined, page);
    return data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

export const getRecipeById = async (id: number) => {
  try {
    const token = getToken();
    const data = await mockAPI.recipes.getById(id, token || undefined);
    return data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

export const getRandomRecipes = async (tags?: string) => {
  try {
    const token = getToken();
    const data = await mockAPI.recipes.getRandom(tags, token || undefined);
    return data;
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    throw error;
  }
};


// New functions for the recipes page
export const getAllRecipes = async (page: number = 1) => {
  try {
    const token = getToken();
    const data = await mockAPI.recipes.getAll(page, token || undefined);
    return data;
  } catch (error) {
    console.error('Error fetching all recipes:', error);
    throw error;
  }
};

export const getRecipesByCategory = async (category: string, page: number = 1) => {
  try {
    const token = getToken();
    const data = await mockAPI.recipes.getByCategory(category, page, token || undefined);
    return data;
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    throw error;
  }
};
