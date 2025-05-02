
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/MainLayout";
import { api } from "@/services/api";
import { Stock, PortfolioItem, Transaction, TradingTip, MutualFund, MutualFundHolding } from "@/types";
import { StockCard } from "@/components/StockCard";
import { PortfolioItemCard } from "@/components/PortfolioItemCard";
import { MutualFundCard } from "@/components/MutualFundCard";
import { MutualFundHoldingCard } from "@/components/MutualFundHoldingCard";
import { TransactionCard } from "@/components/TransactionCard";
import { TradingTipCard } from "@/components/TradingTipCard";
import { StockTradeModal } from "@/components/StockTradeModal";
import { MutualFundTradeModal } from "@/components/MutualFundTradeModal";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { ArrowDown, ArrowUp, ArrowRight, TrendingUp, Wallet, ChartPie, Briefcase } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const generatePortfolioChartData = (days = 30) => {
  // Generate mock portfolio growth data
  const startValue = 95000;
  const endValue = 105000;
  
  const data = [];
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Create a somewhat realistic trend with some volatility
    const progress = (days - i) / days;
    const trend = startValue + (endValue - startValue) * progress;
    const volatility = startValue * 0.03; // 3% volatility
    const randomFactor = Math.random() * volatility * 2 - volatility;
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(trend + randomFactor),
    });
  }
  
  return data;
};

// Generate sample stock performance comparison data
const generateStockPerformanceData = () => {
  return [
    {
      name: 'AAPL',
      initialValue: 2300,
      currentValue: 2350
    },
    {
      name: 'MSFT',
      initialValue: 1650,
      currentValue: 1700
    },
    {
      name: 'GOOGL',
      initialValue: 1100,
      currentValue: 1050
    },
    {
      name: 'NVDA',
      initialValue: 1250,
      currentValue: 1350
    }
  ];
};

export default function Dashboard() {
  const { user } = useAuth();
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [mutualFunds, setMutualFunds] = useState<MutualFund[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [fundHoldings, setFundHoldings] = useState<MutualFundHolding[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tradingTip, setTradingTip] = useState<TradingTip | null>(null);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [fundsValue, setFundsValue] = useState(0);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [selectedFund, setSelectedFund] = useState<MutualFund | null>(null);
  const [isStockTradeModalOpen, setIsStockTradeModalOpen] = useState(false);
  const [isFundTradeModalOpen, setIsFundTradeModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData] = useState(generatePortfolioChartData());
  const [stockPerformanceData] = useState(generateStockPerformanceData());
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [stocksData, fundsData, portfolioData, fundHoldingsData, transactionsData, tipData] = await Promise.all([
          api.stocks.getAll(),
          api.mutualFunds.getAll(),
          api.portfolio.getAll(),
          api.portfolio.getMutualFunds(),
          api.transactions.getAll(),
          api.tradingTips.getRandom(),
        ]);
        
        setStocks(stocksData);
        setMutualFunds(fundsData);
        setPortfolioItems(portfolioData);
        setFundHoldings(fundHoldingsData);
        setTransactions(transactionsData.slice(0, 5)); // Only get the latest 5
        setTradingTip(tipData);
        
        // Calculate total portfolio value
        const stocksValue = portfolioData.reduce((sum, item) => sum + item.currentValue, 0);
        const mutualFundsValue = fundHoldingsData.reduce((sum, item) => sum + item.currentValue, 0);
        
        setPortfolioValue(stocksValue);
        setFundsValue(mutualFundsValue);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
    
    // Refresh data periodically
    const interval = setInterval(fetchDashboardData, 30000);
    
    return () => clearInterval(interval);
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
    const [stocksData, fundsData, portfolioData, fundHoldingsData, transactionsData] = await Promise.all([
      api.stocks.getAll(),
      api.mutualFunds.getAll(),
      api.portfolio.getAll(),
      api.portfolio.getMutualFunds(),
      api.transactions.getAll(),
    ]);
    
    setStocks(stocksData);
    setMutualFunds(fundsData);
    setPortfolioItems(portfolioData);
    setFundHoldings(fundHoldingsData);
    setTransactions(transactionsData.slice(0, 5));
    
    // Calculate total portfolio value
    const stocksValue = portfolioData.reduce((sum, item) => sum + item.currentValue, 0);
    const mutualFundsValue = fundHoldingsData.reduce((sum, item) => sum + item.currentValue, 0);
    
    setPortfolioValue(stocksValue);
    setFundsValue(mutualFundsValue);
  };
  
  // Calculate total account value
  const totalAccountValue = portfolioValue + fundsValue + (user?.balance || 0);
  
  // Calculate total profit/loss
  const stocksProfitLoss = portfolioItems.reduce((sum, item) => sum + item.profitLoss, 0);
  const fundsProfitLoss = fundHoldings.reduce((sum, item) => sum + item.profitLoss, 0);
  const totalProfitLoss = stocksProfitLoss + fundsProfitLoss;
  
  const stocksInvestment = portfolioItems.reduce((sum, item) => sum + item.totalInvestment, 0);
  const fundsInvestment = fundHoldings.reduce((sum, item) => sum + item.totalInvestment, 0);
  const totalInvestment = stocksInvestment + fundsInvestment;
  
  const profitLossPercentage = totalInvestment > 0
    ? (totalProfitLoss / totalInvestment) * 100
    : 0;

  // Configure chart colors
  const chartConfig = {
    AAPL: { 
      label: "Apple Inc",
      color: "#22c55e" 
    },
    MSFT: { 
      label: "Microsoft",
      color: "#eab308" 
    },
    GOOGL: { 
      label: "Alphabet Inc",
      color: "#f97316" 
    },
    NVDA: { 
      label: "NVIDIA",
      color: "#8b5cf6" 
    },
    initialValue: {
      label: "Initial Value",
      color: "#9b87f5" // Purple color
    },
    currentValue: {
      label: "Current Value",
      color: "#5D9C59" // Green color
    }
  };
  
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}. Here's an overview of your trading account.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="stats-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Account Value</p>
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Wallet className="h-4 w-4 text-primary-500" />
              </div>
            </div>
            {isLoading ? (
              <Skeleton className="h-9 w-32 mt-2" />
            ) : (
              <p className="text-2xl font-bold mt-2">{formatCurrency(totalAccountValue)}</p>
            )}
          </CardContent>
        </Card>
        
        <Card className="stats-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Available Cash</p>
              <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-gain" />
              </div>
            </div>
            {isLoading ? (
              <Skeleton className="h-9 w-28 mt-2" />
            ) : (
              <p className="text-2xl font-bold mt-2">{formatCurrency(user?.balance || 0)}</p>
            )}
          </CardContent>
        </Card>
        
        <Card className="stats-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Portfolio Value</p>
              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <ChartPie className="h-4 w-4 text-primary-500" />
              </div>
            </div>
            {isLoading ? (
              <Skeleton className="h-9 w-28 mt-2" />
            ) : (
              <p className="text-2xl font-bold mt-2">{formatCurrency(portfolioValue + fundsValue)}</p>
            )}
          </CardContent>
        </Card>
        
        <Card className="stats-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Total Profit/Loss</p>
              <div className={`h-8 w-8 ${totalProfitLoss >= 0 ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"} rounded-full flex items-center justify-center`}>
                {totalProfitLoss >= 0 ? (
                  <ArrowUp className="h-4 w-4 text-gain" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-loss" />
                )}
              </div>
            </div>
            {isLoading ? (
              <Skeleton className="h-9 w-32 mt-2" />
            ) : (
              <div className="flex items-center mt-2">
                <p className={`text-2xl font-bold ${totalProfitLoss >= 0 ? "text-gain" : "text-loss"}`}>
                  {formatCurrency(Math.abs(totalProfitLoss))}
                </p>
                <span className={`ml-2 text-sm ${totalProfitLoss >= 0 ? "text-gain" : "text-loss"}`}>
                  ({Math.abs(profitLossPercentage).toFixed(2)}%)
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Track your portfolio's growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 20,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                    stroke="#888"
                  />
                  <YAxis
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    stroke="#888"
                    width={60}
                  />
                  <Tooltip
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, "Value"]}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString();
                    }}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2C74B3"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Trading Tip</CardTitle>
            <CardDescription>Improve your trading skills</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : tradingTip ? (
              <TradingTipCard tip={tradingTip} />
            ) : (
              <p>No trading tips available</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Stock Performance</CardTitle>
          <CardDescription>Compare initial investment and current value</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[350px] w-full" />
          ) : (
            <div className="h-[350px]">
              <ChartContainer
                config={chartConfig}
                className="w-full h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stockPerformanceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 30,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name"
                      tick={{ fontSize: 14 }}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(value) => `$${value}`}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 2400]}
                      ticks={[0, 600, 1200, 1800, 2400]}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ paddingTop: 15 }} />
                    <Bar 
                      dataKey="initialValue" 
                      name="Initial Value" 
                      fill={chartConfig.initialValue.color} 
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                    />
                    <Bar 
                      dataKey="currentValue" 
                      name="Current Value" 
                      fill={chartConfig.currentValue.color} 
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mb-8">
        <Tabs defaultValue="market">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="market">Market Overview</TabsTrigger>
              <TabsTrigger value="funds">Mutual Funds</TabsTrigger>
              <TabsTrigger value="portfolio">Your Portfolio</TabsTrigger>
              <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="market" className="space-y-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-28 w-full" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {stocks.map((stock) => (
                    <StockCard
                      key={stock.id}
                      stock={stock}
                      onClick={() => handleStockClick(stock)}
                    />
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" asChild>
                    <Link to="/market">
                      View All Markets <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="funds" className="space-y-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-28 w-full" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {mutualFunds.slice(0, 8).map((fund) => (
                    <MutualFundCard
                      key={fund.id}
                      fund={fund}
                      onClick={() => handleFundClick(fund)}
                    />
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" asChild>
                    <Link to="/mutual-funds">
                      View All Mutual Funds <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="portfolio" className="space-y-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-40 w-full" />
                ))}
              </div>
            ) : portfolioItems.length > 0 || fundHoldings.length > 0 ? (
              <>
                {portfolioItems.length > 0 && (
                  <>
                    <h3 className="text-lg font-medium mb-4">Stocks</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {portfolioItems.map((item) => (
                        <PortfolioItemCard
                          key={item.id}
                          item={item}
                          onClick={() => handleStockClick(item.stock)}
                        />
                      ))}
                    </div>
                  </>
                )}
                
                {fundHoldings.length > 0 && (
                  <>
                    <h3 className="text-lg font-medium mb-4">Mutual Funds</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {fundHoldings.map((holding) => (
                        <MutualFundHoldingCard
                          key={holding.id}
                          holding={holding}
                          onClick={() => handleFundClick(holding.fund)}
                        />
                      ))}
                    </div>
                  </>
                )}
                
                <div className="flex justify-end">
                  <Button variant="outline" asChild>
                    <Link to="/portfolio">
                      View Full Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <p className="mb-4 text-muted-foreground">You don't have any investments in your portfolio yet.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild>
                      <Link to="/market">Explore Stocks</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/mutual-funds">Explore Mutual Funds</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : transactions.length > 0 ? (
              <>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <TransactionCard key={transaction.id} transaction={transaction} />
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" asChild>
                    <Link to="/transactions">
                      View All Transactions <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <p className="mb-4 text-muted-foreground">You haven't made any transactions yet.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild>
                      <Link to="/market">Start Trading Stocks</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/mutual-funds">Explore Mutual Funds</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
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
