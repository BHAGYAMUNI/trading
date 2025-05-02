
import { MainLayout } from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-muted-foreground">
          How we collect, use, and protect your information
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy for StellarTrade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p>Last Updated: April 29, 2023</p>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. Information We Collect</h2>
              <p>
                <strong>Personal Information:</strong> When you register for StellarTrade, we collect information such as your name,
                email address, and password.
              </p>
              <p>
                <strong>Usage Information:</strong> We collect information about how you use StellarTrade, including your trading activities,
                portfolio performance, and interactions with the platform.
              </p>
              <p>
                <strong>Device Information:</strong> We may collect information about the device you use to access StellarTrade,
                including the hardware model, operating system, and browser type.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve StellarTrade</li>
                <li>Create and manage your account</li>
                <li>Process your virtual trades and maintain your virtual portfolio</li>
                <li>Communicate with you about StellarTrade</li>
                <li>Monitor and analyze trends, usage, and activities in connection with StellarTrade</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Personalize your experience on StellarTrade</li>
              </ul>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. Information Sharing and Disclosure</h2>
              <p>
                We do not share your personal information with third parties except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect and defend our rights and property</li>
                <li>With service providers who help us operate StellarTrade</li>
              </ul>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. Data Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information from unauthorized access, alteration,
                disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we have about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request the deletion of your personal information</li>
                <li>Object to our processing of your personal information</li>
                <li>Request the restriction of our processing of your personal information</li>
              </ul>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">6. Cookies and Similar Technologies</h2>
              <p>
                StellarTrade uses cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized
                content. You can control cookies through your browser settings.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">7. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy
                on this page and updating the "Last Updated" date.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@stellartrade.example.com" className="text-primary hover:underline">privacy@stellartrade.example.com</a>.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
