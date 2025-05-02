import { useEffect, useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { api } from "@/services/api";
import { Transaction, MutualFundTransaction } from "@/types";
import { TransactionCard } from "@/components/TransactionCard";
import { MutualFundTransactionCard } from "@/components/MutualFundTransactionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function Transactions() {
  const [stockTransactions, setStockTransactions] = useState<Transaction[]>([]);
  const [fundTransactions, setFundTransactions] = useState<MutualFundTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const [stocks, funds] = await Promise.all([
          api.transactions.getAll(),
          api.mutualFundTransactions.getAll()
        ]);
        setStockTransactions(stocks);
        setFundTransactions(funds);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTransactions();
  }, []);
  
  // Combine and sort all transactions by date
  const allTransactions = [...stockTransactions, ...fundTransactions]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-muted-foreground">
          View your trading history
        </p>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Trading Activity</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="stocks">Stocks</TabsTrigger>
              <TabsTrigger value="funds">Mutual Funds</TabsTrigger>
            </TabsList>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : (
              <>
                <TabsContent value="all" className="space-y-6 mt-0">
                  {allTransactions.length > 0 ? (
                    <div className="space-y-4">
                      {allTransactions.map((tx) => 
                        'stock' in tx ? (
                          <TransactionCard key={tx.id} transaction={tx as Transaction} />
                        ) : (
                          <MutualFundTransactionCard key={tx.id} transaction={tx as MutualFundTransaction} />
                        )
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No transactions found</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="stocks" className="space-y-6 mt-0">
                  {stockTransactions.length > 0 ? (
                    <div className="space-y-4">
                      {stockTransactions.map((transaction) => (
                        <TransactionCard key={transaction.id} transaction={transaction} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No stock transactions found</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="funds" className="space-y-6 mt-0">
                  {fundTransactions.length > 0 ? (
                    <div className="space-y-4">
                      {fundTransactions.map((transaction) => (
                        <MutualFundTransactionCard key={transaction.id} transaction={transaction} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No mutual fund transactions found</p>
                    </div>
                  )}
                </TabsContent>
              </>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
