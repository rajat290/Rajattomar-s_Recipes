import axios from 'axios';
import { User } from './auth';
import { UserPreferences } from './preferences';

// Mock server constants
const API_DELAY = 400; // Simulate network delay in ms
const SPOONACULAR_API_KEY = 'be1b427b1d3e44119d549960b648cfc2';

// Simulated database tables
let users: Record<string, { id: string; name: string; email: string; password: string }> = {};
let userPreferences: Record<string, UserPreferences> = {};
let tokens: Record<string, string> = {};

// Helper to simulate API delay
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, API_DELAY));

// Initialize mock database from localStorage
const initMockDatabase = () => {
  // Get users from localStorage if available
  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }

  // Get user preferences from localStorage if available
  const storedPreferences = localStorage.getItem('pinch_of_yum_preferences');
  if (storedPreferences) {
    const preferences = JSON.parse(storedPreferences);
    preferences.forEach((pref: UserPreferences) => {
      userPreferences[pref.userId] = pref;
    });
  }
};

// Initialize database on module load
initMockDatabase();

// Mock API endpoints
export const mockAPI = {
  // Auth endpoints
  auth: {
    register: async (name: string, email: string, password: string) => {
      await simulateDelay();
      
      // Check if user exists
      if (users[email]) {
        throw new Error('User already exists');
      }
      
      // Create new user
      const id = Math.random().toString(36).substring(2, 15);
      users[email] = { id, name, email, password };
      
      // Save to localStorage for persistence
      localStorage.setItem('users', JSON.stringify(users));
      
      // Generate token
      const token = btoa(JSON.stringify({ id, name, email, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }));
      tokens[email] = token;
      
      return {
        token,
        user: { id, name, email }
      };
    },
    
    login: async (email: string, password: string) => {
      await simulateDelay();
      
      // Check if user exists
      if (!users[email]) {
        throw new Error('User not found');
      }
      
      // Verify password
      if (users[email].password !== password) {
        throw new Error('Invalid password');
      }
      
      const { id, name } = users[email];
      
      // Generate token
      const token = btoa(JSON.stringify({ id, name, email, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }));
      tokens[email] = token;
      
      return {
        token,
        user: { id, name, email }
      };
    },
    
    verifyToken: async (token: string) => {
      await simulateDelay();
      
      try {
        const decoded = JSON.parse(atob(token));
        
        // Check if token is expired
        if (decoded.exp < Date.now()) {
          throw new Error('Token expired');
        }
        
        return {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email
        };
      } catch (error) {
        throw new Error('Invalid token');
      }
    }
  },
  
  // User preferences endpoints
  preferences: {
    get: async (userId: string, token: string) => {
      await simulateDelay();
      
      // Verify token first (simplified)
      try {
        await mockAPI.auth.verifyToken(token);
      } catch (error) {
        throw new Error('Unauthorized');
      }
      
      return userPreferences[userId] || null;
    },
    
    save: async (preferences: Omit<UserPreferences, 'id'>, token: string) => {
      await simulateDelay();
      
      // Verify token first (simplified)
      try {
        await mockAPI.auth.verifyToken(token);
      } catch (error) {
        throw new Error('Unauthorized');
      }
      
      const updatedPreferences = {
        ...preferences,
        id: userPreferences[preferences.userId]?.id || Date.now().toString()
      };
      
      userPreferences[preferences.userId] = updatedPreferences;
      
      // Save to localStorage for persistence
      localStorage.setItem('pinch_of_yum_preferences', JSON.stringify(Object.values(userPreferences)));
      
      return updatedPreferences;
    },
    
    addFavorite: async (userId: string, recipeId: number, token: string) => {
      await simulateDelay();
      
      // Verify token first (simplified)
      try {
        await mockAPI.auth.verifyToken(token);
      } catch (error) {
        throw new Error('Unauthorized');
      }
      
      // Get existing preferences or create new
      const prefs = userPreferences[userId] || {
        id: Date.now().toString(),
        userId,
        dietaryPreferences: [],
        favoriteRecipes: [],
        savedRecipes: [],
        allergies: []
      };
      
      // Add to favorites if not already there
      if (!prefs.favoriteRecipes.includes(recipeId)) {
        prefs.favoriteRecipes.push(recipeId);
        userPreferences[userId] = prefs;
        
        // Save to localStorage for persistence
        localStorage.setItem('pinch_of_yum_preferences', JSON.stringify(Object.values(userPreferences)));
      }
      
      return prefs;
    },
    
    removeFavorite: async (userId: string, recipeId: number, token: string) => {
      await simulateDelay();
      
      // Verify token first (simplified)
      try {
        await mockAPI.auth.verifyToken(token);
      } catch (error) {
        throw new Error('Unauthorized');
      }
      
      // Get existing preferences
      const prefs = userPreferences[userId];
      if (!prefs) {
        throw new Error('Preferences not found');
      }
      
      // Remove from favorites
      prefs.favoriteRecipes = prefs.favoriteRecipes.filter(id => id !== recipeId);
      userPreferences[userId] = prefs;
      
      // Save to localStorage for persistence
      localStorage.setItem('pinch_of_yum_preferences', JSON.stringify(Object.values(userPreferences)));
      
      return prefs;
    },
    
    addSaved: async (userId: string, recipeId: number, token: string) => {
      await simulateDelay();
      
      // Verify token first (simplified)
      try {
        await mockAPI.auth.verifyToken(token);
      } catch (error) {
        throw new Error('Unauthorized');
      }
      
      // Get existing preferences or create new
      const prefs = userPreferences[userId] || {
        id: Date.now().toString(),
        userId,
        dietaryPreferences: [],
        favoriteRecipes: [],
        savedRecipes: [],
        allergies: []
      };
      
      // Add to saved if not already there
      if (!prefs.savedRecipes.includes(recipeId)) {
        prefs.savedRecipes.push(recipeId);
        userPreferences[userId] = prefs;
        
        // Save to localStorage for persistence
        localStorage.setItem('pinch_of_yum_preferences', JSON.stringify(Object.values(userPreferences)));
      }
      
      return prefs;
    },
    
    removeSaved: async (userId: string, recipeId: number, token: string) => {
      await simulateDelay();
      
      // Verify token first (simplified)
      try {
        await mockAPI.auth.verifyToken(token);
      } catch (error) {
        throw new Error('Unauthorized');
      }
      
      // Get existing preferences
      const prefs = userPreferences[userId];
      if (!prefs) {
        throw new Error('Preferences not found');
      }
      
      // Remove from saved
      prefs.savedRecipes = prefs.savedRecipes.filter(id => id !== recipeId);
      userPreferences[userId] = prefs;
      
      // Save to localStorage for persistence
      localStorage.setItem('pinch_of_yum_preferences', JSON.stringify(Object.values(userPreferences)));
      
      return prefs;
    }
  },
  
  // Recipe endpoints
  recipes: {
    search: async (query: string, diet?: string, intolerances?: string, token?: string, page: number = 1) => {
      await simulateDelay();
      
      // Create Spoonacular API instance
      const spoonacularApi = axios.create({
        baseURL: 'https://api.spoonacular.com',
        params: {
          apiKey: SPOONACULAR_API_KEY
        }
      });
      
      // Make actual API call to Spoonacular
      const response = await spoonacularApi.get('/recipes/complexSearch', {
        params: {
          query,
          diet,
          intolerances,
          number: 12,
          offset: (page - 1) * 12, // Add pagination support
          addRecipeInformation: true,
          instructionsRequired: true,
          fillIngredients: true
        }
      });
      
      return response.data;
    },
    
    getById: async (id: number, token?: string) => {
      await simulateDelay();
      
      // Create Spoonacular API instance
      const spoonacularApi = axios.create({
        baseURL: 'https://api.spoonacular.com',
        params: {
          apiKey: SPOONACULAR_API_KEY
        }
      });
      
      // Make actual API call to Spoonacular
      const response = await spoonacularApi.get(`/recipes/${id}/information`, {
        params: {
          includeNutrition: true
        }
      });
      
      return response.data;
    },
    
    getRandom: async (tags?: string, token?: string) => {
      await simulateDelay();
      
      // Create Spoonacular API instance
      const spoonacularApi = axios.create({
        baseURL: 'https://api.spoonacular.com',
        params: {
          apiKey: SPOONACULAR_API_KEY
        }
      });
      
      // Make actual API call to Spoonacular
      const response = await spoonacularApi.get('/recipes/random', {
        params: {
          number: 6,
          tags
        }
      });
      
      return response.data;
    }
  }
};
