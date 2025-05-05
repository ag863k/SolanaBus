
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { indianCitiesAndTowns } from '@/lib/busData'; // Import the expanded list

const BusSearchForm = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!origin || !destination || !date) {
      console.error("Please fill all fields");
      return;
    }
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    navigate(`/search?from=${encodeURIComponent(origin)}&to=${encodeURIComponent(destination)}&date=${formattedDate}`);
  };

  // Use the imported expanded list
  const citySuggestions = indianCitiesAndTowns;

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSearch}
      className="bg-card p-4 sm:p-6 md:p-8 rounded-lg shadow-lg border border-border/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
    >
      <div className="sm:col-span-1">
        <label htmlFor="origin" className="block text-sm font-medium text-muted-foreground mb-1">From</label>
        <div className="relative">
           <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
           <Input
             id="origin"
             type="text"
             list="origin-suggestions"
             placeholder="Enter origin city"
             value={origin}
             onChange={(e) => setOrigin(e.target.value)}
             required
             className="pl-9"
           />
           <datalist id="origin-suggestions">
             {citySuggestions.map(city => <option key={`orig-${city}`} value={city} />)}
           </datalist>
        </div>
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="destination" className="block text-sm font-medium text-muted-foreground mb-1">To</label>
         <div className="relative">
           <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
           <Input
             id="destination"
             type="text"
             list="destination-suggestions"
             placeholder="Enter destination"
             value={destination}
             onChange={(e) => setDestination(e.target.value)}
             required
             className="pl-9"
           />
           <datalist id="destination-suggestions">
             {citySuggestions.map(city => <option key={`dest-${city}`} value={city} />)}
           </datalist>
         </div>
      </div>
      <div className="sm:col-span-2 lg:col-span-1">
        <label htmlFor="date" className="block text-sm font-medium text-muted-foreground mb-1">Date</label>
        <DatePicker date={date} setDate={setDate} className="w-full" />
      </div>
      <div className="sm:col-span-2 lg:col-span-1">
        <Button type="submit" className="w-full bg-solana-gradient hover:opacity-90 text-base md:text-lg py-2.5 md:py-3 h-auto">
          Search Buses <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </motion.form>
  );
};

export default BusSearchForm;
  