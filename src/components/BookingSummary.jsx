
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BookingSummary = ({ busDetails, selectedSeats, totalPrice, passengerDetails, step, formattedDate, currencySymbol }) => {
  if (!busDetails) return null;

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Bus Operator:</span>
          <span className="text-right">{busDetails.operator}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Route:</span>
          <span className="text-right">{busDetails.origin} to {busDetails.destination}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Date:</span>
          <span className="text-right">{formattedDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Departure:</span>
          <span className="text-right">{busDetails.departureTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Seats:</span>
          <span className="font-medium text-right">{selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}</span>
        </div>
        {step > 1 && passengerDetails.name && (
          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="text-muted-foreground">Passenger:</span>
            <span className="text-right">{passengerDetails.name}</span>
          </div>
        )}
        <div className="border-t my-2 pt-2"></div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total Price:</span>
          <span className="text-primary">{currencySymbol}{totalPrice.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
  