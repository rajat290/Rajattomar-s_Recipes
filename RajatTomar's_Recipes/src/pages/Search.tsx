import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import RecipeCard from '@/components/RecipeCard';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { searchRecipes } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const query = searchParams.get('q') || '';
  const diet = searchParams.get('diet') || undefined;
  const intolerances = searchParams.get('intolerances') || undefined;
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query, diet, intolerances, currentPage]);

  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ['search', query, diet, intolerances, currentPage],
    queryFn: () => searchRecipes(query, diet, intolerances, currentPage),
    enabled: !!query
  });

  useEffect(() => {
    if (searchResults?.totalPages) {
      setTotalPages(searchResults.totalPages);
    }
  }, [searchResults]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 page-transition">
        {/* Search Header */}
        <section className="bg-food-beige py-12 mb-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 transition-all duration-700 ${
              isLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'
            }`}>
              Search Results for "{query}"
            </h1>
            <p className={`text-food-medium-gray max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
            }`}>
              Explore our delicious recipes based on your search query.
            </p>
          </div>
        </section>
        
        {/* Search Results */}
        <section className="container mx-auto px-4 mb-16">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin h-8 w-8 border-4 border-food-green border-t-transparent rounded-full"></div>
            </div>
          ) : error ? (
            <Card className="mx-auto max-w-lg">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Error Loading Results</h3>
                <p className="text-food-medium-gray">
                  We couldn't load the search results. Please try again later.
                </p>
              </CardContent>
            </Card>
          ) : searchResults?.recipes && searchResults.recipes.length > 0 ? (
            <div className="recipe-grid">
              {searchResults.recipes.map((recipe, index) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  category={recipe.category}
                  prepTime={recipe.prepTime}
                  delay={index * 100}
                />
              ))}
            </div>
          ) : (
            <Card className="mx-auto max-w-lg">
              <CardContent className="p-6 text-center">
                <SearchIcon size={48} className="mx-auto mb-4 text-food-medium-gray" />
                <h3 className="text-xl font-semibold mb-2">No Recipes Found</h3>
                <p className="text-food-medium-gray">
                  We couldn't find any recipes matching your search criteria. Please try a different search.
                </p>
                <Link to="/" className="text-food-green hover:text-food-light-green transition-colors mt-4 inline-block">
                  Back to Home
                </Link>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="container mx-auto px-4 mb-16">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious 
                      href={`/search?q=${query}&page=${currentPage - 1}`}
                    />
                  </PaginationItem>
                )}
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      href={`/search?q=${query}&page=${page}`}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext 
                      href={`/search?q=${query}&page=${currentPage + 1}`}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </section>
        )}
        
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;