
import React from 'react';
import { motion } from 'framer-motion';
import SlotSymbol from '@/components/SlotSymbol';

const SlotReel = ({ symbols, isSpinning, spinDuration, delay }) => {
  const reelHeight = 80 * symbols.length; // 80px per symbol

  return (
    <div className="slot-reel">
      <motion.div
        style={{ y: 0, height: reelHeight * 2 }} // Double height for wrapping effect
        initial={{ y: 0 }}
        animate={isSpinning ? { y: [0, -reelHeight] } : { y: 0 }}
        transition={
          isSpinning
            ? {
                y: {
                  duration: spinDuration,
                  repeat: Infinity,
                  ease: "linear", // Constant speed for spinning
                },
              }
            : {
                y: {
                  duration: 0.5, // Duration for stopping animation
                  ease: [0.25, 1, 0.5, 1], // Decelerating ease
                  delay: delay,
                },
              }
        }
        className="absolute top-0 left-0 w-full"
      >
        {/* Render symbols twice for seamless looping */}
        {[...symbols, ...symbols].map((symbol, index) => (
          <SlotSymbol
            key={`${index}-${symbol}`}
            symbol={symbol}
            style={{ transform: `translateY(${index * 80}px)` }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SlotReel;
  