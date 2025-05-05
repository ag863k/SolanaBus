
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SeatSelection from '@/components/SeatSelection';
import PassengerDetailsForm from '@/components/PassengerDetailsForm';
import PaymentSection from '@/components/PaymentSection';
import BookingSummary from '@/components/BookingSummary';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getBusDetails } from '@/lib/busData'; // Import from lib

const BookingPage = () => {
  const { busId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [busDetails, setBusDetails] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [passengerDetails, setPassengerDetails] = useState({ name: '', email: '', phone: '' });
  const [step, setStep] = useState(1); // 1: Seat Selection, 2: Passenger Details, 3: Payment

  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const currencySymbol = '₹';

  useEffect(() => {
    const details = getBusDetails(busId);
    if (details) {
      setBusDetails(details);
    } else {
      toast({ title: "Error", description: "Bus details not found.", variant: "destructive" });
      navigate('/search');
    }
  }, [busId, navigate, toast]);

  const handleSeatsSelected = (seats, price) => {
    setSelectedSeats(seats);
    setTotalPrice(price);
    setStep(2);
  };

  const handlePassengerDetailsSubmit = (e) => {
     e.preventDefault();
     if (!passengerDetails.name || !passengerDetails.email || !passengerDetails.phone) {
        toast({ title: "Missing Information", description: "Please fill in all passenger details.", variant: "destructive"});
        return;
     }
     if (passengerDetails.phone.length < 10) {
         toast({ title: "Invalid Phone", description: "Please enter a valid 10-digit phone number.", variant: "destructive"});
         return;
     }
     setStep(3);
  };

  const handlePayment = (method) => {
     console.log(`Processing ${method} payment for ${currencySymbol}${totalPrice}`);
     toast({
        title: "Booking Initiated",
        description: `Processing payment via ${method}. Please wait... (This is a demo)`,
        duration: 5000
     });

     setTimeout(() => {
        toast({
           title: "Booking Confirmed!",
           description: `Your seats (${selectedSeats.join(', ')}) are booked. Check 'My Bookings'.`,
           variant: "default"
        });

        const newBooking = {
          id: `SB${Math.floor(Math.random() * 90000) + 10000}`,
          bus: `${busDetails.operator} (${busDetails.busNumber})`,
          route: `${busDetails.origin} to ${busDetails.destination}`,
          date: date,
          departureTime: busDetails.departureTime,
          arrivalTime: busDetails.arrivalTime, // Added arrival time
          seats: selectedSeats,
          status: 'Confirmed',
          price: totalPrice,
          passenger: passengerDetails
        };
        const existingBookings = JSON.parse(localStorage.getItem('solanaBusBookings') || '[]');
        localStorage.setItem('solanaBusBookings', JSON.stringify([...existingBookings, newBooking]));

        navigate('/bookings');
     }, 3000);
  };

  if (!busDetails) {
    return <div className="container py-10 text-center">Loading bus details...</div>;
  }

  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="container py-8">
       <motion.div
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="mb-6"
       >
         <Button variant="outline" size="sm" onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)} className="mb-2">
           <ArrowLeft className="mr-2 h-4 w-4" /> Back
         </Button>
         <h1 className="text-2xl font-bold">Booking for {busDetails.operator}</h1>
         <p className="text-muted-foreground">{busDetails.origin} to {busDetails.destination} on {formattedDate}</p>
       </motion.div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="md:col-span-2">
             <AnimatePresence mode="wait">
               {step === 1 && (
                 <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                   <SeatSelection
                     busLayout={busDetails.layout}
                     pricePerSeat={busDetails.pricePerSeat}
                     onSeatsSelected={handleSeatsSelected}
                     currencySymbol={currencySymbol}
                   />
                 </motion.div>
               )}
               {step === 2 && (
                 <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                   <PassengerDetailsForm
                     passengerDetails={passengerDetails}
                     setPassengerDetails={setPassengerDetails}
                     onSubmit={handlePassengerDetailsSubmit}
                   />
                 </motion.div>
               )}
               {step === 3 && (
                 <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                   <PaymentSection
                     totalPrice={totalPrice}
                     currencySymbol={currencySymbol}
                     onPayment={handlePayment}
                   />
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="md:col-span-1">
             <BookingSummary
                busDetails={busDetails}
                selectedSeats={selectedSeats}
                totalPrice={totalPrice}
                passengerDetails={passengerDetails}
                step={step}
                formattedDate={formattedDate}
                currencySymbol={currencySymbol}
             />
          </div>
       </div>
    </div>
  );
};

export default BookingPage;
  