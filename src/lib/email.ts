import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_APP_PASSWORD,
    },
});

interface InquiryData {
    name: string;
    email: string;
    phone: string;
    type: string;
    location: string;
    brief: string;
    refNumber: string;
    submittedAt: string;
}

/**
 * Send notification email to VARTEX (the client)
 */
export async function sendClientNotification(data: InquiryData) {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0; padding:0; background-color:#f5f5f5; font-family: Arial, Helvetica, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5; padding:40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:2px; overflow:hidden;">

                        <!-- Header -->
                        <tr>
                            <td style="background:#1a1a1a; padding:32px 40px; text-align:center;">
                                <h1 style="color:#ffffff; font-size:14px; letter-spacing:6px; margin:0; font-weight:400;">VARTEX ARCHITECTS</h1>
                            </td>
                        </tr>

                        <!-- Alert Banner -->
                        <tr>
                            <td style="background:#292929; padding:16px 40px; text-align:center;">
                                <p style="color:#ffffff; font-size:11px; letter-spacing:3px; margin:0; text-transform:uppercase;">🔔 New Project Inquiry Received</p>
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding:40px;">
                                <p style="font-size:15px; color:#333333; line-height:1.6; margin:0 0 8px 0;">
                                    A new project inquiry has been submitted through the website.
                                </p>
                                <p style="font-size:12px; color:#999999; margin:0 0 32px 0; letter-spacing:1px;">
                                    Reference: ${data.refNumber} • ${data.submittedAt}
                                </p>

                                <!-- Inquiry Details -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eeeeee; border-radius:2px;">
                                    <tr>
                                        <td style="padding:16px 20px; border-bottom:1px solid #eeeeee; background:#fafafa;">
                                            <p style="font-size:9px; letter-spacing:3px; color:#999999; text-transform:uppercase; margin:0 0 4px 0;">Client Name</p>
                                            <p style="font-size:15px; color:#1a1a1a; margin:0; font-weight:600;">${data.name}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:16px 20px; border-bottom:1px solid #eeeeee;">
                                            <p style="font-size:9px; letter-spacing:3px; color:#999999; text-transform:uppercase; margin:0 0 4px 0;">Email Address</p>
                                            <p style="font-size:15px; color:#1a1a1a; margin:0;">
                                                <a href="mailto:${data.email}" style="color:#1a1a1a; text-decoration:none;">${data.email}</a>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:16px 20px; border-bottom:1px solid #eeeeee; background:#fafafa;">
                                            <p style="font-size:9px; letter-spacing:3px; color:#999999; text-transform:uppercase; margin:0 0 4px 0;">Phone Number</p>
                                            <p style="font-size:15px; color:#1a1a1a; margin:0;">
                                                <a href="tel:${data.phone}" style="color:#1a1a1a; text-decoration:none;">${data.phone}</a>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:16px 20px; border-bottom:1px solid #eeeeee;">
                                            <p style="font-size:9px; letter-spacing:3px; color:#999999; text-transform:uppercase; margin:0 0 4px 0;">Project Type</p>
                                            <p style="font-size:15px; color:#1a1a1a; margin:0;">${data.type}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:16px 20px; border-bottom:1px solid #eeeeee; background:#fafafa;">
                                            <p style="font-size:9px; letter-spacing:3px; color:#999999; text-transform:uppercase; margin:0 0 4px 0;">Site Location</p>
                                            <p style="font-size:15px; color:#1a1a1a; margin:0;">${data.location}</p>
                                        </td>
                                    </tr>
                                    ${data.brief ? `
                                    <tr>
                                        <td style="padding:16px 20px;">
                                            <p style="font-size:9px; letter-spacing:3px; color:#999999; text-transform:uppercase; margin:0 0 4px 0;">Project Brief</p>
                                            <p style="font-size:14px; color:#333333; margin:0; line-height:1.6;">${data.brief}</p>
                                        </td>
                                    </tr>
                                    ` : ''}
                                </table>

                                <!-- CTA -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                                    <tr>
                                        <td align="center">
                                            <a href="mailto:${data.email}?subject=RE: Project Inquiry ${data.refNumber}" style="display:inline-block; background:#1a1a1a; color:#ffffff; padding:14px 32px; font-size:10px; letter-spacing:3px; text-transform:uppercase; text-decoration:none; border-radius:2px;">
                                                Reply to Client
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background:#fafafa; padding:24px 40px; border-top:1px solid #eeeeee; text-align:center;">
                                <p style="font-size:10px; color:#999999; margin:0; letter-spacing:1px;">
                                    Vartex Architects • <a href="https://vartexarchitects.com" style="color:#999999;">vartexarchitects.com</a> • © 2026
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

    await transporter.sendMail({
        from: `"Vartex Architects" <${process.env.ZOHO_USER}>`,
        to: process.env.ZOHO_USER,
        subject: `🔔 New Project Inquiry — ${data.name} (${data.type})`,
        html,
    });
}

/**
 * Send confirmation email to the visitor
 */
export async function sendVisitorConfirmation(data: InquiryData) {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0; padding:0; background-color:#f5f5f5; font-family: Arial, Helvetica, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5; padding:40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:2px; overflow:hidden;">

                        <!-- Header -->
                        <tr>
                            <td style="background:#1a1a1a; padding:32px 40px; text-align:center;">
                                <h1 style="color:#ffffff; font-size:14px; letter-spacing:6px; margin:0; font-weight:400;">VARTEX ARCHITECTS</h1>
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding:40px;">
                                <h2 style="font-size:22px; color:#1a1a1a; margin:0 0 24px 0; font-weight:300;">
                                    Welcome — We've Received Your Message
                                </h2>

                                <p style="font-size:15px; color:#333333; line-height:1.7; margin:0 0 8px 0;">
                                    Dear <strong>${data.name}</strong>,
                                </p>
                                <p style="font-size:15px; color:#333333; line-height:1.7; margin:0 0 24px 0;">
                                    Thank you for reaching out to Vartex Architects.
                                </p>
                                <p style="font-size:15px; color:#333333; line-height:1.7; margin:0 0 32px 0;">
                                    We've received your message and appreciate your interest in our work. A member of our team will review your inquiry and get back to you shortly.
                                </p>

                                <!-- Reference Box -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa; border:1px solid #eeeeee; border-radius:2px; margin-bottom:32px;">
                                    <tr>
                                        <td style="padding:20px 24px;">
                                            <p style="font-size:12px; color:#666666; margin:0 0 4px 0;">
                                                📋 <strong>Inquiry Reference:</strong> ${data.refNumber}
                                            </p>
                                            <p style="font-size:12px; color:#666666; margin:0;">
                                                <strong>Submitted:</strong> ${data.submittedAt}
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                                <p style="font-size:14px; color:#666666; line-height:1.6; margin:0 0 32px 0;">
                                    In the meantime, feel free to explore our projects and insights on our website.
                                </p>

                                <!-- CTA -->
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td align="center">
                                            <a href="https://vartexarchitects.com" style="display:inline-block; background:#1a1a1a; color:#ffffff; padding:14px 32px; font-size:10px; letter-spacing:3px; text-transform:uppercase; text-decoration:none; border-radius:2px;">
                                                Visit Our Website
                                            </a>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Sign off -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px; border-top:1px solid #eeeeee; padding-top:24px;">
                                    <tr>
                                        <td>
                                            <p style="font-size:14px; color:#333333; margin:0 0 4px 0;">Warm regards,</p>
                                            <p style="font-size:14px; color:#1a1a1a; margin:0; font-weight:600;">Michael Mbah</p>
                                            <p style="font-size:12px; color:#999999; margin:0;">Vartex Architects</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Disclaimer -->
                        <tr>
                            <td style="padding:16px 40px; background:#fafafa; border-top:1px solid #eeeeee;">
                                <p style="font-size:10px; color:#bbbbbb; margin:0; text-align:center; line-height:1.5;">
                                    This is an automated confirmation. A team member will contact you personally soon.
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background:#1a1a1a; padding:24px 40px; text-align:center;">
                                <p style="font-size:10px; color:#666666; margin:0; letter-spacing:1px;">
                                    Vartex Architects • <a href="https://vartexarchitects.com" style="color:#888888; text-decoration:none;">vartexarchitects.com</a> • © 2026
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

    await transporter.sendMail({
        from: `"Vartex Architects" <${process.env.ZOHO_USER}>`,
        to: data.email,
        subject: "Welcome — We've Received Your Message",
        html,
    });
}
