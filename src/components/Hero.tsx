import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const heroImages = [
  {
    url: '/file-uploads/loktakComplete.png',
    alt: 'Beautiful landscape in Manipur',
    title: 'Loktak Lake',
  },
  {
    url: '/file-uploads/sangolKangjei.jpg',
    alt: 'Origin of Polo',
    title: 'Sagol Kangjei',
  },
  {
    url: '/file-uploads/Hills.jpg',
    alt: 'Beautiful Hill regions',
    title: 'Hill View',
  },
  {
    url: '/file-uploads/pottery.jpg',
    alt: 'Beautiful pottery in Manipur',
    title: 'Pottery',
  },
  {
    url: '/file-uploads/foodcar1.png',
    alt: 'Traditional Manipuri cusinies',
    title: 'Cultural food',
  },
  {
    url: '/file-uploads/marjing.png',
    alt: 'Marjing statue',
    title: 'Marjing',
  },
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    toast.success(`Searching for "${searchTerm}"`, {
      description: 'Taking you to our curated homestay results',
    });

    // Navigate to homestays page with search param
    navigate(`/homestays?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="relative h-[600px] md:h-[650px] lg:h-[700px] overflow-hidden">
      {/* Hero Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay"></div>
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center text-white">
        <div className="animate-fade-in text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Delight in Every
            <span
              className="animate-gradient-flow 
    bg-[length:300%_300%]
    bg-clip-text text-transparent 
    bg-gradient-to-r from-amber-400 via-purple-400 to-emerald-400
    inline-block
    transition-all duration-1000
    hover:scale-105 hover:rotate-1 hover:drop-shadow-[0_4px_24px_rgba(251,191,36,0.3)]"
            >
              Destination
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90">
            Experience Manipur's rich culture, stunning landscapes, and warm
            hospitality
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="bg-white/10 backdrop-blur-md p-3 rounded-lg flex flex-col md:flex-row gap-2 w-full max-w-3xl mx-auto mb-8"
          >
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full p-3 bg-white/80 backdrop-blur-sm rounded-md text-foreground"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              className="bg-primary hover:bg-primary/90 text-white h-12 px-6"
              type="submit"
            >
              <Search size={18} className="mr-2" /> Search
            </Button>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="cta-button bg-manipur-green hover:bg-manipur-green/90 transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              asChild
            >
              <Link to="/homestays">Explore Homestays</Link>
            </Button>

            <Button
              className="cta-button bg-manipur-pink hover:bg-manipur-pink/90 transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              asChild
            >
              <Link to="/become-host">Become a Host</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentImage ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
