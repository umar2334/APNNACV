import React, { useState, useEffect } from 'react';
import {
  Lock, Plus, Edit2, Trash2, Eye, EyeOff, Save,
  X, CheckCircle, AlertCircle, BarChart2, FileText, Globe,
} from 'lucide-react';
import {
  BlogPost, getAdminPostsFromDB, savePostToDB, updatePostInDB, deletePostFromDB, generateSlug,
} from '../utils/blogStorage';

// ── Password ────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'AppnaCv@2025';

// ── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
}

const CATEGORIES = ['CV Writing', 'Career Tips', 'Job Search', 'LinkedIn', 'Remote Work', 'Career Growth', 'Interview Tips', 'Salary'];

// ── Empty form state ─────────────────────────────────────────────────────────
const EMPTY: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'> = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  category: 'Career Tips',
  metaDescription: '',
  keywords: '',
  featuredImage: '',
  author: 'AppnaCv Team',
  published: false,
};

// ── Sub-components ───────────────────────────────────────────────────────────

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-sm font-semibold text-white ${type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
      {type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      {message}
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}18` }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div>
        <p className="text-2xl font-black text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
      </div>
    </div>
  );
}

// ── Article Editor Modal ─────────────────────────────────────────────────────
function ArticleEditor({
  initial,
  onSave,
  onClose,
}: {
  initial?: BlogPost;
  onSave: (msg: string) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>>(
    initial
      ? { slug: initial.slug, title: initial.title, excerpt: initial.excerpt, content: initial.content, category: initial.category, metaDescription: initial.metaDescription, keywords: initial.keywords, featuredImage: initial.featuredImage, author: initial.author, published: initial.published }
      : EMPTY,
  );
  const [tab, setTab] = useState<'content' | 'seo'>('content');
  const [autoSlug, setAutoSlug] = useState(!initial);

  function set(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleTitleChange(v: string) {
    set('title', v);
    if (autoSlug) set('slug', generateSlug(v));
  }

  async function handleSubmit() {
    if (!form.title.trim()) return alert('Title is required.');
    if (!form.content.trim()) return alert('Content is required.');
    if (!form.excerpt.trim()) return alert('Excerpt is required.');
    if (!form.metaDescription.trim()) return alert('Meta description is required for SEO.');
    if (initial) {
      await updatePostInDB(initial.id, form);
      onSave('Article updated successfully!');
    } else {
      await savePostToDB(form);
      onSave('Article published successfully!');
    }
    onClose();
  }

  const seoScore = [
    form.metaDescription.length >= 120 && form.metaDescription.length <= 160,
    form.keywords.split(',').filter(Boolean).length >= 3,
    form.title.length >= 30 && form.title.length <= 70,
    form.content.length >= 500,
    form.excerpt.length >= 80,
  ].filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-6 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{initial ? 'Edit Article' : 'Write New Article'}</h2>
          <div className="flex items-center gap-3">
            {/* SEO Score */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${seoScore >= 4 ? 'bg-emerald-50 text-emerald-700' : seoScore >= 2 ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-600'}`}>
              <BarChart2 size={12} />
              SEO: {seoScore}/5
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {(['content', 'seo'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 text-sm font-semibold capitalize transition-all ${tab === t ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {t === 'seo' ? 'SEO & Meta' : 'Content'}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-5">
          {tab === 'content' ? (
            <>
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Article Title <span className="text-gray-400 font-normal normal-case">({form.title.length}/70 chars)</span>
                </label>
                <input
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. How to Write a CV That Gets Interviews in Pakistan"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">URL Slug</label>
                <div className="flex gap-2">
                  <span className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg text-xs text-gray-400">/blog/</span>
                  <input
                    value={form.slug}
                    onChange={(e) => { setAutoSlug(false); set('slug', e.target.value); }}
                    placeholder="article-url-slug"
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-r-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {/* Category + Author */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => set('category', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Author</label>
                  <input
                    value={form.author}
                    onChange={(e) => set('author', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Excerpt / Summary <span className="text-gray-400 font-normal normal-case">(shown on blog listing)</span>
                </label>
                <textarea
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => set('excerpt', e.target.value)}
                  placeholder="Write a 1–2 sentence summary of the article..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                />
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Featured Image URL <span className="text-gray-400 font-normal normal-case">(optional)</span></label>
                <input
                  value={form.featuredImage}
                  onChange={(e) => set('featuredImage', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Article Content <span className="text-gray-400 font-normal normal-case">— use &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt; tags — ({form.content.length} chars)</span>
                </label>
                <textarea
                  rows={14}
                  value={form.content}
                  onChange={(e) => set('content', e.target.value)}
                  placeholder={`<h2>Introduction</h2>\n<p>Your article content here...</p>\n\n<h2>Section Title</h2>\n<p>More content...</p>`}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y font-mono"
                />
                <p className="text-xs text-gray-400 mt-1.5">Tip: Minimum 500 characters recommended for AdSense approval. Use HTML tags for formatting.</p>
              </div>
            </>
          ) : (
            /* SEO Tab */
            <>
              <div className={`flex items-start gap-3 p-4 rounded-xl border ${seoScore >= 4 ? 'bg-emerald-50 border-emerald-200' : 'bg-yellow-50 border-yellow-200'}`}>
                <BarChart2 size={18} className={seoScore >= 4 ? 'text-emerald-600' : 'text-yellow-600'} />
                <div>
                  <p className="text-sm font-bold text-gray-800">SEO Score: {seoScore}/5</p>
                  <ul className="text-xs text-gray-600 mt-1 space-y-0.5">
                    <li className={form.title.length >= 30 && form.title.length <= 70 ? 'text-emerald-700' : 'text-red-600'}>
                      {form.title.length >= 30 && form.title.length <= 70 ? '✓' : '✗'} Title: 30–70 characters ({form.title.length})
                    </li>
                    <li className={form.metaDescription.length >= 120 && form.metaDescription.length <= 160 ? 'text-emerald-700' : 'text-red-600'}>
                      {form.metaDescription.length >= 120 && form.metaDescription.length <= 160 ? '✓' : '✗'} Meta description: 120–160 chars ({form.metaDescription.length})
                    </li>
                    <li className={form.keywords.split(',').filter(Boolean).length >= 3 ? 'text-emerald-700' : 'text-red-600'}>
                      {form.keywords.split(',').filter(Boolean).length >= 3 ? '✓' : '✗'} Keywords: at least 3 ({form.keywords.split(',').filter(Boolean).length})
                    </li>
                    <li className={form.content.length >= 500 ? 'text-emerald-700' : 'text-red-600'}>
                      {form.content.length >= 500 ? '✓' : '✗'} Content: min 500 chars ({form.content.length})
                    </li>
                    <li className={form.excerpt.length >= 80 ? 'text-emerald-700' : 'text-red-600'}>
                      {form.excerpt.length >= 80 ? '✓' : '✗'} Excerpt: min 80 chars ({form.excerpt.length})
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Meta Description <span className="text-gray-400 font-normal normal-case">(120–160 chars for best SEO)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.metaDescription}
                  onChange={(e) => set('metaDescription', e.target.value)}
                  placeholder="Write a compelling description that appears in Google search results..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Appears in Google search results under your page title</span>
                  <span className={form.metaDescription.length > 160 ? 'text-red-500' : ''}>{form.metaDescription.length}/160</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Keywords <span className="text-gray-400 font-normal normal-case">(comma-separated, min 3)</span></label>
                <input
                  value={form.keywords}
                  onChange={(e) => set('keywords', e.target.value)}
                  placeholder="CV builder Pakistan, free CV maker, ATS resume Pakistan"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <p className="text-xs text-gray-400 mt-1">Use keywords your target audience searches for on Google</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Google Search Preview</label>
                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                  <p className="text-blue-700 text-sm font-medium truncate">{form.title || 'Article Title'}</p>
                  <p className="text-emerald-700 text-xs mt-0.5">apnnacv.vercel.app/blog/{form.slug || 'article-slug'}</p>
                  <p className="text-gray-600 text-xs mt-1 line-clamp-2">{form.metaDescription || 'Meta description will appear here...'}</p>
                </div>
              </div>
            </>
          )}

          {/* Publish toggle + Save */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div
                onClick={() => set('published', !form.published)}
                className={`w-10 h-5 rounded-full transition-colors relative ${form.published ? 'bg-emerald-500' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${form.published ? 'left-5' : 'left-0.5'}`} />
              </div>
              <span className="text-sm font-semibold text-gray-700">{form.published ? 'Published' : 'Draft'}</span>
            </label>

            <div className="flex gap-3">
              <button onClick={onClose} className="px-5 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2 rounded-lg text-white text-sm font-bold shadow-sm hover:shadow-md transition-all"
                style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
              >
                <Save size={14} />
                {initial ? 'Update Article' : 'Save Article'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Admin Page ──────────────────────────────────────────────────────────
export function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editorPost, setEditorPost] = useState<BlogPost | undefined>(undefined);
  const [editorOpen, setEditorOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  function load() { getAdminPostsFromDB().then(setPosts); }

  useEffect(() => {
    if (authed) load();
  }, [authed]);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false); }
    else { setPwError(true); setPw(''); }
  }

  function openNew() { setEditorPost(undefined); setEditorOpen(true); }
  function openEdit(post: BlogPost) { setEditorPost(post); setEditorOpen(true); }
  function handleDelete(id: string) {
    if (!window.confirm('Delete this article? This cannot be undone.')) return;
    deletePostFromDB(id).then(() => { load(); setToast({ message: 'Article deleted.', type: 'success' }); });
  }
  function handleTogglePublish(post: BlogPost) {
    updatePostInDB(post.id, { published: !post.published }).then(() => { load(); setToast({ message: post.published ? 'Article set to draft.' : 'Article published!', type: 'success' }); });
  }

  // ── Login Screen ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-sm">
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}>
              <Lock size={24} className="text-white" />
            </div>
          </div>
          <h1 className="text-xl font-extrabold text-gray-900 text-center mb-1">Admin Panel</h1>
          <p className="text-sm text-gray-400 text-center mb-6">AppnaCv Blog Management</p>

          <form onSubmit={login} className="space-y-4">
            <div>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Enter admin password"
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${pwError ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                autoFocus
              />
              {pwError && <p className="text-xs text-red-500 mt-1.5 font-medium">Incorrect password. Try again.</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
            >
              Login to Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  const published = posts.filter((p) => p.published).length;
  const drafts = posts.filter((p) => !p.published).length;

  // ── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Blog Admin</h1>
          <p className="text-xs text-gray-400">AppnaCv Content Management</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/blog"
            target="_blank"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <Globe size={14} /> View Blog
          </a>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-white text-sm font-bold shadow-sm hover:shadow-md transition-all"
            style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
          >
            <Plus size={15} /> New Article
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-8">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard icon={<FileText size={20} />} label="Total Articles" value={posts.length} color="#3B82F6" />
          <StatCard icon={<Eye size={20} />} label="Published" value={published} color="#10B981" />
          <StatCard icon={<EyeOff size={20} />} label="Drafts" value={drafts} color="#F59E0B" />
        </div>

        {/* Articles Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-800">Your Articles</h2>
            <p className="text-xs text-gray-400">Default sample articles are not shown here — only articles you write</p>
          </div>

          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <FileText size={40} className="text-gray-200 mb-4" />
              <p className="text-gray-500 font-semibold">No articles yet</p>
              <p className="text-sm text-gray-400 mb-6">Click "New Article" to write your first blog post.</p>
              <button
                onClick={openNew}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold"
                style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
              >
                <Plus size={14} /> Write First Article
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${post.published ? 'bg-emerald-500' : 'bg-yellow-400'}`} />
                      <p className="text-sm font-semibold text-gray-900 truncate">{post.title}</p>
                    </div>
                    <p className="text-xs text-gray-400">{post.category} · {formatDate(post.updatedAt)} · /blog/{post.slug}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleTogglePublish(post)}
                      title={post.published ? 'Set to draft' : 'Publish'}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${post.published ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'}`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </button>
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
                      title="Preview"
                    >
                      <Eye size={15} />
                    </a>
                    <button
                      onClick={() => openEdit(post)}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
                      title="Edit"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SEO tips */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-blue-800 mb-2">AdSense Approval Tips</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>✓ Write at least <strong>5–10 original articles</strong> before applying for AdSense</li>
            <li>✓ Each article should be <strong>minimum 500 words</strong> (ideally 800–1200 words)</li>
            <li>✓ Use a <strong>5/5 SEO score</strong> for every article (check the SEO tab in the editor)</li>
            <li>✓ Post consistently — at least <strong>2 new articles per week</strong></li>
            <li>✓ Focus on <strong>original content</strong> — no copy-paste from other sites</li>
          </ul>
        </div>

      </div>

      {/* Article Editor Modal */}
      {editorOpen && (
        <ArticleEditor
          initial={editorPost}
          onSave={(msg) => { load(); setToast({ message: msg, type: 'success' }); }}
          onClose={() => setEditorOpen(false)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
