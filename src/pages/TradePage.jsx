
import React from "react";
import { motion } from "framer-motion";
import TradingViewChart from "@/components/TradingViewChart";
import OrderBook from "@/components/OrderBook";
import TradeForm from "@/components/TradeForm";
import MarketTicker from "@/components/MarketTicker";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const TradePage = () => {
  return (
    <div className="py-8">
      <MarketTicker />
      
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Trade SOL/USDT</h1>
          <p className="text-muted-foreground">
            Advanced trading interface with real-time charts, order book, and trading tools.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main chart area - spans 3 columns on large screens */}
          <div className="lg:col-span-3 space-y-6">
            <TradingViewChart symbol="SOL/USDT" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Tabs defaultValue="open-orders">
                  <TabsList className="w-full">
                    <TabsTrigger value="open-orders" className="flex-1">Open Orders</TabsTrigger>
                    <TabsTrigger value="order-history" className="flex-1">Order History</TabsTrigger>
                    <TabsTrigger value="trade-history" className="flex-1">Trade History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="open-orders" className="crypto-card mt-4 h-[300px]">
                    <div className="text-center text-muted-foreground py-12">
                      No open orders. Start trading to see your orders here.
                    </div>
                  </TabsContent>
                  <TabsContent value="order-history" className="crypto-card mt-4 h-[300px]">
                    <div className="text-center text-muted-foreground py-12">
                      Your order history will appear here.
                    </div>
                  </TabsContent>
                  <TabsContent value="trade-history" className="crypto-card mt-4 h-[300px]">
                    <div className="text-center text-muted-foreground py-12">
                      Your trade history will appear here.
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="crypto-card h-[300px]">
                <h3 className="text-lg font-medium mb-4">Market Trades</h3>
                <div className="grid grid-cols-3 text-xs text-muted-foreground mb-2">
                  <div>Price (USDT)</div>
                  <div className="text-right">Amount (SOL)</div>
                  <div className="text-right">Time</div>
                </div>
                <div className="space-y-2 max-h-[220px] overflow-y-auto">
                  {[...Array(10)].map((_, index) => (
                    <div key={index} className="grid grid-cols-3 text-sm py-1">
                      <div className={index % 2 === 0 ? "text-green-500" : "text-red-500"}>
                        {index % 2 === 0 ? "142.35" : "142.28"}
                      </div>
                      <div className="text-right">{(Math.random() * 10 + 1).toFixed(2)}</div>
                      <div className="text-right text-muted-foreground text-xs">
                        {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar - order book and trade form */}
          <div className="space-y-6">
            <OrderBook />
            <TradeForm currentPrice={142.45} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradePage;
