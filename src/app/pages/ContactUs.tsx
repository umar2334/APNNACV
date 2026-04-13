import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

export function ContactUs() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    /* Replace this with your real form submission (Formspree, EmailJS, etc.) */
    const mailto = `mailto:contact@apnnacv.vercel.app?subject=AppnaCv Contact: ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.email)}`;
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-2xl mx-auto px-5 py-14">

        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
          >
            <Mail size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Contact Us</h1>
            <p className="text-sm text-gray-400 mt-0.5">We typically reply within 24 hours</p>
          </div>
        </div>

        {sent ? (
          <div className="flex flex-col items-center text-center py-12">
            <CheckCircle size={48} className="text-emerald-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h2>
            <p className="text-gray-500">Thank you for reaching out. We'll get back to you soon.</p>
          </div>
        ) : (
          <>
            {/* Contact info */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
                <Mail size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Email</p>
                  <a
                    href="mailto:contact@apnnacv.vercel.app"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    contact@apnnacv.vercel.app
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-50 border border-purple-100">
                <MessageSquare size={18} className="text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Response Time</p>
                  <p className="text-sm text-gray-500">Within 24–48 hours</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="name">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ali Raza"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ali@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help…"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transition-all"
                style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
              >
                <Send size={15} />
                Send Message
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
