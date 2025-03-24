# Setting Up a Recipe App Backend

This guide explains how to create a standalone backend server for the Pinch of Yum recipe application using Node.js, Express, and MongoDB.

## Table of Contents

1. [Project Setup](#project-setup)
2. [Database Configuration](#database-configuration)
3. [User Authentication](#user-authentication)
4. [API Endpoints](#api-endpoints)
5. [Spoonacular API Integration](#spoonacular-api-integration)
6. [Deployment](#deployment)

## Project Setup

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Initial Setup

1. Create a new project directory:
```bash
mkdir pinch-of-yum-backend
cd pinch-of-yum-backend
```

2. Initialize npm package:
```bash
npm init -y
```

3. Install core dependencies:
```bash
npm install express mongoose dotenv cors helmet jsonwebtoken bcrypt axios
```

4. Install development dependencies:
```bash
npm install --save-dev nodemon typescript ts-node @types/express @types/node @types/cors @types/jsonwebtoken @types/bcrypt
```

5. Create a basic TypeScript configuration file (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

6. Create an environment variables file (`.env`):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pinch-of-yum
JWT_SECRET=your_jwt_secret_key_here
SPOONACULAR_API_KEY=your_spoonacular_api_key_here
CLIENT_URL=http://localhost:3000
```

7. Add scripts to `package.json`:
```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "nodemon --exec ts-node src/index.ts"
}
```

## Project Structure

Create the following folder structure:

```
pinch-of-yum-backend/
├── src/
│   ├── config/
│   │   ├── db.ts
│   │   └── env.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── preferencesController.ts
│   │   └── recipeController.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── models/
│   │   ├── User.ts
│   │   └── UserPreference.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── preferenceRoutes.ts
│   │   └── recipeRoutes.ts
│   ├── services/
│   │   └── spoonacularService.ts
│   ├── utils/
│   │   └── asyncHandler.ts
│   └── index.ts
├── .env
├── .gitignore
├── package.json
└── tsconfig.json
```

## Database Configuration

### Database Configuration (src/config/db.ts)

```typescript
import mongoose from 'mongoose';
import { MONGODB_URI } from './env';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
```

### Environment Configuration (src/config/env.ts)

```typescript
import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pinch-of-yum';
export const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
export const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY || '';
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
```

## User Authentication

### User Model (src/models/User.ts)

```typescript
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  },
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
```

### User Preferences Model (src/models/UserPreference.ts)

```typescript
import mongoose, { Document, Schema } from 'mongoose';

export interface IUserPreference extends Document {
  userId: mongoose.Types.ObjectId;
  dietaryPreferences: string[];
  favoriteRecipes: number[];
  savedRecipes: number[];
  allergies: string[];
}

const UserPreferenceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dietaryPreferences: {
    type: [String],
    default: [],
  },
  favoriteRecipes: {
    type: [Number],
    default: [],
  },
  savedRecipes: {
    type: [Number],
    default: [],
  },
  allergies: {
    type: [String],
    default: [],
  }
}, {
  timestamps: true
});

export default mongoose.model<IUserPreference>('UserPreference', UserPreferenceSchema);
```

### Auth Middleware (src/middleware/auth.ts)

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';
import User from '../models/User';

interface JwtPayload {
  id: string;
}

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
```

### Auth Controller (src/controllers/authController.ts)

```typescript
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { JWT_SECRET } from '../config/env';
import asyncHandler from '../utils/asyncHandler';

// Generate JWT token
const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  
  // Check if user exists
  const userExists = await User.findOne({ email });
  
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  
  // Create user
  const user = await User.create({
    name,
    email,
    password
  });
  
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString())
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  // Check for user email
  const user = await User.findOne({ email });
  
  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString())
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id);
  
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
```

## API Endpoints

### Auth Routes (src/routes/authRoutes.ts)

```typescript
import express from 'express';
import { register, login, getUserProfile } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getUserProfile);

export default router;
```

### Preferences Controller (src/controllers/preferencesController.ts)

```typescript
import { Request, Response } from 'express';
import UserPreference from '../models/UserPreference';
import asyncHandler from '../utils/asyncHandler';
import mongoose from 'mongoose';

// @desc    Get user preferences
// @route   GET /api/preferences
// @access  Private
export const getUserPreferences = asyncHandler(async (req: Request, res: Response) => {
  const preferences = await UserPreference.findOne({ userId: req.user._id });
  
  if (!preferences) {
    // Return empty preferences if none exist
    return res.json({
      userId: req.user._id,
      dietaryPreferences: [],
      favoriteRecipes: [],
      savedRecipes: [],
      allergies: []
    });
  }
  
  res.json(preferences);
});

// @desc    Update user preferences
// @route   PUT /api/preferences
// @access  Private
export const updateUserPreferences = asyncHandler(async (req: Request, res: Response) => {
  const { dietaryPreferences, allergies } = req.body;
  
  const preferences = await UserPreference.findOneAndUpdate(
    { userId: req.user._id },
    { 
      userId: req.user._id,
      dietaryPreferences, 
      allergies 
    },
    { new: true, upsert: true }
  );
  
  res.json(preferences);
});

// @desc    Add recipe to favorites
// @route   POST /api/preferences/favorites
// @access  Private
export const addFavoriteRecipe = asyncHandler(async (req: Request, res: Response) => {
  const { recipeId } = req.body;
  
  if (!recipeId) {
    res.status(400);
    throw new Error('Recipe ID is required');
  }
  
  const preferences = await UserPreference.findOneAndUpdate(
    { userId: req.user._id },
    { 
      $addToSet: { favoriteRecipes: recipeId } 
    },
    { new: true, upsert: true }
  );
  
  res.json(preferences);
});

// @desc    Remove recipe from favorites
// @route   DELETE /api/preferences/favorites/:id
// @access  Private
export const removeFavoriteRecipe = asyncHandler(async (req: Request, res: Response) => {
  const recipeId = Number(req.params.id);
  
  const preferences = await UserPreference.findOneAndUpdate(
    { userId: req.user._id },
    { 
      $pull: { favoriteRecipes: recipeId } 
    },
    { new: true }
  );
  
  if (!preferences) {
    res.status(404);
    throw new Error('Preferences not found');
  }
  
  res.json(preferences);
});

// @desc    Add recipe to saved
// @route   POST /api/preferences/saved
// @access  Private
export const addSavedRecipe = asyncHandler(async (req: Request, res: Response) => {
  const { recipeId } = req.body;
  
  if (!recipeId) {
    res.status(400);
    throw new Error('Recipe ID is required');
  }
  
  const preferences = await UserPreference.findOneAndUpdate(
    { userId: req.user._id },
    { 
      $addToSet: { savedRecipes: recipeId } 
    },
    { new: true, upsert: true }
  );
  
  res.json(preferences);
});

// @desc    Remove recipe from saved
// @route   DELETE /api/preferences/saved/:id
// @access  Private
export const removeSavedRecipe = asyncHandler(async (req: Request, res: Response) => {
  const recipeId = Number(req.params.id);
  
  const preferences = await UserPreference.findOneAndUpdate(
    { userId: req.user._id },
    { 
      $pull: { savedRecipes: recipeId } 
    },
    { new: true }
  );
  
  if (!preferences) {
    res.status(404);
    throw new Error('Preferences not found');
  }
  
  res.json(preferences);
});
```

### Preferences Routes (src/routes/preferenceRoutes.ts)

```typescript
import express from 'express';
import { 
  getUserPreferences,
  updateUserPreferences,
  addFavoriteRecipe,
  removeFavoriteRecipe,
  addSavedRecipe,
  removeSavedRecipe
} from '../controllers/preferencesController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Protect all preference routes
router.use(protect);

router.route('/')
  .get(getUserPreferences)
  .put(updateUserPreferences);

router.route('/favorites')
  .post(addFavoriteRecipe);

router.route('/favorites/:id')
  .delete(removeFavoriteRecipe);

router.route('/saved')
  .post(addSavedRecipe);

router.route('/saved/:id')
  .delete(removeSavedRecipe);

export default router;
```

## Spoonacular API Integration

### Spoonacular Service (src/services/spoonacularService.ts)

```typescript
import axios from 'axios';
import { SPOONACULAR_API_KEY } from '../config/env';

// Create an axios instance for Spoonacular API
const spoonacularApi = axios.create({
  baseURL: 'https://api.spoonacular.com',
  params: {
    apiKey: SPOONACULAR_API_KEY
  }
});

export const searchRecipes = async (query: string, diet?: string, intolerances?: string) => {
  try {
    const response = await spoonacularApi.get('/recipes/complexSearch', {
      params: {
        query,
        diet,
        intolerances,
        number: 12,
        addRecipeInformation: true,
        instructionsRequired: true,
        fillIngredients: true
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

export const getRecipeById = async (id: number) => {
  try {
    const response = await spoonacularApi.get(`/recipes/${id}/information`, {
      params: {
        includeNutrition: true
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

export const getRandomRecipes = async (tags?: string) => {
  try {
    const response = await spoonacularApi.get('/recipes/random', {
      params: {
        number: 6,
        tags
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    throw error;
  }
};
```

### Recipe Controller (src/controllers/recipeController.ts)

```typescript
import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import * as spoonacularService from '../services/spoonacularService';

// @desc    Search recipes
// @route   GET /api/recipes/search
// @access  Public
export const searchRecipes = asyncHandler(async (req: Request, res: Response) => {
  const { query, diet, intolerances } = req.query;
  
  if (!query) {
    res.status(400);
    throw new Error('Search query is required');
  }
  
  const results = await spoonacularService.searchRecipes(
    query as string,
    diet as string | undefined,
    intolerances as string | undefined
  );
  
  res.json(results);
});

// @desc    Get recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
export const getRecipeById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  
  if (isNaN(id)) {
    res.status(400);
    throw new Error('Invalid recipe ID');
  }
  
  const recipe = await spoonacularService.getRecipeById(id);
  
  res.json(recipe);
});

// @desc    Get random recipes
// @route   GET /api/recipes/random
// @access  Public
export const getRandomRecipes = asyncHandler(async (req: Request, res: Response) => {
  const { tags } = req.query;
  
  const recipes = await spoonacularService.getRandomRecipes(tags as string | undefined);
  
  res.json(recipes);
});
```

### Recipe Routes (src/routes/recipeRoutes.ts)

```typescript
import express from 'express';
import { 
  searchRecipes,
  getRecipeById,
  getRandomRecipes
} from '../controllers/recipeController';

const router = express.Router();

router.get('/search', searchRecipes);
router.get('/random', getRandomRecipes);
router.get('/:id', getRecipeById);

export default router;
```

## Error Handling Middleware

### Error Handler (src/middleware/errorHandler.ts)

```typescript
import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

export default errorHandler;
```

### Async Handler Utility (src/utils/asyncHandler.ts)

```typescript
import { Request, Response, NextFunction } from 'express';

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
```

## Main Server File

### Main Server (src/index.ts)

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PORT, CLIENT_URL } from './config/env';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import preferenceRoutes from './routes/preferenceRoutes';
import recipeRoutes from './routes/recipeRoutes';
import errorHandler from './middleware/errorHandler';

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(helmet());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/preferences', preferenceRoutes);
app.use('/api/recipes', recipeRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Pinch of Yum API is running...');
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Deployment

### Deploying to Production

For deploying to production, you have several options:

1. **Heroku**
   - Install the Heroku CLI
   - Create a Procfile with: `web: npm start`
   - Set environment variables in Heroku dashboard
   - Deploy using Git: `git push heroku main`

2. **DigitalOcean**
   - Create a Droplet with Node.js
   - Set up PM2 for process management
   - Configure Nginx as a reverse proxy
   - Set up SSL with Let's Encrypt

3. **AWS**
   - Deploy to Elastic Beanstalk
   - Or use EC2 with PM2 and Nginx
   - Set up environment variables in AWS console

### Setting Up CORS for Production

When deploying, make sure to:
1. Set the correct `CLIENT_URL` in your environment variables
2. Configure your frontend to use the correct API URL
3. Test CORS compatibility before going live

### Securing Your API

For production, make sure to:
1. Use a strong JWT secret
2. Set up rate limiting
3. Enable HTTPS
4. Keep your dependencies updated
5. Consider setting up monitoring and logging

## Connecting the Frontend

Once your backend is deployed, update your frontend's API services to connect to your new backend instead of using the mock backend.

Example frontend API service update:

```typescript
// Example updated frontend API service
import axios from 'axios';

const API_URL = 'https://your-backend-url.com/api';

// Create a configured axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Export API methods
export const searchRecipes = async (query, diet, intolerances) => {
  const response = await api.get('/recipes/search', {
    params: { query, diet, intolerances }
  });
  return response.data;
};

// ... other API methods
```

Remember to test thoroughly before switching from the mock backend to your real backend service.
