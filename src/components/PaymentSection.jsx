
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

const PaymentSection = ({ totalPrice, currencySymbol, onPayment }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>Choose your payment method.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">Total Amount: <span className="font-bold text-lg text-primary">{currencySymbol}{totalPrice.toFixed(2)}</span></p>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90" onClick={() => onPayment('Card/UPI')}>
          <CreditCard className="mr-2 h-4 w-4" /> Pay with Card / UPI
        </Button>
        <p className="text-xs text-muted-foreground text-center">You will be redirected to a secure payment gateway (Demo).</p>
      </CardContent>
    </Card>
  );
};

export default PaymentSection;
  