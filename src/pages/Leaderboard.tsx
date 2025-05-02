
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { api } from "@/services/api";
import { LeaderboardEntry } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Award, ArrowUp, ArrowDown, Medal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";

export default function Leaderboard() {
  const { user } = useAuth();
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        // Get leaderboard entries
        const entries = await api.leaderboard.getAll();
        setLeaderboardEntries(entries);
        
        // Get user's rank if logged in
        if (user) {
          const rank = await api.leaderboard.getUserRank();
          setUserRank(rank);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [user]);
  
  // Function to get the appropriate medal icon for the top 3 positions
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1: return "text-yellow-500";
      case 2: return "text-gray-400";
      case 3: return "text-amber-700";
      default: return "text-muted-foreground";
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">
          See how your portfolio ranks against other traders
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-6 w-6" />
            Your Ranking
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-16 w-full" />
          ) : userRank ? (
            <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center">
                <div className={`h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold`}>
                  {userRank}
                </div>
                <div className="ml-4">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">Your current position</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {formatCurrency(leaderboardEntries.find(entry => entry.userId === user?.id)?.portfolioValue || 0)}
                </p>
                <p className="text-sm text-muted-foreground">Portfolio Value</p>
              </div>
            </div>
          ) : (
            <p className="text-center py-4 text-muted-foreground">Sign in or make trades to appear on the leaderboard.</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Traders</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : leaderboardEntries.length > 0 ? (
            <div className="space-y-4">
              {leaderboardEntries.map((entry) => (
                <div 
                  key={entry.userId} 
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    entry.userId === user?.id ? "bg-primary/10" : "bg-card"
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                      entry.rank <= 3 ? getMedalColor(entry.rank) : "text-muted-foreground" 
                    }`}>
                      {entry.rank <= 3 ? (
                        <Medal className="h-6 w-6" />
                      ) : (
                        <span>{entry.rank}</span>
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold">
                        {entry.userName}
                        {entry.userId === user?.id && " (You)"}
                      </p>
                      <div className="flex items-center text-sm">
                        <span className={`${entry.profitLoss >= 0 ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"} mr-2`}>
                          {entry.profitLoss >= 0 ? (
                            <ArrowUp className="h-3 w-3 inline" />
                          ) : (
                            <ArrowDown className="h-3 w-3 inline" />
                          )}
                          {Math.abs(entry.profitLossPercent).toFixed(2)}%
                        </span>
                        <span className="text-muted-foreground">
                          Profit/Loss
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency(entry.portfolioValue)}
                    </p>
                    <p className="text-sm text-muted-foreground">Portfolio Value</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-muted-foreground">No leaderboard data available.</p>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
}
