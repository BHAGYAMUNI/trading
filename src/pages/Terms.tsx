
import { MainLayout } from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-muted-foreground">
          Please read these terms carefully before using StellarTrade
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Terms and Conditions for StellarTrade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p>Last Updated: April 29, 2023</p>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
              <p>
                By accessing or using StellarTrade, you agree to be bound by these Terms of Service. If you do not agree
                to all the terms and conditions, you should not access or use StellarTrade.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. Description of Service</h2>
              <p>
                StellarTrade is a virtual trading platform that allows users to practice trading stocks and other securities
                using virtual currency. The platform is for educational and entertainment purposes only, and does not involve
                real money or actual securities transactions.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. Registration and User Accounts</h2>
              <p>
                To use certain features of StellarTrade, you must register and create an account. You agree to provide accurate, 
                current, and complete information during the registration process and to update such information to keep it 
                accurate, current, and complete.
              </p>
              <p>
                You are responsible for safeguarding your password and for all activities that occur under your account. You 
                agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. Virtual Currency and Trading</h2>
              <p>
                StellarTrade provides users with virtual currency for use within the platform. This virtual currency has no 
                real-world value and cannot be redeemed for real money or anything of value outside of the StellarTrade platform.
              </p>
              <p>
                All trading activities on StellarTrade are simulated and do not reflect real market transactions. Market data 
                may be delayed, simulated, or approximated and should not be relied upon for actual investment decisions.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. Disclaimer of Warranties</h2>
              <p>
                StellarTrade is provided "as is" and "as available" without any warranties of any kind, either express or implied.
                We do not guarantee that the platform will be uninterrupted, secure, or error-free.
              </p>
              <p>
                StellarTrade does not provide financial advice, and nothing on the platform should be construed as investment advice.
                Users should consult with qualified financial professionals before making actual investment decisions.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">6. Limitation of Liability</h2>
              <p>
                In no event shall StellarTrade be liable for any indirect, incidental, special, consequential, or punitive damages,
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. If we make material changes to these Terms, we
                will notify you by email or by posting a notice on our website.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">8. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which StellarTrade
                operates, without regard to its conflict of law provisions.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">9. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:legal@stellartrade.example.com" className="text-primary hover:underline">legal@stellartrade.example.com</a>.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
