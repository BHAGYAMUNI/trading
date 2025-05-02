import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/MainLayout";
import { api } from "@/services/api";
import { PortfolioItem, MutualFundHolding, Stock, MutualFund } from "@/types";
import { PortfolioItemCard } from "@/components/PortfolioItemCard";
import { MutualFundHoldingCard } from "@/components/MutualFundHoldingCard";
import { StockTradeModal } from "@/components/StockTradeModal";
import { MutualFundTradeModal } from "@/components/MutualFundTradeModal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

export default function Portfolio() {
  const { user } = useAuth();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [mutualFundHoldings, setMutualFundHoldings] = useState<MutualFundHolding[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [selectedFund, setSelectedFund] = useState<MutualFund | null>(null);
  const [isStockTradeModalOpen, setIsStockTradeModalOpen] = useState(false);
  const [isFundTradeModalOpen, setIsFundTradeModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  
  useEffect(() => {
    const fetchPortfolio = async () => {
      setIsLoading(true);
      try {
        const [stocks, funds] = await Promise.all([
          api.portfolio.getAll(),
          api.portfolio.getMutualFunds()
        ]);
        setPortfolioItems(stocks);
        setMutualFundHoldings(funds);
      } catch (error) {
        console.error("Failed to fetch portfolio:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPortfolio();
  }, []);
  
  const handleStockClick = (stock: Stock) => {
    setSelectedStock(stock);
    setIsStockTradeModalOpen(true);
  };
  
  const handleFundClick = (fund: MutualFund) => {
    setSelectedFund(fund);
    setIsFundTradeModalOpen(true);
  };
  
  const handleTradeComplete = async () => {
    // Refresh data after a trade
    const [stocks, funds] = await Promise.all([
      api.portfolio.getAll(),
      api.portfolio.getMutualFunds()
    ]);
    setPortfolioItems(stocks);
    setMutualFundHoldings(funds);
  };
  
  // Calculate portfolio values and returns
  const stocksValue = portfolioItems.reduce((sum, item) => sum + item.currentValue, 0);
  const fundsValue = mutualFundHoldings.reduce((sum, item) => sum + item.currentValue, 0);
  const totalPortfolioValue = stocksValue + fundsValue;
  const cashValue = user?.balance || 0;
  const totalAssetValue = totalPortfolioValue + cashValue;
  
  const stocksInvestment = portfolioItems.reduce((sum, item) => sum + item.totalInvestment, 0);
  const fundsInvestment = mutualFundHoldings.reduce((sum, item) => sum + item.totalInvestment, 0);
  const totalInvestment = stocksInvestment + fundsInvestment;
  
  const stocksProfitLoss = portfolioItems.reduce((sum, item) => sum + item.profitLoss, 0);
  const fundsProfitLoss = mutualFundHoldings.reduce((sum, item) => sum + item.profitLoss, 0);
  const totalProfitLoss = stocksProfitLoss + fundsProfitLoss;
  
  const totalProfitLossPercent = totalInvestment > 0 ? (totalProfitLoss / totalInvestment) * 100 : 0;
  
  // Prepare data for the asset allocation pie chart
  const allocationData = [
    {
      name: "Cash",
      value: cashValue,
      color: "#0ea5e9", // Bright blue
      percent: totalAssetValue > 0 ? ((cashValue / totalAssetValue) * 100).toFixed(0) + "%" : "0%"
    }
  ];
  
  // Add individual stock holdings to the allocation data
  portfolioItems.forEach(item => {
    if (item.currentValue > 0) {
      allocationData.push({
        name: item.stock.symbol,
        value: item.currentValue,
        color: getStockColor(item.stock.symbol),
        percent: totalAssetValue > 0 ? ((item.currentValue / totalAssetValue) * 100).toFixed(0) + "%" : "0%"
      });
    }
  });
  
  // Add mutual funds as a combined entry if needed
  if (fundsValue > 0) {
    allocationData.push({
      name: "Mutual Funds",
      value: fundsValue,
      color: "#5D9C59", // Green
      percent: totalAssetValue > 0 ? ((fundsValue / totalAssetValue) * 100).toFixed(0) + "%" : "0%"
    });
  }
  
  function getStockColor(symbol: string) {
    const colorMap: Record<string, string> = {
      "AAPL": "#22c55e", // Green
      "MSFT": "#eab308", // Yellow
      "GOOGL": "#f97316", // Orange
      "AMZN": "#06b6d4", // Cyan
      "NVDA": "#8b5cf6", // Purple
      "TSLA": "#ef4444", // Red
      "META": "#3b82f6", // Blue
    };
    
    return colorMap[symbol] || "#9ca3af"; // Default gray
  }
  
  // Configure chart tooltips
  const chartConfig = {
    cash: { 
      label: "Cash",
      color: "#0ea5e9" 
    },
    stocks: { 
      label: "Stocks",
      color: "#2C74B3" 
    },
    funds: { 
      label: "Mutual Funds",
      color: "#5D9C59" 
    },
    // Add colors for specific stocks
    AAPL: { 
      label: "Apple (AAPL)", 
      color: "#22c55e" 
    },
    MSFT: { 
      label: "Microsoft (MSFT)", 
      color: "#eab308" 
    },
    GOOGL: { 
      label: "Google (GOOGL)", 
      color: "#f97316" 
    },
    NVDA: { 
      label: "NVIDIA (NVDA)", 
      color: "#8b5cf6" 
    }
  };
  
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <p className="text-muted-foreground">
          Track your investments and performance
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="stats-card">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Total Value</p>
            {isLoading ? (
              <Skeleton className="h-9 w-28 mt-2" />
            ) : (
              <p className="text-2xl font-bold mt-2">{formatCurrency(totalPortfolioValue)}</p>
            )}
          </CardContent>
        </Card>
        
        <Card className="stats-card">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Stocks Value</p>
            {isLoading ? (
              <Skeleton className="h-9 w-28 mt-2" />
            ) : (
              <p className="text-2xl font-bold mt-2">{formatCurrency(stocksValue)}</p>
            )}
          </CardContent>
        </Card>
        
        <Card className="stats-card">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Funds Value</p>
            {isLoading ? (
              <Skeleton className="h-9 w-28 mt-2" />
            ) : (
              <p className="text-2xl font-bold mt-2">{formatCurrency(fundsValue)}</p>
            )}
          </CardContent>
        </Card>
        
        <Card className="stats-card">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Total Profit/Loss</p>
            {isLoading ? (
              <Skeleton className="h-9 w-28 mt-2" />
            ) : (
              <div className="flex items-center mt-2">
                <p className={`text-2xl font-bold ${totalProfitLoss >= 0 ? "text-gain" : "text-loss"}`}>
                  {formatCurrency(Math.abs(totalProfitLoss))}
                </p>
                <span className={`ml-2 text-sm ${totalProfitLoss >= 0 ? "text-gain" : "text-loss"}`}>
                  {totalProfitLoss >= 0 ? (
                    <ArrowUp className="h-3 w-3 inline mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 inline mr-1" />
                  )}
                  {Math.abs(totalProfitLossPercent).toFixed(2)}%
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Allocation</CardTitle>
            <CardDescription>Distribution of your portfolio across assets</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <>
                {allocationData.length > 0 ? (
                  <div className="h-[350px]">
                    <ChartContainer
                      config={chartConfig}
                      className="w-full h-full"
                    >
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={allocationData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${percent}`}
                          >
                            {allocationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<ChartTooltipContent />} />
                          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[350px]">
                    <p className="text-muted-foreground">No data available</p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation Overview</CardTitle>
            <CardDescription>Percentage breakdown of your investments</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {allocationData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="h-4 w-4 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-4">{formatCurrency(item.value)}</span>
                      <span className="font-medium w-16 text-right">{item.percent}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Holdings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="stocks">Stocks</TabsTrigger>
              <TabsTrigger value="funds">Mutual Funds</TabsTrigger>
            </TabsList>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : (
              <>
                <TabsContent value="all" className="space-y-6 mt-0">
                  {portfolioItems.length > 0 || mutualFundHoldings.length > 0 ? (
                    <>
                      {portfolioItems.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium mb-4">Stocks</h3>
                          <div className="space-y-4">
                            {portfolioItems.map((item) => (
                              <PortfolioItemCard
                                key={item.id}
                                item={item}
                                onClick={() => handleStockClick(item.stock)}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      {mutualFundHoldings.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium mb-4">Mutual Funds</h3>
                          <div className="space-y-4">
                            {mutualFundHoldings.map((holding) => (
                              <MutualFundHoldingCard
                                key={holding.id}
                                holding={holding}
                                onClick={() => handleFundClick(holding.fund)}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No holdings found</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="stocks" className="space-y-6 mt-0">
                  {portfolioItems.length > 0 ? (
                    <div className="space-y-4">
                      {portfolioItems.map((item) => (
                        <PortfolioItemCard
                          key={item.id}
                          item={item}
                          onClick={() => handleStockClick(item.stock)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No stocks found</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="funds" className="space-y-6 mt-0">
                  {mutualFundHoldings.length > 0 ? (
                    <div className="space-y-4">
                      {mutualFundHoldings.map((holding) => (
                        <MutualFundHoldingCard
                          key={holding.id}
                          holding={holding}
                          onClick={() => handleFundClick(holding.fund)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No mutual funds found</p>
                    </div>
                  )}
                </TabsContent>
              </>
            )}
          </Tabs>
        </CardContent>
      </Card>
      
      {selectedStock && (
        <StockTradeModal
          stock={selectedStock}
          isOpen={isStockTradeModalOpen}
          onClose={() => setIsStockTradeModalOpen(false)}
          onTransactionComplete={handleTradeComplete}
        />
      )}
      
      {selectedFund && (
        <MutualFundTradeModal
          fund={selectedFund}
          isOpen={isFundTradeModalOpen}
          onClose={() => setIsFundTradeModalOpen(false)}
          onTransactionComplete={handleTradeComplete}
        />
      )}
    </MainLayout>
  );
}
