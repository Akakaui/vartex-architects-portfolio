"use server";

import { z } from "zod";
import { Resend } from "resend";
import { logContactSubmission } from "@/lib/sheets";
import { writeClient } from "@/sanity/lib/client";

const resend = new Resend(process.env.RESEND_API_KEY);

const guideSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email is required"),
    service: z.string(),
});

export type GuideState = {
    message: string;
    errors?: Record<string, string[]>;
    success: boolean;
};

function generateRefNumber(): string {
    return "GUIDE-" + Math.floor(100000 + Math.random() * 900000).toString();
}

function formatSubmittedAt(): string {
    return new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export async function requestGuideAction(prevState: GuideState, formData: FormData): Promise<GuideState> {
    const validatedFields = guideSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        service: formData.get("service"),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Please verify your inputs.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, service } = validatedFields.data;
    const refNumber = generateRefNumber();
    const submittedAt = formatSubmittedAt();
    const serviceLabel = service === "architecture" ? "Architectural Design" : "Interior Design";

    // 1. Send emails via Resend
    if (process.env.RESEND_API_KEY) {
        try {
            const BRAND = "#8B3A2F";
            const BG_WARM = "#FAF6F3";

            // Email to visitor with guide link/info
            const visitorHtml = `
            <!DOCTYPE html>
            <html>
            <body style="margin:0; padding:0; background-color:#f0ebe7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebe7; padding:40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:4px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                                <tr>
                                    <td style="background:${BRAND}; padding:28px 40px; text-align:center;">
                                        <h1 style="color:#ffffff; font-size:14px; letter-spacing:6px; margin:0; font-weight:400;">VARTEX ARCHITECTS</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:40px;">
                                        <h2 style="font-size:22px; color:#333333; margin:0 0 20px 0; font-weight:300;">Your Service Guide is Ready</h2>
                                        <p style="font-size:15px; color:#333333; line-height:1.7; margin:0 0 16px 0;">Dear <strong>${name}</strong>,</p>
                                        <p style="font-size:15px; color:#333333; line-height:1.7; margin:0 0 24px 0;">
                                            Thank you for your interest in our <strong>${serviceLabel}</strong> services. 
                                            We are excited to share our comprehensive service overview with you, detailing our processes, deliverables, and engagement options.
                                        </p>
                                        <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_WARM}; border-left:4px solid ${BRAND}; border-radius:4px; margin-bottom:24px;">
                                            <tr>
                                                <td style="padding:16px 20px;">
                                                    <p style="font-size:12px; color:#666666; margin:0 0 4px 0;"><strong>Requested Guide:</strong> ${serviceLabel}</p>
                                                    <p style="font-size:12px; color:#666666; margin:0;"><strong>Reference Number:</strong> ${refNumber}</p>
                                                </td>
                                            </tr>
                                        </table>
                                        <p style="font-size:14px; color:${BRAND}; line-height:1.6; margin:0 0 32px 0;">
                                            If you have any questions or are ready to schedule a direct spatial consultation, please reply directly to this email or visit our contact page.
                                        </p>
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center">
                                                    <a href="https://vartexarchitects.com/contact" style="display:inline-block; background:${BRAND}; color:#ffffff; padding:14px 32px; font-size:10px; letter-spacing:3px; text-transform:uppercase; text-decoration:none; border-radius:4px;">
                                                        Start a Conversation
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background:${BG_WARM}; padding:20px; text-align:center; border-top:1px solid #eeeeee;">
                                        <p style="font-size:10px; color:#999999; margin:0;">Vartex Architects • info@vartexarchitects.com • © 2026</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>`;

            // Email notification to the studio
            const studioHtml = `
            <!DOCTYPE html>
            <html>
            <body style="margin:0; padding:0; background-color:#f0ebe7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebe7; padding:40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:4px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                                <tr>
                                    <td style="background:${BRAND}; padding:28px 40px; text-align:center;">
                                        <h1 style="color:#ffffff; font-size:14px; letter-spacing:6px; margin:0; font-weight:400;">VARTEX ARCHITECTS</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:40px;">
                                        <h2 style="font-size:18px; color:#333333; margin:0 0 20px 0;">📬 Service Guide Requested</h2>
                                        <p style="font-size:15px; color:#333333; line-height:1.6; margin:0 0 24px 0;">
                                            A visitor has requested a Service Guide via the interactive website modal.
                                        </p>
                                        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eeeeee; border-radius:4px;">
                                            <tr>
                                                <td style="padding:15px 20px; border-bottom:1px solid #eeeeee; background:${BG_WARM};">
                                                    <p style="font-size:9px; letter-spacing:2px; color:#999999; text-transform:uppercase; margin:0 0 4px 0;">Visitor Name</p>
                                                    <p style="font-size:15px; color:#1a1a1a; margin:0; font-weight:600;">${name}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:15px 20px; border-bottom:1px solid #eeeeee;">
                                                    <p style="font-size:9px; letter-spacing:2px; color:#999999; text-transform:uppercase; margin:0 0 4px 0;">Email Address</p>
                                                    <p style="font-size:15px; color:${BRAND}; margin:0;"><a href="mailto:${email}" style="color:${BRAND}; text-decoration:none;">${email}</a></p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:15px 20px; background:${BG_WARM};">
                                                    <p style="font-size:9px; letter-spacing:2px; color:#999999; text-transform:uppercase; margin:0 0 4px 0;">Guide Requested</p>
                                                    <p style="font-size:15px; color:#1a1a1a; margin:0; font-weight:600;">${serviceLabel} Guide</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background:${BG_WARM}; padding:20px; text-align:center; border-top:1px solid #eeeeee;">
                                        <p style="font-size:10px; color:#999999; margin:0;">Vartex Architects • info@vartexarchitects.com</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>`;

            await Promise.all([
                resend.emails.send({
                    from: `Vartex Architects <${process.env.EMAIL_FROM || "info@vartexarchitects.com"}>`,
                    to: [email],
                    subject: `Your Vartex ${serviceLabel} Service Guide`,
                    html: visitorHtml,
                }),
                resend.emails.send({
                    from: `Vartex Lead Center <${process.env.EMAIL_FROM || "info@vartexarchitects.com"}>`,
                    to: [process.env.EMAIL_TO || "info@vartexarchitects.com"],
                    subject: `📬 Guide Requested — ${name} (${serviceLabel})`,
                    html: studioHtml,
                })
            ]);
            console.log("✅ Service Guide emails successfully processed");
        } catch (error) {
            console.error("❌ Email sending for guide failed:", error);
        }
    }

    // 2. Log to Google Sheets
    try {
        await logContactSubmission({
            refNumber,
            name,
            email,
            phone: "N/A",
            type: `Service Guide: ${serviceLabel}`,
            location: "N/A",
            brief: `Service Guide requested via interactive download modal.`,
            submittedAt,
        });
        console.log("✅ Google Sheets logging successfully completed for service guide request");
    } catch (error) {
        console.error("❌ Failed to log service guide request to Sheets:", error);
    }

    // 3. Write lead in Sanity CMS
    if (process.env.SANITY_API_TOKEN) {
        try {
            await writeClient.create({
                _type: "lead",
                refNumber,
                name,
                email,
                phone: "N/A",
                type: `Service Guide: ${serviceLabel}`,
                location: "N/A",
                brief: `Requested service guide download.`,
                submittedAt: new Date().toISOString(),
            });
            console.log("✅ Service guide lead logged to Sanity");
        } catch (error) {
            console.error("❌ Sanity logging failed for service guide:", error);
        }
    }

    return {
        success: true,
        message: "Thank you! The guide has been sent to your inbox.",
    };
}
