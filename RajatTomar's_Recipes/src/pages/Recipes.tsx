import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import Navbar from '@/components/Navbar';
import RecipeCard from '@/components/RecipeCard';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import { getAllRecipes, getRecipesByCategory } from '@/services/api';
import { categories } from '@/lib/data';

const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const currentPage = parseInt(searchParams.get('page') || '1');
  const [isLoaded, setIsLoaded] = useState(false);

  // Set up recipe data fetching based on active category
  const { data: recipesData, isLoading, error } = useQuery({
    queryKey: ['recipes', activeCategory, currentPage],
    queryFn: () => activeCategory === 'all' 
      ? getAllRecipes(currentPage) 
      : getRecipesByCategory(activeCategory, currentPage),
  });

  const recipes = recipesData?.recipes || [];
  const totalPages = recipesData?.totalPages || 1;

  useEffect(() => {
    // Scroll to top when category or page changes
    window.scrollTo(0, 0);
    
    // Simulate content loading effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeCategory, currentPage]);

  const handleCategoryChange = (category: string) => {
    setSearchParams({ category, page: '1' });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ category: activeCategory, page: page.toString() });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 page-transition">
        {/* Header */}
        <section className="bg-food-beige py-12 mb-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 transition-all duration-700 ${
              isLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'
            }`}>
              Explore Our Recipes
            </h1>
            <p className={`text-food-medium-gray max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
            }`}>
              Browse through our collection of delicious recipes, organized by category. 
              From breakfast to desserts, we have something for every occasion.
            </p>
          </div>
        </section>
        
        {/* Category Tabs */}
        <section className="container mx-auto px-4 mb-10">
          <Tabs 
            defaultValue={activeCategory} 
            value={activeCategory}
            onValueChange={handleCategoryChange}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="bg-food-light-gray">
                <TabsTrigger value="all">All Recipes</TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value={activeCategory} className="mt-0">
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                  <div className="animate-spin h-8 w-8 border-4 border-food-green border-t-transparent rounded-full"></div>
                </div>
              ) : error ? (
                <Card className="mx-auto max-w-lg">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">Error Loading Recipes</h3>
                    <p className="text-food-medium-gray">
                      We couldn't load the recipes. Please try again later.
                    </p>
                  </CardContent>
                </Card>
              ) : recipes.length > 0 ? (
                <div className="recipe-grid">
                  {recipes.map((recipe, index) => (
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
                    <h3 className="text-xl font-semibold mb-2">No Recipes Found</h3>
                    <p className="text-food-medium-gray">
                      We couldn't find any recipes in this category. Please try another category.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <section className="container mx-auto px-4 mb-16">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                      }} 
                    />
                  </PaginationItem>
                )}
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      href="#" 
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                      }} 
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

export default Recipes;
