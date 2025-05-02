import { WatchlistItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Star, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface WatchlistCardProps {
  item: WatchlistItem;
  onRemove: (id: string) => void;
  onAddNote: (id: string, note: string) => void;
  onSetTarget: (id: string, price: number) => void;
  onSetStopLoss: (id: string, price: number) => void;
}

export function WatchlistCard({
  item,
  onRemove,
  onAddNote,
  onSetTarget,
  onSetStopLoss,
}: WatchlistCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {item.symbol}
            <span className="text-sm text-muted-foreground ml-2">
              {item.name}
            </span>
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(item.id)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              {formatCurrency(item.price)}
            </span>
            <div className={cn(
              "flex items-center",
              item.changePercent >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {item.changePercent >= 0 ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              <span className="font-medium">
                {Math.abs(item.changePercent).toFixed(2)}%
              </span>
            </div>
          </div>
          
          {item.targetPrice && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Target Price:</span>
              <span className="font-medium text-green-500">
                {formatCurrency(item.targetPrice)}
              </span>
            </div>
          )}
          
          {item.stopLoss && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Stop Loss:</span>
              <span className="font-medium text-red-500">
                {formatCurrency(item.stopLoss)}
              </span>
            </div>
          )}
          
          {item.notes && (
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Notes:</p>
              <p>{item.notes}</p>
            </div>
          )}
          
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => {
                const note = prompt("Add a note:", item.notes);
                if (note !== null) onAddNote(item.id, note);
              }}
            >
              Add Note
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => {
                const price = prompt("Set target price:", item.targetPrice?.toString());
                if (price !== null) onSetTarget(item.id, parseFloat(price));
              }}
            >
              Set Target
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => {
                const price = prompt("Set stop loss:", item.stopLoss?.toString());
                if (price !== null) onSetStopLoss(item.id, parseFloat(price));
              }}
            >
              Set Stop Loss
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 