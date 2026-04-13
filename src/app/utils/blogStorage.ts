/**
 * blogStorage — localStorage-based CRUD for blog articles.
 * Articles are stored as JSON under the key "appnacv_blog_posts".
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;         // HTML or plain paragraphs
  category: string;
  metaDescription: string; // SEO
  keywords: string;        // SEO — comma-separated
  featuredImage: string;   // URL (optional)
  author: string;
  published: boolean;
  createdAt: string;       // ISO date
  updatedAt: string;
}

const STORAGE_KEY = 'appnacv_blog_posts';

// Default seed articles (shown when no admin posts exist)
export const DEFAULT_POSTS: BlogPost[] = [
  {
    id: 'default-1',
    slug: 'how-to-write-ats-friendly-cv',
    title: 'How to Write an ATS-Friendly CV in 2025',
    excerpt: 'Applicant Tracking Systems reject up to 75% of CVs before a human ever reads them. Learn the exact formatting rules and keyword strategies that get you past the bots.',
    content: `<h2>What is an ATS?</h2>
<p>An Applicant Tracking System (ATS) is software used by employers to filter job applications before a human recruiter reviews them. Up to 75% of CVs are rejected by ATS before any human reads them.</p>

<h2>Key ATS Rules</h2>
<ul>
<li><strong>Use standard headings</strong> — "Work Experience", "Education", "Skills" — not creative names.</li>
<li><strong>Avoid tables and columns</strong> — many ATS systems cannot parse them correctly.</li>
<li><strong>Use keywords from the job description</strong> — match the exact wording the employer uses.</li>
<li><strong>Submit as PDF or Word</strong> — PDF is universally safe with modern ATS systems.</li>
<li><strong>No graphics or icons</strong> — images are invisible to ATS scanners.</li>
</ul>

<h2>Keyword Strategy</h2>
<p>Read the job description carefully and list every skill and qualification mentioned. Include these exact phrases in your CV — especially in your Summary and Skills sections. For example, if the job says "project management" don't write "managing projects".</p>

<h2>Formatting Tips</h2>
<p>Use a clean, single-column layout for maximum ATS compatibility. Bullet points are safe. Stick to standard fonts like Arial, Calibri, or Georgia. Keep font size between 10–12pt for body text.</p>

<h2>Test Your CV</h2>
<p>Before applying, paste your CV text into a plain text editor. If it reads clearly with proper structure, it will likely pass most ATS systems. Use AppnaCv's Minimalist template — it scores 99% on ATS compatibility tests.</p>`,
    category: 'CV Writing',
    metaDescription: 'Learn how to write an ATS-friendly CV in 2025 with keyword strategies, formatting rules, and template tips to get past applicant tracking systems.',
    keywords: 'ATS CV, ATS friendly resume, CV writing tips 2025, applicant tracking system Pakistan',
    featuredImage: '',
    author: 'AppnaCv Team',
    published: true,
    createdAt: '2025-04-10T00:00:00.000Z',
    updatedAt: '2025-04-10T00:00:00.000Z',
  },
  {
    id: 'default-2',
    slug: 'top-cv-mistakes-fresh-graduates',
    title: 'Top 10 CV Mistakes Fresh Graduates Make',
    excerpt: 'From listing every school project to skipping a summary — discover the most common CV mistakes fresh grads make and exactly how to fix each one.',
    content: `<h2>Mistake 1: No Professional Summary</h2>
<p>A summary at the top of your CV tells recruiters immediately who you are and what you offer. Without it, they have to read your entire CV to figure that out — and they won't. Write 3–4 sentences highlighting your degree, key skills, and career goal.</p>

<h2>Mistake 2: Listing Duties Instead of Achievements</h2>
<p>Don't write "Responsible for customer service." Write "Handled 50+ customer queries daily, maintaining a 4.8/5 satisfaction score." Numbers make your experience real.</p>

<h2>Mistake 3: Using an Unprofessional Email</h2>
<p>coolboy123@gmail.com won't get you hired. Create firstname.lastname@gmail.com before applying.</p>

<h2>Mistake 4: Including Every School Project</h2>
<p>Only include projects that are directly relevant to the job you're applying for, or that demonstrate exceptional skill. Quality over quantity.</p>

<h2>Mistake 5: Wrong Length</h2>
<p>For a fresh graduate, one page is ideal. Two pages maximum. Recruiters spend an average of 7 seconds on initial review — keep it tight.</p>

<h2>Mistake 6: No Keywords</h2>
<p>Read the job description and match its language in your CV. If it says "Microsoft Excel", don't just write "spreadsheets".</p>

<h2>Mistake 7: Generic Objective Statement</h2>
<p>"Seeking a challenging position where I can grow" tells the recruiter nothing. Replace with a specific summary targeting the role.</p>

<h2>Mistake 8: Typos and Grammar Errors</h2>
<p>Run your CV through Grammarly before sending. A single typo can cost you an interview.</p>

<h2>Mistake 9: Wrong File Format</h2>
<p>Always send PDF unless the job specifically requests Word. PDF preserves your formatting across all devices.</p>

<h2>Mistake 10: Not Tailoring for Each Job</h2>
<p>The same CV for every application is a losing strategy. Spend 10 minutes adjusting your summary and skills for each role.</p>`,
    category: 'Career Tips',
    metaDescription: 'Avoid the 10 most common CV mistakes fresh graduates make in Pakistan. Practical fixes for each mistake to help you land your first job.',
    keywords: 'fresh graduate CV mistakes, CV tips Pakistan, first job CV, graduate resume mistakes',
    featuredImage: '',
    author: 'AppnaCv Team',
    published: true,
    createdAt: '2025-04-05T00:00:00.000Z',
    updatedAt: '2025-04-05T00:00:00.000Z',
  },
  {
    id: 'default-3',
    slug: 'linkedin-profile-tips-pakistan',
    title: 'LinkedIn Profile Tips That Get You Noticed by Recruiters',
    excerpt: 'Over 90% of recruiters use LinkedIn to find candidates. Optimize your headline, summary, and experience sections to show up in more searches.',
    content: `<h2>Why LinkedIn Matters</h2>
<p>Over 90% of recruiters actively use LinkedIn to find candidates. A strong LinkedIn profile works for you 24/7 — even when you're not actively applying. In Pakistan's growing job market, LinkedIn is now essential for both local and remote opportunities.</p>

<h2>Profile Photo</h2>
<p>Use a professional headshot with a clean background. Your face should take up 60% of the frame. Profiles with photos get 21x more views and 9x more connection requests.</p>

<h2>Headline Formula</h2>
<p>Don't just write your job title. Use this formula: <strong>[Title] | [Key Skill] | [Value You Provide]</strong>. Example: "Frontend Developer | React & Next.js | Building Fast, SEO-Optimized Web Apps"</p>

<h2>About Section (Summary)</h2>
<p>Write in first person. Start with a hook — your biggest achievement or what drives you. Include your top 3 skills, your career goal, and a call to action ("Feel free to connect or message me about opportunities in…"). Keep it under 2,000 characters.</p>

<h2>Experience Section</h2>
<p>Use bullet points with achievements, not just duties. Start each bullet with an action verb. Add media — project screenshots, certificates, presentations — to make your profile stand out.</p>

<h2>Skills Section</h2>
<p>Add at least 10 relevant skills. Ask past colleagues and managers for endorsements. LinkedIn's algorithm boosts profiles with endorsed skills in search results.</p>

<h2>Open to Work</h2>
<p>Turn on the green "Open to Work" frame if you're actively looking. Set your preferences for job titles, locations, and remote options. This signals recruiters directly.</p>`,
    category: 'LinkedIn',
    metaDescription: 'Optimize your LinkedIn profile to get noticed by recruiters in Pakistan. Tips for headline, summary, photo, and skills to land more opportunities.',
    keywords: 'LinkedIn profile tips Pakistan, LinkedIn optimization, recruiter tips Pakistan, LinkedIn jobs',
    featuredImage: '',
    author: 'AppnaCv Team',
    published: true,
    createdAt: '2025-03-20T00:00:00.000Z',
    updatedAt: '2025-03-20T00:00:00.000Z',
  },
];

function generateId(): string {
  return `post_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

export function getAllPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const adminPosts: BlogPost[] = raw ? JSON.parse(raw) : [];
    // Merge: admin posts first, then default posts (only if slug not already present)
    const adminSlugs = new Set(adminPosts.map((p) => p.slug));
    const merged = [...adminPosts, ...DEFAULT_POSTS.filter((p) => !adminSlugs.has(p.slug))];
    return merged;
  } catch {
    return DEFAULT_POSTS;
  }
}

export function getPublishedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.published);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAdminPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost {
  const posts = getAdminPosts();
  const now = new Date().toISOString();
  const newPost: BlogPost = { ...post, id: generateId(), createdAt: now, updatedAt: now };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newPost, ...posts]));
  return newPost;
}

export function updatePost(id: string, updates: Partial<BlogPost>): BlogPost | null {
  const posts = getAdminPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated = { ...posts[idx], ...updates, updatedAt: new Date().toISOString() };
  posts[idx] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return updated;
}

export function deletePost(id: string): void {
  const posts = getAdminPosts().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}
