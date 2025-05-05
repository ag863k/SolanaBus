
import React from "react";
import { motion } from "framer-motion";
import MarketTable from "@/components/MarketTable";
import MarketTicker from "@/components/MarketTicker";

const MarketsPage = () => {
  return (
    <div className="py-8">
      <MarketTicker />
      
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Cryptocurrency Markets</h1>
            <p className="text-muted-foreground">
              Explore real-time prices, market caps, and trading volumes for hundreds of cryptocurrencies.
            </p>
          </div>
          
          <MarketTable />
        </motion.div>
      </div>
    </div>
  );
};

export default MarketsPage;
