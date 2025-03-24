import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-heading text-xl font-semibold mb-4">About</h4>
            <p className="text-food-medium-gray mb-4">
              Pinch of Yum is a food blog with simple, tasty, and (mostly) healthy recipes.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="text-food-medium-gray hover:text-food-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" className="text-food-medium-gray hover:text-food-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://pinterest.com" className="text-food-medium-gray hover:text-food-green transition-colors">
                <BookOpen size={20} />
              </a>
              <a href="https://twitter.com" className="text-food-medium-gray hover:text-food-green transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/recipes" className="text-food-medium-gray hover:text-food-green transition-colors">All Recipes</Link></li>
              <li><Link to="/category/breakfast" className="text-food-medium-gray hover:text-food-green transition-colors">Breakfast</Link></li>
              <li><Link to="/category/dinner" className="text-food-medium-gray hover:text-food-green transition-colors">Dinner</Link></li>
              <li><Link to="/category/desserts" className="text-food-medium-gray hover:text-food-green transition-colors">Desserts</Link></li>
              <li><Link to="/about" className="text-food-medium-gray hover:text-food-green transition-colors">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-xl font-semibold mb-4">Popular Recipes</h4>
            <ul className="space-y-2">
              <li><Link to="/recipe/1" className="text-food-medium-gray hover:text-food-green transition-colors">Creamy Garlic Pasta</Link></li>
              <li><Link to="/recipe/2" className="text-food-medium-gray hover:text-food-green transition-colors">Chocolate Chip Cookies</Link></li>
              <li><Link to="/recipe/3" className="text-food-medium-gray hover:text-food-green transition-colors">Vegetable Stir Fry</Link></li>
              <li><Link to="/recipe/4" className="text-food-medium-gray hover:text-food-green transition-colors">Banana Bread</Link></li>
              <li><Link to="/recipe/5" className="text-food-medium-gray hover:text-food-green transition-colors">Roasted Chicken</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-xl font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/category/breakfast" className="text-food-medium-gray hover:text-food-green transition-colors">Breakfast</Link></li>
              <li><Link to="/category/lunch" className="text-food-medium-gray hover:text-food-green transition-colors">Lunch</Link></li>
              <li><Link to="/category/dinner" className="text-food-medium-gray hover:text-food-green transition-colors">Dinner</Link></li>
              <li><Link to="/category/desserts" className="text-food-medium-gray hover:text-food-green transition-colors">Desserts</Link></li>
              <li><Link to="/category/vegan" className="text-food-medium-gray hover:text-food-green transition-colors">Vegan</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-center text-food-medium-gray">
          <p className="mb-2">© {new Date().getFullYear()} Pinch of Yum. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link to="/privacy" className="hover:text-food-green">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-food-green">Terms of Use</Link>
            <Link to="/contact" className="hover:text-food-green">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
