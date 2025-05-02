
import { StockNews } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface NewsCardProps {
  news: StockNews;
  className?: string;
}

export function NewsCard({ news, className }: NewsCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-muted-foreground">{news.source}</p>
          <p className="text-xs text-muted-foreground">{formatDate(news.publishedAt)}</p>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
        <p className="text-sm text-muted-foreground">{news.description}</p>
      </CardContent>
      
      <CardFooter className="px-5 pb-5 pt-0">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href={news.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            Read More <ExternalLink className="h-3 w-3 ml-2" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
