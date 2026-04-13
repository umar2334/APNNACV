import React from 'react';
import { Shield } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-5 py-14">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
          >
            <Shield size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
            <p className="text-sm text-gray-400 mt-0.5">Last updated: April 2025</p>
          </div>
        </div>

        <div className="prose prose-gray max-w-none text-gray-600 text-[15px] leading-relaxed space-y-6">

          <p>
            AppnaCv ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website at <strong>apnnacv.vercel.app</strong>.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">1. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Account information:</strong> If you sign in with Google, we receive your name, email address, and profile picture from Google.</li>
            <li><strong>CV data:</strong> The information you enter in the CV editor (name, experience, education, skills, etc.) is stored locally in your browser and is not transmitted to our servers.</li>
            <li><strong>Usage data:</strong> We may collect anonymous usage analytics (page views, feature usage) to improve the product.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To provide and improve the CV builder service.</li>
            <li>To authenticate your account via Google Sign-In.</li>
            <li>To understand how users interact with the app so we can make it better.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">3. Data Storage</h2>
          <p>
            Your CV content is stored in your browser's local storage. We do not store your CV data on external servers. Clearing your browser data will erase your saved CV.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">4. Third-Party Services</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Google Sign-In:</strong> We use Google OAuth for authentication. Google's Privacy Policy applies to that interaction.</li>
            <li><strong>Google AdSense:</strong> We display advertisements powered by Google AdSense. Google may use cookies to serve personalized ads. You can opt out via <a href="https://adssettings.google.com" className="text-blue-600 underline" target="_blank" rel="noreferrer">Google Ad Settings</a>.</li>
            <li><strong>Vercel:</strong> Our app is hosted on Vercel. Vercel may collect server logs including IP addresses.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">5. Cookies</h2>
          <p>
            We use essential cookies for authentication. Google AdSense uses cookies for ad personalization. You can disable cookies in your browser settings, though this may affect app functionality.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">6. Your Rights</h2>
          <p>
            You may request deletion of your account data at any time by contacting us at the email below. Since CV data is stored locally in your browser, you can delete it by clearing your browser's local storage.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">7. Children's Privacy</h2>
          <p>
            AppnaCv is not directed to children under 13. We do not knowingly collect personal information from children under 13.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-2">8. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at <strong>contact@apnnacv.vercel.app</strong>.
          </p>

        </div>
      </div>
    </div>
  );
}
