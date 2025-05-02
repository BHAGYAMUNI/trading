
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
import { Stock } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StockTradeModalProps {
  stock: Stock;
  isOpen: boolean;
  onClose: () => void;
  onTransactionComplete?: () => void;
}

export function StockTradeModal({
  stock,
  isOpen,
  onClose,
  onTransactionComplete,
}: StockTradeModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("BUY");
  const [isLoading, setIsLoading] = useState(false);
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

  const totalAmount = quantity * stock.price;
  const canBuy = user && user.balance >= totalAmount;

  const handleTrade = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      await api.transactions.create(stock.id, tradeType, quantity);
      
      toast({
        title: `${tradeType} Order Executed`,
        description: `Successfully ${tradeType === 'BUY' ? 'bought' : 'sold'} ${quantity} shares of ${stock.symbol}`,
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Trade {stock.symbol} - {stock.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between my-2">
          <p>Current Price</p>
          <p className="currency font-semibold">{formatCurrency(stock.price)}</p>
        </div>

        <Tabs defaultValue="BUY" onValueChange={(value) => setTradeType(value as "BUY" | "SELL")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="BUY">Buy</TabsTrigger>
            <TabsTrigger value="SELL">Sell</TabsTrigger>
          </TabsList>
          
          <TabsContent value="BUY">
            <div className="space-y-4 py-2">
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
            <div className="space-y-4 py-2">
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

        <DialogFooter>
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
            {isLoading ? "Processing..." : `${tradeType} ${stock.symbol}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
