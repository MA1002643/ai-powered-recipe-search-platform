# Migration Plan — from today's two-tier app to the cross-platform AI system

**Basis:** every decision here references `docs/audit/CODEBASE_AUDIT.md` (the audit). Architecture choices are justified in `docs/adr/ADR-001` (cross-platform), `ADR-002` (AI cloud), `ADR-003` (design system).
**Prime rule (brief §2.4):** the product stays live and working at the end of every stage. No big-bang rewrite. The existing Vue app + Express API are "v1" and remain the production system until the new surfaces demonstrably reach parity (audit §8 checklist) and are switched over stage by stage — a classic strangler-fig migration.

Stages map 1:1 to the GitHub milestones (M0–M7). Dates assume start 2026-08-03; each stage's exit criteria gate the next.

---

## Stage 0 — Stabilise & secure the baseline (M0, due 2026-08-21)

*Goal: make v1 safe, honest, and buildable everywhere — without changing its behaviour.*

- **Hour zero:** revoke/rotate the leaked Spoonacular RapidAPI key (audit §7.1.1); remove `config.js` from tracking; gitignore it; enable GitHub secret scanning + push protection; add gitleaks to CI.
- Remove hard-coded admin seeding (audit §7.1.2); fix SECURITY.md to use private advisories (§7.1.3).
- Fix the broken absolute-path `API_KEY` import so the frontend builds on any machine (env-injected at dev time, still dev-only until Stage 4 moves Spoonacular server-side).
- Fix the known runtime bugs (audit §7.3: Dashboard TypeError, ratings controller flow, saved-recipe links, undeclared deps, dead components removed).
- Close the auth gaps that don't require redesign: route-level auth on `POST /recipes`, ownership checks on PATCH/DELETE, rating bounds (audit §7.2).
- Introduce `.env` config for port/URLs/keys on both tiers.
- Real CI: build both workspaces, ESLint + Prettier, first regression tests around auth + recipes (the seed of the test suite the README already advertises).
- Correct the README's false claims (audit §7.4).

**Exit criteria:** clean clone builds and runs both tiers with documented steps; CI green and meaningful; leaked key dead; parity checklist (audit §8) passes manually.
**Live-site guarantee:** only fixes; no framework/infra changes.

## Stage 1 — Monorepo foundation & typed core (M1, due 2026-09-11)

*Goal: create the single source of truth without touching production behaviour.*

- Turborepo + pnpm workspaces; move `Backend/` → `apps/api-v1`, `Frontend/Recipe-Frontend/` → `apps/web-v1` **unchanged** (git history preserved via `git mv`).
- `packages/contracts`: Zod schemas for every entity and endpoint in the audit's API table (§2.4), generated OpenAPI 3 doc replacing swagger-autogen; port the Joi rules (password policy etc.) verbatim.
- `packages/core`: TypeScript domain logic (recipe normalisation, ingredient parsing, session rules) extracted from v1 by porting, with unit tests.
- TypeScript, shared ESLint/Prettier config, Changesets for semver, ADR process live in `docs/adr/`.

**Exit criteria:** v1 apps run unchanged inside the monorepo; contracts package published internally and consumed by tests that verify v1's actual responses match the schemas (contract tests pin current behaviour before anything moves).

## Stage 2 — API v2 strangler: auth, Postgres, cloud (M2, due 2026-10-09)

*Goal: stand up the modern backend beside v1 and migrate the data spine.*

- `apps/api`: Next.js route handlers (Node runtime) implementing the same contract from `packages/contracts` — endpoint-for-endpoint parity with v1 (audit §2.4 table is the spec).
- Postgres (Neon) + Drizzle ORM; schema ports the 4 tables incl. the `savedRecipes` dual-source design re-modelled as `recipe_source` (audit §6.2); migration script imports `db.sqlite` data; PBKDF2 verification preserved so existing users log in unchanged (audit §6.1).
- New auth: httpOnly-cookie sessions (web) + short-lived bearer tokens for native (Stage 6), expiry + refresh, replacing the eternal single token (audit §7.2.6); rate limiting (Upstash) on auth + write routes.
- Spoonacular moves **server-side** behind `/api/search` with the key in server env only — closing the brief §5.1.1 violation for good.
- v1 frontend switched to v2 API via base-URL env flip; v1 API kept runnable as rollback for one stage.

**Exit criteria:** production traffic on API v2 + Postgres; contract tests green against v2; rollback path documented and tested; no client holds any provider key.

## Stage 3 — Design system & web app v2 (M3, due 2026-11-06)

*Goal: the shared UI that all three platforms will render.*

- `packages/design-tokens`: colour (audit §4 palette formalised, incl. dark variants), type scale, spacing, radii, elevation, motion durations/easing — no hard-coded values downstream (brief §4.2).
- `packages/ui`: Tamagui-based universal components (Button, Card, RecipeCard, IngredientChip, forms, modal, toast, nav) with one component API for web + native (ADR-001/003); Storybook as the living component library doc (brief §4.3).
- `apps/web`: Next.js App Router app re-implementing the 7 audited screens (audit §2.5) from `packages/ui` + `packages/core`, with SSR, PWA install + offline shell, light/dark, WCAG 2.2 AA baseline, 320px→ultrawide fluidity replacing the `50vw` fixed containers (audit §4).
- Visual regression (Playwright screenshots per component/page, both themes) + axe checks in CI (brief §4.6/4.8).
- Cutover: `apps/web` becomes production web; `apps/web-v1` archived (kept in history, removed from deploy).

**Exit criteria:** parity checklist passes on the new web app; Lighthouse a11y ≥ 95; visual-regression suite gating PRs; v1 frontend retired from production.

## Stage 4 — AI cloud layer (M4, due 2026-12-04)

*Goal: the model-serving backbone (brief §5.1) — before user-facing AI features.*

- `/api/ai/*` served by AI SDK v6 through **Vercel AI Gateway**: provider-agnostic model IDs, automatic failover, per-request spend attribution (ADR-002).
- Model routing policy in versioned config: fast/cheap tier for classification-y tasks, frontier tier for generation; documented and hot-swappable (brief §5.1.3).
- SSE streaming to all clients with abort/cancellation; conversation/session state persisted in Postgres keyed to user, synced across devices (brief §5.1.5–6).
- Cost & safety rails from day one: completion + embedding caches, per-user and global rate limits, configurable spend ceiling that halts generation and notifies (brief §5.3.1–3); token/latency metrics per feature; prompt-injection defences and IO moderation (brief §5.3.4–5); prompts version-controlled with a regression eval set in CI (brief §5.3.6).

**Exit criteria:** a smoke "assistant echo" endpoint streams through the full stack (gateway → routing → persistence → metrics → cancellation) on web; provider failover demonstrated by killing the primary in staging; spend ceiling demonstrated in staging.

## Stage 5 — RAG & assistant features (M5, due 2027-01-15; holiday-padded)

*Goal: the user-facing intelligence (brief §5.2), grounded in the site's own content.*

- Embeddings pipeline over the recipes corpus: chunking strategy, pgvector store, content-hash caching so unchanged recipes are never re-embedded, re-index triggered on recipe create/edit via Workflow DevKit durable jobs (brief §5.2.2, §5.3.1).
- Assistant surface ("Sous-chef") in `packages/ui` (universal component, AI Elements patterns on web): pantry-aware chat grounded in the corpus with citations; the audited pantry-search flow becomes its richest tool.
- Semantic search + AI summaries + natural-language navigation ("show me quick veggie pasta") via structured tool-calling outputs schema-validated before the UI acts (brief §5.2.3, §5.2.5).
- Personalisation from saved recipes/ratings/preferences with explicit user control (brief §5.2.4).
- Every AI feature ships with its non-AI fallback path (keyword search, plain feed) and clear AI-content labelling (brief §5.2.6, §5.3.7).

**Exit criteria:** assistant + semantic search live on web behind a feature flag → GA; eval suite green; fallbacks verified by chaos-testing the model layer off.

## Stage 6 — Desktop & mobile shells, offline & sync (M6, due 2027-02-19)

*Goal: the same product, installable everywhere (brief §3).*

- `apps/mobile`: Expo (iOS + Android) rendering `packages/ui` screens; secure token storage (Keychain/Keystore via expo-secure-store); store-readiness (EAS builds).
- `apps/desktop`: Electron (Win/macOS/Linux) wrapping the web app with auto-update, deep links, OS credential storage.
- Offline-first data layer in `packages/core`: local cache (SQLite on native — the one place SQLite survives, fulfilling its dev-era role), queued mutations, sync-on-reconnect with last-write-wins + user-visible conflict resolution for recipe edits (brief §3.6).
- Cross-device continuity: session + assistant conversations resume on any device (brief §3.7, §5.1.6).
- Parity CI: the audit §8 checklist plus AI features run as an automated E2E matrix on web/desktop/mobile; visual regression extended to native snapshots (brief §3.4, §4.6).

**Exit criteria:** installable builds for all 5 targets; parity matrix green; offline edit→reconnect→sync demonstrated; no platform-specific visual divergence beyond responsive adaptation.

## Stage 7 — Hardening, compliance & launch (M7, due 2027-03-19)

*Goal: production-grade trust (brief §6–7).*

- Threat model (STRIDE) documented; OWASP Top 10 + OWASP LLM Top 10 review with fixes; dependency/supply-chain scanning (Dependabot + osv-scanner + SBOM) gating CI.
- UK-GDPR: lawful-basis record, privacy policy, data minimisation pass, log/analytics scrub (no PII/prompts in logs), self-serve data export and full account deletion incl. vectors and conversations.
- WCAG 2.2 AA verification: keyboard, screen-reader (VoiceOver/NVDA/TalkBack), contrast, reduced-motion across platforms.
- Load/perf testing; graceful-degradation drills (provider down, DB failover); observability dashboards + alerts; runbooks.
- Semantic-versioned 2.0.0 release; store submissions; launch.

**Exit criteria:** security review signed off; GDPR flows demonstrated end-to-end; a11y audit passed; 2.0.0 tagged and released on web + desktop + both app stores.

---

## Rollback & safety net summary

| Stage | If it goes wrong |
|---|---|
| 0–1 | Pure fixes/moves; revert commits |
| 2 | Base-URL flip back to v1 API (kept warm one full stage); SQLite snapshot retained |
| 3 | Web v1 redeployable from tag until Stage 4 starts |
| 4–5 | AI endpoints feature-flagged; product fully functional with flags off (the mandated non-AI fallbacks double as the rollback) |
| 6 | Store rollouts staged (phased release); desktop auto-update supports version pinning |
| 7 | Launch gate is a checklist, not a date — slips before ships |
