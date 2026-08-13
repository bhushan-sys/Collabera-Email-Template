// template.js — Template Registry
// Each template lives in its own file under Res/templates/.
//
//  Load order in index.html:
//    1. Res/templates/template-1.js  → defines `template1`
//    2. Res/templates/template-2.js  → defines `template2`
//    3. template.js                  → builds `templates` array
//    4. app.js                       → consumes `templates`

const templates = [
    template1,   // Template 1 — Horizontal Brand Guidelines (Figma 767-1649)
    template2,   // Template 2 — Vertical Brand Guidelines (Figma 767-1813 / 765-1166)
    template3    // Template 3 — Horizontal Left Column Layout (Figma 765-1258 / 767-1744)
];
