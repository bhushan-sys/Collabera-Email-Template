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

    <!-- Collabera Vector Logo -->
    <tr>
        <td style="padding-bottom: 20px;">
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td valign="middle">
                        <svg width="230" height="33" viewBox="0 0 230 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 17.3772C1.93743e-07 21.7934 0.625566 26.2402 1.90493 30.6564C6.33922 31.9391 10.953 32.5663 15.1796 32.5663C15.1796 23.8232 8.3932 17.3772 0 17.3772Z" fill="{{primaryColor}}"/>
                            <path d="M32.7817 17.3772C32.7817 21.7934 32.1562 26.2402 30.8768 30.6564C26.4425 31.9391 21.8287 32.5663 17.6022 32.5663C17.6022 23.8232 24.3885 17.3772 32.7817 17.3772Z" fill="{{primaryColor}}"/>
                            <path d="M17.5083 0C21.9406 0 26.4036 0.623297 30.8359 1.89802C32.1232 6.31622 32.7527 10.9133 32.7527 15.1245C23.9778 15.1245 17.5083 8.36275 17.5083 0Z" fill="{{primaryColor}}"/>
                            <path d="M15.2446 0C10.8123 0 6.34932 0.623297 1.91701 1.89802C0.629694 6.31622 0.000240326 10.9133 0.000240326 15.1245C8.77511 15.1245 15.2446 8.36275 15.2446 0Z" fill="{{primaryColor}}"/>
                            <path d="M182.264 8.6084C175.55 8.6084 170.995 13.4379 170.995 20.589C170.995 27.7402 175.731 32.6587 182.724 32.6587C187.968 32.6587 191.97 29.4706 193.028 24.6423H188.659C187.877 27.238 185.578 28.8326 182.449 28.8326C179.319 28.8326 176.736 26.9595 175.839 23.9232C175.462 22.6471 176.064 21.6335 177.606 21.6335H193.351L193.395 21.4075C193.442 20.815 193.489 20.2694 193.489 19.7204C193.351 12.9345 188.979 8.6084 182.264 8.6084ZM180.392 17.99C178.477 17.99 176.809 19.0469 175.956 20.6039H175.35C175.363 15.1455 177.789 12.3421 182.264 12.3421C185.991 12.3421 188.475 14.4389 188.888 17.99H180.392Z" fill="{{primaryColor}}"/>
                            <path d="M142.566 28.4228C141.736 28.4228 141.322 28.2858 141.322 27.1912V17.1247C141.322 11.7497 137.874 8.6084 131.754 8.6084C126.051 8.6084 122.28 11.3878 121.682 16.0335V16.2595H125.913V16.0769C125.913 13.8762 128.535 12.4323 131.572 12.4323C135.067 12.4323 137.09 14.0497 137.09 16.4661C137.09 17.724 135.981 18.2628 134.197 18.2628H130.514C124.394 18.2628 120.946 20.8618 120.946 25.6902C120.946 29.8804 124.441 32.6587 129.778 32.6587C133.182 32.6587 136.144 31.4282 137.479 28.7858H138.078V29.2766C138.078 30.9899 139.478 32.3859 141.208 32.3859H142.69V28.4228H142.566ZM137.09 22.7293C137.09 26.5554 134.423 28.9216 130.054 28.9216C127.156 28.9216 125.268 27.5108 125.268 25.4139C125.268 23.0477 126.924 21.864 130.191 21.864H132.048C133.963 21.864 135.63 20.8082 136.483 19.2513H137.09V22.7293Z" fill="{{primaryColor}}"/>
                            <path d="M229.876 28.4228C229.046 28.4228 228.632 28.2858 228.632 27.1912V17.1247C228.632 11.7497 225.184 8.6084 219.064 8.6084C213.361 8.6084 209.59 11.3878 208.992 16.0335V16.2595H213.223V16.0769C213.223 13.8762 215.845 12.4323 218.882 12.4323C222.377 12.4323 224.4 14.0497 224.4 16.4661C224.4 17.724 223.291 18.2628 221.507 18.2628H217.824C211.704 18.2628 208.256 20.8618 208.256 25.6902C208.256 29.8804 211.751 32.6587 217.089 32.6587C220.493 32.6587 223.454 31.4282 224.789 28.7858H225.388V29.2766C225.388 30.9899 226.788 32.3859 228.518 32.3859H230V28.4228H229.876ZM224.4 22.7293C224.4 26.5554 221.733 28.9216 217.364 28.9216C214.466 28.9216 212.578 27.5108 212.578 25.4139C212.578 23.0477 214.234 21.864 217.501 21.864H219.358C221.273 21.864 222.94 20.8082 223.793 19.2513H224.4V22.7293Z" fill="{{primaryColor}}"/>
                            <path d="M207.152 8.88127C202.92 8.88127 201.223 10.8377 200.258 12.252H199.976L199.559 8.88127H196.201V32.3392H200.436V20.3585C200.436 17.6259 201.215 13.0236 206.324 13.0236H208.438V8.88013H207.15L207.152 8.88127Z" fill="{{primaryColor}}"/>
                            <path d="M118.603 0.319733H114.416V32.3408H118.603V0.319733Z" fill="{{primaryColor}}"/>
                            <path d="M110.135 0.319733H105.903V32.3408H110.135V0.319733Z" fill="{{primaryColor}}"/>
                            <path d="M91.7363 8.6084C84.8834 8.6084 80.0073 13.5269 80.0073 20.589C80.0073 27.6512 84.8834 32.6599 91.7363 32.6599C98.5893 32.6599 103.513 27.6946 103.513 20.589C103.513 13.4835 98.6826 8.6084 91.7363 8.6084ZM91.7363 28.7858C87.4147 28.7858 84.3323 25.4607 84.3323 20.589C84.3323 15.7173 87.4136 12.3889 91.7363 12.3889C96.059 12.3889 99.1437 15.7139 99.1437 20.589C99.1437 25.4642 96.1524 28.7858 91.7363 28.7858Z" fill="{{primaryColor}}"/>
                            <path d="M73.5217 21.7275C72.3252 26.0068 68.9685 28.4666 64.2769 28.4666C57.8816 28.4666 53.741 23.685 53.741 16.3067C53.6499 9.01858 57.9761 4.19026 64.4152 4.19026C68.9685 4.19026 72.2791 6.6067 73.5229 10.9328L73.5701 11.0698H78.2145L78.1672 10.797C76.9257 4.19025 71.7269 0 64.5512 0C55.349 0 49.1416 6.60556 49.1416 16.3067C49.1416 26.0079 55.1208 32.5667 64.2757 32.5667C71.5886 32.5667 76.9257 28.4232 78.1223 21.8176L78.2133 21.498H73.5217V21.7275Z" fill="{{primaryColor}}"/>
                            <path d="M157.612 8.60893C154.712 8.60893 151.724 10.1567 150.295 12.1166H149.929V0.319733H145.697V32.3773H149.236L149.747 29.1196H150.127C151.77 31.2632 154.429 32.6136 158.072 32.6136C164.558 32.6136 168.974 27.6483 168.974 20.5896C168.974 13.5309 164.558 8.60893 157.615 8.60893H157.612ZM157.242 28.7852C152.873 28.7852 149.834 25.4613 149.834 20.496C149.834 15.5307 152.873 12.4328 157.242 12.4328C161.611 12.4328 164.693 15.7144 164.693 20.5896C164.693 25.4647 161.705 28.7863 157.242 28.7863V28.7852Z" fill="{{primaryColor}}"/>
                        </svg>
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
                        <span style="font-family: Arial, Helvetica, sans-serif; font-size: 22px; font-weight: 900; color: {{secondaryColor}}; letter-spacing: -0.5px; display: block;">COLLABERA</span>
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
                                                <div style="background-color: {{primaryColor}}; color: #ffffff; width: 24px; height: 24px; border-radius: 4px; text-align: center; line-height: 24px; font-weight: 900; font-size: 14px; font-family: Arial, sans-serif;">C</div>
                                            </td>
                                            <td valign="middle">
                                                <span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 900; color: {{primaryColor}}; letter-spacing: -0.3px; display: block;">COLLABERA</span>
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

