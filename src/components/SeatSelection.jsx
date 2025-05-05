
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Import CardDescription
import { Button } from '@/components/ui/button';
import { Armchair, User } from 'lucide-react';

// Example layout: Can be fetched from API
// 0: empty space, 1: available seat, 2: booked seat, 3: available sleeper, 4: booked sleeper
const defaultLayout = [
  [1, 1, 0, 1, 1],
  [1, 2, 0, 1, 1],
  [1, 1, 0, 2, 1],
  [1, 1, 0, 1, 1],
  [1, 2, 0, 1, 2],
  [1, 1, 0, 1, 1],
  [3, 3, 0, 0, 0], // Sleeper row
  [3, 4, 0, 0, 0], // Sleeper row
];

const SeatSelection = ({ busLayout = defaultLayout, pricePerSeat = 25, onSeatsSelected, currencySymbol = '₹' }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (rowIndex, seatIndex, seatType) => {
    if (seatType === 2 || seatType === 4) return; // Already booked

    const seatId = `${rowIndex}-${seatIndex}`; // Simple ID, could be improved with actual seat numbers
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seatId)) {
        return prevSelected.filter((id) => id !== seatId);
      } else {
        // Example: Limit selection to max 6 seats
         if (prevSelected.length >= 6) {
            // Add toast notification here if needed
            console.warn("Maximum 6 seats can be selected.");
            return prevSelected;
         }
        return [...prevSelected, seatId];
      }
    });
  };

  const getSeatNumber = (rowIndex, seatIndex, seatType) => {
     // Basic numbering logic - can be customized based on actual bus layout naming conventions
     let number;
     if (seatType === 3 || seatType === 4) { // Sleeper
        number = `SL${rowIndex * 2 + seatIndex + 1}`; // Example: SL1, SL2...
     } else { // Seater
        // Assuming 5 columns, with middle one being aisle (index 2)
        let base = rowIndex * 4; // 4 potential seats per row
        if (seatIndex === 0) number = base + 1;
        else if (seatIndex === 1) number = base + 2;
        else if (seatIndex === 3) number = base + 3;
        else if (seatIndex === 4) number = base + 4;
        else return ''; // Aisle or invalid
        number = `ST${number}`; // Example: ST1, ST2...
     }
     return number;
  }

  const renderSeat = (seatType, rowIndex, seatIndex) => {
    const seatId = `${rowIndex}-${seatIndex}`;
    const isSelected = selectedSeats.includes(seatId);
    const isSleeper = seatType === 3 || seatType === 4;
    const seatNumber = getSeatNumber(rowIndex, seatIndex, seatType);

    let seatClass = '';
    let seatContent = seatNumber || seatIndex + 1 + (rowIndex * 5); // Fallback numbering

    if (seatType === 1 || seatType === 3) { // Available
      seatClass = isSelected ? 'seat-selected' : 'seat-available';
    } else if (seatType === 2 || seatType === 4) { // Booked
      seatClass = 'seat-booked';
      seatContent = <User className="w-4 h-4" />;
    } else { // Empty space (Aisle)
      return <div key={seatId} className="w-8 h-8 md:w-10 md:h-10" />; // Aisle space
    }

    if (isSleeper) {
      seatClass = cn(seatClass, 'seat-sleeper');
       if (seatType === 4) seatContent = <User className="w-5 h-5" />; // Booked sleeper icon
    }


    return (
      <div
        key={seatId}
        className={cn('seat', seatClass)}
        onClick={() => handleSeatClick(rowIndex, seatIndex, seatType)}
        title={seatNumber || `Row ${rowIndex+1}, Col ${seatIndex+1}`} // Tooltip
      >
        {seatContent}
      </div>
    );
  };

  const totalPrice = selectedSeats.length * pricePerSeat;
  const selectedSeatNumbers = selectedSeats.map(id => {
     const [r, s] = id.split('-').map(Number);
     return getSeatNumber(r, s, busLayout[r][s]);
  }).filter(Boolean); // Get actual seat numbers

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Seats</CardTitle>
        <CardDescription>Select up to 6 seats.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Seat Layout Visualization */}
        <div className="flex justify-center mb-6 overflow-x-auto pb-4">
          <div className="p-4 border border-dashed border-border rounded-lg inline-block">
             <div className="mb-4 text-center text-sm font-medium">Driver / Front</div>
             <Armchair className="w-8 h-8 mx-auto text-muted-foreground mb-4" />
             <div className="space-y-2">
               {busLayout.map((row, rowIndex) => (
                 <div key={rowIndex} className="flex justify-center gap-1.5 md:gap-2">
                   {row.map((seatType, seatIndex) => renderSeat(seatType, rowIndex, seatIndex))}
                 </div>
               ))}
             </div>
             <div className="mt-4 text-center text-sm font-medium">Rear</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs mb-6">
          <div className="flex items-center"><div className="w-3 h-3 rounded-sm border seat-available mr-1"></div> Available Seat</div>
          <div className="flex items-center"><div className="w-3 h-3 rounded-sm border seat-sleeper seat-available mr-1"></div> Available Sleeper</div>
          <div className="flex items-center"><div className="w-3 h-3 rounded-sm border seat-selected mr-1"></div> Selected</div>
          <div className="flex items-center"><div className="w-3 h-3 rounded-sm border seat-booked mr-1 flex items-center justify-center"><User className="w-2 h-2"/></div> Booked</div>
        </div>

        {/* Summary and Action */}
        <div className="mt-6 border-t pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Selected Seats ({selectedSeatNumbers.length}):</p>
              <p className="font-semibold break-words">{selectedSeatNumbers.length > 0 ? selectedSeatNumbers.join(', ') : 'None'}</p>
            </div>
            <div className="text-left sm:text-right mt-2 sm:mt-0 flex-shrink-0">
              <p className="text-sm text-muted-foreground">Total Price:</p>
              <p className="text-xl font-bold text-primary">{currencySymbol}{totalPrice.toFixed(2)}</p>
            </div>
          </div>
          <Button
            className="w-full mt-4"
            disabled={selectedSeats.length === 0}
            onClick={() => onSeatsSelected(selectedSeatNumbers, totalPrice)} // Pass numbers
          >
            Proceed to Passenger Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeatSelection;
  