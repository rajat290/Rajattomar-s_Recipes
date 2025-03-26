
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  category: string;
  prepTime: string;
  delay?: number;
}

const RecipeCard = ({ id, title, image, category, prepTime, delay = 0 }: RecipeCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a small delay for staggered animation
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true); // Consider the image "loaded" even if it's an error
  };

  // Fallback image when the original image fails to load
  const fallbackImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  return (
    <div 
      ref={cardRef} 
      className={`card-hover rounded-md overflow-hidden bg-white transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <Link to={`/recipe/${id}`} className="block">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={imageError ? fallbackImage : image}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'scale-100 filter-none' : 'scale-105 blur-sm'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-white px-3 py-1 text-xs uppercase tracking-wider font-medium text-food-dark-gray">
              {category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-heading text-xl font-semibold mb-2 hover:text-food-green transition-colors">
            {title}
          </h3>
          <p className="text-food-medium-gray text-sm">{prepTime}</p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
