
import { TradingTip } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TradingTipCardProps {
  tip: TradingTip;
  className?: string;
}

export function TradingTipCard({ tip, className }: TradingTipCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">{tip.title}</h3>
          <Badge variant="outline">{tip.category}</Badge>
        </div>
        
        <p className="text-sm text-muted-foreground">{tip.content}</p>
      </CardContent>
    </Card>
  );
}
