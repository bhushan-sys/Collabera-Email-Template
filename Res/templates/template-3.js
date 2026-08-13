// Template 3 — Collabera Horizontal Left Column Layout (Figma node 765-1258 / 767-1744)
// Layout: Left Profile Photo with Name & Title horizontally adjacent, 1px Vertical Separator Line,
// Right Collabera Logo, Contact Info, and Configurable Badge Logos.

const template3 = {
    id: "collabera-brand-t3",
    name: "Brand Guidelines — Template 3 (Horizontal Left Column Layout)",
    description: "Horizontal left column layout with profile photo next to name/title, vertical separator line, right logo, contact info, and configurable badge logos.",
    html: `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Red Hat Display', Arial, sans-serif; font-size: 16px; color: #05262B; line-height: 1.4; min-width: 549px; text-align: left; background-color: #ffffff;">

    <!-- Top Section: Left Profile/Name/Title + Vertical Divider + Right Contact/Badges -->
    <tr>
        <td style="padding-bottom: 10px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <!-- Left: Profile Image + Name & Title Horizontally Adjacent (Figma node 765:1260 / 767:1746) -->
                    <td valign="middle" style="padding-right: 20px;">
                        <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                {{#if showProfileImage == 'true'}}
                                <td valign="middle" style="padding-right: 18px;">
                                    <img src="{{profileImage}}" width="115" height="114" alt="Profile Photo" style="display: block; width: 115px; height: 114px; border: 0; outline: none; text-decoration: none; clip-path: url(#avatar-barrel-mask); -webkit-clip-path: url(#avatar-barrel-mask);" />
                                </td>
                                {{/if}}
                                <td valign="middle" style="white-space: nowrap;">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="font-family: 'Newsreader', Georgia, 'Times New Roman', serif; font-size: 32px; font-style: italic; font-weight: 300; color: #05262B; line-height: 1.0; padding-bottom: 5px; white-space: nowrap;">
                                                {{name}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-family: 'Red Hat Display', Arial, sans-serif; font-size: 16px; font-weight: 700; color: #AA9269; line-height: 1.3; white-space: nowrap;">
                                                {{title}}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>

                    <!-- Gap left of Divider -->
                    <td valign="middle" style="width: 16px; min-width: 16px;">&nbsp;</td>

                    <!-- Vertical Divider Line (Figma node 765:1266 / 767:1752) -->
                    <td valign="middle" style="width: 1px; min-width: 1px; padding: 0; border-left: 1px solid #B4BEBF; font-size: 1px; line-height: 1px;">&nbsp;</td>

                    <!-- Gap right of Divider -->
                    <td valign="middle" style="width: 24px; min-width: 24px;">&nbsp;</td>

                    <!-- Right Column: Logo + Contacts + Badges (Figma node 765:1265 / 768:2468) -->
                    <td valign="middle">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                                <td valign="top">
                                    <!-- Collabera Logo + Top Badges Row -->
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                        <tr>
                                            <td valign="middle">
                                                <img src="https://raw.githubusercontent.com/bhushan-sys/Collabera-Email-Template/main/Res/Collabera%20Logo.svg" alt="Collabera" width="230" height="33" style="display: block; width: 230px; height: 33px; border: 0;" />
                                            </td>
                                            <td valign="top" align="right" style="padding-left: 32px; padding-top: 5px;">
                                                <table cellpadding="0" cellspacing="0" border="0">
                                                    <tr>
                                                        {{#if showWomenWp == 'true'}}
                                                        <td valign="top" style="padding-left: 8px;">
                                                            <img src="https://raw.githubusercontent.com/bhushan-sys/Collabera-Email-Template/main/Res/Women%20Workplace.svg" alt="Workplace for Women" width="56" height="50" style="display: block; width: 56px; height: 50px; border: 0;" />
                                                        </td>
                                                        {{/if}}
                                                        {{#if showCertBadge == 'true'}}
                                                        <td valign="top" style="padding-left: 8px;">
                                                            <img src="https://raw.githubusercontent.com/bhushan-sys/Collabera-Email-Template/main/Res/Collabera_Talent_Solutions_Private_Limited_IN_English_2024_Certification_Badge.svg" alt="Great Place To Work" width="40" height="68" style="display: block; width: 40px; height: 68px; border: 0;" />
                                                        </td>
                                                        {{/if}}
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- Contact details block -->
                            <tr>
                                <td style="padding-top: 14px; padding-bottom: 6px;">
                                    <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Red Hat Display', Arial, sans-serif; font-size: 16px; color: #05262B; line-height: 1.4;">
                                        {{#if mobile != ''}}
                                        <tr>
                                            <td style="padding-bottom: 2px; white-space: nowrap;">
                                                <span style="font-weight: 700;">M:</span>
                                                <span style="font-weight: 400;"> {{mobile}}</span>
                                            </td>
                                        </tr>
                                        {{/if}}
                                        {{#if location != ''}}
                                        <tr>
                                            <td style="padding-bottom: 0px; white-space: nowrap;">
                                                <span style="font-weight: 700;">L:</span>
                                                <span style="font-weight: 400;"> {{location}}</span>
                                            </td>
                                        </tr>
                                        {{/if}}
                                        {{#if website != ''}}
                                        <tr>
                                            <td style="padding-bottom: 2px; white-space: nowrap;">
                                                <a href="https://{{website}}" target="_blank" style="color: #05262B; text-decoration: none;">{{website}}</a>
                                            </td>
                                        </tr>
                                        {{/if}}
                                        <tr>
                                            <td style="padding-top: 6px;">
                                                <a href="{{linkedin}}" target="_blank" style="display: inline-block; text-decoration: none;" title="LinkedIn Profile">
                                                    <img src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 13 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.2273 0H1.77273C1.30257 0 0.851671 0.186769 0.51922 0.51922C0.186769 0.851671 0 1.30257 0 1.77273L0 11.2273C0 11.6974 0.186769 12.1483 0.51922 12.4808C0.851671 12.8132 1.30257 13 1.77273 13H11.2273C11.6974 13 12.1483 12.8132 12.4808 12.4808C12.8132 12.1483 13 11.6974 13 11.2273V1.77273C13 1.30257 12.8132 0.851671 12.4808 0.51922C12.1483 0.186769 11.6974 0 11.2273 0ZM4.43182 10.2877C4.43192 10.3238 4.4249 10.3595 4.41117 10.3928C4.39744 10.4262 4.37727 10.4565 4.35182 10.482C4.32636 10.5075 4.29612 10.5278 4.26282 10.5416C4.22953 10.5554 4.19383 10.5625 4.15778 10.5625H2.99C2.95389 10.5626 2.91811 10.5556 2.88473 10.5418C2.85135 10.528 2.82102 10.5078 2.79549 10.4822C2.76995 10.4567 2.74972 10.4264 2.73594 10.393C2.72217 10.3596 2.71513 10.3238 2.71523 10.2877V5.39205C2.71523 5.31917 2.74418 5.24928 2.79571 5.19775C2.84724 5.14622 2.91713 5.11727 2.99 5.11727H4.15778C4.23053 5.11747 4.30023 5.1465 4.3516 5.19801C4.40297 5.24952 4.43182 5.3193 4.43182 5.39205V10.2877ZM3.57352 4.65341C3.35439 4.65341 3.14018 4.58843 2.95798 4.46669C2.77577 4.34494 2.63376 4.1719 2.54991 3.96945C2.46605 3.767 2.44411 3.54423 2.48686 3.3293C2.52961 3.11438 2.63513 2.91696 2.79008 2.76201C2.94503 2.60706 3.14245 2.50154 3.35737 2.45879C3.57229 2.41604 3.79507 2.43798 3.99752 2.52184C4.19997 2.6057 4.37301 2.74771 4.49475 2.92991C4.6165 3.11211 4.68148 3.32632 4.68148 3.54545C4.68148 3.8393 4.56475 4.12111 4.35696 4.3289C4.14918 4.53668 3.86737 4.65341 3.57352 4.65341ZM10.5359 10.3069C10.536 10.3401 10.5295 10.373 10.5169 10.4037C10.5042 10.4344 10.4856 10.4623 10.4621 10.4858C10.4387 10.5092 10.4108 10.5279 10.3801 10.5405C10.3494 10.5532 10.3165 10.5596 10.2833 10.5595H9.02761C8.99441 10.5596 8.96152 10.5532 8.93083 10.5405C8.90013 10.5279 8.87225 10.5092 8.84877 10.4858C8.82529 10.4623 8.80669 10.4344 8.79403 10.4037C8.78137 10.373 8.7749 10.3401 8.775 10.3069V8.01347C8.775 7.67074 8.87545 6.51256 7.87903 6.51256C7.10716 6.51256 6.94983 7.30511 6.91881 7.66114V10.3099C6.91881 10.3762 6.89271 10.4399 6.84613 10.4872C6.79955 10.5345 6.73624 10.5615 6.66989 10.5625H5.45705C5.42391 10.5625 5.39109 5.556 5.36049 10.5433C5.32988 5.306 5.30208 5.119 5.27868 5.4885C5.25528 10.465 5.23674 10.4371 5.22413 10.4065C5.21152 10.3759 5.20507 10.343 5.20517 10.3099V5.37062C5.20507 5.33749 5.21152 5.30465 5.22413 5.27401C5.23674 5.24337 5.25528 5.21551 5.27868 5.19204C5.30208 5.16858 5.32988 5.14996 5.36049 5.13725C5.39109 5.12455 5.42391 5.11801 5.45705 5.11801H6.66989C6.73688 5.11801 6.80114 5.14463 6.84851 5.192C6.89589 5.23937 6.9225 5.30363 6.9225 5.37062V5.79756C7.20909 5.36693 7.63381 5.03602 8.54011 5.03602C10.5477 5.03602 10.5344 6.91068 10.5344 7.94034L10.5359 10.3069Z' fill='%23AA9269'/%3E%3C/svg%3E" alt="LinkedIn" width="20" height="20" style="display: block; width: 20px; height: 20px; border: 0;" />
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- Middle Badges Row (President's Club + WLAB) (Figma node 770:3174) -->
                            <tr>
                                <td style="padding-top: 6px;">
                                    <table cellpadding="0" cellspacing="0" border="0" valign="middle">
                                        <tr>
                                            {{#if showPcBadge == 'true'}}
                                            <td valign="middle" style="padding-right: 16px;">
                                                <img src="https://raw.githubusercontent.com/bhushan-sys/Collabera-Email-Template/main/Res/1_Badge.svg" alt="President's Club" width="78" height="78" style="display: block; width: 78px; height: 78px; border: 0;" />
                                            </td>
                                            {{/if}}
                                            {{#if showWlab == 'true'}}
                                            <td valign="middle">
                                                <img src="https://raw.githubusercontent.com/bhushan-sys/Collabera-Email-Template/main/Res/Wlab%20Full.svg" alt="WLAB" width="163" height="69" style="display: block; width: 163px; height: 69px; border: 0;" />
                                            </td>
                                            {{/if}}
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Horizontal Divider Line (Figma node 765:1289 / 767:1777 — 549px) -->
    <tr>
        <td style="padding-top: 10px; padding-bottom: 12px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td style="border-top: 1px solid #B4BEBF; font-size: 1px; line-height: 1px; height: 1px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Footer Feedback & Privacy Section (Figma node 765:1290 / 767:1778) -->
     <tr>
        <td>
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td style="font-family: 'Red Hat Display', Arial, sans-serif; font-size: 12px; color: #05262B; font-weight: 400; line-height: 1.6;">
                        <span style="color: #05262B; font-size: 12px; font-family: 'Red Hat Display', Arial, sans-serif;">How am I doing? Give feedback at our</span>
                        <a href="https://apps.collabera.com/feedback/?eid={{email}}" target="_blank" style="color: #AA9269; font-size: 12px; font-family: 'Red Hat Display', Arial, sans-serif; text-decoration: underline;">&nbsp;Center of Business Excellence</a>
                        <span style="color: #05262B; font-size: 12px; font-family: 'Red Hat Display', Arial, sans-serif;"> or call 1-866-398-6484</span>
                    </td>
                </tr>
                <tr>
                    <td style="font-family: 'Red Hat Display', Arial, sans-serif; font-size: 12px; line-height: 1.6; padding-top: 1px;">
                        <a href="http://res.collabera.com/res/email.htm" target="_blank" style="color: #AA9269; font-size: 12px; font-family: 'Red Hat Display', Arial, sans-serif; text-decoration: underline;">CCPA Privacy Notice / Email Confidentiality and Privacy</a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
`
};
