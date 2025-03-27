import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Mock blog data (in a real app, this would come from an API or database)
const blogPosts = [
  {
    id: 1,
    title: "Top 10 Kitchen Gadgets of 2023",
    excerpt: "Discover the must-have kitchen tools that will revolutionize your cooking experience.",
    date: "November 15, 2023",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    author: "Chef Maria"
  },
  {
    id: 2,
    title: "The Art of Meal Prepping",
    excerpt: "Learn how to save time and eat healthier with these meal prepping strategies.",
    date: "November 8, 2023",
    image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    author: "Nutritionist Sam"
  },
  {
    id: 3,
    title: "The Ultimate Guide to Baking Bread",
    excerpt: "Everything you need to know about creating perfect homemade bread from scratch.",
    date: "November 1, 2023",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    author: "Baker Tim"
  },
  {
    id: 4,
    title: "Cooking with Cast Iron: Tips and Tricks",
    excerpt: "Master the art of cast iron cooking with these essential tips for care and cooking.",
    date: "October 25, 2023",
    image: "https://images.unsplash.com/photo-1544789342-71653d756163?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    author: "Chef Maria"
  },
  {
    id: 5,
    title: "Seasonal Ingredients: Winter Edition",
    excerpt: "Discover the best winter ingredients and how to incorporate them into your cooking.",
    date: "October 18, 2023",
    image: "https://images.unsplash.com/photo-1511994714008-b6d68a8b32a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    author: "Farmer Jane"
  },
  {
    id: 6,
    title: "International Flavors: Thai Cuisine",
    excerpt: "A beginner's guide to the essential ingredients and techniques in Thai cooking.",
    date: "October 11, 2023",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    author: "Chef Tom"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-4">Our Blog</h1>
            <p className="text-food-medium-gray text-lg">
              Tips, tricks, and culinary inspiration to elevate your cooking journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="text-sm text-food-medium-gray mb-2">{post.date} • By {post.author}</div>
                  <CardTitle className="text-xl font-heading">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-food-medium-gray">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link to={`/blog/${post.id}`} className="text-food-green hover:text-food-light-green">
                    Read More
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;