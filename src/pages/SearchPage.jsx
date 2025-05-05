
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BusCard from '@/components/BusCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Filter, X, Map, AlertTriangle, Route } from 'lucide-react';
import MapPlaceholder from '@/components/MapPlaceholder';
import { sampleBuses, findAlternativeRoutes } from '@/lib/busData'; // Import data and helper

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [alternativeSuggestions, setAlternativeSuggestions] = useState(null);

  const [priceRange, setPriceRange] = useState([300, 2500]); // Adjusted max price
  const [sortBy, setSortBy] = useState('price_asc');

  const origin = searchParams.get('from') || 'Not Specified';
  const destination = searchParams.get('to') || 'Not Specified';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

  useEffect(() => {
    setLoading(true);
    setAlternativeSuggestions(null); // Reset suggestions on new search
    const timer = setTimeout(() => {
      let routeBuses = sampleBuses.filter(bus =>
         bus.origin.toLowerCase() === origin.toLowerCase() &&
         bus.destination.toLowerCase() === destination.toLowerCase()
      );

      let filteredBuses = routeBuses.filter(bus => bus.price >= priceRange[0] && bus.price <= priceRange[1]);

      filteredBuses.sort((a, b) => {
         switch (sortBy) {
           case 'price_asc': return a.price - b.price;
           case 'price_desc': return b.price - a.price;
           case 'dep_asc': return a.departureTime.localeCompare(b.departureTime);
           case 'arr_asc': return a.arrivalTime.localeCompare(b.arrivalTime);
           default: return 0;
         }
      });

      setBuses(filteredBuses);

      // If no direct buses found, find alternatives
      if (filteredBuses.length === 0) {
         const alternatives = findAlternativeRoutes(origin, destination);
         setAlternativeSuggestions(alternatives);
      }

      setLoading(false);
    }, 700); // Slightly longer delay for more data

    return () => clearTimeout(timer);
  }, [origin, destination, date, priceRange, sortBy]);

  const handleSelectBus = (busId) => {
    navigate(`/booking/${busId}?date=${date}`);
  };

  const handleSuggestionClick = (from, to) => {
     navigate(`/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`);
  }

  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  const currencySymbol = '₹';

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="mb-2 mr-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
           <Button variant="outline" size="sm" onClick={() => setShowMap(!showMap)} className="mb-2">
            <Map className="mr-2 h-4 w-4" /> {showMap ? 'Hide Map' : 'Show Map'}
           </Button>
          <h1 className="text-2xl font-bold mt-2 sm:mt-0">Buses from {origin} to {destination}</h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
         <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden self-start sm:self-center">
           <Filter className="mr-2 h-4 w-4" /> Filters
         </Button>
      </motion.div>

      {showMap && (
        <motion.div
           initial={{ height: 0, opacity: 0 }}
           animate={{ height: 'auto', opacity: 1 }}
           exit={{ height: 0, opacity: 0 }}
           className="mb-6 overflow-hidden"
         >
           <MapPlaceholder origin={origin} destination={destination} />
           <p className="text-xs text-muted-foreground mt-1 text-center">Map preview using OpenStreetMap. Actual bus routes may vary.</p>
        </motion.div>
      )}


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <motion.div
           initial={{ x: -100, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ duration: 0.4 }}
           className={`lg:col-span-1 ${showFilters ? 'fixed inset-0 bg-background z-40 p-6 overflow-y-auto lg:static lg:block' : 'hidden lg:block'}`}
        >
           <div className="flex justify-between items-center mb-4 lg:hidden">
              <h2 className="text-xl font-semibold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                 <X className="h-5 w-5" />
              </Button>
           </div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Filter & Sort</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Price Range ({currencySymbol}{priceRange[0]} - {currencySymbol}{priceRange[1]})</Label>
                <Slider
                  min={300}
                  max={2500} // Adjusted max price
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-2"
                />
                 <div className="flex justify-between text-xs text-muted-foreground mt-1">
                   <span>{currencySymbol}300</span>
                   <span>{currencySymbol}2500</span>
                 </div>
              </div>
              <div>
                <Label>Sort By</Label>
                 <Select value={sortBy} onValueChange={setSortBy}>
                   <SelectTrigger className="w-full mt-1">
                     <SelectValue placeholder="Sort results" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="price_asc">Price: Low to High</SelectItem>
                     <SelectItem value="price_desc">Price: High to Low</SelectItem>
                     <SelectItem value="dep_asc">Departure Time</SelectItem>
                     <SelectItem value="arr_asc">Arrival Time</SelectItem>
                   </SelectContent>
                 </Select>
              </div>
               <Button onClick={() => setShowFilters(false)} className="w-full lg:hidden">Apply Filters</Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bus Results */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="text-center py-10">
               <div role="status" className="flex justify-center items-center">
                   <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                   </svg>
                   <span className="sr-only">Loading...</span>
               </div>
              <p className="text-muted-foreground mt-2">Finding the best routes...</p>
            </div>
          ) : buses.length > 0 ? (
            buses.map((bus, index) => (
              <motion.div
                key={bus.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <BusCard bus={bus} onSelectBus={handleSelectBus} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center py-10 bg-card rounded-lg border border-dashed border-yellow-500/50"
            >
              <AlertTriangle className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
              <p className="text-lg font-medium text-yellow-600 dark:text-yellow-400">No Direct Buses Found</p>
              <p className="text-muted-foreground mt-2 px-4">
                We couldn't find direct buses from {origin} to {destination} on this date.
              </p>
              {alternativeSuggestions && (
                 <div className="mt-6 px-4 space-y-4 text-sm">
                    {(alternativeSuggestions.viaHubs.length > 0 || alternativeSuggestions.fromOrigin.length > 0 || alternativeSuggestions.toDestination.length > 0) && (
                       <p className="font-semibold">You might consider these options:</p>
                    )}

                    {alternativeSuggestions.viaHubs.length > 0 && (
                       <div>
                          <p className="text-muted-foreground mb-1">Travel via connecting cities:</p>
                          <ul className="list-disc list-inside text-left max-w-md mx-auto">
                             {alternativeSuggestions.viaHubs.map((hubRoute, i) => {
                                const parts = hubRoute.split(' -> ');
                                return (
                                   <li key={`hub-${i}`}>
                                      Try searching <Button variant="link" size="sm" className="p-0 h-auto" onClick={() => handleSuggestionClick(parts[0], parts[1])}>{parts[0]} to {parts[1]}</Button> and then <Button variant="link" size="sm" className="p-0 h-auto" onClick={() => handleSuggestionClick(parts[1], parts[2])}>{parts[1]} to {parts[2]}</Button>.
                                   </li>
                                );
                             })}
                          </ul>
                       </div>
                    )}

                    {alternativeSuggestions.fromOrigin.length > 0 && (
                       <div>
                          <p className="text-muted-foreground mb-1">Popular routes from {origin}:</p>
                          <div className="flex flex-wrap justify-center gap-2">
                             {alternativeSuggestions.fromOrigin.map((route, i) => {
                                const parts = route.split(' -> ');
                                return <Button key={`from-${i}`} variant="outline" size="sm" onClick={() => handleSuggestionClick(parts[0], parts[1])}>{parts[1]}</Button>;
                             })}
                          </div>
                       </div>
                    )}

                     {alternativeSuggestions.toDestination.length > 0 && (
                       <div>
                          <p className="text-muted-foreground mb-1">Popular routes to {destination}:</p>
                           <div className="flex flex-wrap justify-center gap-2">
                             {alternativeSuggestions.toDestination.map((route, i) => {
                                const parts = route.split(' -> ');
                                return <Button key={`to-${i}`} variant="outline" size="sm" onClick={() => handleSuggestionClick(parts[0], parts[1])}>{parts[0]}</Button>;
                             })}
                          </div>
                       </div>
                    )}
                 </div>
              )}
               <Button variant="outline" onClick={() => navigate('/')} className="mt-8">
                 Modify Search or Date
               </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
  