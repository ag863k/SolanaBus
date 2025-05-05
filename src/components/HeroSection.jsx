
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-solana-purple/20 via-background to-solana-blue/10 z-0" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-solana-purple/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-solana-teal/10 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-solana-purple/10 border border-solana-purple/20 text-sm font-medium text-solana-purple mb-6">
              The Future of Crypto Trading
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Trade Crypto with <span className="gradient-text">Speed & Security</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Experience lightning-fast transactions, low fees, and a secure trading environment built on the Solana blockchain.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-solana-gradient hover:opacity-90 transition-opacity">
                Start Trading <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Explore Markets
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">300+</div>
                <div className="text-sm text-muted-foreground">Cryptocurrencies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">$2.5B+</div>
                <div className="text-sm text-muted-foreground">Daily Volume</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">10M+</div>
                <div className="text-sm text-muted-foreground">Users Worldwide</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 glow rounded-2xl overflow-hidden border border-border/50">
              <img  alt="Cryptocurrency trading platform interface" className="w-full h-auto rounded-2xl" src="https://images.unsplash.com/photo-1651130536923-07a66091b614" />
            </div>
            
            {/* Floating feature cards */}
            <motion.div 
              className="absolute -top-6 -left-6 glass-panel p-4 shadow-lg z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-solana-purple/20 flex items-center justify-center mr-3">
                  <TrendingUp className="h-5 w-5 text-solana-purple" />
                </div>
                <div>
                  <div className="font-medium">Real-time Trading</div>
                  <div className="text-xs text-muted-foreground">Lightning-fast execution</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-6 -right-6 glass-panel p-4 shadow-lg z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-solana-teal/20 flex items-center justify-center mr-3">
                  <Shield className="h-5 w-5 text-solana-teal" />
                </div>
                <div>
                  <div className="font-medium">Bank-grade Security</div>
                  <div className="text-xs text-muted-foreground">Your assets, protected</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute top-1/2 -right-6 transform -translate-y-1/2 glass-panel p-4 shadow-lg z-20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-solana-purple to-solana-teal flex items-center justify-center mr-3">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">Low Fees</div>
                  <div className="text-xs text-muted-foreground">Save on every trade</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
