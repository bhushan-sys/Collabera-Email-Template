// template.js — Template Registry
// Each template lives in its own file under Res/templates/.
// Add new entries here as additional templates are designed.
//
//  Load order in index.html:
//    1. Res/templates/template-1.js  → defines `template1`
//    2. template.js                  → builds `templates` array
//    3. app.js                       → consumes `templates`

const templates = [
    template1,   // Template 1 — Collabera Brand Guidelines (Figma 840-4547)
    // template2, template3 … added in upcoming prompts
];
