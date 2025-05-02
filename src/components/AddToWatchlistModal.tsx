import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Stock } from "@/types";
import { cn } from "@/lib/utils";

interface AddToWatchlistModalProps {
  onAddStock: (stock: Stock) => void;
}

export function AddToWatchlistModal({ onAddStock }: AddToWatchlistModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Mock data - replace with actual API call
  const mockStocks: Stock[] = [
    { id: "1", symbol: "AAPL", name: "Apple Inc.", price: 175.34, change: 4.28, changePercent: 2.5 },
    { id: "2", symbol: "GOOGL", name: "Alphabet Inc.", price: 145.67, change: -1.77, changePercent: -1.2 },
    { id: "3", symbol: "MSFT", name: "Microsoft Corporation", price: 420.72, change: 3.21, changePercent: 0.77 },
  ];

  const filteredStocks = mockStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Stock
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Stock to Watchlist</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto space-y-2">
            {filteredStocks.map((stock) => (
              <div
                key={stock.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => {
                  onAddStock(stock);
                  setIsOpen(false);
                }}
              >
                <div>
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{stock.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${stock.price.toFixed(2)}</div>
                  <div className={cn(
                    "text-sm",
                    stock.changePercent >= 0 ? "text-green-500" : "text-red-500"
                  )}>
                    {stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 