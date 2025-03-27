import { Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const popularTags = [
  { id: 'quick-meals', name: 'Quick Meals', count: 42 },
  { id: 'vegetarian', name: 'Vegetarian', count: 36 },
  { id: 'gluten-free', name: 'Gluten Free', count: 28 },
  { id: 'low-carb', name: 'Low Carb', count: 24 },
  { id: 'high-protein', name: 'High Protein', count: 19 },
  { id: 'one-pot', name: 'One Pot', count: 17 },
  { id: 'keto', name: 'Keto', count: 15 },
  { id: 'desserts', name: 'Desserts', count: 32 }
];

const PopularTags = () => {
  return (
    <section className="py-16 px-4 bg-food-green/5">
      <div className="container mx-auto">
        <div className="mb-10 text-center">
          <span className="inline-block text-food-green text-sm uppercase tracking-wider font-medium mb-2">
            Browse By
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold">Popular Tags & Trends</h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {popularTags.map((tag) => (
            <Link 
              key={tag.id}
              to={`/search?tag=${tag.id}`}
              className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:bg-food-green hover:text-white group"
            >
              <Tag size={16} className="mr-2 text-food-green group-hover:text-white" />
              <span>{tag.name}</span>
              <span className="ml-2 bg-food-beige text-food-medium-gray px-2 py-0.5 rounded-full text-xs group-hover:bg-white group-hover:text-food-dark-gray">
                {tag.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTags;