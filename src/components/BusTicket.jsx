
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Ticket, Calendar, Clock, MapPin, User, Sofa, Users } from 'lucide-react';

const BusTicket = ({ booking }) => {
  if (!booking) return null;
  const currencySymbol = '₹';
  const formattedDate = new Date(booking.date + 'T00:00:00').toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Card className="w-full max-w-md mx-auto border-primary border-2 shadow-lg my-4 bg-gradient-to-br from-background via-background to-primary/5">
      <CardHeader className="bg-primary/10 p-4 border-b border-primary/30">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center text-primary">
            <Ticket className="w-5 h-5 mr-2" /> E-Ticket / Boarding Pass
          </CardTitle>
          <span className="text-xs font-mono text-muted-foreground">ID: {booking.id}</span>
        </div>
        <CardDescription className="text-xs pt-1">Show this ticket during boarding.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="font-semibold">{booking.bus}</span>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
            booking.status === 'Confirmed' ? 'bg-green-500/20 text-green-700 dark:text-green-400' :
            'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
          }`}>
            {booking.status}
          </span>
        </div>
        <div className="border-t border-dashed pt-3 space-y-2">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-muted-foreground flex-shrink-0" />
            <span>{booking.route}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-muted-foreground flex-shrink-0" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-muted-foreground flex-shrink-0" />
            <span>Departs: {booking.departureTime}</span>
            {booking.arrivalTime && <span className="ml-auto text-xs text-muted-foreground">Arrives: {booking.arrivalTime}</span>}
          </div>
        </div>
        <div className="border-t border-dashed pt-3 space-y-2">
           <div className="flex items-center">
             <User className="w-4 h-4 mr-2 text-muted-foreground flex-shrink-0" />
             <span>Passenger: <span className="font-medium">{booking.passenger?.name || 'N/A'}</span></span>
           </div>
           <div className="flex items-center">
             <Sofa className="w-4 h-4 mr-2 text-muted-foreground flex-shrink-0" />
             <span>Seats: <span className="font-medium">{booking.seats.join(', ')}</span></span>
           </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-primary/10 border-t border-primary/30 flex justify-between items-center">
         <span className="text-xs text-muted-foreground">Total Fare:</span>
         <span className="font-bold text-primary">{currencySymbol}{booking.price.toFixed(2)}</span>
      </CardFooter>
    </Card>
  );
};

// Helper function to generate ticket content as text
export const generateTicketText = (booking) => {
  if (!booking) return '';
  const currencySymbol = '₹';
  const formattedDate = new Date(booking.date + 'T00:00:00').toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  return `
------------------------------------
SOLANABUS E-TICKET
------------------------------------
Booking ID: ${booking.id}
Status: ${booking.status}

Operator: ${booking.bus}
Route: ${booking.route}
Date: ${formattedDate}
Departure: ${booking.departureTime} ${booking.arrivalTime ? ` | Arrival: ${booking.arrivalTime}` : ''}

Passenger: ${booking.passenger?.name || 'N/A'}
Seats: ${booking.seats.join(', ')}

Total Fare: ${currencySymbol}${booking.price.toFixed(2)}
------------------------------------
Thank you for choosing SolanaBus!
`;
};

export default BusTicket;
  