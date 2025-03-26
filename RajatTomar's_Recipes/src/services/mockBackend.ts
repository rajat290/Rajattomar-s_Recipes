
import { recipes } from '@/lib/data';

// Mock API for authentication
export const mockAuthAPI = {
  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (email === 'test@example.com' && password === 'password') {
      const userData = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      };
      
      const token = btoa(JSON.stringify({
        ...userData,
        exp: Date.now() + 1000 * 60 * 60 * 24 // 24 hours
      }));
      
      return { user: userData, token };
    } else {
      throw new Error('Invalid credentials');
    }
  },

  register: async (name: string, email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userData = {
      id: '2', // New user ID
      name,
      email,
    };
    
    const token = btoa(JSON.stringify({
      ...userData,
      exp: Date.now() + 1000 * 60 * 60 * 24 // 24 hours
    }));
    
    return { user: userData, token };
  },
};

// Mock API for recipe preferences
export const mockPreferencesAPI = {
  get: async (userId: string, token?: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const preferences = localStorage.getItem(`preferences-${userId}`);
    
    if (preferences) {
      return JSON.parse(preferences);
    } else {
      // Create default preferences if none exist
      const defaultPreferences = {
        id: `pref-${userId}`,
        userId,
        dietaryPreferences: [],
        favoriteRecipes: [],
        savedRecipes: [],
        allergies: []
      };
      
      localStorage.setItem(`preferences-${userId}`, JSON.stringify(defaultPreferences));
      return defaultPreferences;
    }
  },
  
  save: async (preferences: any, token?: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem(`preferences-${preferences.userId}`, JSON.stringify(preferences));
    return preferences;
  },
  
  addFavorite: async (userId: string, recipeId: number, token?: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const prefsStr = localStorage.getItem(`preferences-${userId}`);
    const prefs = prefsStr ? JSON.parse(prefsStr) : {
      id: `pref-${userId}`,
      userId,
      dietaryPreferences: [],
      favoriteRecipes: [],
      savedRecipes: [],
      allergies: []
    };
    
    if (!prefs.favoriteRecipes.includes(recipeId)) {
      prefs.favoriteRecipes.push(recipeId);
      localStorage.setItem(`preferences-${userId}`, JSON.stringify(prefs));
    }
    
    return prefs;
  },
  
  removeFavorite: async (userId: string, recipeId: number, token?: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const prefsStr = localStorage.getItem(`preferences-${userId}`);
    if (!prefsStr) return null;
    
    const prefs = JSON.parse(prefsStr);
    prefs.favoriteRecipes = prefs.favoriteRecipes.filter((id: number) => id !== recipeId);
    localStorage.setItem(`preferences-${userId}`, JSON.stringify(prefs));
    
    return prefs;
  },
  
  addSaved: async (userId: string, recipeId: number, token?: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const prefsStr = localStorage.getItem(`preferences-${userId}`);
    const prefs = prefsStr ? JSON.parse(prefsStr) : {
      id: `pref-${userId}`,
      userId,
      dietaryPreferences: [],
      favoriteRecipes: [],
      savedRecipes: [],
      allergies: []
    };
    
    if (!prefs.savedRecipes.includes(recipeId)) {
      prefs.savedRecipes.push(recipeId);
      localStorage.setItem(`preferences-${userId}`, JSON.stringify(prefs));
    }
    
    return prefs;
  },
  
  removeSaved: async (userId: string, recipeId: number, token?: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const prefsStr = localStorage.getItem(`preferences-${userId}`);
    if (!prefsStr) return null;
    
    const prefs = JSON.parse(prefsStr);
    prefs.savedRecipes = prefs.savedRecipes.filter((id: number) => id !== recipeId);
    localStorage.setItem(`preferences-${userId}`, JSON.stringify(prefs));
    
    return prefs;
  }
};

// Helper function for paginating recipes
const paginateRecipesResult = (recipes: any[], page: number, perPage: number = 6) => {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedRecipes = recipes.slice(startIndex, endIndex);
  const totalPages = Math.ceil(recipes.length / perPage);
  
  return {
    recipes: paginatedRecipes,
    totalPages,
    currentPage: page
  };
};

// Mock API for Spoonacular external recipe fetching
export const mockSpoonacularAPI = {
  getRecipeById: async (id: number, token?: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create a richer mock external recipe with additional properties
    const mockRecipe = {
      id: id,
      title: `External Recipe ${id}`,
      image: `https://spoonacular.com/recipeImages/${id}-556x370.jpg`,
      sourceUrl: `https://spoonacular.com/${id}`,
      summary: 'This is a mock external recipe from Spoonacular.',
      instructions: 'Follow the instructions on the Spoonacular website.',
      readyInMinutes: 30 + Math.floor(Math.random() * 30), // 30-60 minutes
      servings: 2 + Math.floor(Math.random() * 4), // 2-6 servings
      diets: ['vegetarian', 'gluten-free'],
      extendedIngredients: [
        { original: '1 cup flour' },
        { original: '2 eggs' },
        { original: '1/2 cup milk' },
        { original: '1 tsp baking powder' }
      ],
      analyzedInstructions: [
        {
          name: '',
          steps: [
            {
              number: 1,
              step: 'Mix all dry ingredients in a bowl.',
              ingredients: [{ id: 20081, name: 'flour' }, { id: 18371, name: 'baking powder' }]
            },
            {
              number: 2,
              step: 'Add wet ingredients and mix until smooth.',
              ingredients: [{ id: 1123, name: 'eggs' }, { id: 1077, name: 'milk' }]
            },
            {
              number: 3,
              step: 'Cook on a hot pan until golden brown.',
              ingredients: []
            }
          ]
        }
      ]
    };

    return mockRecipe;
  },
};

// Mock API for recipes
export const mockAPI = {
  search: async (query: string, diet?: string, intolerances?: string, token?: string, page: number = 1) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    let searchResults = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query.toLowerCase()))
    );

    if (diet) {
      searchResults = searchResults.filter(recipe => recipe.tags.includes(diet.toLowerCase()));
    }

    if (intolerances) {
      searchResults = searchResults.filter(recipe => !recipe.tags.includes(intolerances.toLowerCase()));
    }

    return paginateRecipesResult(searchResults, page);
  },

  getById: async (id: number, token?: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Try to find by string ID first
    let recipe = recipes.find(recipe => recipe.id === id.toString());
    
    // If not found, use the mock external recipe API
    if (!recipe) {
      return mockSpoonacularAPI.getRecipeById(id, token);
    }
    
    // Add extra properties to match the external recipe format
    return {
      ...recipe,
      readyInMinutes: 30,
      servings: 4,
      diets: recipe.tags,
      extendedIngredients: recipe.ingredients.map(ing => ({ original: ing })),
      analyzedInstructions: [
        {
          name: '',
          steps: recipe.instructions.map((instruction, index) => ({
            number: index + 1,
            step: instruction,
            ingredients: []
          }))
        }
      ]
    };
  },

  getRandom: async (tags?: string, token?: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredRecipes = recipes;
    if (tags) {
      filteredRecipes = recipes.filter(recipe => recipe.tags.includes(tags.toLowerCase()));
    }

    if (filteredRecipes.length === 0) {
      return [];
    }

    const randomRecipes = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
      const recipe = filteredRecipes[randomIndex];
      
      // Add extra properties to match the external recipe format
      randomRecipes.push({
        ...recipe,
        readyInMinutes: 30,
        servings: 4,
        diets: recipe.tags,
        extendedIngredients: recipe.ingredients.map(ing => ({ original: ing }))
      });
    }

    return randomRecipes;
  },
  
  recipes: {
    getAll: async (page: number = 1, token?: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const allRecipes = recipes;
      return paginateRecipesResult(allRecipes, page);
    },
    
    getByCategory: async (category: string, page: number = 1, token?: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const categoryRecipes = recipes.filter(recipe => 
        recipe.category.toLowerCase() === category.toLowerCase() ||
        recipe.tags.includes(category.toLowerCase())
      );
      
      return paginateRecipesResult(categoryRecipes, page);
    },
  },
};