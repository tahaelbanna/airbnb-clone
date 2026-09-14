export interface BaseEmailOptions {
    title?: string;
    content: string;
    preheader?: string;
}

export function baseEmailTemplate({ title, content, preheader }: BaseEmailOptions): string {
    const brandColor = '#FF385C';

    return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>${title || 'Stay Scape'}</title>
    
    <style>
        html, body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f7f9fa;
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
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .header {
            text-align: center;
            padding-bottom: 24px;
            border-bottom: 1px solid #ebebeb;
            margin-bottom: 32px;
        }
        .logo {
            font-size: 24px;
            font-weight: 800;
            color: ${brandColor};
            text-decoration: none;
            letter-spacing: -0.5px;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            color: #717171;
            font-size: 12px;
            line-height: 1.5;
        }
        @media screen and (max-width: 600px) {
            .email-card {
                padding: 24px !important;
                border-radius: 0 !important;
                margin: 0 !important;
            }
        }
    </style>
</head>
<body width="100%" style="margin: 0; padding: 0 !important; background-color: #f7f9fa;">
    ${preheader ? `<div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">${preheader}</div>` : ''}
    
    <center style="width: 100%; background-color: #f7f9fa;">
        <div class="email-container">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px;">
                <tr>
                    <td>
                        <div class="email-card">
                            <div class="header">
                                <a href="#" class="logo">Stay Scape</a>
                            </div>
                            
                            <div class="content" style="color: #222222; font-size: 16px; line-height: 1.6;">
                                ${content}
                            </div>
                        </div>
                        
                        <div class="footer">
                            <p style="margin: 0;">&copy; ${new Date().getFullYear()} Stay Scape. All rights reserved.</p>
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
