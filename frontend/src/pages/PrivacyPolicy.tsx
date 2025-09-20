import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:text-purple-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-slate-300">Last updated: January 20, 2025</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 backdrop-blur-md">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">1. Introduction</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                Welcome to LogoAI ("we," "our," or "us"). This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our AI-powered logo creation 
                service. Please read this privacy policy carefully. If you do not agree with the terms 
                of this privacy policy, please do not access the service.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">2.1 Personal Information</h3>
              <p className="text-white/80 mb-4 leading-relaxed">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="text-white/80 mb-6 space-y-2">
                <li>• Register for an account or use our services</li>
                <li>• Upload images or files to our platform</li>
                <li>• Contact us for support or inquiries</li>
                <li>• Subscribe to our newsletter or marketing communications</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-4">2.2 Usage Information</h3>
              <p className="text-white/80 mb-4 leading-relaxed">
                We automatically collect certain information about your device and usage patterns:
              </p>
              <ul className="text-white/80 mb-6 space-y-2">
                <li>• IP address and device information</li>
                <li>• Browser type and version</li>
                <li>• Pages visited and time spent on our service</li>
                <li>• Referring website addresses</li>
                <li>• Log files and analytics data</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-4">2.3 AI Processing Data</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                When you use our AI logo generation services, we process:
              </p>
              <ul className="text-white/80 mb-6 space-y-2">
                <li>• Images you upload for enhancement or reference</li>
                <li>• Text descriptions and prompts you provide</li>
                <li>• Generated logos and design outputs</li>
                <li>• Processing metadata and performance metrics</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">3. How We Use Your Information</h2>
              <p className="text-white/80 mb-4 leading-relaxed">
                We use the collected information for the following purposes:
              </p>
              <ul className="text-white/80 mb-6 space-y-2">
                <li>• To provide and maintain our logo creation services</li>
                <li>• To process and generate logos using AI technology</li>
                <li>• To improve our services and develop new features</li>
                <li>• To communicate with you about your account and services</li>
                <li>• To provide customer support and respond to inquiries</li>
                <li>• To send marketing communications (with your consent)</li>
                <li>• To comply with legal obligations and protect our rights</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">4. Information Sharing and Disclosure</h2>
              <p className="text-white/80 mb-4 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share 
                your information in the following circumstances:
              </p>
              <ul className="text-white/80 mb-6 space-y-2">
                <li>• <strong>Service Providers:</strong> With trusted third-party vendors who assist in operating our service</li>
                <li>• <strong>AI Processing:</strong> With AI service providers (Google Gemini) for logo generation</li>
                <li>• <strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li>• <strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                <li>• <strong>Consent:</strong> When you have given explicit consent for sharing</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">5. Data Security</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction. 
                However, no method of transmission over the internet or electronic storage is 100% secure, 
                and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">6. Data Retention</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes 
                outlined in this privacy policy, unless a longer retention period is required or permitted 
                by law. Generated logos and uploaded images may be stored for service improvement purposes 
                but can be deleted upon request.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">7. Your Rights</h2>
              <p className="text-white/80 mb-4 leading-relaxed">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="text-white/80 mb-6 space-y-2">
                <li>• <strong>Access:</strong> Request access to your personal information</li>
                <li>• <strong>Correction:</strong> Request correction of inaccurate information</li>
                <li>• <strong>Deletion:</strong> Request deletion of your personal information</li>
                <li>• <strong>Portability:</strong> Request transfer of your data to another service</li>
                <li>• <strong>Objection:</strong> Object to processing of your personal information</li>
                <li>• <strong>Withdrawal:</strong> Withdraw consent for data processing</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">8. Cookies and Tracking</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our service. 
                You can control cookie settings through your browser preferences. Some features may not 
                function properly if cookies are disabled.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">9. Third-Party Services</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                Our service integrates with third-party AI providers including Google Gemini. These services 
                have their own privacy policies, and we encourage you to review them. We are not responsible 
                for the privacy practices of these third-party services.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">10. Children's Privacy</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                Our service is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and believe 
                your child has provided us with personal information, please contact us.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">11. International Data Transfers</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your information in accordance 
                with applicable data protection laws.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">12. Changes to This Privacy Policy</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes 
                by posting the new privacy policy on this page and updating the "Last updated" date. 
                Your continued use of the service after such changes constitutes acceptance of the updated policy.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">13. Contact Information</h2>
              <p className="text-white/80 mb-4 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-white/5 rounded-lg p-6 mb-6">
                <p className="text-white/80 mb-2"><strong>Email:</strong> siddharth.shekharr@gmail.com</p>
                <p className="text-white/80 mb-2"><strong>Developer:</strong> Siddharth Shekhar</p>
                <p className="text-white/80"><strong>Service:</strong> LogoAI - AI-Powered Logo Creation</p>
              </div>

              <div className="text-center mt-8">
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  Return to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
