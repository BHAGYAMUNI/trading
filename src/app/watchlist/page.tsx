"use client";

import { useState } from "react";
import { WatchlistItem } from "@/types";
import { WatchlistCard } from "@/components/WatchlistCard";
import { AddToWatchlistModal } from "@/components/AddToWatchlistModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type SortOption = "name" | "price" | "change" | "addedAt";
type SortOrder = "asc" | "desc";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    {
      id: "1",
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 175.34,
      change: 4.28,
      changePercent: 2.5,
      notes: "Strong earnings report",
      targetPrice: 185.00,
      stopLoss: 170.00,
      addedAt: new Date("2024-03-01").toISOString(),
    },
    {
      id: "2",
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 145.67,
      change: -1.77,
      changePercent: -1.2,
      targetPrice: 160.00,
      addedAt: new Date("2024-03-02").toISOString(),
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleAddStock = (stock: any) => {
    const newWatchlistItem: WatchlistItem = {
      id: stock.id,
      symbol: stock.symbol,
      name: stock.name,
      price: stock.price,
      change: stock.change,
      changePercent: stock.changePercent,
      addedAt: new Date().toISOString(),
    };
    setWatchlist([...watchlist, newWatchlistItem]);
  };

  const handleRemove = (id: string) => {
    setWatchlist(watchlist.filter(item => item.id !== id));
  };

  const handleAddNote = (id: string, note: string) => {
    setWatchlist(watchlist.map(item => 
      item.id === id ? { ...item, notes: note } : item
    ));
  };

  const handleSetTarget = (id: string, price: number) => {
    setWatchlist(watchlist.map(item => 
      item.id === id ? { ...item, targetPrice: price } : item
    ));
  };

  const handleSetStopLoss = (id: string, price: number) => {
    setWatchlist(watchlist.map(item => 
      item.id === id ? { ...item, stopLoss: price } : item
    ));
  };

  const filteredWatchlist = watchlist
    .filter(item =>
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "change":
          comparison = a.changePercent - b.changePercent;
          break;
        case "addedAt":
          comparison = new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Watchlist</h1>
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("name")}>
                  Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price")}>
                  Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("change")}>
                  Change {sortBy === "change" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("addedAt")}>
                  Added Date {sortBy === "addedAt" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                  {sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AddToWatchlistModal onAddStock={handleAddStock} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWatchlist.map((item) => (
            <WatchlistCard
              key={item.id}
              item={item}
              onRemove={handleRemove}
              onAddNote={handleAddNote}
              onSetTarget={handleSetTarget}
              onSetStopLoss={handleSetStopLoss}
            />
          ))}
        </div>

        {filteredWatchlist.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No stocks found in your watchlist.</p>
            <AddToWatchlistModal onAddStock={handleAddStock} />
          </div>
        )}
      </div>
    </div>
  );
} 