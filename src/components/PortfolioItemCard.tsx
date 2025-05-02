
import { PortfolioItem } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface PortfolioItemCardProps {
  item: PortfolioItem;
  onClick?: () => void;
  className?: string;
}

export function PortfolioItemCard({ item, onClick, className }: PortfolioItemCardProps) {
  const isProfit = item.profitLoss >= 0;
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg cursor-pointer", 
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="ticker-symbol text-lg font-semibold">{item.stock.symbol}</h3>
            <p className="text-xs text-muted-foreground truncate max-w-[150px]">{item.stock.name}</p>
          </div>
          <div className="text-right">
            <p className="currency text-lg font-semibold">{formatCurrency(item.stock.price)}</p>
            <div className={cn(
              "flex items-center text-xs",
              item.stock.change >= 0 ? "text-gain" : "text-loss"
            )}>
              {item.stock.change >= 0 ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              <span>{item.stock.change.toFixed(2)}</span>
              <span className="ml-1">({item.stock.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-xs text-muted-foreground">Quantity</p>
            <p className="font-mono">{item.quantity}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg. Price</p>
            <p className="currency">{formatCurrency(item.avgBuyPrice)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Current Value</p>
            <p className="currency">{formatCurrency(item.currentValue)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Profit/Loss</p>
            <div className={isProfit ? "positive-value" : "negative-value"}>
              <div className="flex items-center">
                {isProfit ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                <span>{formatCurrency(Math.abs(item.profitLoss))} ({item.profitLossPercent.toFixed(2)}%)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
