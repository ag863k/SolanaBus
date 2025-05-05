
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Cpu, CircuitBoard, Diamond, Gem, DollarSign, Cherry, Banana, Grape } from 'lucide-react';
import { cn } from '@/lib/utils';

const symbolMap = {
  BOT: { icon: Bot, color: 'text-neon-blue', glow: 'neon-glow-blue' },
  CPU: { icon: Cpu, color: 'text-neon-green', glow: 'neon-glow-green' },
  BOARD: { icon: CircuitBoard, color: 'text-neon-pink', glow: 'neon-glow-pink' },
  DIAMOND: { icon: Diamond, color: 'text-sky-400', glow: '' },
  GEM: { icon: Gem, color: 'text-emerald-400', glow: '' },
  CASH: { icon: DollarSign, color: 'text-yellow-400', glow: '' },
  CHERRY: { icon: Cherry, color: 'text-red-500', glow: '' },
  BANANA: { icon: Banana, color: 'text-yellow-300', glow: '' },
  GRAPE: { icon: Grape, color: 'text-purple-500', glow: '' },
};

const Symbol = ({ symbolId, isWinning }) => {
  const { icon: Icon, color, glow } = symbolMap[symbolId] || symbolMap.BOT; // Default to BOT if symbolId is invalid

  return (
    <motion.div
      className={cn(
        'slot-symbol',
        color,
        glow,
        isWinning && 'animate-pulse-glow scale-110'
      )}
      initial={{ opacity: 0.8, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Icon size={64} strokeWidth={1.5} />
    </motion.div>
  );
};

export default Symbol;
  