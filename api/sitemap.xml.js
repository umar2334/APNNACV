/**
 * Dynamic Sitemap — Vercel Serverless Function
 * Route: /api/sitemap.xml → rewritten to /sitemap.xml via vercel.json
 *
 * Fetches published blog posts from Firestore REST API (no SDK needed)
 * and generates a complete XML sitemap including static + dynamic pages.
 */

const FIREBASE_PROJECT_ID = 'apnacv-85683';
const SITE_URL = 'https://apnnacv.vercel.app';
const TODAY = new Date().toISOString().split('T')[0];

// ── Static pages always in sitemap ──────────────────────────────────────────
const STATIC_PAGES = [
  { loc: '/',                priority: '1.0', changefreq: 'weekly'  },
  { loc: '/editor',          priority: '0.9', changefreq: 'weekly'  },
  { loc: '/blog',            priority: '0.9', changefreq: 'weekly'  },
  { loc: '/templates',       priority: '0.8', changefreq: 'monthly' },
  { loc: '/how-it-works',    priority: '0.7', changefreq: 'monthly' },
  { loc: '/privacy-policy',  priority: '0.5', changefreq: 'yearly'  },
  { loc: '/terms-of-service',priority: '0.5', changefreq: 'yearly'  },
  { loc: '/contact',         priority: '0.6', changefreq: 'yearly'  },
];

// ── Fetch blog posts from Firestore REST API ─────────────────────────────────
async function fetchBlogPosts() {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/blogPosts?pageSize=200`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.documents) return [];

    return data.documents
      .map((doc) => {
        const fields = doc.fields || {};
        const published = fields.published?.booleanValue;
        const slug = fields.slug?.stringValue;
        const updatedAt = fields.updatedAt?.stringValue;
        if (!published || !slug) return null;
        return {
          slug,
          lastmod: updatedAt ? updatedAt.split('T')[0] : TODAY,
        };
      })
      .filter(Boolean);
  } catch (err) {
    console.error('Firestore fetch error:', err);
    return [];
  }
}

// ── Generate XML ─────────────────────────────────────────────────────────────
function buildXml(staticPages, blogPosts) {
  const staticUrls = staticPages
    .map(
      (p) => `
  <url>
    <loc>${SITE_URL}${p.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
    )
    .join('');

  const blogUrls = blogPosts
    .map(
      (p) => `
  <url>
    <loc>${SITE_URL}/blog/${p.slug}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticUrls}
${blogUrls}
</urlset>`;
}

// ── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  const blogPosts = await fetchBlogPosts();
  const xml = buildXml(STATIC_PAGES, blogPosts);

  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  res.status(200).send(xml);
}
