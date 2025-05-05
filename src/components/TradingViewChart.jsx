
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  CandlestickChart, 
  BarChart3, 
  LineChart as LineChartIcon,
  Clock,
  ZoomIn,
  ZoomOut,
  Maximize2
} from "lucide-react";

// Generate sample data
const generateData = (days, volatility = 0.05, trend = 0.001) => {
  const data = [];
  let price = 100 + Math.random() * 50;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    // Add some randomness with a slight upward trend
    const change = (Math.random() - 0.5) * volatility * price + trend * price;
    price += change;
    
    // Calculate high, low, open, close
    const open = price;
    const close = price + (Math.random() - 0.5) * 0.8;
    const high = Math.max(open, close) + Math.random() * 1.5;
    const low = Math.min(open, close) - Math.random() * 1.5;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: parseFloat(price.toFixed(2)),
      open: parseFloat(open.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000 + 500000),
    });
  }
  
  return data;
};

const timeframes = [
  { label: "1H", days: 1, points: 60 },
  { label: "1D", days: 1, points: 24 },
  { label: "1W", days: 7, points: 7 },
  { label: "1M", days: 30, points: 30 },
  { label: "3M", days: 90, points: 90 },
  { label: "1Y", days: 365, points: 52 },
];

const TradingViewChart = ({ symbol = "SOL/USDT" }) => {
  const [chartType, setChartType] = useState("area");
  const [timeframe, setTimeframe] = useState(timeframes[2]); // Default to 1W
  const [data, setData] = useState(() => generateData(timeframe.days));
  
  const handleTimeframeChange = (tf) => {
    setTimeframe(tf);
    setData(generateData(tf.days));
  };
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-primary">Price: ${payload[0].value.toFixed(2)}</p>
          {chartType !== "line" && (
            <>
              <p>Open: ${payload[0].payload.open.toFixed(2)}</p>
              <p>Close: ${payload[0].payload.close.toFixed(2)}</p>
              <p>High: ${payload[0].payload.high.toFixed(2)}</p>
              <p>Low: ${payload[0].payload.low.toFixed(2)}</p>
              <p>Volume: {payload[0].payload.volume.toLocaleString()}</p>
            </>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="chart-container p-4 bg-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">{symbol}</h2>
          <p className="text-sm text-muted-foreground">
            ${data[data.length - 1].price.toFixed(2)}
            <span className="ml-2 text-green-500">+2.45%</span>
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-1">
          <Button 
            variant={chartType === "line" ? "default" : "outline"} 
            size="sm"
            onClick={() => setChartType("line")}
          >
            <LineChartIcon className="h-4 w-4 mr-1" />
            Line
          </Button>
          <Button 
            variant={chartType === "area" ? "default" : "outline"} 
            size="sm"
            onClick={() => setChartType("area")}
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            Area
          </Button>
          <Button 
            variant={chartType === "candle" ? "default" : "outline"} 
            size="sm"
            onClick={() => setChartType("candle")}
          >
            <CandlestickChart className="h-4 w-4 mr-1" />
            Candle
          </Button>
        </div>
        
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
          {timeframes.map((tf) => (
            <Button 
              key={tf.label}
              variant={timeframe.label === tf.label ? "default" : "outline"} 
              size="sm"
              onClick={() => handleTimeframeChange(tf)}
            >
              {tf.label}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis 
                domain={['auto', 'auto']} 
                stroke="#888"
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#9945FF" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#14F195", stroke: "#9945FF", strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9945FF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#14F195" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis 
                domain={['auto', 'auto']} 
                stroke="#888"
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#9945FF" 
                fillOpacity={1}
                fill="url(#colorPrice)" 
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TradingViewChart;
