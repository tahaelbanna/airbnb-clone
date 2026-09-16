export interface BaseEmailOptions {
    title?: string;
    content: string;
    preheader?: string;
}

export function baseEmailTemplate({ title, content, preheader }: BaseEmailOptions): string {
    const brandColor = '#6F856F';

    return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>${title || 'ESQOUN'}</title>
    
    <style>
        html, body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
            font-family: Georgia, 'Times New Roman', Times, serif;
            background-color: #F7F3ED;
        }
        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }
        img {
            -ms-interpolation-mode:bicubic;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
        }
        .email-card {
            background-color: #ffffff;
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            margin-top: 24px;
            margin-bottom: 20px;
            border: 1px solid #E8E0D6;
        }
        .header {
            text-align: center;
            padding-bottom: 24px;
            border-bottom: 1px solid #E8E0D6;
            margin-bottom: 32px;
        }
        .logo {
            font-size: 26px;
            font-weight: 600;
            color: ${brandColor};
            text-decoration: none;
            letter-spacing: 2px;
            font-family: Georgia, 'Times New Roman', Times, serif;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            color: #8A8A8A;
            font-size: 12px;
            line-height: 1.5;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        @media screen and (max-width: 600px) {
            .email-card {
                padding: 24px !important;
                border-radius: 0 !important;
                margin: 0 !important;
                border-left: none !important;
                border-right: none !important;
            }
        }
    </style>
</head>
<body width="100%" style="margin: 0; padding: 0 !important; background-color: #F7F3ED;">
    ${preheader ? `<div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">${preheader}</div>` : ''}
    
    <center style="width: 100%; background-color: #F7F3ED;">
        <div class="email-container">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px;">
                <tr>
                    <td>
                        <div class="email-card">
                            <div class="header">
                                <a href="#" class="logo">ESQOUN</a>
                            </div>
                            
                            <div class="content" style="color: #2D2D2D; font-size: 16px; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                                ${content}
                            </div>
                        </div>
                        
                        <div class="footer">
                            <p style="margin: 0;">&copy; ${new Date().getFullYear()} ESQOUN. All rights reserved.</p>
                            <p style="margin: 8px 0 0 0;">This is an automated message, please do not reply to this email.</p>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>
</html>
    `;
}
