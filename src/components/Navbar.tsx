import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  User,
  Map,
  Home,
  Landmark,
  Utensils,
  Info,
  PhoneCall,
  MapPin,
  CalendarRange,
  Award,
  ShoppingBag,
  LogOut,
  UserCircle,
  LayoutDashboard,
  BookOpen,
  Train,
  Mail,
  Book,
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';


const Navbar = () => {
  const { user, profile, signOut, isAdmin, isHost } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check if a route is active
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  // Toggle user menu
  const toggleUserMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isUserMenuOpen) setIsUserMenuOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleAuthNavigation = (tab: 'login' | 'signup') => {
    // If we're already on the auth page, just update the state
    if (window.location.pathname === '/auth') {
      navigate('/auth', { state: { tab }, replace: true });
    } else {
      // If we're on a different page, navigate normally
      navigate('/auth', { state: { tab } });
    }
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary group-hover:scale-105 transition-all duration-300">
                Trip<span className="text-secondary">&</span>Treat
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Manipur Delights
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Full labels (2xl and above) */}
          <div className="hidden 2xl:flex items-center space-x-6">
            <Link
              to="/homestays"
              className={`transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                isActiveRoute('/homestays')
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Home size={16} className="transition-transform group-hover:rotate-12" />
              Homestays
            </Link>
            <Link
              to="/hotspots"
              className={`transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                isActiveRoute('/hotspots')
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <MapPin size={16} />
              Hotspots
            </Link>
            <Link
              to="/eateries"
              className={`transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                isActiveRoute('/eateries')
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Utensils size={16} />
              Eateries
            </Link>
            <Link
              to="/experiences"
              className={`transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                isActiveRoute('/experiences')
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Award size={16} />
              Experiences
            </Link>
            <Link
              to="/tours"
              className={`transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                isActiveRoute('/tours')
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <CalendarRange size={16} />
              Tours
            </Link>
            <Link
              to="/itinerary"
              className={`transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                isActiveRoute('/itinerary')
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Map size={16} />
              Itinerary
            </Link>
            <Link
              to="/store"
              className={`transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                isActiveRoute('/store')
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <ShoppingBag size={16} />
              Store
            </Link>
            <Link
              to="/transport"
              className={`transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                isActiveRoute('/transport')
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Train size={16} />
              Transport
            </Link>
          </div>

          {/* Large screen navigation - Icons with labels (xl to 2xl) */}
          <div className="hidden xl:flex 2xl:hidden items-center space-x-4">
            <Link
              to="/homestays"
              className={`transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                isActiveRoute('/homestays')
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Home size={16} />
              Homestays
            </Link>
            <Link
              to="/hotspots"
              className={`transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                isActiveRoute('/hotspots')
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <MapPin size={16} />
              Hotspots
            </Link>
            <Link
              to="/eateries"
              className={`transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                isActiveRoute('/eateries')
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Utensils size={16} />
              Eateries
            </Link>
            <Link
              to="/experiences"
              className={`transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                isActiveRoute('/experiences')
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Award size={16} />
              Experiences
            </Link>
            <Link
              to="/tours"
              className={`transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                isActiveRoute('/tours')
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <CalendarRange size={16} />
              Tours
            </Link>
            <Link
              to="/itinerary"
              className={`transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                isActiveRoute('/itinerary')
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Map size={16} />
              Itinerary
            </Link>
            <Link
              to="/store"
              className={`transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                isActiveRoute('/store')
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <ShoppingBag size={16} />
              Store
            </Link>
            <Link
              to="/transport"
              className={`transition-colors flex items-center gap-1 hover:scale-105 transition-all duration-200 ${
                isActiveRoute('/transport')
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Train size={16} />
              Transport
            </Link>
          </div>

          {/* Medium screen navigation - Icons only with tooltips (lg to xl) */}
          <div className="hidden lg:flex xl:hidden items-center space-x-2">
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Link
                  to="/homestays"
                  className={`transition-colors flex items-center p-2 rounded-md hover:scale-105 transition-all duration-200 ${
                    isActiveRoute('/homestays')
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-accent/50'
                  }`}
                >
                  <Home size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="z-50 bg-popover border border-border shadow-lg">
                <p className="font-medium">Homestays</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Link
                  to="/hotspots"
                  className={`transition-colors flex items-center p-2 rounded-md hover:scale-105 transition-all duration-200 ${
                    isActiveRoute('/hotspots')
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-accent/50'
                  }`}
                >
                  <MapPin size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="z-50 bg-popover border border-border shadow-lg">
                <p className="font-medium">Hotspots</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Link
                  to="/eateries"
                  className={`transition-colors flex items-center p-2 rounded-md hover:scale-105 transition-all duration-200 ${
                    isActiveRoute('/eateries')
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-accent/50'
                  }`}
                >
                  <Utensils size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="z-50 bg-popover border border-border shadow-lg">
                <p className="font-medium">Eateries</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Link
                  to="/experiences"
                  className={`transition-colors flex items-center p-2 rounded-md hover:scale-105 transition-all duration-200 ${
                    isActiveRoute('/experiences')
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-accent/50'
                  }`}
                >
                  <Award size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="z-50 bg-popover border border-border shadow-lg">
                <p className="font-medium">Experiences</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Link
                  to="/tours"
                  className={`transition-colors flex items-center p-2 rounded-md hover:scale-105 transition-all duration-200 ${
                    isActiveRoute('/tours')
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-accent/50'
                  }`}
                >
                  <CalendarRange size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="z-50 bg-popover border border-border shadow-lg">
                <p className="font-medium">Tours</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Link
                  to="/itinerary"
                  className={`transition-colors flex items-center p-2 rounded-md hover:scale-105 transition-all duration-200 ${
                    isActiveRoute('/itinerary')
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-accent/50'
                  }`}
                >
                  <Map size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="z-50 bg-popover border border-border shadow-lg">
                <p className="font-medium">Itinerary</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Link
                  to="/store"
                  className={`transition-colors flex items-center p-2 rounded-md hover:scale-105 transition-all duration-200 ${
                    isActiveRoute('/store')
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-accent/50'
                  }`}
                >
                  <ShoppingBag size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="z-50 bg-popover border border-border shadow-lg">
                <p className="font-medium">Store</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Link
                  to="/transport"
                  className={`transition-colors flex items-center p-2 rounded-md hover:scale-105 transition-all duration-200 ${
                    isActiveRoute('/transport')
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-accent/50'
                  }`}
                >
                  <Train size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="z-50 bg-popover border border-border shadow-lg">
                <p className="font-medium">Transport</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center ml-6 xl:ml-8 space-x-2 xl:space-x-4">
            {/* Become a Host button - responsive text */}
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 group"
              asChild
            >
              <Link to="/become-host" className="flex items-center gap-1 xl:gap-2">
                <Landmark
                  size={16}
                  className="transition-transform group-hover:rotate-12"
                />
                <span className="hidden xl:inline">Become a Host</span>
                <span className="xl:hidden">Host</span>
              </Link>
            </Button>

            {/* User profile dropdown */}
            <div className="relative" onClick={e => e.stopPropagation()}>
              {user ? (
                // Authenticated user
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10 transition-all duration-300"
                  onClick={toggleUserMenu}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {profile?.first_name?.[0]}
                      {profile?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              ) : (
                // Unauthenticated user
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground rounded-full hover:bg-primary/10 transition-all duration-300"
                  onClick={toggleUserMenu}
                >
                  <User
                    size={20}
                    className="transition-transform hover:scale-110"
                  />
                </Button>
              )}

              {/* User dropdown menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-background rounded-lg shadow-lg overflow-hidden border border-border animate-fade-in">
                  {user ? (
                    // Authenticated user menu
                    <>
                      <div className="p-4 border-b border-border">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={profile?.avatar_url} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {profile?.first_name?.[0]}
                              {profile?.last_name?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {profile?.first_name} {profile?.last_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        {(isAdmin || isHost) && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {isAdmin && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                                Admin
                              </span>
                            )}
                            {isHost && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                Host
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserCircle className="h-4 w-4 mr-3" />
                          My Profile
                        </Link>
                        <Link
                          to="/bookings"
                          className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <BookOpen className="h-4 w-4 mr-3" />
                          My Bookings
                        </Link>
                        <Link
                          to="/itinerary"
                          className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Map className="h-4 w-4 mr-3" />
                          My Itinerary
                        </Link>
                        <Link
                          to="/about"
                          className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Book className="h-4 w-4 mr-3" />
                          Our Story
                        </Link>
                        <Link
                          to="/contact"
                          className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Mail className="h-4 w-4 mr-3" />
                          Contact
                        </Link>
                      </div>

                      {/* Admin section */}
                      {isAdmin && (
                        <div className="py-1 border-t border-border">
                          <Link
                            to="/admin"
                            className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <LayoutDashboard className="h-4 w-4 mr-3" />
                            Admin Dashboard
                          </Link>
                        </div>
                      )}

                      <div className="py-1 border-t border-border">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            handleSignOut();
                          }}
                          className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-accent hover:text-red-600"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign out
                        </button>
                      </div>
                    </>
                  ) : (
                    // Unauthenticated user menu
                    <>
                      <div className="p-3 border-b border-border">
                        <p className="font-medium">Welcome</p>
                        <p className="text-sm text-muted-foreground">
                          Sign in to your account
                        </p>
                      </div>
                      <div className="py-1">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                          onClick={() => handleAuthNavigation('login')}
                        >
                          Sign in
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                          onClick={() => handleAuthNavigation('signup')}
                        >
                          Create account
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {user && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10"
                onClick={() => navigate('/profile')}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {profile?.first_name?.[0]}
                    {profile?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
              </Button>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground focus:outline-none p-2 rounded-full hover:bg-accent/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden mt-2 py-4 bg-background rounded-lg shadow-lg transform transition-all duration-300',
            isMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none hidden'
          )}
        >
          <div className="flex flex-col space-y-3 px-4">
            <Link
              to="/homestays"
              className={`py-2 flex items-center gap-2 ${
                isActiveRoute('/homestays')
                  ? 'text-primary font-semibold bg-primary/10 rounded-md px-2'
                  : 'text-foreground hover:text-primary'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={16} />
              Homestays
            </Link>
            <Link
              to="/tours"
              className={`py-2 flex items-center gap-2 ${
                isActiveRoute('/tours')
                  ? 'text-primary font-semibold bg-primary/10 rounded-md px-2'
                  : 'text-foreground hover:text-primary'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <CalendarRange size={16} />
              Tours
            </Link>
            <Link
              to="/experiences"
              className={`py-2 flex items-center gap-2 ${
                isActiveRoute('/experiences')
                  ? 'text-primary font-semibold bg-primary/10 rounded-md px-2'
                  : 'text-foreground hover:text-primary'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Award size={16} />
              Experiences
            </Link>
            <Link
              to="/eateries"
              className={`py-2 flex items-center gap-2 ${
                isActiveRoute('/eateries')
                  ? 'text-primary font-semibold bg-primary/10 rounded-md px-2'
                  : 'text-foreground hover:text-primary'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Utensils size={16} />
              Eateries
            </Link>
            <Link
              to="/hotspots"
              className={`py-2 flex items-center gap-2 ${
                isActiveRoute('/hotspots')
                  ? 'text-primary font-semibold bg-primary/10 rounded-md px-2'
                  : 'text-foreground hover:text-primary'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <MapPin size={16} />
              Hotspots
            </Link>
            <Link
              to="/itinerary"
              className={`py-2 flex items-center gap-2 ${
                isActiveRoute('/itinerary')
                  ? 'text-primary font-semibold bg-primary/10 rounded-md px-2'
                  : 'text-foreground hover:text-primary'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Map size={16} />
              Itinerary
            </Link>
            <Link
              to="/store"
              className={`py-2 flex items-center gap-2 ${
                isActiveRoute('/store')
                  ? 'text-primary font-semibold bg-primary/10 rounded-md px-2'
                  : 'text-foreground hover:text-primary'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingBag size={16} />
              Store
            </Link>
            <Link
              to="/transport"
              className={`py-2 flex items-center gap-2 ${
                isActiveRoute('/transport')
                  ? 'text-primary font-semibold bg-primary/10 rounded-md px-2'
                  : 'text-foreground hover:text-primary'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Train size={16} />
              Transport
            </Link>
            <Link
              to="/about"
              className={`py-2 flex items-center gap-2 ${
                isActiveRoute('/about')
                  ? 'text-primary font-semibold bg-primary/10 rounded-md px-2'
                  : 'text-foreground hover:text-primary'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Info size={16} />
              Our Story
            </Link>
            <Link
              to="/contact"
              className={`py-2 flex items-center gap-2 ${
                isActiveRoute('/contact')
                  ? 'text-primary font-semibold bg-primary/10 rounded-md px-2'
                  : 'text-foreground hover:text-primary'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <PhoneCall size={16} />
              Contact
            </Link>
            <hr className="border-t border-border" />
            <Link
              to="/become-host"
              className={`py-2 flex items-center gap-2 ${
                isActiveRoute('/become-host')
                  ? 'text-primary font-semibold bg-primary/10 rounded-md px-2'
                  : 'text-primary font-semibold'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Landmark size={16} />
              Become a Host
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="py-2 text-foreground hover:text-primary flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={16} />
                  My Profile
                </Link>
                <Link
                  to="/bookings"
                  className="py-2 text-foreground hover:text-primary flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen size={16} />
                  My Bookings
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="py-2 text-foreground hover:text-primary flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard size={16} />
                    Admin Dashboard
                  </Link>
                )}
                <button
                  className="py-2 text-red-500 hover:text-red-600 flex items-center gap-2 w-full text-left"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="py-2 text-foreground flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={16} />
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
