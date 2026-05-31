# Design System Inspired by Masterise Homes

## 1. Visual Theme & Atmosphere

Masterise Homes embodies a sophisticated, luxury real estate aesthetic grounded in warm, earthy tones and refined restraint. The design system conveys premium craftsmanship, stability, and international prestige through a carefully balanced palette of warm browns and creams paired with strategic white space. The visual language feels contemporary yet timeless, avoiding excessive ornamentation in favor of elegant minimalism and geometric clarity. The typography and color hierarchy communicate exclusivity and confidence, positioning the brand as a leader in high-end residential development. Every element reflects meticulous attention to detail, from subtle shadow treatments to generous spacing, creating an environment of calm aspiration.

**Key Characteristics:**
- Warm, earthy color foundation anchored by deep brown (`#472D0A`)
- Minimal, clean aesthetic with generous whitespace
- Premium typography using serif and geometric sans-serif pairings
- Subtle elevation and shadow treatment for depth without clutter
- International, aspirational tone reflected in layout and spacing
- High contrast between primary brown, cream, and white for legibility
- Awards and accolades prominently displayed with laurel motifs
- Refined simplicity prioritizing content and imagery over decoration

## 2. Color Palette & Roles

### Primary
- **Deep Brown** (`#472D0A`): Primary brand color; used for headings, text, borders, and primary UI elements; establishes authority and luxury
- **Warm Taupe** (`#886D49`): Secondary brown accent; used for supporting text, secondary headings, and decorative elements; softens the primary brown

### Accent Colors
- **Premium Blue** (`#007AFF`): Subtle interactive accent for links and highlights; provides contrast without disrupting the warm palette
- **Sky Blue** (`#5AC8FA`): Light interactive accent; used sparingly for subtle UI affordances
- **Slate Blue** (`#5856D6`): Alternative accent for interactive states or special features
- **Teal** (`#34AADC`): Accent for secondary interactions or info states

### Interactive
- **Primary CTA Blue** (`#007AFF`): Call-to-action links and primary interactive states
- **Secondary Interactive** (`#3498DB`): Secondary button states and alternative CTAs

### Neutral Scale
- **White** (`#FFFFFF`): Primary background; used for card backgrounds, section fills, and primary content areas
- **Cream** (`#FCFCF9`): Subtle warm white alternative; used for secondary backgrounds to add warmth without stark contrast
- **Light Gray** (`#EEEEEE`): Section dividers and subtle backgrounds
- **Medium Gray** (`#E0E0E0`): Borders and input fields
- **Gray Text** (`#757575`): Secondary body text and captions
- **Charcoal** (`#616161`): Tertiary text; muted supporting content
- **Black** (`#000000`): Pure black; used minimally for maximum contrast when needed
- **Very Dark** (`#121212`): Near-black for text when pure black is too harsh

### Semantic / Status
- **Success** (`#07BC0C`): Positive confirmations, success states, and validated inputs
- **Warning** (`#F1C40F`): Cautionary states, warnings, and attention flags
- **Error** (`#E74D3C`): Error messages, invalid inputs, and destructive actions

## 3. Typography Rules

### Font Family
**Primary Display Font:** SVN-Cera (serif, elegant, premium)
Fallback stack: `SVN-Cera, Georgia, serif`

**Secondary Font:** Neurial Grotesk (geometric sans-serif, modern, accessible)
Fallback stack: `Neurial Grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display H1 | SVN-Cera | 58px | 700 | 75.4px | 0px | Hero headlines, page titles |
| Display H2 | SVN-Cera | 44px | 700 | 52.8px | 0px | Major section headings |
| Heading H3 | Neurial Grotesk | 32px | 600 | 40px | 0px | Section subheadings |
| Heading H4 | Neurial Grotesk | 28px | 600 | 36px | 0px | Card titles, subsections |
| Heading H5 | Neurial Grotesk | 24px | 600 | 32px | 0px | Smaller headings |
| Heading H6 | Neurial Grotesk | 18px | 500 | 22.5px | 0px | Micro headings, labels |
| Body Large | Neurial Grotesk | 16px | 400 | 24px | 0px | Primary body text, links |
| Body Regular | Neurial Grotesk | 14px | 400 | 20px | 0px | Default paragraph text |
| Caption | Neurial Grotesk | 12px | 400 | 18px | 0px | Helper text, metadata |
| Button Text | Neurial Grotesk | 16px | 500 | 24px | 0px | Button labels |

### Principles
- **Serif for Leadership:** SVN-Cera used exclusively for major headings to convey premium, established authority
- **Sans-serif for Content:** Neurial Grotesk carries all body content and UI text for clarity and modern accessibility
- **Generous Line Height:** All line heights exceed 1.4x font size, ensuring spacious, premium reading experience
- **Weight Hierarchy:** Bold (700, 600) for headings; medium (500) for secondary emphasis; regular (400) for body and captions
- **Minimal Letter Spacing:** Default tracking maintains natural readability; no artificial spacing except in display contexts
- **Baseline Alignment:** All text respects logical spacing multiples (4px, 8px, 16px) for consistent rhythm

## 4. Component Stylings

### Buttons

**Primary Button**
- Background: `#472D0A`
- Text Color: `#FFFFFF`
- Font Size: `16px`
- Font Weight: `500`
- Font Family: Neurial Grotesk
- Padding: `12px 24px`
- Border Radius: `0px`
- Border: `2px solid #472D0A`
- Box Shadow: `none`
- Line Height: `24px`
- Hover State: Background `#886D49`, Border `#886D49`
- Active State: Background `#3A2408`, Border `#3A2408`
- Disabled State: Background `#E0E0E0`, Text Color `#757575`, Border `#E0E0E0`

**Secondary Button**
- Background: `#FFFFFF`
- Text Color: `#472D0A`
- Font Size: `16px`
- Font Weight: `500`
- Font Family: Neurial Grotesk
- Padding: `12px 24px`
- Border Radius: `0px`
- Border: `2px solid #472D0A`
- Box Shadow: `none`
- Line Height: `24px`
- Hover State: Background `#FCFCF9`, Border `#886D49`, Text Color `#886D49`
- Active State: Background `#EEEEEE`, Text Color `#3A2408`, Border `#3A2408`

**Ghost Button**
- Background: `rgba(71, 45, 10, 0)`
- Text Color: `#472D0A`
- Font Size: `16px`
- Font Weight: `400`
- Font Family: Neurial Grotesk
- Padding: `8px 16px`
- Border Radius: `0px`
- Border: `1px solid #472D0A`
- Box Shadow: `none`
- Line Height: `24px`
- Hover State: Background `rgba(71, 45, 10, 0.08)`, Border `#886D49`, Text Color `#886D49`

### Cards & Containers

**Premium Card**
- Background: `#FFFFFF`
- Text Color: `#472D0A`
- Font Size: `16px`
- Font Weight: `400`
- Font Family: Neurial Grotesk
- Padding: `24px 32px`
- Border Radius: `0px`
- Border: `1px solid #E0E0E0`
- Box Shadow: `rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px`
- Line Height: `24px`
- Hover State: Border `#886D49`, Box Shadow elevated

**Award Badge Card**
- Background: `#FCFCF9`
- Text Color: `#472D0A`
- Font Size: `14px`
- Font Weight: `500`
- Font Family: Neurial Grotesk
- Padding: `16px 16px`
- Border Radius: `0px`
- Border: `none`
- Box Shadow: `none`
- Line Height: `20px`
- Accent: Gold/tan laurel icon above text

**Hero Section Container**
- Background: `#886D49`
- Text Color: `#FFFFFF`
- Min Height: `400px`
- Padding: `72px 48px`
- Border Radius: `0px`
- Border: `none`
- Box Shadow: `none`
- Content Alignment: Center, vertically and horizontally

### Inputs & Forms

**Text Input**
- Background: `#FFFFFF`
- Text Color: `#472D0A`
- Font Size: `14px`
- Font Weight: `400`
- Font Family: Neurial Grotesk
- Padding: `12px 16px`
- Border Radius: `0px`
- Border: `1px solid #E0E0E0`
- Box Shadow: `none`
- Line Height: `20px`
- Placeholder Color: `#757575`
- Focus State: Border `#472D0A`, Box Shadow `rgba(71, 45, 10, 0.1) 0px 0px 0px 3px`
- Disabled State: Background `#EEEEEE`, Text Color `#757575`, Border `#E0E0E0`

**Checkbox / Radio**
- Size: `20px × 20px`
- Border: `2px solid #472D0A`
- Border Radius: `2px` (checkbox), `50%` (radio)
- Checked Background: `#472D0A`
- Checked Icon Color: `#FFFFFF`
- Hover State: Border `#886D49`

**Textarea**
- Background: `#FFFFFF`
- Text Color: `#472D0A`
- Font Size: `14px`
- Font Weight: `400`
- Font Family: Neurial Grotesk
- Padding: `12px 16px`
- Border Radius: `0px`
- Border: `1px solid #E0E0E0`
- Min Height: `120px`
- Resize: vertical only
- Focus State: Border `#472D0A`, Box Shadow `rgba(71, 45, 10, 0.1) 0px 0px 0px 3px`

### Navigation

**Primary Navigation**
- Background: `#FFFFFF`
- Text Color: `#472D0A`
- Font Size: `16px`
- Font Weight: `400`
- Font Family: Neurial Grotesk
- Padding (vertical): `16px`
- Padding (horizontal): `24px`
- Border Radius: `0px`
- Border: `none`
- Box Shadow: `none`
- Line Height: `24px`
- Active State: Text Color `#886D49`, Bottom Border `2px solid #886D49`
- Hover State: Text Color `#886D49`

**Logo**
- Height: `40px`
- Width: Auto (maintains aspect ratio)
- Color: `#472D0A` (on light backgrounds), `#FFFFFF` (on dark backgrounds)
- Font Size: `18px`
- Font Weight: `600`
- Font Family: SVN-Cera

### Links

**Text Link**
- Color: `#472D0A`
- Font Size: `16px`
- Font Weight: `400`
- Font Family: Neurial Grotesk
- Text Decoration: `none`
- Line Height: `24px`
- Hover State: Color `#886D49`, Text Decoration `underline`
- Active State: Color `#3A2408`
- Visited State: Color `#5A4A3A`

**CTA Link (Hero)**
- Color: `#FFFFFF`
- Font Size: `28px`
- Font Weight: `600`
- Font Family: SVN-Cera
- Padding: `8px 0px`
- Text Decoration: `none`
- Line Height: `42px`
- Hover State: Color `#FCFCF9`, Text Shadow `0px 2px 4px rgba(0, 0, 0, 0.2)`

## 5. Layout Principles

### Spacing System

**Base Unit:** `4px`

**Spacing Scale:**
- `4px`: Micro gaps, icon spacing, tight component separation
- `8px`: Small gaps, tight padding within components
- `12px`: Small padding, label spacing
- `16px`: Standard padding, default component spacing
- `24px`: Medium padding, section padding
- `32px`: Large padding, major section padding
- `36px`: Extra-large padding, hero sections
- `40px`: Large gaps between component groups
- `48px`: Extra-large gaps, section separation
- `56px`: Major section separation
- `72px`: Hero section padding, largest gaps

**Usage Context:**
- Icon + Text: `8px` gap
- Card Internal: `16px` to `24px` padding
- Section Internal: `24px` to `36px` padding
- Between Sections: `48px` to `72px` margin

### Grid & Container

**Max Width:** `1440px` (main content container)
**Column Strategy:** 12-column grid system with `24px` gutters
**Section Patterns:** Full-width sections with centered content containers
**Padding (horizontal):** `32px` on tablet and above; `16px` on mobile

**Container Sizes:**
- Hero Section: 100% width, min-height `400px`
- Card Grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Text Content: Max-width `900px`, centered

### Whitespace Philosophy

Masterise Homes prioritizes generosity over density. Every element receives ample breathing room through consistent application of the spacing scale. Whitespace creates visual hierarchy, allowing premium imagery and refined typography to command attention. Sections are distinctly separated by substantial vertical margins (`48px`–`72px`), while internal component padding (`16px`–`24px`) ensures readability and visual comfort. This restraint reinforces the luxury positioning and international sophistication of the brand.

### Border Radius Scale

- **Sharp Corners:** `0px` (default for all components)
- **Subtle Rounding (rarely used):** `2px` (form checkboxes, subtle UI only)
- **No Rounded Cards:** Cards maintain `0px` radius for architectural, minimalist aesthetic

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | `box-shadow: none` | Primary backgrounds, most text, structural elements |
| Subtle (1) | `rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px` | Card hover states, premium containers, lifted content |
| Elevated (2) | `rgba(0, 0, 0, 0.15) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 10px 10px -5px` | Modal dialogs, overlays, prominent cards |
| Modal (3) | `rgba(0, 0, 0, 0.2) 0px 25px 50px -12px` | Full-screen modals, dropdowns, tooltips |

**Shadow Philosophy:**

Masterise Homes employs restrained shadow treatment aligned with its minimalist aesthetic. Shadows are subtle and reserved for specific interactive moments rather than pervasive elevation layers. The primary shadow (`Subtle 1`) appears on card hover states and premium containers, adding depth without visual noise. True shadows are used sparingly; most components live on the same visual plane. This approach maintains the clean, architectural feel while providing tactile feedback only where interaction occurs.

## 7. Do's and Don'ts

### Do
- **Use the brown palette (`#472D0A`, `#886D49`) as primary visual anchors** for headings, navigation, and primary CTAs
- **Maintain generous spacing** between sections and components; default to larger gaps unless density serves a specific purpose
- **Employ SVN-Cera serif exclusively for display headings** (`h1`, `h2`, major titles) to communicate premium positioning
- **Apply Neurial Grotesk for all body text and UI labels** to ensure consistent, modern readability
- **Layer interactions with clear hover states:** subtle color shifts (`#472D0A` to `#886D49`) or underlines, never drastic changes
- **Preserve sharp corners (`0px` border radius)** across buttons, cards, and inputs for the refined, architectural aesthetic
- **Create contrast through color, weight, and size**—not through shadow or decoration
- **Use white (`#FFFFFF`) as the dominant background** for cards and content areas; add `#FCFCF9` sparingly for warm alternatives
- **Center content in hero sections** with large typography and minimal supporting elements
- **Respect the spacing scale:** use multiples of `4px` for all padding, margins, and gaps

### Don't
- **Do not use rounded corners** on primary components; the `0px` border radius is essential to the architectural identity
- **Do not mix serif and sans-serif in the same heading** or text block
- **Do not use bright accent colors (`#007AFF`, `#5AC8FA`) as primary brand colors**; reserve for subtle interactive hints
- **Do not apply multiple shadow levels** to a single component; one shadow per interaction state
- **Do not use lowercase text** for primary headings; maintain proper title case hierarchy
- **Do not nest cards beyond one level**; avoid visual hierarchy confusion
- **Do not reduce padding below `12px`** in components; cramped spacing undermines the premium aesthetic
- **Do not create busy backgrounds** with patterns or gradients; preserve the clean, white/cream foundation
- **Do not abbreviate microcopy or labels**; spell out full names for professional clarity
- **Do not override the color palette** with custom hex values outside the defined system; ensure consistency

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | Width | Key Changes |
|-----------|-------|-------------|
| Mobile | 320px – 640px | Single column layout, `16px` horizontal padding, `18px` heading sizes, stacked nav |
| Tablet | 641px – 1024px | 2-column grid, `24px` horizontal padding, `32px` heading sizes, collapsible nav |
| Desktop | 1025px+ | 3-column grid, `32px` horizontal padding, full `58px` headings, expanded nav |
| Wide | 1440px+ | Max-width container, centered content, full spacing scale applied |

### Touch Targets

- **Minimum Touch Size:** `44px × 44px` for all interactive elements (buttons, links, checkboxes)
- **Button Padding:** At least `12px` vertical and `16px` horizontal to meet minimum
- **Spacing Between Targets:** Minimum `8px` between interactive elements to prevent accidental taps
- **Form Inputs:** Minimum height `40px` for text fields and selects on touch devices

### Collapsing Strategy

**Desktop (1025px+):**
- Full navigation with all items visible
- 3-column card grids
- Hero sections with side-by-side image and text
- Sidebar panels fully visible

**Tablet (641px – 1024px):**
- Hamburger menu with collapsible navigation drawer
- 2-column card grids
- Hero sections stack vertically (image above text)
- Reduced padding (`24px` horizontal instead of `32px`)
- Font sizes scale down slightly (h1 to `44px`, body to `14px`)

**Mobile (320px – 640px):**
- Full-screen navigation drawer
- Single-column card layout
- All sections stack vertically
- Minimal padding (`16px` horizontal)
- Font sizes reduce further (h1 to `32px`, h2 to `24px`)
- Touch targets enlarged to `44px` minimum
- Hero sections centered, single-column text
- Award badges display in horizontal scroll or vertical stack

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary Brand Color:** Deep Brown (`#472D0A`) — headings, primary buttons, primary text
- **Secondary Brand Color:** Warm Taupe (`#886D49`) — hover states, secondary headings, decorative accents
- **Background:** White (`#FFFFFF`) — primary; Cream (`#FCFCF9`) — secondary warm alternative
- **Heading Text:** Deep Brown (`#472D0A`) on light backgrounds; White (`#FFFFFF`) on brown backgrounds
- **Body Text:** Deep Brown (`#472D0A`) on white; Gray (`#757575`) for secondary content
- **Interactive Accents:** Blue (`#007AFF`) for links; use sparingly
- **Error/Success:** Red (`#E74D3C`) for errors; Green (`#07BC0C`) for success states
- **Borders:** Light Gray (`#E0E0E0`); upgrade to Brown (`#472D0A`) on hover

### Iteration Guide

1. **All text headings use SVN-Cera serif; body text uses Neurial Grotesk sans-serif.** This division is non-negotiable for brand consistency.

2. **Every button, card, and input has `border-radius: 0px`.** Sharp corners are core to Masterise's architectural aesthetic; never round them.

3. **Hover states shift the primary brown from `#472D0A` to `#886D49`;** all interactive elements (links, buttons, cards) respect this warm gradient transition.

4. **Spacing between major sections is always `48px` minimum (prefer `56px`–`72px`).** Whitespace defines luxury; never compress vertical margins below `40px` between sections.

5. **Cards never exceed one level of nesting.** Content hierarchy is achieved through typography, color, and spacing, not layered boxes.

6. **All form inputs have `1px solid #E0E0E0` borders and `#FFFFFF` backgrounds** unless disabled (then `#EEEEEE` background, `#757575` text).

7. **Navigation backgrounds are always `#FFFFFF`; text is `#472D0A`.** Active/hover states use `#886D49` text and a bottom border `2px solid #886D49`.

8. **Hero sections use `#886D49` background with centered, large typography (`28px` – `58px` SVN-Cera) in white text.** Content is vertically and horizontally centered.

9. **Award badges and accolades are displayed with gold/tan laurel icons above text on light (`#FCFCF9`) backgrounds.** Maintain consistent spacing between badges (`24px` gaps).

10. **On mobile (≤ 640px), reduce all headings by one size tier** (h1: 32px, h2: 24px), stack layouts to single column, and ensure minimum `44px × 44px` touch targets with `8px` minimum spacing between them.

11. **Never use shadows as a primary depth mechanism.** Apply the subtle shadow only to premium card hover states; flat design is the default.

12. **All text links are underlined on hover;** color shifts from `#472D0A` to `#886D49`. CTA links in hero sections stay white on hover but may add subtle text shadow `0px 2px 4px rgba(0, 0, 0, 0.2)`.