import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Clock, Tag, User, Calendar, ArrowRight, Loader, Share2, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { BlogPost as BlogPostType, getPostBySlugFromDB, getPublishedPostsFromDB } from '../utils/blogStorage';

// ── Adsterra Banner ───────────────────────────────────────────────────────────
function AdsterraBanner({ adKey, width, height, uid }: { adKey: string; width: number; height: number; uid: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.querySelector('script')) return;
    const optsScript = document.createElement('script');
    optsScript.type = 'text/javascript';
    optsScript.text = `atOptions = { 'key': '${adKey}', 'format': 'iframe', 'height': ${height}, 'width': ${width}, 'params': {} };`;
    document.head.appendChild(optsScript);
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.async = true;
    invokeScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
    ref.current.appendChild(invokeScript);
  }, [adKey, uid]);
  return <div ref={ref} style={{ width, height, margin: '0 auto', overflow: 'hidden' }} />;
}

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
  el.content = content;
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [related, setRelated] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { navigate('/blog'); return; }
    Promise.all([
      getPostBySlugFromDB(slug),
      getPublishedPostsFromDB(),
    ]).then(([found, all]) => {
      if (!found) { navigate('/blog'); return; }
      setPost(found);
      setRelated(all.filter((p) => p.slug !== slug && p.category === found.category).slice(0, 3));
      setLoading(false);

      // SEO
      const url = `https://apnnacv.vercel.app/blog/${found.slug}`;
      document.title = `${found.title} | AppnaCv`;
      setMeta('description', found.metaDescription || found.excerpt);
      setMeta('keywords', found.keywords);
      setMeta('author', found.author);
      setMeta('og:title', found.title, true);
      setMeta('og:description', found.metaDescription || found.excerpt, true);
      setMeta('og:url', url, true);
      setMeta('og:type', 'article', true);
      if (found.featuredImage) setMeta('og:image', found.featuredImage, true);
      setMeta('twitter:title', found.title);
      setMeta('twitter:description', found.metaDescription || found.excerpt);

      // JSON-LD: BlogPosting
      document.querySelector('script[data-blog-ld]')?.remove();
      const ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.setAttribute('data-blog-ld', '');
      ld.textContent = JSON.stringify({
        '@context': 'https://schema.org', '@type': 'BlogPosting',
        headline: found.title, description: found.metaDescription || found.excerpt,
        author: { '@type': 'Person', name: found.author },
        publisher: {
          '@type': 'Organization',
          name: 'AppnaCv',
          url: 'https://apnnacv.vercel.app',
          logo: { '@type': 'ImageObject', url: 'https://apnnacv.vercel.app/apple-touch-icon.png' },
        },
        datePublished: found.createdAt, dateModified: found.updatedAt,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        url, keywords: found.keywords, articleSection: found.category,
        inLanguage: 'en-PK',
      });
      document.head.appendChild(ld);

      // JSON-LD: BreadcrumbList (Google loves these)
      document.querySelector('script[data-breadcrumb-ld]')?.remove();
      const bc = document.createElement('script');
      bc.type = 'application/ld+json';
      bc.setAttribute('data-breadcrumb-ld', '');
      bc.textContent = JSON.stringify({
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://apnnacv.vercel.app/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://apnnacv.vercel.app/blog' },
          { '@type': 'ListItem', position: 3, name: found.title, item: url },
        ],
      });
      document.head.appendChild(bc);
    });
    return () => {
      document.querySelector('script[data-blog-ld]')?.remove();
      document.querySelector('script[data-breadcrumb-ld]')?.remove();
    };
  }, [slug, navigate]);

  // Share URLs
  const shareUrl = post ? `https://apnnacv.vercel.app/blog/${post.slug}` : '';
  const shareText = post ? encodeURIComponent(post.title) : '';
  const encodedUrl = encodeURIComponent(shareUrl);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader size={32} className="text-blue-500 animate-spin mb-3" />
        <p className="text-gray-400 text-sm">Loading article...</p>
      </div>
    );
  }

  if (!post) return null;

  const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="bg-white min-h-screen">

      {/* Top Ad — 728x90 */}
      <div className="w-full bg-gray-50 border-b border-gray-100 flex items-center justify-center py-3">
        <AdsterraBanner adKey="4af9a7133d3a622a55ec2eb6fc1760a9" width={728} height={90} uid="top" />
      </div>

      <div className="max-w-3xl mx-auto px-5 py-10">
        {/* Breadcrumbs — SEO critical */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
            <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li><Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-600 font-medium truncate max-w-[200px]">{post.title}</li>
          </ol>
        </nav>

        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-600 transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
            <Tag size={10} /> {post.category}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-8 pb-6 border-b border-gray-100">
          <span className="flex items-center gap-1.5"><User size={12} /> {post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(post.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} /> {readTime} min read</span>
        </div>

        {post.featuredImage && (
          <img src={post.featuredImage} alt={post.title} className="w-full rounded-2xl object-cover mb-8 max-h-80" />
        )}

        {/* Mid Ad — 300x250 */}
        <div className="flex items-center justify-center my-8">
          <AdsterraBanner adKey="c41379b356692c0ff166fc929170cb1d" width={300} height={250} uid="mid" />
        </div>

        <div
          className="prose prose-gray prose-lg max-w-none prose-h2:text-xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mt-8 prose-h2:mb-3 prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4 prose-ul:text-gray-600 prose-li:mb-1 prose-strong:text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Social Share Buttons — drives traffic back to site */}
        <div className="mt-10 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
              <Share2 size={14} /> Share this article:
            </span>
            <a
              href={`https://wa.me/?text=${shareText}%20${encodedUrl}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 transition-all"
              aria-label="Share on WhatsApp"
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-all"
              aria-label="Share on Facebook"
            >
              <Facebook size={13} /> Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareText}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 text-xs font-semibold hover:bg-sky-100 transition-all"
              aria-label="Share on Twitter"
            >
              <Twitter size={13} /> Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold hover:bg-blue-100 transition-all"
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={13} /> LinkedIn
            </a>
          </div>
        </div>

        {post.keywords && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Related Topics</p>
            <div className="flex flex-wrap gap-2">
              {post.keywords.split(',').map((kw) => kw.trim()).filter(Boolean).map((kw) => (
                <span key={kw} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">#{kw.replace(/\s+/g, '')}</span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 p-6 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, #EFF6FF, #EEF2FF)' }}>
          <p className="text-sm font-bold text-gray-800 mb-1">Ready to build your professional CV?</p>
          <p className="text-xs text-gray-500 mb-4">Free, ATS-friendly, downloadable in seconds.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold shadow-md hover:shadow-lg transition-all" style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}>
            Create My CV — Free <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-100 py-12 px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Related Articles</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow group">
                  <span className="text-xs font-semibold text-blue-600">{r.category}</span>
                  <p className="text-sm font-bold text-gray-900 mt-1 leading-snug group-hover:text-blue-700 transition-colors line-clamp-3">{r.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Ad — 468x60 */}
      <div className="w-full bg-white border-t border-gray-100 flex items-center justify-center py-4">
        <AdsterraBanner adKey="aeabfd7ad07507ef114bc8f2d0db46bc" width={468} height={60} uid="bottom" />
      </div>

    </div>
  );
}
