
import { MainLayout } from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function About() {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">About StellarTrade</h1>
        <p className="text-muted-foreground">
          Learn more about our virtual trading platform
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-primary-700 to-primary-500 text-white p-3 rounded-lg">
              <BarChart3 className="h-8 w-8" />
            </div>
            <span className="font-bold text-3xl ml-3">StellarTrade</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p>
              StellarTrade is a virtual trading platform designed to help you learn about stock market investing
              without risking real money. Our platform provides a realistic trading experience with simulated
              market data, allowing you to practice your investment strategies in a risk-free environment.
            </p>
            
            <p>
              Founded in 2023, StellarTrade aims to make financial education accessible to everyone. Whether
              you're a beginner learning the basics of investing or an experienced trader testing new strategies,
              our platform offers the tools and features you need to succeed.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Key Features</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Virtual portfolio with $100,000 in starting capital</li>
              <li>Real-time simulated market data for popular stocks</li>
              <li>Comprehensive portfolio tracking and performance analysis</li>
              <li>Detailed transaction history</li>
              <li>Leaderboard to compete with other traders</li>
              <li>Market news and trading tips</li>
              <li>User-friendly interface with customizable settings</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Our Mission</h3>
            <p>
              Our mission is to democratize financial education and empower individuals to become confident
              investors through hands-on practice and learning. We believe that everyone should have the
              opportunity to understand how financial markets work and develop the skills needed to make
              informed investment decisions.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Contact Us</h3>
            <p>
              If you have any questions, feedback, or suggestions about StellarTrade, we'd love to hear from you.
              Please reach out to us at <a href="mailto:support@stellartrade.example.com" className="text-primary hover:underline">support@stellartrade.example.com</a>.
            </p>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
