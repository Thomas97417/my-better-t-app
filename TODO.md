Ce qui existe déjà

Auth complète (sign-in/up, change name/email/password, delete account),  
 dashboard, settings, theme toggle, health check.

---

Ce qu'il faudrait ajouter

Priorité haute — Fondations manquantes

Auth

[✅] Forgot password / Reset password — flux indispensable, absent pour
l'instant

[✅] OAuth social login (Google, GitHub) — Better-Auth le supporte nativement
[✅] Email verification — désactivé pour l'instant dans auth.ts
[✅] Session management dans settings — voir/révoquer les sessions actives
(Better-Auth le supporte aussi)
[✅] 404 page — aucune gestion d'erreur de route actuellement
[✅] Landing page propre — / ne fait qu'afficher un health check
[✅] Error boundary global — pas de fallback UI en cas de crash

Pages

[✅] 404 page — aucune gestion d'erreur de route actuellement
[✅] Landing page propre — / ne fait qu'afficher un health check
[✅] Error boundary global — pas de fallback UI en cas de crash

---

Priorité moyenne — Features SaaS courantes

Settings

[✅] Avatar / photo de profil — Convex File Storage ou Cloudflare R2

Infrastructure

[ ] Emails transactionnels — Resend + React Email (reset password, welcome,
etc.)
[✅] Analytics — Posthog ou Plausible (1 ligne à ajouter)
[ ] Rate limiting — côté Convex HTTP actions

---

Priorité basse — Si le projet évolue en SaaS

[ ] Organisations / Teams — multi-tenant avec rôles (Better-Auth le supporte)
[ ] Billing / Subscriptions — Stripe + webhooks Convex
[ ] Onboarding flow — wizard post sign-up pour configurer le compte

---

Quick wins techniques

[✅] useCurrentUser hook centralisé — au lieu de répéter api.auth.getCurrentUser
partout
[✅] ConfirmDialog component réutilisable — remplacer le two-step ad-hoc dans
delete-account-card.tsx
[⚠️] Empty state component — pour les listes vides
[✅] Meta/SEO tags — title et description par route
