
import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const CryptoCard = ({ crypto }) => {
  const { name, symbol, price, change, marketCap, volume, image } = crypto;
  
  const formatNumber = (num) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="crypto-card"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-muted flex items-center justify-center">
            {image ? (
              <img src={image} alt={name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-solana-gradient" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-muted-foreground">{symbol}</p>
          </div>
        </div>
        <HoverCard>
          <HoverCardTrigger>
            <div className="flex items-center cursor-help">
              <TrendingUp className="h-4 w-4 text-muted-foreground mr-1" />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">{name} Statistics</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Market Cap:</div>
                <div className="text-right">{formatNumber(marketCap)}</div>
                <div>24h Volume:</div>
                <div className="text-right">{formatNumber(volume)}</div>
                <div>Current Price:</div>
                <div className="text-right">${price.toLocaleString()}</div>
                <div>24h Change:</div>
                <div className={`text-right ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {change.toFixed(2)}%
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold">${price.toLocaleString()}</p>
        </div>
        <div 
          className={`flex items-center ${
            change >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {change >= 0 ? (
            <ArrowUp className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 mr-1" />
          )}
          <span>{Math.abs(change).toFixed(2)}%</span>
        </div>
      </div>
      
      <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.abs(change) * 5, 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${change >= 0 ? "bg-green-500" : "bg-red-500"}`}
        />
      </div>
    </motion.div>
  );
};

export default CryptoCard;
