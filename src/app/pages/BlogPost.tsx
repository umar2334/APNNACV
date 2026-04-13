import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Clock, Tag, User, Calendar, ArrowRight } from 'lucide-react';
import { getPostBySlug, getPublishedPosts } from '../utils/blogStorage';

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;
  const allPosts = getPublishedPosts();
  const related = allPosts.filter((p) => p.slug !== slug && p.category === post?.category).slice(0, 3);

  /* SEO meta injection */
  useEffect(() => {
    if (!post) return;
    const siteName = 'AppnaCv';
    const url = `https://apnnacv.vercel.app/blog/${post.slug}`;

    document.title = `${post.title} | ${siteName}`;
    setMeta('description', post.metaDescription || post.excerpt);
    setMeta('keywords', post.keywords);
    setMeta('author', post.author);

    // Open Graph
    setMeta('og:title', post.title, true);
    setMeta('og:description', post.metaDescription || post.excerpt, true);
    setMeta('og:url', url, true);
    setMeta('og:type', 'article', true);
    setMeta('og:site_name', siteName, true);
    if (post.featuredImage) setMeta('og:image', post.featuredImage, true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', post.title);
    setMeta('twitter:description', post.metaDescription || post.excerpt);

    // Article meta
    setMeta('article:published_time', post.createdAt, true);
    setMeta('article:modified_time', post.updatedAt, true);
    setMeta('article:section', post.category, true);

    // JSON-LD structured data
    const existingLd = document.querySelector('script[data-blog-ld]');
    if (existingLd) existingLd.remove();
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.setAttribute('data-blog-ld', '');
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.metaDescription || post.excerpt,
      author: { '@type': 'Person', name: post.author },
      publisher: {
        '@type': 'Organization',
        name: 'AppnaCv',
        url: 'https://apnnacv.vercel.app',
      },
      datePublished: post.createdAt,
      dateModified: post.updatedAt,
      url,
      image: post.featuredImage || 'https://apnnacv.vercel.app/og-image.png',
      keywords: post.keywords,
      articleSection: post.category,
    });
    document.head.appendChild(ld);

    return () => {
      document.querySelector('script[data-blog-ld]')?.remove();
    };
  }, [post]);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-5xl font-black text-gray-200 mb-3">404</h1>
        <p className="text-gray-600 font-semibold mb-2">Article not found.</p>
        <Link to="/blog" className="text-blue-600 text-sm hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="bg-white min-h-screen">

      {/* ── TOP AD SLOT ── */}
      <div className="w-full bg-gray-50 border-b border-gray-100 flex items-center justify-center" style={{ minHeight: 90 }}>
        <div
          className="flex items-center justify-center text-gray-400 text-xs font-medium border border-dashed border-gray-300 rounded-lg"
          style={{ width: 728, maxWidth: '96vw', height: 90 }}
        >
          Advertisement · 728 × 90
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-10">

        {/* Back link */}
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-600 transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        {/* Category */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
            <Tag size={10} /> {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
          {post.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-8 pb-6 border-b border-gray-100">
          <span className="flex items-center gap-1.5"><User size={12} /> {post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(post.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} /> {readTime} min read</span>
        </div>

        {/* Featured image */}
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full rounded-2xl object-cover mb-8 max-h-80"
          />
        )}

        {/* ── MID-ARTICLE AD SLOT ── */}
        <div className="flex items-center justify-center my-8">
          <div
            className="flex items-center justify-center text-gray-400 text-xs font-medium border border-dashed border-gray-300 rounded-lg"
            style={{ width: 336, maxWidth: '100%', height: 280 }}
          >
            Advertisement · 336 × 280
          </div>
        </div>

        {/* Article content */}
        <div
          className="prose prose-gray prose-lg max-w-none
            prose-h2:text-xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mt-8 prose-h2:mb-3
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
            prose-ul:text-gray-600 prose-li:mb-1
            prose-strong:text-gray-800
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Keywords (hidden, for SEO) */}
        {post.keywords && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {post.keywords.split(',').map((kw) => kw.trim()).filter(Boolean).map((kw) => (
                <span key={kw} className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">{kw}</span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 p-6 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, #EFF6FF, #EEF2FF)' }}>
          <p className="text-sm font-bold text-gray-800 mb-1">Ready to build your professional CV?</p>
          <p className="text-xs text-gray-500 mb-4">Free, ATS-friendly, downloadable in seconds.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
            style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
          >
            Create My CV — Free <ArrowRight size={14} />
          </Link>
        </div>

      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-100 py-12 px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Related Articles</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow group"
                >
                  <span className="text-xs font-semibold text-blue-600">{r.category}</span>
                  <p className="text-sm font-bold text-gray-900 mt-1 leading-snug group-hover:text-blue-700 transition-colors line-clamp-3">{r.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── BOTTOM AD SLOT ── */}
      <div className="w-full bg-white border-t border-gray-100 flex items-center justify-center" style={{ minHeight: 90 }}>
        <div
          className="flex items-center justify-center text-gray-400 text-xs font-medium border border-dashed border-gray-300 rounded-lg"
          style={{ width: 728, maxWidth: '96vw', height: 90 }}
        >
          Advertisement · 728 × 90
        </div>
      </div>

    </div>
  );
}
