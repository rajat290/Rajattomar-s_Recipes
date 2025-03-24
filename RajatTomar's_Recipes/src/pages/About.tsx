import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 page-transition">
        {/* Hero Section */}
        <section className="container mx-auto px-4 max-w-4xl mb-16">
          <div className={`text-center mb-12 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="inline-block text-food-green text-sm uppercase tracking-wider font-medium mb-2">
              Our Story
            </span>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              About Pinch of Yum
            </h1>
            <p className="text-food-medium-gray max-w-2xl mx-auto">
              A food blog with simple, tasty, and (mostly) healthy recipes.
            </p>
          </div>
          
          <div className={`aspect-[16/9] rounded-lg overflow-hidden mb-10 transition-all duration-700 delay-100 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <img 
              src="https://images.unsplash.com/photo-1556909114-44e3e9699e2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Kitchen with ingredients" 
              className="w-full h-full object-cover animate-image-fade"
            />
          </div>
        </section>
        
        {/* Story Section */}
        <section className="container mx-auto px-4 max-w-4xl mb-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className={`transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-6">
                The Journey Begins
              </h2>
              <p className="text-food-medium-gray mb-4">
                Pinch of Yum started as a hobby blog in 2010 and has since grown into a full-time business and creative outlet for simple, tasty, and (mostly) healthy recipes.
              </p>
              <p className="text-food-medium-gray mb-4">
                Our mission is to provide approachable recipes that anyone can make, regardless of their cooking experience. We believe good food doesn't have to be complicated.
              </p>
              <p className="text-food-medium-gray">
                Every recipe on Pinch of Yum is thoroughly tested to ensure it works for you at home. We value quality over quantity and focus on creating recipes that bring joy to your kitchen.
              </p>
            </div>
            
            <div className={`transition-all duration-700 delay-300 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Person cooking" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Meet the Team Section */}
        <section className="bg-food-beige py-20 mb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className={`text-center mb-12 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <span className="inline-block text-food-green text-sm uppercase tracking-wider font-medium mb-2">
                The People
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-6">
                Meet the Team
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className={`bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <div className="aspect-[4/3]">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                    alt="Sarah Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-2">Sarah Johnson</h3>
                  <p className="text-food-green mb-4">Founder & Recipe Developer</p>
                  <p className="text-food-medium-gray mb-6">
                    Sarah is the founder of Pinch of Yum, creator of all recipes, and the writer, photographer, and publisher of each post. She loves cooking, eating, photographing, and sharing good food.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-food-medium-gray hover:text-food-green transition-colors">
                      <Instagram size={18} />
                    </a>
                    <a href="#" className="text-food-medium-gray hover:text-food-green transition-colors">
                      <Twitter size={18} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className={`bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <div className="aspect-[4/3]">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                    alt="Michael Roberts" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-2">Michael Roberts</h3>
                  <p className="text-food-green mb-4">Food Photographer</p>
                  <p className="text-food-medium-gray mb-6">
                    Michael is our resident food photographer responsible for capturing the beauty of each recipe. He has a talent for making food look as delicious as it tastes.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-food-medium-gray hover:text-food-green transition-colors">
                      <Instagram size={18} />
                    </a>
                    <a href="#" className="text-food-medium-gray hover:text-food-green transition-colors">
                      <BookOpen size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="container mx-auto px-4 max-w-2xl mb-20">
          <div className={`text-center mb-10 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="inline-block text-food-green text-sm uppercase tracking-wider font-medium mb-2">
              Get In Touch
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-6">
              Contact Us
            </h2>
            <p className="text-food-medium-gray">
              Have a question, suggestion, or just want to say hello? We'd love to hear from you!
            </p>
          </div>
          
          <div className={`bg-white rounded-lg shadow-sm p-8 transition-all duration-700 delay-100 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-food-dark-gray mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-food-green"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-food-dark-gray mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-food-green"
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-food-dark-gray mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-food-green"
                  placeholder="Subject"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-food-dark-gray mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={6}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-food-green"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
          
          <div className={`mt-8 text-center text-food-medium-gray transition-all duration-700 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <p>
              For business inquiries, please email: <a href="mailto:hello@pinchofyum.com" className="text-food-green">hello@pinchofyum.com</a>
            </p>
          </div>
        </section>
        
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
