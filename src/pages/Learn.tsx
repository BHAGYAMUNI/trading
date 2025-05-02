
import { MainLayout } from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, BookOpen, BookText } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Learn() {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Trading Academy</h1>
        <p className="text-muted-foreground">
          Learn how to become a better investor with our educational resources
        </p>
      </div>

      <Tabs defaultValue="basics" className="space-y-6">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 h-auto">
          <TabsTrigger value="basics" className="flex items-center gap-2 py-2">
            <BookText className="h-4 w-4" />
            <span className="hidden sm:inline">Trading Basics</span>
            <span className="sm:hidden">Basics</span>
          </TabsTrigger>
          <TabsTrigger value="strategies" className="flex items-center gap-2 py-2">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Trading Strategies</span>
            <span className="sm:hidden">Strategies</span>
          </TabsTrigger>
          <TabsTrigger value="glossary" className="flex items-center gap-2 py-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Financial Glossary</span>
            <span className="sm:hidden">Glossary</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookText className="h-5 w-5 text-primary" />
                Trading Basics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                Welcome to the foundation of your trading journey. These lessons will help you understand 
                the fundamentals of stock markets and investing principles.
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center">
                      <span>What is the Stock Market?</span>
                      <Badge variant="secondary" className="ml-2">Beginner</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <p>
                        The stock market is a collection of markets where stocks (pieces of ownership in businesses) 
                        are traded between investors. It allows companies to raise money and investors to own 
                        parts of companies with the potential to share in their profits.
                      </p>
                      <p>
                        <strong>Key concepts:</strong>
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Stocks represent ownership in a company</li>
                        <li>Stock exchanges are where stocks are bought and sold</li>
                        <li>Stock prices change based on supply and demand</li>
                        <li>Indices like S&P 500 and Dow Jones track overall market performance</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center">
                      <span>How to Read Stock Charts</span>
                      <Badge variant="secondary" className="ml-2">Beginner</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <p>
                        Stock charts display the price movements of a stock over time. Learning to read these 
                        charts is essential for making informed investment decisions.
                      </p>
                      <p>
                        <strong>Basic chart elements:</strong>
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Price axis (vertical) shows the stock price</li>
                        <li>Time axis (horizontal) shows the time period</li>
                        <li>Candlesticks show opening, closing, high, and low prices</li>
                        <li>Volume bars indicate trading activity</li>
                        <li>Moving averages smooth out price action to show trends</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center">
                      <span>Understanding Risk and Return</span>
                      <Badge variant="secondary" className="ml-2">Beginner</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <p>
                        The relationship between risk and return is one of the most important concepts in investing. 
                        Generally, investments with higher potential returns come with higher risks.
                      </p>
                      <p>
                        <strong>Types of risk:</strong>
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Market risk - affects the entire market</li>
                        <li>Company risk - specific to individual companies</li>
                        <li>Inflation risk - loss of purchasing power</li>
                        <li>Liquidity risk - difficulty converting to cash</li>
                      </ul>
                      <p className="mt-4">
                        <strong>Risk management strategies:</strong>
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Diversification across different asset classes</li>
                        <li>Position sizing to limit exposure</li>
                        <li>Setting stop-loss orders to limit downside</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Trading Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                Discover different approaches to trading and investing in the financial markets. 
                Each strategy has its own advantages, risks, and suitable scenarios.
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center">
                      <span>Value Investing</span>
                      <Badge variant="secondary" className="ml-2">Intermediate</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <p>
                        Value investing focuses on buying stocks that appear underpriced according to fundamental 
                        analysis. This strategy was popularized by Benjamin Graham and Warren Buffett.
                      </p>
                      <p>
                        <strong>Key metrics for value investors:</strong>
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Price-to-Earnings (P/E) ratio</li>
                        <li>Price-to-Book (P/B) ratio</li>
                        <li>Debt-to-Equity ratio</li>
                        <li>Free cash flow</li>
                        <li>Dividend yield</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center">
                      <span>Growth Investing</span>
                      <Badge variant="secondary" className="ml-2">Intermediate</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <p>
                        Growth investing focuses on companies expected to grow at an above-average rate compared 
                        to other companies in the market, even if their current valuations seem high.
                      </p>
                      <p>
                        <strong>What growth investors look for:</strong>
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Strong historical earnings growth</li>
                        <li>Positive future earnings projections</li>
                        <li>Competitive advantages</li>
                        <li>Expanding market share</li>
                        <li>Innovative products or services</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center">
                      <span>Day Trading</span>
                      <Badge variant="secondary" className="ml-2">Advanced</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <p>
                        Day trading involves buying and selling financial instruments within the same trading day, 
                        closing all positions before the market closes. This is a high-risk strategy that requires 
                        significant knowledge and experience.
                      </p>
                      
                      <Alert variant="destructive" className="my-4">
                        <AlertTitle>High Risk Strategy</AlertTitle>
                        <AlertDescription>
                          Day trading involves substantial risk and is not suitable for all investors. 
                          Many day traders suffer financial losses in their first months of trading.
                        </AlertDescription>
                      </Alert>
                      
                      <p>
                        <strong>Day trading requirements:</strong>
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Strong understanding of technical analysis</li>
                        <li>Discipline and emotional control</li>
                        <li>Fast execution capabilities</li>
                        <li>Risk management strategies</li>
                        <li>Sufficient capital (typically $25,000+ in the US due to pattern day trader rules)</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="glossary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Financial Glossary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="border-b pb-4">
                  <h3 className="font-medium">Bear Market</h3>
                  <p className="text-sm text-muted-foreground">
                    A period when stock prices are falling, typically by 20% or more from recent highs, 
                    often accompanied by negative investor sentiment and economic downturn.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-medium">Bull Market</h3>
                  <p className="text-sm text-muted-foreground">
                    A period when stock prices are rising or expected to rise, characterized by investor 
                    optimism, positive expectations, and general economic confidence.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-medium">Dividend</h3>
                  <p className="text-sm text-muted-foreground">
                    A portion of a company's earnings distributed to shareholders, usually in cash but sometimes 
                    in additional stock. Typically paid quarterly.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-medium">ETF (Exchange-Traded Fund)</h3>
                  <p className="text-sm text-muted-foreground">
                    A type of investment fund traded on stock exchanges that holds assets like stocks, bonds, 
                    or commodities, and trades at market-determined prices throughout the trading day.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-medium">Market Capitalization</h3>
                  <p className="text-sm text-muted-foreground">
                    The total dollar value of a company's outstanding shares, calculated by multiplying 
                    the current share price by the total number of shares outstanding.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-medium">P/E Ratio (Price-to-Earnings Ratio)</h3>
                  <p className="text-sm text-muted-foreground">
                    A valuation ratio calculated by dividing a company's current share price by its earnings per share. 
                    It shows how much investors are willing to pay for each dollar of earnings.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-medium">Volatility</h3>
                  <p className="text-sm text-muted-foreground">
                    A statistical measure of the dispersion of returns for a given security or market index. 
                    Higher volatility indicates greater risk and larger price swings.
                  </p>
                </div>

                <div className="pb-4">
                  <h3 className="font-medium">Yield</h3>
                  <p className="text-sm text-muted-foreground">
                    The income return on an investment, such as interest or dividends received, expressed as a 
                    percentage based on the cost of the investment or its current market value.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
