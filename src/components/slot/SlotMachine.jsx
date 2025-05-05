
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Reel from '@/components/slot/Reel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { Bot, Cpu, CircuitBoard, Diamond, Gem, DollarSign, Cherry, Banana, Grape } from 'lucide-react';

const symbols = ['BOT', 'CPU', 'BOARD', 'DIAMOND', 'GEM', 'CASH', 'CHERRY', 'BANANA', 'GRAPE'];
const reelCount = 5;
const visibleRows = 3; // How many symbols are visible per reel
const defaultReelLength = 20; // How many symbols total per reel strip

// Define winning lines (indices relative to the visible 3 rows [0, 1, 2])
// Example: Middle row horizontal line
const winningLines = [
  { line: [1, 1, 1, 1, 1], name: "Middle Row" }, // Middle row
  { line: [0, 0, 0, 0, 0], name: "Top Row" },    // Top row
  { line: [2, 2, 2, 2, 2], name: "Bottom Row" }, // Bottom row
  { line: [0, 1, 2, 1, 0], name: "V Shape" },    // V shape
  { line: [2, 1, 0, 1, 2], name: "Inverted V" }, // Inverted V
];

// Define payouts (symbol: { count: payoutMultiplier })
const payouts = {
  BOT: { 3: 50, 4: 150, 5: 500 },
  CPU: { 3: 20, 4: 60, 5: 200 },
  BOARD: { 3: 15, 4: 50, 5: 150 },
  DIAMOND: { 3: 10, 4: 30, 5: 100 },
  GEM: { 3: 8, 4: 25, 5: 80 },
  CASH: { 3: 5, 4: 15, 5: 50 },
  CHERRY: { 2: 2, 3: 4, 4: 10, 5: 30 }, // Cherry pays for 2
  BANANA: { 3: 3, 4: 8, 5: 25 },
  GRAPE: { 3: 3, 4: 8, 5: 25 },
};

// Function to generate a random reel strip
const generateReelStrip = (length) => {
  return Array.from({ length }, () => symbols[Math.floor(Math.random() * symbols.length)]);
};

const SlotMachine = ({ balance, setBalance }) => {
  const [reels, setReels] = useState(() => Array(reelCount).fill(null).map(() => generateReelStrip(defaultReelLength)));
  const [finalIndices, setFinalIndices] = useState(() => Array(reelCount).fill(0));
  const [isSpinning, setIsSpinning] = useState(false);
  const [betAmount, setBetAmount] = useState(1);
  const [winAmount, setWinAmount] = useState(0);
  const [spinningReels, setSpinningReels] = useState(reelCount); // Track completed reels
  const { toast } = useToast();

  const spinDuration = 1000; // Base duration
  const delayIncrement = 200; // Delay between reels stopping

  const handleSpin = () => {
    if (isSpinning) return;
    if (balance < betAmount) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough balance to place this bet.",
        variant: "destructive",
      });
      return;
    }

    setBalance(prev => prev - betAmount);
    setWinAmount(0);
    setIsSpinning(true);
    setSpinningReels(reelCount); // Reset counter

    // Determine final symbols for each reel
    const newFinalIndices = reels.map(reel => Math.floor(Math.random() * reel.length));
    setFinalIndices(newFinalIndices);
  };

  const handleSpinComplete = (reelIndex) => {
     setSpinningReels(prev => {
       const remaining = prev - 1;
       if (remaining === 0) {
         setIsSpinning(false);
         // Check for wins after the last reel stops
         checkForWins();
       }
       return remaining;
     });
  };

  const checkForWins = () => {
    let totalWin = 0;
    const finalSymbolsGrid = finalIndices.map((finalIndex, reelIdx) => {
      const reel = reels[reelIdx];
      // Get the 3 visible symbols based on the final index (symbol before, symbol at, symbol after)
      const prevIndex = (finalIndex - 1 + reel.length) % reel.length;
      const nextIndex = (finalIndex + 1) % reel.length;
      return [reel[prevIndex], reel[finalIndex], reel[nextIndex]];
    });

    winningLines.forEach(({ line }) => {
      const lineSymbols = line.map((rowIndex, reelIdx) => finalSymbolsGrid[reelIdx][rowIndex]);
      const firstSymbol = lineSymbols[0];
      let consecutiveCount = 0;
      
      // Check from left to right
      for (const symbol of lineSymbols) {
        if (symbol === firstSymbol) {
          consecutiveCount++;
        } else {
          break; // Stop counting if symbol doesn't match
        }
      }

      // Check payout (handle Cherry special case)
      const payoutInfo = payouts[firstSymbol];
      if (payoutInfo) {
         const payoutMultiplier = payoutInfo[consecutiveCount];
         if (payoutMultiplier) {
           totalWin += payoutMultiplier * betAmount;
         } else if (firstSymbol === 'CHERRY' && consecutiveCount === 2 && payoutInfo[2]) {
            totalWin += payoutInfo[2] * betAmount; // Cherry pays for 2
         }
      }
    });

    if (totalWin > 0) {
      setWinAmount(totalWin);
      setBalance(prev => prev + totalWin);
      toast({
        title: "WINNER!",
        description: `You won $${totalWin.toFixed(2)}!`,
        variant: "default", // Use default or a custom success variant
        duration: 3000,
      });
    } else {
       toast({
        title: "Spin Complete",
        description: "No win this time. Try again!",
        variant: "destructive",
        duration: 1500,
      });
    }
  };

  const handleBetChange = (value) => {
    const newBet = parseFloat(value);
    if (!isNaN(newBet) && newBet >= 0.1) { // Min bet 0.1
      setBetAmount(newBet);
    }
  };

  const handleSliderChange = (value) => {
     const percentage = value[0];
     const maxBet = Math.min(100, balance); // Max bet is 100 or current balance
     const newBet = Math.max(0.1, parseFloat(((percentage / 100) * maxBet).toFixed(2)));
     setBetAmount(newBet);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8">
      {/* Slot Machine Reels */}
      <div className="flex justify-center space-x-2 md:space-x-4 mb-8 p-4 bg-metal-dark/30 rounded-lg border-2 border-metal-light shadow-inner relative overflow-hidden">
         {/* Background Glow */}
         <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-pink/10 blur-xl z-0"></div>
         
         {/* Reels */}
         <div className="flex justify-center space-x-2 md:space-x-4 relative z-10">
            {reels.map((reelSymbols, index) => (
              <Reel
                key={index}
                reelIndex={index}
                symbols={reelSymbols}
                finalSymbolIndex={finalIndices[index]}
                isSpinning={isSpinning}
                spinDuration={spinDuration}
                delay={index * delayIncrement}
                onSpinComplete={handleSpinComplete}
              />
            ))}
         </div>
         {/* Frame */}
         <div className="absolute inset-0 border-4 border-metal-light rounded-lg pointer-events-none z-20 shadow-lg"></div>
      </div>

      {/* Win Amount Display */}
      {winAmount > 0 && (
         <motion.div 
            className="mb-6 text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
         >
            <p className="text-4xl font-bold text-neon-green neon-glow-green animate-highlight-win shadow-neon-green">
               WIN: ${winAmount.toFixed(2)}
            </p>
         </motion.div>
      )}

      {/* Game Controls */}
      <div className="slot-card glass-panel-robot p-6 w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          {/* Bet Amount */}
          <div className="space-y-2">
            <Label htmlFor="bet-amount" className="text-neon-blue">Bet Amount</Label>
            <div className="flex items-center space-x-2">
               <Button variant="outline" size="sm" onClick={() => handleBetChange(Math.max(0.1, betAmount / 2).toFixed(2))} disabled={isSpinning}>1/2x</Button>
               <Input
                 id="bet-amount"
                 type="number"
                 value={betAmount}
                 onChange={(e) => handleBetChange(e.target.value)}
                 min="0.1"
                 step="0.1"
                 className="text-center font-bold text-lg"
                 disabled={isSpinning}
               />
               <Button variant="outline" size="sm" onClick={() => handleBetChange(Math.min(100, betAmount * 2).toFixed(2))} disabled={isSpinning}>2x</Button>
               <Button variant="outline" size="sm" onClick={() => handleBetChange(Math.min(100, balance).toFixed(2))} disabled={isSpinning}>Max</Button>
            </div>
             <Slider
                defaultValue={[1]}
                max={100}
                step={1}
                onValueChange={handleSliderChange}
                className="mt-4"
                disabled={isSpinning}
             />
          </div>

          {/* Spin Button */}
          <Button
            size="lg"
            className="w-full h-16 text-2xl font-bold bg-robot-gradient text-background hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-neon-pink/30"
            onClick={handleSpin}
            disabled={isSpinning}
          >
            {isSpinning ? 'Spinning...' : 'SPIN'}
          </Button>
        </div>
         <div className="mt-4 text-center text-sm text-muted-foreground">
            Balance: ${balance !== null ? balance.toFixed(2) : '---'}
         </div>
      </div>
    </div>
  );
};

export default SlotMachine;
  