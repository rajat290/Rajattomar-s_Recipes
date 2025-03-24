
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

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
              Pinch of Yum
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/recipes" className="nav-link">Recipes</Link>
            <Link to="/category/breakfast" className="nav-link">Breakfast</Link>
            <Link to="/category/dinner" className="nav-link">Dinner</Link>
            <Link to="/category/desserts" className="nav-link">Desserts</Link>
            <Link to="/about" className="nav-link">About</Link>
            <form onSubmit={handleSearch} className="relative">
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
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-food-dark-gray z-10"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6 text-xl">
          <Link to="/recipes" className="nav-link">Recipes</Link>
          <Link to="/category/breakfast" className="nav-link">Breakfast</Link>
          <Link to="/category/dinner" className="nav-link">Dinner</Link>
          <Link to="/category/desserts" className="nav-link">Desserts</Link>
          <Link to="/about" className="nav-link">About</Link>
          
          {user ? (
            <Link to="/profile" className="flex items-center gap-2 mt-4">
              <div className="w-8 h-8 rounded-full bg-food-green flex items-center justify-center text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span>My Account</span>
            </Link>
          ) : (
            <Link to="/sign-in" className="flex items-center gap-2 mt-4">
              <Button variant="outline" className="flex items-center gap-2">
                <User size={18} />
                <span>Sign In</span>
              </Button>
            </Link>
          )}
          
          <form onSubmit={handleSearch} className="mt-4 flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-1 focus:ring-food-green"
            />
            <button type="submit" className="bg-food-green text-white p-2 rounded-r">
              <Search size={20} />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
