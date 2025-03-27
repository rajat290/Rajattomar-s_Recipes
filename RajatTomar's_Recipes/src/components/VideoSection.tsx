import { Play } from 'lucide-react';

const VideoSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="mb-10 text-center">
          <span className="inline-block text-food-green text-sm uppercase tracking-wider font-medium mb-2">
            Watch & Learn
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold">Video Demonstrations</h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
              alt="Chef preparing pasta" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                className="w-20 h-20 bg-white bg-opacity-80 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-90"
                aria-label="Play video"
              >
                <Play size={36} className="text-food-green ml-1" fill="rgba(34, 197, 94, 0.2)" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="text-white font-heading text-2xl">How to Make Perfect Homemade Pasta</h3>
              <p className="text-white/80">Chef Antonio shares his grandmother's authentic Italian pasta recipe</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                <img 
                  src={`https://images.unsplash.com/photo-151${index}878304425-5ab0889f8bc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80`} 
                  alt={`Cooking video thumbnail ${index}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play size={24} className="text-white" fill="rgba(255, 255, 255, 0.3)" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;