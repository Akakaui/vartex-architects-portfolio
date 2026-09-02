"use server";

import { z } from "zod";
import { Resend } from "resend";
import { logContactSubmission } from "@/lib/sheets";
import { writeClient } from "@/sanity/lib/client";
import fs from "fs";
import path from "path";

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

function generateRefNumber(prefix = "GUIDE-"): string {
    return prefix + Math.floor(100000 + Math.random() * 900000).toString();
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

/**
 * Safely fetches guide PDFs from public/guides folder
 */
function getGuideAttachments(service: string) {
    const attachments = [];
    const publicDir = path.join(process.cwd(), "public", "guides");
    
    // Ensure guides directory exists
    if (!fs.existsSync(publicDir)) {
        console.warn(`Guides directory does not exist at: ${publicDir}`);
        return [];
    }

    const s = service.toLowerCase();

    if (s === "architecture" || s === "both" || s === "integrated") {
        const archPath = path.join(publicDir, "vartex-architecture-guide.pdf");
        if (fs.existsSync(archPath)) {
            attachments.push({
                filename: "vartex-architectural-design-guide.pdf",
                content: fs.readFileSync(archPath),
            });
            console.log("Attached Architecture Guide PDF");
        } else {
            console.warn(`Architecture guide PDF not found at: ${archPath}`);
        }
    }

    if (s === "interior" || s === "both" || s === "integrated") {
        const intPath = path.join(publicDir, "vartex-interior-guide.pdf");
        if (fs.existsSync(intPath)) {
            attachments.push({
                filename: "vartex-interior-design-guide.pdf",
                content: fs.readFileSync(intPath),
            });
            console.log("Attached Interior Guide PDF");
        } else {
            console.warn(`Interior guide PDF not found at: ${intPath}`);
        }
    }

    return attachments;
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
    const refNumber = generateRefNumber("GUIDE-");
    const submittedAt = formatSubmittedAt();
    const serviceLabel = service === "architecture" ? "Architectural Design" : "Interior Design";

    // 1. Send emails via Resend
    if (process.env.RESEND_API_KEY) {
        try {
            const BRAND = "#8B3A2F";
            const BG_WARM = "#FAF6F3";

            // Fetch attachments for this guide request
            const attachments = getGuideAttachments(service);

            // Email to visitor with guide link/info
            const visitorHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin:0; padding:0; background-color:#f0ebe7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebe7; padding:40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:4px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                                <tr>
                                    <td style="background:${BRAND}; padding:28px 40px; text-align:center;">
                                        <h1 style="color:#ffffff; font-size:14px; letter-spacing:6px; margin:0; font-weight:400; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;">VARTEX ARCHITECTS</h1>
                                        <p style="color:#ffffff; font-size:9px; letter-spacing:2px; margin:8px 0 0 0; font-family: Arial, sans-serif;">Creating Functional, Timeless and Sustainable design solutions</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:40px;">
                                        <h2 style="font-size:22px; color:#333333; margin:0 0 20px 0; font-weight:300; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;">Your Service Guide is Ready</h2>
                                        <p style="font-size:15px; color:#333333; line-height:1.7; margin:0 0 16px 0; font-family: Arial, sans-serif;">Dear <strong>${name}</strong>,</p>
                                        <p style="font-size:15px; color:#333333; line-height:1.7; margin:0 0 24px 0; font-family: Arial, sans-serif;">
                                            Thank you for your interest in our <strong>${serviceLabel}</strong> services. 
                                            We are excited to share our comprehensive service overview with you, detailing our processes, deliverables, and engagement options.
                                        </p>
                                        <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_WARM}; border-left:4px solid ${BRAND}; border-radius:4px; margin-bottom:24px;">
                                            <tr>
                                                <td style="padding:16px 20px;">
                                                    <p style="font-size:12px; color:#666666; margin:0 0 4px 0; font-family: Arial, sans-serif;"><strong>Requested Guide:</strong> ${serviceLabel}</p>
                                                    <p style="font-size:12px; color:#666666; margin:0; font-family: Arial, sans-serif;"><strong>Reference Number:</strong> ${refNumber}</p>
                                                </td>
                                            </tr>
                                        </table>
                                        <p style="font-size:14px; color:${BRAND}; line-height:1.6; margin:0 0 32px 0; font-family: Arial, sans-serif;">
                                            We have attached your requested service overview PDF to this email. If you have any questions or are ready to schedule a direct spatial consultation, please reply directly to this email or visit our contact page.
                                        </p>
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center">
                                                    <a href="https://vartexarchitects.com/contact" style="display:inline-block; background:${BRAND}; color:#ffffff; padding:14px 32px; font-size:10px; letter-spacing:3px; text-transform:uppercase; text-decoration:none; border-radius:4px; font-family: Arial, sans-serif;">
                                                        Start a Conversation
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Sign off -->
                                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px; border-top:1px solid #eeeeee; padding-top:24px;">
                                            <tr>
                                                <td>
                                                    <p style="font-size:14px; color:${BRAND}; margin:0 0 4px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Warm regards,</p>
                                                    <p style="font-size:14px; color:#1a1a1a; margin:0; font-weight:600; font-family: Arial, sans-serif;">Our director</p>
                                                    <p style="font-size:12px; color:#999999; margin:0; font-family: Arial, sans-serif;">Vartex Architects</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <!-- Disclaimer -->
                                <tr>
                                    <td style="padding:16px 40px; background:${BG_WARM}; border-top:1px solid #eeeeee;">
                                        <p style="font-size:10px; color:#bbbbbb; margin:0; text-align:center; line-height:1.5; font-family: Arial, sans-serif;">
                                            This is an automated delivery. Our design team will contact you personally soon.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background:${BRAND}; padding:20px; text-align:center;">
                                        <p style="font-size:10px; color:rgba(255,255,255,0.5); margin:0; font-family: Arial, sans-serif;">Vartex Architects • info@vartexarchitects.com • © 2026</p>
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
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin:0; padding:0; background-color:#f0ebe7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebe7; padding:40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:4px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                                <tr>
                                    <td style="background:${BRAND}; padding:28px 40px; text-align:center;">
                                        <h1 style="color:#ffffff; font-size:14px; letter-spacing:6px; margin:0; font-weight:400; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;">VARTEX ARCHITECTS</h1>
                                        <p style="color:#ffffff; font-size:9px; letter-spacing:2px; margin:8px 0 0 0; font-family: Arial, sans-serif;">Creating Functional, Timeless and Sustainable design solutions</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:40px;">
                                        <h2 style="font-size:18px; color:#333333; margin:0 0 20px 0; font-family: Arial, sans-serif;">Service Guide Requested</h2>
                                        <p style="font-size:15px; color:#333333; line-height:1.6; margin:0 0 24px 0; font-family: Arial, sans-serif;">
                                            A visitor has requested a Service Guide via the interactive website modal.
                                        </p>
                                        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eeeeee; border-radius:4px;">
                                            <tr>
                                                <td style="padding:15px 20px; border-bottom:1px solid #eeeeee; background:${BG_WARM};">
                                                    <p style="font-size:9px; letter-spacing:2px; color:#999999; text-transform:uppercase; margin:0 0 4px 0; font-family: Arial, sans-serif;">Visitor Name</p>
                                                    <p style="font-size:15px; color:#1a1a1a; margin:0; font-weight:600; font-family: Arial, sans-serif;">${name}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:15px 20px; border-bottom:1px solid #eeeeee;">
                                                    <p style="font-size:9px; letter-spacing:2px; color:#999999; text-transform:uppercase; margin:0 0 4px 0; font-family: Arial, sans-serif;">Email Address</p>
                                                    <p style="font-size:15px; color:${BRAND}; margin:0; font-family: Arial, sans-serif;"><a href="mailto:${email}" style="color:${BRAND}; text-decoration:none;">${email}</a></p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:15px 20px; background:${BG_WARM};">
                                                    <p style="font-size:9px; letter-spacing:2px; color:#999999; text-transform:uppercase; margin:0 0 4px 0; font-family: Arial, sans-serif;">Guide Requested</p>
                                                    <p style="font-size:15px; color:#1a1a1a; margin:0; font-weight:600; font-family: Arial, sans-serif;">${serviceLabel} Guide</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background:${BG_WARM}; padding:20px; text-align:center; border-top:1px solid #eeeeee;">
                                        <p style="font-size:10px; color:#999999; margin:0; font-family: Arial, sans-serif;">Vartex Architects • info@vartexarchitects.com</p>
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
                    attachments: attachments.length > 0 ? attachments : undefined,
                }),
                resend.emails.send({
                    from: `Vartex Lead Center <${process.env.EMAIL_FROM || "info@vartexarchitects.com"}>`,
                    to: [process.env.EMAIL_TO || "info@vartexarchitects.com"],
                    subject: `Guide Requested / ${name} (${serviceLabel})`,
                    html: studioHtml,
                })
            ]);
            console.log("Service Guide emails successfully processed");
        } catch (error) {
            console.error("Email sending for guide failed:", error);
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
        console.log("Google Sheets logging successfully completed for service guide request");
    } catch (error) {
        console.error("Failed to log service guide request to Sheets:", error);
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
            console.log("Service guide lead logged to Sanity");
        } catch (error) {
            console.error("Sanity logging failed for service guide:", error);
        }
    }

    return {
        success: true,
        message: "Thank you! The guide has been sent to your inbox.",
    };
}

const quizSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email is required"),
    service: z.string(),
    q1: z.string().optional(),
    q2: z.string().optional(),
});

export type QuizState = {
    message: string;
    errors?: Record<string, string[]>;
    success: boolean;
};

export async function submitQuizAction(prevState: QuizState, formData: FormData): Promise<QuizState> {
    const validatedFields = quizSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        service: formData.get("service"),
        q1: formData.get("q1"),
        q2: formData.get("q2"),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Please verify your inputs.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, service, q1, q2 } = validatedFields.data;
    const refNumber = generateRefNumber("QUIZ-");
    const submittedAt = formatSubmittedAt();
    
    let serviceLabel = "Integrated Architecture & Interior";
    if (service === "architecture") {
        serviceLabel = "Architectural Design";
    } else if (service === "interior") {
        serviceLabel = "Interior Design";
    }

    // 1. Post to Zapier Webhook (Async in background)
    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL || process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL;
    if (webhookUrl) {
        try {
            await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    service,
                    q1,
                    q2,
                    source: "quiz",
                    refNumber,
                    submittedAt
                }),
            });
            console.log("Zapier quiz logging completed");
        } catch (err) {
            console.error("Zapier webhook posting failed:", err);
        }
    }

    // 2. Send emails via Resend
    if (process.env.RESEND_API_KEY) {
        try {
            const BRAND = "#8B3A2F";
            const BG_WARM = "#FAF6F3";

            // Fetch attachments based on calculated quiz result (supports both!)
            const attachments = getGuideAttachments(service);

            // Email to visitor with guide link/info
            const visitorHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin:0; padding:0; background-color:#f0ebe7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebe7; padding:40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:4px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                                <tr>
                                    <td style="background:${BRAND}; padding:28px 40px; text-align:center;">
                                        <h1 style="color:#ffffff; font-size:14px; letter-spacing:6px; margin:0; font-weight:400; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;">VARTEX ARCHITECTS</h1>
                                        <p style="color:#ffffff; font-size:9px; letter-spacing:2px; margin:8px 0 0 0; font-family: Arial, sans-serif;">Creating Functional, Timeless and Sustainable design solutions</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:40px;">
                                        <h2 style="font-size:22px; color:#333333; margin:0 0 20px 0; font-weight:300; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;">Your Recommended Service Guide is Ready</h2>
                                        <p style="font-size:15px; color:#333333; line-height:1.7; margin:0 0 16px 0; font-family: Arial, sans-serif;">Dear <strong>${name}</strong>,</p>
                                        <p style="font-size:15px; color:#333333; line-height:1.7; margin:0 0 24px 0; font-family: Arial, sans-serif;">
                                            Thank you for taking our service matching quiz. Based on your project planning inputs, we recommend our <strong>${serviceLabel}</strong> services. 
                                            We have prepared your customized service guide detailing our engagement tiers, timelines, and exact deliverables.
                                        </p>
                                        <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_WARM}; border-left:4px solid ${BRAND}; border-radius:4px; margin-bottom:24px;">
                                            <tr>
                                                <td style="padding:16px 20px;">
                                                    <p style="font-size:12px; color:#666666; margin:0 0 4px 0; font-family: Arial, sans-serif;"><strong>Recommended Guide:</strong> ${serviceLabel}</p>
                                                    <p style="font-size:12px; color:#666666; margin:0; font-family: Arial, sans-serif;"><strong>Reference Number:</strong> ${refNumber}</p>
                                                </td>
                                            </tr>
                                        </table>
                                        <p style="font-size:14px; color:${BRAND}; line-height:1.6; margin:0 0 32px 0; font-family: Arial, sans-serif;">
                                            We have attached your recommended guide overview PDF to this email. If you have any questions or are ready to schedule a direct spatial consultation with Our director, please reply directly to this email or visit our contact page.
                                        </p>
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center">
                                                    <a href="https://vartexarchitects.com/contact" style="display:inline-block; background:${BRAND}; color:#ffffff; padding:14px 32px; font-size:10px; letter-spacing:3px; text-transform:uppercase; text-decoration:none; border-radius:4px; font-family: Arial, sans-serif;">
                                                        Start a Conversation
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Sign off -->
                                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px; border-top:1px solid #eeeeee; padding-top:24px;">
                                            <tr>
                                                <td>
                                                    <p style="font-size:14px; color:${BRAND}; margin:0 0 4px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;">Warm regards,</p>
                                                    <p style="font-size:14px; color:#1a1a1a; margin:0; font-weight:600; font-family: Arial, sans-serif;">Our director</p>
                                                    <p style="font-size:12px; color:#999999; margin:0; font-family: Arial, sans-serif;">Vartex Architects</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <!-- Disclaimer -->
                                <tr>
                                    <td style="padding:16px 40px; background:${BG_WARM}; border-top:1px solid #eeeeee;">
                                        <p style="font-size:10px; color:#bbbbbb; margin:0; text-align:center; line-height:1.5; font-family: Arial, sans-serif;">
                                            This is an automated delivery. Our design team will contact you personally soon.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background:${BRAND}; padding:20px; text-align:center;">
                                        <p style="font-size:10px; color:rgba(255,255,255,0.5); margin:0; font-family: Arial, sans-serif;">Vartex Architects • info@vartexarchitects.com • © 2026</p>
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
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin:0; padding:0; background-color:#f0ebe7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebe7; padding:40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:4px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                                <tr>
                                    <td style="background:${BRAND}; padding:28px 40px; text-align:center;">
                                        <h1 style="color:#ffffff; font-size:14px; letter-spacing:6px; margin:0; font-weight:400; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;">VARTEX ARCHITECTS</h1>
                                        <p style="color:#ffffff; font-size:9px; letter-spacing:2px; margin:8px 0 0 0; font-family: Arial, sans-serif;">Creating Functional, Timeless and Sustainable design solutions</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:40px;">
                                        <h2 style="font-size:18px; color:#333333; margin:0 0 20px 0; font-family: Arial, sans-serif;">Interactive Quiz Submission</h2>
                                        <p style="font-size:15px; color:#333333; line-height:1.6; margin:0 0 24px 0; font-family: Arial, sans-serif;">
                                            A new visitor completed the service decision flow on the website.
                                        </p>
                                        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eeeeee; border-radius:4px;">
                                            <tr>
                                                <td style="padding:15px 20px; border-bottom:1px solid #eeeeee; background:${BG_WARM};">
                                                    <p style="font-size:9px; letter-spacing:2px; color:#999999; text-transform:uppercase; margin:0 0 4px 0; font-family: Arial, sans-serif;">Visitor Name</p>
                                                    <p style="font-size:15px; color:#1a1a1a; margin:0; font-weight:600; font-family: Arial, sans-serif;">${name}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:15px 20px; border-bottom:1px solid #eeeeee;">
                                                    <p style="font-size:9px; letter-spacing:2px; color:#999999; text-transform:uppercase; margin:0 0 4px 0; font-family: Arial, sans-serif;">Email Address</p>
                                                    <p style="font-size:15px; color:${BRAND}; margin:0; font-family: Arial, sans-serif;"><a href="mailto:${email}" style="color:${BRAND}; text-decoration:none;">${email}</a></p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:15px 20px; border-bottom:1px solid #eeeeee; background:${BG_WARM};">
                                                    <p style="font-size:9px; letter-spacing:2px; color:#999999; text-transform:uppercase; margin:0 0 4px 0; font-family: Arial, sans-serif;">Planning Selections</p>
                                                    <p style="font-size:12px; color:#333333; margin:0; font-family: Arial, sans-serif;"><strong>Q1 (Planning):</strong> ${q1 || "N/A"}</p>
                                                    <p style="font-size:12px; color:#333333; margin:0; mt-1; font-family: Arial, sans-serif;"><strong>Q2 (Scale):</strong> ${q2 || "N/A"}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:15px 20px; background:${BG_WARM};">
                                                    <p style="font-size:9px; letter-spacing:2px; color:#999999; text-transform:uppercase; margin:0 0 4px 0; font-family: Arial, sans-serif;">Recommended Service</p>
                                                    <p style="font-size:15px; color:#1a1a1a; margin:0; font-weight:600; font-family: Arial, sans-serif;">${serviceLabel}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background:${BG_WARM}; padding:20px; text-align:center; border-top:1px solid #eeeeee;">
                                        <p style="font-size:10px; color:#999999; margin:0; font-family: Arial, sans-serif;">Vartex Architects • info@vartexarchitects.com</p>
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
                    subject: `Your Vartex Recommended Service Guide`,
                    html: visitorHtml,
                    attachments: attachments.length > 0 ? attachments : undefined,
                }),
                resend.emails.send({
                    from: `Vartex Lead Center <${process.env.EMAIL_FROM || "info@vartexarchitects.com"}>`,
                    to: [process.env.EMAIL_TO || "info@vartexarchitects.com"],
                    subject: `Quiz Lead / ${name} (${serviceLabel})`,
                    html: studioHtml,
                })
            ]);
            console.log("Service Guide emails successfully processed");
        } catch (error) {
            console.error("Email sending for guide failed:", error);
        }
    }

    // 3. Log to Google Sheets
    try {
        await logContactSubmission({
            refNumber,
            name,
            email,
            phone: "N/A",
            type: `Quiz Recommendation: ${serviceLabel}`,
            location: "N/A",
            brief: `Completed Matching Flow. Q1: ${q1 || "N/A"} | Q2: ${q2 || "N/A"}. Recommended Service: ${serviceLabel}.`,
            submittedAt,
        });
        console.log("Google Sheets logging successfully completed for service guide request");
    } catch (error) {
        console.error("Failed to log service guide request to Sheets:", error);
    }

    // 4. Write lead to the new quizLead Sanity Document type
    if (process.env.SANITY_API_TOKEN) {
        try {
            await writeClient.create({
                _type: "quizLead",
                refNumber,
                name,
                email,
                q1: q1 || "N/A",
                q2: q2 || "N/A",
                recommendedService: serviceLabel,
                submittedAt: new Date().toISOString(),
            });
            console.log("Quiz lead logged to Sanity using quizLead document type");
        } catch (error) {
            console.error("Sanity logging failed for quiz lead:", error);
        }
    }

    return {
        success: true,
        message: "Thank you! Your guides are on their way.",
    };
}
