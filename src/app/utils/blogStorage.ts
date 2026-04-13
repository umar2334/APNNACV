/**
 * blogStorage — Firestore-backed CRUD for blog articles.
 * Articles are stored in Firebase Firestore — visible on ALL devices.
 */

import {
  collection, doc, getDocs, addDoc, updateDoc,
  deleteDoc, query, orderBy, Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  metaDescription: string;
  keywords: string;
  featuredImage: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const COLLECTION = 'blogPosts';

// ── Default seed articles (shown when Firestore has no posts) ────────────────
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
<li><strong>Use standard headings</strong> — "Work Experience", "Education", "Skills".</li>
<li><strong>Avoid tables and columns</strong> — many ATS systems cannot parse them correctly.</li>
<li><strong>Use keywords from the job description</strong> — match the exact wording the employer uses.</li>
<li><strong>Submit as PDF</strong> — universally safe with modern ATS systems.</li>
<li><strong>No graphics or icons</strong> — images are invisible to ATS scanners.</li>
</ul>
<h2>Keyword Strategy</h2>
<p>Read the job description carefully and list every skill and qualification mentioned. Include these exact phrases in your CV — especially in your Summary and Skills sections.</p>
<h2>Formatting Tips</h2>
<p>Use a clean, single-column layout for maximum ATS compatibility. Bullet points are safe. Stick to standard fonts like Arial, Calibri, or Georgia. Keep font size between 10–12pt for body text.</p>
<h2>Test Your CV</h2>
<p>Before applying, paste your CV text into a plain text editor. If it reads clearly with proper structure, it will likely pass most ATS systems. Use AppnaCv's Minimalist template — it scores 99% on ATS compatibility tests.</p>`,
    category: 'CV Writing',
    metaDescription: 'Learn how to write an ATS-friendly CV in 2025 with keyword strategies, formatting rules, and template tips to get past applicant tracking systems in Pakistan.',
    keywords: 'ATS CV Pakistan, ATS friendly resume, CV writing tips 2025, applicant tracking system Pakistan',
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
<p>A summary at the top of your CV tells recruiters immediately who you are and what you offer. Write 3–4 sentences highlighting your degree, key skills, and career goal.</p>
<h2>Mistake 2: Listing Duties Instead of Achievements</h2>
<p>Don't write "Responsible for customer service." Write "Handled 50+ customer queries daily, maintaining a 4.8/5 satisfaction score." Numbers make your experience real.</p>
<h2>Mistake 3: Using an Unprofessional Email</h2>
<p>coolboy123@gmail.com won't get you hired. Create firstname.lastname@gmail.com before applying.</p>
<h2>Mistake 4: Including Every School Project</h2>
<p>Only include projects directly relevant to the job or that demonstrate exceptional skill. Quality over quantity.</p>
<h2>Mistake 5: Wrong Length</h2>
<p>For a fresh graduate, one page is ideal. Two pages maximum. Recruiters spend an average of 7 seconds on initial review.</p>
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
    keywords: 'fresh graduate CV mistakes, CV tips Pakistan, first job CV, graduate resume mistakes Pakistan',
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
<p>Over 90% of recruiters actively use LinkedIn to find candidates. A strong LinkedIn profile works for you 24/7 — even when you're not actively applying. In Pakistan's growing job market, LinkedIn is now essential.</p>
<h2>Profile Photo</h2>
<p>Use a professional headshot with a clean background. Your face should take up 60% of the frame. Profiles with photos get 21x more views.</p>
<h2>Headline Formula</h2>
<p>Use this formula: <strong>[Title] | [Key Skill] | [Value You Provide]</strong>. Example: "Frontend Developer | React & Next.js | Building Fast, SEO-Optimized Web Apps"</p>
<h2>About Section</h2>
<p>Write in first person. Start with a hook — your biggest achievement or what drives you. Include your top 3 skills, your career goal, and a call to action. Keep it under 2,000 characters.</p>
<h2>Experience Section</h2>
<p>Use bullet points with achievements, not just duties. Start each bullet with an action verb. Add media — project screenshots, certificates — to make your profile stand out.</p>
<h2>Skills Section</h2>
<p>Add at least 10 relevant skills. Ask past colleagues for endorsements. LinkedIn's algorithm boosts profiles with endorsed skills in search results.</p>
<h2>Open to Work</h2>
<p>Turn on the green "Open to Work" frame if you're actively looking. Set your preferences for job titles, locations, and remote options.</p>`,
    category: 'LinkedIn',
    metaDescription: 'Optimize your LinkedIn profile to get noticed by recruiters in Pakistan. Tips for headline, summary, photo, and skills to land more opportunities.',
    keywords: 'LinkedIn profile tips Pakistan, LinkedIn optimization, recruiter tips Pakistan, LinkedIn jobs Pakistan',
    featuredImage: '',
    author: 'AppnaCv Team',
    published: true,
    createdAt: '2025-03-20T00:00:00.000Z',
    updatedAt: '2025-03-20T00:00:00.000Z',
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

// ── Firestore CRUD ────────────────────────────────────────────────────────────

export async function getAllPostsFromDB(): Promise<BlogPost[]> {
  try {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    const firestorePosts = snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));

    // Merge: Firestore posts first, then defaults (only if slug not already present)
    const firestoreSlugs = new Set(firestorePosts.map((p) => p.slug));
    return [...firestorePosts, ...DEFAULT_POSTS.filter((p) => !firestoreSlugs.has(p.slug))];
  } catch (err) {
    console.error('Firestore fetch error:', err);
    return DEFAULT_POSTS;
  }
}

export async function getPublishedPostsFromDB(): Promise<BlogPost[]> {
  const all = await getAllPostsFromDB();
  return all.filter((p) => p.published);
}

export async function getPostBySlugFromDB(slug: string): Promise<BlogPost | undefined> {
  const all = await getAllPostsFromDB();
  return all.find((p) => p.slug === slug);
}

export async function savePostToDB(
  post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<BlogPost> {
  const now = new Date().toISOString();
  const data = { ...post, createdAt: now, updatedAt: now };
  const ref = await addDoc(collection(db, COLLECTION), data);
  return { id: ref.id, ...data };
}

export async function updatePostInDB(
  id: string,
  updates: Partial<BlogPost>,
): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, { ...updates, updatedAt: new Date().toISOString() });
}

export async function deletePostFromDB(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function getAdminPostsFromDB(): Promise<BlogPost[]> {
  try {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
  } catch {
    return [];
  }
}

// ── Keep old exports for backward compat ─────────────────────────────────────
export { DEFAULT_POSTS as defaultPosts };
