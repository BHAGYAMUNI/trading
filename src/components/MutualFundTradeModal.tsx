
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";
import { MutualFund } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface MutualFundTradeModalProps {
  fund: MutualFund;
  isOpen: boolean;
  onClose: () => void;
  onTransactionComplete?: () => void;
}

export function MutualFundTradeModal({
  fund,
  isOpen,
  onClose,
  onTransactionComplete,
}: MutualFundTradeModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("BUY");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const { user } = useAuth();
  const { toast } = useToast();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  const totalAmount = quantity * fund.price;
  const canBuy = user && user.balance >= totalAmount;

  const handleTrade = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      await api.mutualFundTransactions.create(fund.id, tradeType, quantity);
      
      toast({
        title: `${tradeType} Order Executed`,
        description: `Successfully ${tradeType === 'BUY' ? 'bought' : 'sold'} ${quantity} shares of ${fund.symbol}`,
      });
      
      onClose();
      onTransactionComplete?.();
    } catch (error) {
      toast({
        variant: "destructive",
        title: `${tradeType} Order Failed`,
        description: (error as Error).message || "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (risk: "Low" | "Medium" | "High") => {
    switch (risk) {
      case "Low": return "bg-blue-500 text-white";
      case "Medium": return "bg-yellow-500 text-white";
      case "High": return "bg-red-500 text-white";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{fund.symbol} - {fund.name}</span>
            <Badge className={getRiskColor(fund.risk)}>{fund.risk} Risk</Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="details">Fund Details</TabsTrigger>
            <TabsTrigger value="trade">Trade</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 py-2">
            <div className="flex items-center justify-between my-2">
              <p>Current Price</p>
              <p className="currency font-semibold">{formatCurrency(fund.price)}</p>
            </div>

            <div className="space-y-3">
              <p className="text-sm">{fund.description}</p>

              <div className="space-y-1">
                <p className="text-sm font-medium">Category: {fund.category}</p>
                <p className="text-sm font-medium">Expense Ratio: {fund.expenseRatio}%</p>
              </div>

              <h4 className="font-medium">Performance</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">YTD Return</p>
                  <p className={fund.ytdReturn >= 0 ? "text-gain" : "text-loss"}>
                    {fund.ytdReturn.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">1 Year Return</p>
                  <p className={fund.oneYearReturn >= 0 ? "text-gain" : "text-loss"}>
                    {fund.oneYearReturn.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">3 Year Return</p>
                  <p className={fund.threeYearReturn >= 0 ? "text-gain" : "text-loss"}>
                    {fund.threeYearReturn.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">5 Year Return</p>
                  <p className={fund.fiveYearReturn >= 0 ? "text-gain" : "text-loss"}>
                    {fund.fiveYearReturn.toFixed(2)}%
                  </p>
                </div>
              </div>

              <h4 className="font-medium">Asset Allocation</h4>
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Stocks ({fund.assetAllocation.stocks}%)</span>
                  </div>
                  <Progress value={fund.assetAllocation.stocks} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Bonds ({fund.assetAllocation.bonds}%)</span>
                  </div>
                  <Progress value={fund.assetAllocation.bonds} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Cash ({fund.assetAllocation.cash}%)</span>
                  </div>
                  <Progress value={fund.assetAllocation.cash} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Other ({fund.assetAllocation.other}%)</span>
                  </div>
                  <Progress value={fund.assetAllocation.other} className="h-2" />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trade">
            <Tabs defaultValue="BUY" onValueChange={(value) => setTradeType(value as "BUY" | "SELL")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="BUY">Buy</TabsTrigger>
                <TabsTrigger value="SELL">Sell</TabsTrigger>
              </TabsList>
              
              <TabsContent value="BUY">
                <div className="space-y-4 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <p>Current Price</p>
                    <p className="currency font-semibold">{formatCurrency(fund.price)}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p>Total Cost</p>
                    <p className="currency font-bold">{formatCurrency(totalAmount)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p>Available Balance</p>
                    <p className="currency">{formatCurrency(user?.balance || 0)}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="SELL">
                <div className="space-y-4 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <p>Current Price</p>
                    <p className="currency font-semibold">{formatCurrency(fund.price)}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sell-quantity">Quantity</Label>
                    <Input
                      id="sell-quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p>Total Value</p>
                    <p className="currency font-bold">{formatCurrency(totalAmount)}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-4">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleTrade}
                disabled={isLoading || (tradeType === "BUY" && !canBuy)}
                className={tradeType === "BUY" ? "bg-gain hover:bg-gain/90" : "bg-loss hover:bg-loss/90"}
              >
                {isLoading ? "Processing..." : `${tradeType} ${fund.symbol}`}
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
