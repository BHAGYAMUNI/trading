// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

// Stock related types
export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

// Mutual fund related types
export interface MutualFund {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  category: string;
  risk: "Low" | "Medium" | "High";
  expenseRatio: number;
  ytdReturn: number;
  oneYearReturn: number;
  threeYearReturn: number;
  fiveYearReturn: number;
  assetAllocation: {
    stocks: number;
    bonds: number;
    cash: number;
    other: number;
  };
  description: string;
}

export interface MutualFundHolding {
  id: string;
  fund: MutualFund;
  quantity: number;
  avgBuyPrice: number;
  currentValue: number;
  totalInvestment: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface PortfolioItem {
  id: string;
  stock: Stock;
  quantity: number;
  avgBuyPrice: number;
  currentValue: number;
  totalInvestment: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface Transaction {
  id: string;
  type: "BUY" | "SELL";
  stock: Stock;
  quantity: number;
  price: number;
  total: number;
  timestamp: string;
}

export interface MutualFundTransaction {
  id: string;
  type: "BUY" | "SELL";
  fund: MutualFund;
  quantity: number;
  price: number;
  total: number;
  timestamp: string;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  rank: number;
  portfolioValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface StockNews {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  relatedSymbols?: string[];
}

export interface TradingTip {
  id: string;
  title: string;
  content: string;
  category: string;
}

export interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  addedAt: string;
  notes?: string;
  targetPrice?: number;
  stopLoss?: number;
}
