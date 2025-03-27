import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

// Mock blog data (in a real app, this would come from an API)
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
  }
];

const BlogPostsSection = () => {
  return (
    <section className="py-16 px-4 bg-food-beige">
      <div className="container mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="inline-block text-food-green text-sm uppercase tracking-wider font-medium mb-2">
              Food for Thought
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold">Latest From Our Blog</h2>
          </div>
          <Link 
            to="/blog" 
            className="flex items-center mt-4 md:mt-0 text-food-green hover:text-food-light-green transition-colors"
          >
            View All Posts
            <ArrowRight size={18} className="ml-2" />
          </Link>
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
    </section>
  );
};

export default BlogPostsSection;