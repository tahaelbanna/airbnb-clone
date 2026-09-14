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
    const displaySubject = subject || "Verify your email - Stay Scape";
    const titleText = subject || "Verify your email";

    const htmlContent = `
        <h2 style="margin-top: 0; margin-bottom: 24px; font-size: 24px; font-weight: 600; color: #222222; text-align: center;">
            ${titleText}
        </h2>
        
        <p style="margin-bottom: 24px; text-align: center; color: #484848; font-size: 16px;">
            ${displayMessage}
        </p>
        
        <div style="background-color: #f7f9fa; border: 1px solid #ebebeb; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <div style="font-size: 36px; font-weight: 700; color: #222222; letter-spacing: 4px; font-family: monospace;">
                ${code}
            </div>
        </div>
        
        <p style="margin-bottom: 24px; text-align: center; color: #717171; font-size: 14px;">
            This code expires in ${expiresInMinutes} minutes.
        </p>
        
        <div style="border-top: 1px solid #ebebeb; margin: 32px 0 24px 0;"></div>
        
        <p style="margin-bottom: 0; color: #717171; font-size: 13px; line-height: 1.5; text-align: center;">
            <strong>Security note:</strong> Never share this code with anyone. Stay Scape will never ask you for your verification code.
        </p>
    `;

    const html = baseEmailTemplate({
        title: displaySubject,
        preheader: `Your verification code is ${code}`,
        content: htmlContent,
    });

    const text = `Stay Scape\n\n${titleText}\n\n${displayMessage}\n\nYour verification code is: ${code}\n\nThis code expires in ${expiresInMinutes} minutes.\n\nSecurity note: Never share this code with anyone. Stay Scape will never ask you for your verification code.\n\n© ${new Date().getFullYear()} Stay Scape. All rights reserved.`;

    return { html, text };
}
