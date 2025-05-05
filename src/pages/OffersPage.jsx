
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const offers = [
  {
    id: 1,
    title: "Weekend Getaway Special",
    description: "Get 15% OFF on round trips booked for Saturday & Sunday travel.",
    code: "WEEKEND15",
    validity: "Valid till 2025-06-30",
  },
  {
    id: 2,
    title: "First Time User Discount",
    description: "New to SolanaBus? Enjoy ₹100 OFF on your first booking.",
    code: "NEWBUS100",
    validity: "Valid for first booking only",
  },
  {
    id: 3,
    title: "Mumbai-Pune Bonanza",
    description: "Flat 10% discount on all AC buses between Mumbai and Pune.",
    code: "MUMPUN10",
    validity: "Valid till 2025-05-31",
  },
    {
    id: 4,
    title: "South India Explorer",
    description: "Book tickets for routes within South India & get 12% OFF.",
    code: "SOUTH12",
    validity: "Valid on routes originating in KA, TN, AP, TS, KL",
  },
];

const OffersPage = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
      navigate('/search'); // Navigate to search page
  };

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold">Exclusive Offers & Discounts</h1>
        <p className="text-muted-foreground mt-2">Save more on your bus journeys with these special deals.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {/* Removed the outer CardHeader with the img tag */}
            <Card className="overflow-hidden h-full flex flex-col bg-gradient-to-br from-primary/10 via-background to-secondary/10 hover:shadow-lg transition-shadow">
              <CardHeader className="pt-6"> {/* Added padding top */}
                 <CardTitle className="text-lg mb-1">{offer.title}</CardTitle>
                 <CardDescription className="text-sm mb-3">{offer.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                 <div className="flex items-center text-xs text-muted-foreground mb-1">
                   <Tag className="w-3 h-3 mr-1.5" /> Use code: <span className="font-semibold text-primary ml-1">{offer.code}</span>
                 </div>
                 <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1.5" /> {offer.validity}
                 </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" onClick={handleBookNow}>
                    Book Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
       <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          * Terms and conditions apply to all offers. Offers are subject to change.
        </motion.p>
    </div>
  );
};

export default OffersPage;
  