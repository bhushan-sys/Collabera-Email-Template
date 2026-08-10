// app.js - Collabera Email Signature Studio Logic

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const templateTabsContainer = document.getElementById('template-tabs');
    const formContainer = document.getElementById('signature-form');
    const previewFrame = document.getElementById('preview-frame');
    const canvasCard = document.getElementById('canvas-card');
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');
    const viewDesktopBtn = document.getElementById('view-desktop-btn');
    const viewMobileBtn = document.getElementById('view-mobile-btn');
    const activeEntityBadge = document.getElementById('badge-text');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    // App State
    let activeTemplate = templates[0];
    let currentFormData = {};

    // 1. Render Template Selector Tabs
    function renderTemplateTabs() {
        templateTabsContainer.innerHTML = '';
        templates.forEach((tmpl) => {
            const btn = document.createElement('button');
            btn.className = `tab-btn ${tmpl.id === activeTemplate.id ? 'active' : ''}`;
            btn.textContent = tmpl.name;
            btn.title = tmpl.description;
            btn.addEventListener('click', () => switchTemplate(tmpl.id));
            templateTabsContainer.appendChild(btn);
        });
    }

    // 2. Switch Template
    function switchTemplate(templateId) {
        const found = templates.find(t => t.id === templateId);
        if (!found) return;
        activeTemplate = found;
        renderTemplateTabs();
        buildForm();
        updatePreview();
    }

    // 3. Build Dynamic Form from Schema
    function buildForm() {
        formContainer.innerHTML = '';
        currentFormData = {};

        // Group fields by category
        const groups = {};
        activeTemplate.fields.forEach(field => {
            const grp = field.group || "General";
            if (!groups[grp]) groups[grp] = [];
            groups[grp].push(field);
        });

        Object.keys(groups).forEach(grpName => {
            const section = document.createElement('div');
            section.className = 'form-section';

            const sectionTitle = document.createElement('h3');
            sectionTitle.className = 'section-title';
            sectionTitle.textContent = grpName;
            section.appendChild(sectionTitle);

            groups[grpName].forEach(field => {
                const formGroup = document.createElement('div');
                formGroup.className = 'form-group';

                const label = document.createElement('label');
                label.setAttribute('for', field.id);
                label.textContent = field.label;
                formGroup.appendChild(label);

                let input;
                if (field.type === 'dropdown') {
                    input = document.createElement('select');
                    field.options.forEach(opt => {
                        const option = document.createElement('option');
                        option.value = opt;
                        option.textContent = opt;
                        if (opt === field.default) option.selected = true;
                        input.appendChild(option);
                    });
                } else if (field.type === 'color') {
                    const colorWrapper = document.createElement('div');
                    colorWrapper.className = 'color-input-wrapper';
                    
                    input = document.createElement('input');
                    input.type = 'color';
                    input.value = field.default;

                    const colorText = document.createElement('input');
                    colorText.type = 'text';
                    colorText.className = 'color-text-input';
                    colorText.value = field.default;

                    input.addEventListener('input', () => {
                        colorText.value = input.value;
                        updatePreview();
                    });
                    colorText.addEventListener('input', () => {
                        if (/^#[0-9A-F]{6}$/i.test(colorText.value)) {
                            input.value = colorText.value;
                            updatePreview();
                        }
                    });

                    colorWrapper.appendChild(input);
                    colorWrapper.appendChild(colorText);
                    formGroup.appendChild(colorWrapper);
                    
                    // Setup initial data state
                    currentFormData[field.id] = field.default;
                    formContainer.appendChild(formGroup);
                    return;
                } else if (field.type === 'image') {
                    const imgWrapper = document.createElement('div');
                    imgWrapper.className = 'image-input-wrapper';

                    input = document.createElement('input');
                    input.type = 'text';
                    input.placeholder = 'https://...';
                    input.value = field.default;

                    const uploadBtn = document.createElement('label');
                    uploadBtn.className = 'upload-file-btn';
                    uploadBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Upload`;
                    
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = 'image/*';
                    fileInput.style.display = 'none';

                    fileInput.addEventListener('change', (e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (evt) => {
                                input.value = evt.target.result;
                                updatePreview();
                            };
                            reader.readAsDataURL(file);
                        }
                    });

                    uploadBtn.appendChild(fileInput);
                    imgWrapper.appendChild(input);
                    imgWrapper.appendChild(uploadBtn);
                    formGroup.appendChild(imgWrapper);

                    input.id = field.id;
                    input.name = field.id;
                    input.addEventListener('input', updatePreview);

                    currentFormData[field.id] = field.default;
                    section.appendChild(formGroup);
                    return;
                } else {
                    input = document.createElement('input');
                    input.type = 'text';
                    input.value = field.default;
                }

                input.id = field.id;
                input.name = field.id;
                input.addEventListener('input', updatePreview);

                formGroup.appendChild(input);
                section.appendChild(formGroup);

                currentFormData[field.id] = field.default;
            });

            formContainer.appendChild(section);
        });

        // Set up brand preset color pill click handlers
        document.querySelectorAll('.preset-pill').forEach(pill => {
            pill.onclick = () => {
                const pColor = pill.getAttribute('data-primary');
                const sColor = pill.getAttribute('data-secondary');

                const primaryInput = document.getElementById('primaryColor');
                const secondaryInput = document.getElementById('secondaryColor');

                if (primaryInput) {
                    primaryInput.value = pColor;
                    const txt = primaryInput.nextElementSibling;
                    if (txt) txt.value = pColor;
                }
                if (secondaryInput) {
                    secondaryInput.value = sColor;
                    const txt = secondaryInput.nextElementSibling;
                    if (txt) txt.value = sColor;
                }
                updatePreview();
            };
        });
    }

    // 4. Template Engine: Replace tokens & handle {{#if key == 'val'}}...{{/if}}
    function compileTemplate(templateHTML, data) {
        let result = templateHTML;

        // Handle inequality / equality conditional blocks
        // Regex handles: {{#if key == 'value'}} ... {{/if}}
        const ifEqualRegex = /{{#if\s+([a-zA-Z0-9_]+)\s*==\s*'([^']+)'\s*}}([\s\S]*?){{\/if}}/g;
        result = result.replace(ifEqualRegex, (match, key, expectedValue, content) => {
            return (data[key] === expectedValue) ? content : '';
        });

        // Regex handles: {{#if key != ''}} ... {{/if}}
        const ifNotEqualRegex = /{{#if\s+([a-zA-Z0-9_]+)\s*!=\s*'([^']*)'\s*}}([\s\S]*?){{\/if}}/g;
        result = result.replace(ifNotEqualRegex, (match, key, notExpectedValue, content) => {
            return (data[key] !== notExpectedValue && data[key] !== undefined && data[key] !== null) ? content : '';
        });

        // Clean up any leftover unparsed template conditional tags {{#if...}} or {{/if}}
        result = result.replace(/{{\/?#?if[^}]*}}/g, '');

        // Replace simple tokens {{key}}
        const varRegex = /{{([a-zA-Z0-9_]+)}}/g;
        result = result.replace(varRegex, (match, key) => {
            return data[key] !== undefined ? data[key] : '';
        });

        return result;
    }

    // 5. Update Preview Frame & Entity Badge
    function updatePreview() {
        // Collect current input data
        activeTemplate.fields.forEach(field => {
            const input = document.getElementById(field.id);
            if (input) {
                currentFormData[field.id] = input.value;
            }
        });

        // Update Entity Badge in Header
        if (currentFormData.entity && activeEntityBadge) {
            activeEntityBadge.textContent = currentFormData.entity;
        }

        // Compile HTML
        const rawCompiledHTML = compileTemplate(activeTemplate.html, currentFormData);

        // Standardized document wrapper for iframe rendering
        const fullDocStr = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@1,6..72,300;400&family=Red+Hat+Display:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        body { margin: 0; padding: 24px; background: #ffffff; font-family: 'Red Hat Display', 'Inter', Arial, sans-serif; display: flex; align-items: flex-start; justify-content: flex-start; }
    </style>
</head>
<body>
    ${rawCompiledHTML}
</body>
</html>`;

        previewFrame.srcdoc = fullDocStr;
    }

    // 6. Copy Rich Text Signature to Clipboard
    async function copySignatureToClipboard() {
        try {
            const rawCompiledHTML = compileTemplate(activeTemplate.html, currentFormData);
            
            // Generate clean plain-text fallback
            const plainText = `${currentFormData.name || ''}\n${currentFormData.title || ''} | ${currentFormData.department || ''}\n${currentFormData.entity || 'Collabera'}\nMobile: ${currentFormData.mobile || ''}\nEmail: ${currentFormData.email || ''}\nWebsite: ${currentFormData.website || 'https://www.collabera.com'}`;

            const blobHtml = new Blob([rawCompiledHTML], { type: "text/html" });
            const blobText = new Blob([plainText], { type: "text/plain" });

            if (navigator.clipboard && window.ClipboardItem) {
                const data = new ClipboardItem({
                    "text/html": blobHtml,
                    "text/plain": blobText
                });
                await navigator.clipboard.write([data]);
                showToast("Signature copied to clipboard! Paste directly into Outlook or Gmail.");
            } else {
                // Fallback copy method
                const tempDiv = document.createElement("div");
                tempDiv.contentEditable = "true";
                tempDiv.style.position = "fixed";
                tempDiv.style.left = "-9999px";
                tempDiv.innerHTML = rawCompiledHTML;
                document.body.appendChild(tempDiv);
                
                const range = document.createRange();
                range.selectNodeContents(tempDiv);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand("copy");
                document.body.removeChild(tempDiv);

                showToast("Signature copied to clipboard (Rich Text fallback)!");
            }
        } catch (err) {
            console.error("Clipboard write error:", err);
            showToast("Failed to write to clipboard automatically. Check console.");
        }
    }

    // 7. Export HTML File Download
    function downloadHTMLFile() {
        const rawCompiledHTML = compileTemplate(activeTemplate.html, currentFormData);
        const blob = new Blob([rawCompiledHTML], { type: "text/html;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `collabera-signature-${(currentFormData.name || 'user').toLowerCase().replace(/\s+/g, '-')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast("Signature HTML file downloaded!");
    }

    // 9. Load State from URL Query Parameters
    function loadStateFromURL() {
        const params = new URLSearchParams(window.location.search);
        const tmplParam = params.get('tmpl');
        if (tmplParam) {
            const found = templates.find(t => t.id === tmplParam);
            if (found) activeTemplate = found;
        }

        renderTemplateTabs();
        buildForm();

        // Populate fields from URL params
        let hasCustomParams = false;
        activeTemplate.fields.forEach(field => {
            const val = params.get(field.id);
            if (val !== null) {
                const input = document.getElementById(field.id);
                if (input) {
                    input.value = val;
                    currentFormData[field.id] = val;
                    hasCustomParams = true;
                }
            }
        });

        updatePreview();
    }

    // 10. Toast Handler
    function showToast(msg) {
        if (msg) toastMessage.textContent = msg;
        toast.classList.remove('hidden');
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.classList.add('hidden'), 300);
        }, 3500);
    }

    // 11. Viewport Desktop / Mobile Mode Toggles
    viewDesktopBtn.addEventListener('click', () => {
        viewDesktopBtn.classList.add('active');
        viewMobileBtn.classList.remove('active');
        canvasCard.classList.remove('mobile-view');
    });

    viewMobileBtn.addEventListener('click', () => {
        viewMobileBtn.classList.add('active');
        viewDesktopBtn.classList.remove('active');
        canvasCard.classList.add('mobile-view');
    });

    // Event Listeners
    copyBtn.addEventListener('click', copySignatureToClipboard);
    downloadBtn.addEventListener('click', downloadHTMLFile);

    // Initial App Setup
    loadStateFromURL();
});
