import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
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
            <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
            <p className="text-slate-300">Last updated: January 20, 2025</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 backdrop-blur-md">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">1. Acceptance of Terms</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                Welcome to LogoAI. These Terms of Service ("Terms") govern your use of our AI-powered 
                logo creation service ("Service") operated by Siddharth Shekhar ("us," "we," or "our"). 
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree 
                with any part of these terms, then you may not access the Service.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">2. Description of Service</h2>
              <p className="text-white/80 mb-4 leading-relaxed">
                LogoAI is an AI-powered platform that provides logo creation and enhancement services including:
              </p>
              <ul className="text-white/80 mb-6 space-y-2">
                <li>• AI-generated logos from text descriptions</li>
                <li>• Logo enhancement and improvement tools</li>
                <li>• Reference-based logo creation</li>
                <li>• Download and export functionality</li>
                <li>• Custom prompt-based modifications</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">3. User Accounts and Registration</h2>
              <p className="text-white/80 mb-4 leading-relaxed">
                To access certain features of our Service, you may be required to register for an account. 
                You agree to:
              </p>
              <ul className="text-white/80 mb-6 space-y-2">
                <li>• Provide accurate, current, and complete information during registration</li>
                <li>• Maintain and update your account information</li>
                <li>• Maintain the security of your password and account</li>
                <li>• Accept responsibility for all activities under your account</li>
                <li>• Notify us immediately of any unauthorized use of your account</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">4. Acceptable Use Policy</h2>
              <p className="text-white/80 mb-4 leading-relaxed">
                You agree to use our Service only for lawful purposes and in accordance with these Terms. 
                You agree NOT to:
              </p>
              <ul className="text-white/80 mb-6 space-y-2">
                <li>• Upload or create content that violates any laws or regulations</li>
                <li>• Infringe on intellectual property rights of others</li>
                <li>• Upload malicious software, viruses, or harmful code</li>
                <li>• Attempt to gain unauthorized access to our systems</li>
                <li>• Use the Service for any commercial purpose without permission</li>
                <li>• Create logos that promote illegal activities, hate speech, or violence</li>
                <li>• Reverse engineer or attempt to extract our AI models</li>
                <li>• Abuse or overload our servers or infrastructure</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">5. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">5.1 Your Content</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                You retain ownership of any images, text, or other content you upload to our Service. 
                By uploading content, you grant us a limited license to process, store, and use your 
                content solely for the purpose of providing our Service to you.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">5.2 Generated Logos</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                Logos generated by our AI service are provided to you for your use. You may use these 
                logos for personal or commercial purposes, subject to these Terms. We do not claim 
                ownership of logos generated for you.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">5.3 Our Service</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                The LogoAI service, including its design, functionality, and underlying technology, 
                is protected by intellectual property laws. You may not copy, modify, or distribute 
                our Service without permission.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">6. AI and Machine Learning</h2>
              <p className="text-white/80 mb-4 leading-relaxed">
                Our Service uses artificial intelligence and machine learning technologies, including 
                Google Gemini AI. You acknowledge that:
              </p>
              <ul className="text-white/80 mb-6 space-y-2">
                <li>• AI-generated content may not always meet your expectations</li>
                <li>• Results may vary based on input quality and complexity</li>
                <li>• We continuously improve our AI models using aggregated data</li>
                <li>• AI processing may take time depending on server load</li>
                <li>• We are not responsible for AI-generated content that may infringe third-party rights</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">7. Privacy and Data Protection</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                Your privacy is important to us. Our collection and use of personal information is 
                governed by our Privacy Policy, which is incorporated into these Terms by reference. 
                By using our Service, you consent to the collection and use of information as described 
                in our Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">8. Service Availability and Modifications</h2>
              <p className="text-white/80 mb-4 leading-relaxed">
                We strive to maintain high service availability but cannot guarantee uninterrupted access. 
                We reserve the right to:
              </p>
              <ul className="text-white/80 mb-6 space-y-2">
                <li>• Modify or discontinue the Service at any time</li>
                <li>• Perform maintenance that may temporarily interrupt service</li>
                <li>• Update features and functionality</li>
                <li>• Implement usage limits or restrictions</li>
                <li>• Suspend accounts that violate these Terms</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">9. Limitation of Liability</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, LOGOAI AND ITS DEVELOPER SHALL NOT BE LIABLE 
                FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING 
                WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, 
                RESULTING FROM YOUR USE OF THE SERVICE.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">10. Disclaimers</h2>
              <p className="text-white/80 mb-4 leading-relaxed">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE DISCLAIM ALL 
                WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="text-white/80 mb-6 space-y-2">
                <li>• Warranties of merchantability and fitness for a particular purpose</li>
                <li>• Warranties regarding the accuracy or reliability of AI-generated content</li>
                <li>• Warranties that the Service will be uninterrupted or error-free</li>
                <li>• Warranties regarding third-party integrations or services</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">11. Indemnification</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                You agree to defend, indemnify, and hold harmless LogoAI and its developer from and 
                against any claims, damages, obligations, losses, liabilities, costs, or debt, and 
                expenses (including attorney's fees) arising from your use of the Service or violation 
                of these Terms.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">12. Termination</h2>
              <p className="text-white/80 mb-4 leading-relaxed">
                We may terminate or suspend your account and access to the Service immediately, without 
                prior notice or liability, for any reason whatsoever, including without limitation if 
                you breach the Terms. Upon termination:
              </p>
              <ul className="text-white/80 mb-6 space-y-2">
                <li>• Your right to use the Service will cease immediately</li>
                <li>• We may delete your account and associated data</li>
                <li>• Provisions that by their nature should survive termination shall remain in effect</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">13. Governing Law and Dispute Resolution</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India, 
                without regard to its conflict of law provisions. Any disputes arising from these Terms 
                or your use of the Service shall be resolved through binding arbitration or in the courts 
                of competent jurisdiction in India.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">14. Changes to Terms</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is 
                material, we will try to provide at least 30 days notice prior to any new terms taking 
                effect. Your continued use of the Service after any changes constitutes acceptance of 
                the new Terms.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">15. Severability</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                If any provision of these Terms is held to be invalid or unenforceable by a court, 
                the remaining provisions of these Terms will remain in effect.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">16. Contact Information</h2>
              <p className="text-white/80 mb-4 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-white/5 rounded-lg p-6 mb-6">
                <p className="text-white/80 mb-2"><strong>Email:</strong> siddharth.shekharr@gmail.com</p>
                <p className="text-white/80 mb-2"><strong>Developer:</strong> Siddharth Shekhar</p>
                <p className="text-white/80 mb-2"><strong>Service:</strong> LogoAI - AI-Powered Logo Creation</p>
                <p className="text-white/80"><strong>Location:</strong> India</p>
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

export default TermsOfService;
