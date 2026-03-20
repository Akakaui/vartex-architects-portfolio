# Project Handoff: Vartex Architects Website

This guide provides everything needed to move the website to the client's GitHub and Vercel accounts.

## 1. Repository Transfer
1. **Create a new Repo**: Ask the client to create a NEW private repository on their GitHub (e.g., `vartex-architects-official`).
2. **Push the Code**: 
   - From your computer, add the client's repo as a new remote:
     ```bash
     git remote add client [CLIENT_REPO_URL]
     git push client main
     ```
3. **Grant Access**: If you need to keep updating the site, the client should add you as a **Collaborator** in their GitHub repo settings.

## 2. Vercel Configuration (Client's Side)
The client should "Import" the project from their GitHub into their own Vercel account.

### Critical Environment Variables
These MUST be added in the Vercel Dashboard (Project Settings -> Environment Variables) for the site to function:

| Variable Name | Value | Purpose |
|---------------|-------|---------|
| `SANITY_API_TOKEN` | `sk...` | **CRITICAL**: For saving leads to Sanity Dashboard |
| `RESEND_API_KEY` | `re_fQpd...` | Sending automated emails |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `[From .env.local]` | Sanity CMS connection |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Sanity CMS dataset |
| `GOOGLE_SHEETS_WEBHOOK_URL` | `[Optional]` | Backup logging to Sheets |

## 3. Sanity Lead Dashboard (Primary Lead Management)
We have built a custom **Lead Dashboard** directly into your Sanity Studio. This is the primary way to manage inquiries.
If Google Sheets fails, we have built a **Lead Dashboard** directly into your Sanity Studio. 

### How to set up Sanity Logging:
1. **Create a Token**: 
   - Go to [sanity.io/manage](https://www.sanity.io/manage) -> Your Project -> Settings -> **API Tokens**.
   - Click "Add New Token".
   - Name it "Website Contact Form".
   - Permissions: Select **"Editor"**.
   - Copy the token and add it to Vercel as `SANITY_API_TOKEN`.
2. **View Leads**: Log in to your Sanity Studio (`/admin` on your site) and you will see a new section called **"Inquiries & Leads"**. All form submissions are saved there automatically.

## 4. Domain & SEO
1. **Domain**: The client needs to add `vartexarchitects.com` in their Vercel dashboard and follow the DNS instructions (A records/CNAME).
2. **Auto-SEO**: 
   - `sitemap.xml`: Automatically generated at `https://vartexarchitects.com/sitemap.xml`
   - `robots.txt`: Automatically served at `https://vartexarchitects.com/robots.txt`
   - No manual updates are needed; the site handles this dynamically.

## 4. Google Search Console (Verification)
To start indexing the site and see traffic data, the client should add the website to **Google Search Console**.

1. **Add Property**: Choose the "Domain" option and enter `vartexarchitects.com`.
2. **Verify Ownership**: Google will provide a **TXT Record** (a string of letters and numbers).
3. **Update DNS**: The client (or you) must add this TXT record to their domain registrar (GoDaddy, Namecheap, etc.) alongside the Vercel records.
4. **Submit Sitemap**: Once verified, the client should paste `https://vartexarchitects.com/sitemap.xml` into the "Sitemaps" section of Search Console.

## 5. Ongoing Updates
As long as you are a collaborator on their GitHub repo, any change you `git push` from your end will **automatically redeploy** the website on their Vercel account.

## 6. Google Sheets Webhook
- The "Integration Guide" provided earlier explains how to set up the Google Apps Script. 
- Ensure the script is deployed as "Anyone" (even anonymous) so the website can communicate with it.
