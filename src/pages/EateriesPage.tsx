import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Star,
  Clock,
  User,
  UtensilsCrossed,
  Phone,
  Globe,
  ThumbsUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ReservationDialog from '@/components/ReservationDialog';
import ContactDialog from '@/components/ContactDialog';
import AddToWishlistButton from '../components/AddToWishlistButton';

const eateries = [
  {
    id: 1,
    name: 'Manipuri Heritage Kitchen',
    location: 'Imphal, Manipur',
    description:
      'Experience authentic Manipuri cuisine prepared with traditional methods and locally sourced ingredients. Our specialty dishes include Eromba and Chamthong.',
    image: '/file-uploads/herkit.jpg',
    priceRange: '₹1200',
    cuisine: 'Traditional Manipuri',
    rating: 4.8,
    reviews: 32,
    openingHours: '11:00 AM - 10:00 PM',
    phone: '+91 9876543210',
    website: 'www.manipuriheritage.com',
    specialties: ['Eromba', 'Chamthong', 'Black Rice Dessert', 'Ngari Chutney'],
    features: [
      'Outdoor Seating',
      'Vegetarian Options',
      'Family-friendly',
      'Authentic Experience',
    ],
  },
  {
    id: 2,
    name: 'Loktak Floating Restaurant',
    location: 'Moirang, Manipur',
    description:
      'Dine on a traditional floating hut on Loktak Lake while enjoying freshwater fish dishes and spectacular views of the floating phumdis.',
    image: '/file-uploads/lokres.jpg',
    priceRange: '₹1100',
    cuisine: 'Seafood, Manipuri',
    rating: 4.9,
    reviews: 47,
    openingHours: '12:00 PM - 9:00 PM',
    phone: '+91 9876543211',
    website: 'www.loktakrestaurant.com',
    specialties: [
      'Grilled Lake Fish',
      'Fish Curry',
      'Seasonal Vegetables',
      'Herbal Teas',
    ],
    features: ['Lake View', 'Romantic', 'Unique Setting', 'Sunset Dining'],
  },
  {
    id: 3,
    name: 'Ima Keithel Food Court',
    location: 'Imphal, Manipur',
    description:
      "Located near the famous women's market, this food court serves quick and delicious local snacks and meals prepared by Manipuri women using traditional recipes.",
    image: '/file-uploads/imafoo.jpg',
    priceRange: '₹1900',
    cuisine: 'Street Food, Manipuri',
    rating: 4.6,
    reviews: 68,
    openingHours: '8:00 AM - 7:00 PM',
    phone: '+91 9876543212',
    website: null,
    specialties: ['Singju', 'Pakora', 'Momos', 'Chak-hao Kheer'],
    features: [
      'Quick Service',
      'Budget-friendly',
      'Authentic',
      'Local Experience',
    ],
  },
  {
    id: 4,
    name: 'Bamboo Hut Garden Cafe',
    location: 'Ukhrul, Manipur',
    description:
      'A serene cafe built with bamboo surrounded by a beautiful garden, serving organic teas, coffees and fusion cuisine with Tangkhul tribal influences.',
    image: '/file-uploads/bamfoo.jpg',
    priceRange: '₹1000',
    cuisine: 'Tangkhul, Fusion',
    rating: 4.7,
    reviews: 29,
    openingHours: '9:00 AM - 8:00 PM',
    phone: '+91 9876543213',
    website: 'www.bamboohutcafe.com',
    specialties: [
      'Bamboo-steamed Cakes',
      'Wild Herb Tea',
      'Mountain Rice',
      'Smoked Meat',
    ],
    features: [
      'Garden Seating',
      'Organic',
      'Mountain View',
      'Live Music Weekends',
    ],
  },
  {
    id: 5,
    name: 'Royal Kangla Kitchen',
    location: 'Imphal East, Manipur',
    description:
      'Fine dining restaurant celebrating the royal culinary heritage of Manipur with elegant presentations and traditional flavors.',
    image: '/file-uploads/royalfoo.jpg',
    priceRange: '₹1600',
    cuisine: 'Royal Manipuri',
    rating: 4.9,
    reviews: 41,
    openingHours: '12:00 PM - 11:00 PM',
    phone: '+91 9876543214',
    website: 'www.royalkangla.com',
    specialties: [
      'Royal Fish Curry',
      'Ceremonial Rice Platter',
      'Palace Chicken',
      'Royal Thali',
    ],
    features: [
      'Fine Dining',
      'Historical Setting',
      'Dress Code',
      'Reservations Required',
    ],
  },
  {
    id: 6,
    name: 'Valley Organic Bistro',
    location: 'Bishnupur, Manipur',
    description:
      'A farm-to-table bistro serving wholesome meals made with organic produce grown in their own fields. Perfect for health-conscious diners.',
    image: '/file-uploads/orgfoo.jpg',
    priceRange: '₹1300',
    cuisine: 'Organic, Vegan-friendly',
    rating: 4.7,
    reviews: 36,
    openingHours: '10:00 AM - 9:00 PM',
    phone: '+91 9876543215',
    website: 'www.valleyorganic.com',
    specialties: [
      'Seasonal Salads',
      'Foraged Mushroom Dishes',
      'Whole Grain Bowls',
      'Fermented Foods',
    ],
    features: [
      'Farm Tours',
      'Vegan Options',
      'Gluten-free Options',
      "Children's Play Area",
    ],
  },
];

const cuisineTypes = [
  'All',
  'Traditional Manipuri',
  'Seafood',
  'Street Food',
  'Royal Manipuri',
  'Fusion',
  'Organic',
];

const EateriesPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEateries, setFilteredEateries] = useState(eateries);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedEatery, setSelectedEatery] = useState(null);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'All') {
      setFilteredEateries(
        eateries.filter(
          eatery =>
            eatery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            eatery.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredEateries(
        eateries.filter(
          eatery =>
            eatery.cuisine.includes(value) &&
            (eatery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              eatery.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
        )
      );
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (activeTab === 'All') {
      setFilteredEateries(
        eateries.filter(
          eatery =>
            eatery.name.toLowerCase().includes(term.toLowerCase()) ||
            eatery.description.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredEateries(
        eateries.filter(
          eatery =>
            eatery.cuisine.includes(activeTab) &&
            (eatery.name.toLowerCase().includes(term.toLowerCase()) ||
              eatery.description.toLowerCase().includes(term.toLowerCase()))
        )
      );
    }
  };

  const handleReservationClick = eatery => {
    setSelectedEatery(eatery);
    setIsReservationOpen(true);
  };

  const handleContactClick = eatery => {
    setSelectedEatery(eatery);
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[300px] mb-8">
        <img
          src="/file-uploads/foodcarou.jpg"
          alt="Manipuri Cuisine"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-fade-in">
            Local Eateries
          </h1>
          <p className="text-xl text-white/90 animate-fade-in transition-all duration-500 delay-150">
            Taste the authentic flavors of Manipur
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="Search eateries..."
              className="md:max-w-sm transition-all focus:shadow-lg"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <Tabs
            defaultValue="All"
            value={activeTab}
            onValueChange={handleTabChange}
          >
            <TabsList className="inline-flex h-auto flex-wrap gap-2 mb-6 bg-transparent">
              {cuisineTypes.map(cuisine => (
                <TabsTrigger
                  key={cuisine}
                  value={cuisine}
                  className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
                >
                  {cuisine}
                </TabsTrigger>
              ))}
            </TabsList>

            {cuisineTypes.map(cuisine => (
              <TabsContent key={cuisine} value={cuisine} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEateries.map(eatery => (
                    <Card
                      key={eatery.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:scale-[1.01] group"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={eatery.image}
                          alt={eatery.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 text-sm font-semibold flex items-center">
                          <Star
                            size={16}
                            className="text-yellow-500 mr-1 fill-yellow-500"
                          />
                          {eatery.rating}{' '}
                          <span className="text-muted-foreground ml-1">
                            ({eatery.reviews})
                          </span>
                        </div>
                        <Badge className="absolute top-3 left-3 bg-primary animate-fade-in">
                          {eatery.priceRange}
                        </Badge>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                          {eatery.name}
                        </h3>

                        <div className="flex items-center text-muted-foreground mb-3">
                          <MapPin size={14} className="mr-1" />
                          <span className="text-sm">{eatery.location}</span>
                          <span className="mx-2">•</span>
                          <span className="text-sm">{eatery.cuisine}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="flex items-center text-sm">
                            <Clock
                              size={14}
                              className="mr-1 text-muted-foreground"
                            />
                            <span>{eatery.openingHours}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <UtensilsCrossed
                              size={14}
                              className="mr-1 text-muted-foreground"
                            />
                            <span>{eatery.specialties.length} specialties</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {eatery.description}
                        </p>

                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                          {eatery.features.slice(0, 2).map((feature, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                          {eatery.features.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{eatery.features.length - 2} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs hover:bg-primary/5 flex items-center gap-1 transition-transform duration-300 hover:scale-[1.02]"
                            onClick={() => handleContactClick(eatery)}
                          >
                            <Phone size={14} className="mr-1" /> Contact
                          </Button>
                          <div className="flex space-x-2">
                            <Button
                              className="bg-primary hover:bg-primary/90 transition-transform duration-300 hover:scale-[1.02]"
                              size="sm"
                              onClick={() => handleReservationClick(eatery)}
                            >
                              Reserve Table
                            </Button>
                            <AddToWishlistButton itemId={eatery.id.toString()} itemType="eatery" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredEateries.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">
                      No eateries found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try a different search term or cuisine type
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setActiveTab('All');
                        setFilteredEateries(eateries);
                      }}
                      className="transition-all duration-300 hover:bg-primary hover:text-white"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Call to Action */}
        <div className="bg-muted/30 rounded-lg p-8 text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Own a Restaurant in Manipur?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our platform to showcase your culinary offerings to travelers
            seeking authentic Manipuri dining experiences. Increase your
            visibility and connect with food enthusiasts from around the world.
          </p>
          <Button
            className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-[1.01]"
            asChild
          >
            <Link to="/become-host">List Your Eatery</Link>
          </Button>
        </div>
      </div>

      {/* Food Guide Section */}
      <div className="bg-muted/20 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">
              Guide to Manipuri Cuisine
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the unique flavors, ingredients, and traditions that make
              Manipuri cuisine special.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <div className="bg-primary/10 rounded-full p-3">
                    <UtensilsCrossed size={24} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">
                  Signature Dishes
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ThumbsUp size={16} className="text-primary mt-1 mr-2" />
                    <div>
                      <span className="font-medium">Eromba</span> - A
                      traditional dish made with boiled vegetables, fermented
                      fish, and chilis
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ThumbsUp size={16} className="text-primary mt-1 mr-2" />
                    <div>
                      <span className="font-medium">Chamthong</span> - A
                      flavorful vegetable stew popular in Manipuri households
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ThumbsUp size={16} className="text-primary mt-1 mr-2" />
                    <div>
                      <span className="font-medium">Chak-Hao Kheer</span> -
                      Black rice pudding, a sweet delicacy
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Globe size={24} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">
                  Unique Ingredients
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ThumbsUp size={16} className="text-primary mt-1 mr-2" />
                    <div>
                      <span className="font-medium">Ngari</span> - Fermented
                      fish, a staple ingredient in many dishes
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ThumbsUp size={16} className="text-primary mt-1 mr-2" />
                    <div>
                      <span className="font-medium">Chak-Hao</span> - Black
                      aromatic rice indigenous to Manipur
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ThumbsUp size={16} className="text-primary mt-1 mr-2" />
                    <div>
                      <span className="font-medium">Maroi Napakpi</span> - An
                      aromatic herb used in many traditional recipes
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <div className="bg-primary/10 rounded-full p-3">
                    <User size={24} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">
                  Dining Etiquette
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ThumbsUp size={16} className="text-primary mt-1 mr-2" />
                    <div>
                      Traditional meals are often served on banana leaves or
                      brass plates
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ThumbsUp size={16} className="text-primary mt-1 mr-2" />
                    <div>Elders are served first as a sign of respect</div>
                  </li>
                  <li className="flex items-start">
                    <ThumbsUp size={16} className="text-primary mt-1 mr-2" />
                    <div>
                      Hand washing before and after meals is an important ritual
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      {selectedEatery && (
        <>
          <ReservationDialog
            isOpen={isReservationOpen}
            onClose={() => setIsReservationOpen(false)}
            eateryName={selectedEatery.name}
          />

          <ContactDialog
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            eateryName={selectedEatery.name}
            phone={selectedEatery.phone}
            website={selectedEatery.website}
            location={selectedEatery.location}
          />
        </>
      )}

      <Footer />
    </div>
  );
};

export default EateriesPage;
