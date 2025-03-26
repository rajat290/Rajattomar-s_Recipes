
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Categories for dropdown menu
  const categories = [
    { name: "Breakfast", href: "/category/breakfast" },
    { name: "Lunch", href: "/category/lunch" },
    { name: "Dinner", href: "/category/dinner" },
    { name: "Desserts", href: "/category/desserts" },
    { name: "Snacks", href: "/category/snacks" },
    { name: "Vegetarian", href: "/category/vegetarian" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-food-dark-gray">
              Rajattomar's Recipes
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/recipes">Recipes</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories.map((category) => (
                        <li key={category.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={category.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{category.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/meal-planning">Meal Planning</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/about">About</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <form onSubmit={handleSearch} className="relative ml-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes..."
                className="w-0 bg-transparent border-b border-transparent focus:w-40 focus:border-food-green transition-all duration-300 focus:outline-none pr-8"
                aria-label="Search recipes"
              />
              <button 
                type="submit"
                aria-label="Search"
                className="absolute right-0 top-0 p-1 text-food-dark-gray hover:text-food-green transition-colors"
              >
                <Search size={20} />
              </button>
            </form>
            
            {user ? (
              <Link to="/profile">
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-food-green flex items-center justify-center text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:inline">My Account</span>
                </Button>
              </Link>
            ) : (
              <Link to="/sign-in">
                <Button variant="outline" className="flex items-center gap-2">
                  <User size={18} />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button - Now using Sheet from shadcn/ui */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="md:hidden p-2 text-food-dark-gray"
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[385px] pt-12">
              <div className="flex flex-col items-center justify-start h-full space-y-6 text-xl">
                <Link to="/recipes" className="nav-link w-full text-center">Recipes</Link>
                
                <div className="flex flex-col items-center space-y-3 w-full">
                  <div className="flex items-center">
                    <span className="nav-link">Categories</span>
                    <ChevronDown size={16} className="ml-1" />
                  </div>
                  <div className="bg-food-beige rounded-md p-3 space-y-2 w-full">
                    {categories.map((category) => (
                      <SheetClose asChild key={category.name}>
                        <Link 
                          to={category.href} 
                          className="block text-sm py-1 w-full text-center"
                        >
                          {category.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
                
                <SheetClose asChild>
                  <Link to="/meal-planning" className="nav-link w-full text-center">Meal Planning</Link>
                </SheetClose>
                
                <SheetClose asChild>
                  <Link to="/about" className="nav-link w-full text-center">About</Link>
                </SheetClose>
                
                {user ? (
                  <SheetClose asChild>
                    <Link to="/profile" className="flex items-center gap-2 mt-4">
                      <div className="w-8 h-8 rounded-full bg-food-green flex items-center justify-center text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span>My Account</span>
                    </Link>
                  </SheetClose>
                ) : (
                  <SheetClose asChild>
                    <Link to="/sign-in" className="flex items-center gap-2 mt-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <User size={18} />
                        <span>Sign In</span>
                      </Button>
                    </Link>
                  </SheetClose>
                )}
                
                <form onSubmit={handleSearch} className="mt-4 flex items-center w-full max-w-xs">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-1 focus:ring-food-green w-full"
                  />
                  <button type="submit" className="bg-food-green text-white p-2 rounded-r">
                    <Search size={20} />
                  </button>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
