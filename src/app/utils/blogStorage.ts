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

  // ── SEO-Optimized Posts for High-Traffic Pakistani Keywords ──
  {
    id: 'default-4',
    slug: 'pak-army-jobs-2026-apply-online-guide',
    title: 'Pak Army Jobs 2026: Apply Online Kaise Karein — Complete Guide',
    excerpt: 'Pakistan Army mein job chahiye? 2026 ki latest vacancies, eligibility criteria, online apply process aur CV tips — sab ek jagah. Commissioned & non-commissioned dono ke liye.',
    content: `<h2>Pakistan Army Jobs 2026 Kyun Best Hain?</h2>
<p>Pakistan Army Pakistan ka sabse bara aur izzat wala employer hai. Har saal lakhon nojawan Pak Army mein commission ke liye apply karte hain. 2026 mein army mein bharti ke naye opportunities aaye hain — lekin competition bhi zyada hai. Iss guide mein aap poora apply process, eligibility, documents aur CV tips seekhenge.</p>

<h2>Kaunsi Posts Available Hain?</h2>
<ul>
<li><strong>Commissioned Officers:</strong> PMA Long Course, Technical Cadet Course, Lady Cadet Course — graduation walon ke liye</li>
<li><strong>Soldiers:</strong> Matric / Intermediate walon ke liye direct recruitment</li>
<li><strong>Civilian Jobs:</strong> Clerk, Driver, Cook, IT Staff, Medical Staff</li>
<li><strong>Specialists:</strong> Doctors, Engineers, Psychologists, Religious Teachers</li>
</ul>

<h2>Eligibility Criteria 2026</h2>
<p><strong>Age Limit:</strong> 16 se 23 saal (post ke hisab se vary karti hai).</p>
<p><strong>Education:</strong> Matric minimum, lekin officer posts ke liye graduation zaroori hai.</p>
<p><strong>Physical Standards:</strong> Height minimum 5 feet 4 inches (males), 5 feet 2 inches (females). Chest: 33-34 inches. Weight height ke hisab se balanced.</p>
<p><strong>Nationality:</strong> Sirf Pakistani citizens (dual nationality walon ka case-by-case dekha jata hai).</p>

<h2>Online Apply Karne Ka Step-by-Step Tareeqa</h2>
<ol>
<li><strong>Official Website:</strong> <strong>joinpakarmy.gov.pk</strong> par jayein — yeh hi official portal hai. Kisi fake website se apply na karein.</li>
<li><strong>Registration:</strong> CNIC, email, aur phone number dein aur account banayein.</li>
<li><strong>Post Select Karein:</strong> Apni qualification ke hisab se post choose karein.</li>
<li><strong>Form Fill Karein:</strong> Personal info, educational details, family background, medical history — sab carefully fill karein.</li>
<li><strong>Documents Upload:</strong> CNIC, Matric/Inter/Degree certificates, passport-size photo, domicile.</li>
<li><strong>Test Center Choose Karein:</strong> Apne nazdeek testing center select karein.</li>
<li><strong>Confirmation Print Karein:</strong> Application ka printout lena na bhoolein.</li>
</ol>

<h2>Selection Process</h2>
<p>Selection process mein 4 stages hain:</p>
<ul>
<li><strong>Stage 1 — Preliminary Test:</strong> Written test (Intelligence + Academic)</li>
<li><strong>Stage 2 — Physical Test:</strong> Running (1.6 km in 8 min), push-ups, sit-ups, pull-ups</li>
<li><strong>Stage 3 — Medical Test:</strong> Full medical examination by army doctors</li>
<li><strong>Stage 4 — ISSB (Officers only):</strong> 4-day mental, psychological aur GTO tests in Kohat/Gujranwala/Malir/Quetta</li>
</ul>

<h2>CV aur Documents Tayyar Kaise Karein?</h2>
<p>Pak Army ke civilian jobs aur technical posts ke liye ek strong CV zaroori hai. AppnaCv par aap free mein professional, ATS-friendly CV bana sakte hain — sirf 3 minute mein. Apne educational qualifications, any relevant training (like NCC), aur physical fitness achievements ko highlight karein.</p>

<h2>Army Test Ki Tayyari Kaise Karein?</h2>
<ul>
<li>Intelligence test ke liye <strong>Dogar Brothers</strong> ya <strong>Caravan</strong> ki books use karein</li>
<li>English proficiency: Grammar, vocabulary, comprehension par focus</li>
<li>Physical fitness: Roz subha 2 km running ki practice karein</li>
<li>Current affairs aur Pakistan Studies parhein</li>
<li>ISSB ke liye GTO exercises ki video tutorials dekhen YouTube par</li>
</ul>

<h2>Common Rejection Reasons</h2>
<p>Har saal hazaron log reject hote hain. Aap yeh mistakes avoid karein:</p>
<ul>
<li>Medical issues (weak eyesight, flat feet, crooked teeth)</li>
<li>Overweight ya underweight</li>
<li>Incomplete documents</li>
<li>Wrong information in form (intentional ya unintentional)</li>
<li>ISSB mein under-confidence ya over-confidence</li>
</ul>

<h2>Final Tips</h2>
<p>Pak Army mein selection sirf qualification par nahi — aap ki personality, physical fitness, aur mental strength par bhi depend karta hai. Agar aap seriously apply karna chahte hain, toh 2-3 mahine pehle se tayyari shuru karein. Aur haan — sirf <strong>joinpakarmy.gov.pk</strong> par apply karein, baaki sab fake hain!</p>

<h2>FAQ: Pak Army Jobs 2026</h2>
<p><strong>Q: Pak Army mein apply karne ki fee kitni hai?</strong><br>A: Most posts ke liye Rs. 200-500 test fee hoti hai, bank draft ya online payment se.</p>
<p><strong>Q: Kya females Pak Army mein apply kar sakti hain?</strong><br>A: Bilkul! Lady Cadet Course aur female doctors/engineers ke liye regular vacancies hoti hain.</p>
<p><strong>Q: Test mein fail hone ke baad dubara apply kar sakte hain?</strong><br>A: Haan, 2-3 attempts allowed hain, age limit ke andar.</p>`,
    category: 'Job Search',
    metaDescription: 'Pak Army Jobs 2026 apply online guide. Eligibility, test preparation, ISSB tips aur CV format — Pakistani students ke liye complete roadmap.',
    keywords: 'pak army jobs 2026, join pakistan army, army apply online, PMA long course, ISSB preparation, army jobs Pakistan, soldier recruitment Pakistan',
    featuredImage: '',
    author: 'AppnaCv Team',
    published: true,
    createdAt: '2026-04-15T00:00:00.000Z',
    updatedAt: '2026-04-15T00:00:00.000Z',
  },

  {
    id: 'default-5',
    slug: 'fiverr-pakistan-account-kaise-banayein-pehla-order',
    title: 'Fiverr Pakistan: Account Kaise Banayein aur Pehla Order Lene Ka Asan Tareeqa 2026',
    excerpt: 'Fiverr par Pakistan se account banana hai? Yeh complete guide aap ko zero se pehla order tak le jaayegi — gig optimization, profile setup, buyer attract karna, sab kuch.',
    content: `<h2>Fiverr Kya Hai aur Pakistan Mein Kyun Popular Hai?</h2>
<p>Fiverr duniya ka sabse bara freelancing marketplace hai — jahan aap apni services (jise "gigs" kehte hain) bech ke dollars mein kamai kar sakte hain. Pakistan mein freelancers har mahine Fiverr se crores rupees kamate hain. Sabse achi baat? Aap ghar baithe, part-time bhi kar sakte hain — bus laptop aur internet chahiye.</p>

<h2>Fiverr Par Account Banane Se Pehle Tayyari</h2>
<ul>
<li><strong>Ek skill master karein:</strong> Graphic design, logo design, video editing, content writing, SEO, voice over, translation — koi bhi</li>
<li><strong>Portfolio tayyar karein:</strong> 3-5 sample works zaroor ready rakhein</li>
<li><strong>Professional email:</strong> yourname@gmail.com (coolguy123 wala nahi)</li>
<li><strong>Good profile picture:</strong> Clear, professional headshot</li>
<li><strong>Stable internet + payment method:</strong> Payoneer account banayein (Pakistan mein sabse reliable)</li>
</ul>

<h2>Step-by-Step: Fiverr Account Banayein</h2>
<ol>
<li><strong>Fiverr.com par jayein</strong> — VPN ki zaroorat nahi, Pakistan se normally access hota hai</li>
<li><strong>"Join" click karein</strong> — email se ya Google account se signup</li>
<li><strong>Username choose karein</strong> — yaad rakhein, yeh permanent hota hai. Professional rakhein jaise "proDesignerAli"</li>
<li><strong>Email verify karein</strong> — inbox check karein, confirmation link par click karein</li>
<li><strong>"Become a Seller" par jayein</strong> — top right corner mein</li>
<li><strong>Personal Info fill karein</strong> — naam, picture, description (150+ words), languages</li>
<li><strong>Professional Info:</strong> Education, certifications, experience, skills add karein</li>
<li><strong>Account Security:</strong> Phone verify karein, 2FA enable karein</li>
</ol>

<h2>Profile Description Kaise Likhein? (Copy-Paste Template)</h2>
<blockquote>
"Hi! I'm [Your Name], a professional [Your Service] specialist based in Pakistan with [X] years of experience. I've helped 100+ clients with [Specific Services]. My focus is on delivering high-quality work within deadlines, with unlimited revisions until you're 100% satisfied. I'm available 18 hours a day and reply within 1 hour. Let's make your project a success!"
</blockquote>

<h2>Pehla Gig Kaise Create Karein?</h2>
<p>Gig aap ki service ka ad hai. Strong gig = zyada orders. Yeh elements zaroori hain:</p>

<h3>1. Gig Title</h3>
<p>Format: "I will [action] [specific service] for [target audience]"<br>
<strong>Example:</strong> "I will design a modern minimalist logo for your startup"</p>

<h3>2. Category & Tags</h3>
<p>Right category choose karein, aur 5 relevant tags lagayein (buyers search keywords).</p>

<h3>3. Pricing Packages (Basic / Standard / Premium)</h3>
<ul>
<li><strong>Basic:</strong> $5-$10 (entry point)</li>
<li><strong>Standard:</strong> $25-$50 (most popular)</li>
<li><strong>Premium:</strong> $75-$150 (complete package)</li>
</ul>

<h3>4. Gig Description</h3>
<p>500+ words likhein, bullet points use karein, "Why choose me" section add karein.</p>

<h3>5. Gig Images / Video</h3>
<p>Canva par professional gig image banayein (1280x769 pixels). Video gigs 220% zyada sales karte hain!</p>

<h3>6. FAQ Section</h3>
<p>Common questions anticipate karke answers likhein.</p>

<h2>Pehla Order Kaise Milta Hai? (Real Tactics)</h2>
<p>Fiverr par pehla order lena sabse mushkil hai. Yeh proven tactics use karein:</p>
<ul>
<li><strong>Buyer Requests:</strong> Roz 10+ requests bhejein (quality proposal, copy-paste nahi)</li>
<li><strong>Gig SEO:</strong> Title aur description mein keywords bharpur use karein</li>
<li><strong>Competitive pricing:</strong> Start mein $5 se shuru karein, ratings milne ke baad barhayein</li>
<li><strong>24/7 availability:</strong> Fiverr app download karein, notifications on rakhein</li>
<li><strong>Quick response time:</strong> 1 hour ke andar reply karein (Fiverr ranks fast responders higher)</li>
<li><strong>Multiple gigs create karein:</strong> 5-7 gigs = 5-7x chances</li>
</ul>

<h2>Payoneer Account Banayein</h2>
<p>Fiverr se earnings withdraw karne ke liye Payoneer account zaroori hai. Steps:</p>
<ol>
<li>payoneer.com par signup karein</li>
<li>Pakistani CNIC aur bank account details dein</li>
<li>Verification 2-3 days mein complete hoti hai</li>
<li>Fiverr settings mein Payoneer connect karein</li>
<li>Minimum $5 withdraw kar sakte hain</li>
</ol>

<h2>Common Mistakes to Avoid</h2>
<ul>
<li>VPN use karna (Fiverr account ban kar deta hai)</li>
<li>Multiple accounts banana</li>
<li>Fake reviews khareedna</li>
<li>Buyers ko email/WhatsApp par contact karne ki koshish</li>
<li>Negative response time (>24 hours)</li>
</ul>

<h2>Kitna Kamaya Ja Sakta Hai?</h2>
<p>Pakistani Fiverr freelancers average monthly earnings:</p>
<ul>
<li><strong>Beginners (0-3 months):</strong> $50-$200</li>
<li><strong>Intermediate (3-12 months):</strong> $500-$1500</li>
<li><strong>Top Sellers:</strong> $3000-$10000+</li>
</ul>

<h2>Fiverr Profile Ke Liye CV Kyun Zaroori Hai?</h2>
<p>Buyers professional sellers ko prefer karte hain. AppnaCv se ek professional CV banayein aur apni Fiverr profile mein "About" section mein us ka link dein ya download offer karein. Isse clients ko aap par trust bharosa zyada hota hai — especially bigger projects ke liye.</p>

<p><strong>Final Word:</strong> Fiverr ek long-term game hai. Pehla month struggle hoga, lekin consistency zaroori hai. Roz 2-3 hours lagayein, 6 mahine baad stable income start ho jayegi.</p>`,
    category: 'Remote Work',
    metaDescription: 'Fiverr Pakistan par account kaise banayein, pehla order lene ka complete guide 2026. Gig optimization, Payoneer setup, profile tips — sab ek jagah.',
    keywords: 'fiverr pakistan, freelancing pakistan, fiverr account kaise banaye, online earning pakistan, fiverr pehla order, payoneer pakistan, freelancer guide 2026',
    featuredImage: '',
    author: 'AppnaCv Team',
    published: true,
    createdAt: '2026-04-15T00:00:00.000Z',
    updatedAt: '2026-04-15T00:00:00.000Z',
  },

  {
    id: 'default-6',
    slug: 'cv-format-urdu-pakistan-best-resume-template-2026',
    title: 'CV Format in Urdu: Pakistan Ke Liye Best Resume Template 2026',
    excerpt: 'Pakistan ke liye professional CV format chahiye? Urdu + English dono mein examples, ATS-friendly templates, aur free download. Fresher, experienced sab ke liye.',
    content: `<h2>Pakistan Mein CV Format Kaisa Hona Chahiye?</h2>
<p>Pakistan mein jobs apply karne ke liye CV ka format international standards se thoda different hota hai. Yahan recruiters ko <strong>personal details</strong>, <strong>family info</strong> (kuch jobs ke liye), aur <strong>local references</strong> dekhne ki aadat hai. Lekin 2026 mein modern companies ATS-friendly, English-only CVs prefer karti hain. Yeh guide aap ko dono styles sikhayega.</p>

<h2>CV Kya Hota Hai? (Curriculum Vitae ka Matlab)</h2>
<p>CV yani <strong>Curriculum Vitae</strong> — Latin word hai jiska matlab hai "Course of Life". Yeh aap ki zindagi ka professional summary hai — education, experience, skills, achievements sab. Pakistan mein "CV" aur "Resume" dono words interchangeably use hote hain, lekin technically:</p>
<ul>
<li><strong>CV:</strong> Detailed (2-4 pages), academia aur government jobs ke liye</li>
<li><strong>Resume:</strong> Short (1-2 pages), corporate/private jobs ke liye</li>
</ul>

<h2>Standard Pakistani CV Format Mein Kya Hota Hai?</h2>

<h3>1. Personal Information</h3>
<ul>
<li>Full Name (as per CNIC)</li>
<li>Father's Name</li>
<li>CNIC Number</li>
<li>Date of Birth</li>
<li>Address (Current + Permanent)</li>
<li>Phone Number (mobile)</li>
<li>Email Address (professional)</li>
<li>Marital Status (optional for private jobs, required for government)</li>
<li>Religion (sirf government forms mein)</li>
</ul>

<h3>2. Professional Summary (3-4 sentences)</h3>
<p>Example: "Results-driven marketing graduate with 2 years of internship experience at local FMCG companies. Skilled in digital marketing, SEO, and social media management. Seeking a full-time role to apply proven track record of increasing online engagement by 150%."</p>

<h3>3. Education</h3>
<p>Reverse chronological order (latest first). Include:</p>
<ul>
<li>Degree name</li>
<li>Institute name</li>
<li>Year of passing</li>
<li>Grade/GPA/Percentage</li>
<li>Major subjects (for relevant degrees)</li>
</ul>

<h3>4. Work Experience</h3>
<p>Format: Job Title | Company Name | Duration<br>
Phir 3-4 bullet points mein achievements (numbers ke saath):</p>
<ul>
<li>"Increased monthly sales by 35% through targeted WhatsApp marketing campaigns"</li>
<li>"Managed customer service for 200+ daily queries with 4.8/5 satisfaction rating"</li>
</ul>

<h3>5. Skills</h3>
<ul>
<li><strong>Technical Skills:</strong> MS Office, Photoshop, Excel, AutoCAD, etc.</li>
<li><strong>Soft Skills:</strong> Leadership, communication, time management</li>
<li><strong>Languages:</strong> Urdu (Native), English (Fluent), Arabic (Basic)</li>
</ul>

<h3>6. Certifications / Courses</h3>
<p>Example: Google Digital Marketing Certificate, Coursera Specializations, Meta Blueprint, Microsoft Excel Advanced, etc.</p>

<h3>7. Achievements / Awards</h3>
<p>Academic honors, scholarships, competition wins, sports representations.</p>

<h3>8. References (Optional)</h3>
<p>Pakistan mein references dena common hai. Format:<br>
Name | Designation | Company | Phone | Relationship</p>

<h2>CV Format Sample (Government Job)</h2>
<pre>
MUHAMMAD AHMAD KHAN
S/O: Abdul Rehman Khan
CNIC: 35202-1234567-8
DOB: 15-March-1998 | Age: 27 years
Address: House #45, Street 12, Model Town, Lahore
Phone: +92-300-1234567 | Email: ahmad.khan@gmail.com
Marital Status: Single | Religion: Islam

OBJECTIVE:
Seeking a challenging position in [Department] where I can...

EDUCATION:
- MBA (Marketing), University of Punjab, 2023, 3.6/4.0 CGPA
- BBA (Hons), GC University Lahore, 2021, 3.4/4.0 CGPA
- HSSC (Pre-Engineering), Govt College Lahore, 2018, 82%
- Matric (Science), Divisional Public School, 2016, 87%
</pre>

<h2>Modern Corporate CV Format (Private Jobs)</h2>
<p>Private sector mein international-style CV prefer hota hai:</p>
<ul>
<li>English mein likhein</li>
<li>Personal info minimum rakhein (koi CNIC, religion, marital status nahi)</li>
<li>Achievements-focused (duties nahi)</li>
<li>1-2 pages maximum</li>
<li>Professional summary upar</li>
<li>Clean design, ATS-friendly</li>
</ul>

<h2>CV Likhte Waqt Common Mistakes</h2>
<ul>
<li>Photograph lagana (sirf modeling / teaching / customer-facing jobs ke liye)</li>
<li>Spelling aur grammar mistakes</li>
<li>Duties likhna achievements ke bajaye</li>
<li>Irrelevant hobbies mention karna ("watching cricket")</li>
<li>3-4 pages ka CV (1-2 kafi hai)</li>
<li>Generic objective statement</li>
<li>Non-professional email (coolboy_99@yahoo.com)</li>
</ul>

<h2>Urdu Mein CV Format (Special Cases)</h2>
<p>Kuch jobs — jaise local NGO, Urdu teacher, religious institutes — ke liye Urdu CV mangte hain. Format same hota hai lekin:</p>
<ul>
<li>Urdu font: Jameel Noori Nastaleeq ya Alvi Nastaleeq</li>
<li>Right-to-left alignment</li>
<li>Names English mein bhi likhein (parentheses mein)</li>
<li>Qualification names translate karein: "Bachelors" ko "بیچلرز"</li>
</ul>

<h2>AppnaCv: Pakistan Ka Sabse Asaan CV Maker</h2>
<p>Agar aap manual CV banane se bachna chahte hain, toh <strong>AppnaCv</strong> Pakistan ka #1 free CV builder hai. Features:</p>
<ul>
<li>3 ATS-friendly templates (Minimalist, Executive, Modern)</li>
<li>Real-time preview — likhte hi CV update hota hai</li>
<li>One-click PDF download</li>
<li>100% free — no hidden fees</li>
<li>No signup required</li>
<li>Pakistan-specific fields (CNIC optional)</li>
</ul>

<h2>CV Submit Karne Se Pehle Checklist</h2>
<ul>
<li>✅ 1-2 pages hai</li>
<li>✅ Koi typo nahi (Grammarly se check kar liya)</li>
<li>✅ Professional email hai</li>
<li>✅ Latest date / details updated hain</li>
<li>✅ PDF format mein hai (Word nahi, unless requested)</li>
<li>✅ File name proper hai: "MuhammadAhmad_MarketingCV.pdf"</li>
<li>✅ Job description ke keywords include kiye hain</li>
<li>✅ ATS-friendly design (no tables, no columns)</li>
</ul>

<h2>FAQ</h2>
<p><strong>Q: Kya Pakistan mein CV par photo lagana zaroori hai?</strong><br>A: Nahi. Modern corporate jobs ke liye photo preferred nahi hai. Sirf government forms jahan specifically mangein.</p>

<p><strong>Q: CV aur resume mein farq?</strong><br>A: CV detailed aur long hota hai. Resume short (1-2 pages) hota hai. Pakistan mein dono same samjhe jate hain.</p>

<p><strong>Q: Fresh graduate ka CV kitna lamba hona chahiye?</strong><br>A: 1 page. Agar 2 pages jana zaroori hai toh work/project experience strong hona chahiye.</p>

<p><strong>Q: CV mein kitni skills mention karun?</strong><br>A: 8-12 most relevant skills. Job description ke keywords match karein.</p>

<h2>Abhi Apna CV Banayein</h2>
<p>CV writing time-consuming hoti hai — lekin nahi honi chahiye. <strong>AppnaCv</strong> par sirf 3 minute mein aap ek professional, ATS-friendly CV bana sakte hain. Free hai, forever.</p>`,
    category: 'CV Writing',
    metaDescription: 'Pakistan ke liye CV format 2026 — Urdu + English templates, sample CV, common mistakes aur ATS-friendly tips. Fresher aur experienced dono ke liye.',
    keywords: 'cv format pakistan, cv format in urdu, resume format pakistan, cv kaise banayein, pakistani cv template, ats friendly cv pakistan, government job cv format',
    featuredImage: '',
    author: 'AppnaCv Team',
    published: true,
    createdAt: '2026-04-15T00:00:00.000Z',
    updatedAt: '2026-04-15T00:00:00.000Z',
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
