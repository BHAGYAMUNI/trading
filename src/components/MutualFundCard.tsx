
import { MutualFund } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface MutualFundCardProps {
  fund: MutualFund;
  onClick?: () => void;
  className?: string;
}

export function MutualFundCard({ fund, onClick, className }: MutualFundCardProps) {
  const isPositiveChange = fund.change >= 0;
  
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
            <div className="flex items-center gap-2">
              <h3 className="ticker-symbol text-lg font-semibold">{fund.symbol}</h3>
              <Badge variant="outline">{fund.risk}</Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate max-w-[200px]">{fund.name}</p>
          </div>
          <div className="text-right">
            <p className="currency text-lg font-semibold">{formatCurrency(fund.price)}</p>
            <div className={cn(
              "flex items-center text-xs",
              isPositiveChange ? "text-gain" : "text-loss"
            )}>
              {isPositiveChange ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              <span>{fund.change.toFixed(2)}</span>
              <span className="ml-1">({fund.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
