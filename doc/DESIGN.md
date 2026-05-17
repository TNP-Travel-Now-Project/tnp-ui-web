# Design System Inspired by Colorlib Ecoland

## 1. Visual Theme & Atmosphere

The Ecoland design system embodies a modern, clean aesthetic with an environmental consciousness reflected in its vibrant green accent palette. The visual language prioritizes clarity and simplicity, leveraging a dark navigation framework paired with generous whitespace to create a professional, welcoming interface. The dominant use of the signature eco-green (`#7AC64D`) signals sustainability and growth, while the neutral dark grays and blacks provide a sophisticated, contemporary foundation. This system is designed for Bootstrap-based web templates that demand accessibility, responsiveness, and visual hierarchy without unnecessary ornamentation.

**Key Characteristics**
- Clean, minimal aesthetic with strong contrast between dark and light elements
- Eco-conscious primary accent color that dominates interactive and call-to-action states
- High-contrast neutrals (black, white, grays) for legibility and focus
- Flat design approach with minimal shadows or depth effects
- Functional use of secondary accent colors for semantic status indication
- Mobile-first, responsive framework built on Bootstrap foundations

## 2. Color Palette & Roles

### Primary
- **Eco Green** (`#7AC64D`): Primary accent and call-to-action buttons, highlights, and interactive focus states. Used extensively across the template for brand identity and conversion points.
- **Success Green** (`#5FA33A`): Deeper success state indicator for form validation and positive feedback messages.

### Accent Colors
- **Bright Cyan** (`#00ACC1`): Secondary accent for alternative interactive elements and informational callouts.
- **Bright Blue** (`#1E88E5`): Tertiary accent for secondary interactive states and link highlights.
- **Purple** (`#8E24AA`): Quaternary accent for special feature highlights or premium content markers.
- **Bright Pink** (`#EC407A`): Accent for attention-grabbing alerts or special promotions.
- **Light Green** (`#8ED45E`): Light variant of primary green for hover states and soft highlights.
- **Brown** (`#795548`): Earth tone for neutral accent contexts, often paired with eco messaging.

### Interactive
- **Eco Green on Hover** (`#7AC64D`): Interactive button states and link underlines.
- **Light Green Hover** (`#8ED45E`): Subtle hover state feedback for buttons and links.

### Neutral Scale
- **Pure Black** (`#000000`): Primary text color, high-contrast headings, and strongest emphasis.
- **Dark Charcoal** (`#222222`): Deep text and background tinting.
- **Dark Gray** (`#333333`): Secondary text, navigation, and content hierarchy.
- **Medium Gray** (`#3A3A3A`): Tertiary text and subtle borders.
- **Gray** (`#444444`): Divider lines and disabled state backgrounds.
- **Light Gray** (`#727272`): Placeholder text and de-emphasized content.
- **Medium Light Gray** (`#9B9B9B`): Muted text and secondary navigation labels.
- **Pure White** (`#FFFFFF`): Primary background, text on dark surfaces, and core contrast.

### Surface & Borders
- **Dark Surface** (`#333333`): Navigation bar background and input field backgrounds.
- **Border Dark** (`#444444`): Input field borders and subtle dividers.

### Semantic / Status
- **Error Red** (`#E53935`): Error states and destructive action indicators.
- **Warning Orange** (`#FF9800`): Warning messages and cautionary states.
- **Warning Yellow** (`#FDD835`): Secondary warning and attention states.

## 3. Typography Rules

### Font Family
**Primary:** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`

**Secondary:** `Arial, sans-serif`

**Fallback Stack:** `sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display / Hero | -apple-system | 32px | 400 | 1.4 | 0px | Large hero headings and page titles |
| Heading 1 | -apple-system | 28px | 400 | 1.3 | 0px | Major section headers |
| Heading 2 | -apple-system | 18px | 400 | 1.2 | 0px | Subsection headers and card titles |
| Heading 3 | -apple-system | 20px | 400 | 1.2 | 0px | Tertiary headings and feature titles |
| Body Text | -apple-system | 16px | 400 | 1.6 | 0px | Primary paragraph and content text |
| Link Text | -apple-system | 16px | 400 | 1.4 | 0px | Navigation and inline links |
| Small Text / Caption | -apple-system | 10px | 300 | 1.2 | 0px | Captions, labels, and metadata |
| Button Text | Arial | 13px | 400 | 1.4 | 0.5px | Action button labels |
| Input Text | Arial | 16px | 400 | 1.4 | 0px | Form field placeholder and entered text |

### Principles
- Font weights remain consistent at 400 (regular) for body and links, with 300 (light) reserved for secondary captions.
- Line height scales proportionally with font size to maintain readability; smaller text receives tighter leading, larger text more generous spacing.
- Letter spacing is minimal (0px) for all roles except buttons, which receive slight tracking (`0.5px`) for emphasis.
- System fonts (`-apple-system`) are preferred for native, optimized rendering across platforms.
- Arial is reserved for form elements (buttons and inputs) to ensure platform consistency.

## 4. Component Stylings

### Buttons

#### Primary Button
- **Background:** `#7AC64D`
- **Text Color:** `#000000`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** `-apple-system`
- **Padding:** `12px 24px`
- **Border Radius:** `20px`
- **Border:** `0px none transparent`
- **Box Shadow:** `none`
- **Height:** `48px`
- **Hover State:** Background `#8ED45E`, Text `#000000`
- **Active State:** Background `#5FA33A`, Text `#FFFFFF`
- **Disabled State:** Background `#CCCCCC`, Text `#999999`, opacity `0.6`

#### Secondary Button
- **Background:** `transparent`
- **Text Color:** `#7AC64D`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** `-apple-system`
- **Padding:** `12px 24px`
- **Border Radius:** `20px`
- **Border:** `2px solid #7AC64D`
- **Box Shadow:** `none`
- **Height:** `48px`
- **Hover State:** Background `#7AC64D`, Text `#FFFFFF`
- **Active State:** Background `#5FA33A`, Text `#FFFFFF`

#### Ghost Button
- **Background:** `transparent`
- **Text Color:** `#9B9B9B`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** `-apple-system`
- **Padding:** `12px 20px`
- **Border Radius:** `0px`
- **Border:** `0px none transparent`
- **Box Shadow:** `none`
- **Height:** `auto`
- **Hover State:** Text Color `#000000`, Border-bottom `1px solid #000000`
- **Active State:** Text Color `#000000`

### Cards & Containers

#### Standard Card
- **Background:** `#FFFFFF`
- **Text Color:** `#333333`
- **Padding:** `20px`
- **Border Radius:** `8px`
- **Border:** `1px solid #CCCCCC`
- **Box Shadow:** `0px 2px 8px rgba(0, 0, 0, 0.1)`
- **Heading Font Size:** `18px`
- **Heading Font Weight:** `400`
- **Body Font Size:** `16px`
- **Body Font Weight:** `400`

#### Dark Container (Navigation/Footer)
- **Background:** `#333333`
- **Text Color:** `#FFFFFF`
- **Padding:** `16px 20px`
- **Border Radius:** `0px`
- **Border:** `0px none transparent`
- **Box Shadow:** `none`

#### Feature Card
- **Background:** `#FFFFFF`
- **Text Color:** `#333333`
- **Padding:** `24px 20px`
- **Border Radius:** `8px`
- **Border:** `1px solid #EEEEEE`
- **Box Shadow:** `0px 4px 12px rgba(0, 0, 0, 0.08)`
- **Icon Color:** `#7AC64D`

### Inputs & Forms

#### Text Input (Default)
- **Background:** `#333333`
- **Text Color:** `#FFFFFF`
- **Placeholder Color:** `#9B9B9B`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** `Arial`
- **Padding:** `12px 15px`
- **Border Radius:** `5px`
- **Border:** `1px solid #444444`
- **Box Shadow:** `none`
- **Height:** `48px`
- **Focus State:** Border `1px solid #7AC64D`, Box Shadow `0px 0px 0px 2px rgba(122, 198, 77, 0.2)`
- **Error State:** Border `1px solid #E53935`, Background `#333333`

#### Text Input (Light)
- **Background:** `#F5F5F5`
- **Text Color:** `#333333`
- **Placeholder Color:** `#9B9B9B`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** `Arial`
- **Padding:** `12px 15px`
- **Border Radius:** `5px`
- **Border:** `1px solid #DDDDDD`
- **Box Shadow:** `none`
- **Height:** `48px`
- **Focus State:** Border `1px solid #7AC64D`, Background `#FFFFFF`

#### Textarea
- **Background:** `#333333`
- **Text Color:** `#FFFFFF`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** `Arial`
- **Padding:** `12px 15px`
- **Border Radius:** `5px`
- **Border:** `1px solid #444444`
- **Min Height:** `120px`
- **Focus State:** Border `1px solid #7AC64D`

#### Form Label
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Color:** `#333333`
- **Margin Bottom:** `8px`

### Navigation

#### Main Navigation Bar
- **Background:** `#333333`
- **Text Color:** `#000000`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** `-apple-system`
- **Padding:** `0px 20px`
- **Border Radius:** `0px`
- **Border:** `0px none transparent`
- **Box Shadow:** `none`
- **Height:** `51px`
- **Link Padding:** `0px 20px`
- **Link Height:** `51px`
- **Link Hover Background:** `transparent`
- **Link Hover Text Color:** `#7AC64D`
- **Link Active Color:** `#7AC64D`

#### Breadcrumb Navigation
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Color:** `#9B9B9B`
- **Separator:** `/`
- **Active Item Color:** `#333333`
- **Padding:** `8px 0px`

#### Footer Navigation
- **Background:** `#222222`
- **Text Color:** `#9B9B9B`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Link Color:** `#9B9B9B`
- **Link Hover Color:** `#7AC64D`
- **Padding:** `20px 0px`

### Badges

#### Success Badge
- **Background:** `#5FA33A`
- **Text Color:** `#FFFFFF`
- **Font Size:** `12px`
- **Font Weight:** `600`
- **Padding:** `4px 8px`
- **Border Radius:** `8px`
- **Border:** `0px none transparent`

#### Error Badge
- **Background:** `#E53935`
- **Text Color:** `#FFFFFF`
- **Font Size:** `12px`
- **Font Weight:** `600`
- **Padding:** `4px 8px`
- **Border Radius:** `8px`
- **Border:** `0px none transparent`

#### Warning Badge
- **Background:** `#FF9800`
- **Text Color:** `#FFFFFF`
- **Font Size:** `12px`
- **Font Weight:** `600`
- **Padding:** `4px 8px`
- **Border Radius:** `8px`
- **Border:** `0px none transparent`

#### Info Badge
- **Background:** `#00ACC1`
- **Text Color:** `#FFFFFF`
- **Font Size:** `12px`
- **Font Weight:** `600`
- **Padding:** `4px 8px`
- **Border Radius:** `8px`
- **Border:** `0px none transparent`

## 5. Layout Principles

### Spacing System

**Base Unit:** `4px`

**Spacing Scale:**
- **XS:** `4px` — Micro gaps between inline elements
- **SM:** `8px` — Tight spacing between related components
- **MD:** `12px` — Standard internal padding for small elements
- **LG:** `16px` — Standard padding for medium elements and vertical spacing
- **XL:** `20px` — Generous padding for cards, sections, and larger containers
- **2XL:** `24px` — Major section separation and heading spacing
- **3XL:** `32px` — Page-level section separation
- **4XL:** `40px` — Hero and banner spacing

**Usage Context:**
- Form field margins: `12px`
- Component gaps (flexbox): `8px`
- Card padding: `16px` to `20px`
- Section padding: `20px` to `40px`
- Navigation item padding: `20px` horizontal
- Button padding: `12px 24px`

### Grid & Container

**Max Width:** `1440px` (full viewport width observed in extraction)

**Column Strategy:** 12-column grid system (Bootstrap standard)

**Gutter Width:** `16px`

**Section Patterns:**
- Hero sections: Full-width with `20px` to `40px` vertical padding
- Content sections: Centered container at `1400px` with `20px` side padding
- Feature grids: 3-column layout on desktop, collapsing to 1 column on mobile
- Card sections: Auto-flow grid with minimum card width `300px`

### Whitespace Philosophy

The design system prioritizes generous whitespace to reduce cognitive load and improve content scanability. Negative space is used strategically to separate content hierarchies, with larger gaps between unrelated sections and tighter spacing within component groups. Vertical rhythm is maintained through consistent line-height multiples, creating visual harmony across text blocks. Padding within containers remains consistent (16px–20px) while margins between sections scale with importance, ensuring a breathing room that feels modern and approachable.

### Border Radius Scale

- **None:** `0px` — Navigation, full-width sections, headers
- **Subtle:** `2px` — Small badges and minimal UI indicators
- **Small:** `5px` — Form inputs and compact controls
- **Medium:** `8px` — Cards, containers, and standard components
- **Large:** `20px` — Buttons and prominent interactive elements
- **Full:** `50%` — Avatar circles and badge-style elements

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (L0) | `box-shadow: none` | Navigation, backgrounds, body text |
| Subtle (L1) | `box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1)` | Standard cards, minor component lift |
| Raised (L2) | `box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08)` | Feature cards, hovering elements, popovers |
| Elevated (L3) | `box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12)` | Modals, dropdowns, floating panels |
| Maximum (L4) | `box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.15)` | Sticky headers on scroll, prominent modals |

**Depth Philosophy:**

The Ecoland design system uses subtle shadow elevation to create visual hierarchy without introducing heavy visual weight. Shadows employ low opacity black (`rgba(0, 0, 0, 0.08)` to `rgba(0, 0, 0, 0.15)`) to maintain the clean, minimal aesthetic. Most interactive components remain flat or barely elevated (L0–L1), reserving deeper shadows for modals, overlays, and persistent floating elements. This approach ensures the focus remains on content and eco-green accent colors rather than decorative depth effects. Hover states may transition between shadow levels to provide tactile feedback.

## 7. Do's and Don'ts

### Do
- **Use the eco-green (`#7AC64D`) for primary call-to-action buttons and interactive focus states** — it is the strongest brand color and must remain prominent across all interfaces.
- **Maintain high contrast between text and background** — ensure WCAG AA compliance by pairing dark text (`#333333` or `#000000`) on light backgrounds and light text (`#FFFFFF`) on dark (`#333333` or darker) backgrounds.
- **Stick to the neutral gray scale for secondary UI elements** — use `#9B9B9B` for muted text, `#444444` for borders, and `#333333` for dark containers.
- **Apply consistent padding within all containers** — use `16px` to `20px` internally and maintain rhythm through the spacing scale.
- **Reserve border radius of `20px` exclusively for buttons** — maintain visual consistency and button recognizability.
- **Use form inputs with `5px` border radius and `#333333` backgrounds** — this dark input style is consistent with the navigation aesthetic.
- **Leverage semantic colors (`#5FA33A`, `#E53935`, `#FF9800`) for status indicators** — never use them for primary interactive elements.
- **Maintain line height of `1.4` to `1.6` for body text** — ensure comfortable reading across all device sizes.
- **Stack accent colors hierarchically** — use primary eco-green first, then cyan, blue, and purple for secondary interactive elements.

### Don't
- **Do not use the secondary accent colors (cyan, blue, purple) as primary CTAs** — they are supplementary and will weaken brand identity.
- **Do not introduce new colors outside the defined palette** — any custom colors must be approved as system extensions.
- **Do not use border radius greater than `20px` on buttons** — this creates inconsistency; use `20px` or none (`0px`).
- **Do not apply box shadows to form inputs in default state** — keep inputs flat with only border definition (`1px solid #444444`).
- **Do not mix font families within a single component** — maintain either `-apple-system` or `Arial`, not both, within one UI element.
- **Do not reduce font weight below `300` (light) for any interactive text** — ensure buttons and links remain legible.
- **Do not violate the spacing scale** — use only values from the defined scale (`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`).
- **Do not use pure black (`#000000`) for extended body text on dark backgrounds** — it creates harsh contrast; use `#FFFFFF` or `#F5F5F5` instead.
- **Do not nest shadows (multiple box-shadow values on a single element)** — keep elevations flat and distinct per level.
- **Do not apply text shadows or text outlines** — the system maintains flat, modern typography without decorative effects.

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | `< 576px` | Single column layout, full-width containers, reduced padding to `12px`, font sizes reduce by 2–4px, navigation collapses to hamburger menu |
| Tablet | `576px–992px` | 2-column grid for cards, navigation remains horizontal, padding `16px`, font sizes maintained |
| Desktop | `992px–1440px` | 3-column grid for features, full horizontal navigation with secondary menu visible, padding `20px` |
| Wide | `> 1440px` | Content capped at `1400px` max-width, centered container, full feature layout, side columns enabled |

### Touch Targets

- **Minimum interactive size:** `48px × 48px` (buttons, inputs, clickable links)
- **Navigation items:** `51px` height (observed in component extraction)
- **Icon buttons:** `44px × 44px` minimum
- **Form fields:** `48px` height minimum with `12px` padding
- **Spacing between touch targets:** `8px` minimum to avoid accidental activation
- **Link underline thickness:** `2px` on hover, `0px` by default

### Collapsing Strategy

- **Navigation:** On mobile (`< 576px`), collapse horizontal navigation into a hamburger menu with vertical stack. Maintain height `51px` for menu button; submenu expands below.
- **Grid Layouts:** Reduce from 3-column to 2-column at tablet breakpoint (`992px`), then to single column at mobile (`< 576px`).
- **Padding & Margins:** Reduce all spacing by `4px` at mobile breakpoint (e.g., `20px` becomes `16px`, `16px` becomes `12px`).
- **Font Sizes:** Reduce display and heading sizes by 2–4px on mobile; maintain body size at `16px` for legibility.
- **Form Inputs:** Maintain `48px` height on all breakpoints; widen to full container width on mobile.
- **Cards:** Stack vertically at mobile; use `12px` padding instead of `20px` to optimize small screens.
- **Container Max Width:** Scale down from `1400px` to `1200px` at tablet, `100% - 24px` at mobile (accounting for side gutters).

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Eco Green (`#7AC64D`)
- **Secondary CTA:** Bright Cyan (`#00ACC1`) or Light Green (`#8ED45E`)
- **Background (Light):** Pure White (`#FFFFFF`)
- **Background (Dark):** Dark Charcoal (`#333333`)
- **Navigation Bar:** Dark Gray (`#333333`)
- **Heading Text:** Pure Black (`#000000`) on light, Pure White (`#FFFFFF`) on dark
- **Body Text:** Dark Gray (`#333333`)
- **Muted Text:** Light Gray (`#9B9B9B`)
- **Success State:** Success Green (`#5FA33A`)
- **Error State:** Error Red (`#E53935`)
- **Warning State:** Warning Orange (`#FF9800`)
- **Input Fields:** Dark Surface (`#333333`) with border `1px solid #444444`
- **Links:** Primary Black (`#000000`), hover to Eco Green (`#7AC64D`)
- **Form Focus Ring:** Eco Green with `rgba(122, 198, 77, 0.2)` inner glow

### Iteration Guide

1. **Always start with the eco-green (`#7AC64D`) for primary interactive elements** — buttons, hover states, and focus indicators must default to this color to maintain brand presence.

2. **Apply the neutral scale strictly** — use black (`#000000`) for headings, dark gray (`#333333`) for body and navigation, and light gray (`#9B9B9B`) for secondary text. Never invent intermediate grays.

3. **Maintain the 8px spacing rhythm in all flexbox and grid gaps** — gaps between items should be `8px`, padding within containers `16px–20px`, and section margins `24px–40px`.

4. **Use border radius of `20px` exclusively for buttons and `5px` for form inputs** — this distinction ensures visual clarity between affordances and data entry fields.

5. **Set form inputs with dark backgrounds (`#333333`), light text (`#FFFFFF`), and borders of `1px solid #444444`** — this maintains the modern, minimal aesthetic and contrasts with lighter card backgrounds.

6. **Apply box shadows sparingly**: L0 (none) for flat elements, L1 (`0px 2px 8px rgba(0, 0, 0, 0.1)`) for standard cards, L2 (`0px 4px 12px rgba(0, 0, 0, 0.08)`) for feature cards and hover states.

7. **Reserve font weight 300 (light) for captions and small labels only** — all body, button, and heading text must remain at weight 400 (regular) for legibility.

8. **Enforce line heights of `1.2` for headings and `1.4–1.6` for body text** — calculate based on font size to maintain vertical rhythm (e.g., 16px body × 1.5 = 24px line-height).

9. **Semantic colors (`#5FA33A` success, `#E53935` error, `#FF9800` warning) are reserved for badges, status indicators, and validation feedback** — never use them for primary interactive elements or CTAs.

10. **On responsive collapse (mobile < 576px), reduce all padding by `4px`, stack all grids to single column, collapse navigation to hamburger, and maintain minimum touch target of `48px × 48px`** — ensure mobile usability without sacrificing the design system's intent.