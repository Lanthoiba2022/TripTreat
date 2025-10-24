import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  MapPin,
  Star,
  Users,
  Wifi,
  Coffee,
  UtensilsCrossed,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { allHomestays } from './homestays-data';
import AddToWishlistButton from '../components/AddToWishlistButton';

const HomestaysPage = () => {
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [filteredHomestays, setFilteredHomestays] = useState(allHomestays);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    wifi: false,
    traditionalMeals: false,
    guidedTours: false,
    culturalActivities: false,
    bicycleRental: false,
    organicFarm: false,
    yogaPavilion: false,
    starGazing: false,
    mountainView: false,
    spaServices: false,
    petFriendly: false,
    airCond: false,
    hotWater: false,
    lakeView: false,
    freeParking: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const filtered = allHomestays.filter(homestay => {
      // Filter by price range
      const withinPriceRange =
        homestay.price >= priceRange[0] && homestay.price <= priceRange[1];

      // Filter by search term
      const matchesSearch =
        homestay.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        homestay.location.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by amenities
      const hasWifi = !filters.wifi || homestay.amenities.includes('Wifi');
      const hasMeals =
        !filters.traditionalMeals ||
        homestay.amenities.includes('Traditional Meals');
      const hasTours =
        !filters.guidedTours || homestay.amenities.includes('Guided Tours');
      const hasCultural =
        !filters.culturalActivities ||
        homestay.amenities.includes('Cultural Activities');
      const haslakeView =
        !filters.lakeView || homestay.amenities.includes('Lake View');
      const hasfreeParking =
        !filters.freeParking || homestay.amenities.includes('Free Parking');
      const hashotWater =
        !filters.hotWater || homestay.amenities.includes('Hot Water');
      const hasairCond =
        !filters.airCond || homestay.amenities.includes('Air Conditioning');
      const haspetFriendly =
        !filters.petFriendly || homestay.amenities.includes('Pet Friendly');
      const hasspaServices =
        !filters.spaServices || homestay.amenities.includes('Spa Services');
      const hasmountainView =
        !filters.mountainView || homestay.amenities.includes('Mountain View');
      const hasstarGazing =
        !filters.starGazing || homestay.amenities.includes('Stargazing');
      const hasyogaPavilion =
        !filters.yogaPavilion || homestay.amenities.includes('Yoga Pavilion');
      const hasorganicFarm =
        !filters.organicFarm || homestay.amenities.includes('Organic Farm');
      const hasbicycleRental =
        !filters.bicycleRental || homestay.amenities.includes('Bicycle Rental');

      return (
        withinPriceRange &&
        matchesSearch &&
        hasWifi &&
        hasMeals &&
        hasTours &&
        hasCultural &&
        haslakeView &&
        hasfreeParking &&
        hashotWater &&
        hasairCond &&
        haspetFriendly &&
        hasspaServices &&
        hasmountainView &&
        hasstarGazing &&
        hasyogaPavilion &&
        hasorganicFarm &&
        hasbicycleRental
      );
    });

    setFilteredHomestays(filtered);
    setCurrentPage(1);
  };

  const displayedHomestays = filteredHomestays.slice(
    0,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="relative h-[300px] mb-8">
        <img
          src="/file-uploads/homecar.jpg"
          alt="Manipur Homestays"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Homestays in Manipur
          </h1>
          <p className="text-xl text-white/90">
            Experience authentic Manipuri hospitality and traditions
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              <form onSubmit={handleSearch}>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Search
                  </label>
                  <Input
                    type="text"
                    placeholder="Location or homestay name"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Price Range (₹{priceRange[0]} - ₹{priceRange[1]})
                  </label>
                  <Slider
                    value={priceRange}
                    min={500}
                    max={2000}
                    step={100}
                    onValueChange={value =>
                      setPriceRange(value as [number, number])
                    }
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹500</span>
                    <span>₹2000</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Amenities
                  </label>
                  {[
                    'traditionalMeals',
                    'guidedTours',
                    'culturalActivities',
                    'organicFarm',
                    'yogaPavilion',
                    'starGazing',
                    'mountainView',
                    'spaServices',
                  ].map(filterKey => (
                    <div
                      key={filterKey}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={filterKey}
                        checked={filters[filterKey as keyof typeof filters]}
                        onCheckedChange={checked =>
                          setFilters(prev => ({
                            ...prev,
                            [filterKey]: checked,
                          }))
                        }
                      />
                      <label htmlFor={filterKey} className="text-sm capitalize">
                        {filterKey.replace(/([A-Z])/g, ' $1')}
                      </label>
                    </div>
                  ))}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Apply Filters
                </Button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">
                {filteredHomestays.length} homestays found
              </h2>
              <p className="text-muted-foreground">
                Discover your perfect stay in beautiful Manipur
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {displayedHomestays.map(homestay => (
                <div
                  key={homestay.id}
                  className="listing-card animate-scale-in"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={homestay.images[0]}
                      alt={homestay.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 text-sm font-semibold flex items-center">
                      <Star
                        size={16}
                        className="text-yellow-500 mr-1 fill-yellow-500"
                      />
                      {homestay.rating}{' '}
                      <span className="text-muted-foreground ml-1">
                        ({homestay.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold">{homestay.name}</h3>
                      <span className="text-lg font-bold text-primary">
                        ₹{homestay.price}
                        <span className="text-sm text-muted-foreground font-normal">
                          /night
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin size={14} className="mr-1" />
                      {homestay.location}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {homestay.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-muted px-2 py-1 rounded-full flex items-center">
                        <Users size={12} className="mr-1" /> {homestay.guests}{' '}
                        guests
                      </span>
                      {homestay.amenities.slice(0, 2).map((amenity, index) => (
                        <span
                          key={index}
                          className="text-xs bg-muted px-2 py-1 rounded-full flex items-center"
                        >
                          {amenity === 'Wifi' ? (
                            <Wifi size={12} className="mr-1" />
                          ) : amenity === 'Traditional Meals' ? (
                            <UtensilsCrossed size={12} className="mr-1" />
                          ) : null}
                          {amenity}
                        </span>
                      ))}
                      {homestay.amenities.length > 2 && (
                        <span className="text-xs bg-muted px-2 py-1 rounded-full">
                          +{homestay.amenities.length - 2} more
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        className="w-full bg-primary hover:bg-primary/90"
                        asChild
                      >
                        <Link to={`/homestays/${homestay.id}`}>View Details</Link>
                      </Button>
                      <AddToWishlistButton itemId={homestay.id} itemType="homestay" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {currentPage * itemsPerPage < filteredHomestays.length && (
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-8 py-4 text-lg"
                >
                  View More
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomestaysPage;
