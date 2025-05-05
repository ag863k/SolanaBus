
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket, Calendar, Clock, MapPin, Download, XCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { generateTicketText } from '@/components/BusTicket'; // Import text generator

// Helper function to trigger file download
const downloadTextFile = (filename, text) => {
  const element = document.createElement('a');
  const file = new Blob([text], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
  document.body.removeChild(element);
};


const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const currencySymbol = '₹';

  const fetchBookings = () => {
    setLoading(true);
    const storedBookings = JSON.parse(localStorage.getItem('solanaBusBookings') || '[]');
    setTimeout(() => {
      setBookings(storedBookings.sort((a, b) => new Date(b.date) - new Date(a.date)));
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = (bookingId) => {
    toast({
      title: "Cancellation Requested",
      description: `Processing cancellation for booking ${bookingId}... (Demo)`,
      duration: 3000
    });
    setTimeout(() => {
       const updatedBookings = bookings.map(b =>
          b.id === bookingId ? { ...b, status: 'Cancelled' } : b
       );
       setBookings(updatedBookings);
       localStorage.setItem('solanaBusBookings', JSON.stringify(updatedBookings));
       toast({
          title: "Booking Cancelled",
          description: `Booking ${bookingId} has been cancelled.`,
          variant: "destructive"
       });
    }, 2000);
  };

  const handleDownloadTicket = (booking) => {
     const ticketText = generateTicketText(booking);
     const filename = `SolanaBus_Ticket_${booking.id}.txt`;
     downloadTextFile(filename, ticketText);
     toast({
        title: "Ticket Downloaded",
        description: `${filename} has been saved.`,
     });
  };

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">View and manage your bus journeys.</p>
        </div>
        <Button variant="outline" size="icon" onClick={fetchBookings} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </motion.div>

      {loading ? (
         <div className="text-center py-16">
            <RefreshCw className="w-12 h-12 mx-auto text-muted-foreground animate-spin mb-4" />
            <p className="text-muted-foreground">Loading your bookings...</p>
         </div>
      ) : bookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-16 bg-card rounded-lg"
        >
          <Ticket className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Bookings Yet</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't booked any trips.</p>
          <Button onClick={() => navigate('/search')}>Search for Buses</Button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30 p-4 border-b">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <CardTitle className="text-base sm:text-lg flex items-center">
                      <Ticket className="w-5 h-5 mr-2 text-primary flex-shrink-0" /> Booking ID: {booking.id}
                    </CardTitle>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      booking.status === 'Confirmed' ? 'bg-green-500/20 text-green-700 dark:text-green-400' :
                      booking.status === 'Completed' ? 'bg-blue-500/20 text-blue-700 dark:text-blue-400' :
                      booking.status === 'Cancelled' ? 'bg-red-500/20 text-red-700 dark:text-red-400 line-through' :
                      'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">{booking.bus}</p>
                    <p className="text-muted-foreground flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1 flex-shrink-0" /> {booking.route}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1 text-muted-foreground flex-shrink-0" /> {new Date(booking.date + 'T00:00:00').toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1 text-muted-foreground flex-shrink-0" /> Departs at {booking.departureTime}
                    </p>
                  </div>
                  <div className="md:text-right">
                    <p>Seats: <span className="font-medium">{booking.seats.join(', ')}</span></p>
                     {booking.passenger && <p className="mt-1">Passenger: <span className="font-medium">{booking.passenger.name}</span></p>}
                    <p className="mt-1">Total Price: <span className="font-bold text-primary">{currencySymbol}{booking.price.toFixed(2)}</span></p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 bg-muted/30 border-t flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                  {booking.status === 'Confirmed' && (
                    <>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => handleDownloadTicket(booking)}>
                        <Download className="w-4 h-4 mr-1" /> Download Ticket
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleCancelBooking(booking.id)} className="w-full sm:w-auto">
                        <XCircle className="w-4 h-4 mr-1" /> Cancel Booking
                      </Button>
                    </>
                  )}
                   {booking.status === 'Completed' && (
                      <Button variant="outline" size="sm" disabled className="w-full sm:w-auto">
                        Trip Completed
                      </Button>
                   )}
                    {booking.status === 'Cancelled' && (
                      <Button variant="outline" size="sm" disabled className="w-full sm:w-auto">
                        Booking Cancelled
                      </Button>
                   )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
  