# CMS Public School — Proper Production Starter

## Deploy
This frontend is intentionally dependency-light: `index.html`, `app.js`, and `styles.css` work directly on Vercel/Netlify without a Node build step. Set the site root to this folder.

## Supabase
1. Create a Supabase project.
2. Run `supabase/migrations/001_school_erp.sql`.
3. Configure Auth providers (Google + Email/Password).
4. Enable Supabase Auth MFA/TOTP for staff.
5. Deploy the staff-login Edge Function and implement its transactional Postgres RPC before production.
6. Add environment variables from `.env.example`.

## Security
Admin/Clerk must use staff ID + password and then TOTP MFA. Do not implement the lockout only in browser JavaScript. The database/Edge Function must atomically enforce:
- failed password #1 => 1
- #2 => 2
- #3 => lock 10 minutes
- while locked => reject even correct password
- after lock => permit login
- successful authentication => reset counter

## Assets
The public site has no video background. The actual previously uploaded Base64 image payloads are not available as raw bytes in the current build runtime, so this package does NOT pretend that they were embedded. Put the supplied logo/gallery assets into `public/assets/` when those raw files are available. The UI currently uses a safe CMS fallback mark rather than a broken image.

## Scope
Public pages: Home, About, Director/Chairman, Principal, Academics, Facilities, Faculty, Admissions, Gallery, Achievements, Events, Notices, Enquiry, Contact, Portal.
ERP schema: Admin, Clerk, Teacher, Student; teacher approval; student attendance/fees/exams; notices; enquiries.
