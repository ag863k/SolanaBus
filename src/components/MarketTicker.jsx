
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

const cryptoData = [
  { symbol: "SOL/USDT", price: 142.35, change: 5.67 },
  { symbol: "BTC/USDT", price: 63245.78, change: -1.23 },
  { symbol: "ETH/USDT", price: 3456.92, change: 2.45 },
  { symbol: "ADA/USDT", price: 0.58, change: -0.34 },
  { symbol: "DOT/USDT", price: 7.82, change: 3.21 },
  { symbol: "AVAX/USDT", price: 35.67, change: 7.89 },
  { symbol: "MATIC/USDT", price: 0.92, change: -2.34 },
  { symbol: "LINK/USDT", price: 18.45, change: 4.56 },
  { symbol: "UNI/USDT", price: 8.76, change: -1.87 },
  { symbol: "DOGE/USDT", price: 0.12, change: 9.87 },
];

const MarketTicker = () => {
  const [tickerData, setTickerData] = useState(cryptoData);
  
  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData(prevData => 
        prevData.map(item => {
          const randomChange = (Math.random() * 0.4) - 0.2; // Between -0.2% and 0.2%
          const newPrice = item.price * (1 + randomChange / 100);
          const newChange = item.change + randomChange;
          return {
            ...item,
            price: parseFloat(newPrice.toFixed(newPrice < 1 ? 4 : 2)),
            change: parseFloat(newChange.toFixed(2))
          };
        })
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-muted/30 border-y border-border/40 py-2">
      <div className="flex animate-[scroll_30s_linear_infinite] space-x-6">
        {tickerData.concat(tickerData).map((crypto, index) => (
          <div key={index} className="flex items-center space-x-2 whitespace-nowrap px-2">
            <span className="font-medium">{crypto.symbol}</span>
            <span className="text-sm">
              ${crypto.price < 1 ? crypto.price.toFixed(4) : crypto.price.toFixed(2)}
            </span>
            <div 
              className={`flex items-center ${
                crypto.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {crypto.change >= 0 ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              <span className="text-xs">{Math.abs(crypto.change).toFixed(2)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketTicker;
