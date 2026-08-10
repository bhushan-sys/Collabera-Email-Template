# Collabera Email Signature Editor — Project Brief & Technical Blueprint

## 1. Executive Summary & Goal

The **Collabera Email Signature Editor** is a dynamic web application designed to allow employees across Collabera entities to select, customize, preview, and export standardized, brand-compliant email signatures.

### Core Value Proposition
- **Seamless UX:** Employees select a template from a visual gallery, fill out their details in a real-time form panel, and preview live updates instantly.
- **Copy-Paste Export:** Direct rich-text copy to clipboard for standard email clients (Gmail, Outlook Desktop/Web, Apple Mail). No file downloads required.
- **Strict Email Client Compatibility:** Ensures 100% rendering fidelity by relying strictly on nested `<table>` HTML layouts and inline CSS styles, bypassing the rendering limitations of Word (Outlook) and custom email rendering engines.

---

## 2. Product Flow & User Journey

1. **Template Gallery (Landing Page):**
   - Displays all available signature design templates in a responsive grid/gallery view.
   - Eliminates pre-gating or initial branch selection questions. Users immediately browse design options.

2. **Interactive Signature Editor Page:**
   - **Left / Center Canvas:** Live interactive preview powered by an `<iframe srcDoc>` sandbox rendering real-time HTML/CSS output.
   - **Right Sidebar (Dynamic Form):** Auto-generated form controls based on the active template schema.

3. **In-Form Entity Switching:**
   - Multi-entity support (e.g., `Collabera LLC` vs. `Collabera GTC`) is managed seamlessly as a dropdown field within the sidebar editor.
   - Changing the entity automatically updates conditional logic in the template merge step (e.g., legal disclaimers, physical address, company logo variants, and localized formatting).

4. **Export & Copy:**
   - One-click **"Copy Signature"** button using the standard Clipboard API rich-text write (`text/html` & `text/plain`).
   - User simply pastes (`Ctrl+V` / `Cmd+V`) directly into Gmail or Outlook signature settings.

---

## 3. Email HTML Rendering Constraints & Design Rules

> [!IMPORTANT]
> **Primary Technical Mandate:** Outlook uses Microsoft Word's HTML rendering engine, which completely ignores CSS flexbox, CSS grid, external stylesheets, `<style>` tags in head, absolute positioning, and modern CSS properties.

### Non-Negotiable HTML Constraints:
- **Layout Architecture:** Pure nested `<table>`, `<tr>`, `<td>` structures only.
- **Styling Method:** 100% fully inline styles on every DOM element (e.g., `<td style="font-family: Arial, sans-serif; font-size: 14px; color: #333333; line-height: 18px;">`).
- **Typography:** Web-safe font stacks (Arial, Helvetica, Georgia, Verdana, Times New Roman, Trebuchet MS) to guarantee uniform rendering across all client devices.
- **Media & Images:**
  - All image assets (logos, social media icons, headshots) **must** be served via public HTTPS URLs (e.g., Cloudinary, AWS S3, or CDN).
  - Base64 data URIs and local relative paths are strictly prohibited as email clients block them.
  - Image tags must include explicit `width`, `height`, and `style="display: block;"` attributes to avoid unwanted spacing bugs in Outlook/Gmail.
- **JavaScript Constraints:** Absolutely zero JavaScript inside the signature HTML markup. Output must be purely static HTML/CSS.

---

## 4. Schema-Driven Architecture

To ensure scalable addition of new signature templates without altering application source code, every template is represented by a JSON Schema.

### Schema Spec Structure:
```json
{
  "templateId": "exec-blue",
  "name": "Executive Blue",
  "version": "1.0.0",
  "fields": [
    { "id": "name", "label": "Full Name", "type": "text", "default": "Jane Doe" },
    { "id": "title", "label": "Job Title", "type": "text", "default": "Senior Solutions Architect" },
    { "id": "phone", "label": "Phone Number", "type": "text", "default": "+1 (555) 019-2834" },
    { "id": "email", "label": "Email Address", "type": "text", "default": "jane.doe@collabera.com" },
    { 
      "id": "entity", 
      "label": "Company Entity", 
      "type": "dropdown", 
      "options": ["Collabera LLC", "Collabera GTC"], 
      "default": "Collabera LLC" 
    },
    { "id": "logo", "label": "Company Logo URL", "type": "image", "default": "https://cdn.collabera.com/logos/collabera-main.png" },
    { "id": "accentColor", "label": "Accent Color", "type": "color", "default": "#0047AB" },
    { "id": "linkedin", "label": "LinkedIn Profile", "type": "url", "default": "https://linkedin.com/in/username" }
  ]
}
```

### Template Engine & Merge Pipeline:
1. **Placeholder Parsing:** Template HTML files contain token placeholders such as `{{name}}`, `{{title}}`, `{{phone}}`, `{{accentColor}}`.
2. **Conditional Blocks:** Supports entity-based conditional swaps (e.g., `{{#if entity == 'Collabera GTC'}}...{{/if}}`).
3. **Sidebar Rendering:** The right-hand edit panel reads the array of field objects and dynamically renders input controls (text inputs, color pickers, image uploader buttons, dropdown selects).

---

## 5. System Requirements & Scope

1. **Figma Template Ingestion & Porting:**
   - Extract visual hierarchy, precise padding/margins, color values, typography, and logo references from Figma.
   - Reconstruct each design strictly using standard email HTML tables with inline CSS.
2. **Landing Page Gallery:**
   - Responsive grid displaying visual previews of all active templates with quick "Select Template" actions.
3. **Editor Interface:**
   - Real-time reactivity: inputs in the sidebar update the `<iframe srcDoc>` HTML preview without lag.
4. **Image Upload & Management Integration:**
   - Integrated image uploader connected to Cloudinary / AWS S3 allowing users to upload headshots/logos and obtain hosted public URLs.
5. **Rich-Text Clipboard Export:**
   - Single-click copying using `navigator.clipboard.write([new ClipboardItem({ 'text/html': ..., 'text/plain': ... })])`.
6. **Cross-Client Validation:**
   - Automated & manual verification of exported HTML rendered in Gmail, Outlook Web, Outlook Desktop (Windows/Mac), and Apple Mail.

---

## 6. Recommended Technology Stack

| Layer | Recommended Technology | Purpose & Rationale |
|---|---|---|
| **Framework** | Next.js (React / TypeScript) | Fast page loads, structured layout system, server/client component splitting. |
| **App Styling** | Tailwind CSS | Modern styling for application shell and editor UI (strictly isolated from email templates). |
| **Preview Container** | `<iframe srcDoc>` | Standardized sandboxed iframe preventing parent app styles from leaking into signature HTML. |
| **Image Storage** | Cloudinary / AWS S3 | Generates permanent, secure, publicly accessible HTTPS image links. |
| **Copy Engine** | HTML Clipboard API (`ClipboardItem`) | Native rich-text clipboard formatting preservation across desktop applications. |
| **Deployment & Hosting** | Vercel / Netlify | CI/CD auto-deployments, SSL certificate provisioning, edge delivery. |

---

## 7. Execution Directives for Development

> "Use Figma designs as visual and dimensional references only. Rebuild every signature template as nested HTML tables with 100% inline CSS styles on every element—no flexbox, grid, external stylesheets, or CSS classes—ensuring complete cross-client compatibility (Outlook, Gmail, Apple Mail). Keep the landing page non-gated, displaying all templates in a gallery. Drive the sidebar form dynamically via JSON template schemas, embedding multi-entity switches (Collabera LLC vs Collabera GTC) directly into form inputs. Ensure image uploads produce public HTTPS URLs, and deliver signature output via a native rich-text Clipboard API write."
