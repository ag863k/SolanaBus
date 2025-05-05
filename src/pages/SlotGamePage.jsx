
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlotReel from '@/components/SlotReel';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Play, Zap, Repeat, Coins } from 'lucide-react';

const SYMBOLS = ['NINJA_RED', 'NINJA_BLUE', 'NINJA_GREEN', 'SHURIKEN', 'KUNAI', 'MASK', 'SCROLL'];
const REEL_COUNT = 5;
const ROW_COUNT = 3;
const INITIAL_BALANCE = 1000;
const MIN_BET = 1;
const MAX_BET = 100;
const SPIN_DURATION = 0.5; // Base duration, total time increases with delay

const getRandomSymbol = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

// This function needs access to currentBet, passed as an argument
const checkWinAndUpdate = (finalReels, currentBet) => {
  const middleRow = finalReels.map(reel => reel[1]); // Index 1 is the middle symbol
  const counts = {};
  let winSymbol = null;
  let winCount = 0;
  let winAmount = 0;
  let winningIndices = [];

  middleRow.forEach((symbol, index) => {
    counts[symbol] = (counts[symbol] || 0) + 1;
    if (counts[symbol] >= 3) {
      if (counts[symbol] >= winCount) { // Check for >= to handle multiple 3-of-a-kind, preferring longer lines
        // If it's a longer line OR the same length but a higher value symbol (optional complexity)
        // For now, just take the first one found or the longer one
        if (counts[symbol] > winCount) {
           winSymbol = symbol;
           winCount = counts[symbol];
        } else if (winSymbol === null) { // If it's the first 3-of-a-kind
           winSymbol = symbol;
           winCount = counts[symbol];
        }
      }
    }
  });

   if (winSymbol) {
    // Basic payout: count * bet * symbol multiplier (e.g., Ninjas pay more)
    let multiplier = 1;
    if (winSymbol.startsWith('NINJA')) multiplier = 3; // Example: Ninjas pay 3x
    else if (winSymbol === 'SCROLL') multiplier = 2; // Example: Scroll pays 2x

    winAmount = winCount * currentBet * multiplier;
    // Find indices of the winning symbol in the middle row
    winningIndices = middleRow.map((symbol, index) => symbol === winSymbol ? index : -1).filter(index => index !== -1);
    return { symbol: winSymbol, count: winCount, amount: winAmount, indices: winningIndices };
  }

  return null;
};


const SlotGamePage = () => {
  const { toast } = useToast();
  const [reels, setReels] = useState(() =>
    Array(REEL_COUNT).fill(null).map(() => Array(ROW_COUNT).fill(null).map(getRandomSymbol))
  );
  const [spinning, setSpinning] = useState(false);
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [bet, setBet] = useState([MIN_BET]);
  const [autoSpin, setAutoSpin] = useState(false);
  const [lastWin, setLastWin] = useState(null);
  const [winningReelIndices, setWinningReelIndices] = useState([]);


  // Load balance and bet from localStorage
  useEffect(() => {
    const savedBalance = localStorage.getItem('slotBalance');
    const savedBet = localStorage.getItem('slotBet');
    if (savedBalance !== null) {
      setBalance(parseFloat(savedBalance));
    }
    if (savedBet !== null) {
      const parsedBet = parseInt(savedBet, 10);
      // Ensure saved bet is within bounds
      setBet([Math.max(MIN_BET, Math.min(MAX_BET, parsedBet))]);
    }
  }, []);

  // Save balance and bet to localStorage
  useEffect(() => {
    localStorage.setItem('slotBalance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('slotBet', bet[0].toString());
  }, [bet]);

  const handleSpin = useCallback(() => {
    const currentBetAmount = bet[0]; // Get current bet amount

    if (spinning || balance < currentBetAmount) {
       if (balance < currentBetAmount) {
         toast({ title: "Insufficient Balance", description: `Minimum bet is $${MIN_BET}. Your balance is $${balance.toLocaleString()}.`, variant: "destructive" });
       }
      return;
    }

    setSpinning(true);
    setBalance(prev => prev - currentBetAmount);
    setLastWin(null); // Reset last win
    setWinningReelIndices([]); // Reset winning indices

    // Generate the final symbols AFTER the spin starts
    const finalReels = reels.map(() => Array(ROW_COUNT).fill(null).map(getRandomSymbol));

    // Update the visual reels immediately for the spinning effect
    // The actual result is determined by finalReels
    setReels(prevReels => prevReels.map(() => Array(ROW_COUNT).fill(null).map(getRandomSymbol)));


    // Stagger the stopping of reels visually, but results are predetermined
    const stopTimeouts = reels.map((_, reelIndex) => {
      return setTimeout(() => {
         // Update the visual state of the specific reel to its final state
         setReels(prevVisualReels => {
             const newVisualReels = [...prevVisualReels];
             newVisualReels[reelIndex] = finalReels[reelIndex];
             return newVisualReels;
         });

        // Check if this is the last reel to stop visually
        if (reelIndex === REEL_COUNT - 1) {
          setSpinning(false); // Stop the overall spinning state
          const winResult = checkWinAndUpdate(finalReels, currentBetAmount); // Use the predetermined finalReels and currentBetAmount
          if (winResult) {
            setLastWin(winResult);
            setBalance(prev => prev + winResult.amount);
            setWinningReelIndices(winResult.indices); // Set winning indices
            toast({
              title: `WIN! ${winResult.count} x ${winResult.symbol.replace('_', ' ')}`,
              description: `You won $${winResult.amount.toLocaleString()}!`,
              variant: "default",
            });
          }
        }
      }, SPIN_DURATION * 1000 + reelIndex * 200); // Stagger visual stop time
    });

    // Cleanup timeouts if component unmounts or spin stops early
    return () => stopTimeouts.forEach(clearTimeout);

  }, [spinning, balance, bet, toast]); // Reels removed, handleSpin generates results internally now


    // Auto Spin Logic
    useEffect(() => {
        let intervalId = null; // Initialize intervalId to null
        if (autoSpin && !spinning) {
             // Check balance before attempting auto-spin
             if (balance >= bet[0]) {
                 intervalId = setInterval(() => {
                    handleSpin();
                 }, (SPIN_DURATION * 1000 + (REEL_COUNT - 1) * 200) + 1000); // Spin again after reels stop + 1s delay
             } else {
                  setAutoSpin(false); // Stop auto-spin if balance is insufficient
                  toast({ title: "Auto-Spin Stopped", description: "Insufficient balance.", variant: "destructive"});
             }
        } else if (!autoSpin && intervalId) {
            clearInterval(intervalId);
        }

        // Cleanup interval on unmount or when autoSpin/spinning changes
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    // Ensure balance and bet[0] are dependencies so it re-evaluates if they change
    }, [autoSpin, spinning, handleSpin, balance, bet]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-800 to-black">
       <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="w-full max-w-3xl"
       >
           <h1 className="text-4xl font-bold text-center mb-8 gradient-text">Ninja Slots</h1>

            <div className="slot-machine">
                <div className="slot-grid mb-6">
                     {reels.map((reelSymbols, index) => (
                         <div key={index} className="relative">
                             <SlotReel
                                 symbols={reelSymbols}
                                 isSpinning={spinning}
                                 spinDuration={SPIN_DURATION}
                                 delay={index * 0.2} // Stagger stopping animation
                             />
                              {/* Highlight winning symbols on the middle row */}
                              {winningReelIndices.includes(index) && !spinning && lastWin && (
                                  <div className="absolute inset-0 flex flex-col justify-start pointer-events-none" style={{ top: '80px' /* Position over the middle symbol */}}>
                                      <div className="h-[80px] border-4 border-primary rounded-lg animate-pulse-glow shadow-[0_0_20px_theme(colors.primary)]"></div>
                                  </div>
                              )}
                         </div>
                     ))}
                </div>

                <AnimatePresence>
                    {lastWin && !spinning && (
                         <motion.div
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -20 }}
                             className="text-center my-4 p-3 bg-primary/20 border border-primary rounded-lg"
                         >
                             <p className="text-xl font-bold text-primary">WIN! ${lastWin.amount.toLocaleString()}</p>
                             <p className="text-sm text-foreground">{`${lastWin.count} x ${lastWin.symbol.replace('_', ' ')}`}</p>
                         </motion.div>
                    )}
                </AnimatePresence>

                <div className="slot-controls grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    {/* Bet Amount Slider */}
                    <div className="space-y-2">
                         <div className="flex justify-between items-center">
                             <Label htmlFor="bet-slider" className="text-sm font-medium">Bet Amount</Label>
                             <span className="text-lg font-semibold text-primary">${bet[0]}</span>
                         </div>
                         <Slider
                             id="bet-slider"
                             min={MIN_BET}
                             max={MAX_BET}
                             step={1}
                             value={bet}
                             onValueChange={(newBet) => setBet(newBet)}
                             disabled={spinning}
                             className="[&>span:first-child]:h-2 [&>span:first-child>span]:h-2 [&>span:last-child]:h-5 [&>span:last-child]:w-5"
                             />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>${MIN_BET}</span>
                            <span>${MAX_BET}</span>
                          </div>
                    </div>

                    {/* Spin Button */}
                    <div className="flex justify-center">
                        <Button
                            size="lg"
                            onClick={handleSpin}
                            disabled={spinning || balance < bet[0]}
                            className="w-32 h-16 rounded-full bg-gradient-to-br from-primary to-red-700 text-white shadow-lg hover:from-primary/90 hover:to-red-700/90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                        >
                            <Play className="mr-2 h-6 w-6" /> {spinning ? 'Spinning' : 'Spin'}
                        </Button>
                    </div>

                    {/* Balance & Auto-Spin */}
                    <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                            <Coins className="h-5 w-5 text-yellow-400" />
                            <span className="text-lg font-semibold">${balance.toLocaleString()}</span>
                        </div>
                         <div className="flex items-center space-x-2">
                             <Label htmlFor="auto-spin" className="text-sm">Auto Spin</Label>
                             <Switch
                                 id="auto-spin"
                                 checked={autoSpin}
                                 onCheckedChange={setAutoSpin}
                                 disabled={spinning && autoSpin} // Allow turning off while spinning
                                 className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                             />
                             {autoSpin ? <Repeat className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4 text-muted-foreground" />}
                         </div>
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default SlotGamePage;
  