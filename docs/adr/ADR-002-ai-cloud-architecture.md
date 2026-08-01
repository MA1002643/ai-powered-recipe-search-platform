# ADR-002 — AI cloud architecture

**Status:** Accepted · 2026-08-01
**Context references:** audit §3.1 (today's "AI" is a client-side Spoonacular call), §7.1.1 (leaked client-held key — the anti-pattern this ADR eliminates); brief §5 in full.

## Context

The brief requires a cloud-hosted service layer that owns *all* model interaction (clients never hold provider keys — the audit shows the current code does exactly the forbidden thing), provider-agnostic routing with failover, streaming with cancellation, cloud-persisted conversations, RAG over the product's own content, and hard cost/safety rails.

## Decision

### Topology

All AI traffic flows: **client → our API (`/api/ai/*`, Next.js route handlers on Vercel) → Vercel AI Gateway → provider**. Provider keys exist only in server environment config. The gateway is the provider-agnostic seam (brief §5.1.2): models are addressed as `creator/model-slug` strings, so swapping or adding providers is config, not code. Handlers are stateless (state in Postgres/Redis), horizontally scalable by platform default (brief §5.1.4).

### Model routing (brief §5.1.3)

A versioned `ai/routing-policy.json` maps **task classes → model tiers**, resolved server-side per request:

| Task class | Tier | Examples |
|---|---|---|
| `classify` / `extract` (ingredient parsing, moderation pre-checks, titling) | fast/cheap (e.g. Haiku-class) | low tokens, high volume |
| `chat` / `summarise` (assistant turns, recipe summaries) | balanced (Sonnet-class) | default tier |
| `complex` (multi-step tool-calling plans, dietary reasoning) | frontier (Opus/Fable-class) | escalation on tool-depth or router signal |

Failover: gateway-level ordered fallback to a secondary provider per tier; if all providers fail, the feature's mandated non-AI fallback path renders (brief §5.2.6) — degraded, never broken.

### Streaming & cancellation (brief §5.1.5)

AI SDK v6 `streamText`/`toUIMessageStreamResponse` over SSE; clients use `useChat` (React DOM and React Native alike, per ADR-001) with `AbortController` cancellation propagated to the provider to stop token spend. Web assistant UI composes AI Elements components; mobile renders the same conversation state through `packages/ui` equivalents.

### Conversation & session state (brief §5.1.6, §3.7)

`conversations` + `messages` tables in Postgres keyed to user id — the same store as the rest of the product, so cross-device continuity ships with ordinary auth. Durable multi-step AI jobs (re-indexing, batch summarisation) run on Workflow DevKit (`"use workflow"`/`"use step"`), giving retries, resumability and crash-safety without bespoke queue code.

### RAG (brief §5.2.2)

- **Store:** pgvector in the same Postgres — one backup/GDPR-deletion domain, no extra vendor.
- **Chunking:** recipes are naturally structured; chunk = recipe with fielded sections (title / ingredients / directions), one embedding per recipe plus one per section for fine-grained retrieval.
- **Embeddings:** AI SDK `embedMany` via gateway; model pinned in routing policy.
- **Re-indexing:** on recipe create/edit, a Workflow job re-embeds *only* content whose SHA-256 changed (embedding cache keyed by content hash — brief §5.3.1: never regenerate unchanged work).
- **Retrieval:** hybrid — pgvector cosine + Postgres full-text keyword (the keyword path doubles as the semantic-search fallback).

### Cost, safety, reliability rails (brief §5.3)

| Rail | Implementation |
|---|---|
| Caching | Embedding cache by content hash; completion cache (Redis, TTL) keyed by normalised prompt+context for repeatable requests (summaries, titles); Anthropic prompt caching for the system/corpus prefix |
| Rate limits | Per-user sliding window + global concurrency cap (Upstash Ratelimit) on all `/api/ai/*` |
| Spend ceiling | Configurable daily/monthly budget checked against gateway usage metrics; breach → AI endpoints return `503 budget_exhausted` → clients show fallback + notice; owner notified. Halts, never silently overspends |
| Telemetry | Per-feature token counts, cost, latency, cache hit-rate — OpenTelemetry to the observability stack; no prompt bodies or PII in logs (brief §7) |
| Prompt-injection defence | Retrieved chunks and user content are wrapped as inert `<data>` blocks and never concatenated into system instructions; tool allow-list per surface; UI-driving tool outputs are Zod-validated before execution (brief §5.2.5) and destructive tools require explicit user confirmation |
| Moderation | Input + output moderation pass (fast-tier model) with abuse-handling escalation path |
| Prompt governance | Prompts are versioned files in `ai/prompts/` reviewed like code; CI runs an eval regression set (golden Q&A over a fixture corpus) on any prompt or routing change (brief §5.3.6) |
| Transparency | AI-generated content visibly labelled; settings page documents exactly what data reaches a model (brief §5.3.7) |

## Alternatives considered

- **Direct per-provider SDKs, no gateway:** more control, but re-implements routing/failover/spend telemetry the gateway provides; violates the "swap without code change" requirement in spirit.
- **Self-hosted open-weights (vLLM):** maximal control/privacy, but adds GPU ops burden disproportionate to a small team; revisit if unit costs or data-residency demand it — the gateway seam makes that a config change plus one deployment, not a rewrite.
- **Dedicated vector DB (Pinecone/Qdrant):** better at extreme scale; unnecessary operational + GDPR surface at this corpus size. pgvector keeps deletion (`DELETE FROM embeddings WHERE user_id…`) inside the existing compliance story.

## Consequences

- ✅ Every §5 requirement has a named mechanism; the leaked-key anti-pattern is structurally impossible (clients have no provider credentials to leak).
- ✅ Provider swap = config; provider outage = automatic failover; total outage = working non-AI product.
- ⚠️ Vercel platform coupling (gateway, workflows). Mitigation: all model calls go through AI SDK abstractions and our own `packages/core/ai` facade; the gateway is an endpoint URL + key, replaceable per environment.
- ⚠️ Eval/regression infrastructure is real ongoing work, not a checkbox — budgeted as its own issue in M4.
