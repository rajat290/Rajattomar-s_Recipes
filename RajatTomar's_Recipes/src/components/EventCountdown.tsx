import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const EventCountdown = () => {
  // Set the event date (e.g., a cooking workshop or live event)
  const eventDate = new Date('2024-01-15T18:00:00');
  const eventName = "Live Cooking Workshop: Holiday Feasts";
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = eventDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    
    // Calculate immediately
    calculateTimeLeft();
    
    // Set up interval for countdown
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Clean up interval
    return () => clearInterval(timer);
  }, []);
  
  return (
    <section className="py-16 px-4 bg-food-beige">
      <div className="container mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="flex items-center mb-4">
                <Calendar className="text-food-green mr-2" />
                <span className="text-food-green text-sm uppercase tracking-wider font-medium">
                  Upcoming Event
                </span>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">{eventName}</h2>
              <p className="text-food-medium-gray mb-6">
                Join our expert chefs for this special live cooking demonstration where you'll learn how to prepare the perfect holiday feast for your family and friends!
              </p>
              <button className="btn btn-primary">
                Register Now
              </button>
            </div>
            
            <div className="md:w-1/2 grid grid-cols-4 gap-2 md:gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-food-beige rounded-md p-2 md:p-4">
                    <div className="font-heading text-xl md:text-3xl font-semibold text-food-green">
                      {value}
                    </div>
                    <div className="text-food-medium-gray text-xs md:text-sm capitalize">
                      {unit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCountdown;