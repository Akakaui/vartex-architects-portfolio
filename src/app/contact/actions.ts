"use server";

import { z } from "zod";

const inquirySchema = z.object({
    name: z.string().min(2, "Name is required"),
    type: z.string(),
    location: z.string().min(2, "Location is required"),
    brief: z.string().optional(),
});

export type FormState = {
    message: string;
    errors?: Record<string, string[]>;
    success: boolean;
};

export async function contactInquiryAction(prevState: FormState, formData: FormData): Promise<FormState> {
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const validatedFields = inquirySchema.safeParse({
        name: formData.get("name"),
        type: formData.get("type"),
        location: formData.get("location"),
        brief: formData.get("brief"),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Please check the form for errors.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // LOG SUBMISSION (Ready for DB/Email integration)
    console.log("NEW INQUIRY RECEIVED:", validatedFields.data);

    // In a real app, you would:
    // 1. Save to database (e.g. Supabase)
    // 2. Send email notification (e.g. Resend)

    return {
        success: true,
        message: "Thank you. Your inquiry has been received.",
    };
}
