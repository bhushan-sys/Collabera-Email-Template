# Collabera Email Signature Templates — Design & Engineering Rules

This document establishes the mandatory design rules, email client technical constraints, and implementation guidelines for creating all current and future email signature templates in this repository.

---

## 1. Email Client Technical Constraints (Microsoft Outlook & Gmail)

1. **SVG to PNG Conversion**:
   - Microsoft Outlook (Desktop, New Outlook, OWA) strips `<img src="...svg">` tags and raw SVG data URLs from clipboard payloads.
   - All templates MUST rely on `getHtmlWithPngImages()` in `app.js` to convert SVG elements into `2x Retina` PNG Base64 Data URLs (`data:image/png;base64,...`) prior to clipboard copying or HTML file export.

2. **Aspect Ratio Enforcement**:
   - Always preserve natural vector aspect ratios for all brand assets.
   - `Collabera Logo.svg`: Natural size `230 × 33` (`6.97 : 1` ratio). HTML tags MUST use `width="230" height="33"` (never `180 × 32`).
   - `Women Workplace.svg`: `56 × 50` (`1.12 : 1`).
   - `Certification Badge.svg`: `40 × 68` (`0.588 : 1`).
   - `President's Club`: `78 × 78` (`1 : 1`).
   - `WLAB Full.svg`: `163 × 69` (`2.36 : 1`).
   - `LinkedIn Icon`: `20 × 20` (`1 : 1`).

3. **Email-Safe CSS & Colors**:
   - Outlook's WordHTML engine strips `rgba(...)` CSS color syntax and `<div>` height styles inside table cells.
   - Divider lines MUST use solid hex codes (e.g. `#B4BEBF`, the 30% opacity equivalent of `#05262B` on white background) and native table cell borders (`border-left: 1px solid #B4BEBF;`).

---

## 2. Layout & Typography Rules

1. **Left Column Width (Profile / Name / Title)**:
   - Fixed width MUST be set to at least `175px` (`width: 175px; min-width: 175px;`) to handle long names (*"Bhushan Agashe"*) and titles (*"Team Lead - Graphic Design"*) without awkward line wrapping.

2. **Vertical Alignment**:
   - Apply `valign="middle"` on primary left/right table cells and logo cells to achieve balanced vertical centering matching Figma designs.

3. **Vertical Spacing & Breathing Room**:
   - Always maintain brand-compliant vertical padding (e.g. `12px` to `14px` under logos) so contact text (`M:`, `L:`, `website`) never collides directly against logo graphics when badges are toggled off.

4. **Divider Line Responsiveness**:
   - Vertical lines MUST be set on table cells (`<td valign="middle" style="border-left: 1px solid #B4BEBF;">&nbsp;</td>`) so their length automatically expands and contracts dynamically with table row height as logos are added or removed.

---

## 3. Template Consolidation & Badges

1. **Unified Handlebars Templates**:
   - Do NOT create separate files for badge-on vs badge-off variations. Consolidate them into a single template file with Handlebars conditional logic (`{{#if showWomenWp == 'true'}}...{{/if}}`).

2. **Preview Frame Sizing**:
   - Reset iframe dimensions (`previewFrame.style.width = '10px'`) BEFORE measuring `table.getBoundingClientRect().width` in `app.js` to eliminate compounding width accumulation on click events.
   - Use `width: fit-content` on `.preview-canvas` in `styles.css` so the preview card wraps snugly around exact table bounds without blank right margins.

---

## 4. Documentation & Logging

1. **Error Log File (`Error Log File.txt`)**:
   - Continuously append every modification, root cause, and bug fix to `Error Log File.txt` for auditability and progress tracking.
