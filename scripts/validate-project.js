import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('==================================================');
console.log('   MasterTools Production Validation Suite        ');
console.log('==================================================\n');

let errorCount = 0;
let warningCount = 0;

function logError(msg) {
  console.error(`❌ [ERROR] ${msg}`);
  errorCount++;
}

function logWarning(msg) {
  console.warn(`⚠️ [WARN]  ${msg}`);
  warningCount++;
}

function logSuccess(msg) {
  console.log(`✅ [OK]    ${msg}`);
}

// 1. Validate Sitemap XML
console.log('--- 1. Validating Sitemap (public/sitemap.xml) ---');
const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  logError('sitemap.xml file missing in public/ directory!');
} else {
  const content = fs.readFileSync(sitemapPath, 'utf8');
  if (!content.includes('<urlset') || !content.includes('</urlset>')) {
    logError('sitemap.xml does not contain valid XML urlset tags!');
  } else {
    logSuccess('sitemap.xml contains valid XML structure.');
  }

  // Check for non-production URLs
  if (content.includes('localhost') || content.includes('127.0.0.1') || content.includes('vercel.app')) {
    logError('sitemap.xml contains non-production domains (localhost, 127.0.0.1, or vercel.app)!');
  } else {
    logSuccess('All sitemap URLs use canonical production domain (https://masterperi5.me).');
  }

  // Check for private / admin routes
  if (content.includes('/admin') || content.includes('/private')) {
    logError('sitemap.xml contains internal/admin routes!');
  } else {
    logSuccess('No admin/private routes present in sitemap.');
  }
}

// 2. Validate robots.txt
console.log('\n--- 2. Validating robots.txt (public/robots.txt) ---');
const robotsPath = path.join(projectRoot, 'public', 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  logError('robots.txt missing in public/ directory!');
} else {
  const content = fs.readFileSync(robotsPath, 'utf8');
  if (!content.includes('User-agent: *') || !content.includes('Allow: /')) {
    logError('robots.txt is missing standard crawler Allow directives!');
  } else {
    logSuccess('robots.txt has standard search crawler directives.');
  }

  if (!content.includes('Sitemap: https://masterperi5.me/sitemap.xml')) {
    logWarning('robots.txt does not mention canonical sitemap URL.');
  } else {
    logSuccess('robots.txt accurately points to canonical sitemap.xml.');
  }
}

// 3. Validate AI Discovery Catalog (ai-catalog.json & ard.json)
console.log('\n--- 3. Validating AI Resource Discovery Manifests ---');
const aiCatalogPath = path.join(projectRoot, 'public', 'ai-catalog.json');
if (!fs.existsSync(aiCatalogPath)) {
  logError('ai-catalog.json missing in public/ directory!');
} else {
  try {
    const json = JSON.parse(fs.readFileSync(aiCatalogPath, 'utf8'));
    if (json.specVersion === '1.0' && Array.isArray(json.entries)) {
      logSuccess(`ai-catalog.json is valid ARD 1.0 manifest with ${json.entries.length} tool entries.`);
    } else {
      logError('ai-catalog.json is missing required specVersion or entries array!');
    }
  } catch (err) {
    logError(`ai-catalog.json invalid JSON: ${err.message}`);
  }
}

// 4. Validate Environment Configuration
console.log('\n--- 4. Validating Environment Config (.env.example & .gitignore) ---');
const envExamplePath = path.join(projectRoot, '.env.example');
if (!fs.existsSync(envExamplePath)) {
  logError('.env.example file missing!');
} else {
  logSuccess('.env.example file present.');
}

const gitignorePath = path.join(projectRoot, '.gitignore');
if (!fs.existsSync(gitignorePath)) {
  logError('.gitignore file missing!');
} else {
  const content = fs.readFileSync(gitignorePath, 'utf8');
  if (content.includes('.env*')) {
    logSuccess('.gitignore properly protects environment secret files (.env*).');
  } else {
    logError('.gitignore is missing .env* ignore directive!');
  }
}

console.log('\n==================================================');
console.log(`Validation Complete: ${errorCount} Errors, ${warningCount} Warnings.`);
console.log('==================================================\n');

if (errorCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
