// template.js - Collabera Email Signature Templates & Schemas

const templates = [
    {
        id: "figma-brand-guidelines",
        name: "Figma Brand Guidelines",
        description: "Exact 1:1 implementation of the Collabera Brand Guidelines from Figma (Newsreader italic name, Red Hat Display text, gold accent #AA9269, and legal footer).",
        fields: [
            { id: "name", label: "Full Name", type: "text", default: "Bhushan Agashe", group: "Personal Info" },
            { id: "title", label: "Job Title", type: "text", default: "Team Lead - Graphic Design", group: "Personal Info" },
            { id: "mobile", label: "Mobile Number", type: "text", default: "8856040953", group: "Contact Info" },
            { id: "email", label: "Email Address", type: "text", default: "bhushan.agashe@collabera.com", group: "Contact Info" },
            { id: "location", label: "Office Location", type: "text", default: "Vadodara", group: "Contact Info" },
            { 
                id: "entity", 
                label: "Company Entity", 
                type: "dropdown", 
                options: ["Collabera LLC", "Collabera GTC", "Collabera Digital"], 
                default: "Collabera LLC",
                group: "Branding & Entity" 
            },
            { id: "logoUrl", label: "Collabera Logo Image URL", type: "image", default: "https://raw.githubusercontent.com/bhushan-sys/Collabera-Email-Template/main/Res/Collabera%20Logo.svg", group: "Branding & Entity" },
            { id: "primaryColor", label: "Primary Color", type: "color", default: "#05262B", group: "Branding & Entity" },
            { id: "secondaryColor", label: "Accent Gold Color", type: "color", default: "#AA9269", group: "Branding & Entity" },
            { id: "showFeedback", label: "Show Feedback & Privacy Footer", type: "dropdown", options: ["Yes", "No"], default: "Yes", group: "Social & Legal" }
        ],
        html: `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Red Hat Display', Arial, sans-serif; font-size: 16px; color: {{primaryColor}}; line-height: 1.4; width: 100%; max-width: 516px; text-align: left; background-color: #ffffff;">
    <!-- Name & Designation -->
    <tr>
        <td style="padding-bottom: 16px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td style="font-family: 'Newsreader Display', 'Newsreader', Georgia, 'Times New Roman', serif; font-size: 32px; font-style: italic; font-weight: 300; color: {{primaryColor}}; line-height: 1.15; padding-bottom: 5px; word-wrap: break-word;">
                        {{name}}
                    </td>
                </tr>
                <tr>
                    <td style="font-family: 'Red Hat Display', Arial, sans-serif; font-size: 16px; font-weight: 700; color: {{secondaryColor}}; line-height: 1.2; word-wrap: break-word;">
                        {{title}}
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Contact Info Section -->
    <tr>
        <td style="padding-bottom: 20px;">
            <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Red Hat Display', Arial, sans-serif; font-size: 16px; color: {{primaryColor}}; line-height: 1.5;">
                {{#if mobile != ''}}
                <tr>
                    <td style="padding-bottom: 2px;">
                        <span style="color: {{primaryColor}}; font-size: 16px; font-family: 'Red Hat Display', Arial, sans-serif; font-weight: 700; word-wrap: break-word;">Mobile:</span><span style="color: {{primaryColor}}; font-size: 16px; font-family: 'Red Hat Display', Arial, sans-serif; font-weight: 400; word-wrap: break-word;"> {{mobile}}</span>
                    </td>
                </tr>
                {{/if}}
                {{#if email != ''}}
                <tr>
                    <td style="padding-bottom: 2px;">
                        <a href="mailto:{{email}}" style="color: {{primaryColor}}; font-size: 16px; font-family: 'Red Hat Display', Arial, sans-serif; font-weight: 400; word-wrap: break-word; text-decoration: none;">{{email}}</a>
                    </td>
                </tr>
                {{/if}}
                {{#if location != ''}}
                <tr>
                    <td>
                        <span style="color: {{primaryColor}}; font-size: 16px; font-family: 'Red Hat Display', Arial, sans-serif; font-weight: 400; word-wrap: break-word;">{{location}}</span>
                    </td>
                </tr>
                {{/if}}
            </table>
        </td>
    </tr>

    <!-- Collabera Logo Image -->
    <tr>
        <td style="padding-bottom: 20px;">
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td valign="middle">
                        <img src="{{logoUrl}}" alt="Collabera Logo" width="230" height="33" style="display: block; width: 230px; height: 33px; border: 0; outline: none; text-decoration: none;" />
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Divider Line -->
    <tr>
        <td style="padding-bottom: 16px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td style="border-top: 0.5px solid rgba(5, 38, 43, 0.50); height: 1px; line-height: 1px; font-size: 1px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Footer Feedback & Privacy Text Box -->
    {{#if showFeedback == 'Yes'}}
    <tr>
        <td>
            <div style="font-family: 'Red Hat Display', Arial, sans-serif; font-size: 12px; color: {{primaryColor}}; font-weight: 400; word-wrap: break-word; line-height: 1.6;">
                <span style="color: {{primaryColor}}; font-size: 12px; font-family: 'Red Hat Display', Arial, sans-serif; font-weight: 400; word-wrap: break-word">How am I doing? Give feedback at our</span>
                <span style="color: {{secondaryColor}}; font-size: 12px; font-family: 'Red Hat Display', Arial, sans-serif; font-weight: 400; word-wrap: break-word">&nbsp;</span>
                <a href="https://apps.collabera.com/feedback/?eid={{email}}" target="_blank" style="color: {{secondaryColor}}; font-size: 12px; font-family: 'Red Hat Display', Arial, sans-serif; font-weight: 400; text-decoration: underline; word-wrap: break-word">Center of Business Excellence</a>
                <span style="color: {{primaryColor}}; font-size: 12px; font-family: 'Red Hat Display', Arial, sans-serif; font-weight: 400; word-wrap: break-word">&nbsp;or call 1-866-398-6484<br/></span>
                {{#if entity == 'Collabera LLC'}}
                <a href="https://www.collabera.com/privacy-policy" target="_blank" style="color: {{secondaryColor}}; font-size: 12px; font-family: 'Red Hat Display', Arial, sans-serif; font-weight: 400; text-decoration: underline; word-wrap: break-word">CCPA Privacy Notice / Email Confidentiality and Privacy</a>
                {{/if}}
                {{#if entity == 'Collabera GTC'}}
                <a href="https://www.collabera.com/privacy-policy" target="_blank" style="color: {{secondaryColor}}; font-size: 12px; font-family: 'Red Hat Display', Arial, sans-serif; font-weight: 400; text-decoration: underline; word-wrap: break-word">Collabera GTC Global Trade & Privacy Compliance Notice</a>
                {{/if}}
                {{#if entity == 'Collabera Digital'}}
                <a href="https://www.collabera.com/privacy-policy" target="_blank" style="color: {{secondaryColor}}; font-size: 12px; font-family: 'Red Hat Display', Arial, sans-serif; font-weight: 400; text-decoration: underline; word-wrap: break-word">Collabera Digital Privacy Notice & Email Confidentiality</a>
                {{/if}}
            </div>
        </td>
    </tr>
    {{/if}}
</table>
`
    },
    {
        id: "modern-corporate",
        name: "Modern Corporate",
        description: "Modern two-column layout with vertical accent line and prominent brand logo.",
        fields: [
            { id: "name", label: "Full Name", type: "text", default: "Jane Doe", group: "Personal Info" },
            { id: "title", label: "Job Title", type: "text", default: "Senior Director of Talent Solutions", group: "Personal Info" },
            { id: "department", label: "Department", type: "text", default: "Enterprise Client Experience", group: "Personal Info" },
            { id: "mobile", label: "Mobile Phone", type: "text", default: "+1 (555) 234-5678", group: "Contact Info" },
            { id: "phone", label: "Office Line", type: "text", default: "+1 (800) 555-0199", group: "Contact Info" },
            { id: "email", label: "Email Address", type: "text", default: "jane.doe@collabera.com", group: "Contact Info" },
            { id: "location", label: "Location / Headquarters", type: "text", default: "Basking Ridge, NJ, USA", group: "Contact Info" },
            { id: "website", label: "Website URL", type: "text", default: "https://www.collabera.com", group: "Contact Info" },
            { 
                id: "entity", 
                label: "Company Entity", 
                type: "dropdown", 
                options: ["Collabera LLC", "Collabera GTC", "Collabera Digital"], 
                default: "Collabera LLC",
                group: "Branding & Entity" 
            },
            { id: "logoUrl", label: "Collabera Logo URL", type: "image", default: "https://raw.githubusercontent.com/bhushan-sys/Collabera-Email-Template/main/Res/Collabera%20Logo.svg", group: "Branding & Entity" },
            { id: "primaryColor", label: "Primary Dark Color", type: "color", default: "#0f172a", group: "Branding & Entity" },
            { id: "secondaryColor", label: "Accent Blue Color", type: "color", default: "#2563eb", group: "Branding & Entity" },
            { id: "linkedin", label: "LinkedIn URL", type: "text", default: "https://www.linkedin.com/company/collabera", group: "Social & Legal" }
        ],
        html: `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: {{primaryColor}}; line-height: 1.4; width: 100%; max-width: 580px; text-align: left;">
    <tr>
        <td valign="top" style="padding-right: 18px; border-right: 3px solid {{secondaryColor}};">
            <!-- Left Branding Box -->
            <table cellpadding="0" cellspacing="0" border="0" width="130">
                <tr>
                    <td style="padding-bottom: 8px;">
                        <img src="{{logoUrl}}" alt="Collabera Logo" width="130" style="display: block; width: 130px; max-width: 130px; height: auto; border: 0;" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <span style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; font-weight: bold; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; display: block;">{{entity}}</span>
                    </td>
                </tr>
            </table>
        </td>
        <td valign="top" style="padding-left: 18px;">
            <!-- Right Information Box -->
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td style="padding-bottom: 4px;">
                        <span style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-weight: 700; color: {{primaryColor}}; display: block;">{{name}}</span>
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom: 10px;">
                        <span style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 600; color: {{secondaryColor}};">{{title}}</span>
                        {{#if department != ''}}
                        <span style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #64748b;"> &bull; {{department}}</span>
                        {{/if}}
                    </td>
                </tr>
                <tr>
                    <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #475569; line-height: 1.6;">
                        <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="padding-bottom: 2px;">
                                    <strong>M:</strong> {{mobile}} &nbsp;|&nbsp; <strong>E:</strong> <a href="mailto:{{email}}" style="color: {{secondaryColor}}; text-decoration: none;">{{email}}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-bottom: 2px;">
                                    <strong>A:</strong> {{location}} &nbsp;|&nbsp; <a href="{{website}}" target="_blank" style="color: {{primaryColor}}; text-decoration: none;">{{website}}</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <!-- Footer Line -->
    <tr>
        <td colspan="2" style="padding-top: 14px; border-top: 1px solid #e2e8f0; margin-top: 14px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #94a3b8;">
                        CONFIDENTIALITY NOTICE: This email transmission from {{entity}} contains confidential information intended solely for the recipient.
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
`
    },
    {
        id: "collabera-figma-brand",
        name: "Collabera Brand Standard (Figma)",
        description: "Official Collabera brand signature design with entity switching, logo mark, and social links.",
        fields: [
            { id: "name", label: "Full Name", type: "text", default: "Bhushan Agashe", group: "Personal Info" },
            { id: "title", label: "Job Title", type: "text", default: "Team Lead - Graphic Design", group: "Personal Info" },
            { id: "department", label: "Department / Practice", type: "text", default: "Global Marketing & Creative Ops", group: "Personal Info" },
            { id: "mobile", label: "Mobile Number", type: "text", default: "+91 88560 40953", group: "Contact Info" },
            { id: "phone", label: "Direct Office Phone", type: "text", default: "+1 (866) 398-6484", group: "Contact Info" },
            { id: "email", label: "Email Address", type: "text", default: "bhushan.agashe@collabera.com", group: "Contact Info" },
            { id: "location", label: "Office Location", type: "text", default: "Vadodara, India", group: "Contact Info" },
            { id: "website", label: "Website URL", type: "text", default: "https://www.collabera.com", group: "Contact Info" },
            { 
                id: "entity", 
                label: "Company Entity", 
                type: "dropdown", 
                options: ["Collabera LLC", "Collabera GTC", "Collabera Digital"], 
                default: "Collabera LLC",
                group: "Branding & Entity" 
            },
            { id: "photo", label: "Headshot Photo URL", type: "image", default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", group: "Branding & Entity" },
            { id: "logoUrl", label: "Collabera Logo URL", type: "image", default: "https://raw.githubusercontent.com/bhushan-sys/Collabera-Email-Template/main/Res/Collabera%20Logo.svg", group: "Branding & Entity" },
            { id: "primaryColor", label: "Corporate Dark Color", type: "color", default: "#05262B", group: "Branding & Entity" },
            { id: "secondaryColor", label: "Lake Blue Accent", type: "color", default: "#50B1FB", group: "Branding & Entity" },
            { id: "accentGold", label: "Gold Accent", type: "color", default: "#A98B64", group: "Branding & Entity" },
            { id: "linkedin", label: "LinkedIn Profile URL", type: "text", default: "https://www.linkedin.com/company/collabera", group: "Social & Legal" },
            { id: "showDisclaimer", label: "Show Confidentiality Disclaimer", type: "dropdown", options: ["Yes", "No"], default: "Yes", group: "Social & Legal" }
        ],
        html: `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: {{primaryColor}}; line-height: 1.4; width: 100%; max-width: 580px; text-align: left;">
    <tr>
        <!-- Left: Photo Headshot -->
        {{#if photo != ''}}
        <td valign="top" width="80" style="padding-right: 16px;">
            <img src="{{photo}}" alt="{{name}}" width="72" height="72" style="display: block; border-radius: 50%; width: 72px; height: 72px; object-fit: cover; border: 2px solid {{secondaryColor}};" />
        </td>
        {{/if}}

        <!-- Vertical Divider Line -->
        <td width="2" style="background-color: {{secondaryColor}}; width: 2px;" valign="top">&nbsp;</td>

        <!-- Right: Main Content -->
        <td valign="top" style="padding-left: 18px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <!-- Name & Title -->
                <tr>
                    <td style="padding-bottom: 2px;">
                        <span style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-weight: 800; color: {{primaryColor}}; letter-spacing: -0.2px;">{{name}}</span>
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom: 8px;">
                        <span style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; color: {{accentGold}}; letter-spacing: 0.5px;">{{title}}</span>
                        {{#if department != ''}}
                        <span style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #64748b;"> &nbsp;|&nbsp; {{department}}</span>
                        {{/if}}
                    </td>
                </tr>

                <!-- Contact Details Grid -->
                <tr>
                    <td style="padding-bottom: 10px;">
                        <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #334155; line-height: 1.6;">
                            <tr>
                                <td>
                                    <strong style="color: {{primaryColor}};">M:</strong> {{mobile}}
                                    {{#if phone != ''}} &nbsp;&nbsp;|&nbsp;&nbsp; <strong style="color: {{primaryColor}};">O:</strong> {{phone}}{{/if}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong style="color: {{primaryColor}};">E:</strong> <a href="mailto:{{email}}" style="color: {{secondaryColor}}; text-decoration: none; font-weight: 600;">{{email}}</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong style="color: {{primaryColor}};">W:</strong> <a href="{{website}}" target="_blank" style="color: {{primaryColor}}; text-decoration: none;">www.collabera.com</a> &nbsp;&nbsp;|&nbsp;&nbsp; {{location}}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <!-- Brand Logo Banner & Entity -->
                <tr>
                    <td style="padding-top: 6px; border-top: 1px solid #e2e8f0;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                                <td valign="middle">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td valign="middle" style="padding-right: 8px;">
                                                <img src="{{logoUrl}}" alt="Collabera Logo" width="140" style="display: block; width: 140px; max-width: 140px; height: auto; border: 0;" />
                                            </td>
                                            <td valign="middle">
                                                <span style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; font-weight: 700; color: {{secondaryColor}}; display: block; text-transform: uppercase; letter-spacing: 0.5px;">{{entity}}</span>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                 {{#if linkedin != ''}}
                                <td align="right" valign="middle">
                                    <a href="{{linkedin}}" target="_blank" style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: 700; color: #ffffff; background-color: {{primaryColor}}; padding: 4px 10px; border-radius: 4px; text-decoration: none; display: inline-block;">LinkedIn &rarr;</a>
                                </td>
                                {{/if}}
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Footer Legal Disclaimer -->
    {{#if showDisclaimer == 'Yes'}}
    <tr>
        <td colspan="3" style="padding-top: 12px; font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: #94a3b8; line-height: 1.4; border-top: 1px dashed #cbd5e1; margin-top: 10px;">
            CONFIDENTIALITY NOTICE: This message and any attachments are intended solely for {{name}} and {{entity}}. If received in error, please notify sender and destroy immediately.
        </td>
    </tr>
    {{/if}}
</table>
`
    },
    {
        id: "compact-minimal",
        name: "Compact Minimal",
        description: "Ultra-compact single-row layout ideal for high-volume email correspondence.",
        fields: [
            { id: "name", label: "Full Name", type: "text", default: "Alex Mercer", group: "Personal Info" },
            { id: "title", label: "Job Title", type: "text", default: "Account Executive", group: "Personal Info" },
            { id: "mobile", label: "Mobile Phone", type: "text", default: "+1 (555) 987-6543", group: "Contact Info" },
            { id: "email", label: "Email Address", type: "text", default: "alex.mercer@collabera.com", group: "Contact Info" },
            { 
                id: "entity", 
                label: "Company Entity", 
                type: "dropdown", 
                options: ["Collabera LLC", "Collabera GTC", "Collabera Digital"], 
                default: "Collabera LLC",
                group: "Branding & Entity" 
            },
            { id: "primaryColor", label: "Text Color", type: "color", default: "#1e293b", group: "Branding & Entity" },
            { id: "secondaryColor", label: "Brand Color", type: "color", default: "#0284c7", group: "Branding & Entity" }
        ],
        html: `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: {{primaryColor}}; line-height: 1.4; width: 100%; max-width: 540px; text-align: left;">
    <tr>
        <td style="padding-bottom: 6px;">
            <strong style="font-size: 15px; color: {{primaryColor}};">{{name}}</strong>
            <span style="color: {{secondaryColor}}; font-weight: 600;"> &nbsp;&bull;&nbsp; {{title}}</span>
            <span style="color: #64748b; font-size: 12px;"> ({{entity}})</span>
        </td>
    </tr>
    <tr>
        <td style="font-size: 12px; color: #475569; padding-bottom: 8px;">
            Mobile: <strong>{{mobile}}</strong> &nbsp;|&nbsp; Email: <a href="mailto:{{email}}" style="color: {{secondaryColor}}; text-decoration: none;"><strong>{{email}}</strong></a> &nbsp;|&nbsp; <a href="https://www.collabera.com" target="_blank" style="color: {{primaryColor}}; text-decoration: none;">www.collabera.com</a>
        </td>
    </tr>
    <tr>
        <td style="border-top: 2px solid {{secondaryColor}}; font-size: 10px; color: #94a3b8; padding-top: 4px;">
            Collabera Email Confidentiality & Privacy Notice
        </td>
    </tr>
</table>
`
    }
];

