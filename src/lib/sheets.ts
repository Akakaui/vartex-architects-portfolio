import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

/**
 * Get authenticated Google Spreadsheet instance
 */
async function getSpreadsheet() {
    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON || "{}");
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || "";

    const auth = new JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(spreadsheetId, auth);
    await doc.loadInfo();
    return doc;
}

/**
 * Log a contact form submission to the first sheet tab
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
    if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID || !process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON) {
        console.warn("⚠️ Google Sheets not configured — skipping contact log");
        return;
    }

    try {
        const doc = await getSpreadsheet();
        const sheet = doc.sheetsByIndex[0]; // First tab = Contact Form
        await sheet.addRow({
            Date: data.submittedAt,
            Reference: data.refNumber,
            Name: data.name,
            Email: data.email,
            Phone: data.phone,
            "Project Type": data.type,
            Location: data.location,
            Brief: data.brief,
        });
    } catch (error) {
        console.error("❌ Google Sheets contact log failed:", error);
    }
}

/**
 * Log a newsletter signup to the "Newsletter" tab
 */
export async function logNewsletterSignup(email: string) {
    if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID || !process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON) {
        console.warn("⚠️ Google Sheets not configured — skipping newsletter log");
        return;
    }

    try {
        const doc = await getSpreadsheet();
        const sheet = doc.sheetsByTitle["Newsletter"]; // Second tab
        if (!sheet) {
            console.error("❌ 'Newsletter' tab not found in spreadsheet");
            return;
        }

        const now = new Date().toLocaleString("en-US", {
            weekday: "long", year: "numeric", month: "long",
            day: "numeric", hour: "2-digit", minute: "2-digit",
        });

        await sheet.addRow({ Date: now, Email: email });
    } catch (error) {
        console.error("❌ Google Sheets newsletter log failed:", error);
    }
}
