# Vartex Architects Website

Modern architecture portfolio and branding website built for **Vartex Architects**.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **CMS**: Sanity CMS (Studio v3)
- **Email**: Resend API
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP + ScrollTrigger
- **Language**: TypeScript

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Create a `.env.local` file with the following:
   ```env
   # Sanity Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=a4s65bdv
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=sk8BCX...

   # Resend Email Configuration
   RESEND_API_KEY=re_...

   # (Optional) Google Sheets Webhook
   GOOGLE_SHEETS_WEBHOOK_URL=https://...
   ```

3. **Run Development Mode**:
   ```bash
   npm run dev
   ```

4. **Access Admin Panel**:
   Login at `/admin` to manage projects, blog posts, and website content.

## Key Maintenance Guides

- [Handoff Guide](file:///c:/Users/AKAKA/Desktop/all%20project%20works%20on%20my%20pc%20my%20own%20and%20client%20own/alien%20meme%20website/handoff.md): Instructions for transferring to client hosting (Vercel/GitHub).
- [Integration Guide](file:///c:/Users/AKAKA/Desktop/all%20project%20works%20on%20my%20pc%20my%20own%20and%20client%20own/alien%20meme%20website/integration-guide.md): Steps for setting up Sanity, Resend, and domain verification.

## Project Structure
- `src/app`: Next.js pages and client components.
- `src/sanity`: CMS schemas and client configuration.
- `src/lib`: Shared utilities (email, logic).

---
*Created and maintained for Vartex Architects.*
