
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { api } from "@/services/api";
import { StockNews } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { NewspaperIcon, Calendar, ExternalLink } from "lucide-react";
import { format } from "date-fns";

export default function News() {
  const [news, setNews] = useState<StockNews[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const data = await api.news.getAll();
        setNews(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNews();
  }, []);
  
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Market News</h1>
        <p className="text-muted-foreground">
          Stay updated with the latest financial news
        </p>
      </div>
      
      <div className="space-y-6">
        {isLoading ? (
          // Skeleton loading state
          [...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))
        ) : news.length > 0 ? (
          // News articles
          news.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription className="flex items-center text-sm text-muted-foreground">
                  <NewspaperIcon className="h-4 w-4 mr-1" />
                  {article.source}
                  <span className="mx-2">•</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(article.publishedAt), 'MMM dd, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{article.description}</p>
                <Button variant="outline" className="flex items-center" asChild>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read Full Article
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          // No news available
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <NewspaperIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground">
                No news articles available at the moment.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
