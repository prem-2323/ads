# MasterTools — Analytics Tracking Plan

This tracking plan outlines all privacy-preserving analytics events, triggers, parameters, and privacy guidelines implemented across MasterTools.

---

## Event Catalog

| Event Name | Trigger Condition | Parameters | Privacy & Data Rules |
| :--- | :--- | :--- | :--- |
| `page_view` | React Router route change | `page_path`, `page_title`, `page_location` | No query strings containing personal information. |
| `tool_open` | Tool page loaded in viewport | `tool_name`, `tool_category` | Identifies tool metadata only. Zero user input data. |
| `tool_use` | User interacts with calculator inputs or controls | `tool_name`, `tool_category` | Fires when inputs are updated. Zero input values captured. |
| `tool_complete` | User completes calculation, validation, formatting, or generation | `tool_name`, `tool_category` | Confirms successful output. Zero user content/marks/grades sent. |
| `article_view` | Blog article page viewed | `article_slug`, `article_category` | Captures article identity only. |
| `category_view` | Category collection page viewed | `category_name` | Captures category name (e.g. Student, Developer). |
| `download` | User clicks download button (e.g. QR PNG) | `content_type`, `tool_name` | Metadata only (e.g., `qr_code_png`). No file content. |
| `copy_result` | User clicks "Copy" button on tool output | `tool_name` | Confirms copy action. No copied text transmitted. |
| `related_tool_click` | User clicks a related tool link from article or sidebar | `tool_name`, `source` | Source indicates `'article'`, `'sidebar'`, or `'footer'`. |
| `site_search` | User performs a search on blog or tools search | *(None)* | Privacy-safe: Fired without query text to avoid PII leaks. |

---

## Strict Privacy Rules

1. **Zero Personal Identifiable Information (PII)**: Never collect names, email addresses, IP addresses, authentication tokens, or passwords.
2. **Zero Input Data Capture**: Never send grade letters, credit hours, exam marks, dates of birth, attendance counts, JSON text payloads, or entered URLs to Google Analytics.
3. **No Invasive Tracking**: No session recording, keystroke logging, heatmaps, fingerprinting, or hidden cross-site tracking scripts.
4. **No Advertising Click Tracking**: Analytics is strictly separated from advertising. Ad click tracking is disabled.
5. **Asynchronous & Non-Blocking**: All analytics code is asynchronous and fails silently so that blocked analytics or missing environment variables will never interrupt tool calculations or website rendering.
