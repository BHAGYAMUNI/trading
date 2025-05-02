
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { api } from "@/services/api";
import { MutualFund } from "@/types";
import { MutualFundCard } from "@/components/MutualFundCard";
import { MutualFundTradeModal } from "@/components/MutualFundTradeModal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function MutualFunds() {
  const [funds, setFunds] = useState<MutualFund[]>([]);
  const [filteredFunds, setFilteredFunds] = useState<MutualFund[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFund, setSelectedFund] = useState<MutualFund | null>(null);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchFunds = async () => {
      setIsLoading(true);
      try {
        const data = await api.mutualFunds.getAll();
        setFunds(data);
        setFilteredFunds(data);
      } catch (error) {
        console.error("Failed to fetch mutual funds:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFunds();
  }, []);
  
  useEffect(() => {
    let result = [...funds];
    
    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        fund => fund.symbol.toLowerCase().includes(query) || 
                fund.name.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(fund => fund.category === categoryFilter);
    }
    
    // Apply risk filter
    if (riskFilter) {
      result = result.filter(fund => fund.risk === riskFilter);
    }
    
    setFilteredFunds(result);
  }, [searchQuery, categoryFilter, riskFilter, funds]);
  
  const handleFundClick = (fund: MutualFund) => {
    setSelectedFund(fund);
    setIsTradeModalOpen(true);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled in the effect
  };
  
  const getUniqueCategories = () => {
    const categories = new Set<string>();
    funds.forEach(fund => categories.add(fund.category));
    return Array.from(categories);
  };
  
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mutual Funds</h1>
        <p className="text-muted-foreground">
          Explore mutual funds and diversify your portfolio
        </p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>What are Mutual Funds?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Mutual funds pool money from many investors to purchase securities like stocks, bonds, and other assets. 
            Professional fund managers allocate the fund's investments according to specific objectives outlined in the fund's prospectus.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <h4 className="font-medium">Diversification</h4>
              <p className="text-sm text-muted-foreground">Invest in a variety of securities with a single purchase, reducing risk.</p>
              <Progress value={80} className="h-2" />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Professional Management</h4>
              <p className="text-sm text-muted-foreground">Experienced professionals make investment decisions on your behalf.</p>
              <Progress value={90} className="h-2" />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Liquidity</h4>
              <p className="text-sm text-muted-foreground">Buy or sell mutual fund shares on any business day at the current net asset value (NAV).</p>
              <Progress value={75} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by symbol or fund name" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
          
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-sm font-medium">Category:</span>
            <Badge 
              variant={categoryFilter === null ? "default" : "outline"} 
              className="cursor-pointer"
              onClick={() => setCategoryFilter(null)}
            >
              All
            </Badge>
            {getUniqueCategories().map(category => (
              <Badge 
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setCategoryFilter(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium">Risk:</span>
            <Badge 
              variant={riskFilter === null ? "default" : "outline"} 
              className="cursor-pointer"
              onClick={() => setRiskFilter(null)}
            >
              All
            </Badge>
            <Badge 
              variant={riskFilter === "Low" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setRiskFilter("Low")}
            >
              Low
            </Badge>
            <Badge 
              variant={riskFilter === "Medium" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setRiskFilter("Medium")}
            >
              Medium
            </Badge>
            <Badge 
              variant={riskFilter === "High" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setRiskFilter("High")}
            >
              High
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Funds</CardTitle>
          <CardDescription>
            {filteredFunds.length} {filteredFunds.length === 1 ? 'fund' : 'funds'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-28 w-full" />
              ))}
            </div>
          ) : filteredFunds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFunds.map((fund) => (
                <MutualFundCard
                  key={fund.id}
                  fund={fund}
                  onClick={() => handleFundClick(fund)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No mutual funds found matching your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {selectedFund && (
        <MutualFundTradeModal
          fund={selectedFund}
          isOpen={isTradeModalOpen}
          onClose={() => setIsTradeModalOpen(false)}
          onTransactionComplete={() => {}}
        />
      )}
    </MainLayout>
  );
}
