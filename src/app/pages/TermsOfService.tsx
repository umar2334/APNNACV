import React from 'react';
import { FileText } from 'lucide-react';

export function TermsOfService() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-5 py-14">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
          >
            <FileText size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Terms of Service</h1>
            <p className="text-sm text-gray-400 mt-0.5">Last updated: April 2025</p>
          </div>
        </div>

        <div className="prose prose-gray max-w-none text-gray-600 text-[15px] leading-relaxed space-y-6">

          <p>
            Welcome to AppnaCv. By accessing or using our website at <strong>apnnacv.vercel.app</strong>, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">1. Use of the Service</h2>
          <p>
            AppnaCv provides a free, browser-based CV builder. You may use the service to create, customize, and download your personal CV. You agree not to use the service for any unlawful purpose or in a way that infringes the rights of others.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">2. User Content</h2>
          <p>
            All content you enter into the CV editor (personal information, work history, skills, etc.) belongs to you. We do not claim ownership of your CV content. Your data is stored locally in your browser and is not uploaded to our servers.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">3. Free Service</h2>
          <p>
            AppnaCv is free to use. We sustain the service through advertising. By using AppnaCv, you agree that advertisements may be displayed during certain interactions, such as the PDF download process.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">4. Intellectual Property</h2>
          <p>
            The AppnaCv brand, design, templates, and code are owned by AppnaCv. You may not copy, modify, distribute, or create derivative works of our templates or interface without explicit permission.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">5. Disclaimer of Warranties</h2>
          <p>
            AppnaCv is provided "as is" without any warranties, express or implied. We do not guarantee that the service will be uninterrupted, error-free, or that downloaded PDFs will be accepted by any particular employer or ATS system.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, AppnaCv shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service, including loss of data or employment opportunities.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">7. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of those websites.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Continued use of the service after changes are posted constitutes acceptance of the new Terms.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">9. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Pakistan. Any disputes shall be resolved in the courts of Pakistan.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">10. Contact</h2>
          <p>
            Questions about these Terms? Contact us at <strong>contact@apnnacv.vercel.app</strong>.
          </p>

        </div>
      </div>
    </div>
  );
}
