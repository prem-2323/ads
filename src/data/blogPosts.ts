export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  content: string[];
  relatedToolSlug?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'how-to-calculate-cgpa',
    slug: 'how-to-calculate-cgpa',
    title: 'How to Calculate CGPA: Step-by-Step Guide for College Students',
    excerpt: 'Understand how university credit hours, letter grades, and grade points are calculated to formulate your cumulative academic average.',
    category: 'Academics',
    readTime: '4 min read',
    publishDate: '2026-09-15',
    relatedToolSlug: 'cgpa-calculator',
    content: [
      'Cumulative Grade Point Average (CGPA) represents the overall academic performance of a student across multiple semesters or terms. Unlike a simple arithmetic mean, CGPA uses a weighted average system based on course credits.',
      'Each academic course carries a specific number of credit hours—usually ranging from 1 to 4 depending on lecture hours and laboratory time. Courses with higher credits have a greater impact on your final score.',
      'To compute your CGPA, each letter grade is first converted into a numeric grade point (for example: O = 10, A+ = 9, A = 8). Then, multiply each course credit by its grade point, sum these products across all courses, and divide by the total sum of credits.',
      'Using our free CGPA Calculator, you can compute your SGPA or cumulative CGPA in seconds without manual arithmetic errors.'
    ]
  },
  {
    id: 'how-to-calculate-attendance-percentage',
    slug: 'how-to-calculate-attendance-percentage',
    title: 'How to Calculate Attendance Percentage and Avoid Being Debarred',
    excerpt: 'Learn the exact mathematical formula to keep your lecture attendance safely above 75% or 80% throughout the semester.',
    category: 'College Life',
    readTime: '3 min read',
    publishDate: '2026-09-10',
    relatedToolSlug: 'attendance-calculator',
    content: [
      'Maintaining compliant attendance is one of the most critical responsibilities for college and university students. Falling below institutional attendance benchmarks (often 75% or 80%) can lead to semester debarment or penalty fees.',
      'The foundational formula is simple: (Classes Attended ÷ Classes Conducted) × 100. However, the tricky calculation happens when you need to know how many more lectures you must attend consecutively to recover from an absence.',
      'Whenever you miss a class, your attendance drops more sharply early in the semester when the total conducted denominator is still small. As the term progresses, each single class has a more modest percentage impact.',
      'Our dedicated Attendance Calculator automatically evaluates your current status and tells you the exact number of classes you can afford to miss or must attend to remain compliant.'
    ]
  },
  {
    id: 'what-is-json-overview',
    slug: 'what-is-json-overview',
    title: 'What Is JSON? A Practical Primer for Modern Web Developers',
    excerpt: 'Explore JSON structure, data types, common syntax mistakes like trailing commas, and best practices for formatting API responses.',
    category: 'Development',
    readTime: '5 min read',
    publishDate: '2026-09-02',
    relatedToolSlug: 'json-formatter',
    content: [
      'JavaScript Object Notation (JSON) is the universal language of modern web data interchange. Standardized in RFC 8259, it is language-independent, lightweight, and natively parsable across almost every programming environment.',
      'JSON organizes data into two primary structures: key-value collections (objects delimited by curly braces {}) and ordered lists of values (arrays delimited by square brackets []). Supported primitive types include strings, numbers, booleans, and null.',
      'Common pitfalls in JSON parsing include trailing commas, unescaped quotation marks, and using single quotes instead of valid double quotes around keys and strings.',
      'When debugging REST or GraphQL endpoints, using a reliable client-side JSON Formatter helps format minified strings and identifies syntax errors without exposing sensitive API payload tokens to remote servers.'
    ]
  },
  {
    id: 'useful-online-tools-for-college-students',
    slug: 'useful-online-tools-for-college-students',
    title: 'Essential Online Utilities Every College Student Should Bookmark',
    excerpt: 'A curated breakdown of indispensable browser tools that save time during homework, assignment drafting, and semester exams.',
    category: 'Productivity',
    readTime: '4 min read',
    publishDate: '2026-08-28',
    content: [
      'Between managing course schedules, tracking assignment deadlines, and preparing for exams, having the right utility tools readily accessible in your browser bookmarks simplifies college life.',
      'Academic calculations like CGPA forecasting and percentage conversions are needed at the end of every testing period. Proactive attendance calculators help prevent unexcused shortages.',
      'Writing utilities like real-time word counters and reading time estimators assist students when preparing essays with strict word count boundaries.',
      'At MasterTools, all these utilities are bundled into a fast, privacy-respecting platform that requires no user login, no email signups, and zero background tracking.'
    ]
  },
  {
    id: 'how-percentage-calculations-work',
    slug: 'how-percentage-calculations-work',
    title: 'How Percentage Calculations Work: Formulas and Practical Use Cases',
    excerpt: 'Master standard percentage formulas, percentage change, mark distributions, and proportion math with clear examples.',
    category: 'Mathematics',
    readTime: '3 min read',
    publishDate: '2026-08-20',
    relatedToolSlug: 'percentage-calculator',
    content: [
      'The word "percentage" comes from the Latin "per centum", meaning "by the hundred". It provides a universal baseline to compare proportions regardless of their original scale.',
      'The standard proportion formula is (Part ÷ Whole) × 100. For instance, scoring 78 out of 90 is equivalent to (78 ÷ 90) × 100 = 86.67%.',
      'Understanding percentage change is also crucial for financial awareness, such as calculating discounts, taxes, and inflation.',
      'Check out our Percentage Calculator for fast, verified calculations with zero math headaches.'
    ]
  }
];
