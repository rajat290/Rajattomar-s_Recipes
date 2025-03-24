
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Filter, Loader } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { searchRecipes } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

type Recipe = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  sourceUrl: string;
  diets: string[];
};

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const query = searchParams.get('q') || '';
  const diet = searchParams.get('diet') || '';
  const intolerances = searchParams.get('intolerances') || '';
  const page = parseInt(searchParams.get('page') || '1');
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedDiet, setSelectedDiet] = useState(diet);
  const [selectedIntolerances, setSelectedIntolerances] = useState<string[]>(
    intolerances ? intolerances.split(',') : []
  );
  
  // Update local state when URL parameters change
  useEffect(() => {
    setSearchQuery(query);
    setSelectedDiet(diet);
    setSelectedIntolerances(intolerances ? intolerances.split(',') : []);
  }, [query, diet, intolerances]);
  
  // Dietary options
  const diets = [
    { value: '', label: 'No Preference' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'ketogenic', label: 'Ketogenic' },
    { value: 'paleo', label: 'Paleo' }
  ];
  
  // Intolerances options
  const intoleranceOptions = [
    { value: 'dairy', label: 'Dairy' },
    { value: 'egg', label: 'Egg' },
    { value: 'gluten', label: 'Gluten' },
    { value: 'peanut', label: 'Peanut' },
    { value: 'soy', label: 'Soy' },
    { value: 'wheat', label: 'Wheat' }
  ];
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['searchRecipes', query, diet, intolerances, page],
    queryFn: () => searchRecipes(query, diet, intolerances, page),
    enabled: !!query,
    staleTime: 5 * 60 * 1000, // 5 minutes
    onError: () => {
      toast({
        title: "Search Failed",
        description: "Sorry, we couldn't search recipes at this time. Please try again later.",
        variant: "destructive",
      });
    }
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if search query is not empty
    if (!searchQuery.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }
    
    // Update URL parameters
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery.trim());
    if (selectedDiet) params.set('diet', selectedDiet);
    if (selectedIntolerances.length > 0) params.set('intolerances', selectedIntolerances.join(','));
    params.set('page', '1'); // Reset to page 1 on new search
    
    setSearchParams(params);
  };
  
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
    
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const updateIntolerances = (value: string) => {
    setSelectedIntolerances(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-6 text-center">
            {query ? `Search Results for "${query}"` : 'Recipe Search'}
          </h1>
          
          {/* Search Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <div className="relative">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search recipes..."
                      className="pr-10"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <SearchIcon size={18} />
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-44">
                  <Select value={selectedDiet} onValueChange={setSelectedDiet}>
                    <SelectTrigger>
                      <SelectValue placeholder="Diet" />
                    </SelectTrigger>
                    <SelectContent>
                      {diets.map(diet => (
                        <SelectItem key={diet.value} value={diet.value}>
                          {diet.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full md:w-auto flex items-center gap-2"
                      >
                        <Filter size={16} />
                        <span>Filters</span>
                        {selectedIntolerances.length > 0 && (
                          <span className="ml-1 px-2 py-0.5 bg-food-green text-white rounded-full text-xs">
                            {selectedIntolerances.length}
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <h3 className="font-medium">Intolerances</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {intoleranceOptions.map(option => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <Checkbox 
                                id={option.value}
                                checked={selectedIntolerances.includes(option.value)}
                                onCheckedChange={() => updateIntolerances(option.value)}
                              />
                              <Label htmlFor={option.value}>{option.label}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-food-green hover:bg-food-green/90"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
          
          {/* Search Results */}
          <div className="mb-12">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin text-food-green" size={32} />
              </div>
            ) : error ? (
              <div className="text-center p-8 bg-red-50 rounded-lg">
                <p className="text-red-600">An error occurred while searching recipes.</p>
                <p className="text-sm text-food-medium-gray mt-2">Please try again later.</p>
              </div>
            ) : data && data.results?.length > 0 ? (
              <>
                <p className="text-food-medium-gray mb-6">
                  Found {data.totalResults} results. Showing page {page}.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {data.results.map((recipe: Recipe) => (
                    <div key={recipe.id} className="group rounded-lg overflow-hidden border border-gray-200">
                      <div className="aspect-video overflow-hidden bg-gray-100">
                        <img 
                          src={recipe.image} 
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-heading font-medium text-lg mb-2 group-hover:text-food-green transition-colors">
                          <Link to={`/external-recipe/${recipe.id}`}>
                            {recipe.title}
                          </Link>
                        </h3>
                        
                        <div className="flex justify-between text-sm text-food-medium-gray">
                          <span>
                            {recipe.readyInMinutes} min
                          </span>
                          {recipe.diets && recipe.diets.length > 0 && (
                            <span className="capitalize">
                              {recipe.diets[0]}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                {data.totalResults > 12 && (
                  <Pagination className="mt-12">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(Math.max(1, page - 1))}
                          className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                      
                      {/* Page Number Display */}
                      <PaginationItem>
                        <span className="px-4 py-2">
                          Page {page} of {Math.ceil(data.totalResults / 12)}
                        </span>
                      </PaginationItem>
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(page + 1)}
                          className={page >= Math.ceil(data.totalResults / 12) ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : query ? (
              <div className="text-center p-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No recipes found</h3>
                <p className="text-food-medium-gray">
                  Try adjusting your search terms or filters.
                </p>
              </div>
            ) : (
              <div className="text-center p-12 bg-food-beige rounded-lg">
                <h3 className="text-xl font-medium mb-2">Start your culinary journey</h3>
                <p className="text-food-medium-gray mb-4">
                  Search for recipes by keyword, ingredient, or dietary preference.
                </p>
              </div>
            )}
          </div>
          
          <Newsletter />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
