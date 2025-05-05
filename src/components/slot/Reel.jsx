
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Symbol from '@/components/slot/Symbol';
import { cn } from '@/lib/utils';

const Reel = ({ symbols, finalSymbolIndex, isSpinning, spinDuration, delay, onSpinComplete, reelIndex }) => {
  const controls = useAnimation();
  const symbolHeight = 160; // h-40 in pixels

  useEffect(() => {
    if (isSpinning) {
      controls.start({
        y: [0, -symbols.length * symbolHeight],
        transition: {
          duration: spinDuration / 1000,
          ease: 'linear',
          repeat: Infinity,
        },
      });

      // Stop animation after duration + delay
      const stopTimeout = setTimeout(() => {
        controls.stop();
        
        // Calculate the final position based on finalSymbolIndex
        // The final symbol should be in the middle position (index 1 visually)
        // We need to land on the symbol *before* the target symbol visually
        // Adjusting index to make the target symbol appear in the middle
        const targetY = -(finalSymbolIndex * symbolHeight); 

        controls.start({
          y: targetY,
          transition: {
            duration: 0.5, // Slow down to stop
            ease: [0.25, 1, 0.5, 1], // Ease out cubic
          },
        }).then(() => {
           if (onSpinComplete) {
             onSpinComplete(reelIndex);
           }
        });

      }, delay);

      return () => clearTimeout(stopTimeout);
    } else {
       // Ensure it rests at the correct final position if not spinning initially
       const targetY = -(finalSymbolIndex * symbolHeight);
       controls.start({ y: targetY, transition: { duration: 0 } });
    }
  }, [isSpinning, finalSymbolIndex, controls, symbols.length, spinDuration, delay, onSpinComplete, reelIndex, symbolHeight]);

  // Duplicate symbols array for seamless looping
  const extendedSymbols = [...symbols, ...symbols];

  return (
    <div className="slot-reel">
      <motion.div
        className="relative w-full"
        animate={controls}
        style={{ height: `${extendedSymbols.length * symbolHeight}px` }} // Set height for all symbols
      >
        {extendedSymbols.map((symbolId, index) => (
          <div
            key={index}
            className="absolute w-full"
            style={{ top: `${index * symbolHeight}px`, height: `${symbolHeight}px` }}
          >
            <Symbol symbolId={symbolId} />
          </div>
        ))}
      </motion.div>
       {/* Reel Borders/Dividers */}
       <div className="absolute inset-0 pointer-events-none border-x border-border/50"></div>
       <div className="absolute top-1/3 left-0 right-0 h-px bg-border/30 pointer-events-none"></div>
       <div className="absolute top-2/3 left-0 right-0 h-px bg-border/30 pointer-events-none"></div>
    </div>
  );
};

export default Reel;
  