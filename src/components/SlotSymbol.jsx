
import React from 'react';
import { Sword as Shuriken, Crosshair, ShieldQuestion, VenetianMask, Scroll, Bot } from 'lucide-react';
import { cn } from "@/lib/utils";

const symbolMap = {
  NINJA_RED: { component: <Bot className="text-red-500" size={48} />, color: 'text-red-500' },
  NINJA_BLUE: { component: <Bot className="text-blue-500" size={48} />, color: 'text-blue-500' },
  NINJA_GREEN: { component: <Bot className="text-green-500" size={48} />, color: 'text-green-500' },
  SHURIKEN: { component: <Shuriken className="text-gray-400" size={48} />, color: 'text-gray-400' },
  KUNAI: { component: <Crosshair className="text-yellow-500" size={48} />, color: 'text-yellow-500' }, // Using Crosshair as Kunai placeholder
  MASK: { component: <VenetianMask className="text-purple-500" size={48} />, color: 'text-purple-500' },
  SCROLL: { component: <Scroll className="text-orange-500" size={48} />, color: 'text-orange-500' },
  DEFAULT: { component: <ShieldQuestion size={48} />, color: 'text-muted-foreground' },
};

const SlotSymbol = React.forwardRef(({ symbol, isWinning, style }, ref) => {
  const symbolData = symbolMap[symbol] || symbolMap.DEFAULT;

  return (
    <div
      ref={ref}
      className={cn(
        "slot-symbol",
        symbolData.color,
        isWinning && "win animate-pulse-glow"
      )}
      style={style}
    >
      {symbolData.component}
    </div>
  );
});

SlotSymbol.displayName = 'SlotSymbol';

export default SlotSymbol;
  