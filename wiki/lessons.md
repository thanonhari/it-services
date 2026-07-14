# Lessons & blueprints

Facts that already cost debugging time. Keep entries short.

## Email Sending (Workers)

Cloudflare Workers Email Sending (`env.EMAIL.send`) is a practical free-tier-friendly path for transactional alerts (e.g. bot scrape alerts) instead of burning LINE push quota or paying SendGrid for tiny volume. Needs DNS verification.

## Edge middleware logging

`functions/_middleware.ts` can classify User-Agent and `waitUntil` a log POST without blocking HTML. Static asset extensions should skip logging.

## Admin auth

LINE Login OAuth for Admin Hub gives an owner-only flow without inventing a password system. Session cookie must be Domain=`.myitdev.com` for SPA on apex + API on subdomain.

## Local vs cloud AI (product)

Local models (e.g. Gemma) help privacy experiments; Workers AI wins for always-on bot + Admin lab availability.

## Routing & SEO

Hash routes (`#blog/...`) are weak for SEO. Prefer path routes (`/blog/:slug`) with helmet/meta. Legacy hashes should redirect.

## CSP / Maps

Google Maps embeds need appropriate `frame-src` (and related CSP) or the iframe shows as blocked.

## Contact security

Turnstile on the public form; server verifies with secret. If secret missing, know the code path's fail-open/fail-closed behavior before changing it.
