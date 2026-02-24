"use server";

import { z } from "zod";
import { sendNewsletterWelcome, sendNewsletterOwnerNotification } from "@/lib/email";
import { logNewsletterSignup } from "@/lib/sheets";

const schema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export type NewsletterState = {
    message: string;
    success: boolean;
    errors?: Record<string, string[]>;
};

export async function newsletterSignupAction(
    prevState: NewsletterState,
    formData: FormData
): Promise<NewsletterState> {
    const validatedFields = schema.safeParse({
        email: formData.get("email"),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Please enter a valid email.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email } = validatedFields.data;

    console.log("NEW NEWSLETTER SIGNUP:", email);

    // Send emails (welcome to subscriber + notification to owner)
    if (process.env.ZOHO_USER && process.env.ZOHO_APP_PASSWORD) {
        try {
            await Promise.all([
                sendNewsletterWelcome(email),
                sendNewsletterOwnerNotification(email),
            ]);
            console.log("✅ Newsletter emails sent (welcome + owner notification)");
        } catch (error) {
            console.error("❌ Failed to send newsletter emails:", error);
        }
    } else {
        console.warn("⚠️ Zoho not configured — skipping newsletter email");
    }

    // Log to Google Sheets
    try {
        await logNewsletterSignup(email);
        console.log("✅ Newsletter signup logged to Google Sheets");
    } catch (error) {
        console.error("❌ Failed to log newsletter signup:", error);
    }

    return {
        success: true,
        message: "You're in! Welcome to the Vartex community.",
    };
}
