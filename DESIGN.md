# DESIGN.md — KnTL (Knowledge 'n Tech Library)

> Instructions for Stitch AI: generate the full frontend (responsive web app) for the product described below. Follow the design system, page specs, and component rules exactly. Use placeholder/mock data where real data is not available.

---

## 1. Product Overview

**Name:** KnTL — Knowledge 'n Tech Library
**Tagline:** "Your knowledge, organized. Your learning, amplified."

KnTL is a **learning workspace**, not just a notebook app. Users collect sources and notes inside *Notebooks*, and the platform is designed to grow into a complete learning ecosystem:

- AI assistant (chat with your sources)
- Flashcards
- Quiz generator
- Learning analytics
- Public learning materials
- Community forum

**Design implication:** Navigation, layout, and naming must never feel like a "notes-only" app. The structure must have room for future modules (AI, Flashcards, Quiz, Analytics) without a redesign. Use neutral, extensible patterns (sidebar sections, tabbed workspaces, card-based layouts).

**Target users:** Students, self-learners, and tech professionals (primarily Indonesian, UI language: English with friendly tone; leave strings easy to localize to Bahasa Indonesia).

**Brand personality:** Clean, calm, focused, encouraging, modern. Feels like a bright library — light, airy, trustworthy.

---

## 2. Design Principles

1. **Light & airy** — white dominates, sky blue guides attention.
2. **Motivating, not noisy** — gamified stats (streaks, progress) are warm and encouraging, never overwhelming.
3. **Extensible** — every module (AI, Flashcards, Quiz, Analytics) can later slot into the sidebar/workspace without restructuring.
4. **Clarity first** — generous whitespace, clear hierarchy, minimal decoration.
5. **Accessible** — WCAG AA contrast, visible focus states, keyboard navigable.

---

## 3. Color Palette

**Main: White. Secondary: Sky Blue.**

| Role | Name | Hex | Usage |
|---|---|---|---|
| Background (main) | White | `#FFFFFF` | Page background, cards, topbar, sidebar |
| Background (subtle) | Ice White | `#F7FAFD` | App canvas behind cards, hover surfaces |
| Primary / Secondary brand | Sky Blue | `#38BDF8` | Primary buttons, active states, key accents |
| Sky Blue (strong) | Sky 600 | `#0284C7` | Button hover/pressed, links, text on light blue |
| Sky Blue (soft) | Sky 100 | `#E0F2FE` | Active sidebar item background, chips, highlights |
| Sky Blue (softest) | Sky 50 | `#F0F9FF` | Section tints, empty states |
| Text primary | Ink | `#0F172A` | Headings, main text |
| Text secondary | Slate | `#475569` | Body secondary, labels |
| Text muted | Mist | `#94A3B8` | Placeholders, captions, disabled |
| Border | Line | `#E2E8F0` | Dividers, card borders, inputs |
| Success | Green | `#22C55E` | Completed, positive trends |
| Warning / Streak | Amber | `#F59E0B` | Streak flame, highlights (use sparingly) |
| Error | Red | `#EF4444` | Validation errors |

**Rules:**
- Backgrounds are white or Ice White only. No dark mode in v1 (but use CSS variables/tokens so it can be added).
- Sky Blue is the single accent. Amber is only for streak/flame elements.
- Never place white text on `#38BDF8` for small text; use `#0284C7` or dark Ink text for AA contrast.

---

## 4. Typography

- **Font family:** `Inter` (fallback: system-ui, sans-serif). Optional display font for headings: `Plus Jakarta Sans`.
- **Scale:**

| Token | Size / Line-height | Weight | Use |
|---|---|---|---|
| Display | 36 / 44 | 700 | Login headline |
| H1 | 28 / 36 | 700 | Page titles |
| H2 | 22 / 30 | 600 | Section titles |
| H3 | 18 / 26 | 600 | Card titles |
| Body | 14–16 / 24 | 400 | Default text |
| Small | 12–13 / 18 | 500 | Labels, captions, chips |

---

## 5. Layout, Spacing & Shape

- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 px.
- **Corner radius:** Cards 16px, buttons 10–12px, inputs 10px, chips fully rounded (999px).
- **Elevation:** Very soft shadows only, e.g. `0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(56,189,248,0.08)`. Prefer 1px borders (`#E2E8F0`) over heavy shadows.
- **Grid:** 12-column grid, max content width 1280px, 24px gutters.
- **Breakpoints:** Mobile < 768px, Tablet 768–1199px, Desktop ≥ 1200px.
- **Icons:** Rounded line icons (Lucide or Material Symbols Rounded), 20px default, 1.75px stroke.

---

## 6. Global App Shell (used on all pages after login)

### 6.1 Topbar (fixed, height 64px, white, bottom border `#E2E8F0`)
- **Left:** hamburger button (visible on mobile/tablet to toggle sidebar) + KnTL logo.
- **Center:** global search input ("Search notebooks, notes, materials…") — rounded, Ice White background, search icon. Placeholder for future AI/command palette.
- **Right:** notification bell icon, streak mini-badge (🔥 + number), user avatar with dropdown (Profile, Settings, Log out).

### 6.2 Sidebar (left, width 260px, white, right border `#E2E8F0`)
Collapsible to icon-only (72px) on desktop; becomes an off-canvas drawer on mobile.

Items in order:

1. **Notebook** — expandable dropdown
   - Header row: book icon + "Notebook" + chevron.
   - When expanded:
     - **"+ New Notebook"** button at top (Sky Blue soft background, plus icon). Opens a modal: *Notebook name* (required), *Description* (optional), *Emoji/icon picker* (optional), buttons Cancel / Create.
     - List of the user's notebooks (icon/emoji + name, truncated with ellipsis). The selected notebook is highlighted (Sky 100 background, Sky 600 text, left 3px Sky Blue indicator).
     - Search/filter field if more than 5 notebooks.
     - Behavior inspired by NotebookLM: choosing a notebook opens that notebook workspace.
2. **Material** — expandable dropdown (public materials)
   - Shows a "Coming soon" pill badge. Item is disabled-looking but clickable to show a tooltip/toast: "Public Materials are coming soon!"
3. **Forum** — single item with "Coming soon" pill badge (same behavior as above).
4. **Setting** — gear icon.
5. **Profile** — user icon.

Sidebar bottom: small card "More coming soon: AI Assistant · Flashcards · Quiz · Analytics" (subtle Sky 50 background) — a teaser that signals the product roadmap.

Active state: Sky 100 background, Sky 600 text/icon. Hover: Ice White background.

---

## 7. Pages

### 7.1 Access (Login) Page

**Flow:** enter username → enter password → click Login → redirect to Dashboard.

**Layout (desktop):** split screen.
- **Left (≈55%)**: white background. Centered form card (max width 400px).
  - KnTL logo + wordmark.
  - Heading: "Welcome back" ; subtext: "Log in to continue learning."
  - **Username** input (user icon, label above, placeholder "Enter your username").
  - **Password** input (lock icon, show/hide eye toggle, placeholder "Enter your password").
  - Primary button **"Log in"** (full width, Sky Blue `#38BDF8`, 48px tall; hover `#0284C7`).
  - Inline error area for invalid credentials (red text, subtle red-tinted background).
  - Loading state on button (spinner).
- **Right (≈45%)**: Sky Blue gradient panel (`#E0F2FE` → `#38BDF8`) with a friendly illustration of books, a notebook, and sparkles; short copy: "Knowledge 'n Tech Library — Learn smarter, one notebook at a time."

**Mobile:** single column, illustration hidden or reduced to a small header graphic.

**Validation:** both fields required; show inline messages ("Username is required").
**On success:** navigate to `/dashboard`.
(No registration or forgot-password in v1; optionally render a muted non-functional "Forgot password?" link.)

---

### 7.2 Dashboard Page

**Purpose:** Motivate the user to keep learning by showing their learning data at a glance. Uses the global App Shell (topbar + sidebar).

**Content (top → bottom):**

1. **Greeting header**
   - "Good evening, {name} 👋" and a motivational line (e.g., "You're on a 7-day streak — keep it going!").
   - Right side: primary button "+ New Notebook".

2. **Stat cards row** (4 cards, responsive grid 4 → 2 → 1):
   - **Learning Streak** — flame icon (Amber), big number "7 days", subtext "Best: 14 days".
   - **Study Time This Week** — clock icon, "5h 20m", trend "+12% vs last week" (green).
   - **Study Frequency** — calendar icon, "5 / 7 days this week", subtext "Study frequency".
   - **Notebooks / Notes** — book icon, "6 notebooks · 48 notes".
   Cards: white, 1px border, 16px radius, icon in a Sky 100 rounded square.

3. **Weekly activity + Streak calendar** (two-column on desktop)
   - **Weekly Activity** bar chart (Mon–Sun, minutes studied; bars Sky Blue, today highlighted Sky 600).
   - **Streak Calendar** — GitHub-style heatmap of the last ~12 weeks (shades from Sky 50 to Sky Blue) with legend "Less → More".

4. **Daily Goal / Progress** card
   - Circular progress ring (e.g., 45 / 60 min) with encouraging text: "15 more minutes to hit today's goal!"

5. **Recent Notebooks** (horizontal card grid)
   - Each card: emoji/icon, notebook title, sources/notes count, "Last opened 2h ago". Includes a dashed "+ Create notebook" card.

6. **Continue Learning / Recommended** (list)
   - 2–3 suggested actions: "Resume: {notebook}". Also locked "teaser" cards with "Coming soon" badges for **Flashcards**, **Quiz Generator**, **AI Assistant** (Sky 50 background, lock/sparkle icon) to show the roadmap.

7. **Achievements / Badges strip** (optional, small): e.g., "First Notebook", "7-Day Streak", "Night Owl" — earned in color, unearned in grey.

**Empty state (new user):** friendly illustration + "Create your first notebook to start your streak" with CTA button.

**Mock data:** use realistic sample data (names, minutes, dates) so charts look populated.

---

### 7.3 Notebook Workspace (stub page, opened from sidebar selection)

Keep minimal in v1 but structure for the future:
- Header: notebook title (editable), emoji, description.
- Tab bar (extensible): **Notes** (active) · **Sources** · *AI Assistant (Soon)* · *Flashcards (Soon)* · *Quiz (Soon)* · *Analytics (Soon)*. "Soon" tabs show a small pill and are disabled.
- Body: empty state "No notes yet — add your first note" with "+ Add note" button.

### 7.4 Material / Forum (placeholder pages)
Centered "Coming soon" state: illustration, title ("Public Materials" / "Forum"), one-line description, "Notify me" button (non-functional) and "Back to Dashboard" link.

### 7.5 Setting & Profile (basic pages)
- **Profile:** avatar (upload placeholder), display name, username (read-only), email, "Save changes" button; below, a summary of learning stats (streak, total study time).
- **Setting:** sections for Account (change password), Preferences (language: English / Bahasa Indonesia, daily study goal in minutes), Notifications (toggle switches for study reminders). Use grouped cards with toggles and selects.

---

## 8. Components

| Component | Spec |
|---|---|
| **Primary button** | Bg `#38BDF8`, text Ink (or white on `#0284C7`), radius 12, height 44, hover `#0284C7`, focus ring 3px `rgba(56,189,248,0.35)` |
| **Secondary button** | White bg, 1px `#E2E8F0` border, text Ink, hover Ice White |
| **Ghost button** | Transparent, text Sky 600, hover Sky 50 |
| **Input** | Height 44, radius 10, 1px `#E2E8F0`, focus border `#38BDF8` + soft ring, label above (Small, weight 500) |
| **Card** | White, 1px `#E2E8F0`, radius 16, padding 20–24, soft shadow on hover |
| **Badge "Coming soon"** | Pill, Sky 100 bg, Sky 600 text, 11–12px, weight 600 |
| **Modal** | White, radius 20, max width 480, overlay `rgba(15,23,42,0.4)` |
| **Toast** | White card, left accent bar, auto-dismiss 4s |
| **Tooltip** | Ink bg, white text, radius 8 |
| **Avatar** | Circle 36px, Sky 100 bg with initials fallback |
| **Progress ring / bars** | Track `#E2E8F0`, fill Sky Blue, animated on load |

**Interaction:** subtle 150–200ms ease transitions; hover lift of 1–2px on cards; skeleton loaders for stat cards and charts.

---

## 9. Responsive Behavior

- **Desktop (≥1200px):** full sidebar (260px, collapsible) + topbar.
- **Tablet (768–1199px):** sidebar collapsed to icons by default; stat cards 2 columns.
- **Mobile (<768px):** sidebar as drawer opened via hamburger; stat cards 1 column; charts stack vertically; login is single column.

---

## 10. Accessibility

- Contrast ratio ≥ 4.5:1 for text.
- Visible focus outlines on all interactive elements.
- ARIA labels on icon-only buttons, `aria-expanded` on dropdowns, proper form labels.
- Do not rely on color alone for status (add icons/text).
- Respect `prefers-reduced-motion`.

---

## 11. Tech & Output Expectations for Stitch

- Generate clean, componentized frontend code (React + TypeScript + Tailwind CSS preferred).
- Define design tokens (colors, radii, spacing, typography) as Tailwind theme / CSS variables from this document.
- Routes: `/login`, `/dashboard`, `/notebook/:id`, `/material`, `/forum`, `/settings`, `/profile`.
- Use mock data and a mock auth flow (any non-empty username/password logs in) — leave clear integration points for a real API.
- Keep the sidebar, topbar, stat cards, and notebook list as reusable components.

---

## 12. Do & Don't

**Do**
- Keep the UI white-dominant with Sky Blue as the only accent.
- Show "Coming soon" badges for Material, Forum, and future modules.
- Use warm, encouraging microcopy.
- Make the sidebar and workspace tabs easy to extend.

**Don't**
- Don't brand the product as "just a notebook" (no notebook-only wording in global navigation or logo).
- Don't use dark backgrounds, heavy gradients (except the login side panel), or more than one accent color.
- Don't overload the dashboard with dense tables; favor cards and visual stats.
- Don't use pure-grey borders heavier than 1px.
