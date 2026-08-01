# ADR-001 — Cross-platform & shared-codebase strategy

**Status:** Accepted · 2026-08-01
**Context references:** audit `docs/audit/CODEBASE_AUDIT.md` §2.5 (current Vue SPA), §6.3 (replace verdict + reasoning), §8 (parity checklist); brief §3 (platforms), §4.3 (one component API everywhere).

## Context

The product must run as a web app in any modern browser, as an installable desktop app on Windows/macOS/Linux, and as a mobile app on Android/iOS — with **full functional parity** and **a single source of truth for business logic, data models and UI components** (brief §3.4–3.5). Today there is one Vue 3 SPA (~1,100 lines across 7 screens, audited in full) and an Express API.

## Options considered

| Option | Assessment |
|---|---|
| **A. Keep Vue everywhere** — Vue web + Capacitor (mobile) + Electron (desktop) | Preserves the most existing code, and Capacitor genuinely ships Vue apps to stores. But mobile is a WebView (weakest native feel of all options), the Vue-native ecosystem is thin (the codebase's own `bootstrap-vue` dead-end — audit §2.6 — is a taste of that friction), and the AI-UI ecosystem we depend on in ADR-002 (AI SDK UI, AI Elements) is React-first. The preserved asset would be ~1,100 lines of inline-styled, untested code the audit already marks for replacement. |
| **B. Flutter** | Excellent parity and tooling, single codebase. But it abandons *everything*: language (Dart), web ecosystem (canvas-rendered web is poor for SEO/a11y/text), and every JS asset in the repo including the contracts/core packages the backend shares. Highest-cost reset; weakest web. |
| **C. Kotlin Multiplatform** | Strong for logic sharing, but UI sharing to web is immature; two UI stacks remain; team profile (JS throughout the repo) mismatched. |
| **D. React/TypeScript monorepo** — Next.js web · Expo/React Native mobile · Electron desktop · **Tamagui universal UI** · shared `core`/`contracts` packages | One language across every tier including the existing backend's; UI components written once in Tamagui compile to real DOM on web and real native views on mobile (not WebViews); Next.js is the strongest web runtime for the streaming-AI UX in ADR-002; Electron reuses the web build; the AI SDK's `useChat`/streaming works on both React DOM and React Native. Cost: porting 7 small audited screens off Vue. |

## Decision

**Option D.** Turborepo + pnpm monorepo:

```
packages/contracts       Zod schemas + OpenAPI — the single source of truth for data models
packages/core            domain logic, API client, offline/sync engine (pure TS, platform-free)
packages/design-tokens   ADR-003 tokens (colour/type/spacing/radii/elevation/motion)
packages/ui              Tamagui universal components — one component API, renders web + native
apps/web                 Next.js App Router (browser + PWA; also serves the API and AI layer)
apps/desktop             Electron shell around the web build (Win/macOS/Linux, auto-update)
apps/mobile              Expo (iOS/Android, EAS builds, expo-secure-store)
apps/api-v1, apps/web-v1 the audited v1 apps, frozen, until their strangler stages complete
```

Platform shells stay thin: anything that would fork business logic or component behaviour per platform must land in `packages/*` instead. Parity is enforced mechanically — the audit §8 checklist plus AI features run as an E2E matrix across all platforms in CI, and `packages/ui` is the only permitted source of UI primitives (lint rule bans app-local styling values; brief §4.2).

## Why leaving Vue is consistent with "preserve and build on what exists"

The brief (§1) directs us to build on what exists; the audit (§6) itemises what that *is*: the domain model, API contract, feature flows, brand, validation rules, and password hashes — all of which carry forward intact. The Vue layer itself is 7 screens of untested, inline-styled code with two dead components and an unbuildable import (audit §7.3.11). Re-platforming it is a bounded, days-scale port done screen-by-screen in Stage 3 *while the Vue app keeps serving production* (strangler rule, `MIGRATION_PLAN.md`). Making Vue satisfy §4.3 (identical component API on native mobile) has no comparably credible path.

## Consequences

- ✅ One component API and one logic source across five targets; parity testable, not aspirational.
- ✅ Web keeps SSR/streaming/SEO (Next), mobile gets real native views (RN), desktop is cheap (Electron).
- ⚠️ Tamagui is the load-bearing bet for §4.1/§4.3; mitigation: tokens live in `packages/design-tokens` (plain values, portable), and components keep a headless-logic/styled-view split so a styling-layer swap doesn't touch behaviour.
- ⚠️ Electron bundle size vs Tauri: chosen for ecosystem maturity and Chromium consistency with the visual-regression baseline (brief §4.1 "identical everywhere" favours shipping our own renderer); revisit in an ADR if footprint becomes a complaint.
- ⚠️ Team must learn RN/Expo specifics; bounded by Expo's managed workflow and the thin-shell rule.
