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
    // 1. ACCORDION — collapse / expand sections
    // ─────────────────────────────────────────────────────────
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', (e) => {
            // Ignore click if user interacted directly with the toggle-switch checkbox
            if (e.target.closest('.toggle-switch')) return;

            const targetId = header.getAttribute('data-target');
            const panel    = document.getElementById(targetId);
            const section  = header.closest('.accordion-section');
            const isOpen   = panel.classList.contains('open');

            if (targetId === 'panel-profile') {
                const profileToggle = document.getElementById('profile-toggle');
                if (isOpen) {
                    panel.classList.remove('open');
                    header.setAttribute('aria-expanded', 'false');
                    if (section) section.classList.remove('open');
                    if (profileToggle) profileToggle.checked = false;
                    currentFormData['showProfileImage'] = 'false';
                } else {
                    panel.classList.add('open');
                    header.setAttribute('aria-expanded', 'true');
                    if (section) section.classList.add('open');
                    if (profileToggle) profileToggle.checked = true;
                    currentFormData['showProfileImage'] = 'true';
                }
                updatePreview();
                return;
            }

            if (isOpen) {
                panel.classList.remove('open');
                header.setAttribute('aria-expanded', 'false');
                if (section) section.classList.remove('open');
            } else {
                panel.classList.add('open');
                header.setAttribute('aria-expanded', 'true');
                if (section) section.classList.add('open');
            }
        });
    });

    // ─────────────────────────────────────────────────────────
    // 2. PROFILE IMAGE UPLOAD & TOGGLE (SECTION 02)
    // ─────────────────────────────────────────────────────────
    const DEFAULT_EXAMPLE_IMAGE = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80';

    const profileToggle = document.getElementById('profile-toggle');
    const dropzone = document.getElementById('upload-dropzone');
    const profileInput = document.getElementById('profile-upload-input');
    const uploadPlaceholder = document.getElementById('upload-placeholder');
    const uploadPreviewState = document.getElementById('upload-preview-state');
    const uploadedProfileImgSvg = document.getElementById('uploaded-profile-img-svg');
    const uploadRemoveBtn = document.getElementById('upload-remove-btn');

    let currentProfileImageData = '';
    let isCustomUpload = false;

    function updateDropzonePreview(src) {
        if (uploadedProfileImgSvg) {
            uploadedProfileImgSvg.setAttribute('href', src || '');
        }
    }

    if (profileToggle) {
        profileToggle.addEventListener('change', () => {
            const isEnabled = profileToggle.checked;
            const panel = document.getElementById('panel-profile');
            const header = document.querySelector('[data-target="panel-profile"]');
            const section = document.getElementById('section-profile');

            if (isEnabled) {
                if (panel) panel.classList.add('open');
                if (header) header.setAttribute('aria-expanded', 'true');
                if (section) section.classList.add('open');
                if (dropzone) dropzone.classList.remove('disabled');
                
                if (!isCustomUpload) {
                    currentFormData['profileImage'] = DEFAULT_EXAMPLE_IMAGE;
                    if (uploadPlaceholder) uploadPlaceholder.classList.remove('hidden');
                    if (uploadPreviewState) uploadPreviewState.classList.add('hidden');
                } else {
                    currentFormData['profileImage'] = currentProfileImageData;
                    updateDropzonePreview(currentProfileImageData);
                    if (uploadPlaceholder) uploadPlaceholder.classList.add('hidden');
                    if (uploadPreviewState) uploadPreviewState.classList.remove('hidden');
                }
                currentFormData['showProfileImage'] = 'true';
            } else {
                if (panel) panel.classList.remove('open');
                if (header) header.setAttribute('aria-expanded', 'false');
                if (section) section.classList.remove('open');
                if (dropzone) dropzone.classList.add('disabled');
                currentFormData['showProfileImage'] = 'false';
            }
            updatePreview();
        });
    }

    if (dropzone && profileInput) {
        dropzone.addEventListener('click', (e) => {
            if (e.target.closest('#upload-remove-btn')) return;
            if (profileToggle && !profileToggle.checked) return;
            profileInput.click();
        });

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (profileToggle && profileToggle.checked) {
                dropzone.classList.add('dragover');
            }
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('dragover');
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            if (profileToggle && !profileToggle.checked) return;
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleProfileImage(e.dataTransfer.files[0]);
            }
        });

        profileInput.addEventListener('change', () => {
            if (profileInput.files && profileInput.files[0]) {
                handleProfileImage(profileInput.files[0]);
            }
        });
    }

    if (uploadRemoveBtn) {
        uploadRemoveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isCustomUpload = false;
            currentProfileImageData = '';
            currentFormData['profileImage'] = DEFAULT_EXAMPLE_IMAGE;
            if (uploadPlaceholder) uploadPlaceholder.classList.remove('hidden');
            if (uploadPreviewState) uploadPreviewState.classList.add('hidden');
            updateDropzonePreview('');
            if (profileInput) profileInput.value = '';
            updatePreview();
            showToast('Custom photo removed! Example photo restored.');
        });
    }

    function handleProfileImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            isCustomUpload = true;
            currentProfileImageData = e.target.result;
            currentFormData['profileImage'] = currentProfileImageData;
            updateDropzonePreview(currentProfileImageData);
            if (uploadPlaceholder) uploadPlaceholder.classList.add('hidden');
            if (uploadPreviewState) uploadPreviewState.classList.remove('hidden');
            updatePreview();
            showToast('Custom profile image uploaded!');
        };
        reader.readAsDataURL(file);
    }

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
        const mobileWrap = mobileInput.closest('.floating-field') || mobileInput;
        mobileInput.addEventListener('input', () => {
            const valid = validatePhone(mobileInput.value);
            if (!valid) {
                mobileWrap.classList.add('floating-field--error');
                if (mobileError) mobileError.classList.add('visible');
            } else {
                mobileWrap.classList.remove('floating-field--error');
                if (mobileError) mobileError.classList.remove('visible');
            }
            // Still update preview — show what was typed
            currentFormData['mobile'] = mobileInput.value;
            updatePreview();
        });
    }

    const entitySelect = document.getElementById('entity');
    if (entitySelect) {
        entitySelect.addEventListener('change', () => {
            if (entitySelect.value) {
                entitySelect.classList.add('has-value');
            } else {
                entitySelect.classList.remove('has-value');
            }
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
    currentFormData.showProfileImage = 'false';
    currentFormData.profileImage   = '';
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
        let prev = '';

        // Process conditional blocks iteratively to handle nested blocks safely
        while (prev !== result) {
            prev = result;

            // {{#if key == 'value'}} ... {{/if}}
            result = result.replace(
                /{{#if\s+([a-zA-Z0-9_]+)\s*==\s*'([^']+)'\s*}}((?:(?!{{#if|{{\/if)[\s\S])*){{\/if}}/g,
                (_, key, val, content) => (data[key] === val ? content : '')
            );

            // {{#if key != ''}} ... {{/if}}
            result = result.replace(
                /{{#if\s+([a-zA-Z0-9_]+)\s*!=\s*'([^']*)'\s*}}((?:(?!{{#if|{{\/if)[\s\S])*){{\/if}}/g,
                (_, key, notVal, content) =>
                    (data[key] !== notVal && data[key] !== undefined && data[key] !== null && data[key] !== '')
                        ? content : ''
            );
        }

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
        html, body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: #ffffff;
            font-family: 'Red Hat Display', Arial, sans-serif;
        }
    </style>
</head>
<body>
    <svg width="0" height="0" style="position: absolute; pointer-events: none;">
        <defs>
            <clipPath id="avatar-barrel-mask" clipPathUnits="objectBoundingBox" transform="scale(0.00869565, 0.00877193)">
                <path d="M63.5184 0.0135664C78.3754 0.201684 93.3218 2.38289 108.17 6.64355C112.6 21.8135 114.809 37.5861 114.891 52.0951H114.895C114.93 55.1998 114.962 58.3047 115 61.4091L114.997 61.4094C114.942 76.6771 112.747 92.0467 108.315 107.312C93.3767 111.623 77.8575 113.818 63.5184 113.986V114H51.1323V113.982C36.8901 113.783 21.5007 111.588 6.68277 107.312C2.54068 93.0458 0.352333 78.6885 0.0393889 64.4085H0V52.0951H0.00434208C0.0870449 37.5861 2.29621 21.8135 6.72619 6.64355C21.4926 2.40634 36.3561 0.225842 51.1323 0.016958V0H63.5184V0.0135664Z" />
            </clipPath>
        </defs>
    </svg>
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
            previewFrame.style.height = (h + 4) + 'px';
        });
    }

    // ─────────────────────────────────────────────────────────
    // 7. COPY TO CLIPBOARD
    // ─────────────────────────────────────────────────────────
    async function copySignature() {
        try {
            const html = compileTemplate(activeTemplate.html, currentFormData);

            // Create temporary container element for clean selection copy
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.left = '-9999px';
            container.style.top = '-9999px';
            container.style.opacity = '0';
            container.style.pointerEvents = 'none';
            container.innerHTML = html;
            document.body.appendChild(container);

            // Select container contents
            const range = document.createRange();
            range.selectNodeContents(container);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            // Execute copy command - creates native HTML clipboard payload
            let successful = false;
            try {
                successful = document.execCommand('copy');
            } catch (cmdErr) {
                console.warn('execCommand copy failed:', cmdErr);
            }

            selection.removeAllRanges();
            document.body.removeChild(container);

            if (successful) {
                showToast('Signature copied! Paste directly into Gmail or Outlook.');
            } else if (navigator.clipboard && window.ClipboardItem) {
                // Fallback to Clipboard API with text/html Blob only (prevents Gmail double-paste)
                await navigator.clipboard.write([
                    new ClipboardItem({
                        'text/html': new Blob([html], { type: 'text/html' })
                    })
                ]);
                showToast('Signature copied! Paste directly into Gmail or Outlook.');
            } else {
                showToast('Could not copy — try "Export HTML" instead.');
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
