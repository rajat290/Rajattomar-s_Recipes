import { useState } from 'react';
import { ChevronRight, ChevronLeft, Coffee } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const cookingTips = [
  {
    id: 1,
    title: "Salt Your Pasta Water",
    tip: "Add salt to your pasta water only after it starts boiling. This prevents pitting in stainless steel pots and ensures proper seasoning.",
    icon: "Salt"
  },
  {
    id: 2,
    title: "Rest Meat After Cooking",
    tip: "Always let meat rest for 5-10 minutes after cooking. This allows juices to redistribute, resulting in a more flavorful and tender dish.",
    icon: "Clock"
  },
  {
    id: 3,
    title: "Keep Herbs Fresh Longer",
    tip: "Store fresh herbs like cut flowers in a glass of water in your refrigerator, covering them loosely with a plastic bag to extend their freshness.",
    icon: "Flower"
  },
  {
    id: 4,
    title: "Sharpen Knives Regularly",
    tip: "A sharp knife is safer than a dull one because it requires less force to cut. Have knives professionally sharpened, or learn to use a sharpening steel.",
    icon: "Scissors"
  },
  {
    id: 5,
    title: "Room Temperature Ingredients",
    tip: "When baking, use room temperature eggs and dairy for better incorporation and consistent results, especially in cakes and cookies.",
    icon: "Egg"
  }
];

const CookingTips = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="mb-10 text-center">
          <span className="inline-block text-food-green text-sm uppercase tracking-wider font-medium mb-2">
            Pro Techniques
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold">Cooking Tips & Tricks</h2>
        </div>
        
        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {cookingTips.map((tip) => (
              <CarouselItem key={tip.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4 flex justify-center">
                      <div className="w-12 h-12 bg-food-green/10 rounded-full flex items-center justify-center">
                        <Coffee className="text-food-green" size={24} />
                      </div>
                    </div>
                    <h3 className="text-center font-heading text-xl font-semibold mb-3">{tip.title}</h3>
                    <p className="text-food-medium-gray text-center flex-grow">{tip.tip}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex -left-6" />
          <CarouselNext className="hidden lg:flex -right-6" />
        </Carousel>
        
        <div className="flex justify-center mt-8 gap-2 lg:hidden">
          <button className="btn btn-outline p-2" aria-label="Previous tip">
            <ChevronLeft size={20} />
          </button>
          <button className="btn btn-outline p-2" aria-label="Next tip">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CookingTips;
