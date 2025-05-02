
import { MutualFundHolding } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface MutualFundHoldingCardProps {
  holding: MutualFundHolding;
  onClick?: () => void;
  className?: string;
}

export function MutualFundHoldingCard({ holding, onClick, className }: MutualFundHoldingCardProps) {
  const isProfit = holding.profitLoss >= 0;
  
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
            <div className="flex items-center gap-2">
              <h3 className="ticker-symbol text-lg font-semibold">{holding.fund.symbol}</h3>
              <Badge variant="outline">{holding.fund.risk}</Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate max-w-[150px]">{holding.fund.name}</p>
          </div>
          <div className="text-right">
            <p className="currency text-lg font-semibold">{formatCurrency(holding.fund.price)}</p>
            <div className={cn(
              "flex items-center text-xs",
              holding.fund.change >= 0 ? "text-gain" : "text-loss"
            )}>
              {holding.fund.change >= 0 ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              <span>{holding.fund.change.toFixed(2)}</span>
              <span className="ml-1">({holding.fund.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-xs text-muted-foreground">Quantity</p>
            <p className="font-mono">{holding.quantity}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg. Price</p>
            <p className="currency">{formatCurrency(holding.avgBuyPrice)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Current Value</p>
            <p className="currency">{formatCurrency(holding.currentValue)}</p>
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
                <span>{formatCurrency(Math.abs(holding.profitLoss))} ({holding.profitLossPercent.toFixed(2)}%)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
