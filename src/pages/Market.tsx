
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { api } from "@/services/api";
import { Stock } from "@/types";
import { StockCard } from "@/components/StockCard";
import { StockTradeModal } from "@/components/StockTradeModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

export default function Market() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [marketStats, setMarketStats] = useState({
    gainers: 0,
    losers: 0,
    unchanged: 0
  });
  
  useEffect(() => {
    const fetchStocks = async () => {
      setIsLoading(true);
      try {
        const data = await api.stocks.getAll();
        setStocks(data);
        setFilteredStocks(data);
        
        // Calculate market stats
        const gainers = data.filter(stock => stock.changePercent > 0).length;
        const losers = data.filter(stock => stock.changePercent < 0).length;
        const unchanged = data.filter(stock => stock.changePercent === 0).length;
        
        setMarketStats({
          gainers,
          losers,
          unchanged
        });
      } catch (error) {
        console.error("Failed to fetch stocks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStocks();
    
    // Refresh stock data periodically
    const interval = setInterval(fetchStocks, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredStocks(stocks);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = stocks.filter(
        stock => stock.symbol.toLowerCase().includes(query) || 
                 stock.name.toLowerCase().includes(query)
      );
      setFilteredStocks(filtered);
    }
  }, [searchQuery, stocks]);
  
  const handleStockClick = (stock: Stock) => {
    setSelectedStock(stock);
    setIsTradeModalOpen(true);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled in the effect
  };
  
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Market</h1>
        <p className="text-muted-foreground">
          Explore stocks and make trades
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Gainers</p>
              <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-500" />
              </div>
            </div>
            {isLoading ? (
              <Skeleton className="h-9 w-16 mt-2" />
            ) : (
              <p className="text-2xl font-bold mt-2 text-green-600 dark:text-green-500">
                {marketStats.gainers}
              </p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Losers</p>
              <div className="h-8 w-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-500" />
              </div>
            </div>
            {isLoading ? (
              <Skeleton className="h-9 w-16 mt-2" />
            ) : (
              <p className="text-2xl font-bold mt-2 text-red-600 dark:text-red-500">
                {marketStats.losers}
              </p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Total Stocks</p>
              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
            </div>
            {isLoading ? (
              <Skeleton className="h-9 w-16 mt-2" />
            ) : (
              <p className="text-2xl font-bold mt-2">{stocks.length}</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Stocks</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by symbol or company name" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>All Stocks</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-28 w-full" />
              ))}
            </div>
          ) : filteredStocks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredStocks.map((stock) => (
                <StockCard
                  key={stock.id}
                  stock={stock}
                  onClick={() => handleStockClick(stock)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No stocks found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {selectedStock && (
        <StockTradeModal
          stock={selectedStock}
          isOpen={isTradeModalOpen}
          onClose={() => setIsTradeModalOpen(false)}
          onTransactionComplete={() => {}}
        />
      )}
    </MainLayout>
  );
}
