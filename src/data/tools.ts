export interface ToolFAQ {
  question: string;
  answer: string;
}

export type CategoryIconName =
  | 'Layers'
  | 'GraduationCap'
  | 'Code'
  | 'Clock'
  | 'Calculator'
  | 'CheckSquare'
  | 'ArrowLeftRight'
  | 'Zap'
  | 'Wrench';

export type ToolIconName =
  | 'GraduationCap'
  | 'Percent'
  | 'CalendarCheck2'
  | 'Calendar'
  | 'CalendarDays'
  | 'Code'
  | 'FileText'
  | 'FileCheck'
  | 'Award'
  | 'ClipboardList'
  | 'Timer'
  | 'Clock'
  | 'Binary'
  | 'Link2'
  | 'Fingerprint'
  | 'Hash'
  | 'QrCode'
  | 'Ruler'
  | 'KeyRound'
  | 'Calculator';

export type ToolCategory = 'Student' | 'Developer' | 'Calculator' | 'Productivity' | 'Utility';

export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: CategoryIconName;
}

export interface ToolItem {
  id: string;
  name: string;
  slug: string;
  path: string;
  description: string;
  category: ToolCategory;
  categories: ToolCategory[];
  categoryIconName: CategoryIconName;
  iconName: ToolIconName;
  popular: boolean;
  metaTitle: string;
  metaDescription: string;
  about: string;
  howTo: string[];
  formula?: string;
  example?: string;
  faqs: ToolFAQ[];
  tags: string[];
  relatedSlugs: string[];
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'All',
    slug: 'all',
    name: 'All Tools',
    description: 'Browse the complete collection of free client-side tools and calculators.',
    iconName: 'Layers',
  },
  {
    id: 'Student',
    slug: 'student',
    name: 'Student Tools',
    description: 'Calculators and academic utilities designed for university and school students.',
    iconName: 'GraduationCap',
  },
  {
    id: 'Developer',
    slug: 'developer',
    name: 'Developer Tools',
    description: 'Fast, browser-based utilities for coding, encoding, formatting, and debugging.',
    iconName: 'Code',
  },
  {
    id: 'Calculator',
    slug: 'calculator',
    name: 'Calculators',
    description: 'Accurate mathematical, academic, and calendar calculation tools.',
    iconName: 'Calculator',
  },
  {
    id: 'Productivity',
    slug: 'productivity',
    name: 'Productivity',
    description: 'Streamline your daily writing, attendance tracking, and planning routines.',
    iconName: 'CheckSquare',
  },
  {
    id: 'Utility',
    slug: 'utility',
    name: 'Utility',
    description: 'Everyday converters, identifiers, and quick utilities running securely in your browser.',
    iconName: 'ArrowLeftRight',
  },
];

export const TOOLS: ToolItem[] = [
  {
    id: 'cgpa-calculator',
    name: 'CGPA Calculator',
    slug: 'cgpa-calculator',
    path: '/tools/cgpa-calculator',
    description: 'Calculate your semester and cumulative grade point average (CGPA) based on course credits and standard 10-point grade points.',
    category: 'Student',
    categories: ['Student', 'Calculator'],
    categoryIconName: 'GraduationCap',
    iconName: 'GraduationCap',
    popular: true,
    metaTitle: 'CGPA Calculator – Free Online Cumulative Grade Point Average Tool',
    metaDescription: 'Calculate semester and cumulative CGPA with credit weighting and standard 10-point university grading scales. 100% free and client-side.',
    about: 'The CGPA (Cumulative Grade Point Average) Calculator is an academic tool created for university and college students to compute their overall performance index. Academic institutions evaluate students using a weighted credit-hour system where subjects with higher credits contribute more significantly to the final score.',
    howTo: [
      'Enter the course or subject name for clarity (optional).',
      'Select the credit value assigned to the subject (e.g., 2, 3, or 4 credits).',
      'Select the grade achieved from the dropdown (O, A+, A, B+, B, C, or U).',
      'Click "+ Add Subject" to append additional courses as needed.',
      'Click "Calculate CGPA" to get your weighted average instantly.'
    ],
    formula: 'CGPA = Σ(Course Credit × Grade Point) / Σ(Total Course Credits)\n\nGrade Points Scale: O = 10, A+ = 9, A = 8, B+ = 7, B = 6, C = 5, U = 0',
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
        question: 'How do course credits affect my CGPA?',
        answer: 'Courses with higher credits contribute proportionally more to your final CGPA. Earning a higher grade in a 4-credit course boosts your average significantly more than in a 1-credit lab.'
      }
    ],
    tags: ['cgpa calculator', 'cgpa', 'sgpa', 'grade calculator', 'college grades', 'gpa to percentage', 'student'],
    relatedSlugs: ['gpa-calculator', 'percentage-calculator', 'marks-calculator', 'attendance-calculator']
  },
  {
    id: 'gpa-calculator',
    name: 'GPA Calculator',
    slug: 'gpa-calculator',
    path: '/tools/gpa-calculator',
    description: 'Calculate weighted Grade Point Average (GPA) across 4.0 US, 5.0, and 10.0 grading scales with credit hour weighting.',
    category: 'Student',
    categories: ['Student', 'Calculator'],
    categoryIconName: 'GraduationCap',
    iconName: 'Award',
    popular: true,
    metaTitle: 'GPA Calculator – Free Online Weighted GPA Tool (4.0, 5.0 & 10.0 Scales)',
    metaDescription: 'Calculate weighted GPA across 4.0, 5.0, and 10.0 academic scales with credit hours. Note that grading criteria vary across universities.',
    about: 'The GPA Calculator enables students worldwide to compute their weighted Grade Point Average across various academic scales, including the popular US 4.0 scale (with +/- letter grades), 5.0 scale, and 10.0 scale. Grading policies, percentage conversions, and grade point assignments vary between institutions, so this tool provides configurable options.',
    howTo: [
      'Select your grading scale (4.0 US Scale, 5.0 Scale, or 10.0 Scale).',
      'Enter course titles and specify credit hours for each class.',
      'Choose your letter grade from the dropdown list.',
      'Click "+ Add Course" to add more courses.',
      'Click "Calculate GPA" to view your weighted GPA and credit totals.'
    ],
    formula: 'Weighted GPA = Σ(Credit Hours × Grade Points) / Σ(Total Credit Hours)\n\nNote: Letter grade to point mappings vary by university and department.',
    example: 'For a 4.0 scale with 3 courses:\n- English (3 credits, A = 4.0): 12.0 points\n- Chemistry (4 credits, B+ = 3.3): 13.2 points\n- History (3 credits, A- = 3.7): 11.1 points\nTotal Points = 36.3, Total Credits = 10\nWeighted GPA = 36.3 / 10 = 3.63',
    faqs: [
      {
        question: 'Do grading systems vary between institutions?',
        answer: 'Yes. Universities and schools often adopt custom grade cutoffs, +/- weighting nuances, and honors multipliers. Always check your university handbook for official grade policies.'
      },
      {
        question: 'What is the difference between GPA and CGPA?',
        answer: 'GPA typically denotes the grade average for a single academic semester or term, whereas CGPA (Cumulative GPA) reflects your overall average across all completed semesters.'
      }
    ],
    tags: ['gpa calculator', 'gpa', 'weighted gpa', '4.0 scale', 'college gpa', 'academic calculator', 'student'],
    relatedSlugs: ['cgpa-calculator', 'percentage-calculator', 'marks-calculator', 'attendance-calculator']
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    slug: 'percentage-calculator',
    path: '/tools/percentage-calculator',
    description: 'Calculate mark percentages, proportion values, and ratios instantly from obtained marks and total marks.',
    category: 'Calculator',
    categories: ['Calculator', 'Student'],
    categoryIconName: 'Calculator',
    iconName: 'Percent',
    popular: true,
    metaTitle: 'Percentage Calculator – Fast & Accurate Marks Percentage Tool',
    metaDescription: 'Compute exact percentages from obtained marks and total maximum marks. Validates inputs with zero server transmission.',
    about: 'The Percentage Calculator provides an effortless way to calculate academic percentages, exam scores, and proportions. Whether determining semester mark percentages or solving math proportions, this tool computes the exact figure alongside fractional representations.',
    howTo: [
      'Enter the marks obtained in the exam or test.',
      'Enter the maximum total marks possible.',
      'Click "Calculate Percentage" to view your score instantly.',
      'Use the Reset button to clear inputs for a new calculation.'
    ],
    formula: 'Percentage (%) = (Obtained Marks / Total Marks) × 100',
    example: 'If you scored 468 out of 600:\nPercentage = (468 / 600) × 100 = 78.00%',
    faqs: [
      {
        question: 'Can obtained marks exceed total marks?',
        answer: 'Typically, obtained marks should be less than or equal to total marks unless bonus or extra credit marks are awarded. The calculator flags total marks below 1 as invalid.'
      },
      {
        question: 'How are decimal percentages rounded?',
        answer: 'The calculation results are displayed to two decimal places for academic standard reporting.'
      }
    ],
    tags: ['percentage calculator', 'percent', 'marks to percentage', 'exam score', 'academic percentage', 'calculator'],
    relatedSlugs: ['cgpa-calculator', 'marks-calculator', 'attendance-calculator', 'unit-converter']
  },
  {
    id: 'attendance-calculator',
    name: 'Attendance Calculator',
    slug: 'attendance-calculator',
    path: '/tools/attendance-calculator',
    description: 'Track your lecture attendance percentage and calculate how many classes you can safely miss or must attend to stay compliant.',
    category: 'Student',
    categories: ['Student', 'Productivity', 'Calculator'],
    categoryIconName: 'GraduationCap',
    iconName: 'CalendarCheck2',
    popular: true,
    metaTitle: 'Attendance Calculator – Check If You Can Bunk or Need to Attend',
    metaDescription: 'Find your attendance percentage and determine exactly how many classes you can miss or must attend to hit 75% or 80% criteria.',
    about: 'The Attendance Calculator helps students maintain university attendance requirements (typically 75% or 80%) to avoid semester debarment. It clearly demonstrates how many upcoming classes can be safely skipped or how many consecutive lectures must be attended to recover.',
    howTo: [
      'Enter the total number of classes conducted so far.',
      'Enter the number of classes you have attended.',
      'Enter your institution’s required attendance percentage (e.g. 75%).',
      'Click "Calculate Attendance" to view your status, classes to attend, or classes you can miss.'
    ],
    formula: 'Current Attendance (%) = (Classes Attended / Classes Conducted) × 100\n\nClasses you can miss = ⌊(Attended - (Required% × Conducted) / 100) / (Required% / 100)⌋\nClasses to attend = ⌈((Required% × Conducted / 100) - Attended) / (1 - Required% / 100)⌉',
    example: 'Conducted: 40, Attended: 34, Required: 75%\nCurrent Attendance = (34 / 40) × 100 = 85.00%\nYou are safely above 75% and can miss up to 5 consecutive classes without dropping below the threshold.',
    faqs: [
      {
        question: 'Why does attendance drop faster than it recovers?',
        answer: 'Missing a class increases the denominator (total classes) without increasing the numerator (attended classes). Recovering requires attending multiple consecutive classes to dilute the missed class.'
      },
      {
        question: 'What if required attendance is 100% and I missed one class?',
        answer: 'If you have missed even one class, reaching 100% mathematically becomes impossible because the missed class cannot be undone.'
      }
    ],
    tags: ['attendance calculator', 'college attendance', 'bunk calculator', '75 percent attendance', 'attendance tracker', 'student'],
    relatedSlugs: ['cgpa-calculator', 'marks-calculator', 'percentage-calculator', 'date-calculator']
  },
  {
    id: 'marks-calculator',
    name: 'Marks Calculator',
    slug: 'marks-calculator',
    path: '/tools/marks-calculator',
    description: 'Calculate subject-wise totals with internal and external mark splits, overall total marks, and aggregate percentage.',
    category: 'Student',
    categories: ['Student', 'Calculator'],
    categoryIconName: 'GraduationCap',
    iconName: 'ClipboardList',
    popular: false,
    metaTitle: 'Marks Calculator – Calculate Subject Totals, Overall Marks & Percentage',
    metaDescription: 'Calculate subject totals from internal and external exam marks, overall aggregate total, and percentage. Add or remove multiple subjects easily.',
    about: 'The Marks Calculator accommodates academic grading systems that divide assessment into continuous internal assessments (CIA/internals) and end-semester external examinations. It compiles subject-wise totals and aggregates overall performance.',
    howTo: [
      'Enter the subject title for each course.',
      'Input the Internal marks obtained.',
      'Input the External exam marks obtained.',
      'Input the Maximum marks allocated for the subject.',
      'Add or remove subject rows as needed.',
      'Click "Calculate Marks" to see subject totals, overall aggregate, and percentage.'
    ],
    formula: 'Subject Total = Internal Marks + External Marks\nOverall Total = Σ(Subject Totals)\nOverall Maximum = Σ(Subject Maximum Marks)\nAggregate Percentage = (Overall Total / Overall Maximum) × 100',
    example: 'Maths: Internal 25/30 + External 65/70 = 90/100 (90%)\nPhysics: Internal 20/30 + External 55/70 = 75/100 (75%)\nOverall Total = 165 / 200 = 82.50%',
    faqs: [
      {
        question: 'What happens if internal + external exceeds maximum marks?',
        answer: 'The calculator validates inputs and displays a clear error warning if the sum of internal and external marks exceeds the maximum allowed marks.'
      },
      {
        question: 'Can I calculate for any number of subjects?',
        answer: 'Yes. You can add as many subjects as needed using the "+ Add Subject" button.'
      }
    ],
    tags: ['marks calculator', 'internal marks', 'external marks', 'subject total', 'exam marks', 'student'],
    relatedSlugs: ['cgpa-calculator', 'percentage-calculator', 'gpa-calculator', 'attendance-calculator']
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    slug: 'age-calculator',
    path: '/tools/age-calculator',
    description: 'Calculate your exact age in years, months, and days, along with countdown days until your next birthday.',
    category: 'Calculator',
    categories: ['Calculator', 'Utility'],
    categoryIconName: 'Calculator',
    iconName: 'Calendar',
    popular: false,
    metaTitle: 'Age Calculator – Exact Age in Years, Months, Days & Next Birthday',
    metaDescription: 'Determine your chronological age in years, months, and days based on local browser date. See days remaining until your next birthday.',
    about: 'The Age Calculator calculates exact chronological age between a birth date and a target date. It factors in variable calendar month lengths and leap years to provide the exact breakdown in years, months, and days.',
    howTo: [
      'Select your Date of Birth using the calendar picker.',
      'Select or keep today’s date as the reference date.',
      'Click "Calculate Age" to view your exact age breakdown and next birthday countdown.'
    ],
    formula: 'Calculated using calendar-aware date arithmetic: years = target.year - birth.year (adjusted for elapsed months/days), with month borrowing for precise remaining days.',
    example: 'Date of Birth: 2000-01-15\nTarget Date: 2026-10-02\nAge: 26 Years, 8 Months, 17 Days',
    faqs: [
      {
        question: 'Can I enter a future date of birth?',
        answer: 'No. The calculator validates dates and rejects future birth dates relative to the reference date.'
      },
      {
        question: 'Does this use my local device timezone?',
        answer: 'Yes. The calculation runs entirely in your local browser environment using your device’s current date.'
      }
    ],
    tags: ['age calculator', 'chronological age', 'birthday countdown', 'days lived', 'date math', 'utility'],
    relatedSlugs: ['date-calculator', 'unit-converter', 'word-counter', 'percentage-calculator']
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    slug: 'json-formatter',
    path: '/tools/json-formatter',
    description: 'Format, beautify, indent, minify, and validate JSON payloads entirely in your browser with zero server transmission.',
    category: 'Developer',
    categories: ['Developer', 'Utility'],
    categoryIconName: 'Code',
    iconName: 'Code',
    popular: true,
    metaTitle: 'JSON Formatter – Format, Beautify & Minify JSON Online',
    metaDescription: 'Fast client-side JSON formatter and beautifier. Indent, minify, validate, and copy JSON without uploading data to external servers.',
    about: 'The JSON Formatter helps developers parse, inspect, indent, and minify JavaScript Object Notation data. All processing occurs entirely in client-side JavaScript memory, guaranteeing that sensitive API credentials, configuration objects, and database records remain private.',
    howTo: [
      'Paste your raw, unformatted, or minified JSON string into the input editor.',
      'Select your preferred indentation spacing (2 spaces, 4 spaces, or tabs).',
      'Click "Format JSON" to beautify the structure or "Minify" to compact it.',
      'Use the "Copy" button to transfer formatted JSON to your clipboard.'
    ],
    formula: 'Formatting: JSON.stringify(JSON.parse(input), null, indentSize)\nMinifying: JSON.stringify(JSON.parse(input))',
    example: 'Input: {"name":"MasterTools","active":true}\nFormatted (2 spaces):\n{\n  "name": "MasterTools",\n  "active": true\n}',
    faqs: [
      {
        question: 'Is my JSON sent to a remote server?',
        answer: 'Never. MasterTools executes JSON parsing completely within your web browser. Nothing is logged, transmitted, or stored on external servers.'
      },
      {
        question: 'What causes JSON parse errors?',
        answer: 'Common errors include single quotes instead of double quotes, trailing commas after the final element in an array or object, and unquoted object keys.'
      }
    ],
    tags: ['json formatter', 'beautify json', 'minify json', 'json parser', 'api payload', 'developer tool'],
    relatedSlugs: ['json-validator', 'base64', 'url-encoder', 'uuid-generator']
  },
  {
    id: 'json-validator',
    name: 'JSON Validator',
    slug: 'json-validator',
    path: '/tools/json-validator',
    description: 'Validate JSON syntax against ECMA-404 standards with exact line and column error indicators and payload structural metrics.',
    category: 'Developer',
    categories: ['Developer', 'Utility'],
    categoryIconName: 'Code',
    iconName: 'FileCheck',
    popular: false,
    metaTitle: 'JSON Validator – Validate JSON Syntax with Line & Column Error Highlighting',
    metaDescription: 'Validate JSON syntax online against ECMA-404 standards. Pinpoint exact line and column numbers of errors with zero data uploads.',
    about: 'The JSON Validator verifies whether a text payload conforms strictly to RFC 8259 / ECMA-404 standards. If errors exist, it pinpoints the exact line number, column offset, and offending token.',
    howTo: [
      'Paste your JSON payload into the validation area.',
      'Click "Validate JSON".',
      'Review the confirmation status or inspect the detailed error location message.',
      'Examine tree metrics including object depth, array count, and key statistics.'
    ],
    formula: 'Validation based on RFC 8259 specifications via browser native JSON parser with character offset to line/column translation.',
    example: 'Validating:\n{\n  "status": "ok",\n}\nResult: SyntaxError at line 3, column 1 (unexpected closing brace following trailing comma).',
    faqs: [
      {
        question: 'Does this tool validate JSON Schema?',
        answer: 'This tool validates standard JSON syntax compliance. It confirms whether the string is parseable as valid JSON.'
      },
      {
        question: 'Are large JSON payloads supported?',
        answer: 'Yes. Modern browser JavaScript engines comfortably parse multi-megabyte payloads in milliseconds.'
      }
    ],
    tags: ['json validator', 'validate json', 'json lint', 'syntax checker', 'json error', 'developer'],
    relatedSlugs: ['json-formatter', 'base64', 'url-encoder', 'uuid-generator']
  },
  {
    id: 'base64',
    name: 'Base64 Encoder / Decoder',
    slug: 'base64',
    path: '/tools/base64',
    description: 'Encode text to Base64 format and decode Base64 strings back to UTF-8 text with full Unicode support.',
    category: 'Developer',
    categories: ['Developer', 'Utility'],
    categoryIconName: 'Code',
    iconName: 'Binary',
    popular: false,
    metaTitle: 'Base64 Encoder & Decoder – Free Online UTF-8 Base64 Converter',
    metaDescription: 'Encode text to Base64 or decode Base64 to UTF-8 text online. Supports Unicode characters, emoji, copy to clipboard, and instant clearing.',
    about: 'The Base64 Encoder / Decoder transforms arbitrary text and binary data into ASCII-safe Base64 strings according to RFC 4648. This implementation uses standard browser UTF-8 encoding APIs so that non-Latin characters, international scripts, and emoji convert smoothly without character corruption.',
    howTo: [
      'Select either the "Encode" or "Decode" tab.',
      'Type or paste your text into the input field.',
      'Click the action button or toggle live conversion.',
      'Copy the converted result to your clipboard with one click.'
    ],
    formula: '3 bytes (24 bits) are divided into four 6-bit groups, mapped to a 64-character alphabet (A-Z, a-z, 0-9, +, /) with "=" padding as needed.',
    example: 'Encoding: "MasterTools" → "TWFzdGVyVG9vbHM="\nDecoding: "TWFzdGVyVG9vbHM=" → "MasterTools"',
    faqs: [
      {
        question: 'Does this handle Unicode and emojis properly?',
        answer: 'Yes. We utilize TextEncoder and TextDecoder in the browser so emojis (e.g. 🚀) and international characters encode and decode accurately.'
      },
      {
        question: 'Is Base64 a form of encryption?',
        answer: 'No. Base64 is an encoding scheme, not encryption. It is fully reversible and provides zero cryptographic security.'
      }
    ],
    tags: ['base64', 'base64 encoder', 'base64 decoder', 'utf8 base64', 'encode base64', 'decode base64', 'developer'],
    relatedSlugs: ['url-encoder', 'json-formatter', 'json-validator', 'uuid-generator']
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder / Decoder',
    slug: 'url-encoder',
    path: '/tools/url-encoder',
    description: 'Encode special characters into percent-encoded URL formats and decode percent-encoded URLs back to readable text.',
    category: 'Developer',
    categories: ['Developer', 'Utility'],
    categoryIconName: 'Code',
    iconName: 'Link2',
    popular: false,
    metaTitle: 'URL Encoder & Decoder – Percent-Encoding Online Tool',
    metaDescription: 'Encode and decode URLs and query parameters online with RFC 3986 percent-encoding. Handles malformed values safely.',
    about: 'The URL Encoder / Decoder converts unsafe URL characters (such as spaces, ampersands, question marks, and non-ASCII glyphs) into standardized percent-encoded triplets (%XX) according to RFC 3986. It also restores encoded strings back to clean, human-readable text.',
    howTo: [
      'Choose the "Encode" or "Decode" mode tab.',
      'Enter your URL, query string parameter, or encoded text.',
      'Click the convert button to view the result.',
      'Copy the output with the one-click copy button.'
    ],
    formula: 'Percent Encoding: Converts reserved and non-ASCII bytes to %HH (hexadecimal byte representation). Handled natively via encodeURIComponent / decodeURIComponent.',
    example: 'Encoding: "hello world & good day" → "hello%20world%20%26%20good%20day"\nDecoding: "search%3Dmastertools" → "search=mastertools"',
    faqs: [
      {
        question: 'What is the difference between encodeURI and encodeURIComponent?',
        answer: 'encodeURIComponent encodes all special characters including delimiters like ?, &, and /, which is essential for individual query string values. encodeURI preserves basic URL protocol syntax.'
      },
      {
        question: 'How does it handle malformed percent sequences?',
        answer: 'If an invalid percent sequence (such as a trailing % not followed by two hex digits) is provided, the tool catches the URIError gracefully and explains the issue.'
      }
    ],
    tags: ['url encoder', 'url decoder', 'percent encoding', 'urlencode', 'urldecode', 'query string', 'developer'],
    relatedSlugs: ['base64', 'json-formatter', 'json-validator', 'uuid-generator']
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    slug: 'uuid-generator',
    path: '/tools/uuid-generator',
    description: 'Generate cryptographically random UUID v4 identifiers individually or in bulk with uppercase and dashless options.',
    category: 'Developer',
    categories: ['Developer', 'Utility'],
    categoryIconName: 'Code',
    iconName: 'Fingerprint',
    popular: false,
    metaTitle: 'UUID Generator – Free Online UUID v4 Generator (Single & Bulk)',
    metaDescription: 'Generate random UUID v4 strings individually or in bulk. Supports uppercase, lowercase, hyphens, and copy to clipboard.',
    about: 'The UUID Generator creates universally unique 128-bit identifiers conforming to RFC 4122 Version 4. Using the browser’s built-in cryptographic pseudo-random number generator (Web Crypto API), it provides statistically guaranteed unique IDs for database keys, session tokens, and request tracking.',
    howTo: [
      'Select how many UUIDs you want to generate (from 1 to 50).',
      'Toggle formatting preferences like uppercase or removing hyphens.',
      'Click "Generate UUID(s)".',
      'Click "Copy All" or copy individual UUIDs as needed.'
    ],
    formula: 'UUID v4 Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx where y is 8, 9, a, or b. Generated client-side via crypto.randomUUID().',
    example: 'Sample UUID v4: 8f14e45f-ceea-467f-a1d2-b6326708a417\nWithout hyphens: 8f14e45fceea467fa1d2b6326708a417',
    faqs: [
      {
        question: 'Are these UUIDs generated using Math.random()?',
        answer: 'No. They are generated using the browser’s Web Crypto API (crypto.randomUUID() and crypto.getRandomValues()), providing cryptographically secure pseudo-randomness.'
      },
      {
        question: 'Can UUIDs ever collide?',
        answer: 'The probability of a collision in UUID v4 is negligible (approximately 1 in 2.71 × 10^18 for a billion generated IDs).'
      }
    ],
    tags: ['uuid generator', 'uuid v4', 'guid generator', 'random id', 'unique identifier', 'developer tool'],
    relatedSlugs: ['json-formatter', 'base64', 'url-encoder', 'qr-generator']
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    slug: 'word-counter',
    path: '/tools/word-counter',
    description: 'Count words, characters, characters without spaces, sentences, paragraphs, and estimated reading time in real time.',
    category: 'Productivity',
    categories: ['Productivity', 'Utility'],
    categoryIconName: 'CheckSquare',
    iconName: 'FileText',
    popular: true,
    metaTitle: 'Word Counter – Real-Time Word, Character & Reading Time Tool',
    metaDescription: 'Count words, characters with/without spaces, sentences, paragraphs, and estimated reading time live. 100% private in browser.',
    about: 'The Word Counter provides real-time statistics for writers, students, authors, and professionals. As you paste or type your draft, it calculates metrics including word count, character count, sentence structure, and estimated reading duration.',
    howTo: [
      'Type or paste your text into the text area.',
      'Observe the live statistics update instantly above the editor.',
      'Use the Copy button to copy your text or Clear to start fresh.'
    ],
    formula: 'Words: Count of whitespace-separated tokens\nReading Time: Calculated at standard adult reading pace of 200 words per minute (Math.ceil(words / 200)).',
    example: 'Text with 400 words → Estimated reading time: ~2 minutes.',
    faqs: [
      {
        question: 'How are sentences detected?',
        answer: 'Sentences are calculated based on terminal punctuation marks (., !, ?) followed by whitespace or line breaks.'
      },
      {
        question: 'Is my text sent to any server?',
        answer: 'No. All text parsing happens directly inside your browser. No drafts, essays, or articles are ever uploaded.'
      }
    ],
    tags: ['word counter', 'character counter', 'reading time', 'essay word count', 'text statistics', 'productivity'],
    relatedSlugs: ['json-formatter', 'qr-generator', 'age-calculator', 'percentage-calculator']
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    slug: 'unit-converter',
    path: '/tools/unit-converter',
    description: 'Convert units across Length, Weight, Temperature, Area, Volume, Time, and Digital Data with high accuracy.',
    category: 'Calculator',
    categories: ['Calculator', 'Utility'],
    categoryIconName: 'Calculator',
    iconName: 'Ruler',
    popular: false,
    metaTitle: 'Unit Converter – Free Online Metric & Imperial Unit Converter',
    metaDescription: 'Convert between units of length, weight, temperature, area, volume, time, and data storage. Fast, accurate, and completely free.',
    about: 'The Unit Converter offers seamless mathematical conversions between imperial and metric systems across 7 key measurement categories: Length, Weight, Temperature, Area, Volume, Time, and Digital Storage. It provides exact decimal conversions and conversion formulas.',
    howTo: [
      'Select a measurement category tab (e.g., Length, Weight, Temperature).',
      'Enter the numerical value to convert.',
      'Select your "From" unit and "To" unit from the dropdown lists.',
      'View the converted result and step-by-step mathematical formula instantly.'
    ],
    formula: 'Value in Base Unit = Input × Conversion Factor to Base\nConverted Result = Base Value / Conversion Factor from Base\n(Temperature uses specialized formulas: °F = (°C × 9/5) + 32, K = °C + 273.15)',
    example: 'Converting 5 Kilometers to Miles:\n5 km × 0.621371 = 3.10686 Miles',
    faqs: [
      {
        question: 'Which measurement categories are supported?',
        answer: 'We support Length (meters, km, miles, feet, inches), Weight (kg, g, pounds, ounces), Temperature (°C, °F, K), Area (sq meters, acres, sq ft), Volume (liters, gallons, ml), Time (seconds, minutes, hours, days), and Digital Data (bytes, KB, MB, GB, TB).'
      },
      {
        question: 'Are decimal values supported?',
        answer: 'Yes. You can enter integer or decimal values for precise scientific and everyday conversions.'
      }
    ],
    tags: ['unit converter', 'metric converter', 'length converter', 'weight converter', 'temperature converter', 'calculator'],
    relatedSlugs: ['percentage-calculator', 'date-calculator', 'age-calculator', 'cgpa-calculator']
  },
  {
    id: 'date-calculator',
    name: 'Date Calculator',
    slug: 'date-calculator',
    path: '/tools/date-calculator',
    description: 'Calculate date differences between two dates, or add and subtract days, weeks, months, or years from any date.',
    category: 'Calculator',
    categories: ['Calculator', 'Productivity'],
    categoryIconName: 'Calculator',
    iconName: 'CalendarDays',
    popular: false,
    metaTitle: 'Date Calculator – Days Between Dates, Add & Subtract Days',
    metaDescription: 'Calculate total days and duration between two dates, or add and subtract days, weeks, and months from a starting date.',
    about: 'The Date Calculator performs calendar math to find the exact span between two calendar dates (in days, weeks, months, and years), or project a future/past date by adding or subtracting specific durations.',
    howTo: [
      'Choose your mode: "Date Difference" or "Add / Subtract Days".',
      'For difference: Pick a Start Date and End Date to see total elapsed days, weekdays, and years/months/days.',
      'For addition/subtraction: Pick a starting date, specify the number of days/weeks/months, and choose whether to add or subtract.'
    ],
    formula: 'Duration = End Date - Start Date (computed in milliseconds converted to calendar days, accounting for leap years).',
    example: 'From 2026-01-01 to 2026-10-02:\n274 calendar days (or 39 weeks and 1 day).',
    faqs: [
      {
        question: 'Does this calculate working days vs weekends?',
        answer: 'Yes. The Date Difference mode breaks down total calendar days into weekdays (Monday–Friday) and weekend days.'
      },
      {
        question: 'Does it take leap years into account?',
        answer: 'Yes. Standard Gregorian calendar leap year rules are fully respected.'
      }
    ],
    tags: ['date calculator', 'days between dates', 'date difference', 'add days to date', 'calendar calculator', 'calculator'],
    relatedSlugs: ['age-calculator', 'attendance-calculator', 'unit-converter', 'word-counter']
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    slug: 'qr-generator',
    path: '/tools/qr-generator',
    description: 'Generate high-resolution, downloadable QR codes for URLs, text, and messages completely offline in your browser.',
    category: 'Utility',
    categories: ['Utility', 'Productivity'],
    categoryIconName: 'ArrowLeftRight',
    iconName: 'QrCode',
    popular: false,
    metaTitle: 'QR Code Generator – Free Downloadable PNG QR Codes Online',
    metaDescription: 'Generate custom QR codes for URLs and text online. Choose error correction, preview live, and download as PNG without watermark.',
    about: 'The QR Code Generator produces Quick Response codes client-side using lightweight algorithmic generation. Generated QR codes can be customized with error correction levels and downloaded as high-quality PNG images with zero watermarks or tracking redirects.',
    howTo: [
      'Type or paste your URL or text message into the input field.',
      'Select your preferred error correction level (L, M, Q, or H).',
      'Preview the generated QR code in real-time.',
      'Click "Download PNG" to save the QR code image to your device.'
    ],
    formula: 'QR matrix generated according to ISO/IEC 18004 standards with Reed-Solomon error correction code algorithms.',
    example: 'Input: "https://masterperi5.me" → Generates a scannable 2D matrix readable by any smartphone camera.',
    faqs: [
      {
        question: 'Do generated QR codes expire?',
        answer: 'No. The QR codes generated are static barcodes containing your exact text or URL directly. They never expire and have no redirect intermediaries.'
      },
      {
        question: 'Are there any watermarks or fees?',
        answer: 'None. All QR codes generated on MasterTools are 100% free with zero watermarks, registration, or tracking.'
      }
    ],
    tags: ['qr code generator', 'generate qr code', 'free qr code', 'qr code maker', 'download qr', 'utility'],
    relatedSlugs: ['url-encoder', 'uuid-generator', 'base64', 'word-counter']
  }
];

export function getToolBySlug(slug: string): ToolItem | undefined {
  // Normalize known aliases
  const aliasMap: Record<string, string> = {
    'base64-encoder-decoder': 'base64',
    'url-encoder-decoder': 'url-encoder',
    'qr-code-generator': 'qr-generator',
  };
  const resolvedSlug = aliasMap[slug] || slug;
  return TOOLS.find(t => t.slug === resolvedSlug || t.id === resolvedSlug);
}

export function getRelatedTools(tool: ToolItem): ToolItem[] {
  if (tool.relatedSlugs && tool.relatedSlugs.length > 0) {
    const list = tool.relatedSlugs
      .map(slug => getToolBySlug(slug))
      .filter((t): t is ToolItem => t !== undefined);
    if (list.length >= 3) return list.slice(0, 4);
  }
  // Fallback to same category tools
  return TOOLS.filter(t => t.id !== tool.id && t.category === tool.category).slice(0, 4);
}

export function getToolsByCategory(categorySlug: string): ToolItem[] {
  const norm = categorySlug.toLowerCase().trim();
  if (norm === 'all') return TOOLS;
  return TOOLS.filter(t =>
    t.category.toLowerCase() === norm ||
    t.categories.some(c => c.toLowerCase() === norm)
  );
}

export function getToolsByIds(ids: string[]): ToolItem[] {
  if (!ids || ids.length === 0) return [];
  return ids
    .map(id => getToolBySlug(id))
    .filter((t): t is ToolItem => t !== undefined);
}

