import React from 'react';
import { Link } from 'react-router';
import { FileText, Clock, ArrowRight, BookOpen } from 'lucide-react';

const ARTICLES = [
  {
    slug: 'how-to-write-ats-friendly-cv',
    title: 'How to Write an ATS-Friendly CV in 2025',
    excerpt: 'Applicant Tracking Systems reject up to 75% of CVs before a human ever reads them. Learn the exact formatting rules and keyword strategies that get you past the bots.',
    date: 'April 10, 2025',
    readTime: '6 min read',
    category: 'CV Writing',
    color: '#3B82F6',
  },
  {
    slug: 'top-cv-mistakes-fresh-graduates',
    title: 'Top 10 CV Mistakes Fresh Graduates Make (and How to Fix Them)',
    excerpt: 'From listing every school project to skipping a summary — discover the most common CV mistakes fresh grads make and exactly how to fix each one.',
    date: 'April 5, 2025',
    readTime: '8 min read',
    category: 'Career Tips',
    color: '#10B981',
  },
  {
    slug: 'cover-letter-guide-pakistan',
    title: 'The Complete Cover Letter Guide for Pakistani Job Seekers',
    excerpt: 'A strong cover letter can double your interview chances. This step-by-step guide shows you how to write one that resonates with Pakistani hiring managers.',
    date: 'March 28, 2025',
    readTime: '7 min read',
    category: 'Job Search',
    color: '#8B5CF6',
  },
  {
    slug: 'linkedin-profile-tips',
    title: 'LinkedIn Profile Tips That Get You Noticed by Recruiters',
    excerpt: 'Over 90% of recruiters use LinkedIn to find candidates. Optimize your headline, summary, and experience sections to show up in more searches.',
    date: 'March 20, 2025',
    readTime: '5 min read',
    category: 'LinkedIn',
    color: '#F59E0B',
  },
  {
    slug: 'salary-negotiation-tips',
    title: 'How to Negotiate Your Salary in Pakistan: A Practical Guide',
    excerpt: 'Most people leave money on the table by not negotiating. Learn evidence-based tactics for salary negotiation that work in the Pakistani job market.',
    date: 'March 15, 2025',
    readTime: '9 min read',
    category: 'Career Growth',
    color: '#EF4444',
  },
  {
    slug: 'remote-jobs-for-pakistanis',
    title: 'Best Remote Job Platforms for Pakistani Professionals in 2025',
    excerpt: 'Upwork, Toptal, Remote.co — we break down the top 8 platforms where Pakistani professionals are earning in dollars, with tips to land your first client.',
    date: 'March 8, 2025',
    readTime: '6 min read',
    category: 'Remote Work',
    color: '#6366F1',
  },
];

export function Blog() {
  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section
        className="py-16 px-5"
        style={{ background: 'linear-gradient(160deg, #EFF6FF 0%, #F8FAFF 50%, #EEF2FF 100%)' }}
      >
        <div className="max-w-screen-xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-6">
            <BookOpen size={14} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Career Resources</span>
          </div>
          <h1
            className="font-extrabold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.15, color: '#0F172A' }}
          >
            Career Tips &amp; CV Guides
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Expert advice to help Pakistani job seekers write better CVs, ace interviews, and grow their careers.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-screen-xl mx-auto px-5 py-14">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden"
            >
              {/* Color bar */}
              <div className="h-1.5" style={{ backgroundColor: article.color }} />

              <div className="p-6 flex flex-col flex-1">
                {/* Category badge */}
                <span
                  className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-4 self-start"
                  style={{ backgroundColor: `${article.color}18`, color: article.color }}
                >
                  {article.category}
                </span>

                <h2 className="text-lg font-bold text-gray-900 mb-3 leading-snug flex-1">
                  {article.title}
                </h2>

                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    <span>{article.readTime}</span>
                  </div>
                  <span>{article.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 border-t border-gray-100 py-14 px-5">
        <div className="max-w-xl mx-auto text-center">
          <FileText size={36} className="text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
            Ready to Build Your CV?
          </h2>
          <p className="text-gray-500 mb-6">
            Put these tips into action — create a professional, ATS-friendly CV in minutes.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold shadow-md hover:shadow-lg transition-all"
            style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
          >
            Create My CV — Free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
