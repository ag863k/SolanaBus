
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone } from 'lucide-react';

const PassengerDetailsForm = ({ passengerDetails, setPassengerDetails, onSubmit }) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'phone') {
      // Allow only digits, max 10
      setPassengerDetails({ ...passengerDetails, [id]: value.replace(/\D/g, '').slice(0, 10) });
    } else {
      setPassengerDetails({ ...passengerDetails, [id]: value });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passenger Details</CardTitle>
        <CardDescription>Enter the primary passenger's information.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Enter full name"
                value={passengerDetails.name}
                onChange={handleChange}
                required
                className="pl-9"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={passengerDetails.email}
                onChange={handleChange}
                required
                className="pl-9"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={passengerDetails.phone}
                onChange={handleChange}
                required
                minLength="10"
                maxLength="10"
                className="pl-9"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">Proceed to Payment</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PassengerDetailsForm;
  