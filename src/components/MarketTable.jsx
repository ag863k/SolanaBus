
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Star, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample market data
const marketData = [
  { id: 1, name: "Solana", symbol: "SOL/USDT", price: 142.35, change: 5.67, volume: 1245678901, marketCap: 58765432100 },
  { id: 2, name: "Bitcoin", symbol: "BTC/USDT", price: 63245.78, change: -1.23, volume: 32456789012, marketCap: 1234567890123 },
  { id: 3, name: "Ethereum", symbol: "ETH/USDT", price: 3456.92, change: 2.45, volume: 12345678901, marketCap: 415678901234 },
  { id: 4, name: "Cardano", symbol: "ADA/USDT", price: 0.58, change: -0.34, volume: 567890123, marketCap: 20345678901 },
  { id: 5, name: "Polkadot", symbol: "DOT/USDT", price: 7.82, change: 3.21, volume: 345678901, marketCap: 9876543210 },
  { id: 6, name: "Avalanche", symbol: "AVAX/USDT", price: 35.67, change: 7.89, volume: 456789012, marketCap: 12345678901 },
  { id: 7, name: "Polygon", symbol: "MATIC/USDT", price: 0.92, change: -2.34, volume: 234567890, marketCap: 8765432109 },
  { id: 8, name: "Chainlink", symbol: "LINK/USDT", price: 18.45, change: 4.56, volume: 345678901, marketCap: 9876543210 },
  { id: 9, name: "Uniswap", symbol: "UNI/USDT", price: 8.76, change: -1.87, volume: 234567890, marketCap: 6543210987 },
  { id: 10, name: "Dogecoin", symbol: "DOGE/USDT", price: 0.12, change: 9.87, volume: 3456789012, marketCap: 16789012345 },
  { id: 11, name: "Shiba Inu", symbol: "SHIB/USDT", price: 0.00002345, change: 12.34, volume: 2345678901, marketCap: 13456789012 },
  { id: 12, name: "Litecoin", symbol: "LTC/USDT", price: 87.65, change: -0.98, volume: 1234567890, marketCap: 6543210987 },
  { id: 13, name: "Binance Coin", symbol: "BNB/USDT", price: 567.89, change: 3.45, volume: 3456789012, marketCap: 87654321098 },
  { id: 14, name: "Ripple", symbol: "XRP/USDT", price: 0.54, change: -4.32, volume: 2345678901, marketCap: 25678901234 },
  { id: 15, name: "Cosmos", symbol: "ATOM/USDT", price: 9.87, change: 2.34, volume: 345678901, marketCap: 2876543210 },
];

const MarketTable = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("marketCap");
  const [sortDirection, setSortDirection] = useState("desc");
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("desc");
    }
  };
  
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  const formatNumber = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };
  
  // Filter and sort data
  const filteredData = marketData
    .filter(crypto => {
      if (showFavoritesOnly) {
        return favorites.includes(crypto.id) && 
          (crypto.name.toLowerCase().includes(search.toLowerCase()) || 
           crypto.symbol.toLowerCase().includes(search.toLowerCase()));
      }
      return crypto.name.toLowerCase().includes(search.toLowerCase()) || 
             crypto.symbol.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
  
  return (
    <div className="crypto-card">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold">Cryptocurrency Prices</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search coins..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" onClick={() => setShowFavoritesOnly(false)}>All Coins</SelectItem>
              <SelectItem value="favorites" onClick={() => setShowFavoritesOnly(true)}>Favorites</SelectItem>
              <SelectItem value="gainers">Top Gainers</SelectItem>
              <SelectItem value="losers">Top Losers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-4 py-3 text-left"></th>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th 
                className="px-4 py-3 text-right cursor-pointer hover:text-primary"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center justify-end">
                  Price
                  {sortBy === "price" && (
                    sortDirection === "asc" ? 
                      <ArrowUp className="ml-1 h-4 w-4" /> : 
                      <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-right cursor-pointer hover:text-primary"
                onClick={() => handleSort("change")}
              >
                <div className="flex items-center justify-end">
                  24h %
                  {sortBy === "change" && (
                    sortDirection === "asc" ? 
                      <ArrowUp className="ml-1 h-4 w-4" /> : 
                      <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-right cursor-pointer hover:text-primary hidden md:table-cell"
                onClick={() => handleSort("volume")}
              >
                <div className="flex items-center justify-end">
                  24h Volume
                  {sortBy === "volume" && (
                    sortDirection === "asc" ? 
                      <ArrowUp className="ml-1 h-4 w-4" /> : 
                      <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-right cursor-pointer hover:text-primary hidden md:table-cell"
                onClick={() => handleSort("marketCap")}
              >
                <div className="flex items-center justify-end">
                  Market Cap
                  {sortBy === "marketCap" && (
                    sortDirection === "asc" ? 
                      <ArrowUp className="ml-1 h-4 w-4" /> : 
                      <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((crypto, index) => (
              <motion.tr 
                key={crypto.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-border/50 hover:bg-muted/30"
              >
                <td className="px-4 py-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => toggleFavorite(crypto.id)}
                    className={favorites.includes(crypto.id) ? "text-yellow-500" : "text-muted-foreground"}
                  >
                    <Star className="h-4 w-4" fill={favorites.includes(crypto.id) ? "currentColor" : "none"} />
                  </Button>
                </td>
                <td className="px-4 py-4 text-muted-foreground">{index + 1}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-3">
                      <div className="h-6 w-6 rounded-full bg-solana-gradient opacity-70" />
                    </div>
                    <div>
                      <div className="font-medium">{crypto.name}</div>
                      <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  {crypto.price < 0.01 
                    ? `$${crypto.price.toFixed(8)}` 
                    : `$${crypto.price.toLocaleString()}`}
                </td>
                <td className={`px-4 py-4 text-right ${
                  crypto.change >= 0 ? "text-green-500" : "text-red-500"
                }`}>
                  <div className="flex items-center justify-end">
                    {crypto.change >= 0 ? (
                      <ArrowUp className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDown className="mr-1 h-4 w-4" />
                    )}
                    {Math.abs(crypto.change).toFixed(2)}%
                  </div>
                </td>
                <td className="px-4 py-4 text-right hidden md:table-cell">
                  {formatNumber(crypto.volume)}
                </td>
                <td className="px-4 py-4 text-right hidden md:table-cell">
                  {formatNumber(crypto.marketCap)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketTable;
