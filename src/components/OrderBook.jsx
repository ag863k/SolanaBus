
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Generate sample order book data
const generateOrderBook = () => {
  const asks = [];
  const bids = [];
  
  let askPrice = 142.50;
  let bidPrice = 142.45;
  
  // Generate 10 asks (sell orders)
  for (let i = 0; i < 10; i++) {
    const amount = parseFloat((Math.random() * 100 + 5).toFixed(2));
    const total = parseFloat((askPrice * amount).toFixed(2));
    
    asks.push({
      price: askPrice.toFixed(2),
      amount: amount.toFixed(2),
      total: total.toFixed(2),
    });
    
    askPrice += parseFloat((Math.random() * 0.1 + 0.01).toFixed(2));
  }
  
  // Generate 10 bids (buy orders)
  for (let i = 0; i < 10; i++) {
    const amount = parseFloat((Math.random() * 100 + 5).toFixed(2));
    const total = parseFloat((bidPrice * amount).toFixed(2));
    
    bids.push({
      price: bidPrice.toFixed(2),
      amount: amount.toFixed(2),
      total: total.toFixed(2),
    });
    
    bidPrice -= parseFloat((Math.random() * 0.1 + 0.01).toFixed(2));
  }
  
  // Sort asks in ascending order (lowest ask first)
  asks.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
  // Sort bids in descending order (highest bid first)
  bids.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  
  return { asks, bids };
};

const OrderBook = () => {
  const [orderBook, setOrderBook] = useState(generateOrderBook());
  
  // Simulate order book updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update a few orders
      const newOrderBook = { ...orderBook };
      
      // Update a random ask
      const randomAskIndex = Math.floor(Math.random() * newOrderBook.asks.length);
      const randomAsk = { ...newOrderBook.asks[randomAskIndex] };
      randomAsk.amount = (parseFloat(randomAsk.amount) + (Math.random() * 10 - 5)).toFixed(2);
      randomAsk.total = (parseFloat(randomAsk.price) * parseFloat(randomAsk.amount)).toFixed(2);
      newOrderBook.asks[randomAskIndex] = randomAsk;
      
      // Update a random bid
      const randomBidIndex = Math.floor(Math.random() * newOrderBook.bids.length);
      const randomBid = { ...newOrderBook.bids[randomBidIndex] };
      randomBid.amount = (parseFloat(randomBid.amount) + (Math.random() * 10 - 5)).toFixed(2);
      randomBid.total = (parseFloat(randomBid.price) * parseFloat(randomBid.amount)).toFixed(2);
      newOrderBook.bids[randomBidIndex] = randomBid;
      
      setOrderBook(newOrderBook);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [orderBook]);
  
  // Calculate max volume for visualization
  const maxVolume = Math.max(
    ...orderBook.asks.map(ask => parseFloat(ask.amount)),
    ...orderBook.bids.map(bid => parseFloat(bid.amount))
  );
  
  return (
    <div className="crypto-card h-full">
      <h3 className="text-lg font-medium mb-4">Order Book</h3>
      
      <div className="grid grid-cols-3 text-xs text-muted-foreground mb-2">
        <div>Price (USDT)</div>
        <div className="text-right">Amount (SOL)</div>
        <div className="text-right">Total (USDT)</div>
      </div>
      
      {/* Asks (Sell Orders) */}
      <div className="mb-4 max-h-[200px] overflow-y-auto">
        {orderBook.asks.map((ask, index) => (
          <div key={`ask-${index}`} className="grid grid-cols-3 text-sm py-1 relative">
            <div className="text-red-500">{ask.price}</div>
            <div className="text-right">{ask.amount}</div>
            <div className="text-right">{ask.total}</div>
            <motion.div 
              className="absolute right-0 top-0 h-full bg-red-500/10"
              initial={{ width: 0 }}
              animate={{ 
                width: `${(parseFloat(ask.amount) / maxVolume) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        ))}
      </div>
      
      {/* Current Price */}
      <div className="py-2 border-y border-border/50 mb-4">
        <div className="text-center font-bold text-lg text-primary">
          {orderBook.bids[0].price}
        </div>
      </div>
      
      {/* Bids (Buy Orders) */}
      <div className="max-h-[200px] overflow-y-auto">
        {orderBook.bids.map((bid, index) => (
          <div key={`bid-${index}`} className="grid grid-cols-3 text-sm py-1 relative">
            <div className="text-green-500">{bid.price}</div>
            <div className="text-right">{bid.amount}</div>
            <div className="text-right">{bid.total}</div>
            <motion.div 
              className="absolute right-0 top-0 h-full bg-green-500/10"
              initial={{ width: 0 }}
              animate={{ 
                width: `${(parseFloat(bid.amount) / maxVolume) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
