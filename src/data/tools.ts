export interface ToolFAQ {
  question: string;
  answer: string;
}

export type CategoryIconName =
  | 'Layers'
  | 'GraduationCap'
  | 'Code'
  | 'Calculator'
  | 'CheckSquare'
  | 'ArrowLeftRight';

export interface CategoryItem {
  id: string;
  name: string;
  iconName: CategoryIconName;
}

export interface ToolItem {
  id: string;
  name: string;
  slug: string;
  path: string;
  description: string;
  category: 'Student' | 'Developer' | 'Calculator' | 'Productivity' | 'Converter';
  categoryIconName: CategoryIconName;
  iconName: 'GraduationCap' | 'Percent' | 'CalendarCheck2' | 'Calendar' | 'Code' | 'FileText';
  popular: boolean;
  metaTitle: string;
  metaDescription: string;
  about: string;
  howTo: string[];
  formula?: string;
  example?: string;
  faqs: ToolFAQ[];
  tags: string[];
}

export const CATEGORIES: CategoryItem[] = [
  { id: 'All', name: 'All Tools', iconName: 'Layers' },
  { id: 'Student', name: 'Student Tools', iconName: 'GraduationCap' },
  { id: 'Developer', name: 'Developer Tools', iconName: 'Code' },
  { id: 'Calculator', name: 'Calculators', iconName: 'Calculator' },
  { id: 'Productivity', name: 'Productivity', iconName: 'CheckSquare' },
  { id: 'Converter', name: 'Converters', iconName: 'ArrowLeftRight' },
];

export const TOOLS: ToolItem[] = [
  {
    id: 'cgpa-calculator',
    name: 'CGPA Calculator',
    slug: 'cgpa-calculator',
    path: '/tools/cgpa-calculator',
    description: 'Calculate your semester and cumulative grade point average (CGPA) based on course credits and grade points.',
    category: 'Student',
    categoryIconName: 'GraduationCap',
    iconName: 'GraduationCap',
    popular: true,
    metaTitle: 'MasterTools – Free Online CGPA Calculator for College Students',
    metaDescription: 'Accurately calculate your semester or cumulative CGPA with credit weighting and standard 10-point college grading scales.',
    about: 'The CGPA (Cumulative Grade Point Average) Calculator is an academic tool created for university and college students to compute their overall performance index. Most academic institutions evaluate students using a weighted credit-hour system where subjects with higher credits contribute more significantly to the final score.',
    howTo: [
      'Enter the course or subject name for clarity (optional).',
      'Select the credit value assigned to the subject (e.g., 2, 3, or 4 credits).',
      'Select the grade achieved from the dropdown (O, A+, A, B+, B, C, or U).',
      'Click "+ Add Subject" to append additional courses as needed.',
      'Click "Calculate CGPA" to get your weighted average instantly.'
    ],
    formula: 'CGPA = Σ(Course Credit × Grade Point) / Σ(Total Course Credits)',
    example: 'If you have Mathematics (4 credits, Grade A+ = 9 pts) and Physics (3 credits, Grade A = 8 pts):\nTotal Points = (4 × 9) + (3 × 8) = 36 + 24 = 60\nTotal Credits = 4 + 3 = 7\nCGPA = 60 / 7 = 8.57',
    faqs: [
      {
        question: 'What grading scale does this calculator use?',
        answer: 'This calculator follows the standard 10-point university scale: O (Outstanding) = 10, A+ (Excellent) = 9, A (Very Good) = 8, B+ (Good) = 7, B (Above Average) = 6, C (Average) = 5, and U (Re-appear) = 0.'
      },
      {
        question: 'Are my entered grades stored on any server?',
        answer: 'No. All calculations run strictly in your web browser. No subject names, grades, or personal information are transmitted or saved on external servers.'
      },
      {
        question: 'Can I calculate GPA for a single semester?',
        answer: 'Yes. Simply list all the subjects and credits for that specific semester to calculate your SGPA (Semester Grade Point Average).'
      }
    ],
    tags: ['cgpa', 'gpa', 'grades', 'college', 'university', 'student', 'credits']
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    slug: 'percentage-calculator',
    path: '/tools/percentage-calculator',
    description: 'Quickly find mark percentages, calculate discounts, increases, and proportion values with exact precision.',
    category: 'Calculator',
    categoryIconName: 'Calculator',
    iconName: 'Percent',
    popular: true,
    metaTitle: 'MasterTools – Free Online Percentage Calculator',
    metaDescription: 'Calculate exam percentages, mark scores, discounts, and percentage increases or decreases with instant step-by-step breakdowns.',
    about: 'The Percentage Calculator is an essential utility for students, accountants, educators, and shoppers. Whether you need to figure out your exam aggregate score, calculate retail sales discounts, or analyze proportional changes, this tool delivers immediate, validated calculations.',
    howTo: [
      'Enter the marks or score you obtained in the "Obtained Marks" field.',
      'Enter the maximum achievable marks in the "Total Marks" field.',
      'Click "Calculate Percentage" to review the precise percentage, ratio, and grade classification.'
    ],
    formula: 'Percentage (%) = (Obtained Marks / Total Marks) × 100',
    example: 'If a student scores 462 marks out of a total possible 500 marks:\nPercentage = (462 / 500) × 100 = 92.40%',
    faqs: [
      {
        question: 'What happens if Total Marks is entered as zero?',
        answer: 'Division by zero is mathematically undefined. The calculator validates all inputs and alerts you to provide a positive number greater than zero.'
      },
      {
        question: 'Can Obtained Marks be greater than Total Marks?',
        answer: 'Yes, in scenarios involving bonus credit or growth tracking beyond 100%, though for standard academic tests obtained marks should generally be less than or equal to total marks.'
      }
    ],
    tags: ['percentage', 'marks', 'exam', 'math', 'ratio', 'discount']
  },
  {
    id: 'attendance-calculator',
    name: 'Attendance Calculator',
    slug: 'attendance-calculator',
    path: '/tools/attendance-calculator',
    description: 'Track your current class attendance and determine how many classes you can afford to skip or must attend to meet the threshold.',
    category: 'Student',
    categoryIconName: 'GraduationCap',
    iconName: 'CalendarCheck2',
    popular: true,
    metaTitle: 'MasterTools – Free Online Student Attendance Calculator',
    metaDescription: 'Find your current attendance percentage and calculate how many classes you can skip or must attend to reach 75% or 80% criteria.',
    about: 'Most universities and colleges enforce mandatory minimum attendance requirements (typically 75% or 80%) to be eligible for final examinations. The Attendance Calculator helps you proactively manage your lecture attendance, avoid attendance shortage debarment, and plan legitimate leaves safely.',
    howTo: [
      'Input the total number of classes conducted so far in the academic term.',
      'Input the number of classes you have physically attended.',
      'Specify your institution’s required attendance threshold (e.g., 75% or 80%).',
      'The tool computes your live percentage and informs you precisely how many consecutive classes you can safely miss or must attend to attain the target.'
    ],
    formula: 'Current Attendance (%) = (Classes Attended / Classes Conducted) × 100\nTarget Needed Classes (N) = ⌈(Target% × Conducted - Attended × 100) / (100 - Target%)⌉',
    example: 'Conducted: 40 classes, Attended: 36 classes, Target: 75%:\nCurrent attendance = (36 / 40) × 100 = 90.00%.\nYou are comfortably above 75% and can safely skip 8 consecutive upcoming classes while remaining above 75%.',
    faqs: [
      {
        question: 'Can classes attended exceed classes conducted?',
        answer: 'No. You cannot attend more classes than have been held. The tool will flag this as an invalid entry.'
      },
      {
        question: 'What is the standard university attendance benchmark?',
        answer: 'While policies vary by institution and governing body, 75% is the most common requirement in undergraduate and postgraduate programs.'
      }
    ],
    tags: ['attendance', 'bunk', 'college', 'classes', 'lectures', 'threshold', 'student']
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    slug: 'age-calculator',
    path: '/tools/age-calculator',
    description: 'Calculate your exact age in years, months, and days from your date of birth, along with days lived and next birthday countdown.',
    category: 'Calculator',
    categoryIconName: 'Calculator',
    iconName: 'Calendar',
    popular: true,
    metaTitle: 'MasterTools – Free Online Chronological Age Calculator',
    metaDescription: 'Calculate your exact chronological age in years, months, days, total days lived, and countdown to your next birthday.',
    about: 'The Age Calculator determines exact chronological age between a birth date and either the current date or any specified reference date. It accurately accounts for leap years, variable month lengths, and gives total days lived as well as days remaining until the next celebration.',
    howTo: [
      'Select your Date of Birth using the date picker.',
      'Optionally adjust the "Calculate Age As Of" date (defaults to today).',
      'Click "Calculate Age" to view your exact age breakdown, days lived, and next birthday metrics.'
    ],
    formula: 'Chronological Age = Target Date - Date of Birth (normalized across calendar year boundaries and leap days)',
    example: 'Born on May 15, 2002. As of today (e.g. October 1, 2026), your exact age is 24 Years, 4 Months, and 16 Days.',
    faqs: [
      {
        question: 'Does the calculator account for leap years?',
        answer: 'Yes, full calendar leap year logic is applied, including February 29th calculations.'
      },
      {
        question: 'Can I calculate what my age will be on a future date?',
        answer: 'Yes, simply set the "Age as of" date field to any future date to preview upcoming milestone ages.'
      }
    ],
    tags: ['age', 'birthday', 'date of birth', 'dob', 'years', 'days lived', 'chronological']
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    slug: 'json-formatter',
    path: '/tools/json-formatter',
    description: 'Beautify, validate, minify, and inspect JSON payloads with line numbers, syntax error identification, and one-click copy.',
    category: 'Developer',
    categoryIconName: 'Code',
    iconName: 'Code',
    popular: true,
    metaTitle: 'MasterTools – Free Online JSON Formatter & Validator',
    metaDescription: 'Format, validate, beautify, and minify JSON online. 100% private client-side processing with line numbers and instant syntax diagnostics.',
    about: 'The JSON Formatter and Validator is a clean, developer-focused utility for formatting raw or minified JSON strings into human-readable, indented code. It provides actionable syntax error diagnostics, minification for payload optimization, and runs completely inside your browser so sensitive tokens and data never leak.',
    howTo: [
      'Paste your raw JSON string into the input editor or click "Load Sample".',
      'Click "Format JSON" (2 spaces or 4 spaces) to beautify the structure.',
      'Click "Minify" to strip whitespace for compact network payloads.',
      'Click "Copy" to copy the resulting clean JSON to your clipboard.'
    ],
    formula: 'Strict JSON grammar parsing (ECMA-404) via browser native JSON.parse() and JSON.stringify() with recursive token formatting.',
    example: 'Input:\n{"user":"alex","roles":["editor","admin"],"active":true}\n\nFormatted:\n{\n  "user": "alex",\n  "roles": [\n    "editor",\n    "admin"\n  ],\n  "active": true\n}',
    faqs: [
      {
        question: 'Is my data transmitted to your backend?',
        answer: 'Never. MasterTools performs JSON parsing directly within your local browser JavaScript engine. Your API keys, payloads, and configs remain strictly private on your device.'
      },
      {
        question: 'How does it help debug broken JSON?',
        answer: 'If your JSON contains mismatched quotes, trailing commas, or illegal unescaped characters, the tool highlights the exact error reason and approximate position.'
      }
    ],
    tags: ['json', 'formatter', 'validator', 'beautifier', 'minify', 'developer', 'syntax']
  },
  {
    id: 'word-counter',
    name: 'Word & Character Counter',
    slug: 'word-counter',
    path: '/tools/word-counter',
    description: 'Analyze real-time word count, character count, sentences, paragraphs, and estimated reading time for essays and articles.',
    category: 'Productivity',
    categoryIconName: 'CheckSquare',
    iconName: 'FileText',
    popular: true,
    metaTitle: 'MasterTools – Free Online Word and Character Counter',
    metaDescription: 'Track words, characters with/without spaces, sentences, paragraphs, and estimated reading time in real-time as you write.',
    about: 'The Word Counter is a lightweight, responsive text analysis tool designed for writers, students drafting essays, SEO specialists drafting meta descriptions, and professionals adhering to strict character limits on social media or job applications.',
    howTo: [
      'Type or paste your text into the editor area.',
      'Review live updated statistics including words, total characters, characters excluding spaces, sentences, paragraphs, and reading time.',
      'Use the "Copy Text" button to copy back or "Clear" to reset the editor.'
    ],
    formula: 'Word Count = Total whitespace-delimited tokens matching non-symbol text\nReading Time = Total Words / 200 words per minute (standard silent reading speed)',
    example: 'A 500-word college application statement will register approximately 3,000 characters and take an admissions officer roughly 2.5 minutes to read.',
    faqs: [
      {
        question: 'How is reading time estimated?',
        answer: 'The average adult silent reading speed is generally benchmarked between 200 and 250 words per minute. We use a conservative 200 WPM rate.'
      },
      {
        question: 'Does the counter store my writing?',
        answer: 'No. The text lives only in your browser tab’s memory while you type. Closing or refreshing the page clears the session.'
      }
    ],
    tags: ['word counter', 'character count', 'reading time', 'essay', 'sentences', 'paragraphs', 'writing']
  }
];

export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS.find(t => t.slug === slug);
}
