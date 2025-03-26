
import React from 'react';
import { Calendar, ShoppingCart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MealPlanner from '@/components/MealPlanner';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const MealPlanning = () => {
  const navigate = useNavigate();
  
  const handleGenerateShoppingList = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The shopping list feature will be available in a future update.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Meal Planning</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="inline-block text-food-green text-sm uppercase tracking-wider font-medium mb-2">
                Plan Your Week
              </span>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold">Meal Planning</h1>
            </div>
            
            <Button 
              className="mt-4 md:mt-0 bg-food-green hover:bg-food-green/90 flex items-center gap-2"
              onClick={handleGenerateShoppingList}
            >
              <ShoppingCart size={16} />
              Generate Shopping List
            </Button>
          </div>
          
          <p className="text-food-medium-gray mb-8 max-w-3xl">
            Plan your meals for the entire week. Select recipes for each meal of the day and generate
            a shopping list with all the ingredients you'll need.
          </p>
          
          <MealPlanner />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MealPlanning;
