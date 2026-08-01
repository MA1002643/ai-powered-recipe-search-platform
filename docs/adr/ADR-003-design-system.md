# ADR-003 — Design system, tokens & UI-consistency enforcement

**Status:** Accepted · 2026-08-01
**Context references:** audit §4 (current design language: palette, card idiom, inline-style mechanics, a11y state); brief §4 in full.

## Context

The brief demands pixel-consistent styling and behaviour across every OS/browser/device, driven by one token source with **no hard-coded values in components** (§4.2), a documented component library with one API everywhere (§4.3), fluid 320px→ultrawide responsiveness (§4.5), automated visual regression (§4.6), dark/light themes (§4.7), and WCAG 2.2 AA (§4.8). The audit found a real brand (deep-teal/sage palette, horizontal recipe cards, small-caps nav) implemented as ~90% inline styles with unscoped CSS leakage and fixed-`vw` layouts.

## Decision

### 1. Tokens (`packages/design-tokens`) — the single source of truth

Plain TypeScript/JSON token definitions (portable to any styling engine), consumed by Tamagui config (ADR-001) and by nothing-else-but-tokens components:

- **Colour:** brand scale formalised from the audited palette — `teal.900 #0e464a`, `teal.700 #146166`, `sage.500 #6ca678`, `sage.200 #a8c7ae`, `ink.900 #2c2628` — extended to full 50–950 ramps, plus semantic aliases (`bg.surface`, `text.primary`, `accent.brand`, `feedback.error`…) defined **per theme** (light + dark), all pairs contrast-checked to AA at their assigned usage.
- **Type scale:** modular scale (1.25) from 12→60px with line-heights; brand display face + system text stack; the audit's ad-hoc `vh` font sizing and 5-font mix retired. The small-caps spaced nav treatment survives as an explicit `nav-brand` text style — a deliberate keep of the site's most distinctive quirk.
- **Spacing / radii / elevation:** 4px-base spacing scale; radius scale formalising the audited `20px` card rounding; elevation as themed shadow tokens (the audit's `box-shadow: 20px 20px 20px 20px` grows up).
- **Motion:** duration tokens (fast 120ms / base 200ms / slow 320ms) + easing tokens; every animation consumes them; `prefers-reduced-motion` collapses durations to 0 globally (brief §4.8).

### 2. Component library (`packages/ui`)

Tamagui universal components — one API, DOM + native rendering (ADR-001). Initial inventory derived from the audited screens: `Button, Input, FormField, RecipeCard, IngredientChip, RatingStars, Card, Modal, Toast, NavBar, TabBar, Avatar, EmptyState, Skeleton, AIBadge, AssistantThread/Message/Composer`. Each component ships with: Storybook story (the living documentation, brief §4.3), axe assertions, visual-regression snapshot in both themes, and keyboard-interaction tests.

### 3. Consistency enforcement (how §4.1/§4.2/§4.4 stay true over time)

- **Lint-level ban** on literal colours/px/durations in `apps/*` and component styles (ESLint rule + stylelint token-only policy) — hard-coded values fail CI, not review.
- **No per-OS restyling:** components adapt by **size class** (breakpoint tokens), never by platform conditionals for visual style; a lint rule flags `Platform.select`/user-agent branching inside `packages/ui` views (platform branches allowed only in behaviour-neutral adapters, e.g. secure storage).
- **Visual regression in CI:** Playwright screenshot suite per component and per page at 320/768/1280/1920 in light+dark on Chromium/Firefox/WebKit (WebKit standing in for iOS Safari), plus RN screenshot tests for native — diffs block merge (brief §4.6).
- **A11y gates:** axe on every story; manual screen-reader passes (VoiceOver/NVDA/TalkBack) per milestone; focus-visible states are a token (`focus.ring`) so they can't be individually forgotten.
- **Responsiveness:** container queries/flex-first layouts; CI includes a 320px no-horizontal-overflow assertion per page (brief §4.5).

## Alternatives considered

- **Keep Bootstrap 5:** it's what exists, but it's DOM-only (fails §4.3's one-API-on-native), and the audit shows it was mostly bypassed with inline styles anyway. Retired with web v1.
- **shadcn/ui + NativeWind:** strong web story, but two component implementations (Radix DOM vs native) drift by construction — exactly what §4.4 forbids. AI Elements' shadcn-based patterns still inform the web assistant surface's composition.
- **Style Dictionary + hand-rolled components:** maximal portability, most work; Tamagui gives the token→both-renderers pipeline out of the box while our tokens stay engine-agnostic as a hedge (see ADR-001 consequences).

## Consequences

- ✅ The existing brand survives as tokens rather than inline strings; dark mode and AA contrast become properties of the token set, checked once, inherited everywhere.
- ✅ Consistency is enforced by machines (lint + snapshots), not memory.
- ⚠️ Visual-regression suites are flaky-prone; mitigation: deterministic fonts/animations-off in snapshot runs, per-pixel threshold tuning, quarantine lane for known-flaky stories.
- ⚠️ Storybook + snapshot matrix adds CI minutes; mitigation: Turborepo caching and affected-only runs.
