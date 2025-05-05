
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Wind, Wifi, Zap, Sofa, ArrowRight } from 'lucide-react';

const BusCard = ({ bus, onSelectBus }) => {
  const amenities = bus.amenities || [];
  const currencySymbol = '₹'; // INR Symbol

  return (
    <Card className="bus-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
          <div>
            <CardTitle className="text-lg">{bus.operator}</CardTitle>
            <CardDescription className="text-xs">{bus.type} ({bus.busNumber})</CardDescription>
          </div>
          <div className="text-left sm:text-right mt-2 sm:mt-0 flex-shrink-0">
            <p className="text-xl font-bold text-primary">{currencySymbol}{bus.price.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">{bus.seatsAvailable} seats left</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-muted-foreground flex-shrink-0" />
          <div>
            <p className="font-medium">{bus.departureTime}</p>
            <p className="text-xs text-muted-foreground">{bus.origin}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-muted-foreground flex-shrink-0" />
          <div>
            <p className="font-medium">{bus.arrivalTime}</p>
            <p className="text-xs text-muted-foreground">{bus.destination}</p>
          </div>
        </div>
        <div className="col-span-2 text-xs text-muted-foreground">
          Duration: {bus.duration}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center bg-muted/30 p-4 gap-3">
        <div className="flex flex-wrap space-x-2">
          {amenities.includes('AC') && <Wind className="w-4 h-4 text-blue-500" title="Air Conditioning" />}
          {amenities.includes('WiFi') && <Wifi className="w-4 h-4 text-green-500" title="WiFi" />}
          {amenities.includes('Charging') && <Zap className="w-4 h-4 text-yellow-500" title="Charging Point" />}
          {amenities.includes('Sleeper') && <Sofa className="w-4 h-4 text-purple-500" title="Sleeper" />}
        </div>
        <Button size="sm" onClick={() => onSelectBus(bus.id)} className="w-full sm:w-auto">
          Select Seats <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BusCard;
  