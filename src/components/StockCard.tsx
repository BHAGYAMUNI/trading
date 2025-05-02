
import { Stock } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface StockCardProps {
  stock: Stock;
  onClick?: () => void;
  className?: string;
}

export function StockCard({ stock, onClick, className }: StockCardProps) {
  const isPositiveChange = stock.change >= 0;
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg cursor-pointer", 
        className
      )} 
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="ticker-symbol text-lg font-semibold">{stock.symbol}</h3>
            <p className="text-xs text-muted-foreground truncate max-w-[150px]">{stock.name}</p>
          </div>
          <div className="text-right">
            <p className="currency text-lg font-semibold">{formatCurrency(stock.price)}</p>
            <div className={cn(
              "flex items-center text-xs",
              isPositiveChange ? "text-gain" : "text-loss"
            )}>
              {isPositiveChange ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              <span>{stock.change.toFixed(2)}</span>
              <span className="ml-1">({stock.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
