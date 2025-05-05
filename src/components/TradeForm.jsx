
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const TradeForm = ({ currentPrice = 142.45 }) => {
  const [orderType, setOrderType] = useState("limit");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState(currentPrice.toFixed(2));
  const [total, setTotal] = useState("");
  const [sliderValue, setSliderValue] = useState([0]);
  const [advancedMode, setAdvancedMode] = useState(false);
  const { toast } = useToast();
  
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (value && price) {
      setTotal((parseFloat(value) * parseFloat(price)).toFixed(2));
    } else {
      setTotal("");
    }
  };
  
  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    if (amount && value) {
      setTotal((parseFloat(amount) * parseFloat(value)).toFixed(2));
    } else {
      setTotal("");
    }
  };
  
  const handleTotalChange = (e) => {
    const value = e.target.value;
    setTotal(value);
    if (value && price) {
      setAmount((parseFloat(value) / parseFloat(price)).toFixed(4));
    } else {
      setAmount("");
    }
  };
  
  const handleSliderChange = (value) => {
    setSliderValue(value);
    // Calculate amount based on slider percentage (assuming max balance of 1000 USDT)
    const percentage = value[0];
    const maxBalance = 1000;
    const calculatedTotal = (maxBalance * percentage / 100).toFixed(2);
    setTotal(calculatedTotal);
    if (price) {
      setAmount((parseFloat(calculatedTotal) / parseFloat(price)).toFixed(4));
    }
  };
  
  const handleSubmit = (action) => {
    if (!amount || !price || !total) {
      toast({
        title: "Incomplete order",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: `${action === 'buy' ? 'Buy' : 'Sell'} order placed`,
      description: `${action === 'buy' ? 'Bought' : 'Sold'} ${amount} SOL at $${price} for a total of $${total}`,
      variant: action === 'buy' ? "default" : "destructive",
    });
    
    // Reset form
    setAmount("");
    setPrice(currentPrice.toFixed(2));
    setTotal("");
    setSliderValue([0]);
  };
  
  return (
    <div className="crypto-card h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Trade SOL/USDT</h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Advanced</span>
          <Switch checked={advancedMode} onCheckedChange={setAdvancedMode} />
        </div>
      </div>
      
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="buy" className="data-[state=active]:bg-green-500/20">Buy</TabsTrigger>
          <TabsTrigger value="sell" className="data-[state=active]:bg-red-500/20">Sell</TabsTrigger>
        </TabsList>
        
        <div className="mb-4">
          <div className="flex space-x-2 mb-4">
            <Button 
              variant={orderType === "limit" ? "default" : "outline"} 
              size="sm"
              onClick={() => setOrderType("limit")}
              className="flex-1"
            >
              Limit
            </Button>
            <Button 
              variant={orderType === "market" ? "default" : "outline"} 
              size="sm"
              onClick={() => setOrderType("market")}
              className="flex-1"
            >
              Market
            </Button>
            {advancedMode && (
              <Button 
                variant={orderType === "stop" ? "default" : "outline"} 
                size="sm"
                onClick={() => setOrderType("stop")}
                className="flex-1"
              >
                Stop
              </Button>
            )}
          </div>
          
          <TabsContent value="buy">
            <div className="space-y-4">
              <div>
                <Label htmlFor="buy-price">Price (USDT)</Label>
                <Input 
                  id="buy-price" 
                  type="number" 
                  placeholder="0.00" 
                  value={price}
                  onChange={handlePriceChange}
                  disabled={orderType === "market"}
                />
              </div>
              
              <div>
                <Label htmlFor="buy-amount">Amount (SOL)</Label>
                <Input 
                  id="buy-amount" 
                  type="number" 
                  placeholder="0.00" 
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
              
              {advancedMode && orderType === "stop" && (
                <div>
                  <Label htmlFor="stop-price">Stop Price (USDT)</Label>
                  <Input 
                    id="stop-price" 
                    type="number" 
                    placeholder="0.00" 
                  />
                </div>
              )}
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="buy-slider">Amount</Label>
                  <span className="text-xs text-muted-foreground">{sliderValue}%</span>
                </div>
                <Slider
                  id="buy-slider"
                  max={100}
                  step={1}
                  value={sliderValue}
                  onValueChange={handleSliderChange}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs">0%</span>
                  <div className="flex space-x-1">
                    {[25, 50, 75, 100].map((value) => (
                      <Button 
                        key={value}
                        variant="outline" 
                        size="sm" 
                        className="h-6 text-xs px-2"
                        onClick={() => handleSliderChange([value])}
                      >
                        {value}%
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="buy-total">Total (USDT)</Label>
                <Input 
                  id="buy-total" 
                  type="number" 
                  placeholder="0.00" 
                  value={total}
                  onChange={handleTotalChange}
                />
              </div>
              
              <Button 
                className="w-full bg-green-500 hover:bg-green-600"
                onClick={() => handleSubmit('buy')}
              >
                Buy SOL
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="sell">
            <div className="space-y-4">
              <div>
                <Label htmlFor="sell-price">Price (USDT)</Label>
                <Input 
                  id="sell-price" 
                  type="number" 
                  placeholder="0.00" 
                  value={price}
                  onChange={handlePriceChange}
                  disabled={orderType === "market"}
                />
              </div>
              
              <div>
                <Label htmlFor="sell-amount">Amount (SOL)</Label>
                <Input 
                  id="sell-amount" 
                  type="number" 
                  placeholder="0.00" 
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
              
              {advancedMode && orderType === "stop" && (
                <div>
                  <Label htmlFor="stop-price-sell">Stop Price (USDT)</Label>
                  <Input 
                    id="stop-price-sell" 
                    type="number" 
                    placeholder="0.00" 
                  />
                </div>
              )}
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="sell-slider">Amount</Label>
                  <span className="text-xs text-muted-foreground">{sliderValue}%</span>
                </div>
                <Slider
                  id="sell-slider"
                  max={100}
                  step={1}
                  value={sliderValue}
                  onValueChange={handleSliderChange}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs">0%</span>
                  <div className="flex space-x-1">
                    {[25, 50, 75, 100].map((value) => (
                      <Button 
                        key={value}
                        variant="outline" 
                        size="sm" 
                        className="h-6 text-xs px-2"
                        onClick={() => handleSliderChange([value])}
                      >
                        {value}%
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="sell-total">Total (USDT)</Label>
                <Input 
                  id="sell-total" 
                  type="number" 
                  placeholder="0.00" 
                  value={total}
                  onChange={handleTotalChange}
                />
              </div>
              
              <Button 
                className="w-full bg-red-500 hover:bg-red-600"
                onClick={() => handleSubmit('sell')}
              >
                Sell SOL
              </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TradeForm;
