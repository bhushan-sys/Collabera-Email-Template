// app.js — Collabera Email Signature Studio

document.addEventListener('DOMContentLoaded', () => {

    // ── DOM refs ──────────────────────────────────────────────
    const previewFrame  = document.getElementById('preview-frame');
    const copyBtn       = document.getElementById('copy-btn');
    const downloadBtn   = document.getElementById('download-btn');
    const applyBtn      = document.getElementById('apply-btn');
    const toast         = document.getElementById('toast');
    const toastMessage  = document.getElementById('toast-message');

    // ── State ─────────────────────────────────────────────────
    const activeTemplate = templates[0];
    let currentFormData  = {};
    let selectedPlatform = 'outlook';   // default

    // ─────────────────────────────────────────────────────────
    // 1. ACCORDION — collapse / expand sections
    // ─────────────────────────────────────────────────────────
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const targetId = header.getAttribute('data-target');
            const panel    = document.getElementById(targetId);
            const isOpen   = panel.classList.contains('open');

            if (isOpen) {
                panel.classList.remove('open');
                header.setAttribute('aria-expanded', 'false');
            } else {
                panel.classList.add('open');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ─────────────────────────────────────────────────────────
    // 2. PLATFORM SELECTOR
    // ─────────────────────────────────────────────────────────
    document.querySelectorAll('.platform-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.platform-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedPlatform = btn.getAttribute('data-platform');
            // Platform selection stored — will be used in upcoming prompts
        });
    });

    // ─────────────────────────────────────────────────────────
    // 3. PHONE NUMBER VALIDATION
    // Only digits, spaces, +, (, ), - are allowed.
    // Anything else → red border + error message.
    // ─────────────────────────────────────────────────────────
    const mobileInput = document.getElementById('mobile');
    const mobileError = document.getElementById('mobile-error');

    function validatePhone(value) {
        // Allow empty (not required) — only validate when non-empty
        if (value === '') return true;
        // Allow digits, spaces, +, (, ), -, dots — reject any letters
        return /^[0-9\s+()\-.]+$/.test(value);
    }

    if (mobileInput) {
        mobileInput.addEventListener('input', () => {
            const valid = validatePhone(mobileInput.value);
            if (!valid) {
                mobileInput.classList.add('field-input--error');
                if (mobileError) mobileError.classList.add('visible');
            } else {
                mobileInput.classList.remove('field-input--error');
                if (mobileError) mobileError.classList.remove('visible');
            }
            // Still update preview — show what was typed
            currentFormData['mobile'] = mobileInput.value;
            updatePreview();
        });
    }

    // ─────────────────────────────────────────────────────────
    // 3. LOGO TILE SELECTOR
    // ─────────────────────────────────────────────────────────
    const logoMap = {
        'pc-badge': 'showPcBadge',
        'cert-badge': 'showCertBadge',
        'women-wp': 'showWomenWp',
        'wlab': 'showWlab'
    };

    document.querySelectorAll('.logo-tile').forEach(tile => {
        tile.addEventListener('click', () => {
            const isSelected = tile.classList.toggle('selected');
            const logoKey = tile.getAttribute('data-logo');
            const formKey = logoMap[logoKey];
            if (formKey) {
                currentFormData[formKey] = isSelected ? 'true' : 'false';
                updatePreview();
            }
        });
    });

    // ─────────────────────────────────────────────────────────
    // 4. FORM → LIVE PREVIEW (real-time update)
    // ─────────────────────────────────────────────────────────
    const fieldIds = ['name', 'title', 'mobile', 'location', 'email', 'linkedin', 'entity'];

    // Initialise currentFormData from defaults
    fieldIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) currentFormData[id] = el.value;
    });

    // Also include non-field template tokens (logos off by default)
    currentFormData.primaryColor   = '#05262B';
    currentFormData.secondaryColor = '#AA9269';
    currentFormData.website        = 'www.collabera.com';
    currentFormData.showPcBadge    = 'false';
    currentFormData.showCertBadge  = 'false';
    currentFormData.showWomenWp    = 'false';
    currentFormData.showWlab       = 'false';

    // Attach input listeners (mobile handled separately above for validation)
    fieldIds.forEach(id => {
        if (id === 'mobile') return; // already handled above with validation
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                currentFormData[id] = el.value;
                updatePreview();
            });
        }
    });

    // ─────────────────────────────────────────────────────────
    // 5. TEMPLATE ENGINE
    // ─────────────────────────────────────────────────────────
    function compileTemplate(html, data) {
        let result = html;

        // {{#if key == 'value'}} ... {{/if}}
        result = result.replace(
            /{{#if\s+([a-zA-Z0-9_]+)\s*==\s*'([^']+)'\s*}}([\s\S]*?){{\/if}}/g,
            (_, key, val, content) => (data[key] === val ? content : '')
        );

        // {{#if key != ''}} ... {{/if}}
        result = result.replace(
            /{{#if\s+([a-zA-Z0-9_]+)\s*!=\s*'([^']*)'\s*}}([\s\S]*?){{\/if}}/g,
            (_, key, notVal, content) =>
                (data[key] !== notVal && data[key] !== undefined && data[key] !== null && data[key] !== '')
                    ? content : ''
        );

        // Leftover tags
        result = result.replace(/{{\/?\#?if[^}]*}}/g, '');

        // Simple tokens {{key}}
        result = result.replace(/{{([a-zA-Z0-9_]+)}}/g, (_, key) =>
            data[key] !== undefined ? data[key] : ''
        );

        return result;
    }

    // ─────────────────────────────────────────────────────────
    // 6. UPDATE PREVIEW IFRAME
    // ─────────────────────────────────────────────────────────
    function updatePreview() {
        const compiled = compileTemplate(activeTemplate.html, currentFormData);

        const doc = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@1,6..72,300;1,6..72,400&family=Red+Hat+Display:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #ffffff;
            font-family: 'Red Hat Display', Arial, sans-serif;
        }
    </style>
</head>
<body>
    ${compiled}
</body>
</html>`;

        // Write directly into the iframe document for maximum compatibility
        const iframeDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(doc);
        iframeDoc.close();

        // Auto-resize to content — eliminates scrollbar
        previewFrame.style.height = '0';
        requestAnimationFrame(() => {
            const h = previewFrame.contentDocument.documentElement.scrollHeight
                   || previewFrame.contentDocument.body.scrollHeight;
            previewFrame.style.height = h + 'px';
        });
    }

    // ─────────────────────────────────────────────────────────
    // 7. COPY TO CLIPBOARD
    // ─────────────────────────────────────────────────────────
    async function copySignature() {
        try {
            const html = compileTemplate(activeTemplate.html, currentFormData);
            const loc  = currentFormData.location || '';
            const plain = [
                currentFormData.name   || '',
                currentFormData.title  || '',
                `M: ${currentFormData.mobile || ''}`,
                loc ? `L: ${loc}` : '',
                currentFormData.website || 'www.collabera.com',
                currentFormData.entity  || 'Collabera',
            ].filter(Boolean).join('\n');

            if (navigator.clipboard && window.ClipboardItem) {
                await navigator.clipboard.write([
                    new ClipboardItem({
                        'text/html':  new Blob([html],  { type: 'text/html'  }),
                        'text/plain': new Blob([plain], { type: 'text/plain' }),
                    })
                ]);
                showToast('Signature copied! Paste directly into Outlook or Gmail.');
            } else {
                // Fallback
                const div = document.createElement('div');
                div.contentEditable = 'true';
                div.style.cssText = 'position:fixed;left:-9999px';
                div.innerHTML = html;
                document.body.appendChild(div);
                const range = document.createRange();
                range.selectNodeContents(div);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                document.execCommand('copy');
                document.body.removeChild(div);
                showToast('Signature copied (fallback)!');
            }
        } catch (e) {
            console.error('Clipboard error:', e);
            showToast('Could not copy — try "Export HTML" instead.');
        }
    }

    // ─────────────────────────────────────────────────────────
    // 8. EXPORT / DOWNLOAD HTML
    // ─────────────────────────────────────────────────────────
    function downloadHTML() {
        const html = compileTemplate(activeTemplate.html, currentFormData);
        const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = `collabera-signature-${(currentFormData.name || 'user').toLowerCase().replace(/\s+/g, '-')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('HTML file downloaded!');
    }

    // ─────────────────────────────────────────────────────────
    // 9. TOAST
    // ─────────────────────────────────────────────────────────
    function showToast(msg) {
        toastMessage.textContent = msg;
        toast.classList.remove('hidden');
        // force reflow so transition fires
        toast.getBoundingClientRect();
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.classList.add('hidden'), 320);
        }, 3500);
    }

    // ─────────────────────────────────────────────────────────
    // 10. URL PARAM PRE-FILL
    // ─────────────────────────────────────────────────────────
    function loadFromURL() {
        const params = new URLSearchParams(window.location.search);
        fieldIds.forEach(id => {
            const val = params.get(id);
            if (val !== null) {
                const el = document.getElementById(id);
                if (el) {
                    el.value = val;
                    currentFormData[id] = val;
                }
            }
        });
    }

    // ─────────────────────────────────────────────────────────
    // EVENT LISTENERS
    // ─────────────────────────────────────────────────────────
    copyBtn.addEventListener('click', copySignature);
    downloadBtn.addEventListener('click', downloadHTML);
    applyBtn.addEventListener('click', copySignature);

    // ─────────────────────────────────────────────────────────
    // INIT
    // ─────────────────────────────────────────────────────────
    loadFromURL();
    updatePreview();

});
