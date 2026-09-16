import { baseEmailTemplate } from './base-email.template';

export interface OtpEmailOptions {
    code: number | string;
    expiresInMinutes: number;
    message?: string;
    subject?: string;
}

export function otpEmailTemplate(options: OtpEmailOptions): { html: string; text: string } {
    const { code, expiresInMinutes, message, subject } = options;
    const defaultMessage = "Use the verification code below to complete your registration.";
    const displayMessage = message || defaultMessage;
    const displaySubject = subject || "Verify your email - ESQOUN";
    const titleText = subject || "Verify your email";

    const htmlContent = `
        <h2 style="margin-top: 0; margin-bottom: 24px; font-size: 24px; font-weight: 600; color: #2D2D2D; text-align: center;">
            ${titleText}
        </h2>
        
        <p style="margin-bottom: 24px; text-align: center; color: #555555; font-size: 16px;">
            ${displayMessage}
        </p>
        
        <div style="background-color: #F7F3ED; border: 1px solid #E8E0D6; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <div style="font-size: 36px; font-weight: 700; color: #2D2D2D; letter-spacing: 4px; font-family: monospace;">
                ${code}
            </div>
        </div>
        
        <p style="margin-bottom: 24px; text-align: center; color: #8A8A8A; font-size: 14px;">
            This code expires in ${expiresInMinutes} minutes.
        </p>
        
        <div style="border-top: 1px solid #E8E0D6; margin: 32px 0 24px 0;"></div>
        
        <p style="margin-bottom: 0; color: #8A8A8A; font-size: 13px; line-height: 1.5; text-align: center;">
            <strong>Security note:</strong> Never share this code with anyone. ESQOUN will never ask you for your verification code.
        </p>
    `;

    const html = baseEmailTemplate({
        title: displaySubject,
        preheader: `Your verification code is ${code}`,
        content: htmlContent,
    });

    const text = `ESQOUN\n\n${titleText}\n\n${displayMessage}\n\nYour verification code is: ${code}\n\nThis code expires in ${expiresInMinutes} minutes.\n\nSecurity note: Never share this code with anyone. ESQOUN will never ask you for your verification code.\n\n© ${new Date().getFullYear()} ESQOUN. All rights reserved.`;

    return { html, text };
}
