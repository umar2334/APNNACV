import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FileText, Clock, ArrowRight, BookOpen, Tag, Loader } from 'lucide-react';
import { BlogPost, getPublishedPostsFromDB } from '../utils/blogStorage';

const CATEGORY_COLORS: Record<string, string> = {
  'CV Writing': '#3B82F6',
  'Career Tips': '#10B981',
  'Job Search': '#8B5CF6',
  'LinkedIn': '#F59E0B',
  'Remote Work': '#6366F1',
  'Career Growth': '#EF4444',
  'Interview Tips': '#EC4899',
  'Salary': '#14B8A6',
};

function colorFor(cat: string) {
  return CATEGORY_COLORS[cat] ?? '#6B7280';
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    document.title = 'Career Tips & CV Guides | AppnaCv Blog';
    let desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!desc) { desc = document.createElement('meta'); desc.name = 'description'; document.head.appendChild(desc); }
    desc.content = 'Expert career tips, CV writing guides, and job search advice for Pakistani job seekers.';

    getPublishedPostsFromDB().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];
  const filtered = activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);
  const readTime = (content: string) => Math.max(1, Math.ceil(content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length / 200));

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="py-16 px-5" style={{ background: 'linear-gradient(160deg, #EFF6FF 0%, #F8FAFF 50%, #EEF2FF 100%)' }}>
        <div className="max-w-screen-xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-6">
            <BookOpen size={14} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Career Resources</span>
          </div>
          <h1 className="font-extrabold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.15, color: '#0F172A' }}>
            Career Tips &amp; CV Guides
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Expert advice to help Pakistani job seekers write better CVs, ace interviews, and grow their careers.
          </p>
        </div>
      </section>

      {/* Top Ad Slot */}
      <div className="flex items-center justify-center py-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center justify-center text-gray-400 text-xs font-medium border border-dashed border-gray-300 rounded-lg" style={{ width: 728, maxWidth: '96vw', height: 90 }}>
          Advertisement · 728 × 90
        </div>
      </div>

      {/* Category Filter */}
      {!loading && categories.length > 2 && (
        <div className="max-w-screen-xl mx-auto px-5 pt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${activeCategory === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Articles Grid */}
      <section className="max-w-screen-xl mx-auto px-5 py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader size={32} className="text-blue-500 animate-spin mb-4" />
            <p className="text-gray-400 text-sm">Loading articles...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={40} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-semibold">No articles yet.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => {
              const color = colorFor(post.category);
              return (
                <Link key={post.slug} to={`/blog/${post.slug}`}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col overflow-hidden group"
                >
                  {post.featuredImage
                    ? <img src={post.featuredImage} alt={post.title} className="w-full h-40 object-cover" />
                    : <div className="h-1.5" style={{ backgroundColor: color }} />
                  }
                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-4 self-start" style={{ backgroundColor: `${color}18`, color }}>
                      <Tag size={9} /> {post.category}
                    </span>
                    <h2 className="text-lg font-bold text-gray-900 mb-3 leading-snug flex-1 group-hover:text-blue-700 transition-colors line-clamp-3">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-5 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100">
                      <span className="flex items-center gap-1.5"><Clock size={12} /> {readTime(post.content)} min read</span>
                      <span>{new Date(post.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Bottom Ad Slot */}
      <div className="flex items-center justify-center py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-center text-gray-400 text-xs font-medium border border-dashed border-gray-300 rounded-lg" style={{ width: 728, maxWidth: '96vw', height: 90 }}>
          Advertisement · 728 × 90
        </div>
      </div>

      {/* CTA */}
      <section className="bg-white border-t border-gray-100 py-14 px-5">
        <div className="max-w-xl mx-auto text-center">
          <FileText size={36} className="text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Ready to Build Your CV?</h2>
          <p className="text-gray-500 mb-6">Put these tips into action — create a professional, ATS-friendly CV in minutes.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold shadow-md hover:shadow-lg transition-all" style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}>
            Create My CV — Free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
