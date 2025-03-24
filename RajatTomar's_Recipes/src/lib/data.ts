
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  calories: number;
  ingredients: string[];
  instructions: string[];
  notes: string;
  tags: string[];
}

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Creamy Garlic Pasta",
    description: "This creamy garlic pasta is simple to make and packed with flavor. It's the perfect weeknight dinner!",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    category: "Dinner",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    totalTime: "30 minutes",
    servings: 4,
    calories: 450,
    ingredients: [
      "8 oz fettuccine pasta",
      "2 tablespoons olive oil",
      "4 cloves garlic, minced",
      "1 cup heavy cream",
      "1/2 cup grated parmesan cheese",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Cook pasta according to package directions. Reserve 1/2 cup pasta water before draining.",
      "In a large skillet, heat olive oil over medium heat. Add minced garlic and cook until fragrant, about 1 minute.",
      "Pour in the heavy cream and bring to a simmer. Cook for 3-4 minutes until it starts to thicken.",
      "Stir in the parmesan cheese until melted and smooth.",
      "Add the cooked pasta to the sauce and toss to coat. If needed, add reserved pasta water to thin the sauce.",
      "Season with salt and pepper to taste.",
      "Garnish with fresh parsley before serving."
    ],
    notes: "For extra protein, add grilled chicken or shrimp.",
    tags: ["pasta", "italian", "quick meals", "vegetarian"]
  },
  {
    id: "2",
    title: "Classic Chocolate Chip Cookies",
    description: "Perfectly soft and chewy chocolate chip cookies that will satisfy any sweet tooth.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
    category: "Desserts",
    prepTime: "15 minutes",
    cookTime: "12 minutes",
    totalTime: "27 minutes",
    servings: 24,
    calories: 180,
    ingredients: [
      "1 cup unsalted butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup brown sugar, packed",
      "2 large eggs",
      "2 teaspoons vanilla extract",
      "2 1/4 cups all-purpose flour",
      "1 teaspoon baking soda",
      "1/2 teaspoon salt",
      "2 cups semi-sweet chocolate chips"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.",
      "In a large bowl, cream together butter, granulated sugar, and brown sugar until light and fluffy.",
      "Beat in eggs one at a time, then stir in vanilla.",
      "In a separate bowl, combine flour, baking soda, and salt. Gradually add to the wet ingredients and mix until just combined.",
      "Fold in chocolate chips.",
      "Drop rounded tablespoons of dough onto prepared baking sheets.",
      "Bake for 10-12 minutes until edges are golden. Centers may look slightly underdone.",
      "Allow cookies to cool on baking sheet for 5 minutes before transferring to a wire rack."
    ],
    notes: "For extra flavor, try adding 1/2 cup of chopped nuts or using a mix of chocolate chips and chunks.",
    tags: ["cookies", "dessert", "baking", "chocolate"]
  },
  {
    id: "3",
    title: "Vegetable Stir Fry",
    description: "A quick and healthy vegetable stir fry that's perfect for busy weeknights.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Dinner",
    prepTime: "15 minutes",
    cookTime: "10 minutes",
    totalTime: "25 minutes",
    servings: 4,
    calories: 220,
    ingredients: [
      "2 tablespoons vegetable oil",
      "2 cloves garlic, minced",
      "1 tablespoon ginger, grated",
      "1 bell pepper, sliced",
      "1 carrot, julienned",
      "1 cup broccoli florets",
      "1 cup snap peas",
      "1 cup mushrooms, sliced",
      "2 tablespoons soy sauce",
      "1 tablespoon oyster sauce",
      "1 teaspoon sesame oil",
      "1/4 cup vegetable broth",
      "Sesame seeds and green onions for garnish"
    ],
    instructions: [
      "Heat vegetable oil in a large wok or skillet over high heat.",
      "Add garlic and ginger, stir-fry for 30 seconds until fragrant.",
      "Add carrots and cook for 1 minute.",
      "Add bell pepper, broccoli, snap peas, and mushrooms. Stir-fry for 3-4 minutes until vegetables are crisp-tender.",
      "In a small bowl, mix soy sauce, oyster sauce, sesame oil, and vegetable broth.",
      "Pour sauce over vegetables and toss to coat. Cook for another 1-2 minutes.",
      "Garnish with sesame seeds and sliced green onions before serving."
    ],
    notes: "Serve over rice or noodles for a complete meal. Add tofu, chicken, or beef for extra protein.",
    tags: ["stir fry", "vegetables", "healthy", "quick meals", "vegan"]
  },
  {
    id: "4",
    title: "Avocado Toast with Poached Egg",
    description: "A simple yet delicious breakfast that's both nutritious and satisfying.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    category: "Breakfast",
    prepTime: "5 minutes",
    cookTime: "5 minutes",
    totalTime: "10 minutes",
    servings: 1,
    calories: 320,
    ingredients: [
      "1 slice whole grain bread",
      "1/2 ripe avocado",
      "1 egg",
      "1 tablespoon vinegar",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
      "Fresh herbs like chives or cilantro (optional)"
    ],
    instructions: [
      "Toast the bread until golden and crisp.",
      "While bread is toasting, bring a pot of water to a gentle simmer. Add vinegar.",
      "Crack the egg into a small bowl. Create a gentle whirlpool in the water and carefully slide the egg in.",
      "Poach for 3-4 minutes for a runny yolk.",
      "Mash the avocado with a fork and spread onto the toast.",
      "Using a slotted spoon, remove the poached egg and place on top of the avocado.",
      "Season with salt, pepper, and optional toppings."
    ],
    notes: "For extra flavor, try adding a squeeze of lemon juice, a drizzle of olive oil, or everything bagel seasoning.",
    tags: ["breakfast", "avocado", "eggs", "healthy", "quick meals"]
  },
  {
    id: "5",
    title: "Berry Smoothie Bowl",
    description: "A refreshing and nutritious smoothie bowl topped with fresh fruits and granola.",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    category: "Breakfast",
    prepTime: "10 minutes",
    cookTime: "0 minutes",
    totalTime: "10 minutes",
    servings: 1,
    calories: 350,
    ingredients: [
      "1 cup frozen mixed berries",
      "1 frozen banana",
      "1/4 cup Greek yogurt",
      "1/4 cup almond milk (or milk of choice)",
      "1 tablespoon honey or maple syrup (optional)",
      "Toppings: fresh berries, sliced banana, granola, chia seeds, coconut flakes"
    ],
    instructions: [
      "Add frozen berries, banana, Greek yogurt, and almond milk to a blender.",
      "Blend until smooth and creamy. Add more milk if needed, but keep it thick enough to eat with a spoon.",
      "Taste and add honey or maple syrup if desired.",
      "Pour into a bowl and arrange toppings in an attractive pattern.",
      "Serve immediately."
    ],
    notes: "For a vegan version, use plant-based yogurt and maple syrup instead of honey.",
    tags: ["breakfast", "smoothie", "healthy", "berries", "quick meals"]
  },
  {
    id: "6",
    title: "Homemade Margherita Pizza",
    description: "A classic Italian pizza with fresh tomatoes, mozzarella, and basil.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    category: "Dinner",
    prepTime: "30 minutes",
    cookTime: "15 minutes",
    totalTime: "45 minutes",
    servings: 4,
    calories: 290,
    ingredients: [
      "Pizza dough (store-bought or homemade)",
      "1/4 cup tomato sauce",
      "8 oz fresh mozzarella, sliced",
      "2 ripe tomatoes, sliced",
      "Fresh basil leaves",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)"
    ],
    instructions: [
      "Preheat oven to 475°F (245°C). If using a pizza stone, place it in the oven while preheating.",
      "Roll out pizza dough on a floured surface to desired thickness.",
      "Spread tomato sauce evenly over the dough, leaving a small border for the crust.",
      "Arrange mozzarella slices and tomato slices on top.",
      "Sprinkle with salt and pepper.",
      "Transfer pizza to preheated stone or baking sheet.",
      "Bake for 12-15 minutes until crust is golden and cheese is bubbly.",
      "Remove from oven and immediately top with fresh basil leaves and a drizzle of olive oil.",
      "Sprinkle with red pepper flakes if desired before serving."
    ],
    notes: "For the best flavor, use high-quality ingredients, especially the olive oil and tomatoes.",
    tags: ["pizza", "italian", "dinner", "vegetarian"]
  }
];

export const categories = [
  { id: "breakfast", name: "Breakfast", count: 2 },
  { id: "lunch", name: "Lunch", count: 1 },
  { id: "dinner", name: "Dinner", count: 3 },
  { id: "desserts", name: "Desserts", count: 1 },
  { id: "vegan", name: "Vegan", count: 1 }
];

export const getRecipesByCategory = (categoryId: string): Recipe[] => {
  return recipes.filter(recipe => 
    recipe.category.toLowerCase() === categoryId.toLowerCase() ||
    recipe.tags.includes(categoryId.toLowerCase())
  );
};

export const getRelatedRecipes = (recipeId: string, limit = 3): Recipe[] => {
  const currentRecipe = recipes.find(r => r.id === recipeId);
  if (!currentRecipe) return [];
  
  // Find recipes with similar tags or category
  return recipes
    .filter(recipe => 
      recipe.id !== recipeId && (
        recipe.category === currentRecipe.category ||
        recipe.tags.some(tag => currentRecipe.tags.includes(tag))
      )
    )
    .slice(0, limit);
};
