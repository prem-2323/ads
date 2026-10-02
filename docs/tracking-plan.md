# MasterTools — Analytics Tracking Plan

This tracking plan outlines all privacy-preserving analytics events, their purpose, trigger conditions, parameters, and privacy guidelines implemented across MasterTools.

---

## Event Catalog

| Event Name | Purpose | When It Fires (Trigger) | Parameters | Privacy & Data Rules |
| :--- | :--- | :--- | :--- | :--- |
| `page_view` | Page navigation tracking | On React Router route change | `page_path`, `page_title`, `page_location` | No query parameters containing personal information. |
| `tool_open` | Tool page engagement | When a tool page component mounts in the viewport | `tool_name`, `tool_category` | Tool identity metadata only. Zero user input values captured. |
| `tool_use` | Tool interaction tracking | When a user interacts with calculator inputs or controls | `tool_name`, `tool_category` | Fires on input interaction. Zero user-entered values recorded. |
| `tool_complete` | Tool completion tracking | When a user completes a calculation, validation, formatting, or generation action | `tool_name`, `tool_category` | Confirms successful output. Zero user content/marks/grades/dob sent. |
| `article_view` | Article reader engagement | When a blog article page is viewed | `article_slug`, `article_category` | Captures article slug/category identity only. |
| `category_view` | Category page engagement | When a category collection page is viewed | `category_name` | Captures category name (e.g., Student, Developer). |
| `download` | Download action tracking | When user clicks a download button (e.g. QR Code PNG) | `content_type`, `tool_name` | Metadata only (e.g., `qr_code_png`). No file contents sent. |
| `copy_result` | Copy result action tracking | When user clicks "Copy" button on tool output | `tool_name` | Confirms copy action. No copied text transmitted. |
| `related_tool_click` | Related tool navigation | When user clicks a related tool link from article or sidebar | `tool_name`, `source` | Source indicates `'article'`, `'sidebar'`, or `'footer'`. |
| `site_search` | Internal search action tracking | When user performs a search query | *(None)* | Privacy-safe: Fired without raw query text to prevent PII leaks. |

---

## Strict Privacy & Data Protection Rules

1. **Zero Personal Identifiable Information (PII)**: Never collect names, email addresses, IP addresses, authentication tokens, or passwords.
2. **Zero Input Data Capture**: Never send grade letters, credit hours, exam marks, dates of birth, attendance counts, JSON text payloads, or entered URLs to Google Analytics.
3. **No Invasive Tracking**: No session recording, keystroke logging, heatmaps, fingerprinting, or hidden cross-site tracking scripts.
4. **No Advertising Click Tracking**: Analytics is strictly separated from advertising. Ad click tracking is disabled.
5. **Asynchronous & Non-Blocking**: All analytics code is asynchronous and fails silently so that blocked analytics or missing environment variables will never interrupt tool calculations or website rendering.
