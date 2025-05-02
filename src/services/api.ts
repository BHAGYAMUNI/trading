import { 
  User, 
  Stock, 
  MutualFund,
  PortfolioItem, 
  Transaction, 
  MutualFundTransaction,
  MutualFundHolding,
  LeaderboardEntry, 
  StockNews, 
  TradingTip 
} from "@/types";

// Helper function to generate random IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Mock user data
let currentUser: User = {
  id: "user1",
  name: "John Doe",
  email: "john@example.com",
  balance: 100000,
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
  updatedAt: new Date().toISOString(),
};

// Mock stocks data
const stocksData: Stock[] = [
  {
    id: "aapl",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.63,
    change: 1.25,
    changePercent: 0.69,
  },
  {
    id: "msft",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 375.28,
    change: -2.85,
    changePercent: -0.75,
  },
  {
    id: "amzn",
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 178.15,
    change: 3.42,
    changePercent: 1.96,
  },
  {
    id: "googl",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 143.96,
    change: -1.28,
    changePercent: -0.88,
  },
  {
    id: "meta",
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 471.05,
    change: 5.23,
    changePercent: 1.12,
  },
  {
    id: "tsla",
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 180.05,
    change: -3.45,
    changePercent: -1.88,
  },
  {
    id: "nvda",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 924.79,
    change: 15.63,
    changePercent: 1.72,
  },
  {
    id: "wmt",
    symbol: "WMT",
    name: "Walmart Inc.",
    price: 60.45,
    change: 0.32,
    changePercent: 0.53,
  },
];

// Mock mutual funds data
const mutualFundsData: MutualFund[] = [
  {
    id: "vfiax",
    symbol: "VFIAX",
    name: "Vanguard 500 Index Fund Admiral",
    price: 431.26,
    change: 2.15,
    changePercent: 0.50,
    category: "Large Blend",
    risk: "Medium",
    expenseRatio: 0.04,
    ytdReturn: 8.15,
    oneYearReturn: 15.23,
    threeYearReturn: 10.56,
    fiveYearReturn: 12.83,
    assetAllocation: {
      stocks: 98.5,
      bonds: 0,
      cash: 1.5,
      other: 0
    },
    description: "This index fund seeks to track the performance of the S&P 500 Index, providing diversified exposure to large U.S. companies."
  },
  {
    id: "vbtlx",
    symbol: "VBTLX",
    name: "Vanguard Total Bond Market Index Fund Admiral",
    price: 10.71,
    change: -0.02,
    changePercent: -0.19,
    category: "Intermediate Core Bond",
    risk: "Low",
    expenseRatio: 0.05,
    ytdReturn: 1.25,
    oneYearReturn: 2.83,
    threeYearReturn: 1.56,
    fiveYearReturn: 3.21,
    assetAllocation: {
      stocks: 0,
      bonds: 97.5,
      cash: 2.5,
      other: 0
    },
    description: "This bond index fund provides broad exposure to U.S. investment-grade bonds with a wide range of maturities."
  },
  {
    id: "vtsax",
    symbol: "VTSAX",
    name: "Vanguard Total Stock Market Index Fund Admiral",
    price: 119.87,
    change: 0.57,
    changePercent: 0.48,
    category: "Large Blend",
    risk: "Medium",
    expenseRatio: 0.04,
    ytdReturn: 7.92,
    oneYearReturn: 14.56,
    threeYearReturn: 9.87,
    fiveYearReturn: 11.92,
    assetAllocation: {
      stocks: 99,
      bonds: 0,
      cash: 1,
      other: 0
    },
    description: "This index fund seeks to track the performance of the CRSP US Total Market Index, providing exposure to the entire U.S. equity market."
  },
  {
    id: "vwigx",
    symbol: "VWIGX",
    name: "Vanguard International Growth Fund",
    price: 38.52,
    change: -0.26,
    changePercent: -0.67,
    category: "Foreign Large Growth",
    risk: "High",
    expenseRatio: 0.43,
    ytdReturn: 6.43,
    oneYearReturn: 18.76,
    threeYearReturn: 7.19,
    fiveYearReturn: 13.45,
    assetAllocation: {
      stocks: 95,
      bonds: 0,
      cash: 5,
      other: 0
    },
    description: "This actively managed fund seeks long-term capital appreciation by investing in stocks of companies located outside the United States."
  },
  {
    id: "vgslx",
    symbol: "VGSLX",
    name: "Vanguard Real Estate Index Fund Admiral",
    price: 102.36,
    change: 1.12,
    changePercent: 1.11,
    category: "Real Estate",
    risk: "Medium",
    expenseRatio: 0.12,
    ytdReturn: 5.76,
    oneYearReturn: 9.34,
    threeYearReturn: 3.67,
    fiveYearReturn: 7.51,
    assetAllocation: {
      stocks: 97,
      bonds: 0,
      cash: 3,
      other: 0
    },
    description: "This index fund seeks to track the performance of the MSCI US Investable Market Real Estate 25/50 Index, providing exposure to real estate investment trusts."
  },
  {
    id: "fsptx",
    symbol: "FSPTX",
    name: "Fidelity Select Technology Portfolio",
    price: 25.85,
    change: 0.32,
    changePercent: 1.25,
    category: "Technology",
    risk: "High",
    expenseRatio: 0.69,
    ytdReturn: 10.54,
    oneYearReturn: 22.37,
    threeYearReturn: 15.82,
    fiveYearReturn: 20.15,
    assetAllocation: {
      stocks: 92,
      bonds: 0,
      cash: 8,
      other: 0
    },
    description: "This actively managed fund invests primarily in companies engaged in offering, using, or developing technology products, processes, or services."
  },
  {
    id: "prhyx",
    symbol: "PRHYX",
    name: "T. Rowe Price High Yield Fund",
    price: 6.42,
    change: -0.01,
    changePercent: -0.16,
    category: "High Yield Bond",
    risk: "Medium",
    expenseRatio: 0.72,
    ytdReturn: 3.15,
    oneYearReturn: 7.26,
    threeYearReturn: 4.53,
    fiveYearReturn: 5.89,
    assetAllocation: {
      stocks: 0,
      bonds: 92,
      cash: 8,
      other: 0
    },
    description: "This actively managed bond fund invests in a diversified portfolio of high-yield corporate bonds, providing income potential with higher risk."
  },
  {
    id: "vghcx",
    symbol: "VGHCX",
    name: "Vanguard Health Care Fund",
    price: 238.94,
    change: 0.76,
    changePercent: 0.32,
    category: "Health",
    risk: "Medium",
    expenseRatio: 0.32,
    ytdReturn: 4.25,
    oneYearReturn: 9.87,
    threeYearReturn: 7.65,
    fiveYearReturn: 11.24,
    assetAllocation: {
      stocks: 94,
      bonds: 0,
      cash: 6,
      other: 0
    },
    description: "This actively managed fund invests in stocks of companies principally engaged in the development, production, or distribution of health care services."
  },
];

// Mock portfolio data
let portfolioItems: PortfolioItem[] = [
  {
    id: "port-1",
    stock: stocksData[0],
    quantity: 10,
    avgBuyPrice: 175.50,
    currentValue: 10 * stocksData[0].price,
    totalInvestment: 10 * 175.50,
    profitLoss: 10 * (stocksData[0].price - 175.50),
    profitLossPercent: ((stocksData[0].price - 175.50) / 175.50) * 100,
  },
  {
    id: "port-2",
    stock: stocksData[1],
    quantity: 5,
    avgBuyPrice: 360.25,
    currentValue: 5 * stocksData[1].price,
    totalInvestment: 5 * 360.25,
    profitLoss: 5 * (stocksData[1].price - 360.25),
    profitLossPercent: ((stocksData[1].price - 360.25) / 360.25) * 100,
  },
];

// Mock mutual fund holdings data
let mutualFundHoldings: MutualFundHolding[] = [
  {
    id: "mf-hold-1",
    fund: mutualFundsData[0],
    quantity: 5,
    avgBuyPrice: 425.10,
    currentValue: 5 * mutualFundsData[0].price,
    totalInvestment: 5 * 425.10,
    profitLoss: 5 * (mutualFundsData[0].price - 425.10),
    profitLossPercent: ((mutualFundsData[0].price - 425.10) / 425.10) * 100,
  },
  {
    id: "mf-hold-2",
    fund: mutualFundsData[2],
    quantity: 10,
    avgBuyPrice: 115.75,
    currentValue: 10 * mutualFundsData[2].price,
    totalInvestment: 10 * 115.75,
    profitLoss: 10 * (mutualFundsData[2].price - 115.75),
    profitLossPercent: ((mutualFundsData[2].price - 115.75) / 115.75) * 100,
  },
];

// Mock transactions
let transactions: Transaction[] = [
  {
    id: "trans-1",
    type: "BUY",
    stock: stocksData[0],
    quantity: 10,
    price: 175.50,
    total: 10 * 175.50,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
  {
    id: "trans-2",
    type: "BUY",
    stock: stocksData[1],
    quantity: 5,
    price: 360.25,
    total: 5 * 360.25,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
];

// Mock mutual fund transactions
let mutualFundTransactions: MutualFundTransaction[] = [
  {
    id: "mf-trans-1",
    type: "BUY",
    fund: mutualFundsData[0],
    quantity: 5,
    price: 425.10,
    total: 5 * 425.10,
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
  {
    id: "mf-trans-2",
    type: "BUY",
    fund: mutualFundsData[2],
    quantity: 10,
    price: 115.75,
    total: 10 * 115.75,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
];

// Mock news data
const newsData: StockNews[] = [
  {
    id: "news-1",
    title: "Tech Stocks Rally As Inflation Fears Ease",
    description: "Technology stocks surged on Wednesday as new economic data showed inflation cooling, potentially allowing the Federal Reserve to ease its aggressive interest rate hikes.",
    url: "https://example.com/news/tech-stocks-rally",
    source: "Financial Times",
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    relatedSymbols: ["AAPL", "MSFT", "GOOGL"],
  },
  {
    id: "news-2",
    title: "Amazon Reports Better Than Expected Earnings",
    description: "E-commerce giant Amazon beat analyst expectations in its quarterly report, with cloud services driving much of the growth despite economic headwinds.",
    url: "https://example.com/news/amazon-earnings",
    source: "The Wall Street Journal",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    relatedSymbols: ["AMZN"],
  },
  {
    id: "news-3",
    title: "New Fed Policy Expected to Impact Market",
    description: "Experts predict significant market movements as the Federal Reserve announces changes to its monetary policy framework.",
    url: "https://example.com/news/fed-policy",
    source: "CNBC",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
];

// Mock trading tips
const tradingTips: TradingTip[] = [
  {
    id: "tip-1",
    title: "Diversification is Key",
    content: "Spread your investments across different assets, sectors, and regions to reduce risk and potentially improve returns over time.",
    category: "Strategy",
  },
  {
    id: "tip-2",
    title: "Understanding P/E Ratio",
    content: "The Price-to-Earnings (P/E) ratio helps assess if a stock is overvalued or undervalued relative to its earnings. A high P/E may indicate high expected growth.",
    category: "Analysis",
  },
  {
    id: "tip-3",
    title: "Set Stop-Loss Orders",
    content: "Use stop-loss orders to automatically sell a security when it reaches a certain price, helping to limit potential losses in volatile markets.",
    category: "Risk Management",
  },
];

// Mock leaderboard data
const leaderboardData: LeaderboardEntry[] = [
  {
    userId: "user2",
    userName: "Jane Smith",
    rank: 1,
    portfolioValue: 124500,
    profitLoss: 24500,
    profitLossPercent: 24.5,
  },
  {
    userId: "user1", // current user
    userName: "John Doe",
    rank: 2,
    portfolioValue: 112000,
    profitLoss: 12000,
    profitLossPercent: 12.0,
  },
  {
    userId: "user3",
    userName: "Bob Johnson",
    rank: 3,
    portfolioValue: 108750,
    profitLoss: 8750,
    profitLossPercent: 8.75,
  },
  {
    userId: "user4",
    userName: "Alice Brown",
    rank: 4,
    portfolioValue: 103200,
    profitLoss: 3200,
    profitLossPercent: 3.2,
  },
  {
    userId: "user5",
    userName: "Charlie Davis",
    rank: 5,
    portfolioValue: 98500,
    profitLoss: -1500,
    profitLossPercent: -1.5,
  },
];

// API mock service
export const api = {
  // Auth API
  auth: {
    login: async (email: string, password: string) => {
      // In a real app, this would validate credentials against a backend
      if (email === "john@example.com" && password === "password") {
        return { user: currentUser, token: "mock-jwt-token" };
      }
      throw new Error("Invalid credentials");
    },
    register: async (name: string, email: string, password: string) => {
      // In a real app, this would create a new user account in the backend
      const now = new Date().toISOString();
      const user: User = {
        id: generateId(),
        name,
        email,
        balance: 100000, // Starting balance
        createdAt: now,
        updatedAt: now,
      };
      currentUser = user;
      return { user, token: "mock-jwt-token" };
    },
    getCurrentUser: async () => {
      // In a real app, this would validate the JWT token and return the user
      return currentUser;
    },
  },
  
  // Stocks API
  stocks: {
    getAll: async () => stocksData,
    getById: async (id: string) => stocksData.find(stock => stock.id === id),
  },
  
  // Mutual Funds API
  mutualFunds: {
    getAll: async () => mutualFundsData,
    getById: async (id: string) => mutualFundsData.find(fund => fund.id === id),
  },
  
  // Portfolio API
  portfolio: {
    getAll: async () => portfolioItems,
    getById: async (id: string) => portfolioItems.find(item => item.id === id),
    getMutualFunds: async () => mutualFundHoldings,
    getMutualFundById: async (id: string) => mutualFundHoldings.find(holding => holding.id === id),
  },
  
  // Transactions API
  transactions: {
    getAll: async () => transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    getById: async (id: string) => transactions.find(tx => tx.id === id),
    create: async (stockId: string, type: "BUY" | "SELL", quantity: number) => {
      const stock = stocksData.find(s => s.id === stockId);
      if (!stock) throw new Error("Stock not found");
      
      const total = stock.price * quantity;
      
      // Check if user has enough balance for buying
      if (type === "BUY" && currentUser.balance < total) {
        throw new Error("Insufficient funds");
      }
      
      // Check if user has enough shares for selling
      if (type === "SELL") {
        const portfolioItem = portfolioItems.find(item => item.stock.id === stockId);
        if (!portfolioItem || portfolioItem.quantity < quantity) {
          throw new Error("Insufficient shares");
        }
      }
      
      // Create transaction
      const transaction = {
        id: generateId(),
        type,
        stock,
        quantity,
        price: stock.price,
        total,
        timestamp: new Date().toISOString(),
      };
      
      // Update user balance
      if (type === "BUY") {
        currentUser.balance -= total;
      } else {
        currentUser.balance += total;
      }
      
      // Update portfolio
      const existingItem = portfolioItems.find(item => item.stock.id === stockId);
      if (existingItem) {
        if (type === "BUY") {
          const newTotalQuantity = existingItem.quantity + quantity;
          const newTotalInvestment = existingItem.totalInvestment + total;
          existingItem.quantity = newTotalQuantity;
          existingItem.avgBuyPrice = newTotalInvestment / newTotalQuantity;
          existingItem.totalInvestment = newTotalInvestment;
        } else {
          existingItem.quantity -= quantity;
          if (existingItem.quantity === 0) {
            portfolioItems = portfolioItems.filter(item => item.id !== existingItem.id);
          } else {
            // Selling doesn't change the average buy price
          }
        }
      } else if (type === "BUY") {
        portfolioItems.push({
          id: generateId(),
          stock,
          quantity,
          avgBuyPrice: stock.price,
          currentValue: total,
          totalInvestment: total,
          profitLoss: 0,
          profitLossPercent: 0,
        });
      }
      
      // Update portfolio current values and profit/loss
      portfolioItems.forEach(item => {
        item.currentValue = item.quantity * item.stock.price;
        item.profitLoss = item.currentValue - item.totalInvestment;
        item.profitLossPercent = (item.profitLoss / item.totalInvestment) * 100;
      });
      
      // Add to transactions
      transactions.push(transaction);
      
      return transaction;
    },
  },
  
  // Mutual Fund Transactions API
  mutualFundTransactions: {
    getAll: async () => mutualFundTransactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    getById: async (id: string) => mutualFundTransactions.find(tx => tx.id === id),
    create: async (fundId: string, type: "BUY" | "SELL", quantity: number) => {
      const fund = mutualFundsData.find(f => f.id === fundId);
      if (!fund) throw new Error("Mutual fund not found");
      
      const total = fund.price * quantity;
      
      // Check if user has enough balance for buying
      if (type === "BUY" && currentUser.balance < total) {
        throw new Error("Insufficient funds");
      }
      
      // Check if user has enough shares for selling
      if (type === "SELL") {
        const holding = mutualFundHoldings.find(item => item.fund.id === fundId);
        if (!holding || holding.quantity < quantity) {
          throw new Error("Insufficient shares");
        }
      }
      
      // Create transaction
      const transaction = {
        id: generateId(),
        type,
        fund,
        quantity,
        price: fund.price,
        total,
        timestamp: new Date().toISOString(),
      };
      
      // Update user balance
      if (type === "BUY") {
        currentUser.balance -= total;
      } else {
        currentUser.balance += total;
      }
      
      // Update portfolio
      const existingHolding = mutualFundHoldings.find(item => item.fund.id === fundId);
      if (existingHolding) {
        if (type === "BUY") {
          const newTotalQuantity = existingHolding.quantity + quantity;
          const newTotalInvestment = existingHolding.totalInvestment + total;
          existingHolding.quantity = newTotalQuantity;
          existingHolding.avgBuyPrice = newTotalInvestment / newTotalQuantity;
          existingHolding.totalInvestment = newTotalInvestment;
        } else {
          existingHolding.quantity -= quantity;
          if (existingHolding.quantity === 0) {
            mutualFundHoldings = mutualFundHoldings.filter(item => item.id !== existingHolding.id);
          } else {
            // Selling doesn't change the average buy price
          }
        }
      } else if (type === "BUY") {
        mutualFundHoldings.push({
          id: generateId(),
          fund,
          quantity,
          avgBuyPrice: fund.price,
          currentValue: total,
          totalInvestment: total,
          profitLoss: 0,
          profitLossPercent: 0,
        });
      }
      
      // Update mutual fund holdings current values and profit/loss
      mutualFundHoldings.forEach(item => {
        item.currentValue = item.quantity * item.fund.price;
        item.profitLoss = item.currentValue - item.totalInvestment;
        item.profitLossPercent = (item.profitLoss / item.totalInvestment) * 100;
      });
      
      // Add to transactions
      mutualFundTransactions.push(transaction);
      
      return transaction;
    },
  },
  
  // Leaderboard API
  leaderboard: {
    getAll: async () => leaderboardData,
    getUserRank: async () => {
      const entry = leaderboardData.find(e => e.userId === currentUser.id);
      return entry ? entry.rank : null;
    },
  },
  
  // News API
  news: {
    getAll: async () => newsData,
    getById: async (id: string) => newsData.find(n => n.id === id),
  },
  
  // Trading tips API
  tradingTips: {
    getAll: async () => tradingTips,
    getById: async (id: string) => tradingTips.find(tip => tip.id === id),
    getRandom: async () => {
      const randomIndex = Math.floor(Math.random() * tradingTips.length);
      return tradingTips[randomIndex];
    },
  },
};
