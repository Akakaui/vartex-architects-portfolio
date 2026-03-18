/**
 * Log a contact form submission to a Google Sheets Webhook
 */
export async function logContactSubmission(data: {
    refNumber: string;
    name: string;
    email: string;
    phone: string;
    type: string;
    location: string;
    brief: string;
    submittedAt: string;
}) {
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!webhookUrl) {
        console.warn("⚠️ Webhook URL not configured — skipping contact log");
        return;
    }

    // Log partial URL for debugging (obfuscated)
    console.log(`📡 Sending to Webhook: ${webhookUrl.substring(0, 30)}...`);

    try {
        const payload = {
            ...data,
            formType: "contact"
        };

        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            redirect: "follow",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP Error ${response.status}: ${errorText}`);
        }

        const result = await response.json();

        if (result.result === "success") {
            console.log("✅ Successfully logged to Google Sheets via Webhook");
        } else {
            console.error("❌ Google Sheets Webhook returned error:", result.error);
        }
    } catch (error) {
        console.error("❌ Google Sheets Contact Webhook failed:", error);
    }
}
