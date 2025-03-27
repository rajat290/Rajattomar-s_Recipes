import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

// Mock blog data (in a real app, this would come from an API or database)
const blogPosts = [
  {
    id: "1",
    title: "Top 10 Kitchen Gadgets of 2023",
    content: `
      <p>The right kitchen tools can make cooking easier, faster, and more enjoyable. Here are our top picks for 2023:</p>
      
      <h3>1. Smart Instant Pot</h3>
      <p>The latest generation of Instant Pots now comes with smart features that allow you to control and monitor your cooking from your smartphone.</p>
      
      <h3>2. Silicone Cooking Utensils Set</h3>
      <p>Heat-resistant, non-scratch, and dishwasher safe, a good set of silicone utensils is essential for any kitchen.</p>
      
      <h3>3. Digital Kitchen Scale</h3>
      <p>Precise measurements are crucial for baking, and a good digital scale makes all the difference.</p>
      
      <h3>4. High-Quality Chef's Knife</h3>
      <p>A sharp, well-balanced chef's knife is perhaps the most important tool in your kitchen.</p>
      
      <h3>5. Immersion Blender</h3>
      <p>Perfect for soups, sauces, and smoothies, an immersion blender saves you from transferring hot liquids to a traditional blender.</p>
      
      <h3>6. Silicone Baking Mats</h3>
      <p>Replace parchment paper with reusable silicone mats for eco-friendly, non-stick baking.</p>
      
      <h3>7. Air Fryer</h3>
      <p>Achieve crispy, "fried" results with a fraction of the oil using an air fryer.</p>
      
      <h3>8. Herb Keeper</h3>
      <p>Extend the life of your fresh herbs with a specialized herb keeper for your refrigerator.</p>
      
      <h3>9. Adjustable Rolling Pin</h3>
      <p>Get perfectly even dough with an adjustable rolling pin that allows you to set the exact thickness.</p>
      
      <h3>10. Digital Meat Thermometer</h3>
      <p>Never overcook meat again with an instant-read digital thermometer.</p>
    `,
    date: "November 15, 2023",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    author: "Chef Maria",
    tags: ["Kitchen Tools", "Cooking Tips", "Gadgets"]
  },
  {
    id: "2",
    title: "The Art of Meal Prepping",
    content: `
      <p>Meal prepping is a game-changer for busy individuals who want to eat healthy, save time, and reduce food waste. Here's how to get started:</p>
      
      <h3>Start Small</h3>
      <p>Don't try to prep every meal for the entire week at once. Begin with prepping just a few meals or components.</p>
      
      <h3>Plan Your Menu</h3>
      <p>Choose recipes that use similar ingredients to minimize waste and simplify your shopping list.</p>
      
      <h3>Invest in Good Containers</h3>
      <p>Quality glass or BPA-free plastic containers will keep your food fresh longer and make reheating easier.</p>
      
      <h3>Batch Cook Basics</h3>
      <p>Cooking large batches of rice, quinoa, or roasted vegetables gives you a head start on multiple meals.</p>
      
      <h3>Prep Ingredients, Not Just Meals</h3>
      <p>Washing and chopping vegetables in advance can save significant time during weeknight cooking.</p>
      
      <h3>Use Your Freezer Wisely</h3>
      <p>Many prepped meals freeze well. Label everything with dates to keep track of freshness.</p>
      
      <h3>Add Variety</h3>
      <p>Prevent food fatigue by including different flavors, textures, and cuisines in your meal prep.</p>
      
      <h3>Schedule Your Prep Time</h3>
      <p>Set aside a specific time each week for meal prepping, like Sunday afternoon.</p>
    `,
    date: "November 8, 2023",
    image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    author: "Nutritionist Sam",
    tags: ["Meal Prep", "Time-Saving", "Healthy Eating"]
  },
  {
    id: "3",
    title: "The Ultimate Guide to Baking Bread",
    content: `
      <p>There's nothing quite like the aroma of freshly baked bread filling your home. With these tips, you'll be baking like a pro in no time:</p>
      
      <h3>Understand Your Ingredients</h3>
      <p>Flour, water, salt, and yeast form the foundation of most breads. Learn how each component affects your final loaf.</p>
      
      <h3>Invest in a Kitchen Scale</h3>
      <p>Bread baking is a science, and precise measurements are key to consistent results.</p>
      
      <h3>Master the Art of Kneading</h3>
      <p>Proper kneading develops gluten, which gives bread its structure. Learn to feel when your dough is properly developed.</p>
      
      <h3>Be Patient with Fermentation</h3>
      <p>Good bread takes time. Cold fermentation in the refrigerator can develop complex flavors.</p>
      
      <h3>Create Steam in Your Oven</h3>
      <p>Professional bakeries use steam ovens. At home, you can mimic this with a Dutch oven or a pan of water.</p>
      
      <h3>Learn to Shape</h3>
      <p>Proper shaping builds tension in the dough, helping it rise upward rather than outward.</p>
      
      <h3>Let It Cool</h3>
      <p>As tempting as it is to slice into warm bread, allowing it to cool completely allows the crumb structure to set.</p>
      
      <h3>Experiment with Flours</h3>
      <p>Once you've mastered basic bread, try incorporating whole wheat, rye, or specialty flours.</p>
    `,
    date: "November 1, 2023",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    author: "Baker Tim",
    tags: ["Baking", "Bread", "Sourdough"]
  }
];

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the post with the matching ID
  const post = blogPosts.find(post => post.id === id);
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="font-heading text-3xl font-semibold mb-4">Blog Post Not Found</h1>
            <Link to="/blog" className="text-food-green hover:text-food-light-green">
              Return to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-food-green hover:text-food-light-green mb-6">
              <ArrowLeft size={18} className="mr-2" />
              Back to Blog
            </Link>
            
            <div className="mb-8">
              <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-6">{post.title}</h1>
              <div className="flex flex-wrap gap-4 text-food-medium-gray mb-6">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  <span>By {post.author}</span>
                </div>
              </div>
              
              <div className="aspect-[16/9] rounded-lg overflow-hidden mb-8">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div 
                className="prose prose-lg max-w-none" 
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <div className="flex flex-wrap gap-2 mt-8">
                {post.tags.map(tag => (
                  <div key={tag} className="flex items-center bg-food-beige px-3 py-1 rounded-full">
                    <Tag size={14} className="mr-1 text-food-green" />
                    <span className="text-sm">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
