
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  Copy, 
  QrCode,
  Eye,
  EyeOff,
  Search
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Sample wallet data
const walletAssets = [
  { id: 1, name: "Solana", symbol: "SOL", balance: 12.45, value: 1772.50, change: 5.67 },
  { id: 2, name: "Bitcoin", symbol: "BTC", balance: 0.023, value: 1454.65, change: -1.23 },
  { id: 3, name: "Ethereum", symbol: "ETH", balance: 0.45, value: 1555.61, change: 2.45 },
  { id: 4, name: "Cardano", symbol: "ADA", balance: 250, value: 145.00, change: -0.34 },
  { id: 5, name: "Polkadot", symbol: "DOT", balance: 35.78, value: 279.80, change: 3.21 },
];

const transactionHistory = [
  { id: 1, type: "deposit", asset: "SOL", amount: 5.0, status: "completed", date: "2025-04-28T14:32:00" },
  { id: 2, type: "withdrawal", asset: "BTC", amount: 0.01, status: "completed", date: "2025-04-25T09:15:00" },
  { id: 3, type: "deposit", asset: "ETH", amount: 0.2, status: "completed", date: "2025-04-20T18:45:00" },
  { id: 4, type: "withdrawal", asset: "SOL", amount: 2.5, status: "pending", date: "2025-04-30T10:22:00" },
  { id: 5, type: "deposit", asset: "ADA", amount: 100, status: "completed", date: "2025-04-15T11:30:00" },
];

const WalletPage = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  
  const totalBalance = walletAssets.reduce((total, asset) => total + asset.value, 0);
  
  const handleCopyAddress = () => {
    toast({
      title: "Address copied",
      description: "Wallet address has been copied to clipboard.",
    });
  };
  
  const filteredAssets = walletAssets.filter(asset => 
    asset.name.toLowerCase().includes(search.toLowerCase()) || 
    asset.symbol.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div className="py-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Wallet</h1>
          <p className="text-muted-foreground mb-8">
            Manage your crypto assets, deposit, and withdraw funds.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Balance and actions */}
            <div className="lg:col-span-1 space-y-6">
              <div className="crypto-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Total Balance</h2>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowBalance(!showBalance)}
                  >
                    {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className="mb-6">
                  {showBalance ? (
                    <div className="text-3xl font-bold">${totalBalance.toLocaleString()}</div>
                  ) : (
                    <div className="text-3xl font-bold">••••••</div>
                  )}
                  <div className="text-sm text-green-500">+2.34% today</div>
                </div>
                
                <div className="flex space-x-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex-1 bg-solana-gradient hover:opacity-90">
                        <ArrowDownLeft className="mr-2 h-4 w-4" /> Deposit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Deposit Funds</DialogTitle>
                        <DialogDescription>
                          Send funds to your wallet address below.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex flex-col items-center justify-center p-4 border border-border rounded-lg">
                          <div className="w-40 h-40 bg-white p-2 rounded-lg mb-4">
                            <div className="w-full h-full bg-black"></div>
                          </div>
                          <p className="text-sm text-center text-muted-foreground">
                            Scan this QR code to deposit funds
                          </p>
                        </div>
                        
                        <div>
                          <Label htmlFor="wallet-address">Wallet Address</Label>
                          <div className="flex mt-1">
                            <Input 
                              id="wallet-address" 
                              value="7X7m1fBsXpAW4SdMmQTNyqeKtRxJYjFrGBJ9Xq9QxPKs" 
                              readOnly 
                              className="flex-1"
                            />
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={handleCopyAddress}
                              className="ml-2"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" className="w-full">
                          <QrCode className="mr-2 h-4 w-4" /> Show QR Code
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        <ArrowUpRight className="mr-2 h-4 w-4" /> Withdraw
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Withdraw Funds</DialogTitle>
                        <DialogDescription>
                          Enter the details to withdraw your funds.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="asset">Select Asset</Label>
                          <select 
                            id="asset" 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                          >
                            {walletAssets.map(asset => (
                              <option key={asset.id} value={asset.symbol}>
                                {asset.name} ({asset.symbol})
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <Label htmlFor="recipient-address">Recipient Address</Label>
                          <Input 
                            id="recipient-address" 
                            placeholder="Enter wallet address" 
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="amount">Amount</Label>
                          <Input 
                            id="amount" 
                            type="number" 
                            placeholder="0.00" 
                            className="mt-1"
                          />
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-muted-foreground">
                              Available: 12.45 SOL
                            </span>
                            <Button variant="link" className="h-auto p-0 text-xs">
                              Max
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                        <Button className="w-full sm:w-auto">Withdraw</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              <div className="crypto-card">
                <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start">
                    <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <ArrowUpRight className="mr-2 h-4 w-4" /> Send
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <ArrowDownLeft className="mr-2 h-4 w-4" /> Receive
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Clock className="mr-2 h-4 w-4" /> History
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right column - Assets and transactions */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="assets">
                <TabsList className="w-full">
                  <TabsTrigger value="assets" className="flex-1">Assets</TabsTrigger>
                  <TabsTrigger value="transactions" className="flex-1">Transactions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="assets" className="mt-6">
                  <div className="crypto-card">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium">Your Assets</h3>
                      <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search assets..." 
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="px-4 py-3 text-left">Asset</th>
                            <th className="px-4 py-3 text-right">Balance</th>
                            <th className="px-4 py-3 text-right">Value</th>
                            <th className="px-4 py-3 text-right">24h Change</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAssets.map((asset) => (
                            <motion.tr 
                              key={asset.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-b border-border/50 hover:bg-muted/30"
                            >
                              <td className="px-4 py-4">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-3">
                                    <div className="h-6 w-6 rounded-full bg-solana-gradient opacity-70" />
                                  </div>
                                  <div>
                                    <div className="font-medium">{asset.name}</div>
                                    <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-right">
                                {asset.balance.toLocaleString()} {asset.symbol}
                              </td>
                              <td className="px-4 py-4 text-right">
                                ${asset.value.toLocaleString()}
                              </td>
                              <td className={`px-4 py-4 text-right ${
                                asset.change >= 0 ? "text-green-500" : "text-red-500"
                              }`}>
                                {asset.change >= 0 ? "+" : ""}{asset.change}%
                              </td>
                              <td className="px-4 py-4 text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" size="sm">
                                    <ArrowDownLeft className="h-3 w-3 mr-1" /> Deposit
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <ArrowUpRight className="h-3 w-3 mr-1" /> Withdraw
                                  </Button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                      
                      {filteredAssets.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No assets found matching your search.
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="transactions" className="mt-6">
                  <div className="crypto-card">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium">Transaction History</h3>
                      <Button variant="outline" size="sm">
                        <Clock className="h-4 w-4 mr-2" /> Filter
                      </Button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="px-4 py-3 text-left">Type</th>
                            <th className="px-4 py-3 text-left">Asset</th>
                            <th className="px-4 py-3 text-right">Amount</th>
                            <th className="px-4 py-3 text-right">Status</th>
                            <th className="px-4 py-3 text-right">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactionHistory.map((tx) => (
                            <motion.tr 
                              key={tx.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-b border-border/50 hover:bg-muted/30"
                            >
                              <td className="px-4 py-4">
                                <div className="flex items-center">
                                  {tx.type === "deposit" ? (
                                    <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                                      <ArrowDownLeft className="h-4 w-4 text-green-500" />
                                    </div>
                                  ) : (
                                    <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
                                      <ArrowUpRight className="h-4 w-4 text-red-500" />
                                    </div>
                                  )}
                                  <div className="capitalize">{tx.type}</div>
                                </div>
                              </td>
                              <td className="px-4 py-4">{tx.asset}</td>
                              <td className="px-4 py-4 text-right">
                                {tx.amount.toLocaleString()} {tx.asset}
                              </td>
                              <td className="px-4 py-4 text-right">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  tx.status === "completed" 
                                    ? "bg-green-500/20 text-green-500" 
                                    : "bg-yellow-500/20 text-yellow-500"
                                }`}>
                                  {tx.status}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-right">
                                {new Date(tx.date).toLocaleDateString()} {new Date(tx.date).toLocaleTimeString()}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WalletPage;
