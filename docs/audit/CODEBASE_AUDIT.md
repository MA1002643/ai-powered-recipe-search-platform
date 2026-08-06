# Codebase Audit — Culina (audited as `ai-powered-recipe-search-platform`)

**Audit date:** 1 August 2026
**Auditor:** Automated full-codebase review (every file read; nothing sampled)
**Scope:** Entire repository at commit `bbdbdca` on `main`
**Status:** This document is the baseline required by the project brief (§2). All architecture decisions in `docs/adr/` and the staged plan in `docs/MIGRATION_PLAN.md` reference this audit. Nothing in the target architecture assumes a greenfield build.

---

## 1. Executive summary

The brief describes the starting point as "a simple static website". The audit shows the reality is more valuable than that: this is a **two-tier full-stack application** — a Vue 3 + Vite single-page app (`Frontend/Culina-Frontend/`) and an Express + SQLite REST API (`Backend/`) — built as a university-style project around a clear product idea: *find recipes from the ingredients in your pantry*.

- **~5,100 lines of first-party source** (excluding lockfiles and generated Swagger output).
- **Working features today:** ingredient-based recipe search (via the external Spoonacular API), a community recipe feed with CRUD, saving recipes to a personal dashboard, a ratings API, and email/password authentication with session tokens.
- **A real, documented API surface** (14 endpoints, Swagger UI at `/api-docs`).
- **A recognisable brand:** deep teal/green palette, card-based layout, lowercase small-caps navigation.

The codebase also carries serious defects, including one **critical, currently exploitable security issue** (a live third-party API key committed to this public repository — §7.1) and several runtime bugs. These are catalogued in §7 with severity ratings.

**Bottom line:** the product concept, domain model, API contract, feature set, and brand are worth keeping and are the foundation of the target system. The *implementations* on both tiers are small enough (~1,100 lines of frontend logic, ~900 of backend) that porting them into the target architecture is cheaper and safer than incrementally patching them in place — but this happens via a staged strangler migration (see `docs/MIGRATION_PLAN.md`), never a big-bang rewrite.

---

## 2. Repository inventory (complete)

### 2.1 Repository metadata

| Item | Value |
|---|---|
| GitHub repo | `MA1002643/culina` (public; renamed from `ai-powered-recipe-search-platform` on 2026-08-01, which was itself renamed from `recipe-finder` — both old URLs redirect) |
| Default branch | `main` |
| History | 20 commits, first commit 2025-10-09 |
| License | MIT (root, plus duplicate LICENSE files in `Backend/` and `Frontend/Culina-Frontend/`) |

### 2.2 Root files

| File | Lines | What it is | Notes |
|---|---:|---|---|
| `README.md` | 501 | Project overview, badges, structure, setup | Partly auto-generated; **contains false claims** (§7.4) |
| `CONTRIBUTING.md` | 175 | Contribution guide | Recently fixed to reference correct repo |
| `CODE_OF_CONDUCT.md` | 100 | Contributor covenant | Keep |
| `SECURITY.md` | 55 | Security policy | Tells reporters to open **public** issues for vulnerabilities — must be fixed (§7.5) |
| `LICENSE` | — | MIT | Keep |
| `config.js` | 1 | `export const API_KEY = '…'` | **CRITICAL: live RapidAPI (Spoonacular) key committed to a public repo** (§7.1) |
| `.gitignore` | 4 | `.DS_Store`, `node_modules/`, `.env`, `db.sqlite` | Correctly ignores the DB; does not ignore `config.js` |
| `.DS_Store` | — | macOS noise | Tracked; should be removed |

### 2.3 `.github/` — CI and repo automation

| File | Purpose | Assessment |
|---|---|---|
| `workflows/ci.yml` (13 lines) | On PR: `npm ci`, `lint --if-present`, `test --if-present` at **repo root** | Effectively a no-op: there is no root `package.json`, so `npm ci` fails or does nothing useful; neither workspace is built or tested. Needs a real pipeline. |
| `workflows/update-contributors.yml` + `scripts/update-contributors.js` | Auto-updates contributor avatars in README | Keep — harmless automation |
| `workflows/update-project-index.yml` (316 lines) | AI-generated "Project Index" section in README | Keep for now; its output mislabels files (e.g. controllers as "WebSocket-related") — treat as cosmetic |
| `workflows/update-project-structure.yml` | Auto-updates README structure tree | Keep for now |
| `workflows/update-tech-badges-single-repo.yml` | Auto-updates tech badges | Keep for now |
| `ISSUE_TEMPLATE/bug_report.yml`, `feature_request.yml`, `config.yml` | Issue forms | Keep; links recently fixed |
| `PULL_REQUEST_TEMPLATE/pull_request_template.yml` | PR template | Keep |
| `CODEOWNERS` | Code ownership | Keep |

### 2.4 `Backend/` — Express + SQLite REST API

| File | Lines | Purpose |
|---|---:|---|
| `server.js` | 44 | Express bootstrap; port hard-coded to `3333`; morgan logging; CORS (unrestricted); mounts Swagger UI at `/api-docs`; wires the three route modules; 404 fallback |
| `database.js` | 129 | Opens `db.sqlite`; creates 4 tables on boot; **seeds an admin account `admin@admin.com` / `Admin123!` (hard-coded)** and two sample recipes |
| `app/routes/users.routes.js` | 16 | `/register`, `/login`, `/logout`, `/users/:user_id` |
| `app/routes/recipe.routes.js` | 23 | `/recipes` (GET/POST), `/recipes/:recipe_id` (GET/PATCH/DELETE), `/recipesByUser`, `/recipeSave` (GET/POST), `/recipeSave/:saved_id` (DELETE) |
| `app/routes/ratings.routes.js` | 8 | `/recipes/:recipe_id/ratings` (GET/POST) |
| `app/controllers/users.controller.js` | 82 | Register (Joi validation incl. password-strength regex), login (issues session token), logout, get user |
| `app/controllers/recipe.controller.js` | 165 | Feed CRUD, save/unsave, per-user listings; mixed auth handling (§7.3) |
| `app/controllers/ratings.controller.js` | 51 | Add rating, get average rating; contains an async-flow bug (§7.3) |
| `app/models/users.model.js` | 122 | SQL + crypto: PBKDF2-SHA256 (100k iterations) password hashing with per-user salt; session token get/set/remove |
| `app/models/recipe.model.js` | 152 | SQL for feed and saved recipes |
| `app/models/ratings.model.js` | 40 | SQL for ratings |
| `app/libs/middleware.js` | 16 | `isAuthenticated` — validates `X-Authorization` token against the users table |
| `swagger.js` / `swagger.json` | 5 / 512 | swagger-autogen config + generated OpenAPI 2.0 spec |
| `package.json` | 34 | Scripts: `dev` (nodemon), `swagger-docs`; **no working `test` script** despite mocha/chai in dependencies; test/dev tools listed under `dependencies` instead of `devDependencies` |
| `db.sqlite` | — | Local dev database (correctly gitignored, present on disk) |
| `README.md` | 1 | One line |

**Database schema (SQLite, created imperatively on boot in `database.js`):**

| Table | Columns | Notes |
|---|---|---|
| `users` | user_id PK, first_name, last_name, email UNIQUE, password (hash), salt, session_token | Single mutable session token per user; no expiry |
| `feedRecipes` | recipe_id PK, image (URL), title UNIQUE, ingredients (comma-separated text), directions (text), date_published, date_edited, created_by FK | Ingredients as CSV text — no structure |
| `ratings` | rating_id PK, rating INT, date_published, recipe_id FK, posted_by FK | No 1–5 bound; users can rate repeatedly |
| `savedRecipes` | saved_id PK, recipe_id (nullable), image, title, ingredients, directions, date_published, created_by, saved_by; UNIQUE(recipe_id, saved_by) | **Denormalised copy** of recipe data so external (Spoonacular) recipes can also be saved — an intentional design worth understanding: `recipe_id` is null for external saves |

**API surface (the de-facto contract to preserve):**

| Method + path | Auth | Behaviour |
|---|---|---|
| `POST /register` | – | Create user (Joi-validated; strong-password regex) |
| `POST /login` | – | Returns `{user_id, session_token}`; reuses existing token if present |
| `POST /logout` | token | Clears session token |
| `GET /users/:user_id` | token | Public profile fields |
| `GET /recipes` | – | Full feed |
| `POST /recipes` | token (checked in controller, **not** middleware) | Create recipe |
| `GET /recipes/:recipe_id` | – | Single recipe |
| `PATCH /recipes/:recipe_id` | middleware | Partial update — **no ownership check** (§7.2) |
| `DELETE /recipes/:recipe_id` | middleware | Delete — **no ownership check** (§7.2) |
| `GET /recipesByUser` | middleware | Recipes created by the caller |
| `GET /recipeSave` / `POST /recipeSave` | middleware | List / save recipes (incl. external ones) |
| `DELETE /recipeSave/:saved_id` | middleware | Remove saved — **no ownership check** (§7.2) |
| `GET`/`POST /recipes/:recipe_id/ratings` | GET open / POST token | Average rating / add rating |

### 2.5 `Frontend/Culina-Frontend/` — Vue 3 + Vite SPA

| File | Lines | Purpose |
|---|---:|---|
| `index.html` | 13 | Shell; title still "Vite App"; references `/favicon.ico` which **does not exist** |
| `src/main.js` | 10 | Boots Vue; imports Bootstrap CSS/JS **plus `jquery` and `popper.js`, neither declared in `package.json`** (resolve only via hoisted transitive deps — fragile, §7.3) |
| `src/router/index.js` | 36 | 7 routes; naive auth guard (`localStorage` check + `alert()`) |
| `src/services/users.service.js` | 98 | login/logout/register against `http://localhost:3333` (hard-coded); stores `user_id` + `session_token` in `localStorage` |
| `src/services/feed.service.js` | 84 | Feed list/get/post against hard-coded localhost |
| `src/services/recipes.service.js` | 210 | **Calls Spoonacular directly from the browser** with the API key imported from `/Users/muhammadabdullah/Desktop/GitHub/Recipe/config.js` — an **absolute local filesystem path** that breaks the build on every other machine (§7.1, §7.3); also save/unsave/my-recipes against localhost |
| `src/views/App.vue` | 54 | Navbar (brand + home/feed/dashboard/login) + router outlet; brand styling inline |
| `src/views/pages/Home.vue` | 133 | Pantry-ingredient search UI: add/remove ingredient chips, search, result cards, save |
| `src/views/pages/Feed.vue` | 45 | Community feed list |
| `src/views/pages/Recipe.vue` | 85 | Recipe detail: image, directions, ingredient checklist, save |
| `src/views/pages/Dashboard.vue` | 120 | Two-pane: saved recipes + my recipes; delete saved; **contains a guaranteed runtime TypeError** (§7.3) |
| `src/views/pages/Login.vue` | 133 | Login form with client-side validation |
| `src/views/pages/Signup.vue` | 210 | Registration form; stock hero image hotlinked from hearstapps.com |
| `src/views/pages/RecipeCreate.vue` | 144 | Create-recipe form |
| `src/views/components/recipe_modal.vue` | 55 | Modal for external recipe details — **currently commented out of Home.vue and dead** |
| `src/views/components/button_test.vue` | 12 | Empty test component — dead code |
| `vite.config.js` | 14 | Standard Vue plugin + `@` alias |
| `package.json` | 22 | vue 3.2, vue-router 4, vite 4, axios, bootstrap 5.2, **bootstrap-vue 2.23 (Vue 2-only — incompatible with Vue 3, installed but unusable)**, email-validator |

### 2.6 Dependency inventory & health

| Package | Where | Verdict |
|---|---|---|
| vue 3.2 / vue-router 4 / vite 4 | Frontend | Sound choices, now ~3 major versions behind current |
| bootstrap 5.2 | Frontend | Works; imported globally; all styling otherwise inline `style=""` attributes |
| bootstrap-vue 2.23 | Frontend | **Dead weight** — Vue 2 only; never usable with Vue 3; remove |
| axios | Frontend | Used only in `recipes.service.js`; everything else uses `fetch` — inconsistent |
| email-validator | Frontend | Fine |
| jquery / popper.js | Frontend (undeclared) | Imported in `main.js` without being dependencies; Bootstrap 5 needs neither; remove |
| express 4 / cors / morgan / joi | Backend | Sound; Joi validation is a genuine strength |
| sqlite3 | Backend | Fine for dev; not a multi-device sync target |
| mocha / chai / chai-http / nodemon | Backend `dependencies` | Test/dev tooling in prod deps; **zero test files exist** |
| swagger-autogen / swagger-ui-express | Backend | Working API docs — a strength |

---

## 3. What the product does today (functional inventory)

1. **Pantry search (the signature feature):** on Home, the user accumulates ingredient chips and searches; the app queries Spoonacular `findByIngredients`, then fetches details + summary per result, and renders cards. Results can be saved to the dashboard. *Note: "AI-powered" today means calling a third-party recipe-matching API — there is no LLM anywhere in the codebase.*
2. **Community feed:** all users' recipes, newest-first card list; click through to detail.
3. **Recipe detail:** image, directions, ingredient checklist, save button.
4. **Create recipe:** authenticated form (title, ingredients, directions, image URL) posting to the feed.
5. **Dashboard:** side-by-side "Saved Recipes" and "My Recipes", with delete-saved.
6. **Accounts:** register (strong-password enforcement), login, logout; session token in `localStorage`; guarded routes for dashboard/create.
7. **Ratings:** API-complete (add rating, average rating) but **no UI consumes it** — a finished backend feature that never shipped visibly.

## 4. Design language today

- **Palette (the brand — worth formalising into tokens):** deep teal `#0e464a` (nav), teal `#146166` (page/card background), sage green `#6ca678` (accents/links), pale sage `#a8c7ae` (brand text, glows), charcoal `#2c2628` (text); plus Bootstrap defaults (`cadetblue`, `darkcyan`) used ad hoc.
- **Typography:** Trebuchet MS stack for brand/nav; nav links styled as letter-spaced lowercase small-caps ("h o m e") — a distinctive quirk worth deliberately keeping or deliberately retiring; Franklin Gothic / Lucida Sans on detail pages; monospace dashboard headings.
- **Layout:** Bootstrap card grids; horizontal media cards (image left, text right); centered single-column containers (fixed `50vw`/`55vw` widths — breaks on mobile).
- **Styling mechanics:** ~90% inline `style=""` attributes; a handful of `<style>` blocks (unscoped, leaking globals like `body { background-color }` and `.container-md` width overrides across routes). No tokens, no shared components, no dark mode, vh-based font sizes.
- **Accessibility state:** default alt text (`alt="..."`), duplicated element IDs in loops, no focus management, colour contrast unverified, `alert()` for auth feedback. WCAG 2.2 AA is a long way off — the brief's §4.8 is genuinely greenfield work.

## 5. Engineering practice state

| Practice | State today |
|---|---|
| Tests | **None** (frameworks installed, zero test files; README claims otherwise) |
| Lint/format | **None configured** (README claims ESLint/Prettier) |
| CI | PR-triggered workflow that cannot build either workspace |
| Types | None — plain JS throughout |
| Error handling | Inconsistent: bare status codes, swallowed errors, `console.log` |
| Config | Hard-coded ports/URLs; no `.env` usage anywhere |
| API docs | ✅ Swagger UI — genuinely good |
| Validation | ✅ Joi on all write endpoints — genuinely good |
| Password storage | ✅ PBKDF2-SHA256, 100k iterations, per-user salt — genuinely good for its era |

---

## 6. Verdicts: keep / refactor / replace (with reasoning)

### 6.1 KEEP (carry forward as-is or near-as-is)

| Asset | Reasoning |
|---|---|
| **Product concept & copy** ("Search through our vast database of recipes using JUST items in your pantry") | The ingredient-first framing is the product's identity and the natural seed for the LLM assistant ("what can I cook with…?") |
| **Domain model** (users, recipes, ratings, saved-recipes incl. the external-recipe denormalisation) | Encodes real product decisions; ports directly to Postgres |
| **API contract** (14 endpoints + Swagger) | Clients exist against it; v1 must keep working throughout migration (strangler requirement) |
| **Brand palette + card-based visual identity** | Distinctive and worth formalising into design tokens (ADR-003) |
| **Joi validation rules** (esp. password policy) | Port the *rules* into the shared Zod schema package |
| **PBKDF2 password hashing** | Existing hashes must remain verifiable so users survive migration; new auth layers on top |
| **Repo hygiene assets** (LICENSE, CoC, issue/PR templates, CODEOWNERS, contributor automation) | Working and recently maintained |

### 6.2 REFACTOR (keep the behaviour, restructure the code)

| Asset | Reasoning |
|---|---|
| **Backend API** | Behaviour is right, structure is fixable: extract config to env, add ownership checks, route-level auth consistently, migrations instead of boot-time DDL, promise-based DB access. It must stay alive as "API v1" during the strangler migration, so it gets stabilised (Stage 0–1), not rewritten immediately |
| **`savedRecipes` dual-source design** | The idea (internal + external recipes saveable uniformly) is right; re-model as a proper `recipe_source` discriminator in Postgres |
| **Swagger pipeline** | Keep API docs, but generate from the typed contract (Zod → OpenAPI 3) instead of swagger-autogen inference |
| **SECURITY.md / README** | Right instinct, wrong content — fix false claims and the public-disclosure instruction |

### 6.3 REPLACE (retire, with the reason each earns it)

| Asset | Reasoning |
|---|---|
| **Client-side Spoonacular integration + `config.js` key** | Violates brief §5.1.1 directly (client must never hold provider keys); already leaked the key; also breaks on any machine but the author's (absolute import path). Becomes a server-side integration behind the API |
| **Vue SPA implementation** | ~1,100 lines, inline styles, no tests, two dead components, undeclared deps. The brief demands one component API across web/desktop/mobile (§3.5, §4.3); Vue has no credible native-mobile story (bootstrap-vue misadventure already shows the ecosystem friction). Porting 7 small pages into the shared cross-platform UI (ADR-001) is days of work; making Vue cross-platform is months. The *screens, flows, and brand* survive — the framework does not |
| **`localStorage` session tokens + homegrown session scheme** | XSS-readable, non-expiring, single-token-per-user. Replaced by httpOnly cookie sessions on web + platform secure storage on native (brief §7) |
| **SQLite as the system of record** | Cannot serve multi-device sync, pgvector RAG, or horizontal scaling (brief §3.6–3.7, §5). Stays for local dev nostalgia only; Postgres becomes canonical |
| **`bootstrap-vue`, `jquery`, `popper.js`, `button_test.vue`, `recipe_modal.vue`** | Dead or incompatible today; delete in Stage 0 |
| **Root `ci.yml`** | Cannot build the project; replaced by a real monorepo pipeline |
| **Hard-coded `localhost:3333` base URLs** | Environment config from Stage 0 onward |

---

## 7. Defect & risk register

### 7.1 CRITICAL — act immediately (Stage 0, first 48 hours)

1. **Live RapidAPI key committed to a public repository.** `config.js` contains a working Spoonacular RapidAPI key, present since the initial commit and visible in history. Anyone can run up quota/charges on the account. **Action: revoke/rotate the key at RapidAPI now; purge from history (git-filter-repo) or accept history as burned after rotation; add `config.js` to `.gitignore`; add secret scanning (gitleaks) to CI.** Tracked as the first Stage-0 issue.
2. **Hard-coded admin credentials seeded on every boot** (`admin@admin.com` / `Admin123!` in `database.js`). Anyone who reads the public source can log into any deployment as admin. **Action: remove seeding; force credential reset.**
3. **SECURITY.md instructs reporters to open public issues** for vulnerabilities. **Action: point to GitHub private security advisories only.**

### 7.2 HIGH — authorisation and data integrity

4. **No ownership checks on mutations:** any authenticated user can `PATCH`/`DELETE` any recipe and `DELETE` any saved-recipe row (IDOR / OWASP A01 Broken Access Control).
5. **`POST /recipes` bypasses the auth middleware** (token checked only inside the controller; route unprotected — inconsistent with every other write route).
6. **Session tokens never expire** and are stored plaintext in the DB and in `localStorage` (XSS-readable).
7. **CORS fully open** (`app.use(cors())` with no origin restriction) combined with token-in-header auth.
8. **Ratings unbounded** — any integer accepted as a rating; no one-rating-per-user constraint.

### 7.3 MEDIUM — correctness bugs found by reading

9. **`Dashboard.vue:88-93`** — `item.split(' ')` called on recipe *objects* (guaranteed `TypeError`; the intended `item.directions` truncation never runs).
10. **`ratings.controller.js`** — `addRating` runs regardless of whether the recipe-existence check succeeds (callback issued in parallel, its 404/500 can double-send headers); same pattern in `getRatings`.
11. **`recipes.service.js:2`** — import from an absolute path outside the repository (`/Users/muhammadabdullah/Desktop/GitHub/Recipe/config.js`): the frontend cannot build on any other machine.
12. **`main.js`** — imports `jquery`/`popper.js` which are not in `package.json` (build works only by hoisting accident).
13. **`Dashboard.vue` saved-recipe links** route to `/recipes/{saved_by}` (a *user* id) instead of a recipe id.
14. **`recipe_modal.vue`** references `feedService`/`recipes` imports it never uses; component itself is dead code.
15. **`getRatings` model** uses `AVG()` with `db.each` — returns a single aggregate row; NULL average (no ratings) surfaces as `0`-ish `null` handling by accident.
16. **Duplicate element IDs** in loops (`firstCheckbox`, `text`) — invalid HTML, breaks label association.

### 7.4 Documentation integrity

17. **README claims that are false today:** Mocha/Chai backend tests and Vue Test Utils frontend tests (none exist); ESLint + Prettier (not configured); Vuex (not installed); lazy-loaded components (all eagerly imported); screenshots (`screenshots/` directory absent — images 404); "Securely connect with external services" (the key is in the client). The README also documents `npm install` / `npm start` at repo root where no `package.json` exists.

### 7.5 Operational

18. CI cannot build either workspace (runs npm at root).
19. No `.env` handling anywhere; port and URLs hard-coded.
20. `.DS_Store` files tracked in git.

---

## 8. Feature-parity checklist (what the migration must preserve)

Every stage of the migration (see `docs/MIGRATION_PLAN.md`) must keep these user-visible capabilities working:

- [ ] Ingredient-chip pantry search returning recipe suggestions with image/title/summary
- [ ] Save an external (searched) recipe to the dashboard
- [ ] Community feed listing all recipes
- [ ] Recipe detail with ingredient checklist
- [ ] Create / edit / delete own recipes
- [ ] Save / unsave internal recipes
- [ ] Register / login / logout with the existing password policy (existing PBKDF2 hashes keep working)
- [ ] Ratings (API today; gains UI in the target system — the one place parity *increases*)

## 9. How the target system builds on this baseline

| Brief requirement | What the audit found to build on |
|---|---|
| §3 cross-platform | Feature set is small and well-bounded — realistic to reach parity on 3 platforms (ADR-001) |
| §4 design system | Palette + card language exist; tokens formalise them (ADR-003) |
| §5 LLM/AI cloud | The pantry-search flow is the perfect RAG/assistant seed; recipes corpus is the grounding content; server-side model layer replaces the leaked-key client integration (ADR-002) |
| §6 engineering standards | Joi rules and Swagger docs are the seeds of the typed contract; everything else (tests, lint, CI) is net-new |
| §7 security | §7.1–7.2 above define the Stage-0 hardening backlog; UK-GDPR work (export/deletion) is net-new |
