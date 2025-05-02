
import { Transaction } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";

interface TransactionCardProps {
  transaction: Transaction;
  className?: string;
}

export function TransactionCard({ transaction, className }: TransactionCardProps) {
  const isBuy = transaction.type === "BUY";
  
  return (
    <Card className={className}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Badge variant={isBuy ? "outline" : "default"} className={isBuy ? "bg-gain/10 text-gain border-gain" : "bg-loss text-white"}>
              {transaction.type}
            </Badge>
            <h3 className="ticker-symbol font-semibold">{transaction.stock.symbol}</h3>
          </div>
          <p className="text-xs text-muted-foreground">{formatDate(transaction.timestamp)}</p>
        </div>
        
        <p className="text-xs text-muted-foreground mb-3">{transaction.stock.name}</p>
        
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Quantity</p>
            <p className="font-mono">{transaction.quantity}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="currency">{formatCurrency(transaction.price)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className={`currency ${isBuy ? "text-loss" : "text-gain"}`}>
              {isBuy ? "-" : "+"}
              {formatCurrency(transaction.total)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
