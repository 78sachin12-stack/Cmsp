// Supabase Edge Function boundary for Admin/Clerk authentication.
// Keep SUPABASE_SERVICE_ROLE_KEY server-side only.
// The password gate must call a transactional Postgres RPC that atomically
// checks locked_until, verifies the password, increments failed_attempts,
// locks for 10 minutes on the third failure, and resets on success.
// Then the client completes Supabase Auth MFA/TOTP challenge + verify.
