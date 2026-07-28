# DESIGN.md

## Visual Identity

**Style:** Modern minimalist with technical depth. Clean surfaces, purposeful animation, blue as the single accent family.

**Mood:** Professional precision with warmth — like a well-organized workspace that still feels human.

## Color

| Token | Value | Usage |
|-------|-------|-------|
| primary-50 | `#eff6ff` | Selection highlight, subtle backgrounds |
| primary-100 | `#dbeafe` | Hover states, light fills |
| primary-200 | `#bfdbfe` | Borders on active elements |
| primary-300 | `#93c5fd` | Secondary accents |
| primary-400 | `#60a5fa` | Interactive elements (links, icons) |
| primary-500 | `#3b82f6` | Primary accent |
| primary-600 | `#2563eb` | Buttons, primary actions |
| primary-700 | `#1d4ed8` | Button hover |
| primary-800 | `#1e40af` | Deep accent |
| primary-900 | `#1e3a8a` | Dark accent text |
| primary-950 | `#172554` | Deepest accent |
| background | `#ffffff` | Page background |
| text-primary | `gray-900` | Headings, primary text |
| text-secondary | `gray-600` | Body text, descriptions |
| border | `gray-100` | Card borders, dividers |

**Rules:**
- Blue is the only chromatic accent. Do not introduce additional hues.
- Body text is `gray-600`, never pure black or lighter than 500.
- Backgrounds alternate between `white` and `gray-50/50` for section separation.

## Typography

| Role | Font | Weight | Size | Tracking |
|------|------|--------|------|----------|
| Heading 1 | Inter | 700 (bold) | 4xl → 6xl | tight |
| Heading 2 | Inter | 700 (bold) | 3xl → 4xl | tight |
| Heading 3 | Inter | 600 (semibold) | xl → 2xl | normal |
| Body | Inter | 400 (regular) | base → lg | normal |
| CJK fallback | Noto Sans SC | matches Latin weight | — | — |

**Rules:**
- Inter is the only Latin typeface. Do not introduce serif or monospace for body/heading.
- Line height: relaxed for body, tight for headings.
- Font loading: Google Fonts with `display=swap`.

## Spacing & Layout

- **Container:** max-width 6xl (1152px), padding 24px → 32px → 48px responsive
- **Section rhythm:** py-20 → py-28 → py-32 at breakpoints
- **Card padding:** p-6 (24px)
- **Component gap:** Use Tailwind gap utilities, prefer 4/6/8 scale

**Rules:**
- Never exceed max-w-6xl for content width.
- Maintain consistent vertical rhythm between sections.

## Components

### Buttons
- **Primary:** Rounded-full, bg-primary-600, white text, hover lift (-translate-y-0.5) + shadow
- **Secondary:** Rounded-full, border gray-300, hover border shifts to primary-300

### Cards
- Rounded-2xl, border gray-100, subtle shadow-sm
- Hover: shadow-xl + slight lift (-translate-y-1)
- No nested cards. One level only.

### Links
- Primary-600 color with animated underline on hover (width transition)

### Navigation
- Fixed top, white background with scroll-triggered shadow
- Mobile: hamburger toggle with slide-down menu

## Motion

- **Entrance animations:** fadeIn, slideUp, slideInLeft, slideInRight — all 1.2s ease-out
- **Hover transitions:** 300ms duration for all interactive state changes
- **Scroll reveals:** Framer Motion with directional entrance (BlurText, SplitText, ScrollReveal)
- **Hero:** Three.js Liquid Ether fluid simulation (mouse-reactive)
- **Gradient text:** 4s ease infinite background-position cycle

**Rules:**
- Respect `prefers-reduced-motion`. Disable non-essential animation.
- No bounce/elastic easing. Ease-out only.
- Entrance animations fire once (forwards fill).
- Keep motion purposeful — it should guide attention, not decorate.

## Iconography

- No icon library currently specified. Use simple inline SVGs when needed.
- Keep icons at consistent optical size.

## Do Not

- Use gradients as backgrounds (reserved only for text effects)
- Nest cards inside cards
- Add additional typefaces
- Use bounce/spring/elastic easing
- Place gray text on colored backgrounds
- Over-round elements beyond 2xl for cards, full for buttons/pills
- Add decorative elements that don't serve information hierarchy
