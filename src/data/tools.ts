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
  | 'ArrowLeftRight';

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
  | 'KeyRound';

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
  category: 'Student' | 'Developer' | 'Everyday';
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
}

export const CATEGORIES: CategoryItem[] = [
  { id: 'All', name: 'All Tools', iconName: 'Layers' },
  { id: 'Student', name: 'Student Tools', iconName: 'GraduationCap' },
  { id: 'Developer', name: 'Developer Tools', iconName: 'Code' },
  { id: 'Everyday', name: 'Everyday Tools', iconName: 'Clock' },
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
        answer: 'Yes. Simply list all the subjects and credits for that specific semester to calculate your SGPA (Semester Grade Point Average), or use our dedicated GPA Calculator for 4.0 and 10.0 scales.'
      }
    ],
    tags: ['cgpa', 'gpa', 'grades', 'college', 'university', 'student', 'credits']
  },
  {
    id: 'gpa-calculator',
    name: 'GPA Calculator',
    slug: 'gpa-calculator',
    path: '/tools/gpa-calculator',
    description: 'Compute your grade point average for a semester or year with credit weighting on 4.0, 5.0 or 10.0 scales, including percentage conversion.',
    category: 'Student',
    categoryIconName: 'GraduationCap',
    iconName: 'Award',
    popular: true,
    metaTitle: 'MasterTools – Free Online GPA Calculator (4.0, 5.0 & 10.0 Scale)',
    metaDescription: 'Calculate GPA instantly with credit-hour weighting on 4.0, 5.0 and 10.0 grading scales. Includes letter-grade mapping and percentage conversion.',
    about: 'The GPA (Grade Point Average) Calculator converts your course grades into a single weighted academic score for one semester or academic year. Unlike CGPA, which accumulates performance across all semesters, GPA measures a specific term — making it the number printed on most transcripts, scholarship forms and job applications.',
    howTo: [
      'Choose your grading scale: 4.0 (US), 5.0 or 10.0 (Indian/international).',
      'Enter each course name, its credit hours and the grade or grade point you earned.',
      'Use "+ Add Course" to include every subject in the term.',
      'Click "Calculate GPA" to see your weighted GPA, total credits and converted percentage.',
      'Switch the scale at any time to re-map the same grades instantly.'
    ],
    formula: 'GPA = Σ(Credit Hours × Grade Point) / Σ(Total Credit Hours)',
    example: 'English (3 credits, A = 4.0), Chemistry (4 credits, B+ = 3.3), Lab (1 credit, A = 4.0):\nTotal Points = (3 × 4.0) + (4 × 3.3) + (1 × 4.0) = 12.0 + 13.2 + 4.0 = 29.2\nTotal Credits = 3 + 4 + 1 = 8\nGPA = 29.2 / 8 = 3.65 on a 4.0 scale (≈ 91.3%)',
    faqs: [
      {
        question: 'What is the difference between GPA and CGPA?',
        answer: 'GPA measures performance over a single term (one semester or year), while CGPA is the cumulative average across every term you have completed. One semester GPA feeds into your running CGPA.'
      },
      {
        question: 'How do I convert GPA to percentage?',
        answer: 'On a 4.0 scale, percentage ≈ (GPA ÷ 4) × 100. On a 10.0 scale, percentage ≈ CGPA × 9.5 for many Indian universities (some use × 10). The calculator shows the common conversion for your selected scale.'
      },
      {
        question: 'What if a course has zero or half credits?',
        answer: 'Half-credit labs and zero-credit seminars exist. Enter decimal credits such as 0.5 or 1.5; courses with 0 credits are ignored in the weighted average because they cannot contribute grade points.'
      }
    ],
    tags: ['gpa', 'grade point average', '4.0 scale', 'transcript', 'semester', 'credits', 'student']
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    slug: 'percentage-calculator',
    path: '/tools/percentage-calculator',
    description: 'Quickly find mark percentages, calculate discounts, increases, and proportion values with exact precision.',
    category: 'Student',
    categoryIconName: 'GraduationCap',
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
    id: 'marks-calculator',
    name: 'Marks Calculator',
    slug: 'marks-calculator',
    path: '/tools/marks-calculator',
    description: 'Add up marks across any number of subjects to get total score, overall percentage, average, highest/lowest subject and grade.',
    category: 'Student',
    categoryIconName: 'GraduationCap',
    iconName: 'ClipboardList',
    popular: true,
    metaTitle: 'MasterTools – Free Online Marks Calculator (Total & Percentage)',
    metaDescription: 'Enter marks for every subject and instantly get total marks, overall percentage, average, highest/lowest score and letter grade.',
    about: 'The Marks Calculator aggregates obtained and maximum marks across all your subjects in one pass, then reports the totals, overall percentage, per-subject average, best and weakest subject, and a letter-grade classification. It is the fastest way to convert a marksheet into a single performance summary without spreadsheet formulas.',
    howTo: [
      'Enter each subject name in the first column (optional but useful for readability).',
      'Enter the marks you scored in the "Obtained" column and the full marks in the "Total" column.',
      'Add or remove rows with "+ Add Subject" and the trash icon until every subject is listed.',
      'Click "Calculate Marks" to see total marks, percentage, average, highest/lowest subject and grade.',
      'Use "Reset" to clear the sheet and start a new exam.'
    ],
    formula: 'Overall % = (Σ Obtained Marks / Σ Total Marks) × 100\nAverage per Subject = Σ Obtained Marks / Number of Subjects',
    example: 'Maths 82/100, Physics 74/100, Chemistry 91/100:\nObtained = 82 + 74 + 91 = 247, Total = 300\nPercentage = (247 / 300) × 100 = 82.33%\nAverage = 247 / 3 = 82.33 · Best = Chemistry (91) · Lowest = Physics (74)',
    faqs: [
      {
        question: 'Can subjects have different maximum marks?',
        answer: 'Yes. Each row carries its own "Total" column, so a 75-mark paper and a 100-mark paper are both weighted correctly in the overall percentage.'
      },
      {
        question: 'How is the grade assigned?',
        answer: 'The calculator maps your overall percentage to the common Indian grading bands: 90+ O, 80–89 A+, 70–79 A, 60–69 B+, 50–59 B, 40–49 C and below 40 F.'
      },
      {
        question: 'Does it include optional or additional subjects?',
        answer: 'Only list the subjects you want counted. Leave out electives or re-exams you wish to ignore — the totals update instantly on recalculation.'
      }
    ],
    tags: ['marks', 'total marks', 'percentage', 'marksheet', 'result', 'exam', 'score', 'student']
  },
  {
    id: 'study-time-calculator',
    name: 'Study Time Calculator',
    slug: 'study-time-calculator',
    path: '/tools/study-time-calculator',
    description: 'Plan exam preparation: find exactly how many hours per day you must study to finish the syllabus before your exam date.',
    category: 'Student',
    categoryIconName: 'GraduationCap',
    iconName: 'Timer',
    popular: false,
    metaTitle: 'MasterTools – Free Online Study Time Calculator & Exam Planner',
    metaDescription: 'Calculate how many study hours per day you need to finish your syllabus before the exam, with a realistic plan based on your available time.',
    about: 'The Study Time Calculator turns a vague study plan into concrete numbers. By comparing the total hours your syllabus needs against the hours you have already put in and the days left before the exam, it tells you the exact daily study load required — and whether your current availability can realistically achieve it.',
    howTo: [
      'Enter the number of chapters or topics in your syllabus.',
      'Enter how many hours one chapter realistically needs (research + revision).',
      'Enter the hours you have already studied for this exam.',
      'Set your exam date (days remaining are calculated automatically) and how many hours per day you can genuinely study.',
      'Read the result: required hours per day, total remaining hours, and whether your plan fits — with a week-by-week target.'
    ],
    formula: 'Total Required Hours = Chapters × Hours per Chapter\nRemaining Hours = Total Required Hours − Hours Studied\nRequired Hours/Day = Remaining Hours / Days Remaining\nPlan Fits = Your Available Hours/Day ≥ Required Hours/Day',
    example: '24 chapters × 2 hours = 48 hours total. You have studied 10 hours. Exam is in 12 days.\nRemaining = 48 − 10 = 38 hours → Required = 38 / 12 = 3.17 hours/day.\nIf you can study 4 hours a day, you finish with a 10-hour buffer; if only 2 hours, you are 14 hours short and need extra weekend sessions.',
    faqs: [
      {
        question: 'How many hours per chapter should I assume?',
        answer: 'For a standard chapter: 1–1.5 hours for first reading, plus 30–60 minutes for revision and practice. Heavy derivation-based subjects sit closer to 2–3 hours. Use a higher number for tough chapters and recalculate.'
      },
      {
        question: 'Does the calculator include breaks?',
        answer: 'The required hours are focused study time. With the Pomodoro technique (25–50 minutes focus + 5–10 minute break), calendar time is roughly 20–30% higher than the raw figure — plan buffer accordingly.'
      },
      {
        question: 'What if the plan says I am short on time?',
        answer: 'Either increase hours per day, extend the plan by starting earlier, reduce scope (prioritise high-weight chapters), or combine days. The tool shows exactly how many hours you are short so you can pick a realistic fix.'
      }
    ],
    tags: ['study time', 'study planner', 'exam prep', 'timetable', 'hours per day', 'student', 'revision']
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    slug: 'age-calculator',
    path: '/tools/age-calculator',
    description: 'Calculate your exact age in years, months, and days from your date of birth, along with days lived and next birthday countdown.',
    category: 'Everyday',
    categoryIconName: 'Clock',
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
    id: 'unit-converter',
    name: 'Unit Converter',
    slug: 'unit-converter',
    path: '/tools/unit-converter',
    description: 'Convert length, mass, temperature, area, volume, speed, time, data, energy and pressure units instantly with a live conversion table.',
    category: 'Everyday',
    categoryIconName: 'Clock',
    iconName: 'Ruler',
    popular: true,
    metaTitle: 'MasterTools – Free Online Unit Converter (Length, Weight, Temperature & More)',
    metaDescription: 'Convert between metric and imperial units for length, mass, temperature, area, volume, speed, time, data size, energy and pressure.',
    about: 'The Unit Converter is a universal reference for everyday and technical unit conversions. It covers the ten most-used measurement families — including temperature, where simple scaling is not enough because of fixed offsets — and shows a ready-made conversion table so you can read neighbouring values without typing them one by one.',
    howTo: [
      'Pick a measurement family (Length, Mass, Temperature, Area, Volume, Speed, Time, Data, Energy or Pressure).',
      'Type the value you want to convert.',
      'Choose the "From" and "To" units; the result updates instantly as you type.',
      'Use the swap button to reverse the direction, and read the conversion table for nearby values.',
      'Switch category tabs to convert a different kind of measurement.'
    ],
    formula: 'General units: Value in To-Unit = Value × (From-Unit Factor ÷ To-Unit Factor)\nTemperature (°C ↔ °F): °F = °C × 9/5 + 32 · °C = (°F − 32) × 5/9\nTemperature (°C ↔ K): K = °C + 273.15',
    example: 'Convert 72 km/h to mph:\n1 mile = 1.609344 km, so 72 × (1 ÷ 1.609344) = 44.74 mph.\n\nConvert 35 °C to °F:\n°F = 35 × 9/5 + 32 = 63 + 32 = 95 °F.',
    faqs: [
      {
        question: 'Why does temperature need a special formula?',
        answer: 'Most units scale proportionally from a shared zero point, but Celsius, Fahrenheit and Kelvin have different zeros and tick sizes, so an offset must be added or removed alongside the ratio.'
      },
      {
        question: 'Which system does the converter use by default?',
        answer: 'Each unit pair works in both directions — metric to imperial and imperial to metric — with exact conversion factors (e.g. 1 inch = 25.4 mm by international agreement).'
      },
      {
        question: 'Is the conversion precise enough for engineering work?',
        answer: 'Yes. Factors are given to full precision (e.g. 1 pound = 0.45359237 kg exactly), and results are displayed with sensible rounding you can inspect in the conversion table.'
      }
    ],
    tags: ['unit converter', 'convert', 'metric', 'imperial', 'length', 'weight', 'temperature', 'celsius', 'fahrenheit', 'km to miles']
  },
  {
    id: 'word-counter',
    name: 'Word & Character Counter',
    slug: 'word-counter',
    path: '/tools/word-counter',
    description: 'Analyze real-time word count, character count, sentences, paragraphs, and estimated reading time for essays and articles.',
    category: 'Everyday',
    categoryIconName: 'Clock',
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
      },
      {
        question: 'What is the difference between formatting and minifying?',
        answer: 'Formatting adds indentation and line breaks for humans; minifying removes every optional whitespace so the payload is as small as possible for network transport.'
      }
    ],
    tags: ['json', 'formatter', 'validator', 'beautifier', 'minify', 'developer', 'syntax']
  },
  {
    id: 'json-validator',
    name: 'JSON Validator',
    slug: 'json-validator',
    path: '/tools/json-validator',
    description: 'Validate any JSON against the ECMA-404 standard and get the exact line, column and offset of every syntax error, plus structure statistics.',
    category: 'Developer',
    categoryIconName: 'Code',
    iconName: 'FileCheck',
    popular: false,
    metaTitle: 'MasterTools – Free Online JSON Validator with Line & Column Errors',
    metaDescription: 'Validate JSON online and pinpoint syntax errors by line, column and character offset. Includes size, depth and key-count statistics.',
    about: 'The JSON Validator answers one question precisely: is this JSON valid, and if not, exactly where does it break? It parses with the native ECMA-404 engine, converts the reported character offset into a human line/column reference, and then inspects the parsed tree to report object, array, key and value counts plus maximum nesting depth — useful for checking API responses, config files and environment payloads before you ship them.',
    howTo: [
      'Paste the JSON you want to check into the editor (or click "Load Sample").',
      'Click "Validate JSON" to run the parser.',
      'On success, review the statistics: file size, parse time, keys, values, depth and node counts.',
      'On failure, read the exact line, column and character offset shown next to the error message, then jump to that location in your editor.',
      'Use "Copy Error" to share the diagnostic with a teammate.'
    ],
    formula: 'Validity = JSON.parse(input) succeeds → valid, otherwise the thrown Error message is parsed for "position N" and converted:\nLine = count of "\n" before offset + 1\nColumn = offset − lastNewlineIndex',
    example: 'Input:\n{\n  "name": "Ada",\n  "skills": ["math"],\n}\n\nResult: INVALID — trailing comma after "skills" array.\nError at line 4, column 2 (character offset 44): Unexpected token } after array element.',
    faqs: [
      {
        question: 'What standard does this validator follow?',
        answer: 'It uses the browser’s native JSON.parse, which implements ECMA-404 / RFC 8259 — the same grammar used by APIs, package managers and configuration files.'
      },
      {
        question: 'Why line and column instead of just an error message?',
        answer: 'Browsers report errors as a character offset from the start of the string, which is hard to locate in a large file. Converting it to line/column lets you jump straight to the broken token.'
      },
      {
        question: 'Does validation modify or upload my JSON?',
        answer: 'No. Validation is a read-only parse in your browser’s memory; nothing is transformed, stored or transmitted.'
      }
    ],
    tags: ['json validator', 'validate json', 'json error', 'line number', 'ecma-404', 'api', 'developer']
  },
  {
    id: 'base64-encoder-decoder',
    name: 'Base64 Encoder / Decoder',
    slug: 'base64-encoder-decoder',
    path: '/tools/base64-encoder-decoder',
    description: 'Encode text to Base64 and decode Base64 back to UTF-8 text, with URL-safe mode, live byte counts and one-click copy.',
    category: 'Developer',
    categoryIconName: 'Code',
    iconName: 'Binary',
    popular: true,
    metaTitle: 'MasterTools – Free Online Base64 Encoder & Decoder (UTF-8 Safe)',
    metaDescription: 'Encode text to Base64 and decode Base64 to text online. Supports UTF-8 international characters and URL-safe alphabet. 100% client-side.',
    about: 'Base64 encodes arbitrary binary data into a safe alphabet of 64 characters (A–Z, a–z, 0–9, + and /) so it can travel through text-only channels — JSON bodies, data URLs, email attachments, HTTP basic auth headers and CSS. This tool handles UTF-8 correctly (emoji and non-Latin scripts round-trip safely) and offers the URL-safe variant that swaps + and / for − and _.',
    howTo: [
      'Paste the text you want to encode, or paste Base64 if you want to decode.',
      'Choose Encode or Decode — the tool detects a likely direction to preselect.',
      'Toggle "URL-safe" when the output will go into a URL, query string or filename.',
      'Click the action button; the result appears in the output panel with byte counts.',
      'Use "Copy" or "Swap" (move output to input) to chain operations.'
    ],
    formula: 'Every 3 input bytes (24 bits) → 4 output characters (6 bits each), padded with "=" to a multiple of 4:\nBase64 length = 4 × ⌈input bytes ÷ 3⌉\nDecode: each character → 6 bits, reassembled into 8-bit bytes, then UTF-8 decoded.',
    example: 'Text: "Hello!"\nBytes: 48 65 6C 6C 6F 21\nBase64: SGVsbG8h\n\nDecoding "U2FsdGVkX1+" recovers the original bytes; switching on URL-safe mode changes + and / to - and _ so no escaping is needed inside a URL.',
    faqs: [
      {
        question: 'Is Base64 encryption or hashing?',
        answer: 'Neither. Base64 is reversible encoding — anyone with the output can recover the original text. Never use it to hide passwords, keys or secrets.'
      },
      {
        question: 'Why does my decoded text show as garbage?',
        answer: 'The original data was probably not UTF-8 text (for example, raw bytes from another encoding). This decoder assumes UTF-8, the web standard.'
      },
      {
        question: 'What is the URL-safe variant?',
        answer: 'It replaces + with − and / with _ so the result can sit unescaped inside URLs and filenames. Standard Base64 uses + and / which URL parsers treat specially.'
      }
    ],
    tags: ['base64', 'encode', 'decode', 'encoder', 'decoder', 'utf8', 'data url', 'developer']
  },
  {
    id: 'url-encoder-decoder',
    name: 'URL Encoder / Decoder',
    slug: 'url-encoder-decoder',
    path: '/tools/url-encoder-decoder',
    description: 'Percent-encode URLs and query strings for safe transmission, and decode percent-encoded text back to readable characters.',
    category: 'Developer',
    categoryIconName: 'Code',
    iconName: 'Link2',
    popular: false,
    metaTitle: 'MasterTools – Free Online URL Encoder & Decoder (Percent Encoding)',
    metaDescription: 'Encode URLs and query parameters with percent encoding, or decode percent-encoded strings back to readable text. Supports full and component modes.',
    about: 'Percent encoding converts characters that are unsafe in a URL — spaces, &, #, ?, non-ASCII text — into a % followed by two hexadecimal digits, as defined by RFC 3986. This tool supports both component mode (encodes everything including / and ? — correct for a single query parameter value) and full-URI mode (preserves the URL structure itself), plus decoding back to readable text.',
    howTo: [
      'Paste the URL, query string or parameter value you need to encode or decode.',
      'Choose the mode: "Component" for a single value, "Full URI" to preserve slashes and query syntax.',
      'Choose Encode or Decode and click the button — the result appears instantly.',
      'Copy the result or swap it back into the input to chain another operation.',
      'The panel shows before/after character counts so you can spot over-encoding.'
    ],
    formula: 'Component mode → encodeURIComponent(): every character except A–Z a–z 0–9 - _ . ! ~ * ’ ( ) is replaced by %XX of its UTF-8 bytes.\nFull URI mode → encodeURI(): additionally preserves ; / ? : @ & = + $ , #',
    example: 'Component encode of "course name & year=2026":\ncourse%20name%20%26%20year%3D2026\n\nFull URI encode of "https://example.com/search?q=hello world":\nhttps://example.com/search?q=hello%20world\n\nDecoding "%E2%9C%93 done" returns "✓ done".',
    faqs: [
      {
        question: 'Component or Full URI — which should I pick?',
        answer: 'Use Component when encoding a value that goes inside a query string or path segment (it escapes &, =, ? and /). Use Full URI when you want to keep an entire URL readable but make unsafe characters legal.'
      },
      {
        question: 'What is the difference between URL encoding and Base64?',
        answer: 'Percent encoding is character-by-character and human-readable (space → %20), while Base64 rewrites the whole payload into a 64-character alphabet. Query values use percent encoding; opaque binary blobs use Base64.'
      },
      {
        question: 'Why does decoding fail on some input?',
        answer: 'A lone % not followed by two hexadecimal digits is invalid percent encoding — the decoder flags the exact position instead of guessing.'
      }
    ],
    tags: ['url encode', 'url decode', 'percent encoding', 'urlencode', 'query string', 'rfc 3986', 'developer']
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    slug: 'uuid-generator',
    path: '/tools/uuid-generator',
    description: 'Generate random UUID v4 identifiers in bulk with uppercase or dashless formatting, plus a built-in UUID validator.',
    category: 'Developer',
    categoryIconName: 'Code',
    iconName: 'Fingerprint',
    popular: true,
    metaTitle: 'MasterTools – Free Online UUID Generator (v4, Bulk, Uppercase)',
    metaDescription: 'Generate cryptographically random UUID v4 strings in bulk. Options for uppercase, no dashes, and a built-in validator for pasted UUIDs.',
    about: 'A UUID (Universally Unique Identifier) is a 128-bit identifier defined by RFC 4122. Version 4 UUIDs fill 122 bits with cryptographically secure randomness, giving a collision probability low enough that you can safely use them as primary keys, request IDs, filenames or session tokens without coordination. This generator uses the browser’s crypto.getRandomValues — the same source as crypto.randomUUID() — for true randomness.',
    howTo: [
      'Choose how many UUIDs to generate (1–200).',
      'Set formatting options: uppercase letters and/or remove the hyphens.',
      'Click "Generate" — results appear as a copyable list.',
      'Click any copy icon for a single value, or "Copy All" for the whole list.',
      'Paste any suspect UUID into the Validator to confirm it is a well-formed v4 identifier.'
    ],
    formula: 'UUID v4 layout (36 characters with dashes, 128 bits):\nxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx\nVersion nibble = 4 · Variant bits y ∈ {8, 9, A, B}\nRandom bits = 122 of 128 → collision chance ≈ 50% after ~5.3 × 10¹⁸ generations.',
    example: 'Generated:\n8f14e45f-ceea-467f-a1d2-b6326708a417\n3f2504e0-4f89-41d3-9a0c-0305e82c3301\n\nWith Uppercase + No dashes:\n8F14E45FCEEA467FA1D2B6326708A417',
    faqs: [
      {
        question: 'Are these UUIDs safe for session tokens or passwords?',
        answer: 'Version 4 UUIDs are cryptographically random and acceptable as identifiers and non-password session tokens, but for high-security secrets prefer a longer random token (32+ bytes) so you have a larger entropy margin.'
      },
      {
        question: 'Can generated UUIDs ever repeat?',
        answer: 'The birthday-bound probability of one collision reaches 50% only after roughly 5.3 quintillion v4 UUIDs. For realistic volumes, repeats are effectively impossible.'
      },
      {
        question: 'Where does the randomness come from?',
        answer: 'The Web Crypto API (crypto.getRandomValues), which is a cryptographically secure pseudo-random number generator mandated by browsers — not the predictable Math.random().'
      }
    ],
    tags: ['uuid', 'guid', 'uuid generator', 'v4', 'random id', 'unique identifier', 'developer']
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    slug: 'hash-generator',
    path: '/tools/hash-generator',
    description: 'Generate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes of any text — plus file checksums — entirely in your browser.',
    category: 'Developer',
    categoryIconName: 'Code',
    iconName: 'Hash',
    popular: false,
    metaTitle: 'MasterTools – Free Online Hash Generator (MD5, SHA-256, SHA-512)',
    metaDescription: 'Generate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 checksums for text or files. Client-side via Web Crypto, nothing is uploaded.',
    about: 'A hash function maps arbitrary input to a fixed-length digest: change one character and the entire digest changes. Developers use hashes for file integrity checks, cache keys, deduplication and password storage (hashed, never plaintext). This generator computes MD5, SHA-1 and the SHA-2 family for text or files using the browser’s Web Crypto API, so large files never leave your device.',
    howTo: [
      'Paste the text to hash, or click "Choose File" to hash a file instead.',
      'Select the algorithms you want (multiple digests are computed in parallel).',
      'The digests update automatically — click any copy icon to copy one.',
      'For files, the size in bytes is shown alongside the digests.',
      'Use "Clear" to empty the input and reset all results.'
    ],
    formula: 'Output sizes:\nMD5    → 128 bits (32 hex chars)\nSHA-1  → 160 bits (40 hex chars)\nSHA-256 → 256 bits (64 hex chars)\nSHA-384 → 384 bits (96 hex chars)\nSHA-512 → 512 bits (128 hex chars)\nDigest = Hex(message) — deterministic, irreversible, avalanche-sensitive.',
    example: 'Text "abc":\nMD5     → 900150983cd24fb0d6963f7d28e17f72\nSHA-256 → ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad\nSHA-512 → ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a…',
    faqs: [
      {
        question: 'Is MD5 or SHA-1 safe for passwords?',
        answer: 'No. Both are broken for collision resistance and GPUs compute billions of MD5 hashes per second. For password storage use bcrypt/scrypt/Argon2 with a salt; MD5 and SHA-1 here are for checksums and legacy compatibility only.'
      },
      {
        question: 'Do you store or upload my text or file?',
        answer: 'Never. Hashing happens with the Web Crypto API inside your browser tab. A 100 MB file is hashed locally without a single byte being transmitted.'
      },
      {
        question: 'Why does the same input always give the same hash?',
        answer: 'Hash functions are deterministic by definition — that property is what makes them useful for verifying that a file was transferred unmodified.'
      }
    ],
    tags: ['hash', 'md5', 'sha256', 'sha512', 'checksum', 'digest', 'file hash', 'developer']
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    slug: 'qr-code-generator',
    path: '/tools/qr-code-generator',
    description: 'Create downloadable QR codes for URLs, text, Wi-Fi details or contact cards with adjustable error correction and size.',
    category: 'Developer',
    categoryIconName: 'Code',
    iconName: 'QrCode',
    popular: false,
    metaTitle: 'MasterTools – Free Online QR Code Generator (SVG & PNG Download)',
    metaDescription: 'Generate QR codes for URLs and text with selectable error correction (L/M/Q/H). Download as SVG or PNG. No watermark, no tracking.',
    about: 'A QR (Quick Response) code stores data in a two-dimensional matrix of black modules: three finder patterns anchor the grid, timing patterns align it, and Reed–Solomon error correction lets the code stay readable even when part of it is damaged, printed small or partially obscured. This generator produces crisp codes locally with selectable error-correction level and exports them as scalable SVG or high-resolution PNG — with no watermark and no tracking pixel.',
    howTo: [
      'Enter the content: a URL, plain text, Wi-Fi credentials or any short payload.',
      'Pick the error correction level: L (7% recovery) for clean screens, M (15%) default, Q (25%) or H (30%) for printed or logo-covered codes.',
      'Pick a size — larger codes scan more reliably at distance.',
      'Click "Generate" to render the preview instantly.',
      'Download as SVG (infinitely scalable) or PNG (raster, ready to insert), or copy the image.'
    ],
    formula: 'Capacity grows with error-correction level — at level M a version-4 code holds 62 alphanumeric characters, while level H holds only 34:\nData + EC codewords = Total codewords (fixed per version)\nEC codewords: L ≈ 7%, M ≈ 15%, Q ≈ 25%, H ≈ 30% of the code.',
    example: 'Content: https://masterperi5.me\nError correction: M · Size: 512 px\n\nResult: a square matrix ~33×33 modules that any phone camera opens directly in the browser — printable at any size because the SVG export stores geometry, not pixels.',
    faqs: [
      {
        question: 'Which error correction level should I choose?',
        answer: 'Use M for screens and general sharing (15% recovery), Q for printed flyers, and H when you plan to overlay a logo or expect wear. Higher levels make denser codes that need to be scanned from closer range.'
      },
      {
        question: 'Do the QR codes expire or expire behind a redirect?',
        answer: 'The code itself never expires — it is a static image of your data. Only the URL inside can stop working, so consider pointing QR codes at a redirect you control.'
      },
      {
        question: 'Is anything tracked when someone scans my code?',
        answer: 'No. This tool generates a local image with no analytics, no shortener and no intermediary — the code contains exactly the data you typed and nothing else.'
      }
    ],
    tags: ['qr code', 'qr generator', 'qrcode', 'scan', 'wifi qr', 'url to qr', 'svg', 'developer']
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    slug: 'password-generator',
    path: '/tools/password-generator',
    description: 'Generate cryptographically strong random passwords with configurable length, character sets, entropy estimate and strength rating.',
    category: 'Everyday',
    categoryIconName: 'Clock',
    iconName: 'KeyRound',
    popular: true,
    metaTitle: 'MasterTools – Free Strong Password Generator (Random, Offline)',
    metaDescription: 'Generate secure random passwords with adjustable length and character sets. Shows entropy and crack-time estimates. Generated offline in your browser.',
    about: 'Strong passwords come from randomness, not dictionary words with symbols glued on. This generator draws every character from the browser’s cryptographic random source (crypto.getRandomValues), supports custom lengths and character pools, and reports the entropy in bits plus a realistic offline crack-time estimate — so you can see exactly how much protection a longer password actually buys.',
    howTo: [
      'Set the desired password length with the slider (4–64 characters).',
      'Toggle the character sets: uppercase, lowercase, digits and symbols.',
      'Optionally exclude look-alike characters (0/O, 1/l/I) for passwords you must type by hand.',
      'Click "Generate" — a fresh password appears with its entropy and strength rating.',
      'Click "Copy" to copy it to your clipboard and store it in your password manager.'
    ],
    formula: 'Pool size = 26 (lowercase) + 26 (uppercase) + 10 (digits) + 33 (symbols) = 95\nEntropy (bits) = Length × log₂(Pool size)\nExample: 16 chars from 95 = 16 × 6.57 ≈ 105 bits\nOffline crack time ≈ 2^(Entropy−1) ÷ Guesses per second',
    example: 'Length 16, all four sets (pool = 95):\nEntropy = 16 × log₂(95) = 105.1 bits\nSample: v#2qL9!zR7&mK4pQ\nAt 10¹² guesses/second (a large GPU farm), expected time to crack ≈ 2¹⁰⁴ seconds — longer than the age of the universe.',
    faqs: [
      {
        question: 'Are the passwords truly random?',
        answer: 'Yes — every character is drawn from crypto.getRandomValues, the browser’s CSPRNG. Nothing is seeded by time or Math.random(), and no password is ever transmitted or logged.'
      },
      {
        question: 'How long should my password be?',
        answer: 'For accounts, 14–16 characters with mixed sets (≈90–105 bits of entropy) is comfortably strong. For passphrases and API keys, 20+ characters. Length matters more than exotic substitutions.'
      },
      {
        question: 'Should I still use a password manager?',
        answer: 'Absolutely. A generator creates the secret; the manager stores it, remembers it per site, and prevents password reuse — the most common way accounts get compromised.'
      }
    ],
    tags: ['password generator', 'random password', 'strong password', 'secure password', 'entropy', 'credentials', 'privacy']
  },
  {
    id: 'date-calculator',
    name: 'Date Calculator',
    slug: 'date-calculator',
    path: '/tools/date-calculator',
    description: 'Find the exact difference between two dates in years, months and days — or add and subtract days, weeks, months and years to any date.',
    category: 'Everyday',
    categoryIconName: 'Clock',
    iconName: 'CalendarDays',
    popular: false,
    metaTitle: 'MasterTools – Free Online Date Calculator (Difference & Add/Subtract)',
    metaDescription: 'Calculate the exact difference between two dates in years, months and days, or add and subtract days, weeks, months and years from any date.',
    about: 'The Date Calculator handles the two most common calendar tasks: measuring the span between two dates (contract terms, age, deadlines, project durations) and shifting a date by a duration (payment due dates, notice periods, delivery estimates). It handles variable month lengths, leap years and end-of-month clamping correctly — adding one month to January 31 yields February 28, not March 3.',
    howTo: [
      'Pick the mode: "Difference between dates" or "Add / subtract time".',
      'For differences, choose the start and end dates — the breakdown updates instantly.',
      'For shifting, choose the base date, enter a duration and choose units (days, weeks, months or years).',
      'Use the − toggle to subtract instead of adding.',
      'Read the result: calendar breakdown plus total days, weeks and working days where relevant.'
    ],
    formula: 'Difference = End − Start, decomposed calendar-wise:\nYears = full 365/366-day cycles · Months = full calendar months · Days = remainder\nAddition: months clamp to the target month’s last day (Jan 31 + 1 month = Feb 28/29).',
    example: 'From 2026-01-31 to 2026-03-01:\n→ 1 month 1 day (January 31 + 1 month clamps to Feb 28, +1 day = Mar 1) = 29 days total.\n\n2026-10-01 + 90 days = 2026-12-30 (90 days = 12 weeks 6 days).',
    faqs: [
      {
        question: 'How are partial months counted?',
        answer: 'As whole calendar months first, then leftover days. The total-days figure is always exact regardless of how the months/days split is presented.'
      },
      {
        question: 'Does it account for leap years?',
        answer: 'Yes — February 29 is counted in both difference and addition, and adding years to a leap-day birthday (Feb 29) falls on Feb 28 in common years.'
      },
      {
        question: 'Is the end date included in the difference?',
        answer: 'The calculation is a pure subtraction (end − start), so the start day is day zero. Add 1 if you need inclusive counting for deadlines.'
      }
    ],
    tags: ['date calculator', 'days between dates', 'date difference', 'add days', 'deadline', 'calendar', 'duration']
  },
  {
    id: 'time-calculator',
    name: 'Time Calculator',
    slug: 'time-calculator',
    path: '/tools/time-calculator',
    description: 'Add or subtract hours, minutes and seconds across multiple durations, and convert between hours, minutes, seconds, days and milliseconds.',
    category: 'Everyday',
    categoryIconName: 'Clock',
    iconName: 'Clock',
    popular: false,
    metaTitle: 'MasterTools – Free Online Time Calculator (Add, Subtract & Convert)',
    metaDescription: 'Add and subtract durations in hours, minutes and seconds, and convert time units instantly. Ideal for timesheets, shifts and schedules.',
    about: 'The Time Calculator combines two everyday jobs: summing or subtracting a list of durations (timesheets, shift logs, workout splits, podcast segments) and converting between time units (hours to minutes, days to seconds, milliseconds to hours). Carries between 60-minute hours and 60-second minutes are handled automatically, so results are always in exact h:m:s plus a decimal-hours figure for billing.',
    howTo: [
      'Choose the mode: "Add / subtract durations" or "Convert units".',
      'For sums, enter each duration as HH:MM:SS and mark it + or −; add rows as needed.',
      'The total shows as h:m:s, decimal hours and total seconds — updating live.',
      'For conversions, enter a value, choose the from/to units and read the result instantly.',
      'Use "Copy" to copy the total in your preferred format.'
    ],
    formula: 'Normalize everything to seconds, then re-split:\nTotal seconds = Σ(±(hours × 3600 + minutes × 60 + seconds))\nHours = ⌊total ÷ 3600⌋ · Minutes = ⌊(total mod 3600) ÷ 60⌋ · Seconds = total mod 60\nDecimal hours = total seconds ÷ 3600',
    example: 'Shift log: 08:30:00 + 01:15:00 − 00:20:00\n= 30,600 + 4,500 − 1,200 = 33,900 seconds\n= 09:30:00 → 9.5 decimal hours.\n\nConvert 2.5 hours → 2.5 × 60 = 150 minutes = 9,000,000 ms.',
    faqs: [
      {
        question: 'Why show decimal hours as well?',
        answer: 'Timesheets, payroll and logging tools bill in decimal hours (9.5 h), while schedules read 09:30 — both are shown so you never have to convert manually.'
      },
      {
        question: 'Can I enter more than 24 hours in one duration?',
        answer: 'Yes. Durations are treated as spans, not clock times, so 47:30:00 simply means forty-seven and a half hours and is displayed as 47:30:00 (or 1 day 23:30:00).'
      },
      {
        question: 'How exact are the conversions?',
        answer: 'Everything is computed in integer seconds before conversion, so there is no floating-point drift — 60 minutes always equals exactly 1 hour.'
      }
    ],
    tags: ['time calculator', 'hours minutes seconds', 'add time', 'duration', 'timesheet', 'convert time', 'decimal hours']
  }
];

export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS.find(t => t.slug === slug);
}
